import { S as textureSamplerDeclaration, c as createBindingAllocator, l as formatShader, n as fullscreenVertex, r as postProcessingStruct } from "./common-BiA813CC.js";
import { o as max3 } from "./math-CwQZH5H7.js";
import { t as luma_default } from "./luma-CYejMNwF.js";
import { t as luminance_default } from "./luminance-Dd4_sbNc.js";
import { t as threshold_default } from "./threshold-D335wWW5.js";

var average_default = `
fn average(color: vec3f) -> f32 {
  return (color.x + color.y + color.z) / 3.0;
}
`;

/**
* Downsample
*
* Neighbor UVs are taken as parameters rather than recomputed from a base UV
* and texel size: the composing pipeline computes and interpolates them in the
* vertex stage (free via rasterization) instead of paying for the add/multiply
* per tap in the fragment stage.
*
* Reference Implementation: https://github.com/keijiro/KinoBloom
*
* @type {string}
* @alias module:shaders.downsample
*/
var downsample_default = `
// 4x4 box filter
fn downsampleBox(
  tex: texture_2d<f32>,
  texSampler: sampler,
  uv: vec2f,
  uvLeftUp: vec2f,
  uvRightUp: vec2f,
  uvLeftDown: vec2f,
  uvRightDown: vec2f,
  intensity: f32
) -> vec4f {
  return (
    textureSampleLevel(tex, texSampler, uvLeftDown, 0.0) +
    textureSampleLevel(tex, texSampler, uvRightDown, 0.0) +
    textureSampleLevel(tex, texSampler, uv, 0.0) +
    textureSampleLevel(tex, texSampler, uvLeftUp, 0.0) +
    textureSampleLevel(tex, texSampler, uvRightUp, 0.0)
  ) / 5.0 * intensity;
}

// 4x4 box filter + Karis's luma weighted average anti-flicker filter (using
// max component brightness instead of luma)
fn downsampleBoxAntiFlicker(
  tex: texture_2d<f32>,
  texSampler: sampler,
  uvLeftUp: vec2f,
  uvRightUp: vec2f,
  uvLeftDown: vec2f,
  uvRightDown: vec2f,
  intensity: f32
) -> vec4f {
  let s1 = textureSampleLevel(tex, texSampler, uvLeftDown, 0.0);
  let s2 = textureSampleLevel(tex, texSampler, uvRightDown, 0.0);
  let s3 = textureSampleLevel(tex, texSampler, uvLeftUp, 0.0);
  let s4 = textureSampleLevel(tex, texSampler, uvRightUp, 0.0);

  let s1w = 1.0 / (max3(s1.xyz) + 1.0);
  let s2w = 1.0 / (max3(s2.xyz) + 1.0);
  let s3w = 1.0 / (max3(s3.xyz) + 1.0);
  let s4w = 1.0 / (max3(s4.xyz) + 1.0);
  let oneDivWSum = 1.0 / (s1w + s2w + s3w + s4w);

  return (s1 * s1w + s2 * s2w + s3 * s3w + s4 * s4w) * oneDivWSum * intensity;
}
`;

/**
* Upsample
*
* Neighbor UVs are taken as parameters rather than recomputed from a base UV
* and texel size: the composing pipeline computes and interpolates them in the
* vertex stage (free via rasterization) instead of paying for the add/multiply
* per tap in the fragment stage.
*
* Reference Implementation: https://github.com/keijiro/KinoBloom
*
* @type {string}
* @alias module:shaders.upsample
*/
var upsample_default = `
// 4-tap bilinear upsampler
fn upsampleBilinear(
  tex: texture_2d<f32>,
  texSampler: sampler,
  uvLeftUp: vec2f,
  uvRightUp: vec2f,
  uvLeftDown: vec2f,
  uvRightDown: vec2f
) -> vec4f {
  return vec4f(
    textureSampleLevel(tex, texSampler, uvLeftDown, 0.0).rgb * 0.25 +
    textureSampleLevel(tex, texSampler, uvRightDown, 0.0).rgb * 0.25 +
    textureSampleLevel(tex, texSampler, uvLeftUp, 0.0).rgb * 0.25 +
    textureSampleLevel(tex, texSampler, uvRightUp, 0.0).rgb * 0.25,
    1.0
  );
}

// 9-tap bilinear upsampler (tent filter)
fn upsampleTent(
  tex: texture_2d<f32>,
  texSampler: sampler,
  uv: vec2f,
  uvDown: vec2f,
  uvUp: vec2f,
  uvLeft: vec2f,
  uvRight: vec2f,
  uvLeftUp: vec2f,
  uvRightUp: vec2f,
  uvLeftDown: vec2f,
  uvRightDown: vec2f
) -> vec4f {
  return vec4f(
    textureSampleLevel(tex, texSampler, uvLeftDown, 0.0).rgb * 0.0625 +
    textureSampleLevel(tex, texSampler, uvLeft, 0.0).rgb * 0.125 +
    textureSampleLevel(tex, texSampler, uvRightDown, 0.0).rgb * 0.0625 +
    textureSampleLevel(tex, texSampler, uvDown, 0.0).rgb * 0.125 +
    textureSampleLevel(tex, texSampler, uv, 0.0).rgb * 0.25 +
    textureSampleLevel(tex, texSampler, uvUp, 0.0).rgb * 0.125 +
    textureSampleLevel(tex, texSampler, uvLeftUp, 0.0).rgb * 0.0625 +
    textureSampleLevel(tex, texSampler, uvRight, 0.0).rgb * 0.125 +
    textureSampleLevel(tex, texSampler, uvRightUp, 0.0).rgb * 0.0625,
    1.0
  );
}
`;

