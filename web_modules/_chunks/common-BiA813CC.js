import { r as __exportAll } from "./rolldown-runtime-ppdSCyCg.js";
import { D as length, E as dot, J as perspectiveZO, K as mult, N as set$1, R as create$4, W as lookAt, X as set$2, _ as create$2, at as create$5, d as set$3, f as set4, h as set3, lt as transpose, r as create$3, st as fromMat4, u as scale, ut as create$6, w as create$1, x as add } from "./pex-math-C8hwTnFH.js";

/** @module aabb */
/**
* Creates a new bounding box.
*
* @returns {import("./types.js").AABB}
*/
function create() {
	return [[
		Infinity,
		Infinity,
		Infinity
	], [
		-Infinity,
		-Infinity,
		-Infinity
	]];
}
/**
* Reset a bounding box.
*
* @param {import("./types.js").AABB} a
* @returns {import("./types.js").Rect}
*/
function empty(a) {
	a[0][0] = Infinity;
	a[0][1] = Infinity;
	a[0][2] = Infinity;
	a[1][0] = -Infinity;
	a[1][1] = -Infinity;
	a[1][2] = -Infinity;
	return a;
}
/**
* Sets a bounding box to another.
*
* @param {import("./types.js").AABB} a
* @param {import("./types.js").AABB} b
* @returns {import("./types.js").AABB}
*/
function set(a, b) {
	a[0][0] = b[0][0];
	a[0][1] = b[0][1];
	a[0][2] = b[0][2];
	a[1][0] = b[1][0];
	a[1][1] = b[1][1];
	a[1][2] = b[1][2];
	return a;
}
/**
* Checks if a bounding box is empty.
*
* @param {import("./types.js").AABB} a
* @returns {boolean}
*/
function isEmpty(a) {
	return a[0][0] > a[1][0] || a[0][1] > a[1][1] || a[0][2] > a[1][2];
}
/**
* Updates a bounding box from a list of points.
*
* @param {import("./types.js").AABB} a
* @param {import("pex-math").Vec3[] | import("pex-math").TypedArray} points
* @returns {import("./types.js").AABB}
*/
function fromPoints(a, points) {
	empty(a);
	const isFlatArray = !points[0]?.length;
	const l = points.length / (isFlatArray ? 3 : 1);
	for (let i = 0; i < l; i++) if (isFlatArray) includePoint(a, points, i * 3);
	else includePoint(a, points[i]);
	return a;
}
/**
* Returns a list of 8 points from a bounding box.
*
* @param {import("./types.js").AABB} a
* @param {import("pex-math").Vec3[]} [points]
* @returns {import("pex-math").Vec3[]}
*/
function getCorners(a, points = Array.from({ length: 8 }, () => [])) {
	set3(points[0], 0, a[0][0], a[0][1], a[0][2]);
	set3(points[1], 0, a[1][0], a[0][1], a[0][2]);
	set3(points[2], 0, a[1][0], a[0][1], a[1][2]);
	set3(points[3], 0, a[0][0], a[0][1], a[1][2]);
	set3(points[4], 0, a[0][0], a[1][1], a[0][2]);
	set3(points[5], 0, a[1][0], a[1][1], a[0][2]);
	set3(points[6], 0, a[1][0], a[1][1], a[1][2]);
	set3(points[7], 0, a[0][0], a[1][1], a[1][2]);
	return points;
}
/**
* Returns the size of a bounding box.
*
* @param {import("./types.js").AABB} a
* @param {import("pex-math").Vec3} out
* @returns {import("pex-math").Vec3}
*/
function size(a, out = [
	0,
	0,
	0
]) {
	out[0] = Math.abs(a[1][0] - a[0][0]);
	out[1] = Math.abs(a[1][1] - a[0][1]);
	out[2] = Math.abs(a[1][2] - a[0][2]);
	return out;
}
/**
* Includes a bounding box in another.
*
* @param {import("./types.js").AABB} a
* @param {import("./types.js").AABB} b
* @returns {import("./types.js").AABB}
*/
function includeAABB(a, b) {
	if (isEmpty(a)) set(a, b);
	else if (isEmpty(b)) {} else {
		a[0][0] = Math.min(a[0][0], b[0][0]);
		a[0][1] = Math.min(a[0][1], b[0][1]);
		a[0][2] = Math.min(a[0][2], b[0][2]);
		a[1][0] = Math.max(a[1][0], b[1][0]);
		a[1][1] = Math.max(a[1][1], b[1][1]);
		a[1][2] = Math.max(a[1][2], b[1][2]);
	}
	return a;
}
/**
* Includes a point in a bounding box.
*
* @param {import("./types.js").AABB} a
* @param {import("pex-math").Vec3} p
* @param {number} [i=0] Offset in the point array
* @returns {import("pex-math").Vec3}
*/
function includePoint(a, p, i = 0) {
	a[0][0] = Math.min(a[0][0], p[i + 0]);
	a[0][1] = Math.min(a[0][1], p[i + 1]);
	a[0][2] = Math.min(a[0][2], p[i + 2]);
	a[1][0] = Math.max(a[1][0], p[i + 0]);
	a[1][1] = Math.max(a[1][1], p[i + 1]);
	a[1][2] = Math.max(a[1][2], p[i + 2]);
	return a;
}

