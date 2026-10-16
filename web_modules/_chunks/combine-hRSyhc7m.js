import { A as NAMESPACE, S as textureSamplerDeclaration, c as createBindingAllocator, l as formatShader, n as fullscreenVertex, r as postProcessingStruct } from "./common-BiA813CC.js";
import { n as PI, u as saturate } from "./math-CwQZH5H7.js";
import { t as encode_decode_default } from "./encode-decode-DxwgT9tU.js";
import { t as depth_read_default } from "./depth-read-DxwvLw-k.js";
import { t as color_correction_default } from "./color-correction-q1vy327_.js";

var depth_position_default = `
fn getFarViewDir(texCoord: vec2f, fov: f32, far: f32, viewportSize: vec2f) -> vec3f {
  let hfar = 2.0 * tan(fov / 2.0) * far;
  let wfar = hfar * viewportSize.x / viewportSize.y;
  // Y is negated: texCoord runs downwards, both as fragCoord over the viewport
  // and as the fullscreen pass' texCoord0, where view space runs up.
  return vec3f(wfar * (texCoord.x - 0.5), hfar * (0.5 - texCoord.y), -far);
}

fn getViewRay(texCoord: vec2f, fov: f32, far: f32, viewportSize: vec2f) -> vec3f {
  return normalize(getFarViewDir(texCoord, fov, far, viewportSize));
}

fn reconstructPositionFromDepth(texCoord: vec2f, z: f32, fov: f32, far: f32, viewportSize: vec2f) -> vec3f {
  let ray = getFarViewDir(texCoord, fov, far, viewportSize);
  return ray * z / far;
}
`;

/**
* Fog
*
* Adapted from from Iñigo Quilez article: https://iquilezles.org/articles/fog/
*
* @type {string}
* @alias module:shaders.fog
*/
var fog_default = `
fn fog(
  rgb: vec3f,
  dist: f32,
  rayDir: vec3f,
  sunDir: vec3f,
  fogDensity: f32,
  sunColor: vec3f,
  sunDispertion: f32,
  sunIntensity: f32,
  inscatteringCoeffs: vec3f,
  fogColor: vec3f
) -> vec3f {
  let sunColorLinear = toLinearVec3(sunColor);
  let fogColorLinear = toLinearVec3(fogColor);

  let minSc = 0.02;
  let density = -(dist + 1.0) * fogDensity * 0.15 - dist * 0.0025;
  var sunAmount = pow(max(dot(rayDir, sunDir), 0.0), 1.0 / (0.008 + sunDispertion * 3.0));
  sunAmount = sunIntensity * 10.0 * pow(sunAmount, 10.0);
  sunAmount = max(0.0, min(sunAmount, 1.0));
  let sunFogColor = mix(fogColorLinear, sunColorLinear, sunAmount);
  let insColor = vec3f(1.0) - saturateVec3(vec3f(
    exp(density * (inscatteringCoeffs.x + minSc)),
    exp(density * (inscatteringCoeffs.y + minSc)),
    exp(density * (inscatteringCoeffs.z + minSc))
  ));

  return mix(rgb, sunFogColor, insColor);
}
`;

var lut_default = `
fn lut(textureColor: vec4f, lookupTable: texture_2d<f32>, lookupTableSampler: sampler, lutSize: f32) -> vec4f {
  let blueColor = textureColor.z * 63.0;

  var quad1: vec2f;
  quad1.y = floor(floor(blueColor) / 8.0);
  quad1.x = floor(blueColor) - (quad1.y * 8.0);

  var quad2: vec2f;
  quad2.y = floor(ceil(blueColor) / 8.0);
  quad2.x = ceil(blueColor) - (quad2.y * 8.0);

  let invSize = 1.0 / lutSize;
  let invHalfSize = 0.5 / lutSize;

  return mix(
    textureSample(
      lookupTable,
      lookupTableSampler,
      vec2f(
        (quad1.x * 0.125) + invHalfSize + ((0.125 - invSize) * textureColor.x),
        (quad1.y * 0.125) + invHalfSize + ((0.125 - invSize) * textureColor.y)
      )
    ),
    textureSample(
      lookupTable,
      lookupTableSampler,
      vec2f(
        (quad2.x * 0.125) + invHalfSize + ((0.125 - invSize) * textureColor.x),
        (quad2.y * 0.125) + invHalfSize + ((0.125 - invSize) * textureColor.y)
      )
    ),
    fract(blueColor)
  );
}
`;

