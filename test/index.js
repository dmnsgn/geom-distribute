import test, { describe } from "node:test";
import assert from "node:assert";
import { isDeepStrictEqual } from "node:util";

import { avec3, vec3 } from "pex-math";
import { capsule, cube, sphere, torus } from "primitive-geometry";

import { distribute } from "../index.js";

const close = (a, b, epsilon = 1e-5) => Math.abs(a - b) <= epsilon;

const maxError = (values, expected) =>
  Math.max(
    0,
    ...Array.from(values, (value, i) => Math.abs(value - expected(i))),
  );

const byName = (a, b) => a.localeCompare(b);

// Reference barycentric interpolation of a per-vertex attribute.
const interpolated = (attribute, stride, cells, points) => (n) => {
  const i = Math.floor(n / stride);
  const f = points.faceIndices[i];
  return [0, 1, 2].reduce(
    (sum, v) =>
      sum +
      attribute[cells[f * 3 + v] * stride + (n % stride)] *
        points.barycentrics[i * 3 + v],
    0,
  );
};

// Two disjoint triangles of area 0.5: [0, 1]² lower halves at x 0 and x 10
const twoTriangles = () => ({
  positions: Float32Array.of(
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1,
    0,
    10,
    0,
    0,
    11,
    0,
    0,
    10,
    1,
    0,
  ),
  cells: Uint16Array.of(0, 1, 2, 3, 4, 5),
});

const totalArea = ({ positions, cells }) => {
  let area = 0;
  for (let f = 0; f < cells.length / 3; f++) {
    const [a, b, c] = Array.from(cells.slice(f * 3, f * 3 + 3), (i) =>
      positions.subarray(i * 3, i * 3 + 3),
    );
    area +=
      vec3.length(
        vec3.cross(vec3.sub(vec3.copy(b), a), vec3.sub(vec3.copy(c), a)),
      ) / 2;
  }
  return area;
};

const minDistance = (positions) => {
  let min = Infinity;
  const count = positions.length / 3;
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      min = Math.min(min, avec3.distance(positions, i, positions, j));
    }
  }
  return min;
};

// Share of points in horizontal bands: uniform on spheres and capsules
// (Archimedes' hat-box theorem).
const bandShares = (positions, bands, min, max) => {
  const counts = Array.from({ length: bands }, () => 0);
  const count = positions.length / 3;
  for (let i = 0; i < count; i++) {
    const band = Math.floor(
      ((positions[i * 3 + 1] - min) / (max - min)) * bands,
    );
    counts[Math.min(bands - 1, band)]++;
  }
  return counts.map((c) => c / count);
};

const assertOnSurface = (geometry, points) => {
  const { positions, cells } = geometry;
  const count = points.positions.length / 3;
  const weightSums = Array.from(
    { length: count },
    (_, i) =>
      points.barycentrics[i * 3] +
      points.barycentrics[i * 3 + 1] +
      points.barycentrics[i * 3 + 2],
  );
  assert.strictEqual(points.faceIndices.length, count);
  assert.strictEqual(points.barycentrics.length, count * 3);
  assert.ok(points.faceIndices.every((f) => f < cells.length / 3));
  assert.ok(points.barycentrics.every((w) => w >= 0 && w <= 1));
  assert.ok(maxError(weightSums, () => 1) < 1e-5);
  assert.ok(
    maxError(points.positions, interpolated(positions, 3, cells, points)) <
      1e-4,
  );
};

