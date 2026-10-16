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

Auto-generated API content.

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/geom-distribute/blob/main/LICENSE.md).