var vignette_default = `
fn vignette(colorIn: vec3f, uv: vec2f, radius: f32, intensity: f32) -> vec3f {
  let center = vec2f(0.5);
  var color = colorIn;
  color *= smoothstep(-intensity, intensity, radius - distance(uv, center));
  return color;
}
`;

var aces_wgsl_default = `// Narkowicz 2015, "ACES Filmic Tone Mapping Curve"
fn aces(x: vec3f) -> vec3f {
  const a: f32 = 2.51;
  const b: f32 = 0.03;
  const c: f32 = 2.43;
  const d: f32 = 0.59;
  const e: f32 = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), vec3f(0.0), vec3f(1.0));
}

fn acesScalar(x: f32) -> f32 {
  const a: f32 = 2.51;
  const b: f32 = 0.03;
  const c: f32 = 2.43;
  const d: f32 = 0.59;
  const e: f32 = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

`;

var acesHill_wgsl_default = `// Stephen Hill (@self_shadow): fit of the full ACES RRT + ODT, unlike the
// luminance-only curve in aces()
// https://github.com/TheRealMJP/BakingLab/blob/master/BakingLab/ACES.hlsl

// Matrices provided in row-major order so they have been transposed
// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
const ACESInputMat = mat3x3f(
  0.59719, 0.07600, 0.02840,
  0.35458, 0.90834, 0.13383,
  0.04823, 0.01566, 0.83777
);

// ODT_SAT => XYZ => D60_2_D65 => sRGB
const ACESOutputMat = mat3x3f(
  1.60475, -0.10208, -0.00327,
  -0.53108, 1.10813, -0.07276,
  -0.07367, -0.00605, 1.07602
);

fn RRTAndODTFit(v: vec3f) -> vec3f {
  let a = v * (v + 0.0245786) - 0.000090537;
  let b = v * (0.983729 * v + 0.4329510) + 0.238081;
  return a / b;
}

fn acesHill(inputColor: vec3f) -> vec3f {
  var color = ACESInputMat * inputColor;
  color = RRTAndODTFit(color);
  color = ACESOutputMat * color;
  return clamp(color, vec3f(0.0), vec3f(1.0));
}

`;

