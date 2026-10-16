import { S as textureSamplerDeclaration, c as createBindingAllocator, l as formatShader, n as fullscreenVertex, r as postProcessingStruct, s as bindingDeclaration } from "./common-BiA813CC.js";

var edges_wgsl_default = `// SMAA pass 1: edge detection. Writes the left/top edge pair, and discards
// where there is none: the stencil-like early out the reference relies on.
// Takes textures as parameters and declares no bindings.

override SMAA_THRESHOLD: f32 = 0.1;
override SMAA_DEPTH_THRESHOLD: f32 = 0.1 * SMAA_THRESHOLD;
override SMAA_LOCAL_CONTRAST_ADAPTATION_FACTOR: f32 = 2.0;

// Threshold to be used in the predication texture. Depends on its content.
override SMAA_PREDICATION_THRESHOLD: f32 = 0.01;
// How much to scale the global threshold when using predication. Range: [1, 5]
override SMAA_PREDICATION_SCALE: f32 = 2.0;
// How much to locally decrease the threshold. Range: [0, 1]
override SMAA_PREDICATION_STRENGTH: f32 = 0.4;

// Edge detection expects gamma-encoded color: sampling an \`-srgb\` texture
// decodes it to linear, so it has to be re-encoded before thresholding.
override SMAA_SRGB_INPUT: bool = false;

// Neighbor coordinates for the edge detection functions. Affine in texCoord,
// so they can be computed in the vertex stage and interpolated.
fn smaaEdgeDetectionOffsets(texCoord: vec2f, texelSize: vec2f) -> array<vec4f, 3> {
  return array<vec4f, 3>(
    texelSize.xyxy * vec4f(-1.0, 0.0, 0.0, -1.0) + texCoord.xyxy,
    texelSize.xyxy * vec4f(1.0, 0.0, 0.0, 1.0) + texCoord.xyxy,
    texelSize.xyxy * vec4f(-2.0, 0.0, 0.0, -2.0) + texCoord.xyxy
  );
}

fn smaaSampleColor(tex: texture_2d<f32>, texSampler: sampler, texCoord: vec2f) -> vec3f {
  let color = textureSampleLevel(tex, texSampler, texCoord, 0.0).rgb;
  if (!SMAA_SRGB_INPUT) {
    return color;
  }
  return select(
    color * 12.92,
    1.055 * pow(color, vec3f(1.0 / 2.4)) - 0.055,
    color >= vec3f(0.0031308)
  );
}

// Gathers current pixel, and the top-left neighbors.
fn smaaGatherNeighbours(
  tex: texture_depth_2d,
  texSampler: sampler,
  texCoord: vec2f,
  offset0: vec4f
) -> vec3f {
  return vec3f(
    textureSampleLevel(tex, texSampler, texCoord, 0),
    textureSampleLevel(tex, texSampler, offset0.xy, 0),
    textureSampleLevel(tex, texSampler, offset0.zw, 0)
  );
}

// Lowers the threshold where the predication texture has an edge, so the
// global threshold can be higher.
fn smaaCalculatePredicatedThreshold(
  predicationTex: texture_depth_2d,
  predicationSampler: sampler,
  texCoord: vec2f,
  offset0: vec4f
) -> vec2f {
  let neighbours = smaaGatherNeighbours(predicationTex, predicationSampler, texCoord, offset0);
  let delta = abs(neighbours.xx - neighbours.yz);
  let edges = step(vec2f(SMAA_PREDICATION_THRESHOLD), delta);
  return SMAA_PREDICATION_SCALE * SMAA_THRESHOLD * (1.0 - SMAA_PREDICATION_STRENGTH * edges);
}

// Threshold is vec2f(SMAA_THRESHOLD), or smaaCalculatePredicatedThreshold().
fn smaaLumaEdgeDetection(
  colorTex: texture_2d<f32>,
  colorSampler: sampler,
  texCoord: vec2f,
  offset0: vec4f,
  offset1: vec4f,
  offset2: vec4f,
  threshold: vec2f
) -> vec2f {
  let weights = vec3f(0.2126, 0.7152, 0.0722);
  let L = dot(smaaSampleColor(colorTex, colorSampler, texCoord), weights);

  let Lleft = dot(smaaSampleColor(colorTex, colorSampler, offset0.xy), weights);
  let Ltop = dot(smaaSampleColor(colorTex, colorSampler, offset0.zw), weights);

  var delta = vec4f(abs(L - vec2f(Lleft, Ltop)), 0.0, 0.0);
  var edges = step(threshold, delta.xy);

  if (dot(edges, vec2f(1.0)) == 0.0) {
    discard;
  }

  let Lright = dot(smaaSampleColor(colorTex, colorSampler, offset1.xy), weights);
  let Lbottom = dot(smaaSampleColor(colorTex, colorSampler, offset1.zw), weights);
  delta = vec4f(delta.xy, abs(L - vec2f(Lright, Lbottom)));

  // Maximum delta in the direct neighborhood
  var maxDelta = max(delta.xy, delta.zw);

  let Lleftleft = dot(smaaSampleColor(colorTex, colorSampler, offset2.xy), weights);
  let Ltoptop = dot(smaaSampleColor(colorTex, colorSampler, offset2.zw), weights);
  delta = vec4f(delta.xy, abs(vec2f(Lleft, Ltop) - vec2f(Lleftleft, Ltoptop)));

  maxDelta = max(maxDelta, delta.zw);
  let finalDelta = max(maxDelta.x, maxDelta.y);

  // Local contrast adaptation
  edges *= step(vec2f(finalDelta), SMAA_LOCAL_CONTRAST_ADAPTATION_FACTOR * delta.xy);

  return edges;
}

fn smaaColorDelta(a: vec3f, b: vec3f) -> f32 {
  let t = abs(a - b);
  return max(max(t.r, t.g), t.b);
}

// Threshold is vec2f(SMAA_THRESHOLD), or smaaCalculatePredicatedThreshold().
fn smaaColorEdgeDetection(
  colorTex: texture_2d<f32>,
  colorSampler: sampler,
  texCoord: vec2f,
  offset0: vec4f,
  offset1: vec4f,
  offset2: vec4f,
  threshold: vec2f
) -> vec2f {
  let C = smaaSampleColor(colorTex, colorSampler, texCoord);

  let Cleft = smaaSampleColor(colorTex, colorSampler, offset0.xy);
  let Ctop = smaaSampleColor(colorTex, colorSampler, offset0.zw);
  var delta = vec4f(smaaColorDelta(C, Cleft), smaaColorDelta(C, Ctop), 0.0, 0.0);

  var edges = step(threshold, delta.xy);

  if (dot(edges, vec2f(1.0)) == 0.0) {
    discard;
  }

  let Cright = smaaSampleColor(colorTex, colorSampler, offset1.xy);
  let Cbottom = smaaSampleColor(colorTex, colorSampler, offset1.zw);
  delta = vec4f(delta.xy, smaaColorDelta(C, Cright), smaaColorDelta(C, Cbottom));

  var maxDelta = max(delta.xy, delta.zw);

  let Cleftleft = smaaSampleColor(colorTex, colorSampler, offset2.xy);
  let Ctoptop = smaaSampleColor(colorTex, colorSampler, offset2.zw);
  delta = vec4f(delta.xy, smaaColorDelta(C, Cleftleft), smaaColorDelta(C, Ctoptop));

  maxDelta = max(maxDelta, delta.zw);
  let finalDelta = max(maxDelta.x, maxDelta.y);

  edges *= step(vec2f(finalDelta), SMAA_LOCAL_CONTRAST_ADAPTATION_FACTOR * delta.xy);

  return edges;
}

fn smaaDepthEdgeDetection(
  depthTex: texture_depth_2d,
  depthSampler: sampler,
  texCoord: vec2f,
  offset0: vec4f
) -> vec2f {
  let neighbours = smaaGatherNeighbours(depthTex, depthSampler, texCoord, offset0);
  let delta = abs(neighbours.xx - neighbours.yz);
  let edges = step(vec2f(SMAA_DEPTH_THRESHOLD), delta);

  if (dot(edges, vec2f(1.0)) == 0.0) {
    discard;
  }

  return edges;
}
`;

