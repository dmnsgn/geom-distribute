import { a as dofGatherShader, c as dofTileDilateShader, i as dofFocusShader, l as dofTileMaxXShader, n as dofCompositeShader, o as dofPostFilterShader, r as dofDownsampleShader, s as dofPrefilterShader, t as dofCoCResolveShader, u as dofTileMaxYShader } from "./dof-BFusxSKr.js";

/**
* Colour and the signed circle of confusion; the two fields; all half
* resolution.
*/
const FIELD_FORMAT = "rgba16float";
/**
* A tile is the largest and smallest radius each field reaches inside it.
*
* The maxima bound each field's search. The minima say whether the tile
* describes one surface or several, which is what decides how many rings the
* gather spends there.
*/
const TILE_FORMAT = "rgba16float";
/**
* Tile size in half-resolution pixels, unless a large radius forces it up.
*
* Sets how coarsely the near field's gather radius is quantised: a larger tile
* spends samples on pixels that did not need them, a smaller one costs more
* dilation taps to reach the same radius.
*/
const MIN_TILE_SIZE = 8;
/**
* Below this there is no disc to speak of and the transition blur has it
* covered.
*/
const MIN_COC_RADIUS = .5;
/**
* Weight given to this frame when accumulating the circle of confusion.
*
* Its own constant rather than temporal antialiasing's: this averages a
* sub-pixel coverage over the whole jitter sequence. The reciprocal is roughly
* the frames it averages, against a sequence of eight.
*/
const COC_BLEND_FACTOR = .1;
const cocStates = /* @__PURE__ */ new WeakMap();
/**
* Depth of field.
*
* First of the image-space effects after the temporal resolve, because it reads
* a circle of confusion per pixel from the depth buffer: motion blur smears the
* image out of correspondence with that depth, and defocusing a streak by the
* depth of whatever it passes over is wrong at every pixel of it. Before bloom
* for the same reason — out-of-focus highlights should glare as the bokeh shows
* them, not as the sharp image would.
*
* The gather is the only pass that costs anything, and it runs at a quarter of
* the pixels. See the `depthOfField` chunk for why the work is split this way.
*/
const dof = {
	name: "dof",
	declare({ cameraEntity, frameIndex, viewport, textures, samplers, pass, createTexture }) {
		const depth = textures.get("depth");
		if (!depth) return;
		const camera = cameraEntity.camera;
		const postProcessing = cameraEntity.postProcessing;
		const component = postProcessing.dof;
		const viewId = cameraEntity.id;
		const width = viewport[2];
		const height = viewport[3];
		const halfWidth = Math.max(1, Math.ceil(width / 2));
		const halfHeight = Math.max(1, Math.ceil(height / 2));
		const halfSize = [halfWidth, halfHeight];
		const maxCoCRadius = (component.maxCoCRadius ?? .05) * height * .5;
		if (maxCoCRadius < MIN_COC_RADIUS) return;
		const tilePixels = Math.max(MIN_TILE_SIZE, Math.ceil(maxCoCRadius / 3));
		const tilesX = Math.ceil(halfWidth / tilePixels);
		const tilesY = Math.ceil(halfHeight / tilePixels);
		const tileSize = [tilesX, tilesY];
		const nearRings = Math.max(1, Math.round(component.nearRings ?? 8));
		const farRings = Math.max(1, Math.round(component.farRings ?? 8));
		const samples = Math.max(1, Math.round(component.samples ?? 6));
		const ringCap = Math.min(nearRings, farRings);
		const spacing = Math.max(maxCoCRadius / ringCap, 2 * Math.PI * maxCoCRadius / (ringCap * samples));
		const mipLevelCount = Math.max(1, Math.min(1 + Math.floor(Math.log2(Math.max(1, Math.min(halfWidth, halfHeight)))), 1 + Math.ceil(Math.log2(Math.max(spacing, 1)))));
		const physical = component.physical ?? true;
		const focusOnScreenPoint = !!component.focusOnScreenPoint;
		const chromaticAberration = component.chromaticAberration ?? 0;
		const defines = new Set(focusOnScreenPoint ? ["USE_FOCUS_ON_SCREEN_POINT"] : []);
		const uDoFParams = {
			texelSize: [1 / width, 1 / height],
			halfTexelSize: [1 / halfWidth, 1 / halfHeight],
			screenPoint: component.screenPoint ?? [.5, .5],
			tileScale: [halfWidth / (tilesX * tilePixels), halfHeight / (tilesY * tilePixels)],
			near: camera.near,
			far: camera.far,
			focusDistance: (component.focusDistance ?? 7) * 1e3,
			focalLength: camera.focalLength,
			fStop: camera.fStop,
			cocScale: height * .25 / (camera.actualSensorHeight ?? camera.sensorSize[1]),
			focusScale: component.focusScale ?? 1,
			blurScale: (component.blurriness ?? .03) * height * .5,
			focusRange: (component.focusRange ?? 1) * 1e3,
			focusFalloff: Math.max(component.focusFalloff ?? 1, .001),
			maxCoCRadius,
			chromaticAberration,
			luminanceThreshold: component.luminanceThreshold ?? .7,
			luminanceGain: component.luminanceGain ?? 0,
			luminanceKnee: component.luminanceKnee ?? .5,
			blades: postProcessing.blades ?? 0,
			bladeRotation: postProcessing.bladeRotation ?? 0,
			bladeCurvature: postProcessing.bladeCurvature ?? 0
		};
		const depthUniforms = {
			uDepthTexture: depth,
			uDepthTextureSampler: samplers.nearest
		};
		const focus = focusOnScreenPoint ? pass({
			name: "focus",
			shader: dofFocusShader,
			source: null,
			size: [1, 1],
			uniforms: {
				uDoFParams,
				...depthUniforms
			}
		}) : void 0;
		const focusUniforms = focus && {
			uFocusTexture: focus,
			uFocusTextureSampler: samplers.nearest
		};
		const jitter = camera._jitter;
		const resolveCoC = !!jitter && (jitter[0] !== 0 || jitter[1] !== 0) && !!camera._previousViewProjectionMatrix && !!camera._inverseViewProjectionMatrix;
		let resolvedCoC;
		if (resolveCoC) {
			const cocDescriptor = {
				width,
				height,
				format: "r16float",
				persistent: true
			};
			const parity = frameIndex % 2;
			const cocHistories = [createTexture({
				label: `dof.cocHistory0.${viewId}`,
				...cocDescriptor
			}), createTexture({
				label: `dof.cocHistory1.${viewId}`,
				...cocDescriptor
			})];
			const state = cocStates.get(cameraEntity);
			const historyValid = !camera._temporalReset && state && state.width === width && state.height === height && state.frameIndex === frameIndex - 1;
			cocStates.set(cameraEntity, {
				width,
				height,
				frameIndex
			});
			const velocity = textures.get("velocity");
			pass({
				name: "cocResolve",
				shader: dofCoCResolveShader,
				defines: /* @__PURE__ */ new Set([...defines, ...velocity ? ["USE_DOF_COC_VELOCITY"] : []]),
				constants: { USE_DOF_PHYSICAL: physical },
				source: null,
				target: cocHistories[parity],
				uniforms: {
					uDoFParams,
					uTAA: {
						inverseViewProjectionMatrix: camera._inverseViewProjectionMatrix,
						previousViewProjectionMatrix: camera._previousViewProjectionMatrix,
						texelSize: [1 / width, 1 / height],
						depthOffset: [jitter[0] * .5, jitter[1] * -.5],
						blendFactor: COC_BLEND_FACTOR,
						varianceGamma: 0,
						historyValid: historyValid ? 1 : 0,
						disocclusionTolerance: 0
					},
					...depthUniforms,
					...focusUniforms,
					uHistoryTexture: cocHistories[1 - parity],
					uHistoryTextureSampler: samplers.linear,
					...velocity && {
						uVelocityTexture: velocity,
						uVelocityTextureSampler: samplers.nearest
					}
				}
			});
			resolvedCoC = cocHistories[parity];
		}
		const cocUniforms = resolvedCoC ? {
			uCoCTexture: resolvedCoC,
			uCoCTextureSampler: samplers.nearest
		} : {
			...depthUniforms,
			...focusUniforms
		};
		const cocDefines = resolvedCoC ? ["USE_DOF_RESOLVED_COC"] : [];
		const prefilter = pass({
			name: "prefilter",
			shader: dofPrefilterShader,
			defines: /* @__PURE__ */ new Set([...defines, ...cocDefines]),
			constants: { USE_DOF_PHYSICAL: physical },
			size: halfSize,
			format: FIELD_FORMAT,
			mipLevelCount,
			uniforms: {
				uDoFParams,
				...cocUniforms
			}
		});
		for (let level = 1; level < mipLevelCount; level++) pass({
			name: `downsample[${level}]`,
			shader: dofDownsampleShader,
			source: null,
			target: prefilter,
			level,
			views: { uTexture: {
				handle: prefilter,
				level: level - 1,
				levelCount: 1
			} },
			uniforms: { uTextureSampler: samplers.linear }
		});
		const tileConstants = {
			DOF_TILE_SIZE: tilePixels,
			DOF_TILE_DILATE_RADIUS: Math.ceil(maxCoCRadius / tilePixels) + 1
		};
		const rows = pass({
			name: "tileMaxX",
			shader: dofTileMaxXShader,
			constants: tileConstants,
			source: prefilter,
			size: [tilesX, halfHeight],
			format: TILE_FORMAT
		});
		const tiles = pass({
			name: "tileMaxY",
			shader: dofTileMaxYShader,
			constants: tileConstants,
			source: rows,
			size: tileSize,
			format: TILE_FORMAT
		});
		const dilated = pass({
			name: "tileDilate",
			shader: dofTileDilateShader,
			constants: tileConstants,
			source: tiles,
			size: tileSize,
			format: TILE_FORMAT
		});
		const near = createTexture({
			label: `dof.near_${viewId}`,
			width: halfWidth,
			height: halfHeight,
			format: FIELD_FORMAT
		});
		const far = pass({
			name: "far",
			shader: dofGatherShader,
			constants: {
				DOF_NEAR_RINGS: nearRings,
				DOF_FAR_RINGS: farRings,
				DOF_SAMPLES: samples,
				DOF_MAX_MIP: mipLevelCount - 1,
				USE_DOF_RING_OCCLUSION: component.ringOcclusion ?? true
			},
			source: prefilter,
			size: halfSize,
			format: FIELD_FORMAT,
			targets: [{
				name: "near",
				texture: near
			}],
			uniforms: {
				uDoFParams,
				uCoCTexture: prefilter,
				uCoCTextureSampler: samplers.nearest,
				uTileTexture: dilated,
				uTileTextureSampler: samplers.linear
			}
		});
		let farField = far;
		let nearField = near;
		if (component.postFilter ?? true) {
			const nearBlur = createTexture({
				label: `dof.nearBlur_${viewId}`,
				width: halfWidth,
				height: halfHeight,
				format: FIELD_FORMAT
			});
			farField = pass({
				name: "farBlur",
				shader: dofPostFilterShader,
				source: far,
				size: halfSize,
				format: FIELD_FORMAT,
				targets: [{
					name: "nearBlur",
					texture: nearBlur
				}],
				uniforms: {
					uNearTexture: near,
					uNearTextureSampler: samplers.nearest
				}
			});
			nearField = nearBlur;
		}
		const debugTexture = component.debug ? createTexture({
			label: `dof.debug_${viewId}`,
			width,
			height,
			format: FIELD_FORMAT
		}) : void 0;
		pass({
			name: "main",
			shader: dofCompositeShader,
			chain: true,
			...debugTexture && { targets: [{
				name: "debug",
				texture: debugTexture
			}] },
			defines: /* @__PURE__ */ new Set([
				...defines,
				...cocDefines,
				...component.debug ? ["USE_DOF_DEBUG"] : []
			]),
			constants: {
				USE_DOF_PHYSICAL: physical,
				USE_DOF_CHROMATIC_ABERRATION: chromaticAberration > 0,
				USE_DOF_TRANSITION_BLUR: component.transitionBlur ?? true
			},
			uniforms: {
				uDoFParams,
				...cocUniforms,
				uFarTexture: farField,
				uFarTextureSampler: samplers.linear,
				uNearTexture: nearField,
				uNearTextureSampler: samplers.linear,
				...component.debug && {
					uTileTexture: dilated,
					uTileTextureSampler: samplers.linear
				}
			}
		});
	}
};

export { dof as default };