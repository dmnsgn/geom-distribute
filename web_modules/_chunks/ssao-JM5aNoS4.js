import { S as textureSamplerDeclaration, c as createBindingAllocator, l as formatShader, n as fullscreenVertex, r as postProcessingStruct, t as FRAGMENT_COORD, u as fragmentOutputStruct } from "./common-BiA813CC.js";
import { n as PI, r as TWO_PI, t as HALF_PI, u as saturate } from "./math-CwQZH5H7.js";
import { t as depth_read_default } from "./depth-read-DxwvLw-k.js";
import { t as color_correction_default } from "./color-correction-q1vy327_.js";

/**
* Depth pyramid
*
* The linear view-space depth pyramid both screen-space AO estimators sample:
* one compute dispatch turning the hardware depth buffer into a mip chain, so a
* tap far from its pixel reads a coarse level that is still in cache.
*
* Levels 1..3 reduce through workgroup memory, which is why this is a compute
* pass rather than one fullscreen pass per level: the whole chain costs a
* single read of the depth buffer.
*
* The reduction filter is the one thing the two estimators disagree on, so it
* is an override rather than two copies of the reduction:
*
* - Rotated grid subsampling picks one of each quad's four depths instead of
*   combining them, so every level holds a value that was actually in the
*   scene. McGuire12 table 1 compares five filters and recommends it.
* - The weighted mean biases towards the closest of the four, so a mip keeps a
*   thin occluder rather than averaging it into the surface behind it. XeGTAO's
*   own choice, and GTAO's falloff parameters are tuned against it.
*
* Paper:
* https://research.nvidia.com/sites/default/files/pubs/2012-06_Scalable-Ambient-Obscurance/McGuire12SAO.pdf
*
* Requires `depthRead` and `math.saturate`.
*
* @type {string}
* @alias module:shaders.depthPyramid
*/
var depth_pyramid_default = `
struct DepthPyramidParams {
  near: f32,
  far: f32,
  // Weighted mean only: the distance over which a nearer depth outweighs the
  // rest of its quad. Ignored under rotated grid subsampling.
  effectRadius: f32,
  falloffRange: f32,
}

override DEPTH_PYRAMID_ROTATED_GRID: bool = false;

// Found empirically by the XeGTAO reference implementation.
const DEPTH_PYRAMID_RANGE_SCALE_FACTOR: f32 = 0.75;

fn depthPyramidWeightedMean(depths: vec4f, params: DepthPyramidParams) -> f32 {
  let effectRadius = DEPTH_PYRAMID_RANGE_SCALE_FACTOR * params.effectRadius;
  let falloffRange = params.falloffRange * effectRadius;
  let falloffFrom = effectRadius * (1.0 - params.falloffRange);
  let falloffMul = -1.0 / falloffRange;
  let falloffAdd = falloffFrom / falloffRange + 1.0;

  let maxDepth = max(max(depths.x, depths.y), max(depths.z, depths.w));
  let weights = saturateVec4((vec4f(maxDepth) - depths) * falloffMul + falloffAdd);

  return dot(weights, depths) / (weights.x + weights.y + weights.z + weights.w);
}

// z[m+1](x, y) = z[m](2x + (y & 1), 2y + (x & 1)). Rotating the choice with the
// destination parity is what stops the subsample drifting towards one corner of
// the quad and reintroducing the directional bias averaging would have caused.
fn depthPyramidRotatedGrid(depths: vec4f, destCoord: vec2i) -> f32 {
  let odd = (destCoord.y & 1) != 0;
  return select(
    select(depths.x, depths.y, odd),
    select(depths.z, depths.w, odd),
    (destCoord.x & 1) != 0
  );
}

// The inverse, applied once per level: which full resolution texel a coarse
// value came from. Only a subsampling filter has one — a filter that combines
// its quad has no single source — and it is what lets a reader reconstruct a
// sample at a point that was actually in the scene. Pairing a coarse depth with
// the reader's own tap position instead displaces the sample off the surface by
// the depth slope across the level's footprint, which reads as ambient
// occlusion that grows with how steeply a surface is inclined to the view.
fn depthPyramidRotatedGridSource(mipCoord: vec2i, mipLevel: i32) -> vec2i {
  var coord = mipCoord;
  for (var level = 0; level < mipLevel; level++) {
    coord = vec2i(2 * coord.x + (coord.y & 1), 2 * coord.y + (coord.x & 1));
  }
  return coord;
}

// \`depths\` holds the quad in the order (0,0), (1,0), (0,1), (1,1).
fn depthPyramidFilter(depths: vec4f, destCoord: vec2i, params: DepthPyramidParams) -> f32 {
  if (DEPTH_PYRAMID_ROTATED_GRID) {
    return depthPyramidRotatedGrid(depths, destCoord);
  }
  return depthPyramidWeightedMean(depths, params);
}

// Screen space to view space depth, pinned so the background reads exactly the
// far plane — which is what an estimator tests to skip a pixel with no surface.
// Pinned rather than clamped: whether the linearisation of a cleared depth
// lands above or below far is decided by how near and far round in f32, and a
// value a fraction under it is a surface as far as that test is concerned. Of
// the near/far pairs a camera plausibly uses, about a third round the wrong
// way, and the estimator then runs across the whole sky.
fn depthPyramidLinearize(depthTex: texture_depth_2d, pixCoord: vec2i, params: DepthPyramidParams) -> f32 {
  let size = vec2i(textureDimensions(depthTex, 0));
  let screenDepth = textureLoad(depthTex, clamp(pixCoord, vec2i(0), size - vec2i(1)), 0);
  if (screenDepth >= 1.0) {
    return params.far;
  }
  return min(linearizeDepthPerspZO(screenDepth, params.near, params.far), params.far);
}

// The pyramid is r32uint holding bitcast floats: core WebGPU has no
// storage-capable 16-bit single-channel format, and r32float binds as
// unfilterable-float. It costs nothing — both estimators read the pyramid by
// point access anyway, since filtering blends depths describing different
// surfaces, and across mip levels different resolutions of them.
fn depthPyramidLoad(depthTex: texture_2d<u32>, pixCoord: vec2i, mipLevel: i32) -> f32 {
  let size = vec2i(textureDimensions(depthTex, u32(mipLevel)));
  return bitcast<f32>(textureLoad(depthTex, clamp(pixCoord, vec2i(0), size - vec2i(1)), mipLevel).x);
}

fn depthPyramidSample(depthTex: texture_2d<u32>, screenPos: vec2f, mipLevel: i32) -> f32 {
  let size = vec2f(textureDimensions(depthTex, u32(mipLevel)));
  return depthPyramidLoad(depthTex, vec2i(screenPos * size), mipLevel);
}

var<workgroup> depthPyramidScratch: array<array<f32, 8u>, 8u>;

// Each thread covers a 2x2 block, so a workgroup of 8x8 covers 16x16 pixels and
// produces four levels.
fn depthPyramidBuild16x16(
  dispatchThreadID: vec2u,
  groupThreadID: vec2u,
  depthTex: texture_depth_2d,
  params: DepthPyramidParams,
  outDepth0: texture_storage_2d<r32uint, write>,
  outDepth1: texture_storage_2d<r32uint, write>,
  outDepth2: texture_storage_2d<r32uint, write>,
  outDepth3: texture_storage_2d<r32uint, write>
) {
  // MIP 0
  let baseCoord = vec2i(dispatchThreadID);
  let pixCoord = baseCoord * 2;

  let depths = vec4f(
    depthPyramidLinearize(depthTex, pixCoord + vec2i(0, 0), params),
    depthPyramidLinearize(depthTex, pixCoord + vec2i(1, 0), params),
    depthPyramidLinearize(depthTex, pixCoord + vec2i(0, 1), params),
    depthPyramidLinearize(depthTex, pixCoord + vec2i(1, 1), params)
  );
  // Stores past the edge of a texture are dropped, so the ragged last tile of a
  // viewport that is not a multiple of 16 needs no guard.
  textureStore(outDepth0, pixCoord + vec2i(0, 0), vec4u(bitcast<u32>(depths.x)));
  textureStore(outDepth0, pixCoord + vec2i(1, 0), vec4u(bitcast<u32>(depths.y)));
  textureStore(outDepth0, pixCoord + vec2i(0, 1), vec4u(bitcast<u32>(depths.z)));
  textureStore(outDepth0, pixCoord + vec2i(1, 1), vec4u(bitcast<u32>(depths.w)));

  // MIP 1
  let dm1 = depthPyramidFilter(depths, baseCoord, params);
  textureStore(outDepth1, baseCoord, vec4u(bitcast<u32>(dm1)));
  depthPyramidScratch[groupThreadID.x][groupThreadID.y] = dm1;

  // Every barrier sits at uniform scope: each level reduces through shared
  // memory with a quarter of the threads, and a barrier reached by only some
  // invocations of a workgroup is undefined.
  workgroupBarrier();

  // MIP 2
  if (all((groupThreadID % vec2u(2u)) == vec2u(0u))) {
    let destCoord = baseCoord / 2;
    let dm2 = depthPyramidFilter(vec4f(
      depthPyramidScratch[groupThreadID.x + 0u][groupThreadID.y + 0u],
      depthPyramidScratch[groupThreadID.x + 1u][groupThreadID.y + 0u],
      depthPyramidScratch[groupThreadID.x + 0u][groupThreadID.y + 1u],
      depthPyramidScratch[groupThreadID.x + 1u][groupThreadID.y + 1u]
    ), destCoord, params);
    textureStore(outDepth2, destCoord, vec4u(bitcast<u32>(dm2)));
    depthPyramidScratch[groupThreadID.x][groupThreadID.y] = dm2;
  }

  workgroupBarrier();

  // MIP 3
  if (all((groupThreadID % vec2u(4u)) == vec2u(0u))) {
    let destCoord = baseCoord / 4;
    let dm3 = depthPyramidFilter(vec4f(
      depthPyramidScratch[groupThreadID.x + 0u][groupThreadID.y + 0u],
      depthPyramidScratch[groupThreadID.x + 2u][groupThreadID.y + 0u],
      depthPyramidScratch[groupThreadID.x + 0u][groupThreadID.y + 2u],
      depthPyramidScratch[groupThreadID.x + 2u][groupThreadID.y + 2u]
    ), destCoord, params);
    textureStore(outDepth3, destCoord, vec4u(bitcast<u32>(dm3)));
  }
}
`;

