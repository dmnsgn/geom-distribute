/**
 * @module sample
 * @ignore
 */

import fmix from "fmix";

import { cumulativeSum, sampleBarycentric, sampleCDF } from "./faces.js";

/**
 * @typedef {object} Random
 * @property {function(): number} float In [0, 1).
 */

/** @typedef {Random & { reset: function(number): void }} FaceRandom */

/**
 * Random generator reset to a stream per face: the values a face draws don't
 * depend on the other faces.
 *
 * @param {number} seed 32-bit integer.
 * @returns {FaceRandom}
 */
function createFaceRandom(seed) {
  let state = 0;
  return {
    // Hashing decorrelates the streams of consecutive faces. Both steps are
    // bijective, so each face gets its own state.
    reset(face) {
      state = fmix(seed ^ Math.imul(face, 0x9e_37_79_b9));
    },
    // Mulberry32: a few integer operations, as faces draw only a few values
    // each. https://gist.github.com/tommyettinger/46a874533244883189143505d203312c
    float() {
      let t = (state = (state + 0x6d_2b_79_f5) >>> 0);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
    },
  };
}

/**
 * @typedef {object} Sample
 * @property {Uint32Array} faceIndices
 * @property {Float32Array} barycentrics
 * @property {Float64Array} [priorities] Random rank of each point, lowest
 *   first.
 */

/**
 * `count` points, each on a face picked with a probability proportional to its
 * weight. Raising `count` keeps the existing points.
 *
 * @param {Float64Array} faceWeights
 * @param {number} count
 * @param {Random} random
 * @returns {Sample}
 */
export function sampleCount(faceWeights, count, random) {
  const cdf = cumulativeSum(faceWeights);
  const total = cdf.at(-1);

  const faceIndices = new Uint32Array(count);
  const barycentrics = new Float32Array(count * 3);
  // Same number of draws for every point, so that a prefix of the draws is the
  // sample of a lower count.
  for (let i = 0; i < count; i++) {
    faceIndices[i] = sampleCDF(cdf, random.float() * total);
    sampleBarycentric(barycentrics, i, random);
  }

  return { faceIndices, barycentrics };
}

/**
 * About `scale` points per unit of face weight, at most `maxCount`. Points stay
 * on their face when face weights change and are kept when `scale` grows.
 *
 * @param {Float64Array} faceWeights
 * @param {number} scale
 * @param {number} maxCount
 * @param {number} seed 32-bit integer.
 * @returns {Sample}
 */
export function sampleDensity(faceWeights, scale, maxCount, seed) {
  // Each face draws from its own stream: its random rounding, then the same
  // number of draws for every point.
  const random = createFaceRandom(seed);
  const counts = new Uint32Array(faceWeights.length);
  let count = 0;
  for (let f = 0; f < faceWeights.length; f++) {
    const value = faceWeights[f] * scale;
    if (!value) continue;
    random.reset(f);
    counts[f] = Math.floor(value) + (random.float() < value % 1 ? 1 : 0);
    count += counts[f];
  }

  const faceIndices = new Uint32Array(count);
  const barycentrics = new Float32Array(count * 3);
  const priorities = new Float64Array(count);
  for (let f = 0, i = 0; f < counts.length; f++) {
    if (!counts[f]) continue;
    random.reset(f);
    random.float(); // Rounding draw, already used for counts.
    for (let n = 0; n < counts[f]; n++, i++) {
      faceIndices[i] = f;
      sampleBarycentric(barycentrics, i, random);
      priorities[i] = random.float();
    }
  }
  const sample = { faceIndices, barycentrics, priorities };

  // Random rounding can overshoot maxCount by a few points.
  return count <= maxCount
    ? sample
    : selectSample(
        sample,
        byPriority(sample).subarray(0, maxCount).sort(ascending),
      );
}

/**
 * Compare function sorting numbers in ascending order.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export const ascending = (a, b) => a - b;

/**
 * Point indices from the lowest priority to the highest.
 *
 * @param {Sample} sample
 * @returns {Uint32Array}
 */
export function byPriority({ priorities }) {
  return Uint32Array.from(priorities, (_, i) => i).sort(
    (a, b) => priorities[a] - priorities[b],
  );
}

/**
 * Values of a strided array at `indices`.
 *
 * @template {Float32Array | Float64Array | Uint32Array} T
 * @param {T} values
 * @param {number} stride
 * @param {ArrayLike<number>} indices
 * @returns {T}
 */
export function select(values, stride, indices) {
  const selected = new values.constructor(indices.length * stride);
  for (let n = 0; n < indices.length; n++) {
    for (let k = 0; k < stride; k++) {
      selected[n * stride + k] = values[indices[n] * stride + k];
    }
  }
  return selected;
}

/**
 * Subset of a sample.
 *
 * @param {Sample} sample
 * @param {ArrayLike<number>} indices
 * @returns {Sample}
 */
export function selectSample(
  { faceIndices, barycentrics, priorities },
  indices,
) {
  return {
    faceIndices: select(faceIndices, 1, indices),
    barycentrics: select(barycentrics, 3, indices),
    ...(priorities && { priorities: select(priorities, 1, indices) }),
  };
}
