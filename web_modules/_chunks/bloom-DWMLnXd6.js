import { n as thresholdShader, r as upsampleShader, t as downsampleShader } from "./bloom-BgckP8aE.js";

/**
* Halving stops once the next level would be smaller than this. Below a few
* texels a level is a draw call that contributes nothing, and the bilinear taps
* have no neighbours left to gather.
*/
const MIN_LEVEL_SIZE = 8;
/**
* Past this the blur already covers the screen, so another level buys nothing
* visible. Only a 4K viewport has the texels to reach it.
*/
const MAX_LEVELS = 9;
const ADDITIVE = {
	color: {
		srcFactor: "one",
		dstFactor: "one"
	},
	alpha: {
		srcFactor: "one",
		dstFactor: "one"
	}
};
const COLOR_FUNCTION_DEFINE = {
	luminance: "COLOR_FUNCTION_LUMINANCE",
	average: "COLOR_FUNCTION_AVERAGE"
};
/**
* Level 0 is a quarter of the viewport: the bright pass already spent the first
* halving, and the pyramid starts below it.
*
* Kino's arrangement, and the reason this is not a full-resolution pyramid: the
* glare is a wide low-frequency image, so the top octave costs the most and
* contributes the least.
*/
const levelSize = (viewport, level) => [viewport[2] / 2 ** (level + 2), viewport[3] / 2 ** (level + 2)];
/**
* How many levels the viewport has texels for, unless the component asks for a
* specific count.
*
* A fixed count is wrong in both directions: it leaves a 4K viewport blurring
* over a fraction of the screen, and it gives a small one levels of 2×1 whose
* only effect is a draw call. Asking for one explicitly is still useful — the
* level count is what sets the largest glare radius, so it is an artistic
* control as much as a budget.
*/
const levelCount = (viewport, requested) => {
	const fits = Math.floor(Math.log2(Math.min(viewport[2], viewport[3]) / MIN_LEVEL_SIZE)) - 1;
	return Math.max(1, Math.min(requested ?? MAX_LEVELS, fits));
};
/**
* Bloom: threshold the bright pixels at half resolution, build a downsample
* pyramid below that, then add every level back up it. The sum ends in
* `bloom.threshold` for combine to add into the tonemapped image, sampled
* bilinearly — which is the chain's last upsample.
*/
const bloom = {
	name: "bloom",
	outputs: ["emissive"],
	declare({ cameraEntity, viewport, textures, samplers, pass }) {
		const component = cameraEntity.postProcessing.bloom;
		const quality = component.quality === 0 ? /* @__PURE__ */ new Set(["QUALITY_0"]) : /* @__PURE__ */ new Set();
		const levels = levelCount(viewport, component.levels);
		const emissive = textures.get("emissive");
		const fromEmissive = component.source === "emissive" && !!emissive;
		const threshold = pass({
			name: "threshold",
			shader: thresholdShader,
			size: [viewport[2] / 2, viewport[3] / 2],
			...fromEmissive && { source: null },
			defines: /* @__PURE__ */ new Set([
				...emissive ? ["USE_EMISSIVE_TEXTURE"] : [],
				...component.source === "color" ? ["USE_SOURCE_COLOR"] : [],
				...fromEmissive ? ["USE_SOURCE_EMISSIVE"] : [],
				...COLOR_FUNCTION_DEFINE[component.colorFunction] ? [COLOR_FUNCTION_DEFINE[component.colorFunction]] : []
			]),
			uniforms: {
				uBloom: {
					threshold: component.threshold,
					softKnee: component.softKnee ?? .5
				},
				...emissive && {
					uEmissiveTexture: emissive,
					uEmissiveTextureSampler: samplers.linear
				}
			}
		});
		const pyramid = [];
		let source = threshold;
		for (let level = 0; level < levels; level++) {
			source = pass({
				name: `downsample[${level}]`,
				shader: downsampleShader,
				defines: quality,
				source,
				size: levelSize(viewport, level),
				uniforms: { uDownsample: { intensity: component.radius } }
			});
			pyramid.push(source);
		}
		/**
		* Back up the pyramid, smallest first: each level is added into the one
		* above it _at that level's size_, so the sum accumulates as it climbs and
		* the last draw is the half-resolution bright pass. Combine's bilinear read
		* takes it the rest of the way.
		*
		* Adding every level straight into one target instead costs a draw at that
		* size per level — and asks a nine-tap tent to bridge a gap of up to 2^n
		* texels, which no filter kernel can do.
		*/
		for (let level = levels - 1; level >= 0; level--) pass({
			name: `upsample[${level}]`,
			shader: upsampleShader,
			defines: quality,
			blend: ADDITIVE,
			source: pyramid[level],
			target: level === 0 ? threshold : pyramid[level - 1]
		});
	}
};

export { bloom as default };