/**
* Bilateral blur
*
* Depth-aware blur: samples are weighted down as their linear depth diverges
* from the center depth, so the blur doesn't bleed across depth discontinuities
* (e.g. SSAO around silhouette edges).
*
* One separable pass along `axis`, reaching `radius` pixels either side over
* nine taps, as McGuire12 2.4 has it.
*
* @type {string}
* @alias module:shaders.blur
*/
var blur_default = `
// Taps run from -EXTENT to +EXTENT in steps of two, and the weights below are
// expressed in those units. The caller's pixel radius is mapped onto them here
// so the tap count stays the chunk's business.
const BILATERAL_BLUR_TAP_EXTENT: f32 = 8.0;

// McGuire12's own spatial weights: a stddev-2 Gaussian, plus a 0.3 floor on
// every tap except the centre. The profile that leaves is nearly flat, and
// deliberately so — underweighting the centre is what makes nine taps average
// like ~8.6 independent samples where a plain Gaussian over the same reach
// manages ~4.8, and variance is what the pass exists to remove. Edges are the
// range term's business, not the spatial one's.
const BILATERAL_BLUR_GAUSSIAN = array<f32, 5>(0.153170, 0.144893, 0.122649, 0.092902, 0.062970);
const BILATERAL_BLUR_BASE: f32 = 0.3;

fn bilateralBlur(
  tex: texture_2d<f32>,
  texSampler: sampler,
  depthTex: texture_depth_2d,
  depthSampler: sampler,
  uv: vec2f,
  axis: vec2f,
  radius: f32,
  resolution: vec2f,
  near: f32,
  far: f32,
  sharpness: f32
) -> vec4f {
  var color = vec4f(0.0);
  var weightSum = 0.0;

  let centerDepth = readDepth(depthTex, depthSampler, uv, near, far);
  // The outermost tap lands on \`radius\`, so the caller's reach is in pixels and
  // the spacing follows from it.
  let stride = radius / BILATERAL_BLUR_TAP_EXTENT;

  for (var i = -8; i <= 8; i += 2) {
    let sampleUV = uv + (axis * (f32(i) * stride)) / resolution;

    let gaussian = BILATERAL_BLUR_GAUSSIAN[abs(i) / 2];
    let spatial = select(BILATERAL_BLUR_BASE + gaussian, gaussian, i == 0);

    // Range term: weight falls off with the linear depth difference, so the
    // blur stops at a silhouette instead of dragging occlusion over it.
    let sampleDepth = readDepth(depthTex, depthSampler, sampleUV, near, far);
    let diff = (sampleDepth - centerDepth) * sharpness;
    let weight = spatial * exp2(-diff * diff);

    weightSum += weight;
    color += textureSampleLevel(tex, texSampler, sampleUV, 0.0) * weight;
  }

  return color / weightSum;
}
`;