var weights_wgsl_default = `// SMAA pass 2: blending weight calculation. Searches the edges texture for
// the distance to each line end, then looks up the precomputed coverage area.
// Takes textures as parameters and declares no bindings.

// Range: [0, 112]. The maximum line length perfectly handled is 4x this.
override SMAA_MAX_SEARCH_STEPS: i32 = 16;
// Range: [0, 20]. Diagonal searches step one pixel at a time.
override SMAA_MAX_SEARCH_STEPS_DIAG: i32 = 8;
// Range: [0, 100]
override SMAA_CORNER_ROUNDING: i32 = 25;
override SMAA_DISABLE_DIAG_DETECTION: bool = false;
override SMAA_DISABLE_CORNER_DETECTION: bool = false;

const SMAA_AREATEX_MAX_DISTANCE: f32 = 16.0;
const SMAA_AREATEX_MAX_DISTANCE_DIAG: f32 = 20.0;
const SMAA_AREATEX_PIXEL_SIZE: vec2f = 1.0 / vec2f(160.0, 560.0);
const SMAA_AREATEX_SUBTEX_SIZE: f32 = 1.0 / 7.0;
const SMAA_SEARCHTEX_SIZE: vec2f = vec2f(66.0, 33.0);
const SMAA_SEARCHTEX_PACKED_SIZE: vec2f = vec2f(64.0, 16.0);

// Search start coordinates, a quarter texel off so one bilinear fetch reads
// four edges (@PSEUDO_GATHER4), then where the searches end. Affine in
// texCoord, so they can be computed in the vertex stage and interpolated.
fn smaaBlendingWeightCalculationOffsets(texCoord: vec2f, texelSize: vec2f) -> array<vec4f, 3> {
  let offset0 = texelSize.xyxy * vec4f(-0.25, -0.125, 1.25, -0.125) + texCoord.xyxy;
  let offset1 = texelSize.xyxy * vec4f(-0.125, -0.25, -0.125, 1.25) + texCoord.xyxy;
  let offset2 = texelSize.xxyy * vec4f(-2.0, 2.0, -2.0, 2.0) * f32(SMAA_MAX_SEARCH_STEPS) +
    vec4f(offset0.xz, offset1.yw);
  return array<vec4f, 3>(offset0, offset1, offset2);
}

// HLSL's round() takes halves away from zero, WGSL's to even: the decoders
// below depend on the former, and only see positive values.
fn smaaRound(x: vec2f) -> vec2f {
  return floor(x + 0.5);
}

fn smaaSampleLevelZeroOffset(
  tex: texture_2d<f32>,
  texSampler: sampler,
  texelSize: vec2f,
  texCoord: vec2f,
  offset: vec2f
) -> vec4f {
  return textureSampleLevel(tex, texSampler, texCoord + offset * texelSize, 0.0);
}

// Decodes two binary values from a single bilinear-filtered fetch: taps at a
// 0.25 offset make the R and G edges land on distinguishable values
// (0.25 or 1.0, and 0.75 or 1.0).
fn smaaDecodeDiagBilinearAccess(e: vec2f) -> vec2f {
  return smaaRound(vec2f(e.r * abs(5.0 * e.r - 3.75), e.g));
}

fn smaaSearchDiag1(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  texelSize: vec2f,
  texCoord: vec2f,
  dir: vec2f,
  e: ptr<function, vec2f>
) -> vec2f {
  var coord = vec4f(texCoord, -1.0, 1.0);
  let t = vec3f(texelSize, 1.0);
  while (coord.z < f32(SMAA_MAX_SEARCH_STEPS_DIAG - 1) && coord.w > 0.9) {
    coord = vec4f(t * vec3f(dir, 1.0) + coord.xyz, coord.w);
    *e = textureSampleLevel(edgesTex, edgesSampler, coord.xy, 0.0).rg;
    coord.w = dot(*e, vec2f(0.5));
  }
  return coord.zw;
}

fn smaaSearchDiag2(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  texelSize: vec2f,
  texCoord: vec2f,
  dir: vec2f,
  e: ptr<function, vec2f>
) -> vec2f {
  // Offset by a quarter texel so both crossing edges come back in one
  // bilinear fetch (@SearchDiag2Optimization).
  var coord = vec4f(texCoord.x + 0.25 * texelSize.x, texCoord.y, -1.0, 1.0);
  let t = vec3f(texelSize, 1.0);
  while (coord.z < f32(SMAA_MAX_SEARCH_STEPS_DIAG - 1) && coord.w > 0.9) {
    coord = vec4f(t * vec3f(dir, 1.0) + coord.xyz, coord.w);
    *e = smaaDecodeDiagBilinearAccess(
      textureSampleLevel(edgesTex, edgesSampler, coord.xy, 0.0).rg
    );
    coord.w = dot(*e, vec2f(0.5));
  }
  return coord.zw;
}

// Area for a diagonal distance and crossing edges.
fn smaaAreaDiag(
  areaTex: texture_2d<f32>,
  areaSampler: sampler,
  dist: vec2f,
  e: vec2f,
  offset: f32
) -> vec2f {
  var texCoord = vec2f(SMAA_AREATEX_MAX_DISTANCE_DIAG) * e + dist;

  // Scale and bias to texel space
  texCoord = SMAA_AREATEX_PIXEL_SIZE * texCoord + 0.5 * SMAA_AREATEX_PIXEL_SIZE;
  // Diagonal areas live in the second half of the texture
  texCoord.x += 0.5;
  // Move to the subpixel offset's row
  texCoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

  return textureSampleLevel(areaTex, areaSampler, texCoord, 0.0).rg;
}

fn smaaCalculateDiagWeights(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  areaTex: texture_2d<f32>,
  areaSampler: sampler,
  texelSize: vec2f,
  texCoord: vec2f,
  e: vec2f,
  subsampleIndices: vec4f
) -> vec2f {
  var weights = vec2f(0.0);

  // Search for the line ends
  var d = vec4f(0.0);
  var end = vec2f(0.0);
  if (e.r > 0.0) {
    let search = smaaSearchDiag1(edgesTex, edgesSampler, texelSize, texCoord, vec2f(-1.0, 1.0), &end);
    d.x = search.x + f32(end.y > 0.9);
    d.z = search.y;
  }
  let search = smaaSearchDiag1(edgesTex, edgesSampler, texelSize, texCoord, vec2f(1.0, -1.0), &end);
  d.y = search.x;
  d.w = search.y;

  if (d.x + d.y > 2.0) { // d.x + d.y + 1 > 3
    // Fetch the crossing edges
    let coords = vec4f(-d.x + 0.25, d.x, d.y, -d.y - 0.25) * texelSize.xyxy + texCoord.xyxy;
    let c = vec4f(
      smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, coords.xy, vec2f(-1.0, 0.0)).rg,
      smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, coords.zw, vec2f(1.0, 0.0)).rg
    );
    let decoded = vec4f(smaaDecodeDiagBilinearAccess(c.xy), smaaDecodeDiagBilinearAccess(c.zw));

    // Merge the crossing edges at each side into a single value
    var cc = vec2f(2.0) * decoded.yw + decoded.xz;

    // Remove the crossing edge if the end of the line wasn't found
    cc = select(cc, vec2f(0.0), d.zw >= vec2f(0.9));

    weights += smaaAreaDiag(areaTex, areaSampler, d.xy, cc, subsampleIndices.z);
  }

  // Search for the line ends
  let search2 = smaaSearchDiag2(edgesTex, edgesSampler, texelSize, texCoord, vec2f(-1.0, -1.0), &end);
  d.x = search2.x;
  d.z = search2.y;
  if (smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, texCoord, vec2f(1.0, 0.0)).r > 0.0) {
    let search3 = smaaSearchDiag2(edgesTex, edgesSampler, texelSize, texCoord, vec2f(1.0, 1.0), &end);
    d.y = search3.x + f32(end.y > 0.9);
    d.w = search3.y;
  } else {
    d.y = 0.0;
    d.w = 0.0;
  }

  if (d.x + d.y > 2.0) { // d.x + d.y + 1 > 3
    // Fetch the crossing edges
    let coords = vec4f(-d.x, -d.x, d.y, d.y) * texelSize.xyxy + texCoord.xyxy;
    let c = vec4f(
      smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, coords.xy, vec2f(-1.0, 0.0)).g,
      smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, coords.xy, vec2f(0.0, -1.0)).r,
      smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, coords.zw, vec2f(1.0, 0.0)).gr
    );
    var cc = vec2f(2.0) * c.xz + c.yw;

    // Remove the crossing edge if the end of the line wasn't found
    cc = select(cc, vec2f(0.0), d.zw >= vec2f(0.9));

    weights += smaaAreaDiag(areaTex, areaSampler, d.xy, cc, subsampleIndices.w).gr;
  }

  return weights;
}

// How much length to add in the last step of a search: takes the bilinearly
// interpolated edge (@PSEUDO_GATHER4) and adds 0, 1 or 2.
fn smaaSearchLength(
  searchTex: texture_2d<f32>,
  searchSampler: sampler,
  e: vec2f,
  offset: f32
) -> f32 {
  // The texture is flipped vertically, with left and right cases taking half
  // the space horizontally.
  var scale = SMAA_SEARCHTEX_SIZE * vec2f(0.5, -1.0);
  var bias = SMAA_SEARCHTEX_SIZE * vec2f(offset, 1.0);

  // Scale and bias to texel centers
  scale += vec2f(-1.0, 1.0);
  bias += vec2f(0.5, -0.5);

  // Pixel coordinates to texcoords (the texture is cropped, hence the packed size)
  scale /= SMAA_SEARCHTEX_PACKED_SIZE;
  bias /= SMAA_SEARCHTEX_PACKED_SIZE;

  return textureSampleLevel(searchTex, searchSampler, scale * e + bias, 0.0).r;
}

// The search coordinates are offset by (-0.25, -0.125) in the vertex stage to
// sample between edges, fetching four in a row. Different offsets in each
// direction disambiguate which of them are active (@PSEUDO_GATHER4).
fn smaaSearchXLeft(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  searchTex: texture_2d<f32>,
  searchSampler: sampler,
  texelSize: vec2f,
  texCoordStart: vec2f,
  end: f32
) -> f32 {
  var texCoord = texCoordStart;
  var e = vec2f(0.0, 1.0);
  // Stop at an unactivated edge, or at a crossing edge breaking the line
  while (texCoord.x > end && e.g > 0.8281 && e.r == 0.0) {
    e = textureSampleLevel(edgesTex, edgesSampler, texCoord, 0.0).rg;
    texCoord -= vec2f(2.0, 0.0) * texelSize;
  }
  let offset = -(255.0 / 127.0) * smaaSearchLength(searchTex, searchSampler, e, 0.0) + 3.25;
  return texelSize.x * offset + texCoord.x;
}

fn smaaSearchXRight(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  searchTex: texture_2d<f32>,
  searchSampler: sampler,
  texelSize: vec2f,
  texCoordStart: vec2f,
  end: f32
) -> f32 {
  var texCoord = texCoordStart;
  var e = vec2f(0.0, 1.0);
  while (texCoord.x < end && e.g > 0.8281 && e.r == 0.0) {
    e = textureSampleLevel(edgesTex, edgesSampler, texCoord, 0.0).rg;
    texCoord += vec2f(2.0, 0.0) * texelSize;
  }
  let offset = -(255.0 / 127.0) * smaaSearchLength(searchTex, searchSampler, e, 0.5) + 3.25;
  return -texelSize.x * offset + texCoord.x;
}

fn smaaSearchYUp(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  searchTex: texture_2d<f32>,
  searchSampler: sampler,
  texelSize: vec2f,
  texCoordStart: vec2f,
  end: f32
) -> f32 {
  var texCoord = texCoordStart;
  var e = vec2f(1.0, 0.0);
  while (texCoord.y > end && e.r > 0.8281 && e.g == 0.0) {
    e = textureSampleLevel(edgesTex, edgesSampler, texCoord, 0.0).rg;
    texCoord -= vec2f(0.0, 2.0) * texelSize;
  }
  let offset = -(255.0 / 127.0) * smaaSearchLength(searchTex, searchSampler, e.gr, 0.0) + 3.25;
  return texelSize.y * offset + texCoord.y;
}

fn smaaSearchYDown(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  searchTex: texture_2d<f32>,
  searchSampler: sampler,
  texelSize: vec2f,
  texCoordStart: vec2f,
  end: f32
) -> f32 {
  var texCoord = texCoordStart;
  var e = vec2f(1.0, 0.0);
  while (texCoord.y < end && e.r > 0.8281 && e.g == 0.0) {
    e = textureSampleLevel(edgesTex, edgesSampler, texCoord, 0.0).rg;
    texCoord += vec2f(0.0, 2.0) * texelSize;
  }
  let offset = -(255.0 / 127.0) * smaaSearchLength(searchTex, searchSampler, e.gr, 0.5) + 3.25;
  return -texelSize.y * offset + texCoord.y;
}

// The distance and both crossing edges are known: look up the area at each
// side of the current edge.
fn smaaArea(
  areaTex: texture_2d<f32>,
  areaSampler: sampler,
  dist: vec2f,
  e1: f32,
  e2: f32,
  offset: f32
) -> vec2f {
  // Rounding prevents precision errors of bilinear filtering
  var texCoord = vec2f(SMAA_AREATEX_MAX_DISTANCE) * smaaRound(4.0 * vec2f(e1, e2)) + dist;

  texCoord = SMAA_AREATEX_PIXEL_SIZE * texCoord + 0.5 * SMAA_AREATEX_PIXEL_SIZE;
  texCoord.y = SMAA_AREATEX_SUBTEX_SIZE * offset + texCoord.y;

  return textureSampleLevel(areaTex, areaSampler, texCoord, 0.0).rg;
}

fn smaaDetectHorizontalCornerPattern(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  texelSize: vec2f,
  weights: vec2f,
  texCoord: vec4f,
  d: vec2f
) -> vec2f {
  if (SMAA_DISABLE_CORNER_DETECTION) {
    return weights;
  }

  let leftRight = step(d.xy, d.yx);
  // Reduce blending for pixels in the center of a line
  let rounding = (1.0 - f32(SMAA_CORNER_ROUNDING) / 100.0) * leftRight / (leftRight.x + leftRight.y);

  var factor = vec2f(1.0);
  factor.x -= rounding.x * smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, texCoord.xy, vec2f(0.0, 1.0)).r;
  factor.x -= rounding.y * smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, texCoord.zw, vec2f(1.0, 1.0)).r;
  factor.y -= rounding.x * smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, texCoord.xy, vec2f(0.0, -2.0)).r;
  factor.y -= rounding.y * smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, texCoord.zw, vec2f(1.0, -2.0)).r;

  return weights * saturate(factor);
}

fn smaaDetectVerticalCornerPattern(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  texelSize: vec2f,
  weights: vec2f,
  texCoord: vec4f,
  d: vec2f
) -> vec2f {
  if (SMAA_DISABLE_CORNER_DETECTION) {
    return weights;
  }

  let leftRight = step(d.xy, d.yx);
  let rounding = (1.0 - f32(SMAA_CORNER_ROUNDING) / 100.0) * leftRight / (leftRight.x + leftRight.y);

  var factor = vec2f(1.0);
  factor.x -= rounding.x * smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, texCoord.xy, vec2f(1.0, 0.0)).g;
  factor.x -= rounding.y * smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, texCoord.zw, vec2f(1.0, 1.0)).g;
  factor.y -= rounding.x * smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, texCoord.xy, vec2f(-2.0, 0.0)).g;
  factor.y -= rounding.y * smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, texCoord.zw, vec2f(-2.0, 1.0)).g;

  return weights * saturate(factor);
}

// Subsample indices are zero for SMAA 1x, see @SUBSAMPLE_INDICES in SMAA.hlsl
// for the temporal and multisampled modes.
fn smaaBlendingWeightCalculation(
  edgesTex: texture_2d<f32>,
  edgesSampler: sampler,
  areaTex: texture_2d<f32>,
  areaSampler: sampler,
  searchTex: texture_2d<f32>,
  searchSampler: sampler,
  viewportSize: vec2f,
  texelSize: vec2f,
  texCoord: vec2f,
  pixCoord: vec2f,
  offset0: vec4f,
  offset1: vec4f,
  offset2: vec4f,
  subsampleIndices: vec4f
) -> vec4f {
  var weights = vec4f(0.0);
  var e = textureSampleLevel(edgesTex, edgesSampler, texCoord, 0.0).rg;

  if (e.g > 0.0) { // Edge at north
    if (!SMAA_DISABLE_DIAG_DETECTION) {
      // Diagonals have both north and west edges, so searching one boundary
      // is enough.
      weights = vec4f(
        smaaCalculateDiagWeights(edgesTex, edgesSampler, areaTex, areaSampler, texelSize, texCoord, e, subsampleIndices),
        weights.ba
      );
    }

    // Diagonals take priority: finding one skips horizontal/vertical processing.
    if (weights.r == -weights.g) { // weights.r + weights.g == 0.0
      // Distance to the left
      var coords = vec3f(
        smaaSearchXLeft(edgesTex, edgesSampler, searchTex, searchSampler, texelSize, offset0.xy, offset2.x),
        offset1.y, // offset1.y = texCoord.y - 0.25 * texelSize.y (@CROSSING_OFFSET)
        0.0
      );

      // Fetch the left crossing edges, two at a time using bilinear filtering.
      // Sampling at -0.25 (@CROSSING_OFFSET) discerns what value each edge has.
      let e1 = textureSampleLevel(edgesTex, edgesSampler, coords.xy, 0.0).r;

      // Distance to the right
      coords.z = smaaSearchXRight(edgesTex, edgesSampler, searchTex, searchSampler, texelSize, offset0.zw, offset2.y);

      // In pixel units, so the area texture's quadratic compression applies
      let d = abs(smaaRound(viewportSize.xx * coords.xz - pixCoord.xx));

      // Fetch the right crossing edges
      let e2 = smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, coords.zy, vec2f(1.0, 0.0)).r;

      weights = vec4f(smaaArea(areaTex, areaSampler, sqrt(d), e1, e2, subsampleIndices.y), weights.ba);

      // Fix corners
      coords.y = texCoord.y;
      weights = vec4f(
        smaaDetectHorizontalCornerPattern(edgesTex, edgesSampler, texelSize, weights.rg, coords.xyzy, d),
        weights.ba
      );
    } else {
      e.r = 0.0; // Skip vertical processing
    }
  }

  if (e.r > 0.0) { // Edge at west
    // Distance to the top
    var coords = vec3f(
      offset0.x, // offset0.x = texCoord.x - 0.25 * texelSize.x
      smaaSearchYUp(edgesTex, edgesSampler, searchTex, searchSampler, texelSize, offset1.xy, offset2.z),
      0.0
    );

    // Fetch the top crossing edges
    let e1 = textureSampleLevel(edgesTex, edgesSampler, coords.xy, 0.0).g;

    // Distance to the bottom
    coords.z = smaaSearchYDown(edgesTex, edgesSampler, searchTex, searchSampler, texelSize, offset1.zw, offset2.w);

    let d = abs(smaaRound(viewportSize.yy * coords.yz - pixCoord.yy));

    // Fetch the bottom crossing edges
    let e2 = smaaSampleLevelZeroOffset(edgesTex, edgesSampler, texelSize, coords.xz, vec2f(0.0, 1.0)).g;

    weights = vec4f(weights.rg, smaaArea(areaTex, areaSampler, sqrt(d), e1, e2, subsampleIndices.x));

    // Fix corners
    coords.x = texCoord.x;
    weights = vec4f(
      weights.rg,
      smaaDetectVerticalCornerPattern(edgesTex, edgesSampler, texelSize, weights.ba, coords.xyxz, d)
    );
  }

  return weights;
}
`;