var agx_wgsl_default = `// Missing Deadlines (Benjamin Wrensch): https://iolite-engine.com/blog_posts/minimal_agx_implementation
// Filament: https://github.com/google/filament/blob/main/filament/src/ToneMapper.cpp#L263
// https://github.com/EaryChow/AgX_LUT_Gen/blob/main/AgXBaseRec2020.py

// Three.js: https://github.com/mrdoob/three.js/blob/4993e3af579a27cec950401b523b6e796eab93ec/src/renderers/shaders/ShaderChunk/tonemapping_pars_fragment.glsl.js#L79-L89
// Matrices for rec 2020 <> rec 709 color space conversion
// matrix provided in row-major order so it has been transposed
// https://www.itu.int/pub/R-REP-BT.2407-2017
const LINEAR_REC2020_TO_LINEAR_SRGB = mat3x3f(
  1.6605, -0.1246, -0.0182,
  -0.5876, 1.1329, -0.1006,
  -0.0728, -0.0083, 1.1187
);

const LINEAR_SRGB_TO_LINEAR_REC2020 = mat3x3f(
  0.6274, 0.0691, 0.0164,
  0.3293, 0.9195, 0.0880,
  0.0433, 0.0113, 0.8956
);

// Converted to column major from blender: https://github.com/blender/blender/blob/fc08f7491e7eba994d86b610e5ec757f9c62ac81/release/datafiles/colormanagement/config.ocio#L358
const AgXInsetMatrix = mat3x3f(
  0.856627153315983, 0.137318972929847, 0.11189821299995,
  0.0951212405381588, 0.761241990602591, 0.0767994186031903,
  0.0482516061458583, 0.101439036467562, 0.811302368396859
);

// Converted to column major and inverted from https://github.com/EaryChow/AgX_LUT_Gen/blob/ab7415eca3cbeb14fd55deb1de6d7b2d699a1bb9/AgXBaseRec2020.py#L25
// https://github.com/google/filament/blob/bac8e58ee7009db4d348875d274daf4dd78a3bd1/filament/src/ToneMapper.cpp#L273-L278
const AgXOutsetMatrix = mat3x3f(
  1.1271005818144368, -0.1413297634984383, -0.14132976349843826,
  -0.11060664309660323, 1.157823702216272, -0.11060664309660294,
  -0.016493938717834573, -0.016493938717834257, 1.2519364065950405
);

const AgxMinEv: f32 = -12.47393;
const AgxMaxEv: f32 = 4.026069;

// Sample usage
fn agxCdl(inputColor: vec3f, slope: vec3f, offset: vec3f, power: vec3f, saturation: f32) -> vec3f {
  var color = LINEAR_SRGB_TO_LINEAR_REC2020 * inputColor; // From three.js

  // 1. agx()
  // Input transform (inset)
  color = AgXInsetMatrix * color;

  color = max(color, vec3f(1e-10)); // From Filament: avoid 0 or negative numbers for log2

  // Log2 space encoding
  color = clamp(log2(color), vec3f(AgxMinEv), vec3f(AgxMaxEv));
  color = (color - AgxMinEv) / (AgxMaxEv - AgxMinEv);

  color = clamp(color, vec3f(0.0), vec3f(1.0)); // From Filament

  // Apply sigmoid function approximation
  // Mean error^2: 3.6705141e-06
  let x2 = color * color;
  let x4 = x2 * x2;
  color = 15.5      * x4 * x2
          - 40.14   * x4 * color
          + 31.96   * x4
          - 6.868   * x2 * color
          + 0.4298  * x2
          + 0.1191  * color
          - 0.00232;

  // 2. agxLook()
  color = pow(color * slope + offset, power);
  const lw = vec3f(0.2126, 0.7152, 0.0722);
  let luma = dot(color, lw);
  color = luma + saturation * (color - luma);

  // 3. agxEotf()
  // Inverse input transform (outset)
  color = AgXOutsetMatrix * color;

  // sRGB IEC 61966-2-1 2.2 Exponent Reference EOTF Display
  // NOTE: We're linearizing the output here. Comment/adjust when
  // *not* using a sRGB render target
  color = pow(max(vec3f(0.0), color), vec3f(2.2)); // From filament: max()

  color = LINEAR_REC2020_TO_LINEAR_SRGB * color; // From three.js
  // Gamut mapping. Simple clamp for now.
  color = clamp(color, vec3f(0.0), vec3f(1.0));

  return color;
}

fn agx(color: vec3f) -> vec3f {
  return agxCdl(color, vec3f(1.0), vec3f(0.0), vec3f(1.0), 1.0);
}

fn agxGolden(color: vec3f) -> vec3f {
  return agxCdl(color, vec3f(1.0, 0.9, 0.5), vec3f(0.0), vec3f(0.8), 1.3);
}

fn agxPunchy(color: vec3f) -> vec3f {
  return agxCdl(color, vec3f(1.0), vec3f(0.0), vec3f(1.35), 1.4);
}

fn agxNeedle(color: vec3f) -> vec3f {
  return agxCdl(color, vec3f(1.05), vec3f(0.0), vec3f(1.1), 1.15);
}
`;

var hejl_wgsl_default = `// Hejl 2015, "ToneMapFilmic_Hejl2015"
// Purpose: This function applies a "film-like" tonemap to supplied
// HDR pixel. This curve does not approximate gamma2.2, so an explicit sRGB transform should be performed before display.
// Parameters:
//   vec3f hdr (IN) -- HDR pixel in linear space
//   f32 whitePt (IN) -- Scene white point. Must be > 0.0
// Returns: Tonemapped pixel, white point corrected, in gamma 1.0 space
// 08-18-15 v1 Jim Hejl
fn hejlCurve(hdr: vec3f, whitePt: f32) -> vec3f {
  let vh = vec4f(hdr, whitePt); // pack: [r,g,b,w]
  let va = (1.425 * vh) + 0.05; // eval filmic curve
  let vf = ((vh * va + 0.004) / ((vh * (va + 0.55) + 0.0491))) - 0.0821;
  // The curve is negative below ~0.0046 linear, so the documented whitePt > 0.0
  // is understated: at the root vf.w is 0 and the correction blows up, below it
  // the whole result flips sign. max() keeps black at black for the input side.
  return max(vec3f(0.0), vf.rgb / vf.www); // white point correction
}

fn hejl(hdr: vec3f) -> vec3f {
  const W: f32 = 11.2; // scene white point, as uncharted2
  return hejlCurve(hdr, W);
}

`;