/**
* GTAO (Ground Truth Ambient Occlusion)
*
* Paper:
* https://www.activision.com/cdn/research/Practical_Real_Time_Strategies_for_Accurate_Indirect_Occlusion_NEW%20VERSION_COLOR.pdf
*
* Reference Implementation:
* https://github.com/GameTechDev/XeGTAO/blob/master/Source/Rendering/Shaders/XeGTAO.hlsli
*
* Split into the three passes the technique needs, since they share only the
* constants, the estimator, and the edge-aware denoiser. The depth pyramid the
* estimator samples is built by the shared `depthPyramid` chunk.
*
* Two conventions differ from the reference and everything else follows from
* them. View space here is right-handed with -Z forward, where XeGTAO's is
* left-handed; only the bent normal's construction frame notices, the rest
* being dot and cross products among consistently-signed vectors. And screen
* coordinates are WebGPU's, with V pointing down, which the vertical terms of
* `ndcToViewMul`/`ndcToViewAdd` and the slice direction's `omega` carry the
* sign for.
*
* Updates: Damien Seguin (2023-10, 2026-08)
*
* @type {object}
* @name gtao
* @static
*/
/**
* Constants, parameters and the helpers both passes share. Requires `math.PI`,
* `math.HALF_PI`, `math.saturate` and `depthRead`.
*
* @member {string}
*/
const common = `
struct GTAOParams {
  // View position = (ndcToViewMul * uv + ndcToViewAdd) * viewspaceZ. Baked per
  // camera so no pixel evaluates tan(), and so the vertical term can carry the
  // sign that turns a V-down screen coordinate back into a Y-up view space.
  ndcToViewMul: vec2f,
  ndcToViewAdd: vec2f,
  // ndcToViewMul / viewportSize: view-space size of one pixel at unit depth.
  ndcToViewMulByPixelSize: vec2f,
  viewportSize: vec2f,
  viewportPixelSize: vec2f,
  near: f32,
  far: f32,
  // World (view space) size of the occlusion sphere.
  effectRadius: f32,
  // Lets the tuned radius differ from the ground-truth one, countering biases
  // that screen-space gathering has no way to avoid.
  radiusMultiplier: f32,
  // Fraction of the radius over which a sample's contribution fades out.
  effectFalloffRange: f32,
  // 1.0 spreads samples evenly along a slice, higher pulls them towards the
  // center, where the small crevices are.
  sampleDistributionPower: f32,
  // Discards samples behind the center sooner, countering a depth buffer that
  // holds no thickness information.
  thinOccluderCompensation: f32,
  // occlusion = pow(occlusion, finalValuePower).
  finalValuePower: f32,
  // How far to take the term towards full occlusion: 0 leaves the surface
  // unoccluded, 1 applies the estimate as computed. Applied here rather than
  // where the term is consumed, since it is consumed as a lighting input.
  mix: f32,
  // Trades memory bandwidth against temporal stability and thin-object
  // accuracy: higher reads a coarser depth mip at the same offset.
  depthMipSamplingOffset: f32,
  // Center tap weight in the denoiser: higher blurs less.
  denoiseBlurBeta: f32,
  brightness: f32,
  contrast: f32,
  // frameIndex % 64 under a temporal filter, 0 without one.
  noiseIndex: u32,
}

override GTAO_NUM_SLICES: i32 = 3;
override GTAO_NUM_STEPS_PER_SLICE: i32 = 3;
override USE_GTAO_BENT_NORMALS: bool = false;

// If the offset is under approximately pixel size, push it out to this distance.
const GTAO_PIXEL_TOO_CLOSE_THRESHOLD: f32 = 1.3;
// Coarsest level the prefilter produces. One below the reference's, because a
// storage texture view is a single mip and WebGPU only guarantees four storage
// texture bindings per stage (maxStorageTexturesPerShaderStage) — so a fifth
// level would cost every adapter that stops at the guarantee. It reaches far
// enough: at the default depthMipSamplingOffset, level 3 already covers sample
// offsets past ~80 pixels.
const GTAO_DEPTH_MIP_MAX_LEVEL: f32 = 3.0;
// Raw visibility overshoots 1 and only averages out to it once denoised, so it
// is divided by this on the way into UNORM and multiplied back by the last
// denoise pass — see \`finalApply\`.
const GTAO_OCCLUSION_TERM_SCALE: f32 = 1.5;

// Inputs are screen UV and viewspace depth, output is viewspace position. The
// pyramid stores a positive distance; -Z forward puts the surface in front of
// the camera.
fn gtaoComputeViewspacePosition(screenPos: vec2f, viewspaceDepth: f32, params: GTAOParams) -> vec3f {
  return vec3f((params.ndcToViewMul * screenPos + params.ndcToViewAdd) * viewspaceDepth, -viewspaceDepth);
}

// http://h14s.p5r.org/2012/09/0x5f3759df.html, [Drobot2014a] Low Level
// Optimizations for GCN
fn gtaoFastSqrt(x: f32) -> f32 {
  return bitcast<f32>(0x1fbd1df5 + (bitcast<i32>(x) >> 1u));
}

// Input [-1, 1] and output [0, PI], from https://seblagarde.wordpress.com/2014/12/01/inverse-trigonometric-functions-gpu-optimization-for-amd-gcn-architecture/
fn gtaoFastACos(inX: f32) -> f32 {
  let x = abs(inX);
  var res = -0.156583 * x + HALF_PI;
  res *= gtaoFastSqrt(1.0 - x);
  return select(PI - res, res, inX >= 0.0);
}

// Index along a Hilbert curve, which visits every pixel of a 64x64 tile without
// ever leaving its own neighbourhood.
const GTAO_HILBERT_WIDTH: u32 = 64u;

fn gtaoHilbertIndex(inPosX: u32, inPosY: u32) -> u32 {
  var posX = inPosX;
  var posY = inPosY;
  var index = 0u;

  for (var level = GTAO_HILBERT_WIDTH / 2u; level > 0u; level /= 2u) {
    let regionX = u32((posX & level) > 0u);
    let regionY = u32((posY & level) > 0u);
    index += level * level * ((3u * regionX) ^ regionY);

    if (regionY == 0u) {
      if (regionX == 1u) {
        posX = (GTAO_HILBERT_WIDTH - 1u) - posX;
        posY = (GTAO_HILBERT_WIDTH - 1u) - posY;
      }
      let temp = posX;
      posX = posY;
      posY = temp;
    }
  }

  return index;
}

// Hilbert curve driving an R2 sequence (https://www.shadertoy.com/view/3tB3z3):
// low-discrepancy in screen space, so neighbouring pixels take complementary
// samples for the denoiser to average — the property a blue noise texture is
// normally fetched for, at no bandwidth and with no tile size to alias against.
// Advancing the index per frame walks the same sequence, which is what a
// temporal filter needs in order to converge rather than flicker.
fn gtaoSpatioTemporalNoise(pixCoord: vec2u, temporalIndex: u32) -> vec2f {
  var index = gtaoHilbertIndex(pixCoord.x % GTAO_HILBERT_WIDTH, pixCoord.y % GTAO_HILBERT_WIDTH);
  // 288 is the reference's empirical pick for a 64-wide curve.
  index += 288u * (temporalIndex % 64u);

  // R2 sequence, see http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/
  return fract(0.5 + f32(index) * vec2f(0.75487766624669276, 0.5698402909980533));
}
`;
/**
* The estimator: a horizon search over `GTAO_NUM_SLICES` slices of
* `GTAO_NUM_STEPS_PER_SLICE` steps, producing visibility, a bent normal under
* `USE_GTAO_BENT_NORMALS`, and the edge weights the denoiser needs. Requires
* {@link common}, `depthPyramid` and `colorCorrection`.
*
* @member {string}
*/
const main = `
struct GTAOTerm {
  // Raw, before the UNORM scale: overshoots 1 until denoised.
  visibility: f32,
  // Average unoccluded direction, in view space. Equal to the surface normal
  // unless USE_GTAO_BENT_NORMALS is on.
  bentNormal: vec3f,
  // Per-direction weights for the denoiser, 0 across a depth discontinuity.
  edgesLRTB: vec4f,
}

fn gtaoCalculateEdges(centerZ: f32, leftZ: f32, rightZ: f32, topZ: f32, bottomZ: f32) -> vec4f {
  var edgesLRTB = vec4f(leftZ, rightZ, topZ, bottomZ) - centerZ;

  // A surface seen at a grazing angle has a large depth gradient and no edge;
  // comparing against the slope-adjusted difference tells the two apart.
  let slopeLR = (edgesLRTB.y - edgesLRTB.x) * 0.5;
  let slopeTB = (edgesLRTB.w - edgesLRTB.z) * 0.5;
  let edgesLRTBSlopeAdjusted = edgesLRTB + vec4f(slopeLR, -slopeLR, slopeTB, -slopeTB);
  edgesLRTB = min(abs(edgesLRTB), abs(edgesLRTBSlopeAdjusted));

  return saturateVec4(1.25 - edgesLRTB / (centerZ * 0.011));
}

// Visibility in .x, bent normal in .yzw. Only the first channel exists unless
// USE_GTAO_BENT_NORMALS is on, in which case the target has four.
fn gtaoEncodeVisibilityBentNormal(term: GTAOTerm, finalApply: bool) -> vec4f {
  let scale = select(1.0 / GTAO_OCCLUSION_TERM_SCALE, 1.0, finalApply);
  return vec4f(saturateF32(term.visibility * scale), term.bentNormal * 0.5 + 0.5);
}

// "Efficiently building a matrix to rotate one vector to another"
// http://cs.brown.edu/research/pubs/pdfs/1999/Moller-1999-EBA.pdf
fn gtaoRotFromToMatrix(fromVec: vec3f, toVec: vec3f) -> mat3x3f {
  let e = dot(fromVec, toVec);
  // Only the near-identity case is short-circuited. The antiparallel one has no
  // single answer, and cannot arise here: \`fromVec\` is the view axis and \`toVec\`
  // view vector of a pixel in front of the camera.
  if (e > 1.0 - 0.0003) {
    return mat3x3f(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
  }

  let v = cross(fromVec, toVec);
  // Optimization by Gottfried Chen.
  let h = 1.0 / (1.0 + e);
  let hvx = h * v.x;
  let hvz = h * v.z;
  let hvxy = hvx * v.y;
  let hvxz = hvx * v.z;
  let hvyz = hvz * v.y;

  // Column-major, so each column is one column of the reference's row-major
  // matrix.
  return mat3x3f(
    vec3f(e + hvx * v.x, hvxy + v.z, hvxz - v.y),
    vec3f(hvxy - v.z, e + h * v.y * v.y, hvyz + v.x),
    vec3f(hvxz + v.y, hvyz - v.x, e + hvz * v.z)
  );
}

// See "Algorithm 1" in the paper.
fn gtaoMainPass(
  pixCoord: vec2i,
  depthTex: texture_2d<u32>,
  normalTex: texture_2d<f32>,
  params: GTAOParams
) -> GTAOTerm {
  var term: GTAOTerm;

  let normalizedScreenPos = (vec2f(pixCoord) + 0.5) * params.viewportPixelSize;

  // viewspace Z at the center, and at left top right bottom
  var viewspaceZ = depthPyramidLoad(depthTex, pixCoord, 0);
  let pixLZ = depthPyramidLoad(depthTex, pixCoord + vec2i(-1, 0), 0);
  let pixRZ = depthPyramidLoad(depthTex, pixCoord + vec2i(1, 0), 0);
  let pixTZ = depthPyramidLoad(depthTex, pixCoord + vec2i(0, -1), 0);
  let pixBZ = depthPyramidLoad(depthTex, pixCoord + vec2i(0, 1), 0);

  term.edgesLRTB = gtaoCalculateEdges(viewspaceZ, pixLZ, pixRZ, pixTZ, pixBZ);

  let viewspaceNormal = normalize(textureLoad(normalTex, pixCoord, 0).xyz * 2.0 - 1.0);
  term.bentNormal = viewspaceNormal;

  // Background: no surface, nothing to occlude.
  if (viewspaceZ >= params.far) {
    term.visibility = 1.0;
    return term;
  }

  // Move the center pixel slightly towards the camera so its own surface cannot
  // read as an occluder of itself through depth imprecision.
  viewspaceZ *= 0.99999;

  let pixCenterPos = gtaoComputeViewspacePosition(normalizedScreenPos, viewspaceZ, params);
  let viewVec = normalize(-pixCenterPos);

  let effectRadius = params.effectRadius * params.radiusMultiplier;
  let falloffRange = params.effectFalloffRange * effectRadius;
  let falloffFrom = effectRadius * (1.0 - params.effectFalloffRange);
  // Fadeout precompute optimisation.
  let falloffMul = -1.0 / falloffRange;
  let falloffAdd = falloffFrom / falloffRange + 1.0;
  let thinScale = 1.0 + params.thinOccluderCompensation;

  let sliceCount = f32(GTAO_NUM_SLICES);
  let stepsPerSlice = f32(GTAO_NUM_STEPS_PER_SLICE);

  let localNoise = gtaoSpatioTemporalNoise(vec2u(pixCoord), params.noiseIndex);
  let noiseSlice = localNoise.x;
  let noiseSample = localNoise.y;

  // Approximate viewspace pixel size at pixCoord, turning the world-space radius
  // into a radius in pixels — which is what makes the sampling disk shrink with
  // distance.
  let pixelDirRBViewspaceSizeAtCenterZ = viewspaceZ * params.ndcToViewMulByPixelSize.x;
  let screenspaceRadius = effectRadius / pixelDirRBViewspaceSizeAtCenterZ;

  // Fade out for small screen radii: a disk covering a few pixels has no
  // occlusion signal left to gather.
  var visibility = saturateF32((10.0 - screenspaceRadius) / 100.0) * 0.5;
  var bentNormal = vec3f(0.0);

  // Minimum distance to start sampling from, to avoid the center pixel, which
  // occludes nothing.
  let minS = GTAO_PIXEL_TOO_CLOSE_THRESHOLD / screenspaceRadius;

  for (var slice = 0; slice < GTAO_NUM_SLICES; slice++) {
    let sliceFloat = f32(slice);
    // Lines 5, 6 from the paper.
    let sliceK = (sliceFloat + noiseSlice) / sliceCount;
    let phi = sliceK * PI;
    let cosPhi = cos(phi);
    let sinPhi = sin(phi);
    // Screen offsets run in a V-down coordinate, so the slice direction's
    // vertical term flips on the way out of view space. In pixels, for later use.
    let omega = vec2f(cosPhi, -sinPhi) * screenspaceRadius;

    // Line 8 from the paper.
    let directionVec = vec3f(cosPhi, sinPhi, 0.0);
    // Line 9 from the paper.
    let orthoDirectionVec = directionVec - dot(directionVec, viewVec) * viewVec;
    // Line 10 from the paper. Orthogonal to directionVec and viewVec, which is
    // what defines projectedNormalVec.
    let axisVec = normalize(cross(orthoDirectionVec, viewVec));
    // Line 11 from the paper.
    let projectedNormalVec = viewspaceNormal - axisVec * dot(viewspaceNormal, axisVec);

    // Line 13 from the paper.
    let signNorm = sign(dot(orthoDirectionVec, projectedNormalVec));
    // Line 14 from the paper.
    var projectedNormalVecLength = length(projectedNormalVec);
    let cosNorm = saturateF32(dot(projectedNormalVec, viewVec) / projectedNormalVecLength);
    // Line 15 from the paper.
    let n = signNorm * gtaoFastACos(cosNorm);

    // Lower weight target rather than the paper's -1: below the horizon a
    // weight means something different depending on the normal.
    let lowHorizonCos0 = cos(n + HALF_PI);
    let lowHorizonCos1 = cos(n - HALF_PI);

    // Lines 17, 18 from the paper, with the 'side' loop manually unrolled.
    var horizonCos0 = lowHorizonCos0;
    var horizonCos1 = lowHorizonCos1;

    for (var step = 0; step < GTAO_NUM_STEPS_PER_SLICE; step++) {
      let stepFloat = f32(step);
      // R1 sequence (http://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/)
      let stepBaseNoise = (sliceFloat + stepFloat * stepsPerSlice) * 0.6180339887498948;
      let stepNoise = fract(noiseSample + stepBaseNoise);

      // Approximately line 20 from the paper, with added noise, the distribution
      // modifier, and the center pixel avoided.
      let s = pow((stepFloat + stepNoise) / stepsPerSlice, params.sampleDistributionPower) + minS;

      // Approximately lines 21-22 from the paper, unrolled.
      var sampleOffset = s * omega;
      let sampleOffsetLength = length(sampleOffset);

      // Wide offsets read a coarser level so the taps stop thrashing the cache,
      // at the cost of thin occluders averaging into what is behind them.
      let mipLevel = i32(clamp(
        log2(sampleOffsetLength) - params.depthMipSamplingOffset,
        0.0,
        GTAO_DEPTH_MIP_MAX_LEVEL
      ));

      // Snap to pixel centre so the direction math matches the texels actually
      // read: an unsnapped offset skews the slope derived from them.
      sampleOffset = round(sampleOffset) * params.viewportPixelSize;

      let sampleScreenPos0 = normalizedScreenPos + sampleOffset;
      let sampleScreenPos1 = normalizedScreenPos - sampleOffset;
      let sz0 = depthPyramidSample(depthTex, sampleScreenPos0, mipLevel);
      let sz1 = depthPyramidSample(depthTex, sampleScreenPos1, mipLevel);
      let samplePos0 = gtaoComputeViewspacePosition(sampleScreenPos0, sz0, params);
      let samplePos1 = gtaoComputeViewspacePosition(sampleScreenPos1, sz1, params);

      let sampleDelta0 = samplePos0 - pixCenterPos;
      let sampleDelta1 = samplePos1 - pixCenterPos;

      // Approximately lines 23, 24 from the paper, unrolled.
      let sampleHorizonVec0 = normalize(sampleDelta0);
      let sampleHorizonVec1 = normalize(sampleDelta1);

      // Any sample out of radius is discarded, the falloff range making the
      // transition smooth — a modified idea from "4.3 Implementation details,
      // Bounding the sampling area". Stretching the depth axis is the reference's
      // own thickness heuristic, discarding samples behind the center sooner.
      let falloffBase0 = length(vec3f(sampleDelta0.xy, sampleDelta0.z * thinScale));
      let falloffBase1 = length(vec3f(sampleDelta1.xy, sampleDelta1.z * thinScale));
      let weight0 = saturateF32(falloffBase0 * falloffMul + falloffAdd);
      let weight1 = saturateF32(falloffBase1 * falloffMul + falloffAdd);

      // Sample horizon cos, then discard unwanted samples. Would be more correct
      // as cos(mix(acos(lowHorizonCosN), acos(shcN), weightN)), but that is two
      // more transcendentals per sample.
      let shc0 = mix(lowHorizonCos0, dot(sampleHorizonVec0, viewVec), weight0);
      let shc1 = mix(lowHorizonCos1, dot(sampleHorizonVec1, viewVec), weight1);

      // Thickness heuristic — see "4.3 Implementation details, Height-field
      // assumption considerations". The reference ships it disabled.
      horizonCos0 = max(horizonCos0, shc0);
      horizonCos1 = max(horizonCos1, shc1);
    }

    // Fudge for a slight overdarkening on high slopes: in the reference's
    // training set 0.05 scores within 0.11 dB of disabled.
    projectedNormalVecLength = mix(projectedNormalVecLength, 1.0, 0.05);

    // Line ~27, unrolled.
    let h0 = -gtaoFastACos(horizonCos1);
    let h1 = gtaoFastACos(horizonCos0);
    let sinN = sin(n);
    let iarc0 = (cosNorm + 2.0 * h0 * sinN - cos(2.0 * h0 - n)) * 0.25;
    let iarc1 = (cosNorm + 2.0 * h1 * sinN - cos(2.0 * h1 - n)) * 0.25;
    visibility += projectedNormalVecLength * (iarc0 + iarc1);

    if (USE_GTAO_BENT_NORMALS) {
      // See "Algorithm 2 Extension that computes bent normals b."
      let t0 = (6.0 * sin(h0 - n) - sin(3.0 * h0 - n) + 6.0 * sin(h1 - n) - sin(3.0 * h1 - n) + 16.0 * sinN - 3.0 * (sin(h0 + n) + sin(h1 + n))) / 12.0;
      let t1 = (-cos(3.0 * h0 - n) - cos(3.0 * h1 - n) + 8.0 * cos(n) - 3.0 * (cos(h0 + n) + cos(h1 + n))) / 12.0;
      // Built against a view axis of +Z — this view space's -Z forward, where the
      // reference's is -Z for its left-handed one — then rotated onto the pixel's
      // own view vector.
      var localBentNormal = gtaoRotFromToMatrix(vec3f(0.0, 0.0, 1.0), viewVec) *
        vec3f(directionVec.xy * t0, t1);
      bentNormal += localBentNormal * projectedNormalVecLength;
    }
  }

  visibility = pow(visibility / sliceCount, params.finalValuePower);
  visibility = mix(1.0, brightnessContrastF32(visibility, params.brightness, params.contrast), params.mix);
  // Disallow total occlusion, which wouldn't make sense anyhow since the pixel is
  // visible, and which also helps with packing bent normals.
  term.visibility = max(0.03, visibility);

  if (USE_GTAO_BENT_NORMALS) {
    term.bentNormal = normalize(bentNormal);
  }

  return term;
}
`;
/**
* Edge-aware denoiser. Averages a 3x3 neighbourhood weighted by the estimator's
* edges, so occlusion never crosses a depth discontinuity. `finalApply`
* restores the UNORM scale and renormalises the bent normal, and belongs on the
* last pass only. Requires {@link common} and {@link main}.
*
* @member {string}
*/
const denoise = `
// Lets a little occlusion leak between neighbours where three or four sides are
// edges, which reduces both spatial and temporal aliasing.
const GTAO_LEAK_THRESHOLD: f32 = 2.5;
const GTAO_LEAK_STRENGTH: f32 = 0.5;
const GTAO_DIAGONAL_WEIGHT: f32 = 0.425;

fn gtaoLoadEdges(edgesTex: texture_2d<f32>, pixCoord: vec2i) -> vec4f {
  let size = vec2i(textureDimensions(edgesTex, 0));
  return textureLoad(edgesTex, clamp(pixCoord, vec2i(0), size - vec2i(1)), 0);
}

fn gtaoLoadAOTerm(aoTex: texture_2d<f32>, pixCoord: vec2i) -> vec4f {
  let size = vec2i(textureDimensions(aoTex, 0));
  return textureLoad(aoTex, clamp(pixCoord, vec2i(0), size - vec2i(1)), 0);
}

fn gtaoAddSample(
  ssaoValue: vec4f,
  edgeValue: f32,
  sum: ptr<function, vec4f>,
  sumWeight: ptr<function, f32>
) {
  *sum += edgeValue * ssaoValue;
  *sumWeight += edgeValue;
}

fn gtaoDenoise(
  pixCoord: vec2i,
  aoTex: texture_2d<f32>,
  edgesTex: texture_2d<f32>,
  blurAmount: f32,
  finalApply: bool
) -> vec4f {
  let edgesL_LRTB = gtaoLoadEdges(edgesTex, pixCoord + vec2i(-1, 0));
  let edgesR_LRTB = gtaoLoadEdges(edgesTex, pixCoord + vec2i(1, 0));
  let edgesT_LRTB = gtaoLoadEdges(edgesTex, pixCoord + vec2i(0, -1));
  let edgesB_LRTB = gtaoLoadEdges(edgesTex, pixCoord + vec2i(0, 1));

  // Edge detection does not guarantee that a left edge on the right pixel
  // matches the right edge on the left one. Folding in the neighbour's opposite
  // side enforces it, creating a slightly sharper blur that works well with TAA.
  var edgesC_LRTB = gtaoLoadEdges(edgesTex, pixCoord) *
    vec4f(edgesL_LRTB.y, edgesR_LRTB.x, edgesT_LRTB.w, edgesB_LRTB.z);

  let edginess = (saturateF32(4.0 - GTAO_LEAK_THRESHOLD - dot(edgesC_LRTB, vec4f(1.0))) /
    (4.0 - GTAO_LEAK_THRESHOLD)) * GTAO_LEAK_STRENGTH;
  edgesC_LRTB = saturateVec4(edgesC_LRTB + edginess);

  // For diagonals: a corner neighbour is reachable two ways, so it is worth half
  // of either path being open.
  let weightTL = GTAO_DIAGONAL_WEIGHT * (edgesC_LRTB.x * edgesL_LRTB.z + edgesC_LRTB.z * edgesT_LRTB.x);
  let weightTR = GTAO_DIAGONAL_WEIGHT * (edgesC_LRTB.z * edgesT_LRTB.y + edgesC_LRTB.y * edgesR_LRTB.z);
  let weightBL = GTAO_DIAGONAL_WEIGHT * (edgesC_LRTB.w * edgesB_LRTB.x + edgesC_LRTB.x * edgesL_LRTB.w);
  let weightBR = GTAO_DIAGONAL_WEIGHT * (edgesC_LRTB.y * edgesR_LRTB.w + edgesC_LRTB.w * edgesB_LRTB.y);

  var sumWeight = blurAmount;
  var sum = gtaoLoadAOTerm(aoTex, pixCoord) * sumWeight;

  gtaoAddSample(gtaoLoadAOTerm(aoTex, pixCoord + vec2i(-1, 0)), edgesC_LRTB.x, &sum, &sumWeight);
  gtaoAddSample(gtaoLoadAOTerm(aoTex, pixCoord + vec2i(1, 0)), edgesC_LRTB.y, &sum, &sumWeight);
  gtaoAddSample(gtaoLoadAOTerm(aoTex, pixCoord + vec2i(0, -1)), edgesC_LRTB.z, &sum, &sumWeight);
  gtaoAddSample(gtaoLoadAOTerm(aoTex, pixCoord + vec2i(0, 1)), edgesC_LRTB.w, &sum, &sumWeight);

  gtaoAddSample(gtaoLoadAOTerm(aoTex, pixCoord + vec2i(-1, -1)), weightTL, &sum, &sumWeight);
  gtaoAddSample(gtaoLoadAOTerm(aoTex, pixCoord + vec2i(1, -1)), weightTR, &sum, &sumWeight);
  gtaoAddSample(gtaoLoadAOTerm(aoTex, pixCoord + vec2i(-1, 1)), weightBL, &sum, &sumWeight);
  gtaoAddSample(gtaoLoadAOTerm(aoTex, pixCoord + vec2i(1, 1)), weightBR, &sum, &sumWeight);

  var aoTerm = sum / sumWeight;

  if (finalApply) {
    aoTerm.x = saturateF32(aoTerm.x * GTAO_OCCLUSION_TERM_SCALE);
    if (USE_GTAO_BENT_NORMALS) {
      // Averaged encoded, which matches averaging the directions since the
      // encoding is affine, but the sum is no longer unit length.
      aoTerm = vec4f(aoTerm.x, normalize(aoTerm.yzw * 2.0 - 1.0) * 0.5 + 0.5);
    }
  }

  return aoTerm;
}
`;

