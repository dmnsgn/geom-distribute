import { a as saoShader, i as gtaoShader, n as depthPyramidShader, r as gtaoDenoiseShader, t as bilateralBlurShader } from "./ssao-JM5aNoS4.js";

/** Pixels one workgroup covers: 8x8 threads, each handling a 2x2 block. */
const DEPTH_PYRAMID_TILE = 16;
/** Disables the denoise more elegantly than zeroing every edge would. */
const GTAO_DENOISE_DISABLED_BETA = 1e4;
/** Everything both estimators derive from the camera and the viewport. */
function getEstimatorScope({ cameraEntity, viewport }) {
	const [width, height] = [viewport[2], viewport[3]];
	return {
		camera: cameraEntity.camera,
		component: cameraEntity.postProcessing.ssao,
		width,
		height,
		viewportSize: [width, height],
		viewportPixelSize: [1 / width, 1 / height]
	};
}
/**
* The linear view-space depth pyramid both estimators sample, in one dispatch.
*
* SAO takes rotated grid subsampling — McGuire12 table 1 compares five filters
* and finds it the only one whose levels hold values that were in the scene —
* where GTAO takes the closest-biased mean its falloff parameters are tuned
* against.
*/
function declareDepthPyramid(scope, params, rotatedGrid = false) {
	const { cameraEntity, compute, createTexture, depth } = scope;
	const { width, height } = getEstimatorScope(scope);
	const depthMips = createTexture({
		label: `ssao.depthMips.${cameraEntity.id}`,
		width,
		height,
		format: "r32uint",
		mipLevelCount: 4
	});
	compute({
		name: "prefilterDepths",
		shader: depthPyramidShader,
		dispatch: [Math.ceil(width / DEPTH_PYRAMID_TILE), Math.ceil(height / DEPTH_PYRAMID_TILE)],
		constants: { DEPTH_PYRAMID_ROTATED_GRID: rotatedGrid },
		writes: [depthMips],
		uniforms: {
			uDepthPyramid: params,
			uDepthTexture: depth
		},
		views: Object.fromEntries(Array.from({ length: 4 }, (_, level) => [`uDepthMip${level}`, {
			handle: depthMips,
			level
		}]))
	});
	return depthMips;
}
/**
* Ground Truth Ambient Occlusion, after XeGTAO: prefilter the depth buffer into
* a linear view-space pyramid, estimate against it, denoise.
*/
function declareGTAO(scope) {
	const { cameraEntity, frameIndex, textures, pass, createTexture, normal } = scope;
	const { camera, component, width, height, viewportSize, viewportPixelSize } = getEstimatorScope(scope);
	const bentNormals = !!component.bentNormals;
	const denoisePasses = component.denoisePasses;
	const tanHalfFovY = Math.tan(camera.fov * .5);
	const tanHalfFovX = tanHalfFovY * (width / height);
	const ndcToViewMul = [2 * tanHalfFovX, -2 * tanHalfFovY];
	const params = {
		ndcToViewMul,
		ndcToViewAdd: [-tanHalfFovX, tanHalfFovY],
		ndcToViewMulByPixelSize: [ndcToViewMul[0] / width, ndcToViewMul[1] / height],
		viewportSize,
		viewportPixelSize,
		near: camera.near,
		far: camera.far,
		effectRadius: component.radius,
		radiusMultiplier: component.radiusMultiplier,
		effectFalloffRange: component.falloffRange,
		sampleDistributionPower: component.sampleDistributionPower,
		thinOccluderCompensation: component.thinOccluderCompensation,
		finalValuePower: component.finalValuePower,
		mix: component.mix,
		depthMipSamplingOffset: component.depthMipSamplingOffset,
		denoiseBlurBeta: denoisePasses ? component.denoiseBlurBeta : GTAO_DENOISE_DISABLED_BETA,
		brightness: component.brightness,
		contrast: component.contrast,
		noiseIndex: cameraEntity.postProcessing?.taa ? frameIndex % 64 : 0
	};
	const depthMips = declareDepthPyramid(scope, {
		near: camera.near,
		far: camera.far,
		effectRadius: component.radius * component.radiusMultiplier,
		falloffRange: component.falloffRange
	});
	const format = bentNormals ? "rgba8unorm" : "r8unorm";
	const edges = denoisePasses ? createTexture({
		label: `ssao.edges.${cameraEntity.id}`,
		width,
		height,
		format: "rgba8unorm"
	}) : void 0;
	let ao = pass({
		name: "main",
		shader: gtaoShader,
		source: null,
		...edges && {
			defines: /* @__PURE__ */ new Set(["USE_GTAO_EDGES"]),
			targets: [{
				name: "edges",
				texture: edges
			}]
		},
		constants: {
			GTAO_NUM_SLICES: component.slices,
			GTAO_NUM_STEPS_PER_SLICE: component.stepsPerSlice,
			USE_GTAO_BENT_NORMALS: bentNormals,
			GTAO_FINAL_APPLY: !denoisePasses
		},
		format,
		uniforms: {
			uGTAO: params,
			uDepthTexture: depthMips,
			uNormalTexture: normal
		}
	});
	let spare;
	for (let index = 0; index < denoisePasses; index++) {
		const source = ao;
		ao = pass({
			name: `denoise[${index}]`,
			shader: gtaoDenoiseShader,
			source: null,
			...spare && { target: spare },
			constants: {
				USE_GTAO_BENT_NORMALS: bentNormals,
				GTAO_FINAL_APPLY: index === denoisePasses - 1
			},
			format,
			uniforms: {
				uGTAO: params,
				uAOTexture: source,
				uEdgesTexture: edges
			}
		});
		spare = source;
	}
	textures.set("ssao.main", ao);
	if (bentNormals) textures.set("ssao.bentNormal", ao);
}
/** Scalable Ambient Obscurance: one estimator pass and a separable blur. */
function declareSAO(scope) {
	const { samplers, pass, depth, normal } = scope;
	const { camera, component, width, height } = getEstimatorScope(scope);
	const depthMips = declareDepthPyramid(scope, {
		near: camera.near,
		far: camera.far,
		effectRadius: 0,
		falloffRange: 0
	}, true);
	const projection = camera.projectionMatrix;
	const [p00, p11, p20, p21] = [
		projection[0],
		projection[5],
		projection[8],
		projection[9]
	];
	const params = {
		projInfo: [
			2 / (width * p00),
			-2 / (height * p11),
			(p20 - 1) / p00,
			(1 + p21) / p11
		],
		far: camera.far,
		projScale: .5 * height * p11,
		intensity: component.intensity,
		radius: component.radius,
		bias: component.bias,
		brightness: component.brightness,
		contrast: component.contrast
	};
	const format = "r8unorm";
	const ao = pass({
		name: "main",
		shader: saoShader,
		source: null,
		constants: {
			SAO_NUM_SAMPLES: component.saoSamples,
			SAO_NUM_SPIRAL_TURNS: component.spiralTurns
		},
		clearValue: [
			0,
			0,
			0,
			1
		],
		format,
		uniforms: {
			uSAO: params,
			uDepthTexture: depthMips,
			uNormalTexture: normal
		}
	});
	if (component.blurRadius < 0) return;
	const blur = (axis) => ({
		uBlur: {
			axis,
			radius: component.blurRadius,
			near: camera.near,
			far: camera.far,
			sharpness: component.blurSharpness
		},
		uDepthTexture: depth,
		uDepthTextureSampler: samplers.nearest
	});
	const horizontal = pass({
		name: "blurHorizontal",
		shader: bilateralBlurShader,
		source: ao,
		clearValue: [
			0,
			0,
			0,
			1
		],
		format,
		uniforms: blur([1, 0])
	});
	pass({
		name: "blurVertical",
		shader: bilateralBlurShader,
		source: horizontal,
		target: ao,
		uniforms: blur([0, 1])
	});
}
/**
* Screen-space ambient occlusion.
*
* Declared at the pre-pass stage, so the visibility buffer exists before
* anything is shaded and the standard shader folds it into the indirect term
* rather than multiplying it over the result. That is the only way it is
* applied: with occlusion a lighting input, there is nothing left for a
* post-hoc mix to do.
*
* The result is published as `ssao.main` — visibility in `.x`, and under GTAO's
* `bentNormals` the average unoccluded direction in `.yzw`, republished as
* `ssao.bentNormal` because only the producer knows those channels are there.
*/
const ssao = {
	name: "ssao",
	outputs: ["normal"],
	stage: "prePass",
	declare(context) {
		const depth = context.textures.get("depth");
		const normal = context.textures.get("normal");
		if (!depth || !normal) return;
		const scope = {
			...context,
			depth,
			normal
		};
		if (context.cameraEntity.postProcessing.ssao.type === "gtao") declareGTAO(scope);
		else declareSAO(scope);
	}
};

export { ssao as default };