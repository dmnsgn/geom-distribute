/**
 * @module geomDistribute
 * @ignore
 */

import pexRandom from "pex-random";
import { eliminateByDistance, eliminateToCount } from "point-elimination";

import { interpolate, vertexAttributeNames } from "./attributes.js";
import { faceAreas, weightedAreas } from "./faces.js";
import {
  ascending,
  byPriority,
  sampleCount,
  sampleDensity,
  select,
  selectSample,
} from "./sample.js";

// Bounds Poisson spacing in low weight areas, and the neighbor search radius
// with it.
const MAX_SCALE = 4;

const NORMALIZED_ATTRIBUTES = ["normals", "tangents", "binormals"];

// Poisson spacing at each point relative to a weight of `reference`.
function getScales(weights, cells, sample, reference) {
  return interpolate(weights, 1, cells, sample).map((weight) =>
    weight > 0 ? Math.min(MAX_SCALE, Math.sqrt(reference / weight)) : MAX_SCALE,
  );
}

// Poisson disk subset of `count` candidates, spaced relative to the mean weight
// over the faces with a weight.
function keepCount(
  candidates,
  sample,
  count,
  { cells, weights, areas, faceWeights, totalWeight },
) {
  const domainSize = areas.reduce(
    (size, area, f) => (faceWeights[f] > 0 ? size + area : size),
    0,
  );

  return eliminateToCount(candidates, count, {
    domainSize,
    domainDimension: 2,
    scales:
      weights && getScales(weights, cells, sample, totalWeight / domainSize),
  });
}

// Candidates at least `distanceMin` apart where weights are 1, in face order.
function keepByDistance(candidates, sample, distanceMin, { cells, weights }) {
  // Visiting points by their own random priority doesn't favor the first faces,
  // and keeps eliminations local when the mesh deforms.
  return eliminateByDistance(candidates, distanceMin, {
    scales: weights && getScales(weights, cells, sample, 1),
    order: byPriority(sample),
  }).sort(ascending);
}

/**
 * Distribute points on the faces of a triangle mesh, uniformly by area or
 * weighted by a per-vertex density.
 *
 * @param {import("../types.js").SimplicialComplex} geometry
 * @param {import("../types.js").DistributeOptions} [options={}]
 * @returns {import("../types.js").PointGeometry}
 */
export function distribute(geometry, options = {}) {
  const {
    count = 1000,
    density,
    maxCount = Infinity,
    method = "random",
    oversampling = 5,
    distanceMin = 0,
    weights,
    attributes,
    normalize = true,
  } = options;
  const { positions, cells } = geometry;

  const random = pexRandom.create(options.seed ?? 0);
  const poisson = method === "poisson";
  const target = Math.max(0, Math.floor(count));

  const areas = faceAreas(positions, cells);
  const faceWeights = weightedAreas(areas, cells, weights);
  const totalWeight = faceWeights.reduce((sum, weight) => sum + weight, 0);

  let sample = {
    faceIndices: new Uint32Array(0),
    barycentrics: new Float32Array(0),
  };
  if (totalWeight > 0) {
    sample =
      density === undefined
        ? sampleCount(
            faceWeights,
            poisson ? target * oversampling : target,
            random,
          )
        : sampleDensity(
            faceWeights,
            Math.min(Math.max(0, density), maxCount / totalWeight),
            maxCount,
            random.int(2 ** 32),
          );
  }

  let pointPositions = interpolate(positions, 3, cells, sample);
  if (poisson && sample.faceIndices.length) {
    const kept =
      density === undefined
        ? keepCount(pointPositions, sample, target, {
            cells,
            weights,
            areas,
            faceWeights,
            totalWeight,
          })
        : keepByDistance(pointPositions, sample, distanceMin, {
            cells,
            weights,
          });
    sample = selectSample(sample, kept);
    pointPositions = select(pointPositions, 3, kept);
  }

  const vertexCount = positions.length / 3;
  const normalized =
    normalize === true ? NORMALIZED_ATTRIBUTES : normalize || [];

  return {
    ...Object.fromEntries(
      vertexAttributeNames(geometry, attributes).map((name) => [
        name,
        interpolate(
          geometry[name],
          geometry[name].length / vertexCount,
          cells,
          sample,
          normalized.includes(name),
        ),
      ]),
    ),
    positions: pointPositions,
    faceIndices: sample.faceIndices,
    barycentrics: sample.barycentrics,
  };
}