/**
* SAO (Scalable Ambient Obscurance)
*
* Paper:
* https://research.nvidia.com/sites/default/files/pubs/2012-06_Scalable-Ambient-Obscurance/McGuire12SAO.pdf
* (https://casual-effects.com/research/McGuire2012SAO/index.html)
*
* Reference Implementation: G3D's AmbientOcclusion_AO.pix / _minify.pix.
*
* Requires a depth pyramid built with rotated grid subsampling
* (`DEPTH_PYRAMID_ROTATED_GRID`): the taps reconstruct through its inverse.
*
* Updates: Marcin Ignac (2017-05-08) and Damien Seguin (2023-10, 2026-09)
*
* @type {string}
* @alias module:shaders.sao
*/
var sao_default = `
struct SAOParams {
  // The four terms that invert the projection:
  // (2 / (w * P00), -2 / (h * P11), (P20 - 1) / P00, (1 + P21) / P11).
  projInfo: vec4f,
  far: f32,
  // Height in pixels of a 1m object one metre from the camera: 0.5 * h * P11.
  projScale: f32,
  intensity: f32, // darkening factor
  radius: f32, // world-space AO radius in scene units (r), e.g. 1.0m
  bias: f32, // bias to avoid AO in smooth corners, e.g. 0.01m
  brightness: f32,
  contrast: f32,
}

// SAO_NUM_SAMPLES and SAO_NUM_SPIRAL_TURNS are expected to be declared as
// \`override\` i32 by the composing pipeline shader. SAO_NUM_SPIRAL_TURNS
// should be a prime number to prevent taps from lining up.
override SAO_NUM_SAMPLES: i32 = 11;
override SAO_NUM_SPIRAL_TURNS: i32 = 7;

// The reference's value. It only bites when a tap lands very close, where
// vn/(eps + vv) would run away; the 2x2 reconstruction below is what makes it
// safe, so the two move together.
const SAO_EPSILON: f32 = 0.001;

// Screen-space radius, in pixels, below which there is no way to compute AO.
const SAO_MIN_RADIUS: f32 = 3.0;
// log2 of the largest tap offset kept at a given level. Under 3 too many taps
// land in the same texel and the variance reads as flicker; over 5 the working
// set no longer fits in cache. The paper found every value in between
// equivalent.
const SAO_LOG_MAX_OFFSET: i32 = 3;
// One below the paper's five, matching what the prefilter can produce: a
// storage texture view is a single mip and WebGPU only guarantees four storage
// texture bindings per stage.
const SAO_MAX_MIP_LEVEL: i32 = 3;

// Returns a unit vector and a screen-space radius for the tap on a unit disk
// (the caller should scale by the actual disk radius)
fn saoTapLocation(sampleNumber: i32, spinAngle: f32, numSpiralTurnsTimesTwoPi: f32, radiusScreenOut: ptr<function, f32>) -> vec2f {
  // Radius relative to radiusScreen
  let alpha = (f32(sampleNumber) + 0.5) / f32(SAO_NUM_SAMPLES);
  let angle = alpha * numSpiralTurnsTimesTwoPi + spinAngle;

  *radiusScreenOut = alpha;
  return vec2f(cos(angle), sin(angle));
}

// Camera-space position from a pixel coordinate and a positive view-space
// distance, after the reference's reconstructCSPosition. Carrying the
// projection as projInfo rather than a field of view is what makes it hold for
// an asymmetric frustum: an offset or jittered projection is a different
// matrix, not a different fov. Pixel coordinates, so a tap needs no conversion
// to and from [0, 1].
fn saoReconstructPosition(pixelCoord: vec2f, viewDepth: f32, params: SAOParams) -> vec3f {
  return vec3f((pixelCoord * params.projInfo.xy + params.projInfo.zw) * viewDepth, -viewDepth);
}

// The occluding point in view space, read from the pyramid level that keeps a
// tap this far out in cache. The tap picks the level and the texel; the point
// is then reconstructed at the texel the depth came from, not at the tap
// itself, so it is a position that was actually in the scene. The reference
// reconstructs at the tap and absorbs the resulting off-surface displacement
// into a larger bias, because its mip filter has no inverse to undo it with.
fn saoOffsetPosition(depthTex: texture_2d<u32>, pixCoord: vec2i, unitOffset: vec2f, radiusScreen: f32, params: SAOParams) -> vec3f {
  let mipLevel = clamp(i32(floor(log2(radiusScreen))) - SAO_LOG_MAX_OFFSET, 0, SAO_MAX_MIP_LEVEL);

  // Clamped here rather than inside the load, so the texel the depth is read
  // from is the one the position is reconstructed at, edges included.
  let mipSize = vec2i(textureDimensions(depthTex, u32(mipLevel)));
  let tapCoord = vec2i(radiusScreen * unitOffset) + pixCoord;
  let mipCoord = clamp(tapCoord >> vec2u(u32(mipLevel)), vec2i(0), mipSize - vec2i(1));
  let sampleDepth = depthPyramidLoad(depthTex, mipCoord, mipLevel);

  let srcCoord = depthPyramidRotatedGridSource(mipCoord, mipLevel);
  return saoReconstructPosition(vec2f(srcCoord) + 0.5, sampleDepth, params);
}

fn saoSample(
  depthTex: texture_2d<u32>,
  pixCoord: vec2i,
  positionView: vec3f,
  normalView: vec3f,
  sampleRadiusScreen: f32,
  tapIndex: i32,
  rotationAngle: f32,
  radius2: f32,
  numSpiralTurnsTimesTwoPi: f32,
  params: SAOParams
) -> f32 {
  // Offset on the unit disk, spun for this pixel
  var radiusScreen = 0.0;
  let unitOffset = saoTapLocation(tapIndex, rotationAngle, numSpiralTurnsTimesTwoPi, &radiusScreen);
  // Keep the tap off its own texel: without this the innermost taps of the
  // spiral all read the centre pixel, which the pyramid then amplifies.
  radiusScreen = max(0.75, radiusScreen * sampleRadiusScreen);

  let samplePositionView = saoOffsetPosition(depthTex, pixCoord, unitOffset, radiusScreen, params);

  let v = samplePositionView - positionView;

  let vv = dot(v, v);
  let vn = dot(v, normalView) - params.bias;

  let f = max(radius2 - vv, 0.0) / radius2;
  return f * f * f * max(vn / (SAO_EPSILON + vv), 0.0);
}

// McGuire12 2.3's closing step: average the estimate over the 2x2 quad the
// rasterizer already shades in lockstep. It costs two derivative pairs and no
// additional tap, and it is why the blur that follows can space its taps three
// pixels apart. It is also what keeps SAO_EPSILON at the reference's value: the
// near taps epsilon guards throw single-pixel outliers, which is exactly what a
// quad average removes.
//
// The derivatives chain rather than both applying to the estimate: after the x
// pass every lane holds its row's mean, so differentiating *that* in y averages
// the two rows and leaves every lane with the quad's mean.
//
// Bilateral, as the paper has it: a quad straddling a silhouette holds two
// surfaces, and averaging them drags occlusion across the edge. The test is the
// depth gradient over the quad, relative to depth so that a receding surface is
// not mistaken for a discontinuity — at 10% per quad it withholds the average
// from real depth jumps only, an inclined surface never reaching it.
const SAO_QUAD_EDGE_THRESHOLD: f32 = 0.1;

fn saoReconstructQuad(visibility: f32, depth: f32, fragCoord: vec2f) -> f32 {
  let parity = vec2f(vec2i(fragCoord) & vec2i(1));

  let rowMean = visibility + (0.5 - parity.x) * dpdxFine(visibility);
  let quadMean = rowMean + (0.5 - parity.y) * dpdyFine(rowMean);

  let depthGradient = abs(dpdxFine(depth)) + abs(dpdyFine(depth));
  return select(visibility, quadMean, depthGradient < depth * SAO_QUAD_EDGE_THRESHOLD);
}

fn sao(
  depthTex: texture_2d<u32>,
  normalTex: texture_2d<f32>,
  fragCoord: vec2f,
  params: SAOParams
) -> f32 {
  var visibility = 1.0;

  let numSamplesFloat = f32(SAO_NUM_SAMPLES);
  let numSpiralTurnsTimesTwoPi = f32(SAO_NUM_SPIRAL_TURNS) * TWO_PI;

  let pixCoord = vec2i(fragCoord);
  let originDepth = depthPyramidLoad(depthTex, pixCoord, 0);
  let originView = saoReconstructPosition(fragCoord, originDepth, params);

  // The disk spans \`radius\` metres whatever the resolution. Negated because
  // view space is -Z forward.
  let radiusScreen = -params.projScale * params.radius / originView.z;

  // The prefilter clamps the background to exactly the far plane, so nothing
  // there has a surface to occlude; below SAO_MIN_RADIUS the disk is too small
  // to hold a tap that resolves anything.
  if (originDepth < params.far && radiusScreen > SAO_MIN_RADIUS) {
    let normalView = normalize(textureLoad(normalTex, pixCoord, 0).rgb * 2.0 - 1.0);

    // Interleaved gradient noise [Jimenez14], used directly as the turn
    // fraction. Low discrepancy over a small neighbourhood is what the blur
    // needs — it spreads a 3x3's rotations 2.3x more evenly than white noise —
    // and unlike a tiled texture it has no period and costs no fetch.
    //
    // Directly: a product of two independent draws has density -ln(z), which
    // would leave half the pixels spun under a fifth of a turn.
    let noise = fract(52.9829189 * fract(dot(fragCoord, vec2f(0.06711056, 0.00583715))));
    let randomPatternRotationAngle = noise * TWO_PI;

    let radius2 = params.radius * params.radius;

    var sum = 0.0;
    for (var i = 0; i < SAO_NUM_SAMPLES; i++) {
      sum += saoSample(depthTex, pixCoord, originView, normalView, radiusScreen, i, randomPatternRotationAngle, radius2, numSpiralTurnsTimesTwoPi, params);
    }

    // The reference's combine. \`intensity\` scales the sum rather than acting as
    // an exponent on a value already close to 1, which is what gives it a
    // usable range now that the falloff tapers. Our f already carries the
    // 1/r^6 the reference applies separately as intensityDivR6.
    var occlusion = max(0.0, 1.0 - sum * params.intensity * 5.0 / numSamplesFloat);
    // Anti-tone map: lifts the midtones and drags the dark region further down,
    // so contact shadows read without the whole term going flat.
    occlusion = (pow(occlusion, 0.2) + 1.2 * occlusion * occlusion * occlusion * occlusion) / 2.2;
    // Fade in over the pixel or so where the disk first becomes usable, rather
    // than letting AO pop on at the threshold.
    visibility = mix(1.0, occlusion, saturateF32(radiusScreen - SAO_MIN_RADIUS));
  }

  // Outside the branch: derivatives are only defined in uniform control flow,
  // and every lane of the quad has to reach them. Before the grading, so what
  // is averaged is the estimate rather than the user's curve over it.
  visibility = saoReconstructQuad(visibility, originDepth, fragCoord);

  return saturateF32(brightnessContrastF32(visibility, params.brightness, params.contrast));
}
`;

