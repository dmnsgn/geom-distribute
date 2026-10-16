import { n as taaShader, r as taaSharpenShader, t as taaDepthHistoryShader } from "./taa-v1XFvCDp.js";
import { n as createHistoryTracker, t as createHistoryPair } from "./history-C56w_3RC.js";

const isHistoryValid = createHistoryTracker();
/**
* Temporal antialiasing.
*
* One resolve pass blending the jittered current frame into an accumulated
* history, reprojected through this frame's depth. Declared first in the
* post-processing stage so everything after it — bloom, depth of field, the
* tonemap — works on a stable image.
*
* Two histories alternating by frame parity, because a pass may not read and
* write one handle. Both are persistent: their contents have to survive to the
* next frame, which is the one thing the pool's per-frame recycling would
* otherwise take away.
*/
const taa = {
	name: "taa",
	outputs: ["velocity", "responsive"],
	declare({ cameraEntity, frameIndex, renderView, samplers, textures, pass, createTexture }) {
		const camera = cameraEntity.camera;
		const component = cameraEntity.postProcessing.taa;
		const depth = textures.get("depth");
		if (!depth) return;
		if (!camera._previousViewProjectionMatrix || !camera._jitter) return;
		if (cameraEntity.postProcessing.smaa) textures.report("both \"taa\" and \"smaa\" are enabled. Temporal antialiasing supersedes it — resolving temporally and leaving smaa to blur the result.");
		const viewId = cameraEntity.id;
		const width = renderView.viewport[2];
		const height = renderView.viewport[3];
		const parity = frameIndex % 2;
		const descriptor = {
			width,
			height,
			format: "rgba16float"
		};
		const histories = createHistoryPair(createTexture, "taa.history", viewId, descriptor);
		const historyValid = isHistoryValid(cameraEntity, frameIndex, width, height);
		const velocity = textures.get("velocity");
		const disocclusionTolerance = component.disocclusionTolerance ?? 0;
		const previousDepth = disocclusionTolerance > 0 ? createTexture({
			label: `taa.depthHistory.${viewId}`,
			width,
			height,
			format: "r16float",
			persistent: true
		}) : void 0;
		const responsive = textures.get("responsive");
		const emissive = textures.get("emissive");
		const emissiveHistories = emissive && createHistoryPair(createTexture, "taa.emissiveHistory", viewId, descriptor);
		const defines = /* @__PURE__ */ new Set([
			...velocity ? ["USE_TAA_VELOCITY"] : [],
			...previousDepth ? ["USE_TAA_DISOCCLUSION"] : [],
			...responsive ? ["USE_TAA_RESPONSIVE"] : [],
			...emissiveHistories ? ["USE_TAA_EMISSIVE"] : []
		]);
		const depthOffset = [camera._jitter[0] * .5, camera._jitter[1] * -.5];
		const params = {
			inverseViewProjectionMatrix: camera._inverseViewProjectionMatrix,
			previousViewProjectionMatrix: camera._previousViewProjectionMatrix,
			texelSize: [1 / width, 1 / height],
			depthOffset,
			blendFactor: component.blendFactor ?? .1,
			varianceGamma: component.varianceGamma ?? 1.25,
			historyValid: historyValid ? 1 : 0,
			disocclusionTolerance
		};
		const resolveUniforms = {
			uTAA: params,
			uHistoryTexture: histories[1 - parity],
			uHistoryTextureSampler: samplers.linear,
			uDepthTexture: depth,
			uDepthTextureSampler: samplers.nearest,
			...velocity && {
				uVelocityTexture: velocity,
				uVelocityTextureSampler: samplers.nearest
			},
			...previousDepth && {
				uPreviousDepthTexture: previousDepth,
				uPreviousDepthTextureSampler: samplers.nearest
			},
			...responsive && {
				uResponsiveTexture: responsive,
				uResponsiveTextureSampler: samplers.nearest
			}
		};
		if (component.debug) {
			const debugDefines = new Set(defines);
			debugDefines.delete("USE_TAA_EMISSIVE");
			pass({
				name: "debug",
				shader: taaShader,
				defines: debugDefines,
				constants: { USE_TAA_DEBUG: true },
				uniforms: resolveUniforms
			});
		}
		pass({
			name: "main",
			shader: taaShader,
			defines,
			target: histories[parity],
			chain: true,
			...emissiveHistories && { targets: [{
				name: "emissive",
				texture: emissiveHistories[parity]
			}] },
			uniforms: {
				...resolveUniforms,
				...emissiveHistories && {
					uEmissiveTexture: emissive,
					uEmissiveTextureSampler: samplers.linear,
					uEmissiveHistoryTexture: emissiveHistories[1 - parity],
					uEmissiveHistoryTextureSampler: samplers.linear
				}
			}
		});
		if (emissiveHistories) textures.set("emissive", emissiveHistories[parity]);
		if (previousDepth) pass({
			name: "depthHistory",
			shader: taaDepthHistoryShader,
			target: previousDepth,
			source: null,
			uniforms: {
				uTAA: params,
				uDepthTexture: depth,
				uDepthTextureSampler: samplers.nearest
			}
		});
		const sharpness = component.sharpness ?? 0;
		if (sharpness > 0) pass({
			name: "sharpen",
			shader: taaSharpenShader,
			chain: true,
			uniforms: { uSharpen: { sharpness } }
		});
	}
};

export { taa as default };