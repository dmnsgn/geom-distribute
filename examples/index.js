import { distribute } from "../index.js";

import * as gpu from "pex-gpu";
import { quat } from "pex-math";
import {
  components,
  entity as createEntity,
  renderEngine as createRenderEngine,
  world as createWorld,
} from "pex-renderer";
import {
  capsule,
  cone,
  cube,
  icosphere,
  roundedCube,
  sphere,
  torus,
} from "primitive-geometry";
import { Pane } from "tweakpane";

const CONFIG = {
  shape: "roundedCube",
  mode: "count",
  method: "poisson",
  count: 2000,
  oversampling: 5,
  density: 4000,
  maxCount: 50_000,
  distanceMin: 0.02,
  weights: "height",
  seed: 0,
};

const shapes = {
  sphere: () => sphere({ nx: 32, ny: 16 }),
  capsule: () => capsule(),
  torus: () => torus(),
  roundedCube: () => roundedCube(),
  icosphere: () => icosphere(),
  cube: () => cube(),
  cone: () => cone(),
};

const weightFunctions = {
  none: null,
  height: (x, y) => 0.5 - y,
  stripes: (x) => 0.5 + 0.5 * Math.sin(x * 25),
  hemisphere: (x) => (x > 0 ? 1 : 0.1),
};

const ctx = await gpu.createContext({ pixelRatio: devicePixelRatio });
document.querySelector("main").append(ctx.canvas);
const renderEngine = createRenderEngine({ ctx });
const world = createWorld();

const aspect = () => window.innerWidth / window.innerHeight;
const cameraEntity = world.add(
  createEntity({
    transform: components.transform({ position: [1.5, 1, 1.5] }),
    camera: components.camera({
      aspect: aspect(),
      backgroundColor: [0.02, 0.02, 0.02, 1],
    }),
    postProcessing: components.postProcessing({
      smaa: components.postProcessing.smaa(),
    }),
    orbiter: components.orbiter({ element: ctx.canvas }),
  }),
);
world.add(
  createEntity({
    transform: components.transform({
      rotation: quat.fromDirection(quat.create(), [-1, -2, -1]),
    }),
    directionalLight: components.directionalLight({ castShadows: false }),
  }),
);
world.add(
  createEntity({
    transform: components.transform(),
    axesHelper: components.axesHelper(),
  }),
);

const meshEntity = world.add(
  createEntity({
    transform: components.transform(),
    material: components.material({
      baseColor: [0.8, 0.8, 0.8, 1],
    }),
  }),
);
const pointsEntity = world.add(
  createEntity({
    transform: components.transform(),
    material: components.material({
      unlit: true,
      baseColor: [0.58, 0.09, 0.11, 1],
    }),
  }),
);

const stats = document.createElement("p");
document.querySelector("main").append(stats);

const update = () => {
  const geometry = shapes[CONFIG.shape]();
  const weightFunction = weightFunctions[CONFIG.weights];
  const weights =
    weightFunction &&
    Float32Array.from({ length: geometry.positions.length / 3 }, (_, i) =>
      weightFunction(...geometry.positions.subarray(i * 3, i * 3 + 3)),
    );

  const start = performance.now();
  const points = distribute(geometry, {
    ...(CONFIG.mode === "count"
      ? { count: CONFIG.count }
      : { density: CONFIG.density, maxCount: CONFIG.maxCount }),
    method: CONFIG.method,
    oversampling: CONFIG.oversampling,
    distanceMin: CONFIG.distanceMin,
    weights,
    seed: CONFIG.seed,
    attributes: [],
  });

  const time = performance.now() - start;
  const count = points.positions.length / 3;

  meshEntity.geometry = components.geometry(geometry);
  // Instances need a non-empty offsets buffer even when there are no points.
  pointsEntity.geometry = components.geometry({
    ...icosphere({
      radius: Math.min(0.015, 0.4 / Math.sqrt(count)),
      subdivisions: 1,
    }),
    offsets: count ? points.positions : new Float32Array(3),
    instanceCount: count,
  });
  stats.textContent = `${count} points in ${time.toFixed(1)}ms`;
};

window.addEventListener("resize", () => {
  gpu.resize(ctx, window.innerWidth, window.innerHeight, devicePixelRatio);
  cameraEntity.camera.aspect = aspect();
  cameraEntity.camera.dirty = true;
});

update();

gpu.frame(ctx, async () => {
  renderEngine.update(world.entities);
  await renderEngine.render(world.entities, cameraEntity);
});

const pane = new Pane();
const options = (values) =>
  Object.fromEntries(values.map((value) => [value, value]));
const bindings = {};
const bind = (key, params) => {
  bindings[key] = pane.addBinding(CONFIG, key, params).on("change", () => {
    update();
    refreshVisibility();
  });
};

bind("shape", { options: options(Object.keys(shapes)) });
bind("mode", { options: options(["count", "density"]) });
bind("method", { options: options(["random", "poisson"]) });
bind("count", { min: 1, max: 20_000, step: 1 });
bind("oversampling", { min: 1, max: 10, step: 1 });
bind("density", { min: 10, max: 50_000, step: 10 });
bind("maxCount", { min: 1, max: 100_000, step: 1 });
bind("distanceMin", { min: 0, max: 0.2 });
bind("weights", { options: options(Object.keys(weightFunctions)) });
bind("seed", { min: 0, max: 100, step: 1 });

const refreshVisibility = () => {
  const count = CONFIG.mode === "count";
  const poisson = CONFIG.method === "poisson";
  bindings.count.hidden = !count;
  bindings.oversampling.hidden = !count || !poisson;
  bindings.density.hidden = count;
  bindings.maxCount.hidden = count;
  bindings.distanceMin.hidden = count || !poisson;
};
refreshVisibility();

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (!newModule) return;
    ctx.canvas.remove();
    stats.remove();
    pane.dispose();
  });
}