describe("count mode", () => {
  test("should distribute count points on the surface", () => {
    const geometry = torus();
    const points = distribute(geometry, { count: 500 });
    assert.strictEqual(points.positions.length, 1500);
    assert.ok(points.positions instanceof Float32Array);
    assertOnSurface(geometry, points);
  });

  test("should default to 1000 points", () => {
    assert.strictEqual(distribute(cube()).positions.length, 3000);
  });

  test("should be uniform by area", () => {
    // Pole faces are tiny: any area quantization biases them
    const errors = [
      sphere({ nx: 32, ny: 16 }),
      capsule(),
      sphere({ nx: 128, ny: 64 }),
    ].map((geometry) => {
      const points = distribute(geometry, { count: 100_000 });
      const ys = geometry.positions.filter((_, i) => i % 3 === 1);
      const shares = bandShares(
        points.positions,
        10,
        Math.min(...ys),
        Math.max(...ys),
      );
      return maxError(shares, () => 0.1);
    });
    assert.ok(Math.max(...errors) < 0.006, `band share errors ${errors}`);
  });

  test("should split points by face area", () => {
    // Face 1 has three times the area of face 0
    const geometry = {
      positions: Float32Array.of(
        ...[0, 0, 0, 1, 0, 0, 0, 1, 0, 5, 0, 0, 8, 0, 0, 5, 1, 0],
      ),
      cells: [0, 1, 2, 3, 4, 5],
    };
    const points = distribute(geometry, { count: 40_000 });
    const ratio =
      points.faceIndices.filter((f) => f === 1).length /
      points.faceIndices.filter((f) => f === 0).length;
    assert.ok(Math.abs(ratio - 3) < 0.15, `ratio ${ratio}`);
  });

  test("should never pick zero-area faces", () => {
    const geometry = {
      positions: Float32Array.of(0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0),
      cells: Uint16Array.of(0, 1, 3, 0, 1, 2, 1, 1, 3),
    };
    const points = distribute(geometry, { count: 5000 });
    assert.ok(points.faceIndices.every((f) => f === 1));
  });

  test("should be deterministic per seed", () => {
    const geometry = sphere();
    assert.deepStrictEqual(
      distribute(geometry, { seed: 3 }),
      distribute(geometry, { seed: 3 }),
    );
    assert.deepStrictEqual(
      distribute(geometry, { seed: "node-12" }),
      distribute(geometry, { seed: "node-12" }),
    );
    assert.notDeepStrictEqual(
      distribute(geometry, { seed: 3 }).positions,
      distribute(geometry, { seed: 4 }).positions,
    );
    assert.notDeepStrictEqual(
      distribute(geometry, { seed: "node-12" }).positions,
      distribute(geometry, { seed: "node-13" }).positions,
    );
  });

  test("should keep existing points when count grows", () => {
    const geometry = torus();
    const small = distribute(geometry, { count: 100 });
    const large = distribute(geometry, { count: 300 });
    assert.deepStrictEqual(small.positions, large.positions.subarray(0, 300));
  });

  test("should handle invalid counts", () => {
    const geometry = cube();
    assert.strictEqual(distribute(geometry, { count: 0 }).positions.length, 0);
    assert.strictEqual(distribute(geometry, { count: -5 }).positions.length, 0);
    assert.strictEqual(
      distribute(geometry, { count: 9.9 }).positions.length,
      27,
    );
  });

  test("should weight faces by mean vertex weights", () => {
    const geometry = twoTriangles();
    const points = distribute(geometry, {
      count: 40_000,
      weights: [1, 1, 1, 3, 3, 3],
    });
    const ratio =
      points.faceIndices.filter((f) => f === 1).length /
      points.faceIndices.filter((f) => f === 0).length;
    assert.ok(Math.abs(ratio - 3) < 0.15, `ratio ${ratio}`);

    const masked = distribute(geometry, {
      count: 1000,
      weights: Float32Array.of(0, 0, 0, 1, 1, 1),
    });
    assert.ok(masked.faceIndices.every((f) => f === 1));

    const negative = distribute(geometry, {
      count: 1000,
      weights: [-1, -1, -1, 1, 1, 1],
    });
    assert.ok(negative.faceIndices.every((f) => f === 1));
  });
});

