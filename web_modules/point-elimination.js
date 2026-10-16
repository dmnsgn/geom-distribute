/**
* @module domain
* @ignore
*/
const FLAT_EXTENT = 1e-9;
/**
* Euclidean distance between two points.
*
* @param {ArrayLike<number>} points
* @param {number} dimension
* @param {number} i
* @param {number} j
* @returns {number}
*/
function distance(points, dimension, i, j) {
	let sum = 0;
	for (let k = 0; k < dimension; k++) {
		const delta = points[i * dimension + k] - points[j * dimension + k];
		sum += delta * delta;
	}
	return Math.sqrt(sum);
}
/** @typedef {Float64Array[]} Bounds [min, max] */
/**
* Axis-aligned bounds of a subset of points.
*
* @param {ArrayLike<number>} points
* @param {number} dimension
* @param {ArrayLike<number>} indices
* @returns {Bounds}
*/
function getBounds(points, dimension, indices) {
	const min = new Float64Array(dimension).fill(Infinity);
	const max = new Float64Array(dimension).fill(-Infinity);
	for (const i of indices) for (let k = 0; k < dimension; k++) {
		min[k] = Math.min(min[k], points[i * dimension + k]);
		max[k] = Math.max(max[k], points[i * dimension + k]);
	}
	return [min, max];
}
/**
* Size of each axis of bounds, 0 when empty.
*
* @param {Bounds} bounds
* @returns {number[]}
*/
const getExtents = ([min, max]) => Array.from(min, (value, k) => Math.max(0, max[k] - value));
/**
* @typedef {object} Domain
* @property {number} size Length, area or volume.
* @property {number} dimension
*/
/**
* Size and dimension of bounds, ignoring flat axes.
*
* @param {Bounds} bounds
* @returns {Domain}
*/
function boundingDomain(bounds) {
	const extents = getExtents(bounds);
	const maxExtent = Math.max(...extents);
	const axes = extents.filter((extent) => extent > maxExtent * FLAT_EXTENT);
	return {
		size: axes.length ? axes.reduce((size, extent) => size * extent, 1) : 0,
		dimension: Math.max(1, axes.length)
	};
}
/**
* Largest value of `scales` over a subset of points, 1 without scales.
*
* @param {ArrayLike<number> | undefined} scales
* @param {ArrayLike<number>} indices
* @returns {number}
*/
function maxScale(scales, indices) {
	if (!scales) return 1;
	let max = 0;
	for (const i of indices) max = Math.max(max, scales[i]);
	return max;
}
/**
* Scale of the distance between two points: the mean of their scales.
*
* @param {ArrayLike<number> | undefined} scales
* @param {number} i
* @param {number} j
* @returns {number}
*/
const pairScale = (scales, i, j) => scales ? (scales[i] + scales[j]) / 2 : 1;

/**
* @module grid
* @ignore
*/
const KEY_BITS = 52;
/**
* @typedef {object} Grid
* @property {function(number, function(number): void): void} forEachNeighbor
*   Call back with the positions in `indices` of the points in the cells around a
*   position, except itself.
*/
/**
* Sparse uniform grid (cell list) over a subset of points, for neighbor queries
* within `cellSize`.
*
* @param {ArrayLike<number>} points
* @param {number} dimension
* @param {ArrayLike<number>} indices
* @param {import("./domain.js").Bounds} bounds Bounds containing the subset.
* @param {number} cellSize
* @returns {Grid}
*/
function createGrid(points, dimension, indices, bounds, cellSize) {
	const [min] = bounds;
	const extents = getExtents(bounds);
	const maxCellsPerAxis = Math.floor(2 ** (KEY_BITS / dimension));
	const size = Math.max(cellSize, Math.max(...extents) / (maxCellsPerAxis - 1), 1e-300);
	const strides = new Float64Array(dimension);
	let stride = 1;
	for (let k = 0; k < dimension; k++) {
		strides[k] = stride;
		stride *= Math.floor(extents[k] / size) + 3;
	}
	const keys = new Float64Array(indices.length);
	const cells = /* @__PURE__ */ new Map();
	for (let l = 0; l < indices.length; l++) {
		const offset = indices[l] * dimension;
		let key = 0;
		for (let k = 0; k < dimension; k++) key += (Math.floor((points[offset + k] - min[k]) / size) + 1) * strides[k];
		keys[l] = key;
		const cell = cells.get(key);
		if (cell) cell.push(l);
		else cells.set(key, [l]);
	}
	let neighborOffsets = [0];
	for (const s of strides) neighborOffsets = neighborOffsets.flatMap((o) => [
		o - s,
		o,
		o + s
	]);
	return { forEachNeighbor(l, callback) {
		for (const neighborOffset of neighborOffsets) {
			const cell = cells.get(keys[l] + neighborOffset);
			if (!cell) continue;
			for (const m of cell) if (m !== l) callback(m);
		}
	} };
}