var blend_wgsl_default = `// SMAA pass 3: neighborhood blending. Mixes each pixel with the neighbor its
// blending weights point at, exploiting bilinear filtering to do it in one tap
// per direction. Takes textures as parameters and declares no bindings.
// Requires smaaDecodeVelocity(), eg. from the velocity chunk.

// Coordinates of the right and top neighbors' weights. Affine in texCoord, so
// they can be computed in the vertex stage and interpolated.
fn smaaNeighborhoodBlendingOffset(texCoord: vec2f, texelSize: vec2f) -> vec4f {
  return texelSize.xyxy * vec4f(1.0, 0.0, 0.0, 1.0) + texCoord.xyxy;
}

// Where to sample the color, and how much of each tap to take. Without any
// blending weight, it is the pixel itself at full weight.
struct SmaaBlendingTaps {
  coords: vec4f,
  weights: vec2f,
}

fn smaaNeighborhoodBlendingTaps(
  blendTex: texture_2d<f32>,
  blendSampler: sampler,
  texelSize: vec2f,
  texCoord: vec2f,
  offset: vec4f
) -> SmaaBlendingTaps {
  // Fetch the blending weights for the current pixel
  let bottomLeft = textureSampleLevel(blendTex, blendSampler, texCoord, 0.0);
  let a = vec4f(
    textureSampleLevel(blendTex, blendSampler, offset.xy, 0.0).a, // Right
    textureSampleLevel(blendTex, blendSampler, offset.zw, 0.0).g, // Top
    bottomLeft.z, // Left
    bottomLeft.x // Bottom
  );

  // Is there any blending weight with a value greater than 0.0?
  if (dot(a, vec4f(1.0)) < 1e-5) {
    return SmaaBlendingTaps(texCoord.xyxy, vec2f(1.0, 0.0));
  }

  let h = max(a.x, a.z) > max(a.y, a.w); // max(horizontal) > max(vertical)

  let blendingOffset = select(vec4f(0.0, a.y, 0.0, a.w), vec4f(a.x, 0.0, a.z, 0.0), h);
  var blendingWeight = select(a.yw, a.xz, h);
  blendingWeight /= dot(blendingWeight, vec2f(1.0));

  return SmaaBlendingTaps(
    blendingOffset * vec4f(texelSize, -texelSize) + texCoord.xyxy,
    blendingWeight
  );
}

fn smaaNeighborhoodBlendingSample(
  tex: texture_2d<f32>,
  texSampler: sampler,
  taps: SmaaBlendingTaps
) -> vec4f {
  // Bilinear filtering mixes the current pixel with the chosen neighbor
  var color = taps.weights.x * textureSampleLevel(tex, texSampler, taps.coords.xy, 0.0);
  if (taps.weights.y > 0.0) {
    color += taps.weights.y * textureSampleLevel(tex, texSampler, taps.coords.zw, 0.0);
  }
  return color;
}

fn smaaNeighborhoodBlending(
  colorTex: texture_2d<f32>,
  colorSampler: sampler,
  blendTex: texture_2d<f32>,
  blendSampler: sampler,
  texelSize: vec2f,
  texCoord: vec2f,
  offset: vec4f
) -> vec4f {
  let taps = smaaNeighborhoodBlendingTaps(blendTex, blendSampler, texelSize, texCoord, offset);
  return smaaNeighborhoodBlendingSample(colorTex, colorSampler, taps);
}

// Packs the antialiased velocity into the alpha channel, for
// smaaResolveReprojection.
fn smaaNeighborhoodBlendingReprojection(
  colorTex: texture_2d<f32>,
  colorSampler: sampler,
  blendTex: texture_2d<f32>,
  blendSampler: sampler,
  velocityTex: texture_2d<f32>,
  velocitySampler: sampler,
  texelSize: vec2f,
  texCoord: vec2f,
  offset: vec4f
) -> vec4f {
  let taps = smaaNeighborhoodBlendingTaps(blendTex, blendSampler, texelSize, texCoord, offset);
  let color = smaaNeighborhoodBlendingSample(colorTex, colorSampler, taps);
  // Decoded per tap, as the decoding need not be linear
  var velocity = taps.weights.x *
    smaaDecodeVelocity(textureSampleLevel(velocityTex, velocitySampler, taps.coords.xy, 0.0));
  if (taps.weights.y > 0.0) {
    velocity += taps.weights.y *
      smaaDecodeVelocity(textureSampleLevel(velocityTex, velocitySampler, taps.coords.zw, 0.0));
  }
  return vec4f(color.rgb, sqrt(5.0 * length(velocity)));
}
`;

