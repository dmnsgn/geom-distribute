/**
 * @typedef {object} SimplicialComplex Triangle cells over shared positions. Any
 *   other Float32Array or number[] property whose length is a multiple of the
 *   vertex count is a per-vertex attribute (normals, uvs, vertexColors...), its
 *   stride being that multiple.
 * @property {Float32Array} positions
 * @property {import("primitive-geometry").TypedArrayLike} cells Flat triangle
 *   vertex indices.
 */

/**
 * @typedef {object} PointGeometry Distributed points and their per-vertex
 *   attributes interpolated from the source geometry.
 * @property {Float32Array} positions
 * @property {Uint32Array} faceIndices Source face of each point.
 * @property {Float32Array} barycentrics Weights of the source face vertices
 *   (stride 3).
 */

/**
 * @typedef {object} DistributeOptions
 * @property {import("primitive-geometry").NonNegativeInteger} [count=1000]
 *   Number of points.
 * @property {number} [density] Points per unit area, finite and >= 0. Overrides
 *   `count`. Points stay on their face when the mesh deforms.
 * @property {number} [maxCount=Infinity] Upper bound on the number of points in
 *   density mode, lowering the density when reached.
 * @property {"random" | "poisson"} [method="random"] Poisson disk distributions
 *   space points evenly: exactly `count` points, or points at least
 *   `distanceMin` apart in density mode.
 * @property {import("primitive-geometry").PositiveInteger} [oversampling=5]
 *   Candidates per point in Poisson count mode: more is evener but slower.
 * @property {number} [distanceMin=0] Minimum distance between points in Poisson
 *   density mode, where weights are 1.
 * @property {Float32Array | number[]} [weights] Per-vertex density factors, one
 *   per vertex: relative in count mode, multiplying `density` otherwise.
 *   Poisson spacing scales with 1 / sqrt(weight).
 * @property {number | string} [seed=0]
 * @property {string[]} [attributes] Per-vertex attributes to interpolate.
 *   Defaults to all of them.
 * @property {boolean | string[]} [normalize=true] Attributes renormalized after
 *   interpolation, `true` for normals, tangents and binormals. Only their first
 *   three components are normalized.
 */

export {};
