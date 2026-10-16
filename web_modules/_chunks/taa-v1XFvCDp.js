import { S as textureSamplerDeclaration, c as createBindingAllocator, l as formatShader, n as fullscreenVertex, r as postProcessingStruct, u as fragmentOutputStruct } from "./common-BiA813CC.js";
import { o as max3 } from "./math-CwQZH5H7.js";
import { t as luminance_default } from "./luminance-Dd4_sbNc.js";
import { t as taa_default } from "./taa-C1yFsdhX.js";

/**
* RCAS (Robust Contrast Adaptive Sharpening)
*
* The sharpening pass from AMD FidelityFX Super Resolution 1.0, which is CAS
* reduced to what is safe to run after a resolve: no scaling, and a limiter
* derived from the local range so it cannot ring.
*
* Reference:
* https://github.com/GPUOpen-Effects/FidelityFX-FSR/blob/master/ffx-fsr/ffx_fsr1.h
*
* Takes its five taps as parameters rather than sampling: the limiter assumes a
* roughly [0, 1] signal, so a caller working in HDR has to normalise before it
* reaches here and undo that after.
*
* Requires `math.max3`.
*
* Updates: Damien Seguin (2026-08)
*
* @member {string}
*/
var sharpen_default = `
// The strongest lobe the filter is allowed to reach, from the reference. Past
// it the negative surrounding weights overshoot into visible ringing.
const RCAS_LIMIT: f32 = 0.25 - 1.0 / 16.0;

// Guards the two reciprocals below, which are 0/0 on a fully black or fully
// white neighbourhood.
const RCAS_EPSILON: f32 = 1e-4;

/**
 * The cross around the pixel being sharpened:
 *
 *     b
 *   d e f
 *     h
 *
 * \`sharpness\` scales the lobe, 0 leaving the centre tap untouched and 1 giving
 * the reference's strongest setting — it stands in for FSR's \`exp2(-stops)\`,
 * which covers the same range from the other direction.
 */
fn rcas(b: vec3f, d: vec3f, e: vec3f, f: vec3f, h: vec3f, sharpness: f32) -> vec3f {
  let mn4 = min(min(b, d), min(f, h));
  let mx4 = max(max(b, d), max(f, h));

  // How far the centre could move before it leaves the range its neighbours
  // describe — towards black and towards white respectively. Both are per
  // channel, because a channel that is already at an extreme is the one that
  // would ring first.
  let hitMin = min(mn4, e) / max(4.0 * mx4, vec3f(RCAS_EPSILON));
  let hitMax = (1.0 - max(mx4, e)) / min(4.0 * mn4 - 4.0, vec3f(-RCAS_EPSILON));

  // The tightest channel governs, so colour cannot drift where one channel
  // still has room and another does not.
  let lobeRGB = max(-hitMin, hitMax);
  let lobe =
    max(-RCAS_LIMIT, min(max3(lobeRGB), 0.0)) * sharpness;

  // A negative lobe on the neighbours is what sharpens; the reciprocal
  // renormalises so a flat neighbourhood comes back unchanged.
  return (lobe * (b + d + f + h) + e) / (4.0 * lobe + 1.0);
}
`;

/**
* Contrast-adaptive sharpening over the resolved image.
*
* A separate pass, and deliberately not folded into the resolve: what it writes
* must never reach the history. Sharpening an image that is then sharpened
* again next frame compounds without bound, and the accumulator has to keep the
* clean version for that reason.
*/
const taaSharpenShader = () => {
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

${max3}
${luminance_default}
${taa_default}
${sharpen_default}

struct TAASharpen {
  sharpness: f32,
}
@group(0) @binding(${alloc.next()}) var<uniform> uSharpen: TAASharpen;

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}