describe("density mode", () => {
  test("should match density times area", () => {
    const geometry = sphere();
    const area = totalArea(geometry);
    const density = 2000;
    const points = distribute(geometry, { density });
    const expected = density * area;
    const count = points.positions.length / 3;
    // Random rounding per face: variance below the expected count
    assert.ok(
      Math.abs(count - expected) < 4 * Math.sqrt(expected),
      `${count} for ${expected}`,
    );
    assertOnSurface(geometry, points);
  });

  test("should ignore count", () => {
    const geometry = cube();
    assert.deepStrictEqual(
      distribute(geometry, { density: 10, count: 5 }),
      distribute(geometry, { density: 10 }),
    );
  });

  test("should keep points on their face when the mesh moves", () => {
    const geometry = torus();
    const moved = {
      ...geometry,
      positions: geometry.positions.map((value, i) =>
        i % 3 === 0
          ? -geometry.positions[i + 1]
          : i % 3 === 1
            ? geometry.positions[i - 1] + 2
            : value,
      ),
    };
    const points = distribute(geometry, { density: 500 });
    const movedPoints = distribute(moved, { density: 500 });
    assert.deepStrictEqual(points.faceIndices, movedPoints.faceIndices);
    assert.deepStrictEqual(points.barycentrics, movedPoints.barycentrics);
  });

  test("should keep existing points per face when density grows", () => {
    const geometry = sphere();
    const low = distribute(geometry, { density: 300 });
    const high = distribute(geometry, { density: 900 });
    const byFace = (points) => {
      const faces = new Map();
      points.faceIndices.forEach((f, i) => {
        if (!faces.has(f)) faces.set(f, []);
        faces.get(f).push(...points.barycentrics.subarray(i * 3, i * 3 + 3));
      });
      return faces;
    };
    const highFaces = byFace(high);
    const changedFaces = [...byFace(low)].filter(
      ([f, values]) =>
        !isDeepStrictEqual(highFaces.get(f).slice(0, values.length), values),
    );
    assert.deepStrictEqual(changedFaces, []);
  });

  test("should multiply density by weights", () => {
    const geometry = twoTriangles();
    const points = distribute(geometry, {
      density: 20_000,
      weights: [1, 1, 1, 2, 2, 2],
    });
    const first = points.faceIndices.filter((f) => f === 0).length;
    const second = points.faceIndices.filter((f) => f === 1).length;
    assert.ok(Math.abs(first - 10_000) <= 1);
    assert.ok(Math.abs(second - 20_000) <= 1);
  });

  test("should cap the number of points to maxCount", () => {
    const geometry = sphere();
    const points = distribute(geometry, { density: 1e6, maxCount: 2000 });
    const count = points.positions.length / 3;
    assert.ok(count <= 2000, `count ${count}`);
    assert.ok(count > 1800, `count ${count}`);
    assertOnSurface(geometry, points);

    // Lowered density stays uniform
    const shares = bandShares(points.positions, 4, -0.5, 0.5);
    assert.ok(maxError(shares, () => 0.25) < 0.04);

    assert.strictEqual(
      distribute(geometry, { density: 100, maxCount: 0 }).positions.length,
      0,
    );
  });

  test("should return nothing for zero densities", () => {
    assert.strictEqual(distribute(cube(), { density: 0 }).positions.length, 0);
    assert.strictEqual(distribute(cube(), { density: -1 }).positions.length, 0);
  });
});