var filmic_wgsl_default = `// Filmic Tonemapping Operators http://filmicworlds.com/blog/filmic-tonemapping-operators/
fn filmic(x: vec3f) -> vec3f {
  let X = max(vec3f(0.0), x - 0.004);
  let result = (X * (6.2 * X + 0.5)) / (X * (6.2 * X + 1.7) + 0.06);
  return pow(result, vec3f(2.2));
}

fn filmicScalar(x: f32) -> f32 {
  let X = max(0.0, x - 0.004);
  let result = (X * (6.2 * X + 0.5)) / (X * (6.2 * X + 1.7) + 0.06);
  return pow(result, 2.2);
}

`;

var lottes_wgsl_default = `// Lottes 2016, "Advanced Techniques and Optimization of HDR Color Pipelines"
fn lottes(x: vec3f) -> vec3f {
  const a = vec3f(1.6);
  const d = vec3f(0.977);
  const hdrMax = vec3f(8.0);
  const midIn = vec3f(0.18);
  const midOut = vec3f(0.267);

  // let, not const: pow() const-evaluation is uneven across implementations
  let b =
      (-pow(midIn, a) + pow(hdrMax, a) * midOut) /
      ((pow(hdrMax, a * d) - pow(midIn, a * d)) * midOut);
  let c =
      (pow(hdrMax, a * d) * pow(midIn, a) - pow(hdrMax, a) * pow(midIn, a * d) * midOut) /
      ((pow(hdrMax, a * d) - pow(midIn, a * d)) * midOut);

  return pow(x, a) / (pow(x, a * d) * b + c);
}

fn lottesScalar(x: f32) -> f32 {
  const a: f32 = 1.6;
  const d: f32 = 0.977;
  const hdrMax: f32 = 8.0;
  const midIn: f32 = 0.18;
  const midOut: f32 = 0.267;

  let b =
      (-pow(midIn, a) + pow(hdrMax, a) * midOut) /
      ((pow(hdrMax, a * d) - pow(midIn, a * d)) * midOut);
  let c =
      (pow(hdrMax, a * d) * pow(midIn, a) - pow(hdrMax, a) * pow(midIn, a * d) * midOut) /
      ((pow(hdrMax, a * d) - pow(midIn, a * d)) * midOut);

  return pow(x, a) / (pow(x, a * d) * b + c);
}

`;

var neutral_wgsl_default = `// Khronos PBR Neutral Tone Mapper
// https://github.com/KhronosGroup/ToneMapping/tree/main/PBR_Neutral

// Input color is non-negative and resides in the Linear Rec. 709 color space.
// Output color is also Linear Rec. 709, but in the [0, 1] range.
fn neutral(inputColor: vec3f) -> vec3f {
  const startCompression: f32 = 0.8 - 0.04;
  const desaturation: f32 = 0.15;

  var color = inputColor;

  let x = min(color.r, min(color.g, color.b));
  let offset = select(0.04, x - 6.25 * x * x, x < 0.08);
  color -= offset;

  let peak = max(color.r, max(color.g, color.b));
  if (peak < startCompression) { return color; }

  const d: f32 = 1.0 - startCompression;
  let newPeak = 1.0 - d * d / (peak + d - startCompression);
  color *= newPeak / peak;

  let g = 1.0 - 1.0 / (desaturation * (peak - newPeak) + 1.0);
  return mix(color, vec3f(newPeak), g);
}

`;

var reinhard_wgsl_default = `fn reinhard(x: vec3f) -> vec3f {
  return x / (1.0 + x);
}

fn reinhardScalar(x: f32) -> f32 {
  return x / (1.0 + x);
}

`;