var resolve_wgsl_default = `// SMAA temporal resolve (optional pass): blends the current frame with the
// previous one for the 2x temporal modes. Takes textures as parameters and
// declares no bindings. Requires smaaDecodeVelocity(), eg. from the velocity
// chunk.

// Range: [0, 80]. The higher, the sooner a moving pixel stops blending with
// its history.
override SMAA_REPROJECTION_WEIGHT_SCALE: f32 = 30.0;

fn smaaResolve(
  currentColorTex: texture_2d<f32>,
  previousColorTex: texture_2d<f32>,
  colorSampler: sampler,
  texCoord: vec2f
) -> vec4f {
  let current = textureSampleLevel(currentColorTex, colorSampler, texCoord, 0.0);
  let previous = textureSampleLevel(previousColorTex, colorSampler, texCoord, 0.0);
  return mix(current, previous, 0.5);
}

// Expects the current color's alpha written by
// smaaNeighborhoodBlendingReprojection, and the same velocity texture.
fn smaaResolveReprojection(
  currentColorTex: texture_2d<f32>,
  previousColorTex: texture_2d<f32>,
  colorSampler: sampler,
  velocityTex: texture_2d<f32>,
  velocitySampler: sampler,
  texCoord: vec2f
) -> vec4f {
  // Velocity is assumed to be calculated for motion blur, so it is inverted
  // for reprojection
  let velocity = -smaaDecodeVelocity(textureSampleLevel(velocityTex, velocitySampler, texCoord, 0.0));

  let current = textureSampleLevel(currentColorTex, colorSampler, texCoord, 0.0);
  let previous = textureSampleLevel(previousColorTex, colorSampler, texCoord + velocity, 0.0);

  // Attenuate the previous pixel if the velocity is different
  let delta = abs(current.a * current.a - previous.a * previous.a) / 5.0;
  let weight = 0.5 * saturate(1.0 - sqrt(delta) * SMAA_REPROJECTION_WEIGHT_SCALE);

  return mix(current, previous, weight);
}
`;

