import { n as lumaShader, t as finalShader } from "./final-Db87XKdR.js";

const FXAA_THRESHOLDS = [
	{
		min: .0833,
		max: .25
	},
	{
		min: .0625,
		max: .166
	},
	{
		min: .0312,
		max: .125
	},
	{
		min: .0156,
		max: .063
	},
	{
		min: .0078,
		max: .031
	}
];
/**
* The last stage: anti-aliasing, grain and output opacity, all of which want
* the finished display-referred image.
*/
const final = {
	name: "final",
	srgb: true,
	declare({ cameraEntity, samplers, pass }) {
		const { fxaa, filmGrain, opacity } = cameraEntity.postProcessing;
		if (!fxaa && !filmGrain && !(Number.isFinite(opacity) && opacity !== 1)) return;
		const luma = fxaa || filmGrain ? pass({
			name: "luma",
			shader: lumaShader,
			clearValue: [
				0,
				0,
				0,
				1
			],
			format: "r8unorm"
		}) : void 0;
		const edge = FXAA_THRESHOLDS[fxaa?.quality ?? 2] ?? FXAA_THRESHOLDS[2];
		pass({
			name: "main",
			shader: finalShader,
			chain: true,
			defines: /* @__PURE__ */ new Set([...fxaa ? ["USE_FXAA"] : [], ...filmGrain ? ["USE_FILM_GRAIN"] : []]),
			constants: {
				...fxaa && {
					FXAA_EDGE_THRESHOLD_MIN: edge.min,
					FXAA_EDGE_THRESHOLD_MAX: edge.max
				},
				...filmGrain && { FILM_GRAIN_QUALITY: filmGrain.quality }
			},
			clearValue: [
				0,
				0,
				0,
				1
			],
			uniforms: {
				uFinal: {
					subPixelQuality: fxaa?.subPixelQuality ?? 0,
					filmGrainSize: filmGrain?.size ?? 0,
					filmGrainIntensity: filmGrain?.intensity ?? 0,
					filmGrainColorIntensity: filmGrain?.colorIntensity ?? 0,
					filmGrainLuminanceIntensity: filmGrain?.luminanceIntensity ?? 0,
					filmGrainSpeed: filmGrain?.speed ?? 0,
					opacity: opacity ?? 1
				},
				...luma && {
					uLumaTexture: luma,
					uLumaTextureSampler: samplers.linear
				}
			}
		});
	}
};

export { final as default };