describe("poisson method", () => {
  test("should keep count points well spaced", () => {
    const geometry = sphere({ nx: 64, ny: 32 });
    const count = 800;
    const random = distribute(geometry, { count });
    const poisson = distribute(geometry, { count, method: "poisson" });
    assert.strictEqual(poisson.positions.length, count * 3);
    assertOnSurface(geometry, poisson);
    assert.ok(
      minDistance(poisson.positions) > 10 * minDistance(random.positions),
    );

    // Relative to the hexagonal packing radius of the sphere area
    const radius = Math.sqrt(totalArea(geometry) / (2 * Math.sqrt(3) * count));
    const relative = minDistance(poisson.positions) / (2 * radius);
    assert.ok(relative > 0.5, `relative radius ${relative}`);
  });

  test("should support oversampling", () => {
    const geometry = cube();
    const points = distribute(geometry, {
      count: 100,
      method: "poisson",
      oversampling: 1,
    });
    assert.deepStrictEqual(points, distribute(geometry, { count: 100 }));
  });

  test("should follow weights in count mode", () => {
    const geometry = twoTriangles();
    const points = distribute(geometry, {
      count: 1000,
      method: "poisson",
      weights: [1, 1, 1, 3, 3, 3],
    });
    assert.strictEqual(points.positions.length, 3000);
    const ratio =
      points.faceIndices.filter((f) => f === 1).length /
      points.faceIndices.filter((f) => f === 0).length;
    assert.ok(ratio > 2.4, `ratio ${ratio}`);
    assert.ok(ratio < 3.6, `ratio ${ratio}`);
  });

  test("should keep points distanceMin apart in density mode", () => {
    const geometry = sphere();
    const distanceMin = 0.05;
    const points = distribute(geometry, {
      density: 3000,
      method: "poisson",
      distanceMin,
    });
    assertOnSurface(geometry, points);
    assert.ok(minDistance(points.positions) >= distanceMin);
    assert.ok(points.faceIndices.every((f, i, a) => i === 0 || a[i - 1] <= f));

    // Random sequential packing jams at ~60% of the hexagonal packing count,
    // area / (sqrt(3) / 2 * distanceMin²)
    const packing =
      totalArea(geometry) / ((Math.sqrt(3) / 2) * distanceMin ** 2);
    const count = points.positions.length / 3;
    assert.ok(count > packing * 0.4, `count ${count}`);
    assert.ok(count < packing * 0.65, `count ${count}`);
  });

  test("should scale distanceMin with weights in density mode", () => {
    const geometry = twoTriangles();
    const distanceMin = 0.04;
    const points = distribute(geometry, {
      density: 5000,
      method: "poisson",
      distanceMin,
      weights: [4, 4, 4, 1, 1, 1],
    });
    const face = (f) =>
      points.positions.filter(
        (_, i) => points.faceIndices[Math.floor(i / 3)] === f,
      );
    assert.ok(minDistance(face(0)) >= distanceMin / 2);
    assert.ok(minDistance(face(1)) >= distanceMin);
    const ratio = face(0).length / face(1).length;
    assert.ok(ratio > 2.5, `ratio ${ratio}`);
    assert.ok(ratio < 5, `ratio ${ratio}`);
  });

  test("should keep distant points when the mesh deforms in density mode", () => {
    const geometry = twoTriangles();
    const options = { density: 20_000, method: "poisson", distanceMin: 0.02 };
    const points = distribute(geometry, options);
    // Doubling the second triangle changes the total number of candidates
    const deformed = distribute(
      {
        ...geometry,
        positions: geometry.positions.map((value, i) =>
          i >= 9 ? value * 2 : value,
        ),
      },
      options,
    );
    const firstFace = (p) => {
      const count = p.faceIndices.filter((f) => f === 0).length;
      return [
        p.faceIndices.subarray(0, count),
        p.barycentrics.subarray(0, count * 3),
      ];
    };
    assert.ok(deformed.faceIndices.length > points.faceIndices.length);
    assert.deepStrictEqual(firstFace(points), firstFace(deformed));
  });

  test("should equal random density without distanceMin", () => {
    const geometry = cube();
    assert.deepStrictEqual(
      distribute(geometry, { density: 50, method: "poisson" }),
      distribute(geometry, { density: 50 }),
    );
  });
});