var reinhard2_wgsl_default = `fn reinhard2(x: vec3f) -> vec3f {
  const L_white: f32 = 4.0;

  return (x * (1.0 + x / (L_white * L_white))) / (1.0 + x);
}

fn reinhard2Scalar(x: f32) -> f32 {
  const L_white: f32 = 4.0;

  return (x * (1.0 + x / (L_white * L_white))) / (1.0 + x);
}

`;

var reinhardJodie_wgsl_default = `// Reinhard driven by luminance, then blended per channel by the per channel
// result, so saturated colors keep their hue instead of skewing towards
// whichever channel compresses first
// https://64.github.io/tonemapping/#reinhard-jodie
fn reinhardJodie(x: vec3f) -> vec3f {
  const lw = vec3f(0.2126, 0.7152, 0.0722);

  let l = dot(x, lw);
  let tv = x / (1.0 + x);

  return mix(x / (1.0 + l), tv, tv);
}

`;

var uchimura_wgsl_default = `// Uchimura 2017, "HDR theory and practice"
// Math: https://www.desmos.com/calculator/gslcdxvipg
// Source: https://www.slideshare.net/nikuque/hdr-theory-and-practicce-jp
fn uchimuraCurve(x: vec3f, P: f32, a: f32, m: f32, l: f32, c: f32, b: f32) -> vec3f {
  let l0 = ((P - m) * l) / a;
  let S0 = m + l0;
  let S1 = m + a * l0;
  let C2 = (a * P) / (P - S1);
  let CP = -C2 / P;

  let w0 = 1.0 - smoothstep(vec3f(0.0), vec3f(m), x);
  let w2 = step(vec3f(m + l0), x);
  let w1 = 1.0 - w0 - w2;

  let T = m * pow(x / m, vec3f(c)) + b;
  let S = P - (P - S1) * exp(CP * (x - S0));
  let L = m + a * (x - m);

  return T * w0 + L * w1 + S * w2;
}

fn uchimura(x: vec3f) -> vec3f {
  const P: f32 = 1.0;  // max display brightness
  const a: f32 = 1.0;  // contrast
  const m: f32 = 0.22; // linear section start
  const l: f32 = 0.4;  // linear section length
  const c: f32 = 1.33; // black
  const b: f32 = 0.0;  // pedestal

  return uchimuraCurve(x, P, a, m, l, c, b);
}

fn uchimuraCurveScalar(x: f32, P: f32, a: f32, m: f32, l: f32, c: f32, b: f32) -> f32 {
  let l0 = ((P - m) * l) / a;
  let S0 = m + l0;
  let S1 = m + a * l0;
  let C2 = (a * P) / (P - S1);
  let CP = -C2 / P;

  let w0 = 1.0 - smoothstep(0.0, m, x);
  let w2 = step(m + l0, x);
  let w1 = 1.0 - w0 - w2;

  let T = m * pow(x / m, c) + b;
  let S = P - (P - S1) * exp(CP * (x - S0));
  let L = m + a * (x - m);

  return T * w0 + L * w1 + S * w2;
}

fn uchimuraScalar(x: f32) -> f32 {
  const P: f32 = 1.0;  // max display brightness
  const a: f32 = 1.0;  // contrast
  const m: f32 = 0.22; // linear section start
  const l: f32 = 0.4;  // linear section length
  const c: f32 = 1.33; // black
  const b: f32 = 0.0;  // pedestal

  return uchimuraCurveScalar(x, P, a, m, l, c, b);
}

`;

