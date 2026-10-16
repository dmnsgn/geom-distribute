/**
 * @module attributes
 * @ignore
 */

import { vec3 } from "pex-math";

const isAttribute = (value) =>
  value instanceof Float32Array ||
  (Array.isArray(value) && typeof value[0] === "number");

/**
 * Names of the per-vertex attributes of a geometry: Float32Array or number[]
 * properties other than positions and cells, with a length multiple of the
 * vertex count.
 *
 * @param {import("../types.js").SimplicialComplex} geometry
 * @param {string[]} [names] Candidate names. Defaults to all properties.
 * @returns {string[]}
 */
export function vertexAttributeNames(geometry, names = Object.keys(geometry)) {
  const vertexCount = geometry.positions.length / 3;
  if (!vertexCount) return [];

  return names.filter((name) => {
    const value = geometry[name];
    return (
      name !== "positions" &&
      name !== "cells" &&
      isAttribute(value) &&
      value.length > 0 &&
      value.length % vertexCount === 0
    );
  });
}

/**
 * Attribute values at sampled points, blended with barycentric coordinates.
 *
 * @param {Float32Array | number[]} attribute
 * @param {number} stride
 * @param {ArrayLike<number>} cells
 * @param {import("./sample.js").Sample} sample
 * @param {boolean} [normalize=false] Normalize the first three components.
 * @returns {Float32Array}
 */
export function interpolate(
  attribute,
  stride,
  cells,
  { faceIndices, barycentrics },
  normalize = false,
) {
  const count = faceIndices.length;
  const values = new Float32Array(count * stride);
  const normalized = normalize && stride >= 3;

  for (let i = 0; i < count; i++) {
    const offset = i * stride;
    for (let v = 0; v < 3; v++) {
      const vertexOffset = cells[faceIndices[i] * 3 + v] * stride;
      const weight = barycentrics[i * 3 + v];
      for (let k = 0; k < stride; k++) {
        values[offset + k] += attribute[vertexOffset + k] * weight;
      }
    }
    // Tangents can store their handedness in a fourth component.
    if (normalized) vec3.normalize(values.subarray(offset, offset + 3));
  }

  return values;
}