describe("attributes", () => {
  test("should interpolate all per-vertex attributes", () => {
    const geometry = sphere();
    const points = distribute(geometry, { count: 200 });
    assert.deepStrictEqual(Object.keys(points).sort(byName), [
      "barycentrics",
      "faceIndices",
      "normals",
      "positions",
      "uvs",
    ]);
    assert.strictEqual(points.uvs.length, 400);
    assert.ok(
      maxError(
        points.uvs,
        interpolated(geometry.uvs, 2, geometry.cells, points),
      ) < 1e-5,
    );
    const normalLengths = Array.from({ length: 200 }, (_, i) =>
      avec3.length(points.normals, i),
    );
    assert.ok(maxError(normalLengths, () => 1) < 1e-5);
  });

  test("should only interpolate listed attributes", () => {
    const geometry = sphere();
    const points = distribute(geometry, { count: 10, attributes: ["uvs"] });
    assert.ok(points.uvs);
    assert.strictEqual(points.normals, undefined);
    assert.deepStrictEqual(
      Object.keys(distribute(geometry, { count: 10, attributes: [] })).sort(
        byName,
      ),
      ["barycentrics", "faceIndices", "positions"],
    );
  });

  test("should skip non per-vertex properties", () => {
    const geometry = {
      ...twoTriangles(),
      name: "triangles",
      instanceCount: 6,
      nested: [[0, 0, 0]],
      empty: new Float32Array(0),
      odd: new Float32Array(7),
      view: new DataView(new ArrayBuffer(6)),
    };
    assert.deepStrictEqual(
      Object.keys(distribute(geometry, { count: 10 })).sort(byName),
      ["barycentrics", "faceIndices", "positions"],
    );
  });

  test("should blend attributes into Float32Array", () => {
    const geometry = {
      ...twoTriangles(),
      vertexColors: Array.from({ length: 24 }, (_, i) => i % 4),
    };
    const points = distribute(geometry, { count: 10 });
    assert.ok(points.vertexColors instanceof Float32Array);
    assert.ok(
      maxError(
        points.vertexColors,
        interpolated(geometry.vertexColors, 4, geometry.cells, points),
      ) < 1e-5,
    );
  });

  test("should skip non Float32Array typed arrays", () => {
    const geometry = { ...twoTriangles(), joints: new Uint16Array(6) };
    assert.strictEqual(distribute(geometry, { count: 10 }).joints, undefined);
  });

  test("should normalize listed attributes only", () => {
    const geometry = {
      ...twoTriangles(),
      normals: new Float32Array(18).fill(2),
      tangents: new Float32Array(24).fill(2),
    };
    const points = distribute(geometry, {
      count: 10,
      normalize: ["normals"],
    });
    assert.ok(close(avec3.length(points.normals, 0), 1));
    assert.ok(points.tangents.every((value) => close(value, 2)));

    const all = distribute(geometry, { count: 10, normalize: true });
    assert.ok(close(vec3.length(all.tangents), 1));
    assert.ok(close(all.tangents[3], 2));

    const none = distribute(geometry, { count: 10, normalize: false });
    assert.ok(none.normals.every((value) => close(value, 2)));
  });
});

describe("edge cases", () => {
  test("should return no points without faces with area or weight", () => {
    const empty = { positions: new Float32Array(0), cells: new Uint16Array(0) };
    assert.strictEqual(distribute(empty).positions.length, 0);

    const degenerate = {
      positions: new Float32Array(9),
      cells: Uint16Array.of(0, 1, 2),
      normals: new Float32Array(9),
    };
    const points = distribute(degenerate, { method: "poisson" });
    assert.strictEqual(points.positions.length, 0);
    assert.strictEqual(points.normals.length, 0);

    assert.strictEqual(
      distribute(twoTriangles(), { weights: new Float32Array(6) }).positions
        .length,
      0,
    );
  });

  test("should distribute on large meshes", () => {
    const geometry = sphere({ nx: 600, ny: 300 });
    let start = performance.now();
    distribute(geometry, { count: 100_000 });
    assert.ok(performance.now() - start < 1000);

    start = performance.now();
    distribute(geometry, { count: 20_000, method: "poisson" });
    assert.ok(performance.now() - start < 5000);

    start = performance.now();
    distribute(geometry, { density: 10_000 });
    assert.ok(performance.now() - start < 1000);
  });
});