var uncharted2_wgsl_default = `fn uncharted2Curve(x: vec3f) -> vec3f {
  const A: f32 = 0.15;
  const B: f32 = 0.50;
  const C: f32 = 0.10;
  const D: f32 = 0.20;
  const E: f32 = 0.02;
  const F: f32 = 0.30;
  return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}

fn uncharted2(color: vec3f) -> vec3f {
  const W: f32 = 11.2;
  const exposureBias: f32 = 2.0;
  let curr = uncharted2Curve(exposureBias * color);
  let whiteScale = 1.0 / uncharted2Curve(vec3f(W));
  return curr * whiteScale;
}

fn uncharted2CurveScalar(x: f32) -> f32 {
  const A: f32 = 0.15;
  const B: f32 = 0.50;
  const C: f32 = 0.10;
  const D: f32 = 0.20;
  const E: f32 = 0.02;
  const F: f32 = 0.30;
  return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}

fn uncharted2Scalar(color: f32) -> f32 {
  const W: f32 = 11.2;
  const exposureBias: f32 = 2.0;
  let curr = uncharted2CurveScalar(exposureBias * color);
  let whiteScale = 1.0 / uncharted2CurveScalar(W);
  return curr * whiteScale;
}

`;

var unreal_wgsl_default = `// Unreal 3, Documentation: "Color Grading"
// Adapted to be close to Tonemap_ACES, with similar range
// Gamma 2.2 correction is baked in, don't use with sRGB conversion!
fn unreal(x: vec3f) -> vec3f {
  return x / (x + 0.155) * 1.019;
}

fn unrealScalar(x: f32) -> f32 {
  return x / (x + 0.155) * 1.019;
}

`;