/** Brightness metric the threshold is scored against. */
const COLOR_FUNCTION = {
	COLOR_FUNCTION_LUMINANCE: "luminance",
	COLOR_FUNCTION_AVERAGE: "average"
};
const colorFunction = (defines) => {
	for (const [define, name] of Object.entries(COLOR_FUNCTION)) if (defines.has(define)) return name;
	return "luma";
};
/**
* Bright pass: what exceeds the threshold is what glares — the amount above it,
* not the whole colour scaled by how far above it sits, so `softKnee` fades a
* pixel in from zero rather than snapping it to full brightness.
*
* Reading the emissive target instead of the color one trades physicality for
* artistic control — only what the artist marked emissive blooms, at any
* brightness.
*/
const thresholdShader = (defines = /* @__PURE__ */ new Set()) => {
	const useSourceColor = defines.has("USE_SOURCE_COLOR");
	const useSourceEmissive = defines.has("USE_SOURCE_EMISSIVE");
	const addEmissive = defines.has("USE_EMISSIVE_TEXTURE") && !useSourceColor && !useSourceEmissive;
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

struct Bloom {
  threshold: f32,
  softKnee: f32,
}
@group(0) @binding(${alloc.next()}) var<uniform> uBloom: Bloom;

${useSourceEmissive ? "" : textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}
${useSourceEmissive || addEmissive ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uEmissiveTexture") : ""}

${fullscreenVertex()}

// Fragment includes
${luma_default}
${luminance_default}
${average_default}
${threshold_default}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  var color = textureSample(
    ${useSourceEmissive ? "uEmissiveTexture, uEmissiveTextureSampler" : "uTexture, uTextureSampler"},
    input.texCoord0
  );
  color = threshold(
    color,
    ${colorFunction(defines)}(color.rgb),
    uBloom.threshold,
    uBloom.softKnee
  );

  ${addEmissive ? "color += textureSample(uEmissiveTexture, uEmissiveTextureSampler, input.texCoord0);" : ""}

  return color;
}
`);
};
/** One level of the bloom pyramid. */
const downsampleShader = (defines = /* @__PURE__ */ new Set()) => {
	const alloc = createBindingAllocator(1);
	const antiFlicker = !defines.has("QUALITY_0");
	return formatShader(`
${postProcessingStruct}

struct Downsample {
  intensity: f32,
}
@group(0) @binding(${alloc.next()}) var<uniform> uDownsample: Downsample;

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}

${fullscreenVertex({ corners: true })}

// Fragment includes
${max3}
${downsample_default}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  return ${antiFlicker ? `downsampleBoxAntiFlicker(
    uTexture,
    uTextureSampler,
    input.texCoord0LeftUp,
    input.texCoord0RightUp,
    input.texCoord0LeftDown,
    input.texCoord0RightDown,
    uDownsample.intensity
  )` : `downsampleBox(
    uTexture,
    uTextureSampler,
    input.texCoord0,
    input.texCoord0LeftUp,
    input.texCoord0RightUp,
    input.texCoord0LeftDown,
    input.texCoord0RightDown,
    uDownsample.intensity
  )`};
}
`);
};
/**
* One level of the upsample chain, blended into the level above it. The 4-tap
* filter samples half a texel out (bilinear taps land between texels); the tent
* filter needs the full texel and the axis taps too.
*/
const upsampleShader = (defines = /* @__PURE__ */ new Set()) => {
	const alloc = createBindingAllocator(1);
	const tent = !defines.has("QUALITY_0");
	return formatShader(`
${postProcessingStruct}

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}

${fullscreenVertex({
		corners: true,
		axis: tent,
		offset: tent ? 1 : .5
	})}

// Fragment includes
${upsample_default}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  return ${tent ? `upsampleTent(
    uTexture,
    uTextureSampler,
    input.texCoord0,
    input.texCoord0Down,
    input.texCoord0Up,
    input.texCoord0Left,
    input.texCoord0Right,
    input.texCoord0LeftUp,
    input.texCoord0RightUp,
    input.texCoord0LeftDown,
    input.texCoord0RightDown
  )` : `upsampleBilinear(
    uTexture,
    uTextureSampler,
    input.texCoord0LeftUp,
    input.texCoord0RightUp,
    input.texCoord0LeftDown,
    input.texCoord0RightDown
  )`};
}
`);
};

export { thresholdShader as n, upsampleShader as r, downsampleShader as t };