/**
* @module heap
* @ignore
*/
/**
* @typedef {object} MaxHeap
* @property {function(): number} pop
* @property {function(number): void} decrease Restore the order after lowering
*   a weight.
*/
/**
* Indexed binary max heap of the indices of `weights`.
*
* Ties pop the highest index first so results are deterministic.
*
* @param {Float64Array} weights Only lowered by the caller before `decrease`.
* @returns {MaxHeap}
*/
function createMaxHeap(weights) {
	let size = weights.length;
	const heap = Uint32Array.from({ length: size }, (_, i) => i);
	const positions = Uint32Array.from(heap);
	const greater = (a, b) => weights[a] > weights[b] || weights[a] === weights[b] && a > b;
	const place = (p, i) => {
		heap[p] = i;
		positions[i] = p;
	};
	const siftDown = (p) => {
		const i = heap[p];
		for (;;) {
			const left = p * 2 + 1;
			if (left >= size) break;
			const right = left + 1;
			const child = right < size && greater(heap[right], heap[left]) ? right : left;
			if (!greater(heap[child], i)) break;
			place(p, heap[child]);
			p = child;
		}
		place(p, i);
	};
	for (let p = (size >> 1) - 1; p >= 0; p--) siftDown(p);
	return {
		pop() {
			const top = heap[0];
			size--;
			if (size > 0) {
				heap[0] = heap[size];
				siftDown(0);
			}
			return top;
		},
		decrease(i) {
			siftDown(positions[i]);
		}
	};
}

/**
* @module pointElimination
* @ignore
*/
/**
* Poisson disk radius of `count` points densely packed in a domain of
* `domainSize`: segments in 1D, hexagonal in 2D and face-centered cubic in 3D.
* Points are twice that apart.
*
* @param {number} domainSize Length, area or volume of the domain.
* @param {number} count
* @param {number} [domainDimension=3] From 1 to 3.
* @returns {number}
*/
function packingRadius(domainSize, count, domainDimension = 3) {
	if (count <= 0 || domainSize <= 0) return 0;
	if (domainDimension === 1) return domainSize / (2 * count);
	return domainDimension === 2 ? Math.sqrt(domainSize / (2 * Math.sqrt(3) * count)) : Math.cbrt(domainSize / (4 * Math.SQRT2 * count));
}

