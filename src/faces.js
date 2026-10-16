/**
 * @module faces
 * @ignore
 */

import { avec3 } from "pex-math";

const AB = new Float64Array(3);
const AC = new Float64Array(3);

/**
 * Area of each triangle.
 *
 * @param {Float32Array} positions
 * @param {ArrayLike<number>} cells
 * @returns {Float64Array}
 */
export function faceAreas(positions, cells) {
  const areas = new Float64Array(Math.floor(cells.length / 3));

  for (let f = 0; f < areas.length; f++) {
    const a = cells[f * 3];
    avec3.set(AB, 0, positions, cells[f * 3 + 1]);
    avec3.sub(AB, 0, positions, a);
    avec3.set(AC, 0, positions, cells[f * 3 + 2]);
    avec3.sub(AC, 0, positions, a);
    avec3.cross(AB, 0, AC, 0);
    areas[f] = 0.5 * avec3.length(AB, 0);
  }

  return areas;
}

/**
 * Face areas multiplied by the mean of their vertex weights, negative weights
 * counting as 0.
 *
 * @param {Float64Array} areas
 * @param {ArrayLike<number>} cells
 * @param {ArrayLike<number>} [weights]
 * @returns {Float64Array}
 */
export function weightedAreas(areas, cells, weights) {
  if (!weights) return areas;

  return areas.map((area, f) => {
    const weight =
      (weights[cells[f * 3]] +
        weights[cells[f * 3 + 1]] +
        weights[cells[f * 3 + 2]]) /
      3;
    return weight > 0 ? area * weight : 0;
  });
}

/**
 * Cumulative sums of `values`.
 *
 * @param {Float64Array} values
 * @returns {Float64Array}
 */
export function cumulativeSum(values) {
  let sum = 0;
  return values.map((value) => (sum += value));
}

/**
 * First index with `cdf[i] > r`: an index is found with a probability
 * proportional to its value, zero values never.
 *
 * @param {Float64Array} cdf
 * @param {number} r In [0, cdf.at(-1)).
 * @returns {number}
 */
export function sampleCDF(cdf, r) {
  let lo = 0;
  let hi = cdf.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cdf[mid] <= r) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * Write uniform random barycentric coordinates at `i`.
 *
 * @param {Float32Array} barycentrics
 * @param {number} i
 * @param {import("./sample.js").Random} random
 */
export function sampleBarycentric(barycentrics, i, random) {
  let u = random.float();
  let v = random.float();
  // Fold points outside the triangle back inside to keep them uniform.
  if (u + v > 1) {
    u = 1 - u;
    v = 1 - v;
  }
  avec3.set3(barycentrics, i, u, v, 1 - u - v);
}
