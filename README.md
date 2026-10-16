# geom-distribute

[![npm version](https://img.shields.io/npm/v/geom-distribute)](https://www.npmjs.com/package/geom-distribute)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/geom-distribute)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/geom-distribute)](https://bundlephobia.com/package/geom-distribute)
[![dependencies](https://img.shields.io/librariesio/release/npm/geom-distribute)](https://github.com/dmnsgn/geom-distribute/blob/main/package.json)
[![types](https://img.shields.io/npm/types/geom-distribute)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/geom-distribute)](https://github.com/dmnsgn/geom-distribute/blob/main/LICENSE.md)

Distribute points on the faces of a triangle mesh: by count or density, random or Poisson disk, weighted by a per-vertex density, with stable per-face seeds and interpolated vertex attributes.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)
[![bluesky](https://img.shields.io/badge/-blue?logo=bluesky&label=Follow%20%40dmnsgn.me&style=social)](https://bsky.app/profile/dmnsgn.me)

[![geom-distribute screenshot](https://raw.githubusercontent.com/dmnsgn/geom-distribute/main/screenshot.png)](https://dmnsgn.github.io/geom-distribute/)

## Installation

```bash
npm install geom-distribute
```

## Usage

See the [example](https://dmnsgn.github.io/geom-distribute/) and its [source](examples/index.js).

```js
import { distribute } from "geom-distribute";
import { sphere } from "primitive-geometry";

const geometry = sphere();

// 1000 points uniformly distributed by area
const points = distribute(geometry, { count: 1000, seed: 1 });
// => { positions, normals, uvs, faceIndices, barycentrics }

// 500 points per unit area, following the faces when the mesh deforms
const dense = distribute(geometry, { density: 500, maxCount: 10000 });

// Poisson disk: exactly 1000 well spaced points
const even = distribute(geometry, { count: 1000, method: "poisson" });

// Poisson disk: points at least 0.05 apart
const spaced = distribute(geometry, {
  density: 2000,
  method: "poisson",
  distanceMin: 0.05,
});

// Per-vertex density: more points towards the top
const weights = geometry.positions
  .filter((_, i) => i % 3 === 1)
  .map((y) => y + 0.5);
const weighted = distribute(geometry, { count: 1000, weights });

// Only positions and normals
const light = distribute(geometry, { attributes: ["normals"] });
```

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_geomDistribute">geomDistribute</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SimplicialComplex">SimplicialComplex</a> : <code>object</code></dt>
<dd><p>Triangle cells over shared positions. Any
  other Float32Array or number[] property whose length is a multiple of the
  vertex count is a per-vertex attribute (normals, uvs, vertexColors...), its
  stride being that multiple.</p>
</dd>
<dt><a href="#PointGeometry">PointGeometry</a> : <code>object</code></dt>
<dd><p>Distributed points and their per-vertex
  attributes interpolated from the source geometry.</p>
</dd>
<dt><a href="#DistributeOptions">DistributeOptions</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="module_geomDistribute"></a>

## geomDistribute

<a name="module_geomDistribute.distribute"></a>

### geomDistribute.distribute(geometry, [options]) ⇒ [<code>PointGeometry</code>](#PointGeometry)

Distribute points on the faces of a triangle mesh, uniformly by area or
weighted by a per-vertex density.

**Kind**: static method of [<code>geomDistribute</code>](#module_geomDistribute)

| Param     | Type                                                 | Default         |
| --------- | ---------------------------------------------------- | --------------- |
| geometry  | [<code>SimplicialComplex</code>](#SimplicialComplex) |                 |
| [options] | [<code>DistributeOptions</code>](#DistributeOptions) | <code>{}</code> |

<a name="SimplicialComplex"></a>

## SimplicialComplex : <code>object</code>

Triangle cells over shared positions. Any
other Float32Array or number[] property whose length is a multiple of the
vertex count is a per-vertex attribute (normals, uvs, vertexColors...), its
stride being that multiple.

**Kind**: global typedef
**Properties**

| Name      | Type                                                  | Description                   |
| --------- | ----------------------------------------------------- | ----------------------------- |
| positions | <code>Float32Array</code>                             |                               |
| cells     | <code>module:primitive-geometry~TypedArrayLike</code> | Flat triangle vertex indices. |

<a name="PointGeometry"></a>

## PointGeometry : <code>object</code>

Distributed points and their per-vertex
attributes interpolated from the source geometry.

**Kind**: global typedef
**Properties**

| Name         | Type                      | Description                                     |
| ------------ | ------------------------- | ----------------------------------------------- |
| positions    | <code>Float32Array</code> |                                                 |
| faceIndices  | <code>Uint32Array</code>  | Source face of each point.                      |
| barycentrics | <code>Float32Array</code> | Weights of the source face vertices (stride 3). |

<a name="DistributeOptions"></a>

## DistributeOptions : <code>object</code>

**Kind**: global typedef
**Properties**

| Name           | Type                                                                | Default                         | Description                                                                                                                                        |
| -------------- | ------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [count]        | <code>module:primitive-geometry~NonNegativeInteger</code>           | <code>1000</code>               | Number of points.                                                                                                                                  |
| [density]      | <code>number</code>                                                 |                                 | Points per unit area, finite and >= 0. Overrides `count`. Points stay on their face when the mesh deforms.                                         |
| [maxCount]     | <code>number</code>                                                 | <code>Infinity</code>           | Upper bound on the number of points in density mode, lowering the density when reached.                                                            |
| [method]       | <code>&quot;random&quot;</code> \| <code>&quot;poisson&quot;</code> | <code>&quot;random&quot;</code> | Poisson disk distributions space points evenly: exactly `count` points, or points at least `distanceMin` apart in density mode.                    |
| [oversampling] | <code>module:primitive-geometry~PositiveInteger</code>              | <code>5</code>                  | Candidates per point in Poisson count mode: more is evener but slower.                                                                             |
| [distanceMin]  | <code>number</code>                                                 | <code>0</code>                  | Minimum distance between points in Poisson density mode, where weights are 1.                                                                      |
| [weights]      | <code>Float32Array</code> \| <code>Array.&lt;number&gt;</code>      |                                 | Per-vertex density factors, one per vertex: relative in count mode, multiplying `density` otherwise. Poisson spacing scales with 1 / sqrt(weight). |
| [seed]         | <code>number</code> \| <code>string</code>                          | <code>0</code>                  |                                                                                                                                                    |
| [attributes]   | <code>Array.&lt;string&gt;</code>                                   |                                 | Per-vertex attributes to interpolate. Defaults to all of them.                                                                                     |
| [normalize]    | <code>boolean</code> \| <code>Array.&lt;string&gt;</code>           | <code>true</code>               | Attributes renormalized after interpolation, `true` for normals, tangents and binormals. Only their first three components are normalized.         |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/geom-distribute/blob/main/LICENSE.md).