/**
* @module pointElimination
* @ignore
*/
const ALPHA = 8;
const BETA = .65;
const GAMMA = 1.5;
const WEIGHT_RESOLUTION = 2 ** 36;
const grow = (array) => {
	const grown = new array.constructor(array.length * 2);
	grown.set(array);
	return grown;
};
function eliminate(points, options, indices, count, radius) {
	const { dimension, scales, weightLimiting, bounds } = options;
	const n = indices.length;
	if (count >= n) return {
		kept: Uint32Array.from(indices),
		removed: /* @__PURE__ */ new Uint32Array(0)
	};
	const diameter = 2 * radius;
	const minDiameter = weightLimiting ? diameter * (1 - (count / n) ** GAMMA) * BETA : 0;
	const localScales = scales && Float64Array.from(indices, (i) => scales[i]);
	const scaledDistance = (l, d) => localScales ? d / localScales[l] : d;
	const reach = (l) => localScales ? diameter * localScales[l] : diameter;
	const weightOf = (scaled) => scaled >= diameter ? 0 : Math.round((1 - Math.max(scaled, minDiameter) / diameter) ** ALPHA * WEIGHT_RESOLUTION);
	const weights = new Float64Array(n);
	const start = new Uint32Array(n + 1);
	let neighbors = new Uint32Array(n * 8);
	let neighborDistances = new Float64Array(n * 8);
	let edgeCount = 0;
	if (radius > 0) {
		const grid = createGrid(points, dimension, indices, bounds, diameter * maxScale(scales, indices));
		for (let l = 0; l < n; l++) {
			start[l] = edgeCount;
			const i = indices[l];
			grid.forEachNeighbor(l, (m) => {
				const d = distance(points, dimension, i, indices[m]);
				if (d >= Math.max(reach(l), reach(m))) return;
				weights[l] += weightOf(scaledDistance(l, d));
				const scaled = scaledDistance(m, d);
				if (scaled >= diameter) return;
				if (edgeCount === neighbors.length) {
					neighbors = grow(neighbors);
					neighborDistances = grow(neighborDistances);
				}
				neighbors[edgeCount] = m;
				neighborDistances[edgeCount++] = scaled;
			});
		}
	}
	start[n] = edgeCount;
	const alive = new Uint8Array(n).fill(1);
	const heap = createMaxHeap(weights);
	const removed = new Uint32Array(n - count);
	for (let r = 0; r < removed.length; r++) {
		const l = heap.pop();
		removed[r] = indices[l];
		alive[l] = 0;
		for (let e = start[l]; e < start[l + 1]; e++) {
			const m = neighbors[e];
			if (!alive[m]) continue;
			weights[m] -= weightOf(neighborDistances[e]);
			heap.decrease(m);
		}
	}
	return {
		kept: indices.filter((_, l) => alive[l]),
		removed
	};
}
/**
* @typedef {object} EliminateToCountOptions
* @property {number} [dimension=3] Number of components per point, from 1 to 3.
* @property {number} [domainSize] Length, area or volume of the sampled domain.
*   Defaults to the points bounding box, ignoring flat axes. Set it for points
*   on a curve or surface, eg. the area of a mesh.
* @property {number} [domainDimension] Dimension of the sampled domain, from 1
*   to 3, eg. 2 for a surface in 3D. Defaults to the bounding box dimension, or
*   `dimension` when `domainSize` is set. Set with `domainSize`.
* @property {ArrayLike<number>} [scales] Per point spacing multiplier for
*   adaptive sampling, positive and finite. Normalize them so that the domain
*   mean of 1 / scale^domainDimension is 1.
* @property {boolean} [weightLimiting=true] Cap the weight of very close
*   neighbors.
* @property {boolean} [progressive=false] Order the output so that each prefix
*   is itself well distributed.
*/
/**
* Weighted sample elimination ([Yuksel
* 2015](http://www.cemyuksel.com/research/sampleelimination/)) to a Poisson
* disk distributed subset of `count` points.
*
* Use 3 to 5 times more input points than `count`: more barely improves quality
* while cost grows quadratically.
*
* @param {ArrayLike<number>} points Flat array of point components.
* @param {number} count
* @param {EliminateToCountOptions} [options={}]
* @returns {Uint32Array} Indices of the kept points, ascending unless
*   `progressive`.
*/
function eliminateToCount(points, count, options = {}) {
	const { dimension = 3, scales, weightLimiting = true, progressive = false } = options;
	const pointCount = Math.floor(points.length / dimension);
	const indices = Uint32Array.from({ length: pointCount }, (_, i) => i);
	const target = Math.max(0, Math.min(Math.floor(count), pointCount));
	const bounds = getBounds(points, dimension, indices);
	let { domainSize, domainDimension } = options;
	if (domainSize === void 0) {
		const domain = boundingDomain(bounds);
		domainSize = domain.size;
		domainDimension ??= domain.dimension;
	}
	domainDimension ??= dimension;
	const eliminateOptions = {
		dimension,
		scales,
		weightLimiting,
		bounds
	};
	const radius = (c) => packingRadius(domainSize, c, domainDimension);
	const { kept } = eliminate(points, eliminateOptions, indices, target, radius(target));
	if (!progressive) return kept;
	const order = new Uint32Array(kept.length);
	let current = kept;
	let end = kept.length;
	while (current.length > 1) {
		const half = current.length >> 1;
		const result = eliminate(points, eliminateOptions, current, half, radius(half));
		for (let r = 0; r < result.removed.length; r++) order[end - 1 - r] = result.removed[r];
		end -= result.removed.length;
		current = result.kept;
	}
	order.set(current);
	return order;
}

/**
* @module pointElimination
* @ignore
*/
/**
* @typedef {object} EliminateByDistanceOptions
* @property {number} [dimension=3] Number of components per point, from 1 to 3.
* @property {ArrayLike<number>} [scales] Per point distance multiplier,
*   positive and finite: two points conflict below `distance` times the mean of
*   their scales.
* @property {ArrayLike<number>} [order] Indices in visiting order: earlier
*   points have priority. Points not listed are discarded. Defaults to the
*   index order.
*/
/**
* Greedy elimination: keeps each point, in order, not closer than `distance` to
* an already kept one. Every removed point of `order` conflicts with a kept
* point.
*
* @param {ArrayLike<number>} points Flat array of point components.
* @param {number} distance Minimum distance between kept points.
* @param {EliminateByDistanceOptions} [options={}]
* @returns {Uint32Array} Unique indices of the kept points, in visiting order.
*/
function eliminateByDistance(points, distance$1, options = {}) {
	const { dimension = 3, scales } = options;
	const pointCount = Math.floor(points.length / dimension);
	const order = options.order ?? Uint32Array.from({ length: pointCount }, (_, i) => i);
	const grid = distance$1 > 0 ? createGrid(points, dimension, order, getBounds(points, dimension, order), distance$1 * maxScale(scales, order)) : null;
	const visited = new Uint8Array(pointCount);
	const kept = new Uint32Array(order.length);
	let keptCount = 0;
	for (let l = 0; l < order.length; l++) {
		const i = order[l];
		if (visited[i]) continue;
		visited[i] = 1;
		kept[keptCount++] = i;
		grid?.forEachNeighbor(l, (m) => {
			const j = order[m];
			if (!visited[j] && distance(points, dimension, i, j) < distance$1 * pairScale(scales, i, j)) visited[j] = 1;
		});
	}
	return kept.slice(0, keptCount);
}

export { eliminateByDistance, eliminateToCount, packingRadius };