var utils_exports = /* @__PURE__ */ __exportAll({
	CUBEMAP_PROJECTION_MATRIX: () => CUBEMAP_PROJECTION_MATRIX,
	CUBEMAP_SIDES: () => CUBEMAP_SIDES,
	NAMESPACE: () => NAMESPACE,
	TEMP_AABB: () => TEMP_AABB,
	TEMP_BOUNDS_POINTS: () => TEMP_BOUNDS_POINTS,
	TEMP_FRUSTUM: () => TEMP_FRUSTUM,
	TEMP_MAT2X3: () => TEMP_MAT2X3,
	TEMP_MAT3: () => TEMP_MAT3,
	TEMP_MAT4: () => TEMP_MAT4,
	TEMP_QUAT: () => TEMP_QUAT,
	TEMP_VEC3: () => TEMP_VEC3,
	TEMP_VEC4: () => TEMP_VEC4,
	Y_UP: () => Y_UP,
	areaPowerToLuminance: () => areaPowerToLuminance,
	compareStrings: () => compareStrings,
	computeFrustumPlanes: () => computeFrustumPlanes,
	definesKey: () => definesKey,
	ev100: () => ev100,
	exposureFromEV100: () => exposureFromEV100,
	fullscreenTriangle: () => fullscreenTriangle,
	getCubeFaceCamera: () => getCubeFaceCamera,
	getDefaultViewport: () => getDefaultViewport,
	getDirname: () => getDirname,
	getEnvironmentRotation: () => getEnvironmentRotation,
	getFileExtension: () => getFileExtension,
	getSkyboxEnvMap: () => getSkyboxEnvMap,
	hooksKey: () => hooksKey,
	isAABBInFrustum: () => isAABBInFrustum,
	isObject: () => isObject,
	mapKeys: () => mapKeys,
	mapValues: () => mapValues,
	pointIntensityToPower: () => pointIntensityToPower,
	pointPowerToIntensity: () => pointPowerToIntensity,
	quad: () => quad,
	spotIntensityToPower: () => spotIntensityToPower,
	spotPowerToIntensity: () => spotPowerToIntensity
});
const NAMESPACE = "pex-renderer";
const TEMP_VEC3 = create$1();
const TEMP_VEC4 = create$2();
const TEMP_QUAT = create$3();
const TEMP_MAT4 = create$4();
const TEMP_MAT3 = create$5();
const TEMP_AABB = create();
const TEMP_MAT2X3 = create$6();
const Y_UP = Object.freeze([
	0,
	1,
	0
]);
const TEMP_BOUNDS_POINTS = Array.from({ length: 8 }, () => create$1());
const TEMP_FRUSTUM = /* @__PURE__ */ new Float32Array(24);
const quad = {
	positions: Float32Array.of(-1, -1, 1, -1, 1, 1, -1, 1),
	uvs: Uint16Array.of(0, 0, 1, 0, 1, 1, 0, 1),
	cells: Uint16Array.of(0, 1, 2, 2, 3, 0)
};
const fullscreenTriangle = { positions: Float32Array.of(-1, -1, 3, -1, -1, 3) };
const CUBEMAP_PROJECTION_MATRIX = Object.freeze(perspectiveZO(create$4(), Math.PI / 2, 1, .1, 100));
const CUBEMAP_SIDES = [
	{
		eye: [
			0,
			0,
			0
		],
		target: [
			1,
			0,
			0
		],
		up: [
			0,
			-1,
			0
		],
		color: [
			1,
			0,
			0,
			1
		],
		projectionMatrix: CUBEMAP_PROJECTION_MATRIX
	},
	{
		eye: [
			0,
			0,
			0
		],
		target: [
			-1,
			0,
			0
		],
		up: [
			0,
			-1,
			0
		],
		color: [
			.5,
			0,
			0,
			1
		],
		projectionMatrix: CUBEMAP_PROJECTION_MATRIX
	},
	{
		eye: [
			0,
			0,
			0
		],
		target: [
			0,
			1,
			0
		],
		up: [
			0,
			0,
			1
		],
		color: [
			0,
			1,
			0,
			1
		],
		projectionMatrix: CUBEMAP_PROJECTION_MATRIX
	},
	{
		eye: [
			0,
			0,
			0
		],
		target: [
			0,
			-1,
			0
		],
		up: [
			0,
			0,
			-1
		],
		color: [
			0,
			.5,
			0,
			1
		],
		projectionMatrix: CUBEMAP_PROJECTION_MATRIX
	},
	{
		eye: [
			0,
			0,
			0
		],
		target: [
			0,
			0,
			1
		],
		up: [
			0,
			-1,
			0
		],
		color: [
			0,
			0,
			1,
			1
		],
		projectionMatrix: CUBEMAP_PROJECTION_MATRIX
	},
	{
		eye: [
			0,
			0,
			0
		],
		target: [
			0,
			0,
			-1
		],
		up: [
			0,
			-1,
			0
		],
		color: [
			0,
			0,
			.5,
			1
		],
		projectionMatrix: CUBEMAP_PROJECTION_MATRIX
	}
];
const getCubeFaceCamera = (face, position, near, far, viewMatrix = create$4(), projectionMatrix = create$4()) => {
	const { target, up } = CUBEMAP_SIDES[face];
	lookAt(viewMatrix, position, add(set$1(TEMP_VEC3, target), position), up);
	perspectiveZO(projectionMatrix, Math.PI / 2, 1, near, far);
	projectionMatrix[5] *= -1;
	return {
		viewMatrix,
		projectionMatrix
	};
};
const getDefaultViewport = (ctx) => [
	0,
	0,
	ctx.width,
	ctx.height
];
const getFileExtension = (path) => {
	return (path?.match(/[^\\/]\.([^.\\/]+)$/) || [null]).pop();
};
const getDirname = (path) => {
	let code = path.codePointAt(0);
	const hasRoot = code === 47;
	let end = -1;
	let matchedSlash = true;
	for (let i = path.length - 1; i >= 1; --i) {
		code = path.codePointAt(i);
		if (code === 47) {
			if (!matchedSlash) {
				end = i;
				break;
			}
		} else matchedSlash = false;
	}
	if (end === -1) return hasRoot ? "/" : ".";
	return hasRoot && end === 1 ? "//" : path.slice(0, end);
};
const isObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]";
/** Maps each value of a plain object through `fn`, keeping the same keys. */
const mapValues = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([key, value], i) => [key, fn(value, key, i)]));
/** Maps each key of a plain object through `fn`, keeping the same values. */
const mapKeys = (obj, fn) => Object.fromEntries(Object.entries(obj).map(([key, value], i) => [fn(key, value, i), value]));
const getEnvironmentRotation = (out, modelMatrix) => modelMatrix ? transpose(fromMat4(out, modelMatrix)) : void 0;
const getSkyboxEnvMap = (skybox) => skybox.envMap || skybox._skyTexture;
/**
* Gribb/Hartmann plane extraction from a view-projection, normalized so plane
* distances are metric. Order: -x, +x, +y, -y, far, near.
*/
const computeFrustumPlanes = (out, projectionMatrix, viewMatrix) => {
	set$2(TEMP_MAT4, projectionMatrix);
	mult(TEMP_MAT4, viewMatrix);
	const m = TEMP_MAT4;
	set4(out, 0, m[3] - m[0], m[7] - m[4], m[11] - m[8], m[15] - m[12]);
	set4(out, 1, m[3] + m[0], m[7] + m[4], m[11] + m[8], m[15] + m[12]);
	set4(out, 2, m[3] + m[1], m[7] + m[5], m[11] + m[9], m[15] + m[13]);
	set4(out, 3, m[3] - m[1], m[7] - m[5], m[11] - m[9], m[15] - m[13]);
	set4(out, 4, m[3] - m[2], m[7] - m[6], m[11] - m[10], m[15] - m[14]);
	set4(out, 5, m[2], m[6], m[10], m[14]);
	for (let i = 0; i < 6; i++) {
		TEMP_VEC3[0] = out[i * 4];
		TEMP_VEC3[1] = out[i * 4 + 1];
		TEMP_VEC3[2] = out[i * 4 + 2];
		scale(out, i, 1 / length(TEMP_VEC3));
	}
	return out;
};
/** Conservative AABB test against a frustum: false only if fully outside. */
const isAABBInFrustum = (worldBounds, frustum) => {
	const v = TEMP_VEC4;
	const [min, max] = worldBounds;
	for (let i = 0; i < 6; i++) {
		set$3(TEMP_VEC4, 0, frustum, i);
		TEMP_VEC3[0] = v[0] >= 0 ? max[0] : min[0];
		TEMP_VEC3[1] = v[1] >= 0 ? max[1] : min[1];
		TEMP_VEC3[2] = v[2] >= 0 ? max[2] : min[2];
		if (dot(TEMP_VEC4, TEMP_VEC3) + v[3] < 0) return false;
	}
	return true;
};
const FOUR_PI = 4 * Math.PI;
const TWO_PI = 2 * Math.PI;
/** Luminous power (lm) of an isotropic point source to luminous intensity (cd). */
const pointPowerToIntensity = (luminousPower) => luminousPower / FOUR_PI;
/** Luminous intensity (cd) of an isotropic point source to luminous power (lm). */
const pointIntensityToPower = (luminousIntensity) => luminousIntensity * FOUR_PI;
/**
* Luminous power (lm) of a spot light to its axial luminous intensity (cd).
*
* `focused` couples the beam to the cone: the same power concentrated into a
* narrower cone burns brighter, which is what a real fixture does and what
* `KHR_lights_punctual` describes. Left off, power spreads over a hemisphere (Φ
* = πI) and narrowing the cone only makes the pool smaller.
*
* `angle` is the outer cone half-angle, in radians.
*/
const spotPowerToIntensity = (luminousPower, angle, focused) => luminousPower / (focused ? TWO_PI * (1 - Math.cos(angle)) : Math.PI);
/** Axial luminous intensity (cd) of a spot light to luminous power (lm). */
const spotIntensityToPower = (luminousIntensity, angle, focused) => focused ? luminousIntensity * TWO_PI * (1 - Math.cos(angle)) : luminousIntensity * Math.PI;
/**
* Luminous power (lm) of a Lambertian emitter to its luminance (cd/m²), the
* unit the linearly transformed cosines integrate against.
*
* `width` and `height` are the light's world-space extent — the transform's x
* and y scale — so a disk is the ellipse they bound. A double-sided emitter
* spreads the same power over both faces.
*/
const areaPowerToLuminance = (luminousPower, width, height, disk, doubleSided) => {
	const area = disk ? Math.PI * width * height / 4 : width * height;
	return area > 0 ? luminousPower / (Math.PI * area * (doubleSided ? 2 : 1)) : 0;
};
/**
* Exposure value at ISO 100 for a set of camera settings — the photographic
* scale where each stop doubles the light reaching the sensor.
*
* `shutterSpeed` is in seconds (1/125, not 125).
*/
const ev100 = (fStop, shutterSpeed, iso) => Math.log2(fStop * fStop / shutterSpeed * (100 / iso));
/**
* Scale factor taking scene luminance (cd/m²) to a sensor-referred value.
*
* The 1.2 is the standard reflected-light meter calibration constant, so a
* surface of 18% reflectance under an exposure metered for it lands at middle
* grey rather than at 1.0.
*/
const exposureFromEV100 = (ev100) => 1 / (1.2 * 2 ** ev100);
/**
* Code point order, so a cache key built from sorted strings is the same
* everywhere: the default sort is locale-dependent.
*/
const compareStrings = (a, b) => Number(a > b) - Number(a < b);
/**
* Stable cache key for a set of shader defines — the feature set a shader
* variant was generated from.
*
* Sorted because a Set iterates in insertion order: the same features gathered
* in a different order must land on the same variant, or the cache grows a
* duplicate entry and the shader is compiled twice. "|" separates because it
* cannot appear in a define name.
*/
const definesKey = (defines) => [...defines].toSorted(compareStrings).join("|");
const hashString = (value) => {
	let hash = 2166136261;
	for (let i = 0; i < value.length; i++) {
		hash ^= value.codePointAt(i);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(36);
};
const HOOKS_KEYS = /* @__PURE__ */ new WeakMap();
/**
* A material's hooks as a pipeline cache key: derived from the WGSL they
* generate, so two materials sharing hook source share one compiled pipeline,
* and a changed hook is a new variant rather than a stale one. Memoised per
* hooks object — a draw pays a WeakMap lookup, not a hash of the source.
*
* `hooks.uniforms` is a function and drops out of the serialization, which is
* what makes per-frame values free: only what reaches the shader text keys it.
*/
const hooksKey = (hooks) => {
	if (!hooks) return "";
	let key = HOOKS_KEYS.get(hooks);
	if (key === void 0) HOOKS_KEYS.set(hooks, key = hashString(JSON.stringify(hooks)));
	return key;
};

/**
* Curries a pipeline shader's `options.texCoords` (per-texture-slot texCoord
* set) into a `tc(key)` lookup, defaulting to set 0 when a slot isn't assigned
* — shared so every generator's texCoord-set expressions read the same options
* shape the same way.
*/
function getTexCoordGetter(texCoords) {
	return (key) => texCoords[key] ?? 0;
}
/**
* Turns a whole `DEFINE`-style map (e.g. `shaders/standard.ts`'s
* `MATERIAL_DEFINE`/`VERTEX_DEFINE`) into a flags object of the same shape, one
* `defines.has(...)` check per key — the read-side counterpart to
* `getFeatureFlags`'s write-side walk, replacing one hand-written `const useX =
* defines.has(DEFINE.x)` per define with a single call.
*/
function getDefineFlags(defineMap, defines) {
	return mapValues(defineMap, (value) => defines.has(value));
}
/**
* Curries a bind group's binding counter into a closure (not a class — matches
* the getTexCoordGetter/getDefineFlags factory idiom and keeps the module
* tree-shakeable). Material groups reserve binding 0 for the uMaterial struct,
* so start at 1; the light group has no reserved slot, so start at 0.
*/
function createBindingAllocator(start = 0) {
	let next = start;
	return {
		next: () => next++,
		nextTextureSampler: () => ({
			texture: next++,
			sampler: next++
		})
	};
}
/**
* A single `@group`/`@binding` `var` declaration line — the primitive every
* other binding declaration here is built from. `addressSpace` (e.g.
* `"uniform"`) is omitted for handle types (textures/samplers), which take none
* in WGSL.
*/
function bindingDeclaration(group, binding, name, type, addressSpace = "") {
	return `@group(${group}) @binding(${binding}) var${addressSpace ? `<${addressSpace}>` : ""} ${name}: ${type};`;
}
/**
* Property/feature key → its `u`-prefixed uniform var name:
* `"baseColorTexture"` → `"uBaseColorTexture"`, `"directionalShadowMap0"` →
* `"uDirectionalShadowMap0"`. The `u`+capitalize convention for every uniform
* (textures, light arrays, shadow maps) lives here.
*/
function uniformName(key) {
	return `u${key[0].toUpperCase()}${key.slice(1)}`;
}
/**
* Texture/shadow-map var name → its paired sampler var name:
* `"uBaseColorTexture"` → `"uBaseColorTextureSampler"`.
*/
function samplerName(varName) {
	return `${varName}Sampler`;
}
/**
* Material-feature key → its KHR_texture_transform matrix name:
* `"baseColorTexture"` → `"baseColorTextureMatrix"`.
*/
function textureMatrixName(key) {
	return `${key}Matrix`;
}
/**
* One texture+sampler binding-pair declaration, or "" when the pair is unused.
* Shared by material textures (non-comparison sampler) and shadow maps (depth
* texture + comparison sampler) — they differ only by group, texture kind and
* sampler kind.
*/
function textureSamplerDeclaration(group, binding, varName, kind = "texture_2d<f32>", samplerKind = "sampler") {
	return binding ? `${bindingDeclaration(group, binding.texture, varName, kind)}\n${bindingDeclaration(group, binding.sampler, samplerName(varName), samplerKind)}` : "";
}
/**
* KHR_texture_transform struct field for a texture, or "" when absent. `key` is
* the full material-feature key (e.g. `"baseColorTexture"`), emitting
* `baseColorTextureMatrix: mat3x3f,`.
*/
function textureMatrixField(key, binding) {
	return binding ? `${textureMatrixName(key)}: mat3x3f,` : "";
}
/** The `@group(0)` per-frame uniform block, shared by every pass. */
function frameStruct({ extraFields = "" } = {}) {
	return `struct Frame {
  projectionMatrix: mat4x4f,
  viewMatrix: mat4x4f,
  inverseViewMatrix: mat4x4f,
  cameraPosition: vec3f,
  viewportSize: vec2f,
  // Scene luminance to sensor-referred scale. Applied by every pass that writes
  // scene colour, before the store, so the half-float target holds an exposed
  // image and every threshold downstream is a number about that image.
  exposure: f32,
  // Sub-pixel NDC offset for temporal antialiasing, zero without it. Applied
  // after projection rather than baked into projectionMatrix, so everything
  // reconstructing view position from that matrix — ambient occlusion,
  // transmission, depth of field — keeps reading an unjittered one.
  jitter: vec2f,
  // Last frame's projectionMatrix * viewMatrix, unjittered. Only a pass writing
  // motion vectors reads it; it costs one matrix in a block that already
  // carries three, which is cheaper than a second variant of every shader.
  previousViewProjectionMatrix: mat4x4f,
  ${extraFields}
}
${bindingDeclaration(0, 0, "uFrame", "Frame", "uniform")}`;
}
/**
* The jitter offset, applied to a clip-space position after projection.
*
* Multiplied by `w` because the perspective divide has not happened yet: the
* offset has to survive it as a constant NDC displacement. Emitted at the end
* of every rasterizing vertex stage — and nowhere in a shadow pass, whose
* camera is the light and whose result is sampled, not resolved.
*/
const vertexJitter = (position = "output.position") => `${position} += vec4f(uFrame.jitter * ${position}.w, 0.0, 0.0);`;
/**
* Inter-stage variables a pass writing motion vectors carries.
*
* Both clip positions rather than the screen-space offset itself: the offset is
* not linear under perspective, so interpolating it would bend every motion
* vector towards the triangle's interior. The divide belongs per fragment.
*
* Both are unjittered. The jitter says where geometry was rasterized, not where
* a surface went, and leaving it in would report the sampling pattern as
* motion.
*/
const VELOCITY_MEMBERS = [{
	name: "positionClip",
	type: "vec4f"
}, {
	name: "previousPositionClip",
	type: "vec4f"
}];
/** Vertex-stage half of the motion vector: both clip positions, unjittered. */
const vertexVelocity = ({ clip = "positionOut", previousWorld = "uModel.previousModelMatrix * position" } = {}) => `output.positionClip = ${clip};
  output.previousPositionClip = uFrame.previousViewProjectionMatrix * (${previousWorld});`;
/**
* Where this vertex was last frame, in world space — the other half of what a
* motion vector is made of.
*
* Emitted after `vertexTransform`, which is what makes the two branches differ:
* the plain path finds `position` already carrying this frame's instancing,
* which is last frame's too while instance attributes are static, so the
* previous model matrix is all it needs. The skin path finds `position`
* untouched — `vertexTransform` instances the skinned world position, not the
* local one — so it composes the same chain itself from last frame's joints.
*/
function vertexPreviousWorld({ useSkin = false, instancedScale = false, instancedRotation = false, instancedOffset = false, previousPosition = false, previousInstancedScale = false, previousInstancedRotation = false, previousInstancedOffset = false }) {
	const previousInstancing = {
		instancedScale,
		instancedRotation,
		instancedOffset
	};
	const attribute = {
		scale: previousInstancedScale ? "input.previousScale" : "input.scale",
		rotation: previousInstancedRotation ? "input.previousRotation" : "input.rotation",
		offset: previousInstancedOffset ? "input.previousOffset" : "input.offset"
	};
	const local = previousPosition ? "vec4f(input.previousPosition, 1.0)" : "position";
	if (!useSkin) {
		if (!(previousPosition || previousInstancedScale || previousInstancedRotation || previousInstancedOffset)) return "var previousPositionWorld = uModel.previousModelMatrix * position;";
		return [
			`var previousLocalPosition = ${local};`,
			...instancedOps("previousLocalPosition", previousInstancing, {
				rotationMat: "previousRotationMat",
				attribute
			}),
			"var previousPositionWorld = uModel.previousModelMatrix * previousLocalPosition;"
		].join("\n  ");
	}
	return [
		skinMatrix("previousSkinMat", "uPreviousJointMatrices"),
		`var previousPositionWorld = previousSkinMat * ${local};`,
		...instancedOps("previousPositionWorld", previousInstancing, {
			rotationMat: "previousRotationMat",
			attribute
		})
	].join("\n  ");
}
/**
* Fragment-stage half: where this surface was last frame, minus where it is
* now, in texture coordinates.
*
* `previous - current` so a reader adds it to its own coordinate to find the
* history, and scaled by (0.5, -0.5) because NDC spans [-1, 1] with Y up where
* texture coordinates span [0, 1] with V down.
*/
const FRAGMENT_VELOCITY = `output.velocity =
    (input.previousPositionClip.xy / input.previousPositionClip.w -
      input.positionClip.xy / input.positionClip.w) * vec2f(0.5, -0.5);`;
/**
* The `@group(3)` per-model uniform block plus its optional skin joint-matrix
* (binding 1) and displacement texture (bindings 2/3) decls — the same layout
* in every pass.
*/
function modelStruct({ previousModelMatrix = false, displacementTexture = false, skin = false, previousSkin = false, maxJoints = 256 } = {}) {
	return `struct Model {
  modelMatrix: mat4x4f,
  normalMatrix: mat3x3f,
  ${previousModelMatrix ? "previousModelMatrix: mat4x4f," : ""}
  ${displacementTexture ? "displacement: f32," : ""}
}
${bindingDeclaration(3, 0, "uModel", "Model", "uniform")}
${skin ? bindingDeclaration(3, 1, "uJointMatrices", `array<mat4x4f, ${maxJoints}>`, "uniform") : ""}
${skin && previousSkin ? bindingDeclaration(3, 4, "uPreviousJointMatrices", `array<mat4x4f, ${maxJoints}>`, "uniform") : ""}
${displacementTexture ? textureSamplerDeclaration(3, {
		texture: 2,
		sampler: 3
	}, "uDisplacementTexture") : ""}`;
}
/**
* Emits struct members with sequential `@location` indices, skipping falsy
* entries so optional members gate inline with `cond && { … }`. Locations are
* assigned in list order with no gaps, so members are added or removed without
* hand-numbering. `start` offsets the first index (past a fixed leading
* member). The numbers are only ever matched back by name — vertex inputs via
* reflection (pex-gpu `vertex-layout.ts`), inter-stage variables by the shared
* vertex/fragment struct — so their order and uniqueness matter, not their
* values.
*/
function locationMembers(members, start = 0) {
	return members.filter((member) => Boolean(member)).map(({ name, type }, index) => `@location(${start + index}) ${name}: ${type},`).join("\n  ");
}
const VERTEX_ATTRIBUTES = [
	{
		flag: "normal",
		name: "normal",
		type: "vec3f"
	},
	{
		flag: "tangent",
		name: "tangent",
		type: "vec4f"
	},
	{
		flag: "texCoord0",
		name: "texCoord0",
		type: "vec2f"
	},
	{
		flag: "texCoord1",
		name: "texCoord1",
		type: "vec2f"
	},
	{
		flag: "vertexColor",
		name: "vertexColor",
		type: "vec4f"
	},
	{
		flag: "instancedOffset",
		name: "offset",
		type: "vec3f"
	},
	{
		flag: "instancedScale",
		name: "scale",
		type: "vec3f"
	},
	{
		flag: "instancedRotation",
		name: "rotation",
		type: "vec4f"
	},
	{
		flag: "instancedColor",
		name: "color",
		type: "vec4f"
	},
	{
		flag: "skin",
		name: "joint",
		type: "vec4u"
	},
	{
		flag: "skin",
		name: "weight",
		type: "vec4f"
	},
	{
		flag: "previousPosition",
		name: "previousPosition",
		type: "vec3f"
	},
	{
		flag: "previousInstancedOffset",
		name: "previousOffset",
		type: "vec3f"
	},
	{
		flag: "previousInstancedScale",
		name: "previousScale",
		type: "vec3f"
	},
	{
		flag: "previousInstancedRotation",
		name: "previousRotation",
		type: "vec4f"
	}
];
function vertexInputStruct(flags, extra = []) {
	return `struct VertexInput {
  ${locationMembers([
		{
			name: "position",
			type: "vec3f"
		},
		...VERTEX_ATTRIBUTES.map((attribute) => flags[attribute.flag] && attribute),
		...extra
	])}
}`;
}
/**
* A vertex stage's output struct: the `@builtin(position)` clip position
* followed by sequentially-located user members (falsy entries skipped). Every
* pass shares this `VertexOutput` shape; the `@location`s are private to the
* vertex/fragment pair, so they are assigned in order, not hand-numbered.
*
* `@invariant` is what makes a depth pre-pass safe. Two shaders computing the
* same clip position from the same inputs are only guaranteed the same result
* bit-for-bit if both declare it — a driver is otherwise free to contract
* multiply-adds differently in each, and the depth-only and shading passes
* differ in everything around the transform. Without it the second pass'
* `less-equal` test fails on the fragments that landed a few ULPs further away,
* which reads as hatching and dropouts across every surface.
*/
function vertexOutputStruct(members) {
	return `struct VertexOutput {
  @invariant @builtin(position) position: vec4f,
  ${locationMembers(members)}
}`;
}
/** A hook's `attributes`/`interStage`/`bindings` record as struct members. */
const hookMembers = (types = {}) => Object.entries(types).map(([name, type]) => ({
	name,
	type
}));
/** Whether a hook binding is a texture handle rather than a `uHooks` field. */
const isTextureType = (type) => type.startsWith("texture_");
/**
* A hook's `bindings` as declarations in `group`, taking binding slots from
* `alloc` after the pass' own. Scalar/vector/matrix entries share one `uHooks`
* uniform block; a `texture_*` entry becomes a texture and sampler pair under
* the same `u`+capitalize convention as every other texture uniform.
*/
function hookBindingsDeclaration(group, alloc, bindings = {}) {
	const entries = Object.entries(bindings);
	const fields = entries.filter(([, type]) => !isTextureType(type));
	const textures = entries.filter(([, type]) => isTextureType(type));
	return [fields.length ? `struct Hooks {
  ${fields.map(([name, type]) => `${name}: ${type},`).join("\n  ")}
}
${bindingDeclaration(group, alloc.next(), "uHooks", "Hooks", "uniform")}` : "", ...textures.map(([name, type]) => textureSamplerDeclaration(group, alloc.nextTextureSampler(), uniformName(name), type))].filter(Boolean).join("\n");
}
/** Weighted blend of the four influencing joints, from `array` into `name`. */
const skinMatrix = (name, array) => `let ${name} =
    input.weight.x * ${array}[input.joint.x] +
    input.weight.y * ${array}[input.joint.y] +
    input.weight.z * ${array}[input.joint.z] +
    input.weight.w * ${array}[input.joint.w];`;
const SKIN_MATRIX = skinMatrix("skinMat", "uJointMatrices");
/**
* Per-instance scale, rotation and offset applied to `target`, in that order.
*
* Shared by the current and previous transforms so the two cannot drift: they
* have to compose identically, or the difference between them reads as motion
* that never happened.
*/
function instancedOps(target, { instancedScale = false, instancedRotation = false, instancedOffset = false }, { rotationMat = "rotationMat", transformNormal = false, attribute = {
	scale: "input.scale",
	rotation: "input.rotation",
	offset: "input.offset"
} } = {}) {
	return [
		instancedScale && `${target} = vec4f(${target}.xyz * ${attribute.scale}, ${target}.w);`,
		instancedRotation && `let ${rotationMat} = quatToMat4(${attribute.rotation});\n  ${target} = ${rotationMat} * ${target};${transformNormal ? `\n  normal = (${rotationMat} * vec4f(normal, 0.0)).xyz;` : ""}`,
		instancedOffset && `${target} = vec4f(${target}.xyz + ${attribute.offset}, ${target}.w);`
	].filter(Boolean);
}
/**
* The shared vertex-stage transform: declares `positionWorld` and applies skin
* (or model-matrix) plus instanced scale/rotation/offset, optionally carrying
* the normal (and skinned tangent) through. Emits `output.normalView` when
* `transformNormal` is set. Assumes `position`/`normal`/`tangent`/`output` are
* already in scope (matching each pass's vertexMain).
*/
function vertexTransform({ useSkin = false, instancedScale = false, instancedRotation = false, instancedOffset = false, transformNormal = false, transformTangent = false }) {
	const instancing = {
		instancedScale,
		instancedRotation,
		instancedOffset
	};
	return `var positionWorld: vec4f;
  ${(useSkin ? [
		SKIN_MATRIX,
		transformNormal && "normal = (skinMat * vec4f(normal, 0.0)).xyz;",
		"positionWorld = skinMat * position;",
		...instancedOps("positionWorld", instancing, { transformNormal }),
		transformTangent && "tangent = skinMat * vec4f(tangent.xyz, 0.0);",
		transformNormal && "output.normalView = (uFrame.viewMatrix * vec4f(normal, 0.0)).xyz;"
	] : [
		...instancedOps("position", instancing, { transformNormal }),
		"positionWorld = uModel.modelMatrix * position;",
		transformNormal && "output.normalView = uModel.normalMatrix * normal;"
	]).filter(Boolean).join("\n\n  ")}`;
}
/**
* The fragment stage's `FragmentOutput` struct: the always-present color target
* (`@location(0)`) plus whatever extra MRT members the caller passes, assigned
* sequential locations in that order via `locationMembers` — the same scheme
* `vertexOutputStruct` uses, and for the same reason: a shader picks its own
* member types (a motion-vector target might be `vec2f`, not `vec4f`) so this
* only owns the location numbering, not the shape. Called with no args it's the
* color-only form the depth pre-pass and post-processing blits use.
*/
function fragmentOutputStruct(members = []) {
	return `struct FragmentOutput {
  ${locationMembers([{
		name: "color",
		type: "vec4f"
	}, ...members])}
}`;
}
/**
* The scene's extra fragment outputs past `color`, in the order their
* `@location`s are numbered.
*
* A location means nothing on its own — it selects the pass attachment at the
* same index — and the two lists are built in different files: the struct here,
* the `color: [...]` attachments in the render pipeline. So both order by this
* one list rather than by whatever asked for each output. Getting it wrong
* passes validation whenever the mismatched formats happen to be
* component-compatible, and then writes each buffer's contents into the next
* one along.
*/
const SCENE_OUTPUT_MEMBERS = [
	{
		name: "normal",
		type: "vec4f"
	},
	{
		name: "emissive",
		type: "vec4f"
	},
	{
		name: "velocity",
		type: "vec2f"
	},
	{
		name: "responsive",
		type: "vec4f"
	}
];
/** The subset of them a pass writes, still in numbering order. */
const sceneOutputMembers = (outputs = {}) => SCENE_OUTPUT_MEMBERS.filter((member) => outputs[member.name]);
/** Format shaders */
function formatShader(source) {
	return source.replaceAll(/\n\s*\n/g, "\n\n");
}

/**
* Uniforms the registry writes for every sub-pass. Bound at `@group(0)`
* `@binding(0)` in every post-processing shader, whether or not the fragment
* stage reads it: the vertex stage needs `sourceTexelSize` for its neighbour
* taps.
*
* `texelSize` is the pass's own raster grid; `sourceTexelSize` is the grid of
* the texture it samples. The two differ only where a pass scales — bloom's
* pyramid — and conflating them silently mistunes every filter that steps in
* texels, so they are separate fields rather than one the caller reinterprets.
*/
const postProcessingStruct = `
struct PostProcessing {
  viewportSize: vec2f,
  texelSize: vec2f,
  sourceTexelSize: vec2f,
  time: f32,
}
@group(0) @binding(0) var<uniform> uPostProcessing: PostProcessing;
`;
const CORNER_MEMBERS = [
	"texCoord0LeftUp",
	"texCoord0RightUp",
	"texCoord0LeftDown",
	"texCoord0RightDown"
];
const AXIS_MEMBERS = [
	"texCoord0Down",
	"texCoord0Up",
	"texCoord0Left",
	"texCoord0Right"
];
/**
* `VertexOutput` for a post-processing pass. Neighbour taps are interpolated
* rather than recomputed per fragment — the down/upsample and FXAA shader take
* them as parameters for exactly that reason.
*/
const fullscreenVertexOutput = ({ corners = false, axis = false } = {}) => vertexOutputStruct([
	{
		name: "texCoord0",
		type: "vec2f"
	},
	...(corners ? CORNER_MEMBERS : []).map((name) => ({
		name,
		type: "vec2f"
	})),
	...(axis ? AXIS_MEMBERS : []).map((name) => ({
		name,
		type: "vec2f"
	}))
]);
/**
* The shared vertex stage: a fullscreen triangle plus its neighbour taps.
*
* WebGPU's texture origin is top-left while clip space points y up, so the
* flipped y makes a fullscreen pass an identity copy — target texel to source
* texel. Tap names stay in screen terms (`Up` is visually up, one texel back in
* v), which is what the shaders' symmetric filters expect.
*
* Taps step in source texels: they offset a coordinate that is about to sample
* the source, so a pass whose target is a different size — every level of
* bloom's pyramid — would otherwise land its taps at the wrong width.
*/
const fullscreenVertex = ({ corners = false, axis = false, offset = 1 } = {}) => `
struct VertexInput {
  @location(0) position: vec2f,
}

${fullscreenVertexOutput({
	corners,
	axis
})}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;

  output.position = vec4f(input.position, 0.0, 1.0);
  output.texCoord0 = vec2f(input.position.x * 0.5 + 0.5, 0.5 - input.position.y * 0.5);

  ${corners ? `let cornerOffset = uPostProcessing.sourceTexelSize * ${offset.toFixed(2)};
  output.texCoord0LeftUp = output.texCoord0 + cornerOffset * vec2f(-1.0, -1.0);
  output.texCoord0RightUp = output.texCoord0 + cornerOffset * vec2f(1.0, -1.0);
  output.texCoord0LeftDown = output.texCoord0 + cornerOffset * vec2f(-1.0, 1.0);
  output.texCoord0RightDown = output.texCoord0 + cornerOffset * vec2f(1.0, 1.0);` : ""}
  ${axis ? `output.texCoord0Down = output.texCoord0 + uPostProcessing.sourceTexelSize * vec2f(0.0, 1.0);
  output.texCoord0Up = output.texCoord0 + uPostProcessing.sourceTexelSize * vec2f(0.0, -1.0);
  output.texCoord0Left = output.texCoord0 + uPostProcessing.sourceTexelSize * vec2f(-1.0, 0.0);
  output.texCoord0Right = output.texCoord0 + uPostProcessing.sourceTexelSize * vec2f(1.0, 0.0);` : ""}

  return output;
}
`;
const FRAGMENT_COORD = "input.position.xy";

export { hooksKey as $, NAMESPACE as A, areaPowerToLuminance as B, uniformName as C, vertexPreviousWorld as D, vertexOutputStruct as E, TEMP_MAT4 as F, exposureFromEV100 as G, computeFrustumPlanes as H, TEMP_QUAT as I, getDefaultViewport as J, fullscreenTriangle as K, TEMP_VEC3 as L, TEMP_BOUNDS_POINTS as M, TEMP_FRUSTUM as N, vertexTransform as O, TEMP_MAT3 as P, getSkyboxEnvMap as Q, TEMP_VEC4 as R, textureSamplerDeclaration as S, vertexJitter as T, definesKey as U, compareStrings as V, ev100 as W, getEnvironmentRotation as X, getDirname as Y, getFileExtension as Z, modelStruct as _, size as _t, SCENE_OUTPUT_MEMBERS as a, pointPowerToIntensity as at, textureMatrixField as b, createBindingAllocator as c, spotPowerToIntensity as ct, frameStruct as d, empty as dt, isAABBInFrustum as et, getDefineFlags as f, fromPoints as ft, locationMembers as g, isEmpty as gt, hookMembers as h, includePoint as ht, FRAGMENT_VELOCITY as i, pointIntensityToPower as it, TEMP_AABB as j, vertexVelocity as k, formatShader as l, utils_exports as lt, hookBindingsDeclaration as m, includeAABB as mt, fullscreenVertex as n, mapKeys as nt, VELOCITY_MEMBERS as o, quad as ot, getTexCoordGetter as p, getCorners as pt, getCubeFaceCamera as q, postProcessingStruct as r, mapValues as rt, bindingDeclaration as s, spotIntensityToPower as st, FRAGMENT_COORD as t, isObject as tt, fragmentOutputStruct as u, create as ut, samplerName as v, vertexInputStruct as w, textureMatrixName as x, sceneOutputMembers as y, Y_UP as z };