${fullscreenVertex({ axis: true })}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let center = textureSampleLevel(uTexture, uTextureSampler, input.texCoord0, 0.0);

  // RCAS limits against the range [0, 1], and this runs on the linear HDR image
  // — the resolve is what softened it, so this is where the softening has to be
  // undone, before bloom and the tonemap see it. The same reversible curve the
  // resolve blends in brings the taps into that range and takes the result back
  // out.
  let up = taaTonemap(textureSampleLevel(uTexture, uTextureSampler, input.texCoord0Up, 0.0).rgb);
  let left = taaTonemap(textureSampleLevel(uTexture, uTextureSampler, input.texCoord0Left, 0.0).rgb);
  let middle = taaTonemap(center.rgb);
  let right = taaTonemap(textureSampleLevel(uTexture, uTextureSampler, input.texCoord0Right, 0.0).rgb);
  let down = taaTonemap(textureSampleLevel(uTexture, uTextureSampler, input.texCoord0Down, 0.0).rgb);

  let sharpened = rcas(up, left, middle, right, down, uSharpen.sharpness);

  return vec4f(max(vec3f(0.0), taaTonemapInverse(sharpened)), center.a);
}
`);
};
/**
* This frame's linear view depth, recorded for the next frame's disocclusion
* test.
*
* Its own pass rather than a second target on the resolve, so one texture can
* serve both directions: declared after the resolve, the write-after-read edge
* lets the resolve read what the last frame left before this overwrites it. A
* second output would have had to alternate between two.
*/
const taaDepthHistoryShader = () => {
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

${luminance_default}
${taa_default}

@group(0) @binding(${alloc.next()}) var<uniform> uTAA: TAAParams;

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uDepthTexture", "texture_depth_2d")}

${fullscreenVertex()}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  // Off the jittered grid, so what this records at a pixel is the surface the
  // next frame will look for there rather than the one half a pixel away.
  let depth = textureSampleLevel(
    uDepthTexture,
    uDepthTextureSampler,
    input.texCoord0 + uTAA.depthOffset,
    0
  );

  // Against this frame's view, which is what the next frame will call previous.
  let ndc = vec3f(input.texCoord0.x * 2.0 - 1.0, 1.0 - input.texCoord0.y * 2.0, depth);
  var world = uTAA.inverseViewProjectionMatrix * vec4f(ndc, 1.0);

  return vec4f(1.0 / world.w, 0.0, 0.0, 1.0);
}
`);
};
/**
* Temporal antialiasing resolve: one pass blending this frame into the
* accumulated history.
*
* Runs on the linear HDR image, before bloom and the tonemap. Anything after it
* sees a stable image, which is the point — bloom applied to a jittered frame
* would carry the jitter into its pyramid, and neighbourhood statistics
* gathered after a tonemap describe the display-referred image rather than the
* one being accumulated.
*
* `uTexture` is the chain's current image, bound by the registry.
*
* The emissive buffer resolves as a second target when something asked for it,
* against its own history and through the same reprojection: it is a full-
* resolution image off the same jittered raster, so it shimmers for exactly the
* reason the colour image does, and bloom reads it at full resolution before
* any blur can hide that. Sharing the pass rather than adding one is what keeps
* the two from having to agree on a reprojection computed twice.
*/
const taaShader = (defines = /* @__PURE__ */ new Set()) => {
	const alloc = createBindingAllocator(1);
	const velocity = defines.has("USE_TAA_VELOCITY");
	const disocclusion = defines.has("USE_TAA_DISOCCLUSION");
	const responsive = defines.has("USE_TAA_RESPONSIVE");
	const emissive = defines.has("USE_TAA_EMISSIVE");
	return formatShader(`
${postProcessingStruct}

${luminance_default}
${taa_default}

@group(0) @binding(${alloc.next()}) var<uniform> uTAA: TAAParams;

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}
${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uHistoryTexture")}
${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uDepthTexture", "texture_depth_2d")}
${velocity ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uVelocityTexture") : ""}
${disocclusion ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uPreviousDepthTexture") : ""}
${responsive ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uResponsiveTexture") : ""}
${emissive ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uEmissiveTexture") : ""}
${emissive ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uEmissiveHistoryTexture") : ""}

${fragmentOutputStruct([emissive && {
		name: "emissive",
		type: "vec4f"
	}])}

${fullscreenVertex()}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  let uv = input.texCoord0;

  // What the scene pass wrote sits on the jittered raster grid; the history and
  // this pass's output sit on pixel centres. One offset reconciles them, and
  // every read of depth or motion goes through it — see TAAParams.depthOffset.
  let gbufferUV = uv + uTAA.depthOffset;

  // Dilated either way: at a silhouette the pixel centre can sit on background
  // while the edge that moved belongs to the foreground.
  let closest = taaClosestDepthOffset(uDepthTexture, uDepthTextureSampler, gbufferUV, uTAA.texelSize);

  ${velocity ? `let previousUV = taaVelocityUV(uVelocityTexture, uVelocityTextureSampler, uv, closest.xy + uTAA.depthOffset);
  let reprojectionValid = true;` : `// No motion vectors, so only camera motion can be recovered — correct for
  // a static scene and wrong for anything that moved on its own.
  let reprojected = taaReprojectUV(uv + closest.xy, closest.z, uTAA);
  let previousUV = uv + (reprojected.xy - (uv + closest.xy));
  let reprojectionValid = reprojected.z > 0.5;`}

  ${disocclusion ? `// This pixel's own depth, not the dilated neighbour's: the dilation is
  // there to make a silhouette follow the foreground's motion, and the
  // question here is whether the history belongs to the surface being shaded.
  let centerDepth = textureSampleLevel(uDepthTexture, uDepthTextureSampler, gbufferUV, 0);
  let expectedDepth = taaPreviousViewDepth(uv, centerDepth, uTAA);
  // Derivatives before any branching, so they stay in uniform control flow.
  let depthSlope = fwidth(expectedDepth);
  let sameSurface = !taaDisoccluded(
    uPreviousDepthTexture,
    uPreviousDepthTextureSampler,
    previousUV,
    expectedDepth,
    depthSlope,
    uTAA
  );` : "let sameSurface = true;"}

  ${responsive ? `// Marked by surfaces whose motion vectors do not describe them, so the
  // history behind them is not theirs. Blended geometry writes it through its
  // own alpha, which makes a half-covering surface half responsive.
  let responsive = textureSampleLevel(uResponsiveTexture, uResponsiveTextureSampler, uv, 0.0).x;
  let blendFactor = mix(uTAA.blendFactor, 1.0, responsive);` : "let blendFactor = uTAA.blendFactor;"}

  var output: FragmentOutput;
  output.color = taaResolve(
    uv,
    previousUV,
    reprojectionValid,
    sameSurface,
    blendFactor,
    uTexture,
    uTextureSampler,
    uHistoryTexture,
    uHistoryTextureSampler,
    uTAA
  );

  ${emissive ? `output.emissive = taaResolve(
    uv,
    previousUV,
    reprojectionValid,
    sameSurface,
    blendFactor,
    uEmissiveTexture,
    uEmissiveTextureSampler,
    uEmissiveHistoryTexture,
    uEmissiveHistoryTextureSampler,
    uTAA
  );` : ""}

  return output;
}
`);
};

export { taaShader as n, taaSharpenShader as r, taaDepthHistoryShader as t };