/**
* Levels of the depth pyramid, matching the chunk's hand-unrolled reduction and
* GTAO's `GTAO_DEPTH_MIP_MAX_LEVEL`. Four rather than the reference's five: a
* storage texture view is a single mip, and WebGPU only guarantees four storage
* texture bindings per stage.
*/
const DEPTH_MIP_LEVELS = 4;
/**
* Depth prefilter: the compute pass that turns the depth buffer into the linear
* view-space pyramid both estimators sample, in one dispatch.
*
* Not a fullscreen pass, and not because compute is faster per se: the coarser
* levels reduce through workgroup memory, so building them costs one read of
* the depth buffer rather than one full pass over the previous level each.
*
* Both estimators bind the pyramid's own small params struct rather than their
* own: the reduction needs four scalars, and which filter runs is a constant.
*/
const depthPyramidShader = () => {
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

${saturate}
${depth_read_default}
${depth_pyramid_default}

@group(0) @binding(${alloc.next()}) var<uniform> uDepthPyramid: DepthPyramidParams;
@group(0) @binding(${alloc.next()}) var uDepthTexture: texture_depth_2d;
${Array.from({ length: 4 }, (_, level) => `@group(0) @binding(${alloc.next()}) var uDepthMip${level}: texture_storage_2d<r32uint, write>;`).join("\n")}

// Each thread covers a 2x2 block, so a workgroup covers 16x16 pixels.
@compute @workgroup_size(8, 8, 1)
fn computeMain(
  @builtin(global_invocation_id) globalId: vec3u,
  @builtin(local_invocation_id) localId: vec3u
) {
  depthPyramidBuild16x16(
    globalId.xy,
    localId.xy,
    uDepthTexture,
    uDepthPyramid,
    uDepthMip0,
    uDepthMip1,
    uDepthMip2,
    uDepthMip3
  );
}
`);
};
/**
* Ground Truth Ambient Occlusion. Writes visibility in `.x` — plus the bent
* normal in `.yzw` under `USE_GTAO_BENT_NORMALS` — and, when a denoise pass
* follows, the edge weights it needs at `@location(1)`.
*/
const gtaoShader = (defines) => {
	const alloc = createBindingAllocator(1);
	const edges = defines.has("USE_GTAO_EDGES");
	return formatShader(`
${postProcessingStruct}

${PI}
${HALF_PI}
${saturate}
${color_correction_default}
${depth_read_default}
${depth_pyramid_default}
${common}
${main}

// The last denoise pass restores the UNORM scale; with no denoise pass to do
// it, the estimator applies it itself.
override GTAO_FINAL_APPLY: bool = true;

@group(0) @binding(${alloc.next()}) var<uniform> uGTAO: GTAOParams;
@group(0) @binding(${alloc.next()}) var uDepthTexture: texture_2d<u32>;
@group(0) @binding(${alloc.next()}) var uNormalTexture: texture_2d<f32>;

${fullscreenVertex()}

${fragmentOutputStruct([edges && {
		name: "edges",
		type: "vec4f"
	}])}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  var output: FragmentOutput;

  let term = gtaoMainPass(vec2i(${FRAGMENT_COORD}), uDepthTexture, uNormalTexture, uGTAO);

  output.color = gtaoEncodeVisibilityBentNormal(term, GTAO_FINAL_APPLY);
  ${edges ? "output.edges = term.edgesLRTB;" : ""}

  return output;
}
`);
};
/**
* One edge-aware denoise pass over the visibility buffer. Both textures are
* read by texel rather than sampled: the filter is a 3x3 stencil on its own
* grid, so there is nothing for a sampler to interpolate.
*/
const gtaoDenoiseShader = () => {
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

${PI}
${HALF_PI}
${saturate}
${common}
${denoise}

override GTAO_FINAL_APPLY: bool = false;

@group(0) @binding(${alloc.next()}) var<uniform> uGTAO: GTAOParams;
@group(0) @binding(${alloc.next()}) var uAOTexture: texture_2d<f32>;
@group(0) @binding(${alloc.next()}) var uEdgesTexture: texture_2d<f32>;

${fullscreenVertex()}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  // The reference blurs a fifth as hard on the passes that are not last, so a
  // multi-pass denoise widens its reach without flattening the result.
  let blurAmount = select(uGTAO.denoiseBlurBeta / 5.0, uGTAO.denoiseBlurBeta, GTAO_FINAL_APPLY);

  return gtaoDenoise(vec2i(${FRAGMENT_COORD}), uAOTexture, uEdgesTexture, blurAmount, GTAO_FINAL_APPLY);
}
`);
};
/**
* Scalable Ambient Obscurance. Writes visibility in `.x`.
*
* Reads the depth pyramid rather than the depth buffer: a tap far from its
* pixel picks a coarser level, which is what keeps the cost flat as the radius
* grows instead of rising with it.
*/
const saoShader = () => {
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

// Includes lead: the sao chunk declares SAOParams, the type bound below.
${TWO_PI}
${saturate}
${color_correction_default}
${depth_read_default}
${depth_pyramid_default}
${sao_default}

@group(0) @binding(${alloc.next()}) var<uniform> uSAO: SAOParams;
@group(0) @binding(${alloc.next()}) var uDepthTexture: texture_2d<u32>;
@group(0) @binding(${alloc.next()}) var uNormalTexture: texture_2d<f32>;

${fullscreenVertex()}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let visibility = sao(
    uDepthTexture,
    uNormalTexture,
    ${FRAGMENT_COORD},
    uSAO
  );

  return vec4f(visibility, 0.0, 0.0, 1.0);
}
`);
};
/**
* One separable pass of the depth-aware blur that removes the estimators'
* sampling noise without bleeding occlusion across silhouettes.
*/
const bilateralBlurShader = () => {
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

struct BilateralBlur {
  // Unit axis, and the reach either side of it in pixels.
  axis: vec2f,
  radius: f32,
  near: f32,
  far: f32,
  sharpness: f32,
}
@group(0) @binding(${alloc.next()}) var<uniform> uBlur: BilateralBlur;

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}
${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uDepthTexture", "texture_depth_2d")}

${fullscreenVertex()}

// Fragment includes
${depth_read_default}
${blur_default}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  return bilateralBlur(
    uTexture,
    uTextureSampler,
    uDepthTexture,
    uDepthTextureSampler,
    input.texCoord0,
    uBlur.axis,
    uBlur.radius,
    uPostProcessing.viewportSize,
    uBlur.near,
    uBlur.far,
    uBlur.sharpness
  );
}
`);
};

export { saoShader as a, gtaoShader as i, depthPyramidShader as n, gtaoDenoiseShader as r, bilateralBlurShader as t };