/** @module pex-io */
/** @private */
const fetchOk = async (url, fetchOptions) => {
	const response = await fetch(url, fetchOptions);
	if (response.ok) return response;
	throw new Error(`${fetchOptions?.method ?? url.method ?? "GET"} ${response.url} ${response.status}${response.statusText ? ` (${response.statusText})` : ""}`, { cause: response });
};
/**
* Load an item and parse the Response as text.
*
* @function
* @param {RequestInfo | URL} url
* @param {RequestInit} [fetchOptions]
* @returns {Promise<string>}
*/
const loadText = async (url, fetchOptions) => await (await fetchOk(url, fetchOptions)).text();
/**
* Load an item and parse the Response as json.
*
* @function
* @param {RequestInfo | URL} url
* @param {RequestInit} [fetchOptions]
* @returns {Promise<JSON>}
*/
const loadJson = async (url, fetchOptions) => await (await fetchOk(url, fetchOptions)).json();
/**
* Load an item and parse the Response as arrayBuffer.
*
* @function
* @param {RequestInfo | URL} url
* @param {RequestInit} [fetchOptions]
* @returns {Promise<ArrayBuffer>}
*/
const loadArrayBuffer = async (url, fetchOptions) => await (await fetchOk(url, fetchOptions)).arrayBuffer();
/**
* Load an item and parse the Response as bytes.
*
* @function
* @param {RequestInfo | URL} url
* @param {RequestInit} [fetchOptions]
* @returns {Promise<Uint8Array>}
*/
const loadBytes = async (url, fetchOptions) => await (await fetchOk(url, fetchOptions)).bytes();
/**
* Load an item and parse the Response as blob.
*
* @function
* @param {RequestInfo | URL} url
* @param {RequestInit} [fetchOptions]
* @returns {Promise<Blob>}
*/
const loadBlob = async (url, fetchOptions) => await (await fetchOk(url, fetchOptions)).blob();
/** @private */
const loadMediaElement = async (type, element, defaultReadyEvent, urlOrProperties, fetchOptions) => {
	let url = urlOrProperties;
	let readyEvent = defaultReadyEvent;
	if (urlOrProperties.url !== void 0) {
		const { url: propertiesUrl, readyEvent: propertiesReadyEvent, ...rest } = urlOrProperties;
		url = propertiesUrl;
		readyEvent = propertiesReadyEvent ?? defaultReadyEvent;
		Object.assign(element, rest);
	}
	const signal = fetchOptions?.signal;
	let src = url;
	if (fetchOptions) {
		const blob = await loadBlob(url, fetchOptions);
		signal?.throwIfAborted();
		src = URL.createObjectURL(blob);
	}
	return await new Promise((resolve, reject) => {
		const controller = new AbortController();
		const listenerOptions = { signal: controller.signal };
		const revokeSrc = () => {
			if (fetchOptions) URL.revokeObjectURL(src);
		};
		const dispose = () => {
			controller.abort();
			revokeSrc();
		};
		element.addEventListener(readyEvent, () => {
			controller.abort();
			if (fetchOptions && element instanceof HTMLMediaElement) element.addEventListener("emptied", revokeSrc, { once: true });
			else revokeSrc();
			resolve(element);
		}, listenerOptions);
		element.addEventListener("error", (event) => {
			dispose();
			const reason = element.error?.message;
			reject(new Error(`Failed to load ${type}: ${url}${reason ? ` (${reason})` : ""}`, { cause: event }));
		}, listenerOptions);
		signal?.addEventListener("abort", () => {
			dispose();
			element.removeAttribute("src");
			element.load?.();
			reject(signal.reason);
		}, listenerOptions);
		element.src = src;
	});
};
/**
* Create and load a HTML Image. If fetchOptions are specified, load and parse
* the Response as blob to set the "src" property.
*
* @function
* @param {string | URL | import("./types.js").ImageOptions} urlOrImageProperties
* @param {RequestInit} [fetchOptions]
* @returns {Promise<HTMLImageElement>}
*/
const loadImage = async (urlOrImageProperties, fetchOptions) => await loadMediaElement("image", new Image(), "load", urlOrImageProperties, fetchOptions);
/**
* Create and load a HTML Video. If fetchOptions are specified, load and parse
* the Response as blob to set the "src" property.
*
* @function
* @param {string | URL | import("./types.js").VideoOptions} urlOrVideoProperties
* @param {RequestInit} [fetchOptions]
* @returns {Promise<HTMLVideoElement>}
*/
const loadVideo = async (urlOrVideoProperties, fetchOptions) => await loadMediaElement("video", document.createElement("video"), "canplaythrough", urlOrVideoProperties, fetchOptions);
/** @private */
const LOADERS_MAP = {
	text: loadText,
	json: loadJson,
	image: loadImage,
	video: loadVideo,
	blob: loadBlob,
	arrayBuffer: loadArrayBuffer,
	bytes: loadBytes
};
const LOADERS_MAP_KEYS = Object.keys(LOADERS_MAP);