/**
* Operator name, as `postProcessing.toneMap` spells it, to the module that
* declares it. Neither half is derivable from the other: one module can declare
* several operators (AgX ships three looks besides the base curve), and the
* export key is the module, not the function.
*
* Only the selected module is included. Concatenating all of them would work
* today — no two share a symbol — but each carries module-scope constants
* (`ACESInputMat`, `AgXInsetMatrix`, the Rec.2020 matrices), so one added
* operator colliding with another module or with a chunk would break every
* variant of this shader, not just the one that selected it.
*/
const TONE_MAP_SOURCES = {
	aces: aces_wgsl_default,
	acesHill: acesHill_wgsl_default,
	agx: agx_wgsl_default,
	agxGolden: agx_wgsl_default,
	agxNeedle: agx_wgsl_default,
	agxPunchy: agx_wgsl_default,
	filmic: filmic_wgsl_default,
	hejl: hejl_wgsl_default,
	lottes: lottes_wgsl_default,
	neutral: neutral_wgsl_default,
	reinhard: reinhard_wgsl_default,
	reinhard2: reinhard2_wgsl_default,
	reinhardJodie: reinhardJodie_wgsl_default,
	uchimura: uchimura_wgsl_default,
	uncharted2: uncharted2_wgsl_default,
	unreal: unreal_wgsl_default
};
/** Selectable tone map operators, in `postProcessing.toneMap` terms. */
const TONE_MAP_OPERATORS = Object.keys(TONE_MAP_SOURCES);
/**
* Prefix that carries the selection through `defines` — `TONE_MAP_agxPunchy`. A
* define with a value in its name, as `COLOR_FUNCTION_*` is: it keys the
* pipeline variant like any other define, and what follows the prefix is
* literally the WGSL function the pass calls.
*/
const TONE_MAP_DEFINE = "TONE_MAP_";
/**
* Composites the HDR chain — fog, ambient occlusion, bloom — then tonemaps and
* applies the display-referred grade.
*
* Every `Combine` member is always written, whichever effects are on: gating
* struct fields would make the packing depend on the define set, and the cost
* of a few unread floats in one per-pass uniform buffer is nil.
*
* With no `TONE_MAP_*` define the chain is left scene-referred and only
* encoded, matching `postProcessing.toneMap: null`.
*/
const combineShader = (defines = /* @__PURE__ */ new Set()) => {
	const operator = [...defines].find((define) => define.startsWith(TONE_MAP_DEFINE))?.slice(9);
	const toneMapSource = operator ? TONE_MAP_SOURCES[operator] : void 0;
	if (operator && !toneMapSource) console.error(NAMESPACE, "post-processing", `unknown tone map "${operator}", expected one of ${TONE_MAP_OPERATORS.join(", ")}`);
	const useFog = defines.has("USE_FOG");
	const useBloom = defines.has("USE_BLOOM");
	const useLensFlare = defines.has("USE_LENS_FLARE");
	const useVignette = defines.has("USE_VIGNETTE");
	const useLUT = defines.has("USE_LUT");
	const useColorCorrection = defines.has("USE_COLOR_CORRECTION");
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

struct Combine {
  viewMatrix: mat4x4f,
  fogColor: vec3f,
  fogStart: f32,
  sunPosition: vec3f,
  fogDensity: f32,
  sunColor: vec3f,
  sunDispertion: f32,
  inscatteringCoeffs: vec3f,
  sunIntensity: f32,
  near: f32,
  far: f32,
  fov: f32,
  exposure: f32,
  bloomIntensity: f32,
  lensFlareIntensity: f32,
  vignetteRadius: f32,
  vignetteIntensity: f32,
  lutTextureSize: f32,
  brightness: f32,
  contrast: f32,
  saturation: f32,
  hue: f32,
}
@group(0) @binding(${alloc.next()}) var<uniform> uCombine: Combine;

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}
${useFog ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uDepthTexture", "texture_depth_2d") : ""}
${useBloom ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uBloomTexture") : ""}
${useLensFlare ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uLensFlareTexture") : ""}
${useLUT ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uLUTTexture") : ""}

${fullscreenVertex()}

// Fragment includes
${PI}
${saturate}
${encode_decode_default}
${toneMapSource ?? ""}
${useFog ? `${depth_read_default}\n${depth_position_default}\n${fog_default}` : ""}
${useVignette ? vignette_default : ""}
${useLUT ? lut_default : ""}
${useColorCorrection ? color_correction_default : ""}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let uv = input.texCoord0;
  var color = textureSample(uTexture, uTextureSampler, uv);

  // HDR effects
  ${useFog ? `let z = readDepth(uDepthTexture, uDepthTextureSampler, uv, uCombine.near, uCombine.far);
  let position = reconstructPositionFromDepth(uv, z, uCombine.fov, uCombine.far, uPostProcessing.viewportSize);
  let rayLength = length(position);
  let sunDirection = normalize((uCombine.viewMatrix * vec4f(normalize(uCombine.sunPosition), 0.0)).xyz);
  color = vec4f(
    fog(
      color.rgb,
      rayLength - uCombine.fogStart,
      position / rayLength,
      sunDirection,
      uCombine.fogDensity,
      uCombine.sunColor,
      uCombine.sunDispertion,
      uCombine.sunIntensity,
      uCombine.inscatteringCoeffs,
      uCombine.fogColor
    ),
    color.a
  );` : ""}
  ${useBloom ? "color = vec4f(color.rgb + textureSample(uBloomTexture, uBloomTextureSampler, uv).rgb * uCombine.bloomIntensity, color.a);" : ""}
  ${useLensFlare ? "color = vec4f(color.rgb + textureSample(uLensFlareTexture, uLensFlareTextureSampler, uv).rgb * uCombine.lensFlareIntensity, color.a);" : ""}

  // Grading exposure — the camera's is already in the image — then tone
  // mapping and gamma conversion.
  color = vec4f(color.rgb * uCombine.exposure, color.a);
  ${toneMapSource ? `color = vec4f(saturateVec3(${operator}(color.rgb)), color.a);` : ""}

  var colorSRGB = encode(color, SRGB);

  // LDR effects
  ${useVignette ? "colorSRGB = vec4f(vignette(colorSRGB.rgb, uv, uCombine.vignetteRadius, uCombine.vignetteIntensity), colorSRGB.a);" : ""}
  ${useLUT ? "colorSRGB = vec4f(lut(vec4f(colorSRGB.rgb, 1.0), uLUTTexture, uLUTTextureSampler, uCombine.lutTextureSize).rgb, colorSRGB.a);" : ""}
  ${useColorCorrection ? `colorSRGB = vec4f(brightnessContrastVec3(colorSRGB.rgb, uCombine.brightness, uCombine.contrast), colorSRGB.a);
  colorSRGB = vec4f(saturation(colorSRGB.rgb, uCombine.saturation), colorSRGB.a);
  colorSRGB = vec4f(hue(colorSRGB.rgb, uCombine.hue / 180.0 * PI), colorSRGB.a);` : ""}

  return decode(colorSRGB, SRGB);
}
`);
};

export { TONE_MAP_OPERATORS as n, combineShader as r, TONE_MAP_DEFINE as t };