/**
* The renderer's motion vectors point from this frame to the last (see
* FRAGMENT_VELOCITY), SMAA's the other way round, as a motion blur velocity
* buffer would.
*/
const decodeVelocity = `
fn smaaDecodeVelocity(sample: vec4f) -> vec2f {
  return -sample.rg;
}
`;
/**
* Pass 1: writes the left/top edge pair, discarding where there is none.
*
* Luma or color edges by default, `SMAA_EDGES_DEPTH` for depth ones, and
* `USE_SMAA_PREDICATION` to lower the luma/color threshold where depth has an
* edge.
*/
const smaaEdgesShader = (defines = /* @__PURE__ */ new Set()) => {
	const depth = defines.has("SMAA_EDGES_DEPTH");
	const color = defines.has("SMAA_EDGES_COLOR");
	const predication = !depth && defines.has("USE_SMAA_PREDICATION");
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

${depth ? "" : textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}
${depth || predication ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uDepthTexture", "texture_depth_2d") : ""}

${fullscreenVertex()}

// Includes
${edges_wgsl_default}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let offsets = smaaEdgeDetectionOffsets(input.texCoord0, uPostProcessing.texelSize);

  let edges = ${depth ? "smaaDepthEdgeDetection(uDepthTexture, uDepthTextureSampler, input.texCoord0, offsets[0])" : `${color ? "smaaColorEdgeDetection" : "smaaLumaEdgeDetection"}(
    uTexture,
    uTextureSampler,
    input.texCoord0,
    offsets[0],
    offsets[1],
    offsets[2],
    ${predication ? "smaaCalculatePredicatedThreshold(uDepthTexture, uDepthTextureSampler, input.texCoord0, offsets[0])" : "vec2f(SMAA_THRESHOLD)"}
  )`};

  return vec4f(edges, 0.0, 1.0);
}
`);
};
/**
* Pass 2: turns edges into per-side blending weights. Subsample indices are
* zero for 1x, and select the area texture's rows matching the jitter for T2x.
*/
const smaaWeightsShader = () => {
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

struct SMAA {
  subsampleIndices: vec4f,
}
@group(0) @binding(${alloc.next()}) var<uniform> uSMAA: SMAA;

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uEdgesTexture")}
${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uAreaTexture")}
${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uSearchTexture")}

${fullscreenVertex()}

// Includes
${weights_wgsl_default}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let viewportSize = uPostProcessing.viewportSize;
  let texelSize = uPostProcessing.texelSize;
  let offsets = smaaBlendingWeightCalculationOffsets(input.texCoord0, texelSize);

  return smaaBlendingWeightCalculation(
    uEdgesTexture,
    uEdgesTextureSampler,
    uAreaTexture,
    uAreaTextureSampler,
    uSearchTexture,
    uSearchTextureSampler,
    viewportSize,
    texelSize,
    input.texCoord0,
    input.texCoord0 * viewportSize,
    offsets[0],
    offsets[1],
    offsets[2],
    uSMAA.subsampleIndices
  );
}
`);
};
/**
* Pass 3: blends each pixel with the neighbour its weights point at.
* `USE_SMAA_REPROJECTION` also packs the antialiased velocity into alpha, for
* the temporal resolve.
*/
const smaaBlendShader = (defines = /* @__PURE__ */ new Set()) => {
	const reprojection = defines.has("USE_SMAA_REPROJECTION");
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}
${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uBlendTexture")}
${reprojection ? textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uVelocityTexture") : ""}

${fullscreenVertex()}

// Includes
${decodeVelocity}
${blend_wgsl_default}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  let texelSize = uPostProcessing.texelSize;

  return ${reprojection ? "smaaNeighborhoodBlendingReprojection" : "smaaNeighborhoodBlending"}(
    uTexture,
    uTextureSampler,
    uBlendTexture,
    uBlendTextureSampler,${reprojection ? `
    uVelocityTexture,
    uVelocityTextureSampler,` : ""}
    texelSize,
    input.texCoord0,
    smaaNeighborhoodBlendingOffset(input.texCoord0, texelSize)
  );
}
`);
};
/**
* T2x resolve: this frame's blend output (`uTexture`) with the previous one's
* (`uHistoryTexture`), both read through `uTextureSampler`.
* `USE_SMAA_REPROJECTION` follows the velocity to where each pixel was, and
* takes alpha from the image SMAA started from (`uColorTexture`): the blend
* packed velocity where the image's own alpha was, and the chain after this
* composites with it.
*/
const smaaResolveShader = (defines = /* @__PURE__ */ new Set()) => {
	const reprojection = defines.has("USE_SMAA_REPROJECTION");
	const alloc = createBindingAllocator(1);
	return formatShader(`
${postProcessingStruct}

${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uTexture")}
${bindingDeclaration(0, alloc.next(), "uHistoryTexture", "texture_2d<f32>")}
${reprojection ? `${textureSamplerDeclaration(0, alloc.nextTextureSampler(), "uVelocityTexture")}
${bindingDeclaration(0, alloc.next(), "uColorTexture", "texture_2d<f32>")}` : ""}

${fullscreenVertex()}

// Includes
${decodeVelocity}
${resolve_wgsl_default}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
  ${reprojection ? `let resolved = smaaResolveReprojection(
    uTexture,
    uHistoryTexture,
    uTextureSampler,
    uVelocityTexture,
    uVelocityTextureSampler,
    input.texCoord0
  );
  let alpha = textureSampleLevel(uColorTexture, uTextureSampler, input.texCoord0, 0.0).a;

  return vec4f(resolved.rgb, alpha);` : `return smaaResolve(uTexture, uHistoryTexture, uTextureSampler, input.texCoord0);`}
}
`);
};

export { loadArrayBuffer as a, loadJson as c, smaaWeightsShader as i, smaaEdgesShader as n, loadBlob as o, smaaResolveShader as r, loadImage as s, smaaBlendShader as t };