import { a as __toESM, r as __exportAll, t as __commonJSMin } from "./_chunks/rolldown-runtime-ppdSCyCg.js";
import { G as updateBuffer, U as createBuffer, V as createTimestampQuery, W as isGpuBuffer, a as copyExternalImage, c as generateMipmaps, d as textureByteSize, h as frameState, l as isGpuTexture, m as commandsState, o as createTexture, s as fullMipLevelCount } from "./_chunks/vertex-layout-ByhEderR.js";
import { c as submit, d as endFrame, i as createSampler, l as beginFrame } from "./_chunks/lib-CbyljHbD.js";
import { $ as EPSILON, A as multQuat, B as fromQuat, C as copy, D as length, E as dot, F as vec3_exports, H as identity, I as distance$1, J as perspectiveZO, K as mult, M as scale, N as set, O as lerp, P as sub, Q as transpose, R as create$1, S as addScaled, T as distance, U as invert, V as frustumZO, W as lookAt, X as set$2, Y as scale$1, Z as translate, _ as create$4, a as normalize, at as create$3, b as vec4_exports, c as slerp, d as set$4, dt as identity$1, et as clamp, h as set3, ht as translate$1, i as fromMat4, j as normalize$1, k as multMat4, m as set$3, mt as scale$2, nt as toDegrees, ot as fromMat2x3, pt as rotate, q as orthoZO, r as create$2, rt as toRadians, s as set$1, st as fromMat4$1, tt as lerp$1, ut as create$5, v as multMat4$1, w as create, x as add, y as set$5, z as determinant } from "./_chunks/pex-math-C8hwTnFH.js";
import { t as Buffer } from "./_chunks/polyfills-B7DMYx1F.js";
import { $ as hooksKey, A as NAMESPACE, B as areaPowerToLuminance, C as uniformName, D as vertexPreviousWorld, E as vertexOutputStruct, F as TEMP_MAT4, G as exposureFromEV100, H as computeFrustumPlanes, I as TEMP_QUAT, J as getDefaultViewport, K as fullscreenTriangle, L as TEMP_VEC3, M as TEMP_BOUNDS_POINTS, N as TEMP_FRUSTUM, O as vertexTransform, P as TEMP_MAT3, Q as getSkyboxEnvMap, R as TEMP_VEC4, S as textureSamplerDeclaration, T as vertexJitter, U as definesKey, V as compareStrings, W as ev100, X as getEnvironmentRotation, Y as getDirname, Z as getFileExtension, _ as modelStruct, _t as size, a as SCENE_OUTPUT_MEMBERS, at as pointPowerToIntensity, b as textureMatrixField, c as createBindingAllocator, ct as spotPowerToIntensity, d as frameStruct, dt as empty, et as isAABBInFrustum, f as getDefineFlags, ft as fromPoints, g as locationMembers, gt as isEmpty, h as hookMembers, ht as includePoint, i as FRAGMENT_VELOCITY, it as pointIntensityToPower, j as TEMP_AABB, k as vertexVelocity, lt as utils_exports, m as hookBindingsDeclaration, mt as includeAABB, n as fullscreenVertex, nt as mapKeys, o as VELOCITY_MEMBERS, ot as quad, p as getTexCoordGetter, pt as getCorners, q as getCubeFaceCamera, r as postProcessingStruct, rt as mapValues, s as bindingDeclaration, st as spotIntensityToPower, t as FRAGMENT_COORD, tt as isObject, u as fragmentOutputStruct, ut as create$6, v as samplerName, w as vertexInputStruct, x as textureMatrixName, y as sceneOutputMembers, z as Y_UP } from "./_chunks/common-BiA813CC.js";
import { a as inverseMat4, c as quatToMat4, i as glslMod, l as random, n as PI, o as max3, r as TWO_PI, s as multQuat$1, u as saturate } from "./_chunks/math-CwQZH5H7.js";
import { n as lumaShader, t as finalShader } from "./_chunks/final-Db87XKdR.js";
import { t as encode_decode_default } from "./_chunks/encode-decode-DxwgT9tU.js";
import { n as thresholdShader, r as upsampleShader, t as downsampleShader } from "./_chunks/bloom-BgckP8aE.js";
import { t as depth_read_default } from "./_chunks/depth-read-DxwvLw-k.js";
import { n as TONE_MAP_OPERATORS, r as combineShader, t as TONE_MAP_DEFINE } from "./_chunks/combine-hRSyhc7m.js";
import { a as saoShader, i as gtaoShader, n as depthPyramidShader, r as gtaoDenoiseShader, t as bilateralBlurShader } from "./_chunks/ssao-JM5aNoS4.js";
import { a as dofGatherShader, c as dofTileDilateShader, i as dofFocusShader, l as dofTileMaxXShader, n as dofCompositeShader, o as dofPostFilterShader, r as dofDownsampleShader, s as dofPrefilterShader, t as dofCoCResolveShader, u as dofTileMaxYShader } from "./_chunks/dof-BFusxSKr.js";
import { i as lensFlareStreakShader, n as lensFlareMainShader, r as lensFlareStreakSeedShader, t as lensFlareBrightShader } from "./_chunks/lens-flare-CCT0nPnj.js";
import { i as motionBlurTileMaxYShader, n as motionBlurShader, r as motionBlurTileMaxXShader, t as motionBlurNeighborMaxShader } from "./_chunks/motion-blur-CWB_6Jk6.js";
import { n as taaShader, r as taaSharpenShader, t as taaDepthHistoryShader } from "./_chunks/taa-v1XFvCDp.js";
import { a as loadArrayBuffer, c as loadJson, i as smaaWeightsShader, n as smaaEdgesShader, o as loadBlob, r as smaaResolveShader, s as loadImage, t as smaaBlendShader } from "./_chunks/smaa-Dj3RpXT9.js";

var world_default = ({ entities = [], systems = [] } = {}) => {
	let prevTime = performance.now();
	return {
		entities,
		systems,
		add(entity) {
			this.entities.push(entity);
			return entity;
		},
		addSystem(system) {
			this.systems.push(system);
			return system;
		},
		update(deltaTime) {
			if (deltaTime === void 0) {
				const now = performance.now();
				deltaTime = (now - prevTime) / 1e3;
				prevTime = now;
			}
			for (let i = 0; i < this.systems.length; i++) this.systems[i].update(this.entities, { deltaTime });
		},
		dispose(entities) {
			const entitiesToDispose = entities ? Array.isArray(entities) ? entities : [entities] : this.entities;
			for (let i = 0; i < this.systems.length; i++) this.systems[i].dispose?.(entitiesToDispose);
			this.entities = this.entities.filter((entity) => !entitiesToDispose.includes(entity));
			entitiesToDispose.length = 0;
		}
	};
};

let entityCount = 0;
var entity_default = (components = {}) => {
	if (Array.isArray(components)) throw new TypeError("Arrays of components are deprecated. Use props object instead.");
	return {
		id: entityCount++,
		...components
	};
};

/** @module ray */
/**
* Enum for different intersections values
*
* @property {number} Intersect Ray intersects the target
* @property {number} NoIntersect Ray does not intersect the target
* @property {number} SamePlane Ray lies on the same plane as the target
* @property {number} Parallel Ray is parallel to the target
* @property {number} TriangleDegenerate Triangle has zero area and cannot be
*   tested
* @readonly
* @enum {number}
*/
const Intersections = Object.freeze({
	Intersect: 1,
	NoIntersect: 0,
	SamePlane: -1,
	Parallel: -2,
	TriangleDegenerate: -2
});
const TEMP_0 = create();
const TEMP_1 = create();
const TEMP_2 = create();
const TEMP_3 = create();
const TEMP_4 = create();
const TEMP_5 = create();
const TEMP_6 = create();
const TEMP_7 = create();
/**
* Determines if a ray intersect a plane and set intersection point
*
* @param {import("./types.js").Ray} ray
* @param {import("./types.js").Plane} plane
* @param {import("pex-math").Vec3} out
* @returns {number}
* @see {@link https://www.cs.princeton.edu/courses/archive/fall00/cs426/lectures/raycast/sld017.htm}
*/
function hitTestPlane([origin, direction], [point, normal], out = create()) {
	set(TEMP_0, origin);
	set(TEMP_1, direction);
	const dotDirectionNormal = dot(TEMP_1, normal);
	if (dotDirectionNormal === 0) return Intersections.SamePlane;
	set(TEMP_2, point);
	const t = dot(sub(TEMP_2, TEMP_0), normal) / dotDirectionNormal;
	if (t < 0) return Intersections.Parallel;
	set(out, add(TEMP_0, scale(TEMP_1, t)));
	return Intersections.Intersect;
}

function updateAnimation(animation, deltaTime) {
	const channels = animation.channels ?? [];
	if (!animation.prevTime) {
		animation.time = 0;
		animation.prevTime = performance.now();
		animation.playing = true;
	}
	if (animation.playing) {
		const animationLength = animation.duration || channels[0].input.at(-1);
		const now = performance.now();
		deltaTime ||= (now - animation.prevTime) / 1e3;
		animation.prevTime = now;
		animation.time = (animation.time ?? 0) + deltaTime;
		if (animation.time > animationLength) {
			if (animation.loop) animation.time %= animationLength;
			else {
				animation.time = 0;
				animation.playing = false;
			}
		}
		animation.needsUpdate = true;
	}
	if (!animation.needsUpdate) return;
	animation.needsUpdate = false;
	const time = animation.time ?? 0;
	for (let i = 0; i < channels.length; i++) {
		const channel = channels[i];
		const inputData = channel.input;
		let prevIndex;
		let nextIndex = 0;
		for (let j = 0; j < inputData.length; j++) {
			nextIndex = j;
			if (inputData[j] >= time) break;
			prevIndex = nextIndex;
		}
		const isRotation = channel.path === "rotation";
		const outputData = channel.output;
		const prevInput = inputData[prevIndex];
		const scale = inputData[nextIndex] - prevInput || 1;
		const t = (time - prevInput) / scale;
		if (prevIndex !== void 0) {
			switch (channel.interpolation) {
				case "STEP":
					if (isRotation) set$1(TEMP_QUAT, outputData[prevIndex]);
					else set(TEMP_VEC3, outputData[prevIndex]);
					break;
				case "CUBICSPLINE": {
					const vec = isRotation ? vec4_exports : vec3_exports;
					const tt = t * t;
					const ttt = tt * t;
					const prevPosition = vec.copy(outputData[prevIndex * 3 + 1]);
					const nextPos = vec.copy(outputData[nextIndex * 3 + 1]);
					const prevOutTangent = prevIndex ? vec.scale(vec.copy(outputData[prevIndex * 3 + 2]), scale) : vec.create();
					const nextInTangent = nextIndex === inputData.length - 1 ? vec.create() : vec.scale(vec.copy(outputData[prevIndex * 3]), scale);
					const p0 = vec.scale(prevPosition, 2 * ttt - 3 * tt + 1);
					const m0 = vec.scale(prevOutTangent, ttt - 2 * tt + t);
					const p1 = vec.scale(nextPos, -2 * ttt + 3 * tt);
					const m1 = vec.scale(nextInTangent, ttt - tt);
					if (isRotation) set$1(TEMP_QUAT, normalize([
						p0[0] + m0[0] + p1[0] + m1[0],
						p0[1] + m0[1] + p1[1] + m1[1],
						p0[2] + m0[2] + p1[2] + m1[2],
						p0[3] + m0[3] + p1[3] + m1[3]
					]));
					else set(TEMP_VEC3, add(add(add(p0, m0), p1), m1));
					break;
				}
				default: if (isRotation) slerp(set$1(TEMP_QUAT, outputData[prevIndex]), outputData[nextIndex], t);
				else lerp(set(TEMP_VEC3, outputData[prevIndex]), outputData[nextIndex], t);
			}
			const transform = channel.target.transform;
			if (isRotation) {
				set$1(transform.rotation, TEMP_QUAT);
				transform.dirty = true;
			} else switch (channel.path) {
				case "translation":
					set(transform.position, TEMP_VEC3);
					transform.dirty = true;
					break;
				case "scale":
					set(transform.scale, TEMP_VEC3);
					transform.dirty = true;
					break;
				case "weights": channel.target.morph.weights = outputData[nextIndex].slice();
			}
		}
	}
}
/** Animation system */
var animation_default$1 = () => ({
	type: "animation-system",
	updateAnimation,
	update(entities, { deltaTime } = {}) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (entity.animations) for (let j = 0; j < entity.animations.length; j++) updateAnimation(entity.animations[j], deltaTime);
			else if (entity.animation) updateAnimation(entity.animation, deltaTime);
		}
	}
});

var require_lerp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function lerp(v0, v1, t) {
		return v0 * (1 - t) + v1 * t;
	}
	module.exports = lerp;
}));

var require_interpolate_angle = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var lerp = require_lerp();
	var PI = Math.PI;
	var TWO_PI = Math.PI * 2;
	function interpolateAngle(fromAngle, toAngle, t) {
		fromAngle = (fromAngle + TWO_PI) % TWO_PI;
		toAngle = (toAngle + TWO_PI) % TWO_PI;
		if (Math.abs(fromAngle - toAngle) < PI) return lerp(fromAngle, toAngle, t);
		else if (fromAngle > toAngle) {
			fromAngle = fromAngle - TWO_PI;
			return lerp(fromAngle, toAngle, t);
		} else if (toAngle > fromAngle) {
			toAngle = toAngle - TWO_PI;
			return lerp(fromAngle, toAngle, t);
		}
	}
	module.exports = interpolateAngle;
}));

var require_latlon_to_xyz = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function latLonToXyz(lat, lon, out) {
		out = out || [
			0,
			0,
			0
		];
		const phi = (lon + 90) / 180 * Math.PI;
		const theta = (90 - lat) / 180 * Math.PI;
		out[0] = Math.sin(theta) * Math.sin(phi);
		out[1] = Math.cos(theta);
		out[2] = Math.sin(theta) * Math.cos(phi);
		return out;
	}
	module.exports = latLonToXyz;
}));

var require_xyz_to_latlon = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function xyzToLatLon(normalizedPosition, out) {
		out = out || [0, 0];
		out[0] = 90 - Math.acos(normalizedPosition[1]) / Math.PI * 180;
		out[1] = -Math.atan2(normalizedPosition[2], normalizedPosition[0]) / Math.PI * 180;
		return out;
	}
	module.exports = xyzToLatLon;
}));

var require_mouse_event_offset = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var rootPosition = {
		left: 0,
		top: 0
	};
	module.exports = mouseEventOffset;
	function mouseEventOffset(ev, target, out) {
		target = target || ev.currentTarget || ev.srcElement;
		if (!Array.isArray(out)) out = [0, 0];
		var cx = ev.clientX || 0;
		var cy = ev.clientY || 0;
		var rect = getBoundingClientOffset(target);
		out[0] = cx - rect.left;
		out[1] = cy - rect.top;
		return out;
	}
	function getBoundingClientOffset(element) {
		if (element === window || element === document || element === document.body) return rootPosition;
		else return element.getBoundingClientRect();
	}
}));

var import_interpolate_angle = /* @__PURE__ */ __toESM(require_interpolate_angle(), 1);
var import_latlon_to_xyz = /* @__PURE__ */ __toESM(require_latlon_to_xyz(), 1);
var import_xyz_to_latlon = /* @__PURE__ */ __toESM(require_xyz_to_latlon(), 1);
var import_mouse_event_offset = /* @__PURE__ */ __toESM(require_mouse_event_offset(), 1);
/**
* Camera controls to orbit around a target
*/
var OrbiterControls = class OrbiterControls {
	static get DEFAULT_OPTIONS() {
		return {
			element: document,
			easing: .1,
			zoom: true,
			pan: true,
			drag: true,
			minDistance: .01,
			maxDistance: Infinity,
			minLat: -89.5,
			maxLat: 89.5,
			minLon: -Infinity,
			maxLon: Infinity,
			panSlowdown: 4,
			zoomSlowdown: 400,
			dragSlowdown: 4,
			autoUpdate: true
		};
	}
	get domElement() {
		return this.element === document ? this.element.body : this.element;
	}
	/**
	* Create an instance of OrbiterControls
	* @param {import("./types.js").OrbiterControlsOptions} opts
	*/
	constructor(opts) {
		this.lat = null;
		this.lon = null;
		this.currentLat = null;
		this.currentLon = null;
		this.distance = null;
		this.currentDistance = null;
		this.panning = false;
		this.dragging = false;
		this.zooming = false;
		this.width = 0;
		this.height = 0;
		this.zoomTouchDistance = null;
		this.panPlane = null;
		this.clickTarget = [
			0,
			0,
			0
		];
		this.clickPosWorld = [
			0,
			0,
			0
		];
		this.clickPosPlane = [
			0,
			0,
			0
		];
		this.dragPos = [
			0,
			0,
			0
		];
		this.dragPosWorld = [
			0,
			0,
			0
		];
		this.dragPosPlane = [
			0,
			0,
			0
		];
		this.set({
			...OrbiterControls.DEFAULT_OPTIONS,
			...opts
		});
		this.setup();
	}
	/**
	* Update the control
	* @param {import("./types.js").OrbiterOptions} opts
	*/
	set(opts) {
		Object.assign(this, opts);
		if (opts.camera) {
			const latLon = (0, import_xyz_to_latlon.default)(normalize$1(sub(copy(opts.camera.position), opts.camera.target)));
			const distance$2 = opts.distance || distance(opts.camera.position, opts.camera.target);
			this.lat = latLon[0];
			this.lon = latLon[1];
			this.currentLat = this.lat;
			this.currentLon = this.lon;
			this.distance = distance$2;
			this.currentDistance = this.distance;
		}
		if (Object.getOwnPropertyDescriptor(opts, "autoUpdate")) {
			if (this.autoUpdate) {
				const self = this;
				this.rafHandle = requestAnimationFrame(function tick() {
					self.updateCamera();
					if (self.autoUpdate) self.rafHandle = requestAnimationFrame(tick);
				});
			} else if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
		}
	}
	updateCamera() {
		if (!this.camera) return;
		const position = this.camera.position;
		const target = this.camera.target;
		this.lat = clamp(this.lat, this.minLat, this.maxLat);
		if (this.minLon !== -Infinity && this.maxLon !== Infinity) this.lon = clamp(this.lon, this.minLon, this.maxLon) % 360;
		this.currentLat = toDegrees((0, import_interpolate_angle.default)((toRadians(this.currentLat) + 2 * Math.PI) % (2 * Math.PI), (toRadians(this.lat) + 2 * Math.PI) % (2 * Math.PI), this.easing));
		this.currentLon += (this.lon - this.currentLon) * this.easing;
		this.currentDistance = lerp$1(this.currentDistance, this.distance, this.easing);
		(0, import_latlon_to_xyz.default)(this.currentLat, this.currentLon, position);
		scale(position, this.currentDistance);
		add(position, target);
		if (this.camera.zoom !== void 0) this.camera.set({ zoom: length(position) });
		this.camera.set({ position });
	}
	updateWindowSize() {
		const width = this.domElement.clientWidth || this.domElement.innerWidth;
		const height = this.domElement.clientHeight || this.domElement.innerHeight;
		if (width !== this.width) this.width = width;
		if (height !== this.height) this.height = height;
	}
	handleDragStart(position) {
		this.dragging = true;
		this.dragPos = position;
	}
	handlePanZoomStart(touch0, touch1) {
		this.dragging = false;
		if (this.zoom && touch1) {
			this.zooming = true;
			this.zoomTouchDistance = distance$1(touch1, touch0);
		}
		const camera = this.camera;
		if (this.pan && camera) {
			this.panning = true;
			this.updateWindowSize();
			const clickPosWindow = touch1 ? [(touch0[0] + touch1[0]) * .5, (touch0[1] + touch1[1]) * .5] : touch0;
			set(this.clickTarget, camera.target);
			const targetInViewSpace = multMat4(copy(this.clickTarget), camera.viewMatrix);
			this.panPlane = [targetInViewSpace, [
				0,
				0,
				1
			]];
			hitTestPlane(camera.getViewRay(clickPosWindow[0], clickPosWindow[1], this.width, this.height), this.panPlane, this.clickPosPlane);
		}
	}
	handleDragMove(position) {
		const dx = position[0] - this.dragPos[0];
		const dy = position[1] - this.dragPos[1];
		this.lat += dy / this.dragSlowdown;
		this.lon -= dx / this.dragSlowdown;
		this.dragPos = position;
	}
	handlePanZoomMove(touch0, touch1) {
		if (this.zoom && touch1) {
			const distance = distance$1(touch1, touch0);
			this.handleZoom(this.zoomTouchDistance - distance);
			this.zoomTouchDistance = distance;
		}
		const camera = this.camera;
		if (this.pan && camera && this.panPlane) {
			const dragPosWindow = touch1 ? [(touch0[0] + touch1[0]) * .5, (touch0[1] + touch1[1]) * .5] : touch0;
			hitTestPlane(camera.getViewRay(dragPosWindow[0], dragPosWindow[1], this.width, this.height), this.panPlane, this.dragPosPlane);
			multMat4(set(this.clickPosWorld, this.clickPosPlane), camera.invViewMatrix);
			multMat4(set(this.dragPosWorld, this.dragPosPlane), camera.invViewMatrix);
			const diffWorld = sub(copy(this.dragPosWorld), this.clickPosWorld);
			camera.set({
				distance: this.distance,
				target: sub(copy(this.clickTarget), diffWorld)
			});
		}
	}
	handleZoom(dy) {
		this.distance *= 1 + dy / this.zoomSlowdown;
		this.distance = clamp(this.distance, this.minDistance, this.maxDistance);
	}
	handleEnd() {
		this.dragging = false;
		this.panning = false;
		this.zooming = false;
		this.panPlane = null;
	}
	setup() {
		this.onPointerDown = (event) => {
			const pan = event.ctrlKey || event.metaKey || event.shiftKey || event.touches && event.touches.length === 2;
			const touch0 = (0, import_mouse_event_offset.default)(event.touches ? event.touches[0] : event, this.domElement);
			if (this.drag && !pan) this.handleDragStart(touch0);
			else if ((this.pan || this.zoom) && pan) {
				const touch1 = event.touches && (0, import_mouse_event_offset.default)(event.touches[1], this.domElement);
				this.handlePanZoomStart(touch0, touch1);
			}
		};
		this.onPointerMove = (event) => {
			const touch0 = (0, import_mouse_event_offset.default)(event.touches ? event.touches[0] : event, this.domElement);
			if (this.dragging) this.handleDragMove(touch0);
			else if (this.panning || this.zooming) {
				if (event.touches && !event.touches[1]) return;
				const touch1 = event.touches && (0, import_mouse_event_offset.default)(event.touches[1], this.domElement);
				this.handlePanZoomMove(touch0, touch1);
			}
		};
		this.onPointerUp = () => {
			this.handleEnd();
		};
		this.onTouchStart = (event) => {
			event.preventDefault();
			if (event.touches.length <= 2) this.onPointerDown(event);
		};
		this.onTouchMove = (event) => {
			event.cancelable && event.preventDefault();
			if (event.touches.length <= 2) this.onPointerMove(event);
		};
		this.onWheel = (event) => {
			if (!this.zoom) return;
			event.preventDefault();
			this.handleZoom(event.deltaY);
		};
		this.element.addEventListener("pointerdown", this.onPointerDown);
		this.element.addEventListener("wheel", this.onWheel, { passive: false });
		document.addEventListener("pointermove", this.onPointerMove);
		document.addEventListener("pointerup", this.onPointerUp);
		this.domElement.style.touchAction = "none";
	}
	/**
	* Remove all event listeners
	*/
	dispose() {
		if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
		this.element.removeEventListener("pointerdown", this.onPointerDown);
		this.element.removeEventListener("wheel", this.onWheel);
		document.removeEventListener("pointermove", this.onPointerMove);
		document.removeEventListener("pointerup", this.onPointerUp);
	}
};

/**
* Factory function for orbiter controls
* @param {import("./types.js").OrbiterControlsOptions} opts
* @returns {OrbiterControls}
*/
const orbiter = (opts) => new OrbiterControls(opts);

const bits = /* @__PURE__ */ new Uint32Array(1);
function radicalInverse(i) {
	bits[0] = i;
	bits[0] = (bits[0] << 16 | bits[0] >> 16) >>> 0;
	bits[0] = (bits[0] & 1431655765) << 1 | (bits[0] & 2863311530) >>> 1 >>> 0;
	bits[0] = (bits[0] & 858993459) << 2 | (bits[0] & 3435973836) >>> 2 >>> 0;
	bits[0] = (bits[0] & 252645135) << 4 | (bits[0] & 4042322160) >>> 4 >>> 0;
	bits[0] = (bits[0] & 16711935) << 8 | (bits[0] & 4278255360) >>> 8 >>> 0;
	return bits[0] * 23283064365386963e-26;
}

/** @module halton */
const ONE_MINUS_EPSILON = 1 - Number.EPSILON / 2;
/**
* The Halton sequence algorithm (radical inverse), optionally scrambled with a
* digit permutation.
*
* @param {number} index Index in the sequence.
* @param {number} base An integer, preferably prime number.
* @param {number[]} [permutation] A permutation of the digits [0, base - 1]
*   applied to each digit.
* @returns {number}
* @see [Wikipedia Halton_sequence]{@link https://en.wikipedia.org/wiki/Halton_sequence#Implementation}
* @see [PBR Book The Halton Sampler]{@link https://www.pbr-book.org/3ed-2018/Sampling_and_Reconstruction/The_Halton_Sampler}
*/
function haltonSequence(index, base, permutation) {
	let reversedDigits = 0;
	let baseN = 1;
	while (index > 0) {
		const next = Math.floor(index / base);
		const digit = index - next * base;
		reversedDigits = reversedDigits * base + (permutation ? permutation[digit] : digit);
		baseN *= base;
		index = next;
	}
	if (!permutation) return reversedDigits / baseN;
	return Math.min((reversedDigits + permutation[0] / (base - 1)) / baseN, ONE_MINUS_EPSILON);
}
/**
* Generate n points of the Halton sequence in n-dimensions. The "bases"
* parameter defines how many dimensions. Pass "permutations" to scramble the
* sequence and break the regular patterns of higher bases.
*
* @param {number} count Number of points in the sequence to generate.
* @param {number[]} [bases=[2, 3]] The bases for the Van der Corput operation.
*   Best results with small coprime numbers.
* @param {number[][]} [permutations] A digit permutation per base. See
*   createPermutations and createFaurePermutations.
* @returns {number[][]}
* @alias module:halton.default
*/
const halton = (count, bases = [2, 3], permutations) => Array.from({ length: count }, (_, index) => bases.map((base, i) => {
	const permutation = permutations?.[i];
	return base === 2 && !permutation ? radicalInverse(index) : haltonSequence(index, base, permutation);
}));

const resolvedCamera = (entity) => entity.camera;
function computeFrustum(camera) {
	computeFrustumPlanes(camera.frustum, camera.projectionMatrix, camera.viewMatrix);
}
/**
* Halton(2, 3), centred on the pixel — the standard temporal antialiasing
* sequence. Two coprime bases give a set that stays evenly spread at any prefix
* length, where random offsets clump and leave the pixel unevenly covered over
* the handful of frames a moving camera gets before its history is rejected.
*
* The first point of the sequence is dropped: it is (0, 0) in every base, which
* centres to the pixel's corner rather than anywhere useful.
*/
const JITTER_SAMPLE_COUNT = 8;
const JITTER_SAMPLES = halton(9, [2, 3]).slice(1).map(([x, y]) => [x - .5, y - .5]);
const NO_JITTER$1 = [0, 0];
/**
* SMAA T2x's two sample positions, in pixels with y up: the reference's
*
* @SUBSAMPLE_INDICES table. The smaa effect tells which one a frame used from
* the jitter's sign, and picks the matching subsample indices.
*/
const SMAA_T2X_JITTER_SAMPLES = [[.25, -.25], [-.25, .25]];
/**
* Cameras asked to drop their temporal history, consumed by the next update.
*
* Held here rather than on the component so `_temporalReset` can mean one thing
* — "this frame does not continue the last" — and be read by any number of
* consumers without one of them clearing it out from under the others.
*/
const temporalResets = /* @__PURE__ */ new WeakSet();
/**
* This frame's sub-pixel offset, or zero when nothing accumulates one — an
* offset left behind after the effect is switched off would sit the image
* permanently off-centre. Temporal antialiasing supersedes SMAA T2x, so its
* sequence wins when both are on.
*/
function updateCameraJitter(entity, frameIndex, viewport) {
	const jitter = entity.camera._jitter ??= [0, 0];
	const postProcessing = entity.postProcessing;
	const sample = postProcessing?.taa ? JITTER_SAMPLES[frameIndex % JITTER_SAMPLE_COUNT] : postProcessing?.smaa?.mode === "t2x" ? SMAA_T2X_JITTER_SAMPLES[frameIndex % 2] : NO_JITTER$1;
	jitter[0] = 2 * sample[0] / viewport[2];
	jitter[1] = 2 * sample[1] / viewport[3];
}
/**
* The unjittered view-projection, its inverse, and the one from last frame —
* what anything reprojecting between frames needs, derived here because this is
* the only place that knows when the view and projection matrices are final.
*
* Maintained for every camera rather than only when something reads it: it is
* two multiplies and an inverse, and the alternative is the camera system
* knowing which effects are switched on. Assumes one update per rendered frame,
* which is the same assumption `deltaTime` already makes.
*/
function updateCameraViewProjection(camera) {
	const previous = camera._previousViewProjectionMatrix ??= create$1();
	const viewProjection = camera._viewProjectionMatrix ??= create$1();
	const inverse = camera._inverseViewProjectionMatrix ??= create$1();
	set$2(previous, viewProjection);
	set$2(viewProjection, camera.projectionMatrix);
	mult(viewProjection, camera.viewMatrix);
	if (!camera._hasPreviousViewProjectionMatrix || camera._temporalReset) {
		camera._hasPreviousViewProjectionMatrix = true;
		set$2(previous, viewProjection);
	}
	set$2(inverse, viewProjection);
	invert(inverse);
}
/**
* Scene luminance (cd/m²) to a sensor-referred value, pre-multiplied into
* everything that writes scene colour rather than applied downstream: the
* colour target is half float and physical lighting overruns it, and every
* threshold after this point — bloom, lens flare, depth of field — is a number
* about the exposed image.
*
* Compensation offsets the metered EV rather than scaling the result — the same
* number either way, and the sign follows the photographic convention: positive
* opens up, one stop per unit.
*/
function updateCameraExposure(camera) {
	camera._exposure = exposureFromEV100(ev100(camera.fStop, camera.shutterSpeed, camera.iso) - (camera.exposureCompensation ?? 0));
}
function updateCameraProjection(camera, transform) {
	const view = camera.view;
	if (camera.projection === "orthographic") {
		const dx = (camera.right - camera.left) / (2 / camera.zoom);
		const dy = (camera.top - camera.bottom) / (2 / camera.zoom);
		const cx = (camera.right + camera.left) / 2;
		const cy = (camera.top + camera.bottom) / 2;
		let left = cx - dx;
		let right = cx + dx;
		let top = cy + dy;
		let bottom = cy - dy;
		if (view) {
			const [viewWidth, viewHeight] = view.size;
			const [totalWidth, totalHeight] = view.totalSize;
			const zoomW = 1 / camera.zoom / (viewWidth / totalWidth);
			const zoomH = 1 / camera.zoom / (viewHeight / totalHeight);
			const scaleW = (camera.right - camera.left) / viewWidth;
			const scaleH = (camera.top - camera.bottom) / viewHeight;
			left += scaleW * (view.offset[0] / zoomW);
			right = left + scaleW * (viewWidth / zoomW);
			top -= scaleH * (view.offset[1] / zoomH);
			bottom = top - scaleH * (viewHeight / zoomH);
		}
		orthoZO(camera.projectionMatrix, left, right, bottom, top, camera.near, camera.far);
	} else if (view) {
		const [viewWidth, viewHeight] = view.size;
		const [totalWidth, totalHeight] = view.totalSize;
		const [offsetX, offsetY] = view.offset;
		const aspectRatio = totalWidth / totalHeight;
		const top = Math.tan(camera.fov * .5) * camera.near;
		const bottom = -top;
		const left = aspectRatio * bottom;
		const right = aspectRatio * top;
		const width = Math.abs(right - left);
		const height = Math.abs(top - bottom);
		const widthNormalized = width / totalWidth;
		const heightNormalized = height / totalHeight;
		const l = left + offsetX * widthNormalized;
		const r = left + (offsetX + viewWidth) * widthNormalized;
		const b = top - (offsetY + viewHeight) * heightNormalized;
		const t = top - offsetY * heightNormalized;
		frustumZO(camera.projectionMatrix, l, r, b, t, camera.near, camera.far);
	} else perspectiveZO(camera.projectionMatrix, camera.fov, camera.aspect, camera.near, camera.far);
	set$2(camera.inverseViewMatrix, transform.modelMatrix);
	set$2(camera.viewMatrix, transform.modelMatrix);
	invert(camera.viewMatrix);
	if (camera.culling) computeFrustum(camera);
}
/**
* Camera system
*
* Adds:
*
* - "_orbiter" to orbiter components
* - "_viewProjectionMatrix", "_inverseViewProjectionMatrix",
*   "_previousViewProjectionMatrix", "_jitter", "_temporalReset" and
*   "_exposure" to camera components
*/
var camera_default$1 = ({ ctx }) => ({
	type: "camera-system",
	cache: {},
	debug: false,
	updateCameraProjection,
	updateCameraViewProjection,
	updateCameraJitter,
	updateCameraExposure,
	computeFrustum,
	/**
	* Declare that this camera's next frame does not continue from the last, so
	* anything accumulating across frames throws its history away rather than
	* blending it.
	*
	* What it is for: a cut. Reprojection assumes the previous frame looked at
	* roughly the same thing — it finds where a surface _was_ and reads the
	* colour accumulated there. Teleport the camera and that assumption is gone:
	* the previous view-projection describes somewhere else entirely, so every
	* pixel reads history belonging to an unrelated image. Most of it is caught
	* anyway (the reprojection lands off-screen, or the value is clipped against
	* the neighbourhood), which is why a cut shows as a brief flash rather than a
	* lasting smear — but the frames that survive both tests are wrong, and there
	* is no way to tell from inside the resolve.
	*
	* Explicit rather than inferred from how far the camera moved: that test is
	* wrong in both directions, since a fast pan is not a cut and a slow teleport
	* is. Call it wherever the camera is repositioned — a scene load, a jump to a
	* bookmarked view, switching between cameras that share a target.
	*/
	resetTemporal(cameraEntity) {
		temporalResets.add(cameraEntity);
	},
	checkCamera(_, cameraEntity) {
		if (cameraEntity.transform) return true;
		else console.warn(NAMESPACE, this.type, `camera entity missing transform. Add a transformSystem.update(entities).`);
	},
	updateCameraFoV(entity) {
		const camera = resolvedCamera(entity);
		const cached = this.cache[entity.id];
		const [sensorWidth, sensorHeightDefault] = camera.sensorSize;
		let sensorHeight = sensorHeightDefault;
		const sensorAspectRatio = sensorWidth / sensorHeight;
		if (camera.aspect > sensorAspectRatio) {
			if (camera.sensorFit === "horizontal" || camera.sensorFit === "fill") sensorHeight = sensorWidth / camera.aspect;
		} else if (camera.sensorFit === "horizontal" || camera.sensorFit === "overscan") sensorHeight = sensorWidth / camera.aspect;
		camera.actualSensorHeight = sensorHeight;
		if (cached.fov !== camera.fov) {
			camera.focalLength = sensorHeight / 2 / Math.tan(camera.fov / 2);
			cached.fov = camera.fov;
			cached.focalLength = camera.focalLength;
		} else if (cached.focalLength !== camera.focalLength) {
			camera.fov = 2 * Math.atan(sensorHeight / 2 / camera.focalLength);
			cached.fov = camera.fov;
			cached.focalLength = camera.focalLength;
		}
	},
	updateCameraEntity(entity) {
		const orbiter$1 = entity.orbiter;
		const camera = resolvedCamera(entity);
		const transform = entity.transform;
		if (this.cache[entity.id]?.camera !== camera) this.cache[entity.id] = { camera };
		this.updateCameraFoV(entity);
		if (orbiter$1) {
			if (orbiter$1._orbiter) {
				if (camera.dirty) {
					camera.dirty = false;
					updateCameraProjection(camera, entity._transform);
				}
				let newPosition = null;
				let newTarget = null;
				if (distance(orbiter$1._orbiter.camera.position, transform.position) > 1e-6) newPosition = [...transform.position];
				if (distance(orbiter$1._orbiter.camera.rotationCache, transform.rotation) > 1e-6) {
					newTarget = [
						0,
						0,
						-orbiter$1._orbiter.distance
					];
					multQuat(newTarget, transform.rotation);
					add(newTarget, transform.position);
				}
				if (distance(orbiter$1.target, orbiter$1._orbiter.camera.target) > 1e-6) newTarget = orbiter$1.target;
				if (newPosition || newTarget) {
					const opts = {};
					if (newPosition) opts.position = [...newPosition];
					if (newTarget) opts.target = [...newTarget];
					orbiter$1._orbiter.camera.set(opts);
					orbiter$1._orbiter.set({ camera: orbiter$1._orbiter.camera });
				} else {
					if (orbiter$1.distance !== orbiter$1._orbiter.distanceCache) {
						orbiter$1._orbiter.distanceCache = orbiter$1.distance;
						orbiter$1._orbiter.set({ distance: orbiter$1.distance });
					}
					if (orbiter$1.lon !== orbiter$1._orbiter.lonCache) {
						orbiter$1._orbiter.lonCache = orbiter$1.lon;
						orbiter$1._orbiter.set({ lon: orbiter$1.lon });
					}
					if (orbiter$1.lat !== orbiter$1._orbiter.latCache) {
						orbiter$1._orbiter.latCache = orbiter$1.lat;
						orbiter$1._orbiter.set({ lat: orbiter$1.lat });
					}
				}
				orbiter$1._orbiter.updateCamera();
				identity(camera.inverseViewMatrix);
				translate(camera.inverseViewMatrix, transform.position);
				mult(camera.inverseViewMatrix, fromQuat(TEMP_MAT4, transform.rotation));
				set$2(camera.viewMatrix, camera.inverseViewMatrix);
				invert(camera.viewMatrix);
			} else {
				updateCameraProjection(camera, entity._transform);
				const proxyCamera = {
					viewMatrix: camera.viewMatrix,
					inverseViewMatrix: camera.inverseViewMatrix,
					invViewMatrix: camera.inverseViewMatrix,
					position: [...transform.position],
					rotationCache: [...transform.rotation],
					target: [...orbiter$1.target],
					up: [
						0,
						1,
						0
					],
					zoom: camera.zoom,
					getViewRay: (x, y, windowWidth, windowHeight) => {
						let nx = 2 * x / windowWidth - 1;
						let ny = 1 - 2 * y / windowHeight;
						const hNear = 2 * Math.tan(camera.fov / 2) * camera.near;
						const wNear = hNear * camera.aspect;
						nx *= wNear * .5;
						ny *= hNear * .5;
						return [[
							0,
							0,
							0
						], normalize$1([
							nx,
							ny,
							-camera.near
						])];
					},
					set({ target, position, zoom }) {
						if (zoom) {
							camera.zoom = zoom;
							return;
						}
						if (target) {
							set(orbiter$1._orbiter.camera.target, target);
							set(orbiter$1.target, target);
						}
						if (position) {
							set(orbiter$1._orbiter.camera.position, position);
							set(transform.position, position);
						}
						lookAt(TEMP_MAT4, orbiter$1._orbiter.camera.position, orbiter$1._orbiter.camera.target, orbiter$1._orbiter.camera.up);
						invert(TEMP_MAT4);
						fromMat4(transform.rotation, TEMP_MAT4);
						set$1(orbiter$1._orbiter.camera.rotationCache, transform.rotation);
						orbiter$1.lat = orbiter$1._orbiter.lat;
						orbiter$1.lon = orbiter$1._orbiter.lon;
						orbiter$1.distance = orbiter$1._orbiter.distance;
						transform.dirty = true;
						camera.dirty = true;
					}
				};
				orbiter$1._orbiter = orbiter({
					element: orbiter$1.element || document.body,
					autoUpdate: false,
					camera: proxyCamera,
					position: proxyCamera.position,
					maxDistance: camera.far * .9
				});
				orbiter$1._orbiter.updateCamera();
				orbiter$1.distance = orbiter$1._orbiter.distance;
				orbiter$1.lat = orbiter$1._orbiter.lat;
				orbiter$1.lon = orbiter$1._orbiter.lon;
				orbiter$1._orbiter.distanceCache = orbiter$1._orbiter.distance;
				orbiter$1._orbiter.latCache = orbiter$1._orbiter.lat;
				orbiter$1._orbiter.lonCache = orbiter$1._orbiter.lon;
			}
		} else if (camera.dirty) {
			camera.dirty = false;
			updateCameraProjection(camera, entity._transform);
		}
	},
	update(entities, { frameIndex = 0 } = {}) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (entity.camera) {
				if (!this.checkCamera(null, entity)) continue;
				const camera = resolvedCamera(entity);
				this.updateCameraEntity(entity);
				updateCameraExposure(camera);
				camera._temporalReset = temporalResets.delete(entity);
				updateCameraViewProjection(camera);
				updateCameraJitter(entity, frameIndex, entity.camera.viewport || getDefaultViewport(ctx));
			}
		}
	}
});

const isAttributeData = (value) => ArrayBuffer.isView(value) || Array.isArray(value);
const getAttributeDescriptor = (attribute) => isAttributeData(attribute) ? void 0 : attribute;
const isAttribute = (value) => isAttributeData(value) || isGpuBuffer(value) || typeof value === "object" && value !== null && (isGpuBuffer(value.buffer) || isAttributeData(value.data));
const getAttributeData = (attribute) => getAttributeDescriptor(attribute)?.data ?? attribute;
const attributeMap = {
	position: "positions",
	normal: "normals",
	tangent: "tangents",
	vertexColor: "vertexColors",
	texCoord0: [
		"uvs",
		"texCoords",
		"uvs0",
		"texCoords0"
	],
	texCoord1: ["uvs1", "texCoords1"],
	weight: "weights",
	joint: "joints",
	offset: "offsets",
	scale: "scales",
	rotation: "rotations",
	color: "colors"
};
const attributeMapKeys = Object.keys(attributeMap);
const instancedAttributes = /* @__PURE__ */ new Set([
	"offset",
	"scale",
	"rotation",
	"color"
]);
const indicesProps = ["cells", "indices"];
/**
* Vertex data that places a surface, so a motion vector needs last frame's
* values: CPU-blended morph targets land in `position`, animated instancing in
* the instance transforms. Maps to the name the second buffer is cached under.
*/
const previousNames = Object.fromEntries([
	"position",
	"offset",
	"scale",
	"rotation"
].map((name) => [name, `previous${name[0].toUpperCase()}${name.slice(1)}`]));
const descriptorFields = [
	"offset",
	"arrayStride",
	"format",
	"stepMode"
];
const BYTES_PER_INDEX = {
	uint16: 2,
	uint32: 4
};
const buffersPerContext = /* @__PURE__ */ new WeakMap();
/**
* Buffers allocated here, and so writable and disposable here. A descriptor's
* buffer belongs to whoever built it — a glTF bufferView is shared by every
* primitive slicing it.
*/
const bufferCache = (ctx) => buffersPerContext.getOrInsertComputed(ctx, () => /* @__PURE__ */ new WeakSet());
/** Element count pex-gpu will write for `data`: an array of vectors flattens. */
const elementCount = (data) => ArrayBuffer.isView(data) ? data.length : data.length * (Array.isArray(data[0]) ? data[0].length : 1);
/**
* Bytes pex-gpu writes per element, mirroring its coercion. A new index buffer
* measures at the widest format its data could take: the format is settled by
* scanning the values, which only createBuffer does.
*/
function bytesPerElement(data, usage, buffer) {
	if (buffer?.indexFormat) return BYTES_PER_INDEX[buffer.indexFormat];
	if (usage === "index") return ArrayBuffer.isView(data) ? Math.max(data.BYTES_PER_ELEMENT, BYTES_PER_INDEX.uint16) : BYTES_PER_INDEX.uint32;
	return ArrayBuffer.isView(data) ? data.BYTES_PER_ELEMENT : Float32Array.BYTES_PER_ELEMENT;
}
/**
* Whether `buffer` takes `data` as it stands rather than be replaced. Reserved,
* it takes anything it has room for; unreserved, it tracks its contents exactly
* so a draw running past them raises a WebGPU range error naming the buffer,
* instead of rendering stale geometry.
*/
function shouldReuse(buffer, data, count, { usage, capacity }) {
	return count * bytesPerElement(data, usage, buffer) <= buffer.size && (capacity !== void 0 || count === buffer.length);
}
/**
* Upload into `buffer`, allocating one when there is none and replacing it when
* the data no longer matches: an attribute array can be swapped for another
* between frames, and a GPU buffer cannot be resized.
*/
function writeBuffer(ctx, buffer, data, options) {
	const { usage, capacity, label } = options;
	const count = elementCount(data);
	if (buffer && bufferCache(ctx).has(buffer)) {
		if (shouldReuse(buffer, data, count, options)) {
			updateBuffer(ctx, buffer, data);
			return buffer;
		}
		buffer.dispose();
	}
	const created = createBuffer(ctx, {
		usage,
		data,
		...capacity !== void 0 && { size: Math.max(capacity, count * 2) * bytesPerElement(data, usage) },
		...label !== void 0 && { label }
	});
	bufferCache(ctx).add(created);
	return created;
}
function keepPreviousBuffer(ctx, attributes, name, previousName, attribute, data, options) {
	const previous = attributes[previousName];
	if (attribute.buffer.length !== elementCount(data)) attribute.buffer = writeBuffer(ctx, attribute.buffer, data, options);
	if (previous) {
		attributes[previousName] = attribute;
		attributes[name] = previous;
		previous.buffer = writeBuffer(ctx, previous.buffer, data, options);
		return;
	}
	attributes[previousName] = attribute;
	attributes[name] = {
		...attribute,
		buffer: writeBuffer(ctx, void 0, data, options)
	};
}
function setAttributeField(attribute, key, value) {
	if (value === void 0) delete attribute[key];
	else attribute[key] = value;
}
function setAttributeFields(attribute, previous, values) {
	for (let i = 0; i < descriptorFields.length; i++) {
		const key = descriptorFields[i];
		setAttributeField(attribute, key, values[key]);
		if (previous) setAttributeField(previous, key, values[key]);
	}
}
function disposeAttribute(ctx, attribute) {
	const buffer = attribute?.buffer ?? attribute;
	if (isGpuBuffer(buffer) && bufferCache(ctx).has(buffer)) buffer.dispose();
}
function disposeGeometry(ctx, cachedGeom) {
	disposeAttribute(ctx, cachedGeom.indices);
	for (const attribute of Object.values(cachedGeom.attributes)) disposeAttribute(ctx, attribute);
}
function removeAttribute(ctx, attributes, name) {
	disposeAttribute(ctx, attributes[name]);
	delete attributes[name];
	const previousName = previousNames[name];
	if (!previousName) return;
	disposeAttribute(ctx, attributes[previousName]);
	delete attributes[previousName];
}
function updateAttribute(ctx, cached, entityId, name, value, geometryDirty) {
	if (!isAttribute(value)) return;
	if (isGpuBuffer(value)) {
		if (!geometryDirty) return;
		removeAttribute(ctx, cached, name);
		cached[name] = { buffer: value };
		return;
	}
	if (!(geometryDirty || value.dirty)) return;
	value.dirty = false;
	const previousName = previousNames[name];
	const descriptor = getAttributeDescriptor(value);
	if (descriptor?.buffer) {
		removeAttribute(ctx, cached, name);
		cached[name] = descriptor;
	} else {
		const data = getAttributeData(value);
		const attribute = cached[name];
		const options = {
			usage: "vertex",
			capacity: descriptor?.capacity,
			label: `${entityId} ${name}`
		};
		if (!attribute?.buffer) cached[name] = { buffer: writeBuffer(ctx, void 0, data, options) };
		else if (previousName) keepPreviousBuffer(ctx, cached, name, previousName, attribute, data, options);
		else attribute.buffer = writeBuffer(ctx, attribute.buffer, data, options);
	}
	setAttributeFields(cached[name], previousName ? cached[previousName] : void 0, {
		offset: descriptor?.offset,
		arrayStride: descriptor?.arrayStride,
		format: descriptor?.format,
		stepMode: descriptor?.stepMode ?? (instancedAttributes.has(name) ? "instance" : void 0)
	});
}
/**
* Geometry system
*
* Adds:
*
* - "bounds" to geometry components
* - "dirty" to geometry components properties
* - "_geometry" to entities as reference to internal cache
*/
var geometry_default$1 = ({ ctx }) => ({
	type: "geometry-system",
	cache: {},
	debug: false,
	updateBounds(geometry) {
		const positions = getAttributeData(geometry.positions);
		const offsets = geometry.offsets && getAttributeData(geometry.offsets);
		const bounds = geometry.bounds ||= create$6();
		if (offsets?.length) {
			fromPoints(bounds, offsets);
			fromPoints(TEMP_AABB, positions);
			add(bounds[0], TEMP_AABB[0]);
			add(bounds[1], TEMP_AABB[1]);
		} else fromPoints(bounds, positions);
		bounds.dirty = false;
	},
	updateGeometryEntity(entity) {
		const geometry = entity.geometry;
		const cachedGeom = this.cache[entity.id] ||= {
			geometry: null,
			attributes: {}
		};
		const cached = cachedGeom.attributes;
		if (this.debug && !cachedGeom.geometry) console.debug(NAMESPACE, this.type, "add to cache", entity.id, cachedGeom);
		const geometryDirty = cachedGeom.geometry !== geometry;
		if (geometryDirty) {
			if (this.debug) console.debug(NAMESPACE, this.type, "update", entity.id, geometry);
			cachedGeom.geometry = geometry;
			if (cachedGeom.customAttributes) for (let i = 0; i < cachedGeom.customAttributes.length; i++) {
				const attributeName = cachedGeom.customAttributes[i];
				if (!geometry.attributes?.[attributeName]) removeAttribute(ctx, cached, attributeName);
			}
			cachedGeom.customAttributes = geometry.attributes ? Object.keys(geometry.attributes) : [];
		}
		cachedGeom.instanceCount = geometry.instanceCount;
		cachedGeom.count = geometry.count;
		cachedGeom.topology = geometry.topology;
		const indicesValue = geometry[indicesProps.find((prop) => geometry[prop]) ?? indicesProps[0]];
		if (!indicesValue) {
			if (cachedGeom.indices) {
				disposeAttribute(ctx, cachedGeom.indices);
				cachedGeom.indices = void 0;
			}
		} else if (geometryDirty || indicesValue.dirty) {
			indicesValue.dirty = false;
			const descriptor = getAttributeDescriptor(indicesValue);
			if (descriptor?.buffer) {
				disposeAttribute(ctx, cachedGeom.indices);
				cachedGeom.indices = descriptor.buffer;
			} else {
				cachedGeom.indices = writeBuffer(ctx, cachedGeom.indices, getAttributeData(indicesValue), {
					usage: "index",
					capacity: descriptor?.capacity,
					label: `${entity.id} indices`
				});
				cachedGeom.indices.offset = descriptor?.offset;
			}
		}
		const boundsDirty = !geometry.bounds || geometry.bounds.dirty;
		for (let i = 0; i < attributeMapKeys.length; i++) {
			const attributeName = attributeMapKeys[i];
			const mapping = attributeMap[attributeName];
			const attributeValue = geometry[Array.isArray(mapping) ? mapping.find((prop) => geometry[prop]) ?? mapping[0] : mapping];
			if (attributeValue) updateAttribute(ctx, cached, entity.id, attributeName, attributeValue, geometryDirty);
			else if (cached[attributeName]) removeAttribute(ctx, cached, attributeName);
		}
		for (const attributeName in geometry.attributes) updateAttribute(ctx, cached, entity.id, attributeName, geometry.attributes[attributeName], geometryDirty);
		if (boundsDirty) this.updateBounds(geometry);
	},
	update(entities) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (entity.geometry) try {
				this.updateGeometryEntity(entity);
				entity._geometry = this.cache[entity.id];
			} catch (error) {
				console.error(NAMESPACE, this.type, "update failed", error, entity);
			}
		}
	},
	dispose(entities) {
		if (entities) for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (entity._geometry) {
				disposeGeometry(ctx, entity._geometry);
				delete this.cache[entity.id];
			}
		}
		else {
			for (const cachedGeom of Object.values(this.cache)) disposeGeometry(ctx, cachedGeom);
			this.cache = {};
		}
	}
});

/**
* @module typedArrayConstructor
*/
const upperBounds = /* @__PURE__ */ new Map();
upperBounds.set([Int8Array, Uint8Array], 255);
upperBounds.set([Int16Array, Uint16Array], 65535);
upperBounds.set([Int32Array, Uint32Array], 4294967295);
upperBounds.set([BigInt64Array, BigUint64Array], 2 ** 64 - 1);
const upperBoundsArray = Array.from(upperBounds.entries());
/**
* Get a typed array constructor based on the hypothetical max value it could contain. Signed or unsigned.
*
* @alias module:typedArrayConstructor
* @param {number} maxValue The max value expected.
* @param {boolean} signed Get a signed or unsigned array.
* @returns {(Uint8Array|Uint16Array|Uint32Array|BigInt64Array|Int8Array|Int16Array|Int32Array|BigInt64Array)}
* @see [MDN TypedArray objects]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#typedarray_objects}
*/
const typedArrayConstructor = (maxValue, signed) => {
	const value = signed ? Math.abs(maxValue) : Math.max(0, maxValue);
	return upperBoundsArray[upperBoundsArray.findLastIndex(([_, bound]) => value > Math[Math.sign(maxValue) === -1 ? "ceil" : "floor"](bound / (signed ? 2 : 1))) + 1][0][signed ? 0 : 1];
};

var GeomBuilder = class GeomBuilder {
	static indicesProps = ["cells", "indices"];
	static formatIndexKey(attributeName) {
		return `${attributeName}Index`;
	}
	static formatFunctionName(attributeName) {
		return `${attributeName[0].toUpperCase()}${attributeName.slice(1, -1)}`;
	}
	static expandFloatArray(a) {
		const biggerArray = new Float32Array(a.length * 2);
		biggerArray.set(a);
		return biggerArray;
	}
	static expandUintArray(a) {
		const biggerArray = new a.constructor(a.length * 2);
		biggerArray.set(a);
		return biggerArray;
	}
	get indexCount() {
		for (let attributeName of GeomBuilder.indicesProps) {
			const attributeIndexKey = GeomBuilder.formatIndexKey(attributeName);
			const indexCount = this[attributeIndexKey];
			if (indexCount !== void 0) return indexCount;
		}
	}
	constructor({ size = 32, ...attributes }) {
		this.count = 0;
		attributes ||= {};
		attributes.positions ??= 3;
		this.attributes = attributes;
		for (let [attributeName, attributeSize] of Object.entries(attributes)) {
			const isIndices = GeomBuilder.indicesProps.includes(attributeName);
			const attributeIndexKey = GeomBuilder.formatIndexKey(attributeName);
			const addFnName = `add${GeomBuilder.formatFunctionName(attributeName)}`;
			this[attributeIndexKey] = 0;
			if (isIndices) {
				const UintTypedArray = typedArrayConstructor(Math.max(256, size));
				this[attributeName] = new UintTypedArray(size * attributeSize);
			} else this[attributeName] = new Float32Array(size * attributeSize);
			this[addFnName] = (value) => {
				if (isIndices && Math.max(...value) > 65535 && this[attributeName].constructor !== Uint32Array) this[attributeName] = new Uint32Array(this[attributeName]);
				if (this[attributeIndexKey] + value.length >= this[attributeName].length) this[attributeName] = isIndices ? GeomBuilder.expandUintArray(this[attributeName]) : GeomBuilder.expandFloatArray(this[attributeName]);
				for (let i = 0; i < value.length; i++) this[attributeName][this[attributeIndexKey]++] = value[i];
				if (attributeName === "positions") this.count++;
			};
		}
	}
	reset() {
		for (let attributeName of Object.keys(this.attributes)) {
			const attributeIndexKey = GeomBuilder.formatIndexKey(attributeName);
			this[attributeIndexKey] = 0;
		}
		this.count = 0;
	}
};
function createGeomBuilder(opts) {
	return new GeomBuilder(opts);
}

const createHelperGeometry = () => Object.assign(createGeomBuilder({
	positions: 3,
	vertexColors: 4
}), geometry_default());
const pointsToLine = (points, closed = false) => points.reduce((line, p, i) => {
	if (!closed && i > 0) line.push([...points[i - 1]], p);
	else line.push(p, [...points[(i + 1) % points.length]]);
	return line;
}, []);
const getBBoxPositionsList = (bbox) => {
	const [[minX, minY, minZ], [maxX, maxY, maxZ]] = bbox;
	return [
		[
			minX,
			minY,
			minZ
		],
		[
			maxX,
			minY,
			minZ
		],
		[
			minX,
			minY,
			minZ
		],
		[
			minX,
			maxY,
			minZ
		],
		[
			minX,
			minY,
			minZ
		],
		[
			minX,
			minY,
			maxZ
		],
		[
			maxX,
			maxY,
			maxZ
		],
		[
			minX,
			maxY,
			maxZ
		],
		[
			maxX,
			maxY,
			maxZ
		],
		[
			maxX,
			minY,
			maxZ
		],
		[
			maxX,
			maxY,
			maxZ
		],
		[
			maxX,
			maxY,
			minZ
		],
		[
			maxX,
			minY,
			minZ
		],
		[
			maxX,
			minY,
			maxZ
		],
		[
			maxX,
			minY,
			minZ
		],
		[
			maxX,
			maxY,
			minZ
		],
		[
			minX,
			maxY,
			minZ
		],
		[
			maxX,
			maxY,
			minZ
		],
		[
			minX,
			maxY,
			minZ
		],
		[
			minX,
			maxY,
			maxZ
		],
		[
			minX,
			minY,
			maxZ
		],
		[
			minX,
			maxY,
			maxZ
		],
		[
			minX,
			minY,
			maxZ
		],
		[
			maxX,
			minY,
			maxZ
		]
	];
};
const getCirclePoints = ({ steps, axis = [0, 1], radius = 1, center = [
	0,
	0,
	0
] }) => {
	const points = [];
	for (let i = 0; i < steps; i++) {
		const t = i / steps * 2 * Math.PI;
		const x = Math.cos(t);
		const y = Math.sin(t);
		const pos = [
			0,
			0,
			0
		];
		pos[axis[0]] = x;
		pos[axis[1]] = y;
		scale(pos, radius);
		add(pos, center);
		points.push(pos);
	}
	return points;
};
const getPrismPositions = ({ radius }) => [
	[
		0,
		radius,
		0
	],
	[
		radius,
		0,
		0
	],
	[
		0,
		-radius,
		0
	],
	[
		radius,
		0,
		0
	],
	[
		0,
		radius,
		0
	],
	[
		-radius,
		0,
		0
	],
	[
		0,
		-radius,
		0
	],
	[
		-radius,
		0,
		0
	],
	[
		0,
		radius,
		0
	],
	[
		0,
		0,
		radius
	],
	[
		0,
		-radius,
		0
	],
	[
		0,
		0,
		radius
	],
	[
		0,
		radius,
		0
	],
	[
		0,
		0,
		-radius
	],
	[
		0,
		-radius,
		0
	],
	[
		0,
		0,
		-radius
	],
	[
		-radius,
		0,
		0
	],
	[
		0,
		0,
		-radius
	],
	[
		radius,
		0,
		0
	],
	[
		0,
		0,
		-radius
	],
	[
		radius,
		0,
		0
	],
	[
		0,
		0,
		radius
	],
	[
		-radius,
		0,
		0
	],
	[
		0,
		0,
		radius
	]
];
const getQuadPositions = ({ width = 1, height = 1, size = 2 } = {}) => [
	[
		-1,
		-1,
		0
	],
	[
		1,
		-1,
		0
	],
	[
		1,
		-1,
		0
	],
	[
		1,
		1,
		0
	],
	[
		1,
		1,
		0
	],
	[
		-1,
		1,
		0
	],
	[
		-1,
		1,
		0
	],
	[
		-1,
		-1,
		0
	],
	[
		-1,
		-1,
		0
	],
	[
		1,
		1,
		0
	],
	[
		-1,
		1,
		0
	],
	[
		1,
		-1,
		0
	],
	[
		-1,
		-1,
		0
	],
	[
		-1,
		-1,
		size
	],
	[
		1,
		-1,
		0
	],
	[
		1,
		-1,
		size
	],
	[
		1,
		1,
		0
	],
	[
		1,
		1,
		size
	],
	[
		-1,
		1,
		0
	],
	[
		-1,
		1,
		size
	],
	[
		0,
		0,
		0
	],
	[
		0,
		0,
		size
	]
].map((p) => [
	p[0] * width / 2,
	p[1] * height / 2,
	p[2]
]);
const getPyramidEdgePositions = ({ sx, sy = sx, sz = sx }) => [
	[
		0,
		0,
		0
	],
	[
		-sx,
		sy,
		sz
	],
	[
		0,
		0,
		0
	],
	[
		sx,
		sy,
		sz
	],
	[
		0,
		0,
		0
	],
	[
		sx,
		-sy,
		sz
	],
	[
		0,
		0,
		0
	],
	[
		-sx,
		-sy,
		sz
	]
];
const getDirectionalLight = ({ transform }) => {
	const size = length(transform.scale);
	const prismRadius = size * .1;
	return getPrismPositions({ radius: prismRadius }).concat([
		[
			0,
			0,
			prismRadius
		],
		[
			0,
			0,
			size
		],
		[
			prismRadius,
			0,
			0
		],
		[
			prismRadius,
			0,
			size
		],
		[
			-prismRadius,
			0,
			0
		],
		[
			-prismRadius,
			0,
			size
		],
		[
			0,
			prismRadius,
			0
		],
		[
			0,
			prismRadius,
			size
		],
		[
			0,
			-prismRadius,
			0
		],
		[
			0,
			-prismRadius,
			size
		]
	]);
};
const HELPER_RANGE = 10;
const helperRange = (range) => Number.isFinite(range) ? range : HELPER_RANGE;
const getPointLight = (pointLight) => {
	const radius = helperRange(pointLight.range) / 2;
	const prismRadius = radius * .1;
	return getPrismPositions({ radius: prismRadius }).concat([
		[
			prismRadius,
			0,
			0
		],
		[
			radius,
			0,
			0
		],
		[
			-prismRadius,
			0,
			0
		],
		[
			-radius,
			0,
			0
		],
		[
			0,
			prismRadius,
			0
		],
		[
			0,
			radius,
			0
		],
		[
			0,
			-prismRadius,
			0
		],
		[
			0,
			-radius,
			0
		],
		[
			0,
			0,
			prismRadius
		],
		[
			0,
			0,
			radius
		],
		[
			0,
			0,
			-prismRadius
		],
		[
			0,
			0,
			-radius
		]
	]);
};
const spotLightCircleOptions = {
	steps: 32,
	axis: [0, 1]
};
const getSpotLight = (spotLight) => {
	const distance = helperRange(spotLight.range);
	const radius = distance * Math.tan(spotLight.outerConeAngle);
	const innerRadius = distance * Math.tan(spotLight.innerConeAngle);
	return getPyramidEdgePositions({
		sx: radius * Math.sin(Math.PI / 4),
		sz: distance
	}).concat(pointsToLine(getCirclePoints({
		radius,
		center: [
			0,
			0,
			distance
		],
		...spotLightCircleOptions
	}), true)).concat(pointsToLine(getCirclePoints({
		radius: innerRadius,
		center: [
			0,
			0,
			distance
		],
		...spotLightCircleOptions
	}), true));
};
const areaLightCircleOptions = {
	axis: [0, 1],
	radius: .5
};
const getAreaLight = ({ areaLight, transform }) => {
	const size = length(transform.scale);
	if (areaLight.disk) {
		const steps = 16;
		const circlePoints = getCirclePoints({
			...areaLightCircleOptions,
			steps
		});
		const z = [
			0,
			0,
			size
		];
		return pointsToLine(circlePoints, true).concat(circlePoints.flatMap((p) => [[...p], add([...p], z)])).concat([
			[...circlePoints[steps / 8]],
			[...circlePoints[steps * (5 / 8)]],
			[...circlePoints[steps * (3 / 8)]],
			[...circlePoints[steps * (7 / 8)]]
		]);
	}
	return getQuadPositions({ size });
};
const getPerspectiveCamera = (camera) => {
	const { fov, near, far, aspect } = camera;
	const nearHalfHeight = Math.tan(fov / 2) * near;
	const farHalfHeight = Math.tan(fov / 2) * far;
	const nearHalfWidth = nearHalfHeight * aspect;
	const farHalfWidth = farHalfHeight * aspect;
	return [
		...getPyramidEdgePositions({
			sx: farHalfWidth,
			sy: farHalfHeight,
			sz: -far
		}),
		...pointsToLine([
			[
				-farHalfWidth,
				farHalfHeight,
				-far
			],
			[
				farHalfWidth,
				farHalfHeight,
				-far
			],
			[
				farHalfWidth,
				-farHalfHeight,
				-far
			],
			[
				-farHalfWidth,
				-farHalfHeight,
				-far
			],
			[
				-farHalfWidth,
				farHalfHeight,
				-far
			]
		]),
		...pointsToLine([
			[
				-nearHalfWidth,
				nearHalfHeight,
				-near
			],
			[
				nearHalfWidth,
				nearHalfHeight,
				-near
			],
			[
				nearHalfWidth,
				-nearHalfHeight,
				-near
			],
			[
				-nearHalfWidth,
				-nearHalfHeight,
				-near
			],
			[
				-nearHalfWidth,
				nearHalfHeight,
				-near
			]
		])
	];
};
const getOrthographicCamera = (camera) => {
	const { near, far, zoom, left, right, top, bottom, view } = camera;
	let minX = (right + left) / 2 - (right - left) / (2 / zoom);
	let maxX = (right + left) / 2 + (right - left) / (2 / zoom);
	let maxY = (top + bottom) / 2 + (top - bottom) / (2 / zoom);
	let minY = (top + bottom) / 2 - (top - bottom) / (2 / zoom);
	if (view) {
		const size = view.size;
		const totalSize = view.totalSize;
		const offset = view.offset;
		const zoomW = 1 / zoom / (size[0] / totalSize[0]);
		const zoomH = 1 / zoom / (size[1] / totalSize[1]);
		const scaleW = (right - left) / size[0];
		const scaleH = (top - bottom) / size[1];
		minX += scaleW * (offset[0] / zoomW);
		maxX = minX + scaleW * (size[0] / zoomW);
		maxY -= scaleH * (offset[1] / zoomH);
		minY = maxY - scaleH * (size[1] / zoomH);
	}
	return getBBoxPositionsList([[
		minX,
		maxY,
		-near
	], [
		maxX,
		minY,
		-far
	]]);
};
const AXES_COLORS = [
	[
		1,
		0,
		0,
		1
	],
	[
		1,
		0,
		0,
		1
	],
	[
		0,
		1,
		0,
		1
	],
	[
		0,
		1,
		0,
		1
	],
	[
		0,
		0,
		1,
		1
	],
	[
		0,
		0,
		1,
		1
	]
];
const AXES_POSITIONS = [
	[
		0,
		0,
		0
	],
	[
		1,
		0,
		0
	],
	[
		0,
		0,
		0
	],
	[
		0,
		1,
		0
	],
	[
		0,
		0,
		0
	],
	[
		0,
		0,
		1
	]
];
const getGridLines = ({ size = 1, step = 10 } = {}) => {
	const subdivisions = Math.max(Math.ceil(size), 2);
	const halfSize = size * .5;
	return Array.from({ length: step + 1 }, (_, k) => {
		const offset = size * (k / step) - halfSize;
		const a = [
			-halfSize,
			0,
			offset
		];
		const b = [
			halfSize,
			0,
			offset
		];
		return pointsToLine(Array.from({ length: subdivisions }, (_, l) => lerp([...a], b, l / (subdivisions - 1))));
	});
};
const getGrid = (grid) => [...getGridLines(grid).flat(), ...getGridLines(grid).flat().map((p) => p.reverse())];
/** One flat typed array, or one array per vertex. */
const isFlatArray = (data) => !Array.isArray(data[0]);
const getVertexAttributeData = (geometry, attributeName) => {
	const attribute = geometry[attributeName];
	return attribute && getAttributeData(attribute);
};
const getVertexVector = (geometry, attributeName, size = .1, modelMatrix) => {
	const positions = getVertexAttributeData(geometry, "positions");
	const attribute = getVertexAttributeData(geometry, attributeName);
	if (!attribute || !positions) return [];
	const instances = geometry.instanceCount || 1;
	const isAttributeFlatArray = isFlatArray(attribute);
	const isPositionsFlatArray = isFlatArray(positions);
	const positionCount = positions.length / (isPositionsFlatArray ? 3 : 1);
	const offsets = geometry.offsets;
	const isOffsetsFlatArray = !!offsets && isFlatArray(offsets);
	const scales = geometry.scales;
	const isScalesFlatArray = !!scales && isFlatArray(scales);
	const rotations = geometry.rotations;
	const isRotationsFlatArray = !!rotations && isFlatArray(rotations);
	const lines = Array.from({ length: instances * positionCount * 2 });
	let cellIndex = 0;
	const offset = create();
	const scale = [
		1,
		1,
		1
	];
	const rotation = create$2();
	identity(TEMP_MAT4);
	const worldPosition = create();
	const vector = create();
	for (let i = 0; i < instances; i++) {
		if (offsets) {
			if (isOffsetsFlatArray) set$3(offset, 0, offsets, i);
			else set(offset, offsets[i]);
		}
		if (scales) {
			if (isScalesFlatArray) set$3(scale, 0, scales, i);
			else set(scale, scales[i]);
		}
		if (rotations) {
			if (isRotationsFlatArray) set$4(rotation, 0, rotations, i);
			else set$1(rotation, rotations[i]);
			fromQuat(TEMP_MAT4, rotation);
		}
		for (let j = 0; j < positionCount; j++) {
			if (isPositionsFlatArray) set$3(worldPosition, 0, positions, j);
			else set(worldPosition, positions[j]);
			if (isAttributeFlatArray) set$3(vector, 0, attribute, j);
			else set(vector, attribute[j]);
			set(TEMP_VEC3, worldPosition);
			addScaled(TEMP_VEC3, vector, size);
			set(vector, TEMP_VEC3);
			if (scales) {
				worldPosition[0] *= scale[0];
				worldPosition[1] *= scale[1];
				worldPosition[2] *= scale[2];
				vector[0] *= scale[0];
				vector[1] *= scale[1];
				vector[2] *= scale[2];
			}
			if (rotations) {
				multMat4(worldPosition, TEMP_MAT4);
				multMat4(vector, TEMP_MAT4);
			}
			if (offsets) {
				add(worldPosition, offset);
				add(vector, offset);
			}
			multMat4(worldPosition, modelMatrix);
			multMat4(vector, modelMatrix);
			lines[cellIndex] = [...worldPosition];
			lines[cellIndex + 1] = [...vector];
			cellIndex += 2;
		}
	}
	return lines;
};
const SKIN_MAT4 = create$1();
const SKIN_PARENT_MAT4 = create$1();
const getPositionFromMat4 = (m) => [
	m[12],
	m[13],
	m[14]
];
const getSkeleton = (skin, modelMatrix) => {
	const positions = [];
	set$2(TEMP_MAT4, modelMatrix);
	invert(TEMP_MAT4);
	const joints = skin.joints;
	for (let i = 0; i < joints.length; i++) {
		const joint = joints[i];
		const jointMatrix = joint._transform?.modelMatrix;
		const parentMatrix = joint.transform?.parent?.entity?._transform?.modelMatrix;
		if (jointMatrix && parentMatrix) {
			set$2(SKIN_PARENT_MAT4, TEMP_MAT4);
			mult(SKIN_PARENT_MAT4, parentMatrix);
			positions.push(getPositionFromMat4(SKIN_PARENT_MAT4));
			set$2(SKIN_MAT4, TEMP_MAT4);
			mult(SKIN_MAT4, jointMatrix);
			positions.push(getPositionFromMat4(SKIN_MAT4));
		}
	}
	return positions;
};
/** Helper system */
var helper_default = () => ({
	type: "helper-system",
	cache: {},
	debug: false,
	lineWidth: 2,
	getEntities: (cacheId) => [
		entity_default({
			name: `helper-${cacheId}`,
			transform: transform_default(),
			geometry: createHelperGeometry(),
			material: material_default({
				type: "line",
				lineWidth: 1,
				perspectiveScaling: false,
				depthWriteEnabled: true
			})
		}),
		entity_default({
			name: `helper-no-depth-${cacheId}`,
			transform: transform_default(),
			geometry: createHelperGeometry(),
			material: material_default({
				type: "line",
				lineWidth: 1,
				perspectiveScaling: false,
				depthWriteEnabled: false,
				depthCompare: "always"
			})
		}),
		entity_default({
			name: `helper-biased-${cacheId}`,
			transform: transform_default(),
			geometry: createHelperGeometry(),
			material: material_default({
				type: "line",
				lineWidth: 1,
				perspectiveScaling: false,
				depthWriteEnabled: true,
				depthBias: -16,
				depthBiasSlopeScale: 0
			})
		})
	],
	addToBuilder(builder, positions, color = [
		.23,
		.23,
		.23,
		1
	], lineWidth, modelMatrix) {
		const colors = Array.isArray(color[0]) ? color : null;
		let vertexColor;
		if (!colors) {
			vertexColor = [...color];
			vertexColor[3] *= lineWidth;
		}
		for (let i = 0; i < positions.length; i++) {
			const position = positions[i];
			if (modelMatrix) multMat4(position, modelMatrix);
			if (colors) {
				vertexColor = [...colors[i % colors.length]];
				vertexColor[3] *= lineWidth;
			}
			builder.addPosition(position);
			builder.addVertexColor(vertexColor);
		}
	},
	update(entities, { renderView, renderEngine }) {
		const cacheId = renderView.cameraEntity.id;
		const helperEntities = this.cache[cacheId] ||= this.getEntities(cacheId);
		const [{ geometry: geomBuilder }, { geometry: geomNoDepthBuilder }, { geometry: geomBiasedBuilder }] = helperEntities;
		geomBuilder.reset();
		geomNoDepthBuilder.reset();
		geomBiasedBuilder.reset();
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			const modelMatrix = entity._transform?.modelMatrix;
			const lineWidth = this.lineWidth;
			if (entity.transform?.worldBounds && entity.boundingBoxHelper) this.addToBuilder(geomBiasedBuilder, getBBoxPositionsList(entity.transform.worldBounds), entity.boundingBoxHelper.color, lineWidth);
			if (entity.vertexHelper) {
				const helpers = Array.isArray(entity.vertexHelper) ? entity.vertexHelper : [entity.vertexHelper];
				for (let j = 0; j < helpers.length; j++) {
					const helper = helpers[j];
					if (entity.geometry[helper.attribute]) this.addToBuilder(geomBuilder, getVertexVector(entity.geometry, helper.attribute, helper.size, modelMatrix), helper.color, lineWidth * .2);
				}
			}
			if (entity.skin && entity.skeletonHelper) this.addToBuilder(geomNoDepthBuilder, getSkeleton(entity.skin, modelMatrix), entity.skeletonHelper.color, lineWidth, modelMatrix);
			if (entity.lightHelper) {
				if (entity.directionalLight) this.addToBuilder(geomBuilder, getDirectionalLight(entity), entity.directionalLight.color, lineWidth, modelMatrix);
				if (entity.pointLight) this.addToBuilder(geomBuilder, getPointLight(entity.pointLight), entity.pointLight.color, lineWidth, modelMatrix);
				if (entity.spotLight) this.addToBuilder(geomBuilder, getSpotLight(entity.spotLight), entity.spotLight.color, lineWidth, modelMatrix);
				if (entity.areaLight) this.addToBuilder(geomBuilder, getAreaLight(entity), entity.areaLight.color, lineWidth, modelMatrix);
			}
			if (entity.cameraHelper && entity.camera && renderView.camera !== entity.camera) this.addToBuilder(geomBuilder, entity.camera.projection === "orthographic" ? getOrthographicCamera(entity.camera) : getPerspectiveCamera(entity.camera), entity.cameraHelper.color, lineWidth, modelMatrix);
			if (entity.gridHelper) this.addToBuilder(geomBuilder, getGrid(entity.gridHelper), entity.gridHelper.color, lineWidth, modelMatrix);
			if (entity.axesHelper) this.addToBuilder(geomBiasedBuilder, AXES_POSITIONS.map((p) => [...p]), AXES_COLORS.map((p) => [...p]), lineWidth, modelMatrix);
		}
		for (let i = 0; i < helperEntities.length; i++) {
			const entity = helperEntities[i];
			entity.geometry.positions.fill(0, entity.geometry.count * 3);
			entity.geometry.vertexColors.fill(0, entity.geometry.count * 4);
			entity.geometry.positions.dirty = true;
			entity.geometry.vertexColors.dirty = true;
			if (entity.geometry.bounds) entity.geometry.bounds.dirty = true;
		}
		renderEngine.systems.find(({ type }) => type === "geometry-system").update(helperEntities);
		renderEngine.systems.find(({ type }) => type === "transform-system").update(helperEntities);
		return { entities: helperEntities };
	}
});

/** Layer system */
var layer_default = () => ({
	type: "layer-system",
	update(entities) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (!entity.transform) continue;
			if (!entity.layer) {
				let parentTransform = entity.transform.parent;
				entity.layer = void 0;
				while (parentTransform) {
					const parentLayer = parentTransform.entity?.layer;
					if (parentLayer) {
						entity.layer = parentLayer;
						break;
					}
					parentTransform = parentTransform.parent;
				}
			}
		}
	}
});

const Z_UP_4 = Object.freeze([
	0,
	0,
	1,
	0
]);
const getInvSqrFalloff = (range) => Number.isFinite(range) && range > 0 ? 1 / (range * range) : 0;
/**
* Light system
*
* Adds:
*
* - "_viewMatrix" to light components (the shadow projection is fitted per camera
*   layer and lives on the render pipeline's LightShadow instead)
* - "_direction" to directional and spot light components
* - "_intensity" to every light component: the authored intensity converted to
*   the unit the shaders integrate (see utils.ts)
* - "_invSqrFalloff" to point and spot light components
*/
var light_default = () => ({
	type: "light-system",
	updateLight(light, transform) {
		light._viewMatrix ??= create$1();
		if (!transform) return;
		light._direction ??= create();
		set$5(TEMP_VEC4, Z_UP_4);
		multMat4$1(TEMP_VEC4, transform.modelMatrix);
		set(light._direction, TEMP_VEC4);
		normalize$1(light._direction);
		add(TEMP_VEC4, transform.worldPosition);
		lookAt(light._viewMatrix, transform.worldPosition, TEMP_VEC4, Y_UP);
	},
	update(entities) {
		for (let i = 0; i < entities.length; i++) {
			const { ambientLight, directionalLight, spotLight, pointLight, areaLight, transform, _transform } = entities[i];
			if (ambientLight) ambientLight._intensity = ambientLight.intensity;
			if (directionalLight) {
				this.updateLight(directionalLight, _transform);
				directionalLight._intensity = directionalLight.intensity;
			}
			if (spotLight) {
				this.updateLight(spotLight, _transform);
				spotLight._intensity = spotPowerToIntensity(spotLight.intensity, spotLight.outerConeAngle, spotLight.focusedSpot);
				spotLight._invSqrFalloff = getInvSqrFalloff(spotLight.range);
			}
			if (areaLight) {
				this.updateLight(areaLight, _transform);
				const scale = transform?.scale;
				areaLight._intensity = areaPowerToLuminance(areaLight.intensity, scale?.[0] ?? 1, scale?.[1] ?? 1, areaLight.disk, areaLight.doubleSided);
			}
			if (pointLight) {
				this.updateLight(pointLight);
				pointLight._intensity = pointPowerToIntensity(pointLight.intensity);
				pointLight._invSqrFalloff = getInvSqrFalloff(pointLight.range);
			}
		}
	}
});

function updateMorph(morph) {
	const current = morph.current ??= {};
	const weights = morph.weights ?? [];
	Object.keys(morph.sources).forEach((key) => {
		const sourceAttributes = morph.sources[key];
		const targetAttributes = morph.targets[key];
		current[key] = sourceAttributes.map((source, i) => {
			if (typeof source === "number") {
				let attribute = source;
				for (let j = 0; j < targetAttributes.length; j++) attribute += targetAttributes[j][i] * weights[j];
				return attribute;
			}
			const attribute = [
				source[0],
				source[1],
				source[2]
			];
			for (let j = 0; j < targetAttributes.length; j++) {
				const target = targetAttributes[j][i];
				const weight = weights[j];
				attribute[0] += target[0] * weight;
				attribute[1] += target[1] * weight;
				attribute[2] += target[2] * weight;
			}
			return attribute;
		});
	});
}
/** Morph system */
var morph_default$1 = () => ({
	type: "morph-system",
	updateMorph,
	update(entities) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (!entity.morph) continue;
			updateMorph(entity.morph);
			const current = entity.morph.current;
			const geometry = entity.geometry;
			Object.keys(current).forEach((key) => {
				geometry[key] = current[key];
				geometry[key].dirty = true;
			});
		}
	}
});

var light_ambient_default = `
// color.w is luminance (cd/m²), matching the image based lighting it stands in
// for: an environment of uniform luminance L irradiates a surface with πL, and
// the Lambertian 1/π cancels it back to L.
fn EvaluateAmbientLight(data: ptr<function, PBRData>, light: SceneLight, ao: f32) {
  var lightColor = decode(light.color, SRGB).xyz;
  lightColor *= light.color.w;
  data.indirectDiffuse += ao * (data.diffuseColor * lightColor);
}
`;

var light_directional_default = `
fn EvaluateDirectionalLight(
  data: ptr<function, PBRData>,
  light: SceneLight,
  positionWorld: vec3f,
  fragCoord: vec2f
) {
  // Camera-independent normal-offset bias before projection. Orthographic frustum
  // height is distance-independent: 2/projection[1][1] over the map size.
  let NdotL = dot(data.normalWorld, -light.direction);
  let texelWorldSize = 2.0 / (abs(light.projectionMatrix[1][1]) * light.shadowMapSize.y);
  let shadowPos = normalOffsetBias(positionWorld, data.normalWorld, NdotL, texelWorldSize);

  let lightViewPosition = light.viewMatrix * vec4f(shadowPos, 1.0);
  let lightDeviceCoordsPosition = light.projectionMatrix * lightViewPosition;
  let lightDeviceCoordsPositionNormalized = lightDeviceCoordsPosition.xyz / lightDeviceCoordsPosition.w;
  // WebGPU texture origin is top-left, so flip v relative to clip space.
  let lightUV = vec2f(
    lightDeviceCoordsPositionNormalized.x * 0.5 + 0.5,
    0.5 - lightDeviceCoordsPositionNormalized.y * 0.5,
  );
  // Computed here (uniform control flow) so the receiver-plane bias can use
  // screen-space derivatives; the shadow lookup below is behind a branch.
  let dzDuv = depthGradient(lightUV, lightDeviceCoordsPositionNormalized.z);

  var illuminated = 1.0;
  if (light.castShadows != 0u) {
    illuminated = sampleShadowMap2D(
      light.shadowBucket,
      light.shadowLayer,
      light.shadowMapSize,
      lightUV,
      lightDeviceCoordsPositionNormalized.z,
      light.near,
      light.far,
      light.radiusUV,
      dzDuv,
      true,
      fragCoord
    );
  }

  if (illuminated > 0.0) {
    var l: Light;
    l.l = -light.direction;
    l.color = light.color;
    l.attenuation = 1.0;
    getSurfaceShading(data, l, illuminated);
  }
}
`;

var light_point_default = `
fn EvaluatePointLight(
  data: ptr<function, PBRData>,
  light: SceneLight,
  fragCoord: vec2f
) {
  let positionToLightWorld = data.positionWorld - light.position;

  var illuminated = 1.0;
  if (light.castShadows != 0u) {
    // The cube stores normalized radial distance from the light; compare the
    // receiver's own normalized distance. The bias is a relative epsilon
    // (scales with far), so it stays scene-adaptive.
    let compare = length(positionToLightWorld) / light.far - light.depthBiasNormalized;

    illuminated = sampleShadowMapCube(
      light.shadowBucket,
      light.shadowLayer,
      light.shadowMapSize,
      positionToLightWorld,
      compare,
      light.radius,
      light.far,
      fragCoord
    );
  }

  if (illuminated > 0.0) {
    let attenuation = getDistanceAttenuation(positionToLightWorld, light.invSqrFalloff);

    var l: Light;
    l.l = -normalize(positionToLightWorld);
    l.color = light.color;
    l.attenuation = attenuation;
    getSurfaceShading(data, l, illuminated);
  }
}
`;

var light_spot_default = `
fn EvaluateSpotLight(
  data: ptr<function, PBRData>,
  light: SceneLight,
  positionWorld: vec3f,
  fragCoord: vec2f
) {
  // Camera-independent normal-offset bias before projection. texelWorldSize is
  // the perspective frustum width at the receiver over the map size:
  // 2·dist·tan(halfFovY)/size, with tan(halfFovY) = 1/projection[1][1].
  let L = normalize(light.position - positionWorld);
  let NdotL = dot(data.normalWorld, L);
  let receiverDist = -(light.viewMatrix * vec4f(positionWorld, 1.0)).z;
  let texelWorldSize = 2.0 * max(receiverDist, 0.0) / (abs(light.projectionMatrix[1][1]) * light.shadowMapSize.y);
  let shadowPos = normalOffsetBias(positionWorld, data.normalWorld, NdotL, texelWorldSize);

  let lightViewPosition = light.viewMatrix * vec4f(shadowPos, 1.0);
  let lightDeviceCoordsPosition = light.projectionMatrix * lightViewPosition;
  let lightDeviceCoordsPositionNormalized = lightDeviceCoordsPosition.xyz / lightDeviceCoordsPosition.w;
  // WebGPU texture origin is top-left, so flip v relative to clip space.
  let lightUV = vec2f(
    lightDeviceCoordsPositionNormalized.x * 0.5 + 0.5,
    0.5 - lightDeviceCoordsPositionNormalized.y * 0.5,
  );
  // Computed here (uniform control flow) so the receiver-plane bias can use
  // screen-space derivatives; the shadow lookup below is behind a branch.
  let dzDuv = depthGradient(lightUV, lightDeviceCoordsPositionNormalized.z);

  var illuminated = 1.0;
  if (light.castShadows != 0u) {
    illuminated = sampleShadowMap2D(
      light.shadowBucket,
      light.shadowLayer,
      light.shadowMapSize,
      lightUV,
      lightDeviceCoordsPositionNormalized.z,
      light.near,
      light.far,
      light.radiusUV,
      dzDuv,
      false,
      fragCoord
    );
  }

  if (illuminated > 0.0) {
    let posToLight = light.position - data.positionWorld;

    var attenuation = getDistanceAttenuation(posToLight, light.invSqrFalloff);

    let cosOuter = cos(light.outerConeAngle);
    let cosInner = cos(light.innerConeAngle);
    let scale = 1.0 / max(1.0 / 1024.0, cosInner - cosOuter);
    let offset = -cosOuter * scale;

    let scaleOffset = vec2f(scale, offset);
    attenuation *= getAngleAttenuation(-light.direction, normalize(posToLight), scaleOffset);

    var l: Light;
    l.l = normalize(posToLight);
    l.color = light.color;
    l.attenuation = attenuation;
    getSurfaceShading(data, l, illuminated);
  }
}
`;

var light_area_default = `
const clipless = false;
const groundTruth = false;

const LUT_SIZE: f32 = 64.0;
const LUT_SCALE: f32 = (LUT_SIZE - 1.0) / LUT_SIZE;
const LUT_BIAS: f32 = 0.5 / LUT_SIZE;

// Disk
const NUM_SAMPLES: i32 = 8;
const sampleCount: i32 = 4;
const pi: f32 = 3.14159265;
const NO_HIT: f32 = 1e9;

struct Ray {
  origin: vec3f,
  dir: vec3f,
};

struct Disk {
  center: vec3f,
  dirx: vec3f,
  diry: vec3f,
  halfx: f32,
  halfy: f32,

  plane: vec4f,
};

fn RayPlaneIntersect(ray: Ray, plane: vec4f) -> f32 {
  let t = -dot(plane, vec4f(ray.origin, 1.0)) / dot(plane.xyz, ray.dir);
  return select(NO_HIT, t, t > 0.0);
}

fn sqr(x: f32) -> f32 {
  return x * x;
}

fn RayDiskIntersect(ray: Ray, disk: Disk) -> f32 {
  var t = RayPlaneIntersect(ray, disk.plane);
  if (t != NO_HIT) {
    let pos = ray.origin + ray.dir * t;
    let lpos = pos - disk.center;

    let x = dot(lpos, disk.dirx);
    let y = dot(lpos, disk.diry);

    if (sqr(x / disk.halfx) + sqr(y / disk.halfy) > 1.0) {
      t = NO_HIT;
    }
  }

  return t;
}

fn mat3_from_columns(c0: vec3f, c1: vec3f, c2: vec3f) -> mat3x3f {
  return mat3x3f(c0, c1, c2);
}

fn Halton(index: i32, base: f32) -> f32 {
  var result = 0.0;
  var f = 1.0 / base;
  var i = f32(index);
  for (var x = 0; x < 8; x++) {
    if (i <= 0.0) {
      break;
    }

    result += f * glslModF32(i, base);
    i = floor(i / base);
    f = f / base;
  }

  return result;
}

fn Halton2D(s: ptr<function, array<vec2f, 8>>, offset: i32) {
  for (var i = 0; i < NUM_SAMPLES; i++) {
    (*s)[i].x = Halton(i + offset, 2.0);
    (*s)[i].y = Halton(i + offset, 3.0);
  }
}

fn InitDisk(center: vec3f, dirx: vec3f, diry: vec3f, halfx: f32, halfy: f32) -> Disk {
  var disk: Disk;

  disk.center = center;
  disk.dirx = dirx;
  disk.diry = diry;
  disk.halfx = halfx;
  disk.halfy = halfy;

  let diskNormal = cross(disk.dirx, disk.diry);
  disk.plane = vec4f(diskNormal, -dot(diskNormal, disk.center));

  return disk;
}

// An extended version of the implementation from
// "How to solve a cubic equation, revisited"
// http://momentsingraphics.de/?p=105
fn SolveCubic(coefficientIn: vec4f) -> vec3f {
  var Coefficient = coefficientIn;
  // Normalize the polynomial
  Coefficient = vec4f(Coefficient.xyz / Coefficient.w, Coefficient.w);
  // Divide middle coefficients by three
  Coefficient = vec4f(Coefficient.x, Coefficient.yz / 3.0, Coefficient.w);

  let A = Coefficient.w;
  let B = Coefficient.z;
  let C = Coefficient.y;
  let D = Coefficient.x;

  // Compute the Hessian and the discriminant
  let Delta = vec3f(
    -Coefficient.z * Coefficient.z + Coefficient.y,
    -Coefficient.y * Coefficient.z + Coefficient.x,
    dot(vec2f(Coefficient.z, -Coefficient.y), Coefficient.xy)
  );

  let Discriminant = dot(vec2f(4.0 * Delta.x, -Delta.y), Delta.zy);

  var xlc: vec2f;
  var xsc: vec2f;

  // Algorithm A
  {
    let C_a = Delta.x;
    let D_a = -2.0 * B * Delta.x + Delta.y;

    // Take the cubic root of a normalized complex number
    let Theta = atan2(sqrt(Discriminant), -D_a) / 3.0;

    let x_1a = 2.0 * sqrt(-C_a) * cos(Theta);
    let x_3a = 2.0 * sqrt(-C_a) * cos(Theta + (2.0 / 3.0) * pi);

    let xl = select(x_3a, x_1a, (x_1a + x_3a) > 2.0 * B);

    xlc = vec2f(xl - B, A);
  }

  // Algorithm D
  {
    let C_d = Delta.z;
    let D_d = -D * Delta.y + 2.0 * C * Delta.z;

    // Take the cubic root of a normalized complex number
    let Theta = atan2(D * sqrt(Discriminant), -D_d) / 3.0;

    let x_1d = 2.0 * sqrt(-C_d) * cos(Theta);
    let x_3d = 2.0 * sqrt(-C_d) * cos(Theta + (2.0 / 3.0) * pi);

    let xs = select(x_3d, x_1d, x_1d + x_3d < 2.0 * C);

    xsc = vec2f(-D, xs + C);
  }

  let E = xlc.y * xsc.y;
  let F = -xlc.x * xsc.y - xlc.y * xsc.x;
  let G = xlc.x * xsc.x;

  let xmc = vec2f(C * F - B * G, -B * F + C * E);

  var Root = vec3f(xsc.x / xsc.y, xmc.x / xmc.y, xlc.x / xlc.y);

  if (Root.x < Root.y && Root.x < Root.z) {
    Root = Root.yxz;
  } else if (Root.z < Root.x && Root.z < Root.y) {
    Root = Root.xzy;
  }

  return Root;
}

fn LTC_EvaluateDisk(
  N: vec3f,
  V: vec3f,
  P: vec3f,
  Minv: mat3x3f,
  points: array<vec3f, 4>,
  twoSided: bool,
  u1: f32,
  u2: f32,
  ltc2: texture_2d<f32>,
  ltc2Sampler: sampler
) -> vec3f {
  // construct orthonormal basis around N
  let T1 = normalize(V - N * dot(V, N));
  let T2 = cross(N, T1);

  // rotate area light in (T1, T2, N) basis
  let R = transpose(mat3x3f(T1, T2, N));

  // polygon (allocate 5 vertices for clipping)
  var L_: array<vec3f, 3>;
  L_[0] = R * (points[0] - P);
  L_[1] = R * (points[1] - P);
  L_[2] = R * (points[2] - P);

  var Lo_i = vec3f(0.0);

  // init ellipse
  var C = 0.5 * (L_[0] + L_[2]);
  var V1 = 0.5 * (L_[1] - L_[2]);
  var V2 = 0.5 * (L_[1] - L_[0]);

  C = Minv * C;
  V1 = Minv * V1;
  V2 = Minv * V2;

  if (!twoSided && dot(cross(V1, V2), C) < 0.0) {
    return vec3f(0.0);
  }

  // compute eigenvectors of ellipse
  var a: f32;
  var b: f32;
  let d11 = dot(V1, V1);
  let d22 = dot(V2, V2);
  let d12 = dot(V1, V2);
  if (abs(d12) / sqrt(d11 * d22) > 0.0001) {
    let tr = d11 + d22;
    var det = -d12 * d12 + d11 * d22;

    // use sqrt matrix to solve for eigenvalues
    det = sqrt(det);
    let u = 0.5 * sqrt(tr - 2.0 * det);
    let v = 0.5 * sqrt(tr + 2.0 * det);
    let e_max = sqr(u + v);
    let e_min = sqr(u - v);

    var V1_: vec3f;
    var V2_: vec3f;

    if (d11 > d22) {
      V1_ = d12 * V1 + (e_max - d11) * V2;
      V2_ = d12 * V1 + (e_min - d11) * V2;
    } else {
      V1_ = d12 * V2 + (e_max - d22) * V1;
      V2_ = d12 * V2 + (e_min - d22) * V1;
    }

    a = 1.0 / e_max;
    b = 1.0 / e_min;
    V1 = normalize(V1_);
    V2 = normalize(V2_);
  } else {
    a = 1.0 / dot(V1, V1);
    b = 1.0 / dot(V2, V2);
    V1 *= sqrt(a);
    V2 *= sqrt(b);
  }

  var V3 = cross(V1, V2);
  if (dot(C, V3) < 0.0) {
    V3 *= -1.0;
  }

  let L = dot(V3, C);
  let x0 = dot(V1, C) / L;
  let y0 = dot(V2, C) / L;

  let E1 = inverseSqrt(a);
  let E2 = inverseSqrt(b);

  a *= L * L;
  b *= L * L;

  let c0 = a * b;
  let c1 = a * b * (1.0 + x0 * x0 + y0 * y0) - a - b;
  let c2 = 1.0 - a * (1.0 + x0 * x0) - b * (1.0 + y0 * y0);
  let c3 = 1.0;

  let roots = SolveCubic(vec4f(c0, c1, c2, c3));
  let e1 = roots.x;
  let e2 = roots.y;
  let e3 = roots.z;

  var avgDir = vec3f(a * x0 / (a - e2), b * y0 / (b - e2), 1.0);

  let rotate = mat3_from_columns(V1, V2, V3);

  avgDir = rotate * avgDir;
  avgDir = normalize(avgDir);

  let L1 = sqrt(-e2 / e3);
  let L2 = sqrt(-e2 / e1);

  let formFactor = L1 * L2 * inverseSqrt((1.0 + L1 * L1) * (1.0 + L2 * L2));

  // use tabulated horizon-clipped sphere
  var uv = vec2f(avgDir.z * 0.5 + 0.5, formFactor);
  uv = uv * LUT_SCALE + LUT_BIAS;
  let scale = textureSampleLevel(ltc2, ltc2Sampler, uv, 0.0).w;

  var spec = formFactor * scale;

  if (groundTruth) {
    spec = 0.0;

    let diskArea = pi * E1 * E2;

    // light sample
    {
      // random point on ellipse
      let rad = sqrt(u1);
      let phi = 2.0 * pi * u2;
      let x = E1 * rad * cos(phi);
      let y = E2 * rad * sin(phi);

      let p = x * V1 + y * V2 + C;
      let v = normalize(p);

      let c2_ = max(dot(V3, v), 0.0);
      let solidAngle = max(c2_ / dot(p, p), 1e-7);
      let pdfLight = 1.0 / solidAngle / diskArea;

      let cosTheta = max(v.z, 0.0);
      let brdf = 1.0 / pi;
      let pdfBRDF = cosTheta / pi;

      if (cosTheta > 0.0) {
        spec += brdf * cosTheta / (pdfBRDF + pdfLight);
      }
    }

    // BRDF sample
    {
      // generate a cosine-distributed direction
      let rad = sqrt(u1);
      let phi = 2.0 * pi * u2;
      let x = rad * cos(phi);
      let y = rad * sin(phi);
      let dir = vec3f(x, y, sqrt(1.0 - u1));

      var ray: Ray;
      ray.origin = vec3f(0.0, 0.0, 0.0);
      ray.dir = dir;

      var disk = InitDisk(C, V1, V2, E1, E2);

      let diskNormal = V3;
      disk.plane = vec4f(diskNormal, -dot(diskNormal, disk.center));

      let distToDisk = RayDiskIntersect(ray, disk);
      let intersect = distToDisk != NO_HIT;

      let cosTheta = max(dir.z, 0.0);
      let brdf = 1.0 / pi;
      let pdfBRDF = cosTheta / pi;

      var pdfLight = 0.0;
      if (intersect) {
        let p = distToDisk * ray.dir;
        let v = normalize(p);
        let c2_ = max(dot(V3, v), 0.0);
        let solidAngle = max(c2_ / dot(p, p), 1e-7);
        pdfLight = 1.0 / solidAngle / diskArea;
      }

      if (intersect) {
        spec += brdf * cosTheta / (pdfBRDF + pdfLight);
      }
    }
  }

  Lo_i = vec3f(spec, spec, spec);

  return Lo_i;
}

// Quad
fn IntegrateEdgeVec(v1: vec3f, v2: vec3f) -> vec3f {
  let x = dot(v1, v2);
  let y = abs(x);

  let a = 0.8543985 + (0.4965155 + 0.0145206 * y) * y;
  let b = 3.4175940 + (4.1616724 + y) * y;
  let v = a / b;

  let theta_sintheta = select(0.5 * inverseSqrt(max(1.0 - x * x, 1e-7)) - v, v, x > 0.0);

  return cross(v1, v2) * theta_sintheta;
}

fn IntegrateEdge(v1: vec3f, v2: vec3f) -> f32 {
  return IntegrateEdgeVec(v1, v2).z;
}

fn ClipQuadToHorizon(L: ptr<function, array<vec3f, 5>>, n: ptr<function, i32>) {
  // detect clipping config
  var config = 0;
  if ((*L)[0].z > 0.0) { config += 1; }
  if ((*L)[1].z > 0.0) { config += 2; }
  if ((*L)[2].z > 0.0) { config += 4; }
  if ((*L)[3].z > 0.0) { config += 8; }

  // clip
  *n = 0;

  if (config == 0) {
    // clip all
  } else if (config == 1) { // V1 clip V2 V3 V4
    *n = 3;
    (*L)[1] = -(*L)[1].z * (*L)[0] + (*L)[0].z * (*L)[1];
    (*L)[2] = -(*L)[3].z * (*L)[0] + (*L)[0].z * (*L)[3];
  } else if (config == 2) { // V2 clip V1 V3 V4
    *n = 3;
    (*L)[0] = -(*L)[0].z * (*L)[1] + (*L)[1].z * (*L)[0];
    (*L)[2] = -(*L)[2].z * (*L)[1] + (*L)[1].z * (*L)[2];
  } else if (config == 3) { // V1 V2 clip V3 V4
    *n = 4;
    (*L)[2] = -(*L)[2].z * (*L)[1] + (*L)[1].z * (*L)[2];
    (*L)[3] = -(*L)[3].z * (*L)[0] + (*L)[0].z * (*L)[3];
  } else if (config == 4) { // V3 clip V1 V2 V4
    *n = 3;
    (*L)[0] = -(*L)[3].z * (*L)[2] + (*L)[2].z * (*L)[3];
    (*L)[1] = -(*L)[1].z * (*L)[2] + (*L)[2].z * (*L)[1];
  } else if (config == 5) { // V1 V3 clip V2 V4) impossible
    *n = 0;
  } else if (config == 6) { // V2 V3 clip V1 V4
    *n = 4;
    (*L)[0] = -(*L)[0].z * (*L)[1] + (*L)[1].z * (*L)[0];
    (*L)[3] = -(*L)[3].z * (*L)[2] + (*L)[2].z * (*L)[3];
  } else if (config == 7) { // V1 V2 V3 clip V4
    *n = 5;
    (*L)[4] = -(*L)[3].z * (*L)[0] + (*L)[0].z * (*L)[3];
    (*L)[3] = -(*L)[3].z * (*L)[2] + (*L)[2].z * (*L)[3];
  } else if (config == 8) { // V4 clip V1 V2 V3
    *n = 3;
    (*L)[0] = -(*L)[0].z * (*L)[3] + (*L)[3].z * (*L)[0];
    (*L)[1] = -(*L)[2].z * (*L)[3] + (*L)[3].z * (*L)[2];
    (*L)[2] = (*L)[3];
  } else if (config == 9) { // V1 V4 clip V2 V3
    *n = 4;
    (*L)[1] = -(*L)[1].z * (*L)[0] + (*L)[0].z * (*L)[1];
    (*L)[2] = -(*L)[2].z * (*L)[3] + (*L)[3].z * (*L)[2];
  } else if (config == 10) { // V2 V4 clip V1 V3) impossible
    *n = 0;
  } else if (config == 11) { // V1 V2 V4 clip V3
    *n = 5;
    (*L)[4] = (*L)[3];
    (*L)[3] = -(*L)[2].z * (*L)[3] + (*L)[3].z * (*L)[2];
    (*L)[2] = -(*L)[2].z * (*L)[1] + (*L)[1].z * (*L)[2];
  } else if (config == 12) { // V3 V4 clip V1 V2
    *n = 4;
    (*L)[1] = -(*L)[1].z * (*L)[2] + (*L)[2].z * (*L)[1];
    (*L)[0] = -(*L)[0].z * (*L)[3] + (*L)[3].z * (*L)[0];
  } else if (config == 13) { // V1 V3 V4 clip V2
    *n = 5;
    (*L)[4] = (*L)[3];
    (*L)[3] = (*L)[2];
    (*L)[2] = -(*L)[1].z * (*L)[2] + (*L)[2].z * (*L)[1];
    (*L)[1] = -(*L)[1].z * (*L)[0] + (*L)[0].z * (*L)[1];
  } else if (config == 14) { // V2 V3 V4 clip V1
    *n = 5;
    (*L)[4] = -(*L)[0].z * (*L)[3] + (*L)[3].z * (*L)[0];
    (*L)[0] = -(*L)[0].z * (*L)[1] + (*L)[1].z * (*L)[0];
  } else if (config == 15) { // V1 V2 V3 V4
    *n = 4;
  }

  if (*n == 3) {
    (*L)[3] = (*L)[0];
  }
  if (*n == 4) {
    (*L)[4] = (*L)[0];
  }
}

fn LTC_EvaluateQuad(
  N: vec3f,
  V: vec3f,
  P: vec3f,
  MinvIn: mat3x3f,
  points: array<vec3f, 4>,
  twoSided: bool,
  ltc2: texture_2d<f32>,
  ltc2Sampler: sampler
) -> vec3f {
  // construct orthonormal basis around N
  let T1 = normalize(V - N * dot(V, N));
  let T2 = cross(N, T1);

  // rotate area light in (T1, T2, N) basis
  var Minv = MinvIn * transpose(mat3x3f(T1, T2, N));

  // polygon (allocate 5 vertices for clipping)
  var L: array<vec3f, 5>;
  L[0] = Minv * (points[0] - P);
  L[1] = Minv * (points[1] - P);
  L[2] = Minv * (points[2] - P);
  L[3] = Minv * (points[3] - P);

  // integrate
  var sum = 0.0;

  if (clipless) {
    let dir = points[0].xyz - P;
    let lightNormal = cross(points[1] - points[0], points[3] - points[0]);
    let behind = dot(dir, lightNormal) < 0.0;

    L[0] = normalize(L[0]);
    L[1] = normalize(L[1]);
    L[2] = normalize(L[2]);
    L[3] = normalize(L[3]);

    var vsum = vec3f(0.0);

    vsum += IntegrateEdgeVec(L[0], L[1]);
    vsum += IntegrateEdgeVec(L[1], L[2]);
    vsum += IntegrateEdgeVec(L[2], L[3]);
    vsum += IntegrateEdgeVec(L[3], L[0]);

    let len = length(vsum);
    var z = vsum.z / len;

    if (behind) {
      z = -z;
    }

    var uv = vec2f(z * 0.5 + 0.5, len);
    uv = uv * LUT_SCALE + LUT_BIAS;

    let scale = textureSampleLevel(ltc2, ltc2Sampler, uv, 0.0).w;

    sum = len * scale;

    if (behind && !twoSided) {
      sum = 0.0;
    }
  } else {
    var n = 0;
    ClipQuadToHorizon(&L, &n);

    if (n == 0) {
      return vec3f(0.0, 0.0, 0.0);
    }
    // project onto sphere
    L[0] = normalize(L[0]);
    L[1] = normalize(L[1]);
    L[2] = normalize(L[2]);
    L[3] = normalize(L[3]);
    L[4] = normalize(L[4]);

    // integrate
    sum += IntegrateEdge(L[0], L[1]);
    sum += IntegrateEdge(L[1], L[2]);
    sum += IntegrateEdge(L[2], L[3]);
    if (n >= 4) {
      sum += IntegrateEdge(L[3], L[4]);
    }
    if (n == 5) {
      sum += IntegrateEdge(L[4], L[0]);
    }

    sum = select(max(0.0, sum), abs(sum), twoSided);
  }

  let Lo_i = vec3f(sum, sum, sum);

  return Lo_i;
}

fn EvaluateAreaLight(
  data: ptr<function, PBRData>,
  light: SceneLight,
  ltc1: texture_2d<f32>,
  ltc1Sampler: sampler,
  ltc2: texture_2d<f32>,
  ltc2Sampler: sampler,
  positionWorld: vec3f,
  cameraPosition: vec3f,
  fragCoord: vec2f
) {
  let lightViewPosition = light.viewMatrix * vec4f(positionWorld, 1.0);
  let lightDeviceCoordsPosition = light.projectionMatrix * lightViewPosition;
  let lightDeviceCoordsPositionNormalized = lightDeviceCoordsPosition.xyz / lightDeviceCoordsPosition.w;
  // WebGPU texture origin is top-left, so flip v relative to clip space.
  let lightUV = vec2f(
    lightDeviceCoordsPositionNormalized.x * 0.5 + 0.5,
    0.5 - lightDeviceCoordsPositionNormalized.y * 0.5,
  );
  // Computed here (uniform control flow) so the receiver-plane bias can use
  // screen-space derivatives; the shadow lookup below is behind a branch.
  let dzDuv = depthGradient(lightUV, lightDeviceCoordsPositionNormalized.z);

  var illuminated = 1.0;
  if (light.castShadows != 0u) {
    illuminated = sampleShadowMap2D(
      light.shadowBucket,
      light.shadowLayer,
      light.shadowMapSize,
      lightUV,
      lightDeviceCoordsPositionNormalized.z,
      light.near,
      light.far,
      light.radiusUV,
      dzDuv,
      false,
      fragCoord
    );
  }

  if (illuminated > 0.0) {
    let pos = data.positionWorld;
    let N = data.normalWorld;
    let V = -normalize(pos - cameraPosition);
    let roughness = data.roughness;

    let ex = multQuat(vec3f(1.0, 0.0, 0.0), light.rotation) * light.size.x;
    let ey = multQuat(vec3f(0.0, 1.0, 0.0), light.rotation) * light.size.y;

    var points: array<vec3f, 4>;
    points[0] = light.position - ex + ey;
    points[1] = light.position + ex + ey;
    points[2] = light.position + ex - ey;
    points[3] = light.position - ex - ey;

    var u1 = 0.0;
    var u2 = 0.0;
    if (light.disk != 0u) {
      var seq: array<vec2f, 8>;
      Halton2D(&seq, sampleCount);

      u1 = rand(fragCoord * 0.01);
      u2 = rand(fragCoord.yx * 0.01);

      u1 = fract(u1 + seq[0].x);
      u2 = fract(u2 + seq[0].y);
    }

    let ndotv = saturateF32(dot(N, V));
    var uv = vec2f(roughness, sqrt(1.0 - ndotv));
    uv = uv * LUT_SCALE + LUT_BIAS;

    let t1 = textureSampleLevel(ltc1, ltc1Sampler, uv, 0.0);
    let t2 = textureSampleLevel(ltc2, ltc2Sampler, uv, 0.0);

    let Minv = mat3x3f(
      vec3f(t1.x, 0.0, t1.y),
      vec3f(0.0, 1.0, 0.0),
      vec3f(t1.z, 0.0, t1.w)
    );

    let doubleSided = light.doubleSided != 0u;

    var spec: vec3f;
    if (light.disk != 0u) {
      spec = LTC_EvaluateDisk(N, V, pos, Minv, points, doubleSided, u1, u2, ltc2, ltc2Sampler);
    } else {
      spec = LTC_EvaluateQuad(N, V, pos, Minv, points, doubleSided, ltc2, ltc2Sampler);
    }
    spec *= data.f0 * t2.x + (1.0 - data.f0) * t2.y;

    let identity = mat3x3f(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0);
    var diff: vec3f;
    if (light.disk != 0u) {
      diff = LTC_EvaluateDisk(N, V, pos, identity, points, doubleSided, u1, u2, ltc2, ltc2Sampler);
    } else {
      diff = LTC_EvaluateQuad(N, V, pos, identity, points, doubleSided, ltc2, ltc2Sampler);
    }

    spec = max(spec, vec3f(0.0));
    diff = max(diff, vec3f(0.0));

    diff *= (1.0 - data.transmission);

    // The linearly transformed cosines integrate against an emitter of unit
    // luminance, so color.w — the luminance systems/light.ts derived from the
    // light's luminous power — scales both lobes. The specular term already
    // carries the split-sum DFG from the LUT, the diffuse one is the form factor.
    let lightColor = decode(light.color, SRGB).xyz * (light.color.w * illuminated);
    data.directColor += lightColor * (data.diffuseColor * diff + spec);
  }
}
`;

const PCF = `
fn texture2DCompare(depths: texture_depth_2d_array, depthSampler: sampler_comparison, layer: u32, uv: vec2f, compare: f32) -> f32 {
  return textureSampleCompareLevel(depths, depthSampler, uv, layer, compare);
}

fn PCF3x3(depths: texture_depth_2d_array, depthSampler: sampler_comparison, layer: u32, size: vec2f, uv: vec2f, compare: f32) -> f32 {
  var result = 0.0;
  for (var x = -1; x <= 1; x++) {
    for (var y = -1; y <= 1; y++) {
      result += texture2DCompare(depths, depthSampler, layer, uv + vec2f(f32(x), f32(y)) / size, compare);
    }
  }
  return result / 9.0;
}

fn PCF5x5(depths: texture_depth_2d_array, depthSampler: sampler_comparison, layer: u32, size: vec2f, uv: vec2f, compare: f32) -> f32 {
  var result = 0.0;
  for (var x = -2; x <= 2; x++) {
    for (var y = -2; y <= 2; y++) {
      result += texture2DCompare(depths, depthSampler, layer, uv + vec2f(f32(x), f32(y)) / size, compare);
    }
  }
  return result / 25.0;
}
`;
const PCFCube = `
// Cube depth maps use a regular sampler (textureLoad is unavailable on cubes, so
// PCSS's blocker search needs raw reads); the compare is done manually. Lit (1)
// when the receiver's depth is nearer than (<=) the stored occluder depth.
fn textureCubeCompare(depths: texture_depth_cube_array, depthSampler: sampler, layer: u32, direction: vec3f, compare: f32) -> f32 {
  // Depth textures take an integer mip level (no mip interpolation).
  let depth = textureSampleLevel(depths, depthSampler, direction, layer, 0);
  return step(compare, depth);
}

// https://learnopengl.com/Advanced-Lighting/Shadows/Point-Shadows
const sampleOffsetDirections = array<vec3f, 20>(
  vec3f(1, 1, 1), vec3f(1, -1, 1), vec3f(-1, -1, 1), vec3f(-1, 1, 1),
  vec3f(1, 1, -1), vec3f(1, -1, -1), vec3f(-1, -1, -1), vec3f(-1, 1, -1),
  vec3f(1, 1, 0), vec3f(1, -1, 0), vec3f(-1, -1, 0), vec3f(-1, 1, 0),
  vec3f(1, 0, 1), vec3f(-1, 0, 1), vec3f(1, 0, -1), vec3f(-1, 0, -1),
  vec3f(0, 1, 1), vec3f(0, -1, 1), vec3f(0, -1, -1), vec3f(0, 1, -1)
);

fn PCFCube(depths: texture_depth_cube_array, depthSampler: sampler, layer: u32, size: vec2f, direction: vec3f, compare: f32) -> f32 {
  var result = 0.0;
  for (var i = 0; i < 20; i++) {
    result += textureCubeCompare(depths, depthSampler, layer, direction + sampleOffsetDirections[i] / size.x, compare);
  }
  return result / 20.0;
}
`;

const PCSSCommon = `
override PCSS_BLOCKER_SEARCH_NUM_SAMPLES: i32 = 25;
override PCSS_PCF_NUM_SAMPLES: i32 = 64;

fn interleavedGradientNoise(fragCoord: vec2f) -> f32 {
  let magic = vec3f(0.06711056, 0.00583715, 52.9829189);
  return fract(magic.z * fract(dot(fragCoord, magic.xy)));
}

// Vogel disk sample on the unit disk: a golden-angle spiral that stays evenly
// distributed for ANY sample count. A fixed table only distributes evenly at its
// full length, so a shorter blocker search (first N of a longer table) clusters
// toward the centre and never reaches the disk edge — under-sampling the wide
// search footprint of a perspective light and biasing the blocker average.
// "phase" rotates the whole spiral; feeding it per-pixel noise decorrelates
// neighbours so the kernel dithers instead of banding.
fn vogelDiskSample(i: i32, count: i32, phase: f32) -> vec2f {
  let GOLDEN_ANGLE = 2.399963229728653;
  let radius = sqrt((f32(i) + 0.5) / f32(count));
  let theta = f32(i) * GOLDEN_ANGLE + phase;
  return vec2f(radius * cos(theta), radius * sin(theta));
}

// Receiver-plane depth bias: solve d(depth)/d(uv) from screen-space derivatives
// of the light-space (uv, depth), so the shadow compare tracks the receiver's
// own slope across the filter kernel. Without it a surface tilted in light space
// self-shadows (its up-slope neighbours read as occluders). Must be called in
// uniform control flow (uses derivatives). Shadow Mapping: GPU-based Tips and
// Techniques, p41.
fn depthGradient(uv: vec2f, z: f32) -> vec2f {
  let dx = vec3f(dpdx(uv), dpdx(z));
  let dy = vec3f(dpdy(uv), dpdy(z));
  let det = dx.x * dy.y - dx.y * dy.x;
  if (abs(det) < 1e-8) {
    return vec2f(0.0);
  }
  return vec2f(
    dy.y * dx.z - dx.y * dy.z,
    dx.x * dy.z - dy.x * dx.z,
  ) / det;
}
`;
const PCSS = `
fn PCSSFindBlocker2D(
  depths: texture_depth_2d_array,
  layer: u32,
  size: vec2f,
  uv: vec2f,
  compare: f32,
  near: f32,
  far: f32,
  ortho: bool,
  searchWidthUV: vec2f,
  dzDuv: vec2f,
  phase: f32,
  blockerSum: ptr<function, f32>,
  numBlockers: ptr<function, f32>
) {
  let maxCoord = size - vec2f(1.0);
  for (var i = 0; i < PCSS_BLOCKER_SEARCH_NUM_SAMPLES; i++) {
    let offset = vogelDiskSample(i, PCSS_BLOCKER_SEARCH_NUM_SAMPLES, phase) * searchWidthUV;
    let coord = vec2i(clamp((uv + offset) * size, vec2f(0.0), maxCoord));
    let depth = textureLoad(depths, coord, layer, 0);
    // Receiver-plane bias, clamped so it can only tighten the test (min(0, ·)): a
    // depth bias must reject self-shadowing, never accept more occluders. The
    // unclamped form runs past the far plane on the down-slope side of a large
    // perspective search and counts the background as a blocker, collapsing the
    // penumbra to a hard edge.
    if (depth < compare + min(0.0, dot(dzDuv, offset))) {
      *blockerSum += linearizeDepthZO(depth, near, far, ortho);
      *numBlockers += 1.0;
    }
  }
}

fn PCSSPCFFilter2D(
  depths: texture_depth_2d_array,
  depthSampler: sampler_comparison,
  layer: u32,
  uv: vec2f,
  compare: f32,
  dzDuv: vec2f,
  phase: f32,
  filterRadiusUV: vec2f
) -> f32 {
  var result = 0.0;
  for (var i = 0; i < PCSS_PCF_NUM_SAMPLES; i++) {
    let offset = vogelDiskSample(i, PCSS_PCF_NUM_SAMPLES, phase) * filterRadiusUV;
    // One-sided receiver-plane bias (see PCSSFindBlocker2D): only cancel up-slope
    // self-shadowing, never darken the down-slope side or the background.
    result += texture2DCompare(depths, depthSampler, layer, uv + offset, compare + min(0.0, dot(dzDuv, offset)));
  }
  return result / f32(PCSS_PCF_NUM_SAMPLES);
}

fn PCSS(
  depths: texture_depth_2d_array,
  depthSampler: sampler_comparison,
  layer: u32,
  size: vec2f,
  uv: vec2f,
  compare: f32,
  near: f32,
  far: f32,
  radiusUV: vec2f,
  dzDuv: vec2f,
  ortho: bool,
  fragCoord: vec2f
) -> f32 {
  // Per-pixel rotation of the sampling spiral: decorrelates neighbours so the
  // penumbra dithers rather than bands.
  let phase = interleavedGradientNoise(fragCoord) * TWO_PI;

  // PCSS works in linear eye-space distance from the light (the paper's z).
  let receiverDepth = linearizeDepthZO(compare, near, far, ortho);

  // STEP 1: blocker search (raw depth). The search region is the light's
  // footprint on the shadow map: constant for a parallel (orthographic) light,
  // foreshortened by distance for a perspective one.
  let searchWidthUV = select(
    radiusUV * (receiverDepth - near) / receiverDepth,
    radiusUV,
    ortho,
  );
  var blockerSum = 0.0;
  var numBlockers = 0.0;
  PCSSFindBlocker2D(depths, layer, size, uv, compare, near, far, ortho, searchWidthUV, dzDuv, phase, &blockerSum, &numBlockers);

  // No occluders: fully lit (avoids division by zero).
  if (numBlockers == 0.0) {
    return 1.0;
  }
  let avgBlockerDepth = blockerSum / numBlockers;

  // STEP 2: penumbra size. The blocker→receiver separation drives the softness.
  let separation = max(receiverDepth - avgBlockerDepth, 0.0);
  var filterRadiusUV: vec2f;
  if (ortho) {
    // Parallel light (sun): the penumbra grows linearly with separation at a
    // constant rate set by the light's angular size. Normalizing by frustum depth
    // keeps softness independent of the (auto-fit) shadow camera placement, and
    // avoids the distance-to-apex division that only applies to perspective.
    filterRadiusUV = (separation / max(far - near, 1e-4)) * radiusUV;
  } else {
    // Perspective light: NVIDIA PCSS — similar triangles about the apex, projected
    // to the near plane where radiusUV is measured.
    let penumbra = separation / max(avgBlockerDepth, 1e-4);
    filterRadiusUV = penumbra * radiusUV * (near / receiverDepth);
  }

  // STEP 3: PCF filtering (hardware comparison)
  return PCSSPCFFilter2D(depths, depthSampler, layer, uv, compare, dzDuv, phase, filterRadiusUV);
}
`;
const PCSSCube = `
fn PCSSFindBlockerCube(
  depths: texture_depth_cube_array,
  depthSampler: sampler,
  layer: u32,
  dir: vec3f,
  T: vec3f,
  B: vec3f,
  compare: f32,
  searchWidth: f32,
  phase: f32,
  blockerSum: ptr<function, f32>,
  numBlockers: ptr<function, f32>
) {
  for (var i = 0; i < PCSS_BLOCKER_SEARCH_NUM_SAMPLES; i++) {
    let r = vogelDiskSample(i, PCSS_BLOCKER_SEARCH_NUM_SAMPLES, phase);
    let offset = (r.x * T + r.y * B) * searchWidth;
    let depth = textureSampleLevel(depths, depthSampler, normalize(dir + offset), layer, 0);
    if (depth < compare) {
      *blockerSum += depth;
      *numBlockers += 1.0;
    }
  }
}

fn PCSSPCFFilterCube(
  depths: texture_depth_cube_array,
  depthSampler: sampler,
  layer: u32,
  dir: vec3f,
  T: vec3f,
  B: vec3f,
  compare: f32,
  phase: f32,
  filterRadius: f32
) -> f32 {
  var result = 0.0;
  for (var i = 0; i < PCSS_PCF_NUM_SAMPLES; i++) {
    let r = vogelDiskSample(i, PCSS_PCF_NUM_SAMPLES, phase);
    let offset = (r.x * T + r.y * B) * filterRadius;
    result += textureCubeCompare(depths, depthSampler, layer, normalize(dir + offset), compare);
  }
  return result / f32(PCSS_PCF_NUM_SAMPLES);
}

fn PCSSCube(
  depths: texture_depth_cube_array,
  depthSampler: sampler,
  layer: u32,
  direction: vec3f,
  compare: f32,
  radius: f32,
  far: f32,
  fragCoord: vec2f
) -> f32 {
  let phase = interleavedGradientNoise(fragCoord) * TWO_PI;
  let dir = normalize(direction);

  // Tangent basis perpendicular to the sampling direction so the disk offsets stay
  // tangent to the cube regardless of the face being sampled.
  let up = select(vec3f(0.0, 1.0, 0.0), vec3f(1.0, 0.0, 0.0), abs(dir.y) > 0.999);
  let T = normalize(cross(up, dir));
  let B = cross(dir, T);

  // Angular size of the light disk as seen from the receiver (world radius over
  // distance); compare is the receiver's radial distance normalized by far.
  let angularLightSize = radius / max(compare * far, 1e-4);

  // STEP 1: blocker search
  var blockerSum = 0.0;
  var numBlockers = 0.0;
  PCSSFindBlockerCube(depths, depthSampler, layer, dir, T, B, compare, angularLightSize, phase, &blockerSum, &numBlockers);

  if (numBlockers == 0.0) {
    return 1.0;
  }
  let avgBlockerDepth = blockerSum / numBlockers;

  // STEP 2: penumbra size (similar triangles about the light; far cancels in the
  // normalized-distance ratio).
  let penumbra = max(compare - avgBlockerDepth, 0.0) / max(avgBlockerDepth, 1e-4);
  let filterRadius = penumbra * angularLightSize;

  // STEP 3: filtering (manual compare)
  return PCSSPCFFilterCube(depths, depthSampler, layer, dir, T, B, compare, phase, filterRadius);
}
`;

var shadowing_default = `
${PCSSCommon}

override SHADOW_QUALITY: i32 = 3;
override SHADOW_NORMAL_OFFSET: f32 = 2.0;

// Normal-offset bias: shift the shadow lookup off the receiver surface along its
// world normal by a few shadow texels before projecting into the light. It needs
// no screen-space derivatives, so unlike the receiver-plane bias it stays valid
// where the *camera* grazes the receiver — exactly where that derivative-based
// bias degenerates and acne appears. The offset grows as the *light* direction
// gets tangent (larger depth slope to hide). texelWorldSize is one shadow texel
// in world units at the receiver.
fn normalOffsetBias(positionWorld: vec3f, normalWorld: vec3f, NdotL: f32, texelWorldSize: f32) -> vec3f {
  let slope = clamp(1.0 - NdotL, 0.0, 1.0);
  return positionWorld + normalWorld * (texelWorldSize * SHADOW_NORMAL_OFFSET * (1.0 + slope));
}

${PCF}
${PCSS}

fn getShadow(
  depths: texture_depth_2d_array,
  depthSampler: sampler_comparison,
  layer: u32,
  size: vec2f,
  uv: vec2f,
  compare: f32,
  near: f32,
  far: f32,
  radiusUV: vec2f,
  dzDuv: vec2f,
  ortho: bool,
  fragCoord: vec2f
) -> f32 {
  // SHADOW_QUALITY is an override (uniform across the draw), so branching on it
  // alone keeps derivative-free comparison sampling out of non-uniform flow.
  var result = 1.0;
  if (SHADOW_QUALITY == 1 || SHADOW_QUALITY == 2) {
    result = texture2DCompare(depths, depthSampler, layer, uv, compare);
  } else if (SHADOW_QUALITY == 3) {
    result = PCF3x3(depths, depthSampler, layer, size, uv, compare);
  } else if (SHADOW_QUALITY == 4) {
    result = PCF5x5(depths, depthSampler, layer, size, uv, compare);
  } else if (SHADOW_QUALITY == 5) {
    result = PCSS(depths, depthSampler, layer, size, uv, compare, near, far, radiusUV, dzDuv, ortho, fragCoord);
  }

  // Outside the shadow frustum (uv or depth beyond [0, 1]) there is no occluder
  // information: treat as lit rather than shadowed.
  let inBounds =
    uv.x >= 0.0 && uv.y >= 0.0 && uv.x <= 1.0 && uv.y <= 1.0 &&
    compare >= 0.0 && compare <= 1.0;
  return select(1.0, result, inBounds);
}

${PCFCube}
${PCSSCube}

fn getPunctualShadow(
  depths: texture_depth_cube_array,
  depthSampler: sampler,
  layer: u32,
  size: vec2f,
  direction: vec3f,
  compare: f32,
  radius: f32,
  far: f32,
  fragCoord: vec2f
) -> f32 {
  // Beyond the cube far plane there is no occluder information: treat as lit.
  if (SHADOW_QUALITY == 0 || compare >= 1.0) {
    return 1.0;
  }
  if (SHADOW_QUALITY == 1 || SHADOW_QUALITY == 2) {
    return textureCubeCompare(depths, depthSampler, layer, direction, compare);
  }
  if (SHADOW_QUALITY == 3 || SHADOW_QUALITY == 4) {
    return PCFCube(depths, depthSampler, layer, size, direction, compare);
  }
  if (SHADOW_QUALITY == 5) {
    return PCSSCube(depths, depthSampler, layer, direction, compare, radius, far, fragCoord);
  }
  return 1.0;
}
`;

const D_GGX = `
fn D_GGX(linearRoughness: f32, NoH: f32) -> f32 {
  let oneMinusNoHSquared = 1.0 - NoH * NoH;
  let a = NoH * linearRoughness;
  let k = linearRoughness / (oneMinusNoHSquared + a * a);
  let d = k * k * (1.0 / PI);
  return saturateMediump(d);
}
`;
const D_Charlie = `
fn D_Charlie(linearRoughness: f32, NoH: f32) -> f32 {
  let invAlpha = 1.0 / linearRoughness;
  let cos2h = NoH * NoH;
  // let sin2h = max(1.0 - cos2h, 0.0078125); // 2^(-14/2), so sin2h^2 > 0 in fp16
  let sin2h = 1.0 - cos2h;
  return (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);
}
`;
const V_Kelemen = `
fn V_Kelemen(LoH: f32) -> f32 {
  return saturateMediump(0.25 / (LoH * LoH));
}
`;
const V_Charlie = `
fn Sheen_l(x: f32, alphaG: f32) -> f32 {
  let oneMinusAlphaSq = (1.0 - alphaG) * (1.0 - alphaG);
  let a = mix(21.5473, 25.3245, oneMinusAlphaSq);
  let b = mix(3.82987, 3.32435, oneMinusAlphaSq);
  let c = mix(0.19823, 0.16801, oneMinusAlphaSq);
  let d = mix(-1.97760, -1.27393, oneMinusAlphaSq);
  let e = mix(-4.32054, -4.85967, oneMinusAlphaSq);
  return a / (1.0 + b * pow(x, c)) + d * x + e;
}
fn lambdaSheen(cosTheta: f32, alphaG: f32) -> f32 {
  return select(
    exp(2.0 * Sheen_l(0.5, alphaG) - Sheen_l(1.0 - cosTheta, alphaG)),
    exp(Sheen_l(cosTheta, alphaG)),
    abs(cosTheta) < 0.5
  );
}
fn V_Charlie(linearRoughness: f32, NdotV: f32, NdotL: f32, NdotH: f32) -> f32 {
  return 1.0 / ((1.0 + lambdaSheen(NdotV, linearRoughness) + lambdaSheen(NdotL, linearRoughness)) * (4.0 * NdotV * NdotL));
}
`;
const F_SchlickClearcoat = `
fn F_SchlickClearcoat(VoH: f32) -> f32 {
  return 0.04 + 0.96 * pow(1.0 - VoH, 5.0);
}
`;
const DiffuseLambert = `
fn DiffuseLambert() -> f32 {
  return 1.0 / PI;
}
`;
const MicrofacetDistribution = `
fn MicrofacetDistribution(linearRoughness: f32, NdotH: f32) -> f32 {
  let a2 = linearRoughness * linearRoughness;
  let NdotH2 = NdotH * NdotH;

  let nom = a2;
  var denom = (NdotH2 * (a2 - 1.0) + 1.0);
  denom = PI * denom * denom;

  if (denom > 0.0) {
    return nom / denom;
  } else {
    return 1.0;
  }
}
`;
const SpecularReflection = `
fn SpecularReflection(f0: vec3f, f90: vec3f, HdotV: f32) -> vec3f {
  let cosTheta = HdotV;
  return f0 + (f90 - f0) * pow(1.0 - cosTheta, 5.0);
}
`;
const VisibilityOcclusion = `
fn VisibilityOcclusion(linearRoughness: f32, NdotL: f32, NdotV: f32) -> f32 {
  let linearRoughnessSq = linearRoughness * linearRoughness;

  let GGXV = NdotL * sqrt(NdotV * NdotV * (1.0 - linearRoughnessSq) + linearRoughnessSq);
  let GGXL = NdotV * sqrt(NdotL * NdotL * (1.0 - linearRoughnessSq) + linearRoughnessSq);

  let GGX = GGXV + GGXL;
  if (GGX > 0.0) {
    return 0.5 / GGX;
  }
  return 0.0;
}
`;
const EnvBRDFApproxAB = `
fn EnvBRDFApproxAB(roughness: f32, NoV: f32) -> vec2f {
  let c0 = vec4f(-1.0, -0.0275, -0.572, 0.022);
  let c1 = vec4f(1.0, 0.0425, 1.04, -0.04);
  let r = roughness * c0 + c1;
  let a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;
  return vec2f(-1.04, 1.04) * a004 + r.zw;
}
`;
const getEnergyCompensation = `
fn getEnergyCompensation(f0: vec3f, roughness: f32, NoV: f32) -> vec3f {
  let dfg = EnvBRDFApproxAB(roughness, NoV);
  let Ess = dfg.x + dfg.y;
  return 1.0 + f0 * (1.0 / Ess - 1.0);
}
`;
var brdf_default = `
${D_GGX}
${D_Charlie}
${V_Kelemen}
${V_Charlie}
${F_SchlickClearcoat}

${DiffuseLambert}
${MicrofacetDistribution}
${SpecularReflection}
${VisibilityOcclusion}
${EnvBRDFApproxAB}
${getEnergyCompensation}
`;

var direct_default = `
// color.w is the light's photometric intensity in the unit this integration
// needs: illuminance (lx) for a directional light, luminous intensity (cd) for
// point and spot, since \`intensity * attenuation\` is the illuminance reaching
// the surface.
struct Light {
  l: vec3f,
  color: vec4f,
  attenuation: f32,
};

fn getDistanceAttenuation(posToLight: vec3f, falloff: f32) -> f32 {
  // Square Falloff Attenuation
  let distanceSquare = dot(posToLight, posToLight);
  let factor = distanceSquare * falloff;
  let smoothFactor = saturateF32(1.0 - factor * factor);
  let attenuation = smoothFactor * smoothFactor;

  return attenuation * 1.0 / max(distanceSquare, 1e-4);
}

fn getAngleAttenuation(lightDir: vec3f, l: vec3f, scaleOffset: vec2f) -> f32 {
  let cd = dot(lightDir, l);
  let attenuation = saturateF32(cd * scaleOffset.x + scaleOffset.y);
  return attenuation * attenuation;
}

// USE_SHEEN, USE_CLEARCOAT, USE_NORMAL_TEXTURE, USE_CLEARCOAT_NORMAL_TEXTURE,
// USE_DIFFUSE_TRANSMISSION, USE_VOLUME and USE_TRANSMISSION are expected to be
// declared as \`override\` bool by the composing pipeline shader.

fn sheenBRDF(data: PBRData, NdotH: f32, NdotV: f32, NdotL: f32) -> vec3f {
  let sheenDistribution = D_Charlie(data.sheenLinearRoughness, NdotH);
  let sheenVisibility = V_Charlie(data.sheenLinearRoughness, NdotV, NdotL, NdotH);
  return data.sheenColor * sheenDistribution * sheenVisibility;
}

fn clearcoatBRDF(data: PBRData, h: vec3f, NoH: f32, LoH: f32, Fcc: ptr<function, f32>) -> f32 {
  var clearcoatNoH = NoH;
  if (USE_NORMAL_TEXTURE || USE_CLEARCOAT_NORMAL_TEXTURE) {
    clearcoatNoH = saturateF32(dot(data.clearcoatNormal, h));
  }
  let D = D_GGX(data.clearcoatLinearRoughness, clearcoatNoH);
  let V = V_Kelemen(LoH);
  let F = F_SchlickClearcoat(LoH) * data.clearcoat;

  *Fcc = F;
  return D * V * F;
}

fn getSurfaceShading(data: ptr<function, PBRData>, light: Light, illuminated: f32) {
  let N = data.normalWorld;
  let V = data.viewWorld;
  let L = normalize(light.l);
  let H = normalize(V + L);

  let NdotV = saturateF32(abs(dot(N, V)) + FLT_EPS);
  let NdotL = saturateF32(dot(N, L));

  if (NdotL <= 0.0 || NdotV <= 0.0) {
    return;
  }

  let NdotH = saturateF32(dot(N, H));
  let LdotH = saturateF32(dot(L, H));
  let HdotV = max(0.0, dot(H, V));

  let F = SpecularReflection(data.f0, data.f90, HdotV);
  let D = MicrofacetDistribution(data.linearRoughness, NdotH);
  let Vis = VisibilityOcclusion(data.linearRoughness, NdotL, NdotV);

  // TODO: switch to linear colors
  let lightColor = decode(light.color, SRGB).xyz;

  var Fd = DiffuseLambert() * data.diffuseColor;
  let Fr = F * Vis * D;

  // Multiple-scattering compensation for the base specular lobe: single-scatter
  // Cook-Torrance loses energy at high roughness, so scale it back up. Uses the
  // same DFG as the indirect (Fdez-Agüera) path to stay consistent.
  let energyCompensation = getEnergyCompensation(data.f0, data.roughness, NdotV);

  if (USE_DIFFUSE_TRANSMISSION) {
    var diffuse_btdf = light.attenuation * saturateF32(dot(-N, L)) * (DiffuseLambert() * data.diffuseTransmissionColor);

    if (USE_VOLUME) {
      diffuse_btdf = applyVolumeAttenuation(diffuse_btdf, data.diffuseTransmissionThickness, data.attenuationColor, data.attenuationDistance);
    }
    Fd = mix(Fd, diffuse_btdf, data.diffuseTransmission);
  }

  if (USE_TRANSMISSION) {
    Fd *= (1.0 - data.transmission);
  }

  var color = Fd + Fr * energyCompensation;

  if (USE_SHEEN) {
    color *= data.sheenAlbedoScaling;
    color += sheenBRDF(*data, NdotH, NdotV, NdotL);
  }

  if (USE_CLEARCOAT) {
    var Fcc = 0.0;
    let clearcoat = clearcoatBRDF(*data, H, NdotH, LdotH, &Fcc);
    let attenuation = 1.0 - Fcc;

    color *= attenuation * NdotL;

    // direct light still uses NdotL but clear coat needs separate dot product when using normal map
    // if only normal map is present not clear coat normal map, we will get smooth coating on top of bumpy surface
    if (USE_NORMAL_TEXTURE || USE_CLEARCOAT_NORMAL_TEXTURE) {
      let clearcoatNoL = saturateF32(dot(data.clearcoatNormal, light.l));
      color += clearcoat * clearcoatNoL;
    } else {
      color += clearcoat * NdotL;
    }
  } else {
    color *= NdotL;
  }

  data.directColor += (color * lightColor) * (light.color.w * light.attenuation * illuminated);
}
`;

var indirect_default = `
// USE_REFLECTION_PROBES, USE_CLEARCOAT, USE_NORMAL_TEXTURE, USE_CLEARCOAT_NORMAL_TEXTURE,
// USE_SHEEN, USE_TRANSMISSION, USE_DISPERSION, USE_DIFFUSE_TRANSMISSION and USE_VOLUME
// are expected to be declared as \`override\` bool by the composing pipeline shader.

// Prefiltered specular radiance from the native cubemap. Perceptual roughness
// maps linearly to lod because each mip was prefiltered at roughness =
// mip / (numMipLevels - 1); trilinear filtering interpolates between levels.
fn getPrefilteredReflection(
  reflected: vec3f,
  roughness: f32,
  prefilteredMap: texture_cube<f32>,
  prefilteredMapSampler: sampler,
  numMipLevels: f32
) -> vec3f {
  let lod = roughness * (numMipLevels - 1.0);
  return textureSampleLevel(prefilteredMap, prefilteredMapSampler, reflected, lod).rgb;
}

// Diffuse irradiance reconstructed from L2 SH. The coefficients already fold in
// the cosine-lobe convolution and 1/π (see shaders/reflection-probe.ts), so this
// returns diffuse radiance directly. Basis/index order must match the projection.
fn shIrradiance(sh: array<vec4f, 9>, n: vec3f) -> vec3f {
  let b = array<f32, 9>(
    0.282095,
    0.488603 * n.y,
    0.488603 * n.z,
    0.488603 * n.x,
    1.092548 * n.x * n.y,
    1.092548 * n.y * n.z,
    0.315392 * (3.0 * n.z * n.z - 1.0),
    1.092548 * n.x * n.z,
    0.546274 * (n.x * n.x - n.y * n.y)
  );
  var result = vec3f(0.0);
  for (var k = 0; k < 9; k++) { result += sh[k].rgb * b[k]; }
  return max(result, vec3f(0.0));
}

// https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/clearcoat
fn evaluateClearcoatIBL(
  data: PBRData,
  ao: f32,
  rotation: mat3x3f,
  Fd: ptr<function, vec3f>,
  Fr: ptr<function, vec3f>,
  prefilteredMap: texture_cube<f32>,
  prefilteredMapSampler: sampler,
  numMipLevels: f32
) {
  var clearcoatNoV = data.NdotV;
  // clearcoatNoV is a Fresnel term between two true-world-space vectors, so
  // it stays unrotated; only the environment sample direction is rotated.
  var clearcoatR = rotation * data.reflectionWorld;
  if (USE_NORMAL_TEXTURE || USE_CLEARCOAT_NORMAL_TEXTURE) {
    clearcoatNoV = abs(dot(data.clearcoatNormal, data.viewWorld)) + FLT_EPS;
    clearcoatR = rotation * reflect(-data.viewWorld, data.clearcoatNormal);
  }
  // The clear coat layer assumes an IOR of 1.5 (4% reflectance)
  let Fc = F_SchlickClearcoat(clearcoatNoV) * data.clearcoat;
  let attenuation = 1.0 - Fc;
  // https://github.com/google/filament/commit/6a8e6d45b5c57280898ad064426bc197978e71c5
  // *Fr *= (attenuation * attenuation);
  *Fr *= attenuation;
  *Fr += getPrefilteredReflection(clearcoatR, data.clearcoatRoughness, prefilteredMap, prefilteredMapSampler, numMipLevels) * (ao * Fc);
  *Fd *= attenuation;
}

// = sheen DFG
// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
fn IBLSheenBRDF(roughness: f32, linearRoughness: f32, NdotV: f32) -> f32 {
  let a = select(-8.48 * linearRoughness + 14.3 * roughness - 9.95, -339.2 * linearRoughness + 161.4 * roughness - 25.9, roughness < 0.25);
  let b = select(1.97 * linearRoughness - 3.27 * roughness + 0.72, 44.0 * linearRoughness - 23.7 * roughness + 3.26, roughness < 0.25);
  let DG = exp(a * NdotV + b) + select(0.1 * (roughness - 0.25), 0.0, roughness < 0.25);
  return saturateF32(DG * (1.0 / PI));
}

// https://github.com/google/filament/blob/21ea99a1d934e37d876f15bed5b025ed181bc08f/shaders/src/light_indirect.fs#L394
fn evaluateSheenIBL(
  data: ptr<function, PBRData>,
  ao: f32,
  rotation: mat3x3f,
  Fd: ptr<function, vec3f>,
  Fr: ptr<function, vec3f>,
  prefilteredMap: texture_cube<f32>,
  prefilteredMapSampler: sampler,
  numMipLevels: f32
) {
  // Albedo scaling of the base layer before we layer sheen on top
  *Fd *= data.sheenAlbedoScaling;
  *Fr *= data.sheenAlbedoScaling;

  var reflectance = data.sheenColor * IBLSheenBRDF(data.sheenRoughness, data.sheenLinearRoughness, data.NdotV);
  reflectance *= ao;
  *Fr += reflectance * getPrefilteredReflection(rotation * data.reflectionWorld, data.sheenRoughness, prefilteredMap, prefilteredMapSampler, numMipLevels);
}

// https://github.com/KhronosGroup/glTF-Sample-Viewer/blob/6bc1df9c334288fb0d91d2febfddf97ac5dfd045/source/Renderer/shaders/ibl.glsl#L78
fn getTransmissionSample(
  fragCoord: vec2f,
  roughness: f32,
  ior: f32,
  captureTexture: texture_2d<f32>,
  captureTextureSampler: sampler,
  viewportSize: vec2f
) -> vec3f {
  let framebufferLod = log2(viewportSize.x) * applyIorToRoughness(roughness, ior);
  // fragCoord comes from ndc * 0.5 + 0.5 (bottom-origin); the grab texture is
  // top-origin (written by fragment position), so flip v to sample it.
  let uv = vec2f(fragCoord.x, 1.0 - fragCoord.y);
  return textureBicubic(captureTexture, captureTextureSampler, uv, framebufferLod).xyz;
}

fn getIBLVolumeRefraction(
  data: ptr<function, PBRData>,
  Fr: vec3f,
  captureTexture: texture_2d<f32>,
  captureTextureSampler: sampler,
  viewportSize: vec2f,
  modelMatrix: mat4x4f,
  projectionMatrix: mat4x4f,
  viewMatrix: mat4x4f
) -> vec3f {
  var transmittedLight: vec3f;
  var transmissionRayLength: f32;

  if (USE_DISPERSION) {
    // Dispersion will spread out the ior values for each r,g,b channel
    let halfSpread = (data.ior - 1.0) * 0.025 * data.dispersion;
    let iors = vec3f(data.ior - halfSpread, data.ior, data.ior + halfSpread);

    for (var i = 0; i < 3; i++) {
      let transmissionRay = getVolumeTransmissionRay(data.normalWorld, data.viewWorld, data.thickness, iors[i], modelMatrix);
      // TODO: taking length of blue ray, ideally we would take the length of the green ray. For now overwriting seems ok
      transmissionRayLength = length(transmissionRay);
      let refractedRayExit = data.positionWorld + transmissionRay;

      // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
      let ndcPos = projectionMatrix * viewMatrix * vec4f(refractedRayExit, 1.0);
      var refractionCoords = ndcPos.xy / ndcPos.w;
      refractionCoords += 1.0;
      refractionCoords /= 2.0;

      // Sample framebuffer to get pixel the refracted ray hits for this color channel.
      transmittedLight[i] = getTransmissionSample(refractionCoords, data.roughness, iors[i], captureTexture, captureTextureSampler, viewportSize)[i];
    }
  } else {
    let transmissionRay = getVolumeTransmissionRay(data.normalWorld, data.viewWorld, data.thickness, data.ior, modelMatrix);
    transmissionRayLength = length(transmissionRay);
    let refractedRayExit = data.positionWorld + transmissionRay;

    // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
    let ndcPos = projectionMatrix * viewMatrix * vec4f(refractedRayExit, 1.0);
    var refractionCoords = ndcPos.xy / ndcPos.w;
    refractionCoords += 1.0;
    refractionCoords /= 2.0;

    // Sample framebuffer to get pixel the refracted ray hits.
    transmittedLight = getTransmissionSample(refractionCoords, data.roughness, data.ior, captureTexture, captureTextureSampler, viewportSize);
  }

  let attenuatedColor = applyVolumeAttenuation(transmittedLight.xyz, transmissionRayLength, data.attenuationColor, data.attenuationDistance);

  // TODO: double check that's correct
  let specularColor = Fr;

  return (1.0 - specularColor) * attenuatedColor * data.diffuseColor;
}

// Refraction through the surface, decoupled from the reflection probe so it runs
// whether or not a probe is present. The single-scattering specular reflectance
// (Fdez-Agüera FssEss) is recomputed locally from the DFG rather than taken from
// the probe's accumulated indirect specular, so the energy split holds either way.
fn EvaluateTransmission(
  data: ptr<function, PBRData>,
  captureTexture: texture_2d<f32>,
  captureTextureSampler: sampler,
  viewportSize: vec2f,
  modelMatrix: mat4x4f,
  projectionMatrix: mat4x4f,
  viewMatrix: mat4x4f
) {
  let f_ab = EnvBRDFApproxAB(data.roughness, data.NdotV);
  let FrIBL = max(vec3f(1.0 - data.roughness), data.f0) - data.f0;
  let kS = data.f0 + FrIBL * pow(1.0 - data.NdotV, 5.0);
  let FssEss = kS * f_ab.x + data.f90 * f_ab.y;

  var Ft = getIBLVolumeRefraction(data, FssEss, captureTexture, captureTextureSampler, viewportSize, modelMatrix, projectionMatrix, viewMatrix);
  Ft *= data.transmission;
  // Scale the accumulated indirect diffuse (probe + none) by the opaque fraction.
  data.indirectDiffuse *= (1.0 - data.transmission);
  data.transmitted += Ft;
}

// rotation orients world-space directions into the probe's baked (unrotated)
// reference frame — see systems/reflection-probe.ts's getEnvironmentRotation.
// Applied only at each environment sample site, so data.normalWorld/
// reflectionWorld/viewWorld stay true world space for every caller.
fn EvaluateLightProbe(
  data: ptr<function, PBRData>,
  ao: f32,
  rotation: mat3x3f,
  intensity: f32,
  prefilteredMap: texture_cube<f32>,
  prefilteredMapSampler: sampler,
  numMipLevels: f32,
  sh: array<vec4f, 9>
) {
  // Multiple-scattering microfacet IBL (Fdez-Agüera 2019). The single- and
  // multiple-scattering terms are derived from the same DFG (f_ab) evaluation,
  // so rough surfaces recover the energy a single-scatter split-sum would lose.
  // https://www.jcgt.org/published/0008/01/03/paper.pdf
  let f_ab = EnvBRDFApproxAB(data.roughness, data.NdotV);
  // Roughness-dependent Fresnel so smooth grazing angles still reach f90.
  let FrIBL = max(vec3f(1.0 - data.roughness), data.f0) - data.f0;
  let kS = data.f0 + FrIBL * pow(1.0 - data.NdotV, 5.0);
  let FssEss = kS * f_ab.x + data.f90 * f_ab.y;
  let Ems = 1.0 - (f_ab.x + f_ab.y);
  let Favg = data.f0 + (1.0 - data.f0) / 21.0;
  let FmsEms = Ems * FssEss * Favg / (1.0 - Favg * Ems);
  // Energy left for the diffuse lobe after single + multiple specular scattering.
  let kD = data.diffuseColor * (1.0 - FssEss + FmsEms);

  // diffuse layer
  // Irradiance comes from the bent normal — the average unoccluded direction —
  // so a surface in a crevice gathers from where light reaches it rather than
  // from where it happens to point. Equal to the surface normal when nothing
  // computed one.
  let rotatedNormalWorld = rotation * data.normalWorld;
  let diffuseIrradiance = shIrradiance(sh, rotation * data.bentNormalWorld);
  var Fd = (FmsEms + kD) * diffuseIrradiance * ao;

  if (USE_DIFFUSE_TRANSMISSION) {
    var diffuseTransmissionIBL = shIrradiance(sh, -rotatedNormalWorld) * data.diffuseTransmissionColor;
    if (USE_VOLUME) {
      diffuseTransmissionIBL = applyVolumeAttenuation(diffuseTransmissionIBL, data.diffuseTransmissionThickness, data.attenuationColor, data.attenuationDistance);
    }
    Fd = mix(Fd, diffuseTransmissionIBL, data.diffuseTransmission);
  }

  let prefilteredRadiance = getPrefilteredReflection(rotation * data.reflectionWorld, data.roughness, prefilteredMap, prefilteredMapSampler, numMipLevels);

  // The diffuse visibility term over-occludes a specular lobe narrow enough to
  // miss the occluder entirely, so the specular one is derived from it rather
  // than reused as-is. A no-op where nothing is occluded.
  let specularOcclusion = specularAO(data.NdotV, ao, data.linearRoughness);

  // Single-scattering only: the multiple-scattering energy (FmsEms) is carried
  // by the irradiance term above, per the paper's composition
  // (FssEss * radiance + (FmsEms + kD) * irradiance). Adding it here too returns
  // more energy than the surface received — a furnace test on a metal with
  // f0 = 1 reads 1.55 at roughness 1 instead of 1.0.
  var Fr = FssEss * prefilteredRadiance * specularOcclusion;

  // extra ambient occlusion term for the base and subsurface layers
  multiBounceAO(ao, data.diffuseColor, &Fd);
  multiBounceSpecularAO(specularOcclusion, data.f0, &Fr);

  if (USE_SHEEN) {
    evaluateSheenIBL(data, ao, rotation, &Fd, &Fr, prefilteredMap, prefilteredMapSampler, numMipLevels);
  }

  if (USE_CLEARCOAT) {
    evaluateClearcoatIBL(*data, ao, rotation, &Fd, &Fr, prefilteredMap, prefilteredMapSampler, numMipLevels);
  }

  data.indirectDiffuse += Fd * intensity;
  data.indirectSpecular += Fr * intensity;
}
`;

var env_map_equirect_default = `
fn envMapEquirect(wcNormal: vec3f) -> vec2f {
  let flipEnvMap = -1.0;
  let phi = acos(wcNormal.y);
  let theta = atan2(wcNormal.x, flipEnvMap * wcNormal.z) + PI;
  return vec2f(theta / TWO_PI, phi / PI);
}
`;

/**
* Sky
*
* Based on "A Practical Analytic Model for Daylight" aka The Preetham Model,
* the de facto standard analytic skydome model
*
* Paper:
* https://www.researchgate.net/publication/220720443_A_Practical_Analytic_Model_for_Daylight
*
* Reference Implementation:
*
* - First implemented by Simon Wallner
*   http://www.simonwallner.at/projects/atmospheric-scattering
* - Improved by Martins Upitis
*   http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR
* - Three.js integration by zz85 http://twitter.com/blurspline
*
* Updates: Marcin Ignac http://twitter.com/marcinignac (2015-09) and Damien
* Seguin (2023-10)
*
* @type {string}
* @alias module:shaders.sky
*/
var sky_default = `
struct SkyData {
  sunDirection: vec3f,
  sunfade: f32,
  sunE: f32,
  betaR: vec3f,
  betaM: vec3f,
  mieDirectionalG: f32,
}

const skyUp: vec3f = vec3f(0.0, 1.0, 0.0);

const skyE: f32 = 2.71828182845904523536028747135266249775724709369995957;

const EE: f32 = 1000.0;

// earth shadow hack
const cutoffAngle: f32 = 1.6110731556870734; // pi/1.95
const steepness: f32 = 1.5;

// mie coefficients for the primaries
const MieConst: vec3f = vec3f(1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14);

// rayleigh coefficients for the primaries
const totalRayleighConst: vec3f = vec3f(5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5);

fn sunIntensity(zenithAngleCosIn: f32) -> f32 {
  let zenithAngleCos = clamp(zenithAngleCosIn, -1.0, 1.0);
  return EE * max(0.0, 1.0 - pow(skyE, -((cutoffAngle - acos(zenithAngleCos)) / steepness)));
}

fn totalMie(T: f32) -> vec3f {
  let c = (0.2 * T) * 10E-18;
  return 0.434 * c * MieConst;
}

fn skyVertex(sunPosition: vec3f, parameters: vec4f) -> SkyData {
  var sky: SkyData;

  sky.sunDirection = normalize(sunPosition);
  sky.sunfade = 1.0 - saturateF32(1.0 - exp(sunPosition.y / 450000.0));
  sky.sunE = sunIntensity(dot(sky.sunDirection, skyUp));

  // extinction (absorbtion + out scattering)
  let rayleighCoefficient = parameters.y - (1.0 * (1.0 - sky.sunfade));
  sky.betaR = totalRayleighConst * rayleighCoefficient;
  sky.betaM = totalMie(parameters.x) * parameters.z;
  sky.mieDirectionalG = parameters.w;

  return sky;
}

// optical length at zenith for molecules
const rayleighZenithLength: f32 = 8.4E3;
const mieZenithLength: f32 = 1.25E3;

const sunAngularDiameterCos: f32 = 0.999956676946448443553574619906976478926848692873900859324;

// 3.0 / (16.0 * pi)
const THREE_OVER_SIXTEENPI: f32 = 0.05968310365946075;

fn rayleighPhase(cosTheta: f32) -> f32 {
  return THREE_OVER_SIXTEENPI * (1.0 + pow(cosTheta, 2.0));
}

// 1.0 / (4.0 * pi)
const ONE_OVER_FOURPI: f32 = 0.07957747154594767;

fn hgPhase(cosTheta: f32, g: f32) -> f32 {
  let g2 = pow(g, 2.0);
  return ONE_OVER_FOURPI * ((1.0 - g2) / pow(1.0 - 2.0 * g * cosTheta + g2, 1.5));
}

fn skyFrag(directionIn: vec3f, sky: SkyData) -> vec3f {
  let direction = normalize(directionIn);

  // optical length
  // cutoff angle at 90 to avoid singularity in next formula.
  let zenithAngle = acos(max(0.0, dot(skyUp, direction)));
  let divider = cos(zenithAngle) + 0.15 * pow(93.885 - ((zenithAngle * 180.0) / PI), -1.253);
  let sR = rayleighZenithLength / divider;
  let sM = mieZenithLength / divider;

  // combined extinction factor
  let Fex = exp(-(sky.betaR * sR + sky.betaM * sM));

  // in scattering
  let cosTheta = dot(direction, sky.sunDirection);

  let rPhase = rayleighPhase(cosTheta * 0.5 + 0.5);
  let betaRTheta = sky.betaR * rPhase;

  let mPhase = hgPhase(cosTheta, sky.mieDirectionalG);
  let betaMTheta = sky.betaM * mPhase;

  let LinFactor = sky.sunE * ((betaRTheta + betaMTheta) / (sky.betaR + sky.betaM));
  var Lin = pow(LinFactor * (1.0 - Fex), vec3f(1.5));
  Lin *= mix(
    vec3f(1.0),
    pow(LinFactor * Fex, vec3f(1.0 / 2.0)),
    saturateF32(pow(1.0 - dot(skyUp, sky.sunDirection), 5.0))
  );

  let L0 = vec3f(0.1) * Fex;

  // composition + solar disc
  let sundisk = smoothstep(sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta);
  let L0Sun = L0 + (sky.sunE * 19000.0 * Fex) * sundisk;

  return (Lin + L0Sun) * 0.04 + vec3f(0.0, 0.0003, 0.00075);
}
`;

var texture_coordinates_default = `
// USE_TEXCOORD_1 is expected to be declared as \`override\` bool by the composing pipeline shader.

fn getTextureCoordinates(data: PBRData, index: i32) -> vec2f {
  if (USE_TEXCOORD_1 && index == 1) {
    return data.texCoord1;
  }

  return data.texCoord0;
}

fn getTextureCoordinatesTransformed(data: PBRData, index: i32, texCoordTransform: mat3x3f) -> vec2f {
  let texCoord = getTextureCoordinates(data, index);

  return (texCoordTransform * vec3f(texCoord.xy, 1.0)).xy;
}
`;

var base_color_default = `
// DEPTH_PASS_ONLY and DEPTH_PRE_PASS_ONLY are expected to be declared as
// \`override\` bool by the composing pipeline shader. Pass vColor as
// vec4f(1.0) and texCoordTransform as the identity matrix when vertex
// colors / texture coordinate transforms are not in use.

fn getBaseColor(data: ptr<function, PBRData>, baseColor: vec4f, vColor: vec4f) {
  if (!DEPTH_PASS_ONLY && !DEPTH_PRE_PASS_ONLY) {
    data.baseColor = decode(baseColor, SRGB).xyz * decode(vColor, SRGB).xyz;
  }
  data.opacity = baseColor.w * vColor.w;
}

fn getBaseColorTextured(
  data: ptr<function, PBRData>,
  baseColor: vec4f,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f,
  vColor: vec4f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  let texelColor = textureSample(tex, texSampler, texCoord);

  if (!DEPTH_PASS_ONLY && !DEPTH_PRE_PASS_ONLY) {
    data.baseColor = decode(baseColor, SRGB).xyz * texelColor.xyz * decode(vColor, SRGB).xyz;
  }
  data.opacity = baseColor.w * texelColor.w * vColor.w;
}
`;

var emissive_default = `
// Pass vColor as vec4f(1.0) and texCoordTransform as the identity matrix
// when vertex colors / texture coordinate transforms are not in use.

fn getEmissive(
  data: ptr<function, PBRData>,
  emissive: vec4f,
  emissiveStrength: f32,
  vColor: vec4f
) {
  data.emissive = emissiveStrength * decode(emissive, SRGB).xyz * decode(vColor, SRGB).xyz;
}

fn getEmissiveTextured(
  data: ptr<function, PBRData>,
  emissive: vec4f,
  emissiveStrength: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f,
  vColor: vec4f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  data.emissive = textureSample(tex, texSampler, texCoord).xyz
    * emissiveStrength * decode(emissive, SRGB).xyz * decode(vColor, SRGB).xyz;
}
`;

var normal_default = `
// USE_TANGENTS is expected to be declared as \`override\` bool by the
// composing pipeline shader. Pass texCoordTransform as the identity matrix
// when no texture coordinate transform is in use.

fn getNormal(data: ptr<function, PBRData>) {}

fn getNormalTextured(
  data: ptr<function, PBRData>,
  tex: texture_2d<f32>,
  texSampler: sampler,
  textureScale: f32,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f,
  frontFacing: bool
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);

  var normalMap = textureSample(tex, texSampler, texCoord).xyz * 2.0 - 1.0;
  normalMap.y *= textureScale;
  normalMap = normalize(normalMap);

  let N = normalize(data.normalView);
  let V = normalize(data.eyeDirView);

  var normalView: vec3f;

  if (USE_TANGENTS) {
    let bitangent = cross(N, data.tangentView.xyz) * sign(data.tangentView.w);
    let TBN = mat3x3f(data.tangentView.xyz, bitangent, N);
    normalView = normalize(TBN * normalMap);
  } else {
    normalMap = vec3f(normalMap.xy * select(-1.0, 1.0, frontFacing), normalMap.z);
    // make the output normalView match glTF expected right handed orientation
    normalMap.y *= -1.0;
    normalView = perturb(normalMap, N, V, texCoord);
  }
  data.normalView = normalView;
  data.normalWorld = normalize((data.inverseViewMatrix * vec4f(normalView, 0.0)).xyz);
}
`;

var normal_perturb_default = `
fn cotangentFrame(N: vec3f, p: vec3f, uv: vec2f) -> mat3x3f {
  // get edge vectors of the pixel triangle
  let dp1 = dpdx(p);
  let dp2 = dpdy(p);
  let duv1 = dpdx(uv);
  let duv2 = dpdy(uv);

  var Ng = normalize(cross(dp1, dp2));
  Ng *= sign(dot(Ng, N));

  // solve the linear system
  let dp2perp = cross(dp2, Ng);
  let dp1perp = cross(Ng, dp1);
  let T = dp2perp * duv1.x + dp1perp * duv2.x;
  let B = dp2perp * duv1.y + dp1perp * duv2.y;

  // construct a scale-invariant frame
  let invmax = 1.0 / sqrt(max(dot(T, T), dot(B, B)));
  return mat3x3f(normalize(T * invmax), normalize(B * invmax), N);
}

fn perturb(map: vec3f, N: vec3f, V: vec3f, texcoord: vec2f) -> vec3f {
  let TBN = cotangentFrame(N, -V, texcoord);
  return normalize(TBN * map);
}
`;

var metallic_roughness_default = `
const MIN_ROUGHNESS: f32 = 0.089;

fn getMetallic(data: ptr<function, PBRData>, metallic: f32) {
  data.metallic = metallic;
}

fn getMetallicTextured(
  data: ptr<function, PBRData>,
  metallic: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  data.metallic = metallic * textureSample(tex, texSampler, texCoord).x;
}

fn getRoughness(data: ptr<function, PBRData>, roughness: f32) {
  data.roughness = roughness + 0.01;
}

fn getRoughnessTextured(
  data: ptr<function, PBRData>,
  roughness: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  data.roughness = roughness * textureSample(tex, texSampler, texCoord).x + 0.01;
}

// TODO: sampling the same texture twice
fn getMetallicRoughnessTextured(
  data: ptr<function, PBRData>,
  metallic: f32,
  roughness: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  let texelColor = textureSample(tex, texSampler, texCoord);
  data.metallic = metallic * texelColor.z;
  data.roughness = roughness * texelColor.y;
}
`;

var specular_default = `
const OUTSIDE_IOR: f32 = 1.0; // Air

fn getIor(data: ptr<function, PBRData>, ior: f32) {
  data.ior = ior;
}

fn getSpecularFromIor(data: ptr<function, PBRData>) {
  // Compute F0 for both dielectric and metallic materials
  data.f0 = mix(
    vec3f(pow((data.ior - OUTSIDE_IOR) / (data.ior + OUTSIDE_IOR), 2.0)),
    data.baseColor,
    data.metallic
  );
  data.f90 = vec3f(1.0);
}

fn applySpecular(data: ptr<function, PBRData>, specularStrength: f32, specularColorTint: vec3f) {
  data.f0 = mix(
    min(
      vec3f(pow((data.ior - OUTSIDE_IOR) / (data.ior + OUTSIDE_IOR), 2.0)) * specularColorTint,
      vec3f(1.0)
    ) * specularStrength,
    data.baseColor,
    data.metallic
  );
  data.f90 = mix(vec3f(specularStrength), vec3f(1.0), data.metallic);
}

// Pass texCoordTransform as the identity matrix when no texture coordinate
// transform is in use for a given texture slot.
fn getSpecular(data: ptr<function, PBRData>, specular: f32, specularColor: vec3f) {
  applySpecular(data, specular, specularColor);
}

// specularTexture only (no specularColorTexture): the strength is sampled from
// its alpha channel, the color stays the raw factor. Its RGB channels are
// unused — a pre-ratification draft of the extension stored specular color
// there, and sampling them tints f0 with data the final spec reserves for
// specularColorTexture.
fn getSpecularStrengthTextured(
  data: ptr<function, PBRData>,
  specular: f32,
  specularColor: vec3f,
  specularTex: texture_2d<f32>,
  specularTexSampler: sampler,
  specularTexCoordIndex: i32,
  specularTexCoordTransform: mat3x3f
) {
  let texCoordSpecular = getTextureCoordinatesTransformed(*data, specularTexCoordIndex, specularTexCoordTransform);
  applySpecular(data, specular * textureSample(specularTex, specularTexSampler, texCoordSpecular).w, specularColor);
}

// specularColorTexture only (no specularTexture): the color factor is tinted by
// the texture's RGB, the strength stays the raw factor.
fn getSpecularColorTextured(
  data: ptr<function, PBRData>,
  specular: f32,
  specularColor: vec3f,
  specularColorTex: texture_2d<f32>,
  specularColorTexSampler: sampler,
  specularColorTexCoordIndex: i32,
  specularColorTexCoordTransform: mat3x3f
) {
  let texCoordSpecularColor = getTextureCoordinatesTransformed(*data, specularColorTexCoordIndex, specularColorTexCoordTransform);
  applySpecular(data, specular, specularColor * textureSample(specularColorTex, specularColorTexSampler, texCoordSpecularColor).xyz);
}

fn getSpecularTextured(
  data: ptr<function, PBRData>,
  specular: f32,
  specularColor: vec3f,
  specularTex: texture_2d<f32>,
  specularTexSampler: sampler,
  specularTexCoordIndex: i32,
  specularTexCoordTransform: mat3x3f,
  specularColorTex: texture_2d<f32>,
  specularColorTexSampler: sampler,
  specularColorTexCoordIndex: i32,
  specularColorTexCoordTransform: mat3x3f
) {
  let texCoordSpecular = getTextureCoordinatesTransformed(*data, specularTexCoordIndex, specularTexCoordTransform);
  let specularStrength = specular * textureSample(specularTex, specularTexSampler, texCoordSpecular).w;

  let texCoordSpecularColor = getTextureCoordinatesTransformed(*data, specularColorTexCoordIndex, specularColorTexCoordTransform);
  let tintedSpecularColor = specularColor * textureSample(specularColorTex, specularColorTexSampler, texCoordSpecularColor).xyz;

  applySpecular(data, specularStrength, tintedSpecularColor);
}
`;

var specular_glossiness_default = `
fn getDiffuse(diffuse: vec4f) -> vec4f {
  return vec4f(decode(diffuse, SRGB).xyz, diffuse.w);
}

fn getDiffuseTextured(
  diffuse: vec4f,
  data: PBRData,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) -> vec4f {
  // assumes sRGB texture
  let texCoord = getTextureCoordinatesTransformed(data, texCoordIndex, texCoordTransform);
  let texelColor = textureSample(tex, texSampler, texCoord);
  return vec4f(decode(diffuse, SRGB).xyz, diffuse.w) * texelColor;
}

fn getSpecularGlossiness(specular: vec3f, glossiness: f32) -> vec4f {
  return vec4f(toLinearVec3(specular), glossiness);
}

fn getSpecularGlossinessTextured(
  specular: vec3f,
  glossiness: f32,
  data: PBRData,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) -> vec4f {
  // The texture's RGB is sRGB-encoded and decoded by its format on sample,
  // its alpha (glossiness) linear.
  let texCoord = getTextureCoordinatesTransformed(data, texCoordIndex, texCoordTransform);
  let specGloss = textureSample(tex, texSampler, texCoord);
  return vec4f(toLinearVec3(specular), glossiness) * specGloss;
}

// assumes linear color
fn perceivedBrightness(c: vec3f) -> f32 {
  return 0.299 * c.x + 0.587 * c.y + 0.114 * c.z;
}

fn maxComponent(c: vec3f) -> f32 {
  return max(c.x, max(c.z, c.y));
}

fn solveMetallic(diffuse: f32, specular: f32, oneMinusSpecularStrength: f32) -> f32 {
  if (specular < 0.04) {
    return 0.0;
  }

  let a = 0.04;
  let b = diffuse * oneMinusSpecularStrength / (1.0 - a) + specular - 2.0 * a;
  let c = a - specular;
  let D = max(b * b - 4.0 * a * c, 0.0);
  return saturateF32((-b + sqrt(D)) / (2.0 * a));
}

// Pass vColor as vec4f(1.0) when vertex colors are not in use.
fn getBaseColorAndMetallicRoughnessFromSpecularGlossiness(
  data: ptr<function, PBRData>,
  specularGlossiness: vec4f,
  diffuseRGBA: vec4f,
  vColor: vec4f
) {
  let specular = specularGlossiness.xyz;
  data.f0 = specular;

  let glossiness = specularGlossiness.w;
  data.roughness = 1.0 - glossiness;

  let diffuse = diffuseRGBA.xyz;
  data.opacity = diffuseRGBA.w;
  let epsilon = 1e-6;
  let a = 0.04;

  // ported from https://github.com/KhronosGroup/glTF/blob/master/extensions/Khronos/KHR_materials_pbrSpecularGlossiness/examples/convert-between-workflows/js/three.pbrUtilities.js
  let oneMinusSpecularStrength = 1.0 - maxComponent(specular);
  data.metallic = solveMetallic(perceivedBrightness(diffuse), perceivedBrightness(specular), oneMinusSpecularStrength);

  let baseColorFromDiffuse = diffuse * oneMinusSpecularStrength / (1.0 - a) / max(1.0 - data.metallic, epsilon);
  let baseColorFromSpecular = (specular - a * (1.0 - data.metallic)) * (1.0 / max(data.metallic, epsilon));
  data.baseColor = mix(baseColorFromDiffuse, baseColorFromSpecular, data.metallic * data.metallic);

  let tint = decode(vColor, SRGB).xyz;
  data.baseColor *= tint;
  data.f0 *= tint;
  data.opacity *= vColor.w;
}
`;

var clearcoat_default = `
// USE_CLEARCOAT_ROUGHNESS_FROM_MAIN_TEXTURE and USE_TANGENTS are expected
// to be declared as \`override\` bool by the composing pipeline shader.

fn getClearcoat(data: ptr<function, PBRData>, clearcoat: f32) {
  data.clearcoat = clearcoat;
}

fn getClearcoatTextured(
  data: ptr<function, PBRData>,
  clearcoat: f32,
  clearcoatRoughness: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  let texelColor = textureSample(tex, texSampler, texCoord);

  data.clearcoat = clearcoat * texelColor.x;

  if (USE_CLEARCOAT_ROUGHNESS_FROM_MAIN_TEXTURE) {
    data.clearcoatRoughness = clearcoatRoughness * texelColor.y;
  }
}

fn getClearcoatRoughness(data: ptr<function, PBRData>, clearcoatRoughness: f32) {
  if (!USE_CLEARCOAT_ROUGHNESS_FROM_MAIN_TEXTURE) {
    data.clearcoatRoughness = clearcoatRoughness;
  }
}

fn getClearcoatRoughnessTextured(
  data: ptr<function, PBRData>,
  clearcoatRoughness: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  data.clearcoatRoughness = clearcoatRoughness * textureSample(tex, texSampler, texCoord).y;
}

fn getClearcoatNormalTextured(
  data: ptr<function, PBRData>,
  tex: texture_2d<f32>,
  texSampler: sampler,
  textureScale: f32,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f,
  frontFacing: bool
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);

  var normalMap = textureSample(tex, texSampler, texCoord).xyz * 2.0 - 1.0;
  normalMap.y *= textureScale;
  normalMap = normalize(normalMap);

  let N = normalize(data.normalView);
  let V = normalize(data.eyeDirView);

  var normalView: vec3f;

  if (USE_TANGENTS) {
    let bitangent = cross(N, data.tangentView.xyz) * sign(data.tangentView.w);
    let TBN = mat3x3f(data.tangentView.xyz, bitangent, N);
    normalView = normalize(TBN * normalMap);
  } else {
    normalMap = vec3f(normalMap.xy * select(-1.0, 1.0, frontFacing), normalMap.z);
    // make the output normalView match glTF expected right handed orientation
    normalMap.y *= -1.0;
    normalView = perturb(normalMap, N, V, texCoord);
  }

  data.clearcoatNormal = normalize((data.inverseViewMatrix * vec4f(normalView, 0.0)).xyz);
}

// geometricNormalView: the un-perturbed geometric normal (world/view varying),
// distinct from data.normalView which may already carry base normal-map perturbation.
fn getClearcoatNormal(data: ptr<function, PBRData>, geometricNormalView: vec3f) {
  data.clearcoatNormal = normalize((data.inverseViewMatrix * vec4f(normalize(geometricNormalView), 0.0)).xyz);
}

// IOR = 1.5, F0 = 0.04
// as material is no longer in contact with air we calculate new IOR on the
// clear coat and material interface
fn f0ClearcoatToSurface(f0: vec3f) -> vec3f {
  return saturateVec3(f0 * (f0 * (0.941892 - 0.263008 * f0) + 0.346479) - 0.0285998);
}
`;

var sheen_color_default = `
// USE_SHEEN_ROUGHNESS_FROM_MAIN_TEXTURE, DEPTH_PASS_ONLY and
// DEPTH_PRE_PASS_ONLY are expected to be declared as \`override\` bool by the
// composing pipeline shader.

fn getSheenColor(data: ptr<function, PBRData>, sheenColor: vec4f) {
  if (!DEPTH_PASS_ONLY && !DEPTH_PRE_PASS_ONLY) {
    data.sheenColor = decode(sheenColor, SRGB).xyz;
  }
}

fn getSheenColorTextured(
  data: ptr<function, PBRData>,
  sheenColor: vec4f,
  sheenRoughness: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  let texelColor = textureSample(tex, texSampler, texCoord);

  if (!DEPTH_PASS_ONLY && !DEPTH_PRE_PASS_ONLY) {
    data.sheenColor = decode(sheenColor, SRGB).xyz * texelColor.xyz;
  }

  if (USE_SHEEN_ROUGHNESS_FROM_MAIN_TEXTURE) {
    data.sheenRoughness = sheenRoughness * texelColor.w;
  }
}

fn getSheenRoughness(data: ptr<function, PBRData>, sheenRoughness: f32) {
  if (!USE_SHEEN_ROUGHNESS_FROM_MAIN_TEXTURE) {
    data.sheenRoughness = sheenRoughness;
  }
}

fn getSheenRoughnessTextured(
  data: ptr<function, PBRData>,
  sheenRoughness: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  data.sheenRoughness = sheenRoughness * textureSample(tex, texSampler, texCoord).w;
}

fn getSheenAlbedoScaling(data: ptr<function, PBRData>) {
  data.sheenAlbedoScaling = 1.0 - 0.157 * max3(data.sheenColor);
}
`;

var transmission_default = `
fn getTransmission(data: ptr<function, PBRData>, transmission: f32) {
  data.transmission = transmission;
}

fn getTransmissionTextured(
  data: ptr<function, PBRData>,
  transmission: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  data.transmission = transmission * textureSample(tex, texSampler, texCoord).x;
}

fn applyIorToRoughness(roughness: f32, ior: f32) -> f32 {
  // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
  // an IOR of 1.5 results in the default amount of microfacet refraction.
  return roughness * saturateF32(ior * 2.0 - 2.0);
}

fn getVolumeTransmissionRay(n: vec3f, v: vec3f, thickness: f32, ior: f32, modelMatrix: mat4x4f) -> vec3f {
  // Direction of refracted light.
  let refractionVector = refract(-v, normalize(n), 1.0 / ior);

  // Compute rotation-independant scaling of the model matrix.
  var modelScale: vec3f;
  modelScale.x = length(modelMatrix[0].xyz);
  modelScale.y = length(modelMatrix[1].xyz);
  modelScale.z = length(modelMatrix[2].xyz);

  // The thickness is specified in local space.
  return normalize(refractionVector) * thickness * modelScale;
}

// WGSL has no isInf builtin: doubling a true IEEE-754 infinity leaves it
// unchanged, which is a portable way to detect it.
fn isInfF32(x: f32) -> bool {
  return x != 0.0 && x * 2.0 == x;
}

// Compute attenuated light as it travels through a volume.
fn applyVolumeAttenuation(radiance: vec3f, transmissionDistance: f32, attenuationColor: vec3f, attenuationDistance: f32) -> vec3f {
  if (isInfF32(attenuationDistance) || attenuationDistance == 0.0) {
    // Attenuation distance is +∞ (which we indicate by zero or infinity), i.e. the transmitted color is not attenuated at all.
    return radiance;
  } else {
    // Compute light attenuation using Beer's law.
    let transmittance = pow(attenuationColor, vec3f(transmissionDistance / attenuationDistance));
    return transmittance * radiance;
  }
}

fn getThickness(data: ptr<function, PBRData>, thickness: f32) {
  data.thickness = thickness;
}

fn getThicknessTextured(
  data: ptr<function, PBRData>,
  thickness: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  data.thickness = thickness * textureSample(tex, texSampler, texCoord).y;
}

fn getAttenuation(data: ptr<function, PBRData>, attenuationColor: vec3f, attenuationDistance: f32) {
  data.attenuationColor = attenuationColor;
  data.attenuationDistance = attenuationDistance;
}

// USE_VOLUME is expected to be declared as \`override\` bool by the composing pipeline shader.
fn applyDiffuseTransmissionThickness(data: ptr<function, PBRData>, modelMatrix: mat4x4f) {
  if (USE_VOLUME) {
    data.diffuseTransmissionThickness = data.thickness
      * (length(modelMatrix[0].xyz) + length(modelMatrix[1].xyz) + length(modelMatrix[2].xyz)) / 3.0;
  } else {
    data.diffuseTransmissionThickness = 1.0;
  }
}

fn getDiffuseTransmission(
  data: ptr<function, PBRData>,
  diffuseTransmission: f32,
  diffuseTransmissionColor: vec3f,
  modelMatrix: mat4x4f
) {
  data.diffuseTransmission = diffuseTransmission;
  data.diffuseTransmissionColor = diffuseTransmissionColor;
  applyDiffuseTransmissionThickness(data, modelMatrix);
}

// diffuseTransmissionTexture only (no diffuseTransmissionColorTexture): the
// transmission factor is sampled from its alpha channel, the color stays the
// raw factor untinted by any texture.
fn getDiffuseTransmissionStrengthTextured(
  data: ptr<function, PBRData>,
  diffuseTransmission: f32,
  diffuseTransmissionColor: vec3f,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f,
  modelMatrix: mat4x4f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  data.diffuseTransmission = diffuseTransmission * textureSample(tex, texSampler, texCoord).w;
  data.diffuseTransmissionColor = diffuseTransmissionColor;
  applyDiffuseTransmissionThickness(data, modelMatrix);
}

// diffuseTransmissionColorTexture only (no diffuseTransmissionTexture): the
// color factor is tinted by the texture's RGB, the transmission strength
// stays the raw factor untouched by any texture.
fn getDiffuseTransmissionColorTextured(
  data: ptr<function, PBRData>,
  diffuseTransmission: f32,
  diffuseTransmissionColor: vec3f,
  colorTex: texture_2d<f32>,
  colorTexSampler: sampler,
  colorTexCoordIndex: i32,
  colorTexCoordTransform: mat3x3f,
  modelMatrix: mat4x4f
) {
  let colorTexCoord = getTextureCoordinatesTransformed(*data, colorTexCoordIndex, colorTexCoordTransform);
  data.diffuseTransmission = diffuseTransmission;
  data.diffuseTransmissionColor = diffuseTransmissionColor * textureSample(colorTex, colorTexSampler, colorTexCoord).xyz;
  applyDiffuseTransmissionThickness(data, modelMatrix);
}

fn getDiffuseTransmissionTextured(
  data: ptr<function, PBRData>,
  diffuseTransmission: f32,
  diffuseTransmissionColor: vec3f,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f,
  colorTex: texture_2d<f32>,
  colorTexSampler: sampler,
  colorTexCoordIndex: i32,
  colorTexCoordTransform: mat3x3f,
  modelMatrix: mat4x4f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  let diffuseTransmissionStrength = diffuseTransmission * textureSample(tex, texSampler, texCoord).w;

  let colorTexCoord = getTextureCoordinatesTransformed(*data, colorTexCoordIndex, colorTexCoordTransform);
  let tintedDiffuseTransmissionColor = diffuseTransmissionColor * textureSample(colorTex, colorTexSampler, colorTexCoord).xyz;

  data.diffuseTransmission = diffuseTransmissionStrength;
  data.diffuseTransmissionColor = tintedDiffuseTransmissionColor;
  applyDiffuseTransmissionThickness(data, modelMatrix);
}

// "Mipped Bicubic Texture Filtering" (https://www.shadertoy.com/view/4df3Dn)
const ONE_OVER_SIX: f32 = 1.0 / 6.0;

fn textureBicubicW0(a: f32) -> f32 {
  return ONE_OVER_SIX * (a * (a * (-a + 3.0) - 3.0) + 1.0);
}

fn textureBicubicW1(a: f32) -> f32 {
  return ONE_OVER_SIX * (a * a * (3.0 * a - 6.0) + 4.0);
}

fn textureBicubicW2(a: f32) -> f32 {
  return ONE_OVER_SIX * (a * (a * (-3.0 * a + 3.0) + 3.0) + 1.0);
}

fn textureBicubicW3(a: f32) -> f32 {
  return ONE_OVER_SIX * (a * a * a);
}

// g0 and g1 are the two amplitude functions
fn textureBicubicG0(a: f32) -> f32 {
  return textureBicubicW0(a) + textureBicubicW1(a);
}

fn textureBicubicG1(a: f32) -> f32 {
  return textureBicubicW2(a) + textureBicubicW3(a);
}

// h0 and h1 are the two offset functions
fn textureBicubicH0(a: f32) -> f32 {
  return -1.0 + textureBicubicW1(a) / (textureBicubicW0(a) + textureBicubicW1(a));
}

fn textureBicubicH1(a: f32) -> f32 {
  return 1.0 + textureBicubicW3(a) / (textureBicubicW2(a) + textureBicubicW3(a));
}

fn textureBicubicSample(tex: texture_2d<f32>, texSampler: sampler, uvIn: vec2f, texelSize: vec4f, lod: f32) -> vec4f {
  let uv = uvIn * texelSize.zw + 0.5;

  let iuv = floor(uv);
  let fuv = fract(uv);

  let g0x = textureBicubicG0(fuv.x);
  let g1x = textureBicubicG1(fuv.x);
  let h0x = textureBicubicH0(fuv.x);
  let h1x = textureBicubicH1(fuv.x);
  let h0y = textureBicubicH0(fuv.y);
  let h1y = textureBicubicH1(fuv.y);

  let p0 = (vec2f(iuv.x + h0x, iuv.y + h0y) - 0.5) * texelSize.xy;
  let p1 = (vec2f(iuv.x + h1x, iuv.y + h0y) - 0.5) * texelSize.xy;
  let p2 = (vec2f(iuv.x + h0x, iuv.y + h1y) - 0.5) * texelSize.xy;
  let p3 = (vec2f(iuv.x + h1x, iuv.y + h1y) - 0.5) * texelSize.xy;

  return (
    textureBicubicG0(fuv.y) *
      (g0x * textureSampleLevel(tex, texSampler, p0, lod) + g1x * textureSampleLevel(tex, texSampler, p1, lod)) +
    textureBicubicG1(fuv.y) *
      (g0x * textureSampleLevel(tex, texSampler, p2, lod) + g1x * textureSampleLevel(tex, texSampler, p3, lod))
  );
}

fn textureBicubic(tex: texture_2d<f32>, texSampler: sampler, uv: vec2f, lod: f32) -> vec4f {
  let lodSizeFloor = vec2f(textureDimensions(tex, u32(lod)));
  let lodSizeCeil = vec2f(textureDimensions(tex, u32(lod + 1.0)));

  let lodSizeFloorInv = 1.0 / lodSizeFloor;
  let lodSizeCeilInv = 1.0 / lodSizeCeil;

  let floorSample = textureBicubicSample(tex, texSampler, uv, vec4f(lodSizeFloorInv, lodSizeFloor), floor(lod));
  let ceilSample = textureBicubicSample(tex, texSampler, uv, vec4f(lodSizeCeilInv, lodSizeCeil), ceil(lod));

  return mix(floorSample, ceilSample, fract(lod));
}
`;

var alpha_default = `
fn alphaTest(data: ptr<function, PBRData>, alphaCutoff: f32) {
  if (data.opacity < alphaCutoff) {
    discard;
  }
}
`;

/**
* Ambient Occlusion
*
* Split into parts because its two consumers share only the multi-bounce model:
* the material shader needs the texture read (and with it PBRData),
* post-processing needs the screen-space mix.
*
* @type {object}
* @name ambientOcclusion
* @static
*/
/**
* GtaoMultiBounce: Jimenez et al. 2016, "Practical Realtime Strategies for
* Accurate Indirect Occlusion"
* https://github.com/google/filament/blob/e1dfea0f121f3ee0e552fc010f0dde5ed9c7e783/shaders/src/ambient_occlusion.fs
* https://google.github.io/filament/Materials.md.html#materialdefinitions/materialblock/lighting:multibounceambientocclusion
* Returns a color ambient occlusion based on a pre-computed visibility term.
* The albedo term is meant to be the diffuse color or f0 for the diffuse and
* specular terms respectively.
*
* @member {string}
*/
const multiBounce = `
fn gtaoMultiBounce(visibility: f32, albedo: vec3f) -> vec3f {
  let a = 2.0404 * albedo - 0.3324;
  let b = -4.7951 * albedo + 0.6417;
  let c = 2.7552 * albedo + 0.6903;

  return max(vec3f(visibility), ((visibility * a + b) * visibility + c) * visibility);
}

fn multiBounceAO(visibility: f32, albedo: vec3f, color: ptr<function, vec3f>) {
  *color *= gtaoMultiBounce(visibility, albedo);
}
`;
/**
* Specular occlusion derived from the diffuse visibility term, after Lagarde
* and de Rousiers 2014, "Moving Frostbite to PBR".
*
* Reusing the diffuse visibility for the specular lobe over-occludes a smooth
* surface, whose lobe is narrow enough to miss the occluder entirely.
*
* Smoothness in `visibility` matters more here than accuracy. The
* cone-intersection alternative (Jimenez et al. 2016 §4.4, using a bent normal)
* is sharper in principle, but its aperture goes as `sqrt(1 - visibility)`,
* whose derivative is unbounded at full visibility, and for a smooth material
* its specular cone is a fraction of a degree wide — so it degenerates into a
* step function positioned by the AO term. Fed a screen-space AO buffer sitting
* near 1, per-pixel noise far below the visible threshold lands on both sides
* of that step and reads as binary speckle on grazing surfaces. This one is
* monotone and branchless, and needs no bent normal.
*
* Requires {@link multiBounce} for the coloured variant.
*
* @member {string}
*/
const specular = `
fn specularAO(NdotV: f32, visibility: f32, linearRoughness: f32) -> f32 {
  return saturateF32(
    pow(NdotV + visibility, exp2(-16.0 * linearRoughness - 1.0)) - 1.0 + visibility
  );
}

fn multiBounceSpecularAO(visibility: f32, f0: vec3f, color: ptr<function, vec3f>) {
  *color *= gtaoMultiBounce(visibility, f0);
}
`;
/**
* The material's occlusion texture read.
*
* @member {string}
*/
const texture = `
fn getAmbientOcclusion(
  data: ptr<function, PBRData>,
  strength: f32,
  tex: texture_2d<f32>,
  texSampler: sampler,
  texCoordIndex: i32,
  texCoordTransform: mat3x3f
) {
  let texCoord = getTextureCoordinatesTransformed(*data, texCoordIndex, texCoordTransform);
  data.ao *= 1.0 + strength * (textureSample(tex, texSampler, texCoord).x - 1.0);
}
`;

var depth_unpack_default = `
// DEPTH_PACK_FAR is expected to be declared as \`override\` f32 by the
// composing pipeline shader (shared with depth-pack.js and pcf.js).

fn unpackDepth(rgba_depth: vec4f) -> f32 {
  let bit_shift = vec4f(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);
  return dot(rgba_depth, bit_shift);
}
`;

/**
* Reversible Tone Map
*
* Reference Implementations:
*
* - "Optimized Reversible Tonemapper for Resolve", Timothy Lottes:
*   https://gpuopen.com/learn/optimized-reversible-tonemapper-for-resolve/
*
* @type {string}
* @alias module:shaders.reversibleToneMap
*/
var reversible_tone_map_default = `
fn reversibleToneMap(c: vec3f) -> vec3f {
  return c / (max3(c) + 1.0);
}
fn reversibleToneMapInverse(c: vec3f) -> vec3f {
  return c / (1.0 - max3(c));
}
`;

const SH_COEFFICIENT_COUNT = 9;
const SH_SAMPLE_COUNT = 8192;
const SH_WORKGROUP_SIZE = 64;
const sampleEnv = `
fn sampleEnv(dir: vec3f) -> vec3f {
  return textureSampleLevel(uEnvMap, uEnvMapSampler, envMapEquirect(dir), 0.0).rgb;
}
`;
const cubeDirection = `
fn cubeDirection(face: u32, st: vec2f) -> vec3f {
  let u = st.x;
  let v = st.y;
  switch face {
    case 0u: { return vec3f( 1.0,  -v,  -u); }
    case 1u: { return vec3f(-1.0,  -v,   u); }
    case 2u: { return vec3f(  u,  1.0,   v); }
    case 3u: { return vec3f(  u, -1.0,  -v); }
    case 4u: { return vec3f(  u,  -v, 1.0); }
    default: { return vec3f( -u,  -v, -1.0); }
  }
}
`;
const ggxSampling = `
fn radicalInverseVdC(bitsIn: u32) -> f32 {
  var bits = bitsIn;
  bits = (bits << 16u) | (bits >> 16u);
  bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
  bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
  bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
  bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
  return f32(bits) * 2.3283064365386963e-10;
}

fn hammersley(i: u32, n: u32) -> vec2f {
  return vec2f(f32(i) / f32(n), radicalInverseVdC(i));
}

fn importanceSampleGGX(Xi: vec2f, roughness: f32, N: vec3f) -> vec3f {
  let a = roughness * roughness;
  let phi = TWO_PI * Xi.x;
  let cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a * a - 1.0) * Xi.y));
  let sinTheta = sqrt(1.0 - cosTheta * cosTheta);
  let H = vec3f(sinTheta * cos(phi), sinTheta * sin(phi), cosTheta);
  let up = select(vec3f(0.0, 0.0, 1.0), vec3f(1.0, 0.0, 0.0), abs(N.z) >= 0.999);
  let tangent = normalize(cross(up, N));
  let bitangent = cross(N, tangent);
  return normalize(tangent * H.x + bitangent * H.y + N * H.z);
}

fn distributionGGX(NoH: f32, roughness: f32) -> f32 {
  let a = roughness * roughness;
  let a2 = a * a;
  let d = NoH * NoH * (a2 - 1.0) + 1.0;
  return a2 / (PI * d * d);
}
`;
const shBasis = `
fn shBasis(n: vec3f) -> array<f32, 9> {
  return array<f32, 9>(
    0.282095,
    0.488603 * n.y,
    0.488603 * n.z,
    0.488603 * n.x,
    1.092548 * n.x * n.y,
    1.092548 * n.y * n.z,
    0.315392 * (3.0 * n.z * n.z - 1.0),
    1.092548 * n.x * n.z,
    0.546274 * (n.x * n.x - n.y * n.y)
  );
}
`;
/**
* Compute shader projecting an equirectangular environment map into 9 L2 SH
* coefficients (irradiance). Dispatched as a single workgroup; each invocation
* accumulates a strided subset of the sample set, then invocation 0 reduces and
* writes. The cosine-lobe convolution (Ramamoorthi) and the 1/π Lambert factor
* are baked per band into the stored coefficients, so reconstruction is a plain
* basis dot product returning the diffuse radiance directly.
*/
const reflectionProbeSHShader = () => `
${PI}
${TWO_PI}

struct Params { luminanceScale: f32, sunCosCutoff: f32, sunDirection: vec3f }

@group(0) @binding(0) var uEnvMap: texture_2d<f32>;
@group(0) @binding(1) var uEnvMapSampler: sampler;
@group(0) @binding(2) var<storage, read_write> uIrradianceCoefficients: array<vec4f, ${9}>;
@group(0) @binding(3) var<uniform> uParams: Params;

${env_map_equirect_default}
${sampleEnv}
${shBasis}

fn fibonacciSphere(i: u32, n: u32) -> vec3f {
  let fi = f32(i);
  let y = 1.0 - (2.0 * fi + 1.0) / f32(n);
  let r = sqrt(max(0.0, 1.0 - y * y));
  let phi = TWO_PI * fi * 0.61803398875;
  return vec3f(r * cos(phi), y, r * sin(phi));
}

var<workgroup> partial: array<array<vec3f, ${9}>, ${SH_WORKGROUP_SIZE}>;

@compute @workgroup_size(${SH_WORKGROUP_SIZE})
fn computeMain(@builtin(local_invocation_index) lid: u32) {
  var acc: array<vec3f, ${9}>;
  for (var k = 0u; k < ${9}u; k++) { acc[k] = vec3f(0.0); }

  var i = lid;
  loop {
    if (i >= ${SH_SAMPLE_COUNT}u) { break; }
    let dir = fibonacciSphere(i, ${SH_SAMPLE_COUNT}u);
    // The sun disc is masked out, not integrated. It covers 2.2e-5 of the
    // sphere, so this sample set lands on it 0.18 times on average: whether it
    // is hit at all depends on where the disc falls relative to the lattice,
    // and one hit carries enough energy to swing the irradiance by 2x. Moving
    // the sun then reads as an exposure step. Its energy belongs to the
    // directional light, and the sky's calibration already excludes it.
    //
    // The caller sizes the cone to clear the disc plus the bilinear reach of
    // the texels holding it; masking only the disc still leaks most of it.
    if (dot(dir, uParams.sunDirection) <= uParams.sunCosCutoff) {
      let radiance = sampleEnv(dir);
      let b = shBasis(dir);
      for (var k = 0u; k < ${9}u; k++) { acc[k] += radiance * b[k]; }
    }
    i += ${SH_WORKGROUP_SIZE}u;
  }

  for (var k = 0u; k < ${9}u; k++) { partial[lid][k] = acc[k]; }
  workgroupBarrier();

  if (lid == 0u) {
    let dw = 4.0 * PI / f32(${SH_SAMPLE_COUNT}u);
    // Cosine-lobe convolution per band (Â_l / π): band0 = 1, band1 = 2/3, band2 = 1/4.
    let A = array<f32, 9>(1.0, 2.0 / 3.0, 2.0 / 3.0, 2.0 / 3.0, 0.25, 0.25, 0.25, 0.25, 0.25);
    for (var k = 0u; k < ${9}u; k++) {
      var s = vec3f(0.0);
      for (var t = 0u; t < ${SH_WORKGROUP_SIZE}u; t++) { s += partial[t][k]; }
      uIrradianceCoefficients[k] = vec4f(s * dw * A[k] * uParams.luminanceScale, 0.0);
    }
  }
}
`;
/**
* Compute shader converting the equirectangular environment into mip 0 of the
* radiance cubemap. Its mip chain (built by the downsample shader) is the
* pre-blurred source the prefilter samples from.
*/
const reflectionProbeEquirectToCubeShader = () => `
${PI}
${TWO_PI}

struct Params { faceSize: f32, luminanceScale: f32 }

@group(0) @binding(0) var uEnvMap: texture_2d<f32>;
@group(0) @binding(1) var uEnvMapSampler: sampler;
@group(0) @binding(2) var uOutput: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(3) var<uniform> uParams: Params;

${env_map_equirect_default}
${sampleEnv}
${cubeDirection}

@compute @workgroup_size(8, 8, 1)
fn computeMain(@builtin(global_invocation_id) gid: vec3u) {
  let size = u32(uParams.faceSize);
  if (gid.x >= size || gid.y >= size) { return; }

  let st = (vec2f(f32(gid.x), f32(gid.y)) + 0.5) / uParams.faceSize * 2.0 - 1.0;
  let N = normalize(cubeDirection(gid.z, st));
  // Clamped to the float16 max: the calibration can push a sun disc that was
  // already at the format's ceiling well past it, and one Inf texel takes the
  // whole prefiltered chain with it.
  let radiance = min(sampleEnv(N) * uParams.luminanceScale, vec3f(65504.0));
  textureStore(uOutput, vec2i(gid.xy), i32(gid.z), vec4f(radiance, 1.0));
}
`;
/**
* Compute shader box-downsampling one radiance cubemap mip into the next. The
* source is bound as a single-level cube view, so a linear cube sample resolves
* a ~2×2 average with seamless cross-face filtering.
*/
const reflectionProbeDownsampleShader = () => `
struct Params { faceSize: f32 }

@group(0) @binding(0) var uSource: texture_cube<f32>;
@group(0) @binding(1) var uSourceSampler: sampler;
@group(0) @binding(2) var uOutput: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(3) var<uniform> uParams: Params;

${cubeDirection}

@compute @workgroup_size(8, 8, 1)
fn computeMain(@builtin(global_invocation_id) gid: vec3u) {
  let size = u32(uParams.faceSize);
  if (gid.x >= size || gid.y >= size) { return; }

  let st = (vec2f(f32(gid.x), f32(gid.y)) + 0.5) / uParams.faceSize * 2.0 - 1.0;
  let N = normalize(cubeDirection(gid.z, st));
  let color = textureSampleLevel(uSource, uSourceSampler, N, 0.0).rgb;
  textureStore(uOutput, vec2i(gid.xy), i32(gid.z), vec4f(color, 1.0));
}
`;
/**
* Compute shader prefiltering the radiance cubemap into one roughness level of
* the specular cubemap via GGX importance sampling (split-sum). Each sample is
* fetched from the radiance mip whose texel solid angle matches the sample's
* footprint (filtered importance sampling, Colbert & Krivánek), which removes
* the coherent under-sampling noise a full-resolution fetch produces. One
* dispatch per roughness level writes all six faces via a 2d-array view.
*/
const reflectionProbePrefilterShader = () => `
${PI}
${TWO_PI}
${saturate}

struct Params {
  faceSize: f32,
  roughness: f32,
  sampleCount: f32,
  cubeResolution: f32,
}

@group(0) @binding(0) var uRadianceCube: texture_cube<f32>;
@group(0) @binding(1) var uRadianceCubeSampler: sampler;
@group(0) @binding(2) var uOutput: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(3) var<uniform> uParams: Params;

${cubeDirection}
${ggxSampling}

fn prefilter(roughness: f32, R: vec3f) -> vec3f {
  let N = R;
  let V = R;
  var prefiltered = vec3f(0.0);
  var totalWeight = 0.0;
  let numSamples = u32(uParams.sampleCount);
  // Solid angle covered by one radiance-cube texel at the base resolution.
  let saTexel = 4.0 * PI / (6.0 * uParams.cubeResolution * uParams.cubeResolution);

  for (var i = 0u; i < numSamples; i++) {
    let Xi = hammersley(i, numSamples);
    let H = importanceSampleGGX(Xi, roughness, N);
    let L = normalize(2.0 * dot(V, H) * H - V);
    let NoL = saturateF32(dot(N, L));
    if (NoL > 0.0) {
      let NoH = saturateF32(dot(N, H));
      // pdf of the GGX sample (V == N so VoH == NoH, pdf = D / 4).
      let pdf = distributionGGX(NoH, roughness) * 0.25 + 1e-4;
      let saSample = 1.0 / (f32(numSamples) * pdf + 1e-4);
      // Pick the mip whose texel footprint matches this sample's solid angle.
      let mip = max(0.5 * log2(saSample / saTexel), 0.0);
      prefiltered += textureSampleLevel(uRadianceCube, uRadianceCubeSampler, L, mip).rgb * NoL;
      totalWeight += NoL;
    }
  }
  if (totalWeight <= 0.0) {
    return textureSampleLevel(uRadianceCube, uRadianceCubeSampler, R, 0.0).rgb;
  }
  return prefiltered / totalWeight;
}

@compute @workgroup_size(8, 8, 1)
fn computeMain(@builtin(global_invocation_id) gid: vec3u) {
  let size = u32(uParams.faceSize);
  if (gid.x >= size || gid.y >= size) { return; }

  let st = (vec2f(f32(gid.x), f32(gid.y)) + 0.5) / uParams.faceSize * 2.0 - 1.0;
  let N = normalize(cubeDirection(gid.z, st));

  var color: vec3f;
  if (uParams.roughness <= 0.0) {
    color = textureSampleLevel(uRadianceCube, uRadianceCubeSampler, N, 0.0).rgb;
  } else {
    color = prefilter(uParams.roughness, N);
  }

  textureStore(uOutput, vec2i(gid.xy), i32(gid.z), vec4f(color, 1.0));
}
`;

const CUBEMAP_SIZE = 256;
const RADIANCE_MIP_COUNT = 1 + Math.floor(Math.log2(CUBEMAP_SIZE));
const WORKGROUP_SIZE = 8;
const SUN_ANGULAR_RADIUS = Math.acos(.9999566769464484);
const SUN_MASK_TEXELS = 2;
const NO_SUN_MASK = 2;
const NO_SUN_DIRECTION = [
	0,
	1,
	0
];
/**
* Reflection probe system
*
* Filters the scene's environment (a skybox's user envMap or its analytic
* `_skyTexture`, both equirectangular HDR) into image-based lighting, entirely
* in compute:
*
* - Diffuse irradiance projected into L2 spherical harmonics (9 coefficients)
* - Specular radiance prefiltered into a native cubemap mip chain (split-sum)
*
* Adds to reflectionProbe components:
*
* - "_reflectionProbe": `{ specularTexture, irradianceCoefficients, sampler }`
*   consumed by the standard renderer's `USE_REFLECTION_PROBES` bindings.
*
* `update` is CPU only. `declareReflectionProbes` records the probe's outputs
* and its bake into the frame's graph, once per frame rather than per camera.
*/
var reflection_probe_default$1 = ({ ctx, frameGraph }) => ({
	type: "reflection-probe-system",
	cache: {},
	debug: false,
	shPipeline: null,
	equirectToCubePipeline: null,
	downsamplePipeline: null,
	prefilterPipeline: null,
	envSampler: null,
	createResources() {
		return {
			specularTexture: createTexture(ctx, {
				label: "reflectionProbeSpecularCubemap",
				width: CUBEMAP_SIZE,
				height: CUBEMAP_SIZE,
				depth: 6,
				viewDimension: "cube",
				mipLevelCount: 6,
				format: "rgba16float",
				usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.COPY_DST
			}),
			irradianceCoefficients: createBuffer(ctx, {
				label: "reflectionProbeIrradianceCoefficients",
				usage: "storage",
				size: 9 * 4 * Float32Array.BYTES_PER_ELEMENT
			}),
			sampler: createSampler(ctx, {
				filter: "linear",
				addressMode: "clamp-to-edge"
			}),
			roughnessLevels: 6
		};
	},
	/**
	* Builds probe resources from pre-baked IBL data (e.g. a glTF
	* `EXT_lights_image_based` light): uploads the file's specular mips and SH
	* coefficients as-is, with no compute-shader bake pass. The mip count comes
	* from the data itself rather than the fixed ROUGHNESS_LEVELS constant, so
	* the specular cubemap's own size is what the shader is told to sample
	* against (see systems/renderer/standard.ts's ROUGHNESS_LEVELS override).
	*/
	createPrebakedResources(data) {
		const roughnessLevels = data.specularImages.length;
		const specularTexture = createTexture(ctx, {
			label: "reflectionProbeSpecularCubemapPrebaked",
			width: data.specularImageSize,
			height: data.specularImageSize,
			depth: 6,
			viewDimension: "cube",
			mipLevelCount: roughnessLevels,
			format: "rgba8unorm",
			usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
		});
		for (let level = 0; level < roughnessLevels; level++) {
			const faces = data.specularImages[level];
			const faceSize = Math.max(1, data.specularImageSize >> level);
			for (let face = 0; face < faces.length; face++) copyExternalImage(ctx, specularTexture, faces[face], {
				origin: [
					0,
					0,
					face
				],
				mipLevel: level,
				width: faceSize,
				height: faceSize,
				flipY: true
			});
		}
		const irradianceData = new Float32Array(9 * 4);
		for (let i = 0; i < 9; i++) {
			const [r = 0, g = 0, b = 0] = data.irradianceCoefficients[i] ?? [];
			irradianceData[i * 4] = r;
			irradianceData[i * 4 + 1] = g;
			irradianceData[i * 4 + 2] = b;
		}
		return {
			specularTexture,
			irradianceCoefficients: createBuffer(ctx, {
				label: "reflectionProbeIrradianceCoefficientsPrebaked",
				usage: "storage",
				data: irradianceData
			}),
			sampler: createSampler(ctx, {
				filter: "linear",
				addressMode: "clamp-to-edge"
			}),
			roughnessLevels
		};
	},
	disposeResources(resources) {
		resources.specularTexture.dispose();
		resources.irradianceCoefficients.dispose();
	},
	/**
	* Records one probe's bake into this frame's graph: SH projection, the
	* radiance pyramid, and the GGX prefilter of every roughness level.
	*/
	declareBake(entity, cached) {
		const { resources, envMap } = cached;
		const luminanceScale = cached.luminanceScale ?? 1;
		const shPipeline = this.shPipeline ||= {
			compute: reflectionProbeSHShader(),
			entryPoint: "computeMain"
		};
		const equirectToCubePipeline = this.equirectToCubePipeline ||= {
			compute: reflectionProbeEquirectToCubeShader(),
			entryPoint: "computeMain"
		};
		const downsamplePipeline = this.downsamplePipeline ||= {
			compute: reflectionProbeDownsampleShader(),
			entryPoint: "computeMain"
		};
		const prefilterPipeline = this.prefilterPipeline ||= {
			compute: reflectionProbePrefilterShader(),
			entryPoint: "computeMain"
		};
		const envSampler = this.envSampler ||= createSampler(ctx, {
			filter: "linear",
			addressModeU: "repeat",
			addressModeV: "clamp-to-edge"
		});
		const scope = entity.id;
		const specular = frameGraph.importTexture(resources.specularTexture, `reflectionProbeSpecular.${scope}`);
		const irradiance = frameGraph.importBuffer(resources.irradianceCoefficients, `reflectionProbeIrradiance.${scope}`);
		const environment = frameGraph.importTexture(envMap, `reflectionProbeEnvMap.${scope}`);
		const radiance = frameGraph.createTexture({
			label: `reflectionProbeRadiance.${scope}`,
			width: CUBEMAP_SIZE,
			height: CUBEMAP_SIZE,
			depth: 6,
			viewDimension: "cube",
			mipLevelCount: RADIANCE_MIP_COUNT,
			format: "rgba16float"
		});
		const dispatch2d = (faceSize) => {
			const groups = Math.ceil(faceSize / WORKGROUP_SIZE);
			return [
				groups,
				groups,
				6
			];
		};
		const storageView = (level) => ({
			dimension: "2d-array",
			level,
			layer: 0,
			layerCount: 6
		});
		frameGraph.addPass({
			name: `reflectionProbeSH.${scope}`,
			type: "compute",
			writes: [irradiance],
			uniforms: {
				uEnvMap: environment,
				uEnvMapSampler: envSampler,
				uParams: {
					luminanceScale,
					sunCosCutoff: cached.sunCosCutoff ?? NO_SUN_MASK,
					sunDirection: cached.sunDirection ?? NO_SUN_DIRECTION
				}
			},
			execute: ({ uniforms, resolveBuffer, timestampWrites }) => {
				submit(ctx, {
					label: "reflectionProbeSHCmd",
					pipeline: shPipeline,
					uniforms: {
						...uniforms,
						uIrradianceCoefficients: resolveBuffer(irradiance)
					},
					dispatch: 1,
					...timestampWrites && { pass: {
						label: `reflectionProbeSH.${scope}`,
						timestampWrites
					} }
				});
			}
		});
		frameGraph.addPass({
			name: `reflectionProbeEquirectToCube.${scope}`,
			type: "compute",
			writes: [radiance],
			uniforms: {
				uEnvMap: environment,
				uEnvMapSampler: envSampler,
				uParams: {
					faceSize: CUBEMAP_SIZE,
					luminanceScale
				}
			},
			execute: ({ uniforms, resolveView, timestampWrites }) => {
				submit(ctx, {
					label: "reflectionProbeEquirectToCubeCmd",
					pipeline: equirectToCubePipeline,
					uniforms: {
						...uniforms,
						uOutput: resolveView(radiance, storageView(0))
					},
					dispatch: dispatch2d(CUBEMAP_SIZE),
					...timestampWrites && { pass: {
						label: `reflectionProbeEquirectToCube.${scope}`,
						timestampWrites
					} }
				});
			}
		});
		for (let level = 1; level < RADIANCE_MIP_COUNT; level++) {
			const faceSize = CUBEMAP_SIZE >> level;
			frameGraph.addPass({
				name: `reflectionProbeDownsample${level}.${scope}`,
				type: "compute",
				writes: [{
					handle: radiance,
					usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING
				}],
				uniforms: { uParams: { faceSize } },
				execute: ({ uniforms, resolveView, timestampWrites }) => {
					submit(ctx, {
						label: `reflectionProbeDownsampleCmd${level}`,
						pipeline: downsamplePipeline,
						uniforms: {
							...uniforms,
							uSource: resolveView(radiance, {
								dimension: "cube",
								level: level - 1,
								layer: 0,
								layerCount: 6
							}),
							uSourceSampler: resources.sampler,
							uOutput: resolveView(radiance, storageView(level))
						},
						dispatch: dispatch2d(faceSize),
						...timestampWrites && { pass: {
							label: `reflectionProbeDownsample${level}.${scope}`,
							timestampWrites
						} }
					});
				}
			});
		}
		for (let level = 0; level < 6; level++) {
			const faceSize = CUBEMAP_SIZE >> level;
			const isLastLevel = level === 6 - 1;
			frameGraph.addPass({
				name: `reflectionProbePrefilter${level}.${scope}`,
				type: "compute",
				writes: [specular],
				uniforms: {
					uRadianceCube: radiance,
					uRadianceCubeSampler: resources.sampler,
					uParams: {
						faceSize,
						roughness: level / (6 - 1),
						sampleCount: 256,
						cubeResolution: CUBEMAP_SIZE
					}
				},
				execute: ({ uniforms, resolveView, timestampWrites }) => {
					submit(ctx, {
						label: `reflectionProbePrefilterCmd${level}`,
						pipeline: prefilterPipeline,
						uniforms: {
							...uniforms,
							uOutput: resolveView(specular, storageView(level))
						},
						dispatch: dispatch2d(faceSize),
						...timestampWrites && { pass: {
							label: `reflectionProbePrefilter${level}.${scope}`,
							timestampWrites
						} }
					});
					if (isLastLevel) cached.needsBake = false;
				}
			});
		}
	},
	updateReflectionProbeEntity(entity, envMap, luminanceScale, sunPosition, dirty) {
		let cached = this.cache[entity.id];
		if (!cached || cached.data !== void 0) {
			if (cached) this.disposeResources(cached.resources);
			const resources = this.createResources();
			cached = this.cache[entity.id] = {
				resources,
				envMap: null
			};
			entity._reflectionProbe = {
				specularTexture: resources.specularTexture,
				irradianceCoefficients: resources.irradianceCoefficients,
				sampler: resources.sampler,
				roughnessLevels: resources.roughnessLevels
			};
			dirty = true;
		}
		if (cached.envMap !== envMap) {
			cached.envMap = envMap;
			dirty = true;
		}
		if (cached.luminanceScale !== luminanceScale) {
			cached.luminanceScale = luminanceScale;
			dirty = true;
		}
		cached.sunDirection ??= create();
		if (sunPosition) {
			normalize$1(set(cached.sunDirection, sunPosition));
			cached.sunCosCutoff = Math.cos(SUN_ANGULAR_RADIUS + SUN_MASK_TEXELS * Math.PI / envMap.height);
		} else cached.sunCosCutoff = NO_SUN_MASK;
		if (!dirty) return;
		entity.reflectionProbe.dirty = false;
		cached.needsBake = true;
	},
	/**
	* Pre-baked path (e.g. glTF `EXT_lights_image_based`): uploads once per
	* distinct `data` payload and otherwise leaves entity._reflectionProbe
	* untouched — never matched against a skybox, so it can't be overwritten by
	* the bake path even if an unrelated skybox+reflectionProbe pair exists
	* elsewhere in the scene.
	*/
	updatePrebakedReflectionProbeEntity(entity) {
		const { data } = entity.reflectionProbe;
		let cached = this.cache[entity.id];
		if (!cached || cached.data !== data) {
			if (cached) this.disposeResources(cached.resources);
			const resources = this.createPrebakedResources(data);
			cached = this.cache[entity.id] = {
				resources,
				envMap: null,
				data
			};
			entity._reflectionProbe = {
				specularTexture: resources.specularTexture,
				irradianceCoefficients: resources.irradianceCoefficients,
				sampler: resources.sampler,
				roughnessLevels: resources.roughnessLevels,
				intensity: data.intensity
			};
		}
		entity.reflectionProbe.dirty = false;
	},
	update(entities) {
		const skyboxEntities = entities.filter((e) => e.skybox);
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (!entity.reflectionProbe) continue;
			if (entity.reflectionProbe.data) this.updatePrebakedReflectionProbeEntity(entity);
			else {
				const skyboxEntity = skyboxEntities.find((s) => !entity.layer || entity.layer == s.layer);
				if (!skyboxEntity) continue;
				const skybox = skyboxEntity.skybox;
				const envMap = getSkyboxEnvMap(skybox);
				if (!envMap) continue;
				this.updateReflectionProbeEntity(entity, envMap, skybox._luminanceScale ?? 1, skybox.envMap ? void 0 : skybox.sunPosition, !!entity.reflectionProbe.dirty || !!skybox._skyTextureChanged);
			}
			this.updateRotation(entity, entity._transform?.modelMatrix);
		}
	},
	/**
	* Records every probe's outputs into this frame's graph, and the bake for
	* those whose environment changed under them.
	*/
	declareReflectionProbes(entities) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			const cached = this.cache[entity.id];
			if (!entity.reflectionProbe || !cached?.needsBake || !cached.envMap) continue;
			this.declareBake(entity, cached);
		}
	},
	updateRotation(entity, modelMatrix) {
		const probe = entity._reflectionProbe;
		if (!probe) return;
		probe.rotation = getEnvironmentRotation(probe.rotation ?? create$3(), modelMatrix);
	},
	dispose(entities) {
		if (entities) for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			const cached = this.cache[entity.id];
			if (cached) {
				this.disposeResources(cached.resources);
				delete this.cache[entity.id];
			}
		}
		else this.cache = {};
	}
});

const setAlpha = (color, a) => {
	if (a !== void 0) color[3] = a;
	return color;
};
/**
* Convert component from linear value
* @param {number} c
* @returns {number}
*/
const linearToSrgb = (c) => c <= .0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - .055;
/**
* Convert component to linear value
* @param {number} c
* @returns {number}
*/
const srgbToLinear = (c) => c > .04045 ? ((c + .055) / 1.055) ** 2.4 : c / 12.92;
/**
* Return a RGB representation from Linear values.
* @param {number} lr
* @param {number} lg
* @param {number} lb
* @param {Array} out
* @returns {import("./color.js").color}
*/
const linearToRgb = (lr, lg, lb, out) => {
	out[0] = linearToSrgb(lr);
	out[1] = linearToSrgb(lg);
	out[2] = linearToSrgb(lb);
	return out;
};
/**
* Return a Linear representation from RGB values.
* @param {number} r
* @param {number} g
* @param {number} b
* @param {Array} out
* @returns {import("./linear.js").linear}
*/
const rgbToLinear = (r, g, b, out) => {
	out[0] = srgbToLinear(r);
	out[1] = srgbToLinear(g);
	out[2] = srgbToLinear(b);
	return out;
};

/**
* @typedef {number[]} linear r g b linear values.
*
* All components in the range 0 <= x <= 1
* @see {@link https://en.wikipedia.org/wiki/SRGB}
*/
/**
* Updates a color based on linear values.
* @alias module:pex-color.fromLinear
* @param {import("./color.js").color} color
* @param {number} r
* @param {number} g
* @param {number} b
* @param {number} [a]
* @returns {import("./color.js").color}
*/
function fromLinear(color, r, g, b, a) {
	linearToRgb(r, g, b, color);
	return setAlpha(color, a);
}
/**
* Returns a linear color representation of a given color.
* @alias module:pex-color.toLinear
* @param {import("./color.js").color} color
* @param {Array} out
* @returns {linear}
*/
function toLinear([r, g, b, a], out = []) {
	rgbToLinear(r, g, b, out);
	return setAlpha(out, a);
}

const MIN_NEAR = .01;
const FAR_ENOUGH = 1e6;
/** Light components that can cast, in the order buckets index them. */
const LIGHT_KINDS = [
	"directionalLight",
	"pointLight",
	"spotLight",
	"areaLight"
];
/** Lights sharing a dimensionality and a size share one array texture. */
const bucketKey = (cubemap, size) => `${cubemap ? "cube" : "2d"}.${size}`;
/**
* Separator-prefixed scope, for the bucket labels and pass names that have to
* stay unique across layers. The scope itself is the camera layer verbatim, and
* that is what shadows are keyed by — the dot is punctuation for a composed
* name, not part of the identity.
*/
const nameSuffix = (scope) => scope ? `.${scope}` : "";
/** Distance from a point to the nearest point of a world-space AABB. */
const closestDistance = (worldBounds, point) => {
	const [min, max] = worldBounds;
	TEMP_VEC3[0] = Math.max(min[0], Math.min(point[0], max[0]));
	TEMP_VEC3[1] = Math.max(min[1], Math.min(point[1], max[1]));
	TEMP_VEC3[2] = Math.max(min[2], Math.min(point[2], max[2]));
	return distance(point, TEMP_VEC3);
};
/** Where a light stops contributing; only the falling-off kinds declare one. */
const lightRange = (light) => light.range ?? 0;
/**
* Entities the shadow pass is about. A caster puts geometry in the map; a
* receiver is depth-tested against it, and the frustum has to cover it too or
* it shadows itself at the clip boundary. Anything that does neither — helpers,
* unlit debug geometry — must not size the frustum, or it costs texel density
* everywhere and drags the near plane down for perspective lights.
*/
const shadowParticipants = (entities) => entities.filter((entity) => entity.geometry && entity.transform?.worldBounds && (entity.material?.castShadows || entity.material?.receiveShadows));
/**
* Shadow mapping methods, composed into the render-pipeline-system.
*
* Adds `_shadows` to every light it sees: one {@link LightShadow} per
* declaration scope, holding the fitted frustum, the bucket slot the shader
* samples, and — once the graph has allocated — the map itself.
*
* @private
*/
var shadow_mapping_default = ({ frameGraph }) => ({
	checkLight(light, lightEntity) {
		if (!lightEntity._transform) console.warn(NAMESPACE, `"${this.type}" light entity missing transform. Add a transformSystem.update(entities).`);
		else if (light._viewMatrix) return true;
		else console.warn(NAMESPACE, `"${this.type}" light component missing matrices. Add a lightSystem.update(entities).`);
	},
	/**
	* This scope's shadow for a light, created on first use and reused after —
	* the fields are rewritten every frame, so a fresh object per frame would be
	* an allocation per light per scope for nothing.
	*/
	getLightShadow(light, scope) {
		light._shadows ??= /* @__PURE__ */ new Map();
		let shadow = light._shadows.get(scope);
		if (!shadow) {
			shadow = {
				cubemap: false,
				bucket: 0,
				layer: 0,
				near: 0,
				far: 0,
				radiusUV: [0, 0],
				projectionMatrix: create$1(),
				texture: void 0
			};
			light._shadows.set(scope, shadow);
		}
		return shadow;
	},
	/**
	* Predicate rejecting world bounds the light cannot reach, used to keep the
	* shadow frustum fitted to what the map actually covers.
	*
	* Spot and area lights are cones — the same cone their shadow projection
	* uses, so the fit and the render agree by construction. `range` caps it
	* where the light stops contributing; without one the cone is open-ended and
	* only its sides reject.
	*/
	getLightVolumeTest(lightEntity, light) {
		const fov = lightEntity.spotLight ? 2 * lightEntity.spotLight.outerConeAngle : Math.PI / 2;
		const range = lightRange(light);
		perspectiveZO(TEMP_MAT4, fov, 1, MIN_NEAR, Number.isFinite(range) && range > 0 ? range : FAR_ENOUGH);
		computeFrustumPlanes(TEMP_FRUSTUM, TEMP_MAT4, light._viewMatrix);
		return (worldBounds) => isAABBInFrustum(worldBounds, TEMP_FRUSTUM);
	},
	computeLightProperties(lightEntity, light, participants, shadow) {
		light._sceneBboxInLightSpace ??= create$6();
		const perspective = !lightEntity.directionalLight;
		const inVolume = perspective ? this.getLightVolumeTest(lightEntity, light) : null;
		empty(light._sceneBboxInLightSpace);
		let near = Infinity;
		let far = 0;
		for (let i = 0; i < participants.length; i++) {
			const worldBounds = participants[i].transform.worldBounds;
			if (inVolume && !inVolume(worldBounds)) continue;
			const corners = getCorners(worldBounds, TEMP_BOUNDS_POINTS);
			for (let c = 0; c < corners.length; c++) {
				const p = multMat4(corners[c], light._viewMatrix);
				includePoint(light._sceneBboxInLightSpace, p);
				const distance = -p[2];
				if (distance <= 0) continue;
				if (distance < near) near = distance;
				if (distance > far) far = distance;
			}
		}
		if (perspective) {
			if (!Number.isFinite(near) || far <= 0) {
				near = MIN_NEAR;
				far = MIN_NEAR * 2;
			}
			const range = lightRange(light);
			if (range > 0) far = Math.min(far, range);
			shadow.near = Math.max(MIN_NEAR, near);
			shadow.far = Math.max(shadow.near + MIN_NEAR, far);
		} else {
			const [boxMin, boxMax] = light._sceneBboxInLightSpace;
			shadow.near = boxMax[2] === -Infinity ? MIN_NEAR : -boxMax[2];
			shadow.far = Math.max(shadow.near + MIN_NEAR, -boxMin[2]);
		}
		if (lightEntity.directionalLight) {
			const size$1 = size(light._sceneBboxInLightSpace, TEMP_VEC3);
			shadow.radiusUV[0] = light.bulbRadius / size$1[0];
			shadow.radiusUV[1] = light.bulbRadius / size$1[1];
		} else {
			const halfFov = lightEntity.spotLight ? lightEntity.spotLight.outerConeAngle : Math.PI / 4;
			const nearPlaneSize = 2 * shadow.near * Math.tan(halfFov);
			const scale = lightEntity.areaLight ? lightEntity.transform.scale : void 0;
			shadow.radiusUV[0] = light.bulbRadius * (scale ? scale[0] : 1) / nearPlaneSize;
			shadow.radiusUV[1] = light.bulbRadius * (scale ? scale[1] : 1) / nearPlaneSize;
		}
	},
	/** Radial near/far for a point light's cube projection, fitted to the scene. */
	computePointLightProperties(lightEntity, light, participants, shadow) {
		const lightPosition = lightEntity._transform.worldPosition;
		const range = light.range ?? 0;
		light._sceneBbox ??= create$6();
		empty(light._sceneBbox);
		for (let i = 0; i < participants.length; i++) {
			const worldBounds = participants[i].transform.worldBounds;
			if (range > 0 && closestDistance(worldBounds, lightPosition) > range) continue;
			includeAABB(light._sceneBbox, worldBounds);
		}
		const points = getCorners(light._sceneBbox, TEMP_BOUNDS_POINTS);
		let far = MIN_NEAR;
		for (let i = 0; i < points.length; i++) far = Math.max(far, distance(lightPosition, points[i]));
		if (range > 0) far = Math.min(far, range);
		shadow.near = Math.max(MIN_NEAR, closestDistance(light._sceneBbox, lightPosition));
		shadow.far = Math.max(shadow.near + MIN_NEAR, far);
	},
	/**
	* One array texture for every shadow-casting light that asked for the same
	* size, since a light is a layer rather than a texture of its own.
	*
	* Sizes are not snapped to a ladder: a bucket per distinct size costs one
	* binding each — normally one, every light having the default — and every
	* light keeps exactly the resolution it asked for.
	*
	* Persistent rather than pooled. A bucket lives as long as the lights in it,
	* and pooling would save nothing while costing identity: the texture is read
	* outside the graph (`LightShadow.texture`), so a debug view could never be
	* sure which frame's map it holds, and pex-gpu keys bind groups by texture,
	* so every material sampling it would get a fresh bind group every frame.
	*/
	createShadowMapBucket(size, count, cubemap, scope) {
		return frameGraph.createTexture({
			label: `shadowMaps${cubemap ? "Cube" : "2D"}.${size}${nameSuffix(scope)}`,
			width: size,
			height: size,
			format: "depth32float",
			persistent: true,
			depth: cubemap ? count * 6 : count,
			viewDimension: cubemap ? "cube-array" : "2d-array"
		});
	},
	/**
	* Shadow maps depend on the light and the scene, not on the camera, so a
	* frame with several cameras must declare them once — redeclaring would
	* re-render every map per camera and collide on pass names.
	*
	* Memoised per layer rather than per frame because that is the only thing
	* that changes the caster set. `entities` is the view's list, not the
	* engine's: casting from geometry the view never draws would put shadows in
	* it from nothing visible, and would fit the frustum to bounds off screen.
	*
	* A light without a `layer` is in every view, so it is declared once per
	* scope — which is why each declaration produces a {@link LightShadow} keyed
	* by that scope rather than a set of fields on the component.
	*/
	declareShadowMaps(entities, renderers, layer) {
		const key = `shadowMaps.${layer ?? ""}`;
		const memoized = frameGraph.blackboard.get(key);
		if (memoized) return memoized;
		const scope = layer ?? "";
		for (let i = 0; i < entities.length; i++) for (const kind of LIGHT_KINDS) {
			const light = entities[i][kind];
			if (light) this.getLightShadow(light, scope).texture = void 0;
		}
		const shadowMaps = [];
		const result = { shadowMaps };
		frameGraph.blackboard.set(key, result);
		if (!entities.filter((entity) => entity.geometry && entity.material?.castShadows).length) return result;
		const casters = [];
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			for (const kind of LIGHT_KINDS) {
				const light = entity[kind];
				if (light?.castShadows && this.checkLight(light, entity)) {
					const shadow = this.getLightShadow(light, scope);
					shadow.cubemap = kind === "pointLight";
					casters.push({
						entity,
						light,
						kind,
						shadow
					});
				}
			}
		}
		if (!casters.length) return result;
		const buckets = /* @__PURE__ */ new Map();
		for (const { light, shadow } of casters) {
			const size = light.shadowMapSize;
			const key = bucketKey(shadow.cubemap, size);
			let bucket = buckets.get(key);
			if (!bucket) {
				let index = 0;
				for (const other of buckets.values()) if (other.cubemap === shadow.cubemap) index++;
				bucket = {
					index,
					count: 0,
					size,
					cubemap: shadow.cubemap
				};
				buckets.set(key, bucket);
			}
			shadow.bucket = bucket.index;
			shadow.layer = bucket.count;
			bucket.count++;
		}
		const bucketMaps = /* @__PURE__ */ new Map();
		for (const [key, { size, count, cubemap }] of buckets) {
			const handle = this.createShadowMapBucket(size, count, cubemap, scope);
			bucketMaps.set(key, handle);
			shadowMaps.push(handle);
		}
		for (const { entity, light, kind, shadow } of casters) this.renderShadowMap(kind, entity, entities, renderers, scope, bucketMaps.get(bucketKey(shadow.cubemap, light.shadowMapSize)), shadow);
		return result;
	},
	/**
	* One light's shadow map, into the layer of the bucket it was assigned.
	*
	* A point light is six passes over six layers, one per cube face, and gets
	* its near/far radially; every other kind is a single pass whose projection
	* is the one the shader will sample back.
	*/
	renderShadowMap(kind, lightEntity, entities, renderers, scope, shadowMap, shadow) {
		const light = lightEntity[kind];
		const participants = shadowParticipants(entities);
		const shadowPass = (name, layer, camera) => {
			const renderView = {
				camera,
				viewport: [
					0,
					0,
					light.shadowMapSize,
					light.shadowMapSize
				]
			};
			frameGraph.addPass({
				name: `${name}${nameSuffix(scope)}`,
				color: [],
				depth: {
					texture: shadowMap,
					layer,
					depthClearValue: 1
				},
				renderView,
				execute: ({ resolveTexture }) => {
					shadow.texture = resolveTexture(shadowMap);
					this.drawMeshes({
						renderers,
						renderView,
						entitiesInView: entities,
						shadowMappingLight: light,
						lightShadow: shadow,
						transparent: false
					});
				}
			});
		};
		if (shadow.cubemap) {
			this.computePointLightProperties(lightEntity, light, participants, shadow);
			const projectionMatrix = create$1();
			for (let face = 0; face < 6; face++) {
				const { viewMatrix } = getCubeFaceCamera(face, lightEntity._transform.worldPosition, shadow.near, shadow.far, create$1(), projectionMatrix);
				shadowPass(`pointLightShadowMap${lightEntity.id}Face${face}`, shadow.layer * 6 + face, {
					projectionMatrix,
					viewMatrix
				});
			}
			return;
		}
		this.computeLightProperties(lightEntity, light, participants, shadow);
		if (kind === "directionalLight") {
			const [bboxMin, bboxMax] = light._sceneBboxInLightSpace;
			orthoZO(shadow.projectionMatrix, bboxMin[0], bboxMax[0], bboxMin[1], bboxMax[1], shadow.near, shadow.far);
		} else perspectiveZO(shadow.projectionMatrix, lightEntity.spotLight?.outerConeAngle ? 2 * lightEntity.spotLight.outerConeAngle : Math.PI / 2, 1, shadow.near, shadow.far);
		shadowPass(`${kind}ShadowMap${lightEntity.id}`, shadow.layer, {
			viewMatrix: light._viewMatrix,
			projectionMatrix: shadow.projectionMatrix
		});
	}
});

const createGraphState = () => ({
	resources: [],
	passes: [],
	passNames: /* @__PURE__ */ new Set(),
	persistentNames: /* @__PURE__ */ new Set(),
	importedResources: /* @__PURE__ */ new Map(),
	phase: "idle"
});
const resetGraphState = (state) => {
	state.resources.length = 0;
	state.passes.length = 0;
	state.passNames.clear();
	state.persistentNames.clear();
	state.importedResources.clear();
	state.phase = "idle";
};
/** Guards a phase-restricted call. */
const requirePhase = (state, expected, what, hint) => {
	if (state.phase === expected) return;
	throw new Error(`${NAMESPACE}: ${what} while the frame graph is "${state.phase}" — only valid while "${expected}".${hint ? ` ${hint}` : ""}`);
};
const isTextureDescriptor = (descriptor) => "width" in descriptor;

/**
* The built-in chain, in the order effects run _within a stage_ — which stage
* an effect runs at is its own (see `PostProcessingEffect.stage`).
*
* Closed, and deliberately so. The order is fixed because the image chain
* genuinely is sequential — bloom feeds combine, combine feeds smaa, smaa feeds
* final — and an effect from outside does not need a slot here: the frame graph
* already positions passes, and the pipeline's `declareFullscreenPass` gives an
* injected pass the same ergonomics a built-in gets. See that method for where
* to hook.
*
* The middle of it is Unity HDRP's: resolve, then defocus, then smear, then
* glare. What fixes the two depth-driven effects against each other is that
* depth of field reads a circle of confusion per pixel, so it has to run while
* the image still corresponds to the depth buffer — a smeared image no longer
* does. Motion blur only compares depths along its sample line, which survives
* a defocused image far better.
*/
const EFFECT_ORDER = [
	{
		name: "ssao",
		load: () => import("./_chunks/ssao-rPRcBHo3.js")
	},
	{
		name: "taa",
		load: () => import("./_chunks/taa-C6j99f8f.js")
	},
	{
		name: "dof",
		load: () => import("./_chunks/dof-DNtI1JH4.js")
	},
	{
		name: "motionBlur",
		load: () => import("./_chunks/motion-blur-DOOeS4ov.js")
	},
	{
		name: "bloom",
		load: () => import("./_chunks/bloom-DWMLnXd6.js")
	},
	{
		name: "lensFlare",
		load: () => import("./_chunks/lens-flare-C2JWEC85.js")
	},
	{
		name: "combine",
		load: () => import("./_chunks/combine-Cjdv9ZY_.js"),
		unconditional: true
	},
	{
		name: "smaa",
		load: () => import("./_chunks/smaa-jFjTPuK9.js")
	},
	{
		name: "final",
		load: () => import("./_chunks/final-D9j1-emJ.js"),
		unconditional: true
	}
];
/** Where an effect runs unless it names another stage: after the whole scene. */
const DEFAULT_STAGE = "postProcessing";
/** An effect's stage, resolved for one camera. */
const resolveStage = (effect, cameraEntity) => (typeof effect.stage === "function" ? effect.stage(cameraEntity) : effect.stage) ?? DEFAULT_STAGE;
const constantsKey = (constants) => Object.keys(constants).toSorted(compareStrings).map((key) => `${key}=${constants[key]}`).join("|");
/**
* Stable identity for a shader generator, so two sub-passes sharing a name but
* not a shader don't share a pipeline. Weak: a generator belongs to an effect
* module, and a module that is never loaded again should not be held alive.
*/
const shaderIds = /* @__PURE__ */ new WeakMap();
let nextShaderId = 0;
const shaderId = (shader) => shaderIds.getOrInsertComputed(shader, () => nextShaderId++);
/**
* Pipeline variants kept before the least recently used is dropped. Generous:
* the working set is one per sub-pass of every enabled effect, and the point is
* to bound a slider dragged through its range, not to ration normal use.
*/
const POST_PROCESSING_PIPELINE_LIMIT = 128;
/**
* Post-processing as frame graph passes.
*
* An effect is a function that declares passes, the same way the pipeline's own
* modules do. `context.pass` carries what is genuinely shared — the pipeline
* variant cache, the uniform block every shader binds, target allocation, and
* publishing the result — and hands back the handle, so wiring one pass into
* the next is a variable rather than a name looked up in the register.
*/
var post_processing_default = ({ ctx, frameGraph }) => ({
	postProcessingEffects: /* @__PURE__ */ new Map(),
	postProcessingLoading: /* @__PURE__ */ new Map(),
	postProcessingPipelines: /* @__PURE__ */ new Map(),
	/**
	* Fetch an effect module once. A failed import is remembered as null so a
	* missing or broken effect doesn't retry every frame.
	*/
	loadPostProcessingEffect({ name, load }) {
		if (this.postProcessingEffects.has(name)) return;
		let loading = this.postProcessingLoading.get(name);
		if (!loading) {
			loading = (async () => {
				try {
					const module = await load();
					if (typeof module.default?.declare !== "function") throw new TypeError(`"${name}" does not export a PostProcessingEffect.`);
					this.postProcessingEffects.set(name, module.default);
				} catch (error) {
					this.postProcessingEffects.set(name, null);
					console.error(NAMESPACE, "post-processing", `failed to load effect "${name}"`, error);
				} finally {
					this.postProcessingLoading.delete(name);
				}
			})();
			this.postProcessingLoading.set(name, loading);
		}
		return loading;
	},
	/**
	* Pex-gpu keys compiled pipelines by descriptor identity, so each shader
	* variant needs one stable object for the lifetime of the system.
	*
	* Bounded, because `constants` carries slider-driven counts — sample counts,
	* spiral turns — and not just feature flags, so dragging one mints a variant
	* per value. pex-gpu holds its compiled pipelines in a WeakMap keyed by the
	* descriptor, so dropping the oldest here is what makes them collectable.
	*/
	getPostProcessingPipeline(key, shader, defines, constants, blend, compute) {
		const variantKey = `${key}|${shaderId(shader)}|${definesKey(defines)}|${constantsKey(constants)}|${blend ? JSON.stringify(blend) : ""}`;
		const existing = this.postProcessingPipelines.get(variantKey);
		if (existing) {
			this.postProcessingPipelines.delete(variantKey);
			this.postProcessingPipelines.set(variantKey, existing);
			return existing;
		}
		const source = shader(defines);
		const specialization = Object.keys(constants).length ? { constants: mapValues(constants, Number) } : {};
		const variant = compute ? {
			compute: source,
			...specialization
		} : {
			shader: source,
			depthWriteEnabled: false,
			...specialization,
			...blend && { blend }
		};
		this.postProcessingPipelines.set(variantKey, variant);
		if (this.postProcessingPipelines.size > POST_PROCESSING_PIPELINE_LIMIT) {
			const oldest = this.postProcessingPipelines.keys().next().value;
			this.postProcessingPipelines.delete(oldest);
		}
		return variant;
	},
	/**
	* Declare one fullscreen pass, returning what it wrote.
	*
	* The helper the built-in effects get through `context.pass`, and a method on
	* the pipeline rather than a private function so anything joining the frame
	* from outside reaches it the same way — an injected pass then costs no more
	* to write than a built-in one, and the graph, not a registry, decides where
	* it goes:
	*
	* ```js
	* const pipeline = renderEngine.systems.find(
	*   (system) => system.type === "render-pipeline-system",
	* );
	* // Before every built-in post effect, or after all of them:
	* frameGraph.on("postProcessing", (textures) => {
	*   pipeline.declareFullscreenPass({ renderView: textures.renderView, textures, prefix: "myEffect" }, { ... });
	* });
	* // Or against one pass, wherever it lands:
	* frameGraph.afterPass(`combine.main.${cameraId}`, ...);
	* ```
	*
	* `overridePass` and `disablePass` take it from there for replacing or
	* dropping one. Publishing the result as `"color"` (via `chain`) is what
	* splices it into the image; nothing downstream has to be told it exists.
	*/
	declareFullscreenPass({ renderView, textures, prefix, srgb }, { name, shader, defines = /* @__PURE__ */ new Set(), constants = {}, blend, source, target, targets, size = [renderView.viewport[2], renderView.viewport[3]], format, mipLevelCount, level, views, uniforms, clearValue, chain }) {
		const viewId = renderView.cameraEntity.id;
		const key = `${prefix}.${name}`;
		const mipped = !!mipLevelCount && mipLevelCount > 1;
		const output = target ?? frameGraph.createTexture({
			label: `${key}_${viewId}`,
			width: Math.max(1, Math.trunc(size[0])),
			height: Math.max(1, Math.trunc(size[1])),
			format: format ?? (srgb ? "rgba8unorm-srgb" : "rgba16float"),
			...mipped && { mipLevelCount }
		});
		const input = source === void 0 ? textures.get("color") : source;
		const textureSize = (handle) => {
			const descriptor = frameGraph.describe(handle);
			return descriptor && isTextureDescriptor(descriptor) ? [descriptor.width, descriptor.height] : void 0;
		};
		const targetSize = textureSize(output) ?? size;
		const sourceSize = (input && textureSize(input)) ?? targetSize;
		const passUniforms = {
			...input && {
				uTexture: input,
				uTextureSampler: this.samplers.linear
			},
			uPostProcessing: {
				viewportSize: targetSize,
				texelSize: [1 / targetSize[0], 1 / targetSize[1]],
				sourceTexelSize: [1 / sourceSize[0], 1 / sourceSize[1]],
				time: this.time
			},
			...uniforms
		};
		const variant = this.getPostProcessingPipeline(key, shader, defines, constants, blend);
		frameGraph.addPass({
			name: `${key}.${viewId}`,
			color: [{
				texture: output,
				...level && { level },
				...clearValue && { clearValue }
			}, ...(targets ?? []).map(({ texture, clearValue: value }) => ({
				texture,
				...value && { clearValue: value }
			}))],
			uniforms: passUniforms,
			renderView,
			execute: ({ uniforms: resolved, resolveView }) => {
				this.drawFullscreen({
					label: key,
					pipeline: variant,
					uniforms: {
						...resolved,
						...mapValues(views ?? {}, ({ handle, ...view }) => resolveView(handle, view))
					}
				});
			}
		});
		textures.set(key, output);
		for (const target of targets ?? []) textures.set(`${prefix}.${target.name}`, target.texture);
		if (chain) textures.set("color", output);
		return output;
	},
	/**
	* Declare one compute dispatch, on the same terms a fullscreen pass gets: the
	* same pipeline cache, the same uniform block, the same naming.
	*
	* Nothing is returned — a dispatch writes through storage bindings the caller
	* already holds handles to, so there is no output to hand back. Those handles
	* must be listed in `writes`: they are not attachments, so the graph has no
	* other way to learn the pass produces them, and without it the pass is
	* culled and its targets never gain STORAGE_BINDING.
	*/
	declareComputePass({ renderView, prefix }, { name, shader, defines = /* @__PURE__ */ new Set(), constants = {}, dispatch, writes, uniforms, views }) {
		const viewId = renderView.cameraEntity.id;
		const key = `${prefix}.${name}`;
		const viewport = renderView.viewport;
		const variant = this.getPostProcessingPipeline(key, shader, defines, constants, void 0, true);
		frameGraph.addPass({
			name: `${key}.${viewId}`,
			type: "compute",
			...writes && { writes },
			uniforms: {
				uPostProcessing: {
					viewportSize: [viewport[2], viewport[3]],
					texelSize: [1 / viewport[2], 1 / viewport[3]],
					sourceTexelSize: [1 / viewport[2], 1 / viewport[3]],
					time: this.time
				},
				...uniforms
			},
			renderView,
			execute: ({ uniforms: resolved, resolveView, timestampWrites }) => {
				submit(ctx, {
					label: key,
					pipeline: variant,
					uniforms: {
						...resolved,
						...mapValues(views ?? {}, ({ handle, ...view }) => resolveView(handle, view))
					},
					dispatch,
					...timestampWrites && { pass: {
						label: key,
						timestampWrites
					} }
				});
			}
		});
	},
	/**
	* The effects this camera has switched on, in chain order, skipping any whose
	* module has not arrived.
	*
	* Loading starts here, so whichever question is asked first is also what
	* fetches. An effect switched on this frame therefore contributes from the
	* next one, which costs nothing: its passes are a frame behind for the same
	* reason, and an effect whose inputs are missing sits the frame out anyway.
	*/
	*enabledPostProcessingEffects(cameraEntity) {
		const component = cameraEntity.postProcessing;
		if (!component) return;
		for (const registration of EFFECT_ORDER) {
			const { name, unconditional } = registration;
			if (!unconditional && !component[name]) continue;
			this.loadPostProcessingEffect(registration);
			const effect = this.postProcessingEffects.get(name);
			if (effect) yield effect;
		}
	},
	/** Main pass outputs the enabled effects need. */
	postProcessingOutputs(cameraEntity) {
		const outputs = [];
		for (const { outputs: effectOutputs } of this.enabledPostProcessingEffects(cameraEntity)) {
			if (!effectOutputs) continue;
			outputs.push(...typeof effectOutputs === "function" ? effectOutputs(cameraEntity) : effectOutputs);
		}
		return outputs;
	},
	/**
	* The enabled effects grouped by the stage they declare at, so the pipeline
	* looks up rather than rescanning the chain at every boundary — and can see,
	* before opening any of them, that something is anchored at a stage which is
	* conditional. An effect at `"prePass"` is asking for a pre-pass, not just
	* for a place in the frame.
	*/
	postProcessingEffectsByStage(cameraEntity) {
		const byStage = /* @__PURE__ */ new Map();
		for (const effect of this.enabledPostProcessingEffects(cameraEntity)) {
			const stage = resolveStage(effect, cameraEntity);
			byStage.getOrInsertComputed(stage, () => []).push(effect);
		}
		return byStage;
	},
	/** Declare `effects`, in order, at the point in the frame reached now. */
	renderPostProcessing({ renderView, textures, effects }) {
		if (!effects?.length) return;
		const cameraEntity = renderView.cameraEntity;
		for (const effect of effects) {
			const scope = {
				renderView,
				textures,
				prefix: effect.name,
				...effect.srgb !== void 0 && { srgb: effect.srgb }
			};
			effect.declare({
				ctx,
				cameraEntity,
				renderView,
				viewport: renderView.viewport,
				time: this.time,
				frameIndex: this.frameIndex,
				samplers: this.samplers,
				textures,
				pass: (options) => this.declareFullscreenPass(scope, options),
				compute: (options) => this.declareComputePass(scope, options),
				createTexture: (descriptor) => frameGraph.createTexture(descriptor)
			});
		}
	}
});

const isEntityInFrustum = (entity, frustum) => entity.geometry.culled === false || isAABBInFrustum(entity.transform.worldBounds, frustum);
var culling_default = () => ({ cullEntities: (entities, camera) => camera.culling ? entities.filter((entity) => !entity.geometry || entity.transform && isEntityInFrustum(entity, camera.frustum)) : entities });

const perContext = /* @__PURE__ */ new WeakMap();
/**
* Vertex data for fullscreen passes. Immutable and shared for the lifetime of
* the context — the frame graph only owns resources whose lifetime is a frame,
* so this deliberately sits outside it.
*/
var fullscreen_geometry_default = (ctx) => perContext.getOrInsertComputed(ctx, () => ({
	triangle: {
		attributes: { position: createBuffer(ctx, {
			label: "fullscreenTrianglePosition",
			usage: "vertex",
			data: fullscreenTriangle.positions
		}) },
		count: 3
	},
	quad: {
		attributes: {
			position: createBuffer(ctx, {
				label: "fullscreenQuadPosition",
				usage: "vertex",
				data: quad.positions
			}),
			texCoord0: createBuffer(ctx, {
				label: "fullscreenQuadTexCoord0",
				usage: "vertex",
				data: quad.uvs
			})
		},
		indices: createBuffer(ctx, {
			label: "fullscreenQuadIndices",
			usage: "index",
			data: quad.cells
		})
	}
}));

var blit_exports = /* @__PURE__ */ __exportAll({ blitShader: () => blitShader });
const blitShader = (defines = /* @__PURE__ */ new Set(), options = {}) => {
	const hooks = options.hooks || {};
	return `
@group(0) @binding(0) var uTexture: texture_2d<f32>;
@group(0) @binding(1) var uTextureSampler: sampler;

struct VertexInput {
  @location(0) position: vec2f,
}

${vertexOutputStruct([{
		name: "texCoord0",
		type: "vec2f"
	}])}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = vec4f(input.position, 0.0, 1.0);
  output.texCoord0 = vec2f(input.position.x * 0.5 + 0.5, 0.5 - input.position.y * 0.5);

  return output;
}

${encode_decode_default}

${hooks.fragDeclarationsEnd ?? ""}

${fragmentOutputStruct()}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  var output: FragmentOutput;
  var color = textureSample(uTexture, uTextureSampler, input.texCoord0);
  color = encode(color, SRGB);

  ${defines.has("USE_PREMULTIPLIED_ALPHA") ? `// A canvas configured "premultiplied" reads the values as stored, so the
  // multiply belongs after the transfer function, not before it: the
  // compositor wants encode(rgb) * a, and premultiplying in linear space
  // would hand it encode(rgb * a).
  color = vec4f(color.rgb * color.a, color.a);` : ""}

  output.color = color;

  ${hooks.fragEnd ?? ""}

  return output;
}
`;
};

/**
* Copies the main pass's color target into the (same-or-smaller, power-of-two)
* grab pass texture, top-left anchored. Both textures share the same origin, so
* the fragment position doubles directly as the source texel coordinate — an
* exact copy needs no sampler or UV remap.
*/
const grabPassShader = (defines, options = {}) => {
	const hooks = options.hooks || {};
	return `
@group(0) @binding(0) var uTexture: texture_2d<f32>;

struct VertexInput {
  @location(0) position: vec2f,
}

${vertexOutputStruct([])}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = vec4f(input.position, 0.0, 1.0);
  return output;
}

${hooks.fragDeclarationsEnd ?? ""}

${fragmentOutputStruct()}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  var output: FragmentOutput;
  output.color = textureLoad(uTexture, vec2i(input.position.xy), 0);

  ${hooks.fragEnd ?? ""}

  return output;
}
`;
};

var depth_resolve_exports = /* @__PURE__ */ __exportAll({ depthResolveShader: () => depthResolveShader });
/**
* Resolves the multisampled depth buffer into a single-sample one.
*
* WebGPU has no depth resolve — `GPURenderPassDepthStencilAttachment` has no
* `resolveTarget` — so under MSAA the depth buffer stays multisampled, and a
* multisampled texture cannot be sampled. Everything that reads depth after the
* scene (ambient occlusion, depth of field, fog, SMAA's depth edges) needs this
* pass to exist at all.
*
* Nearest rather than an average: depth is not averageable. A mean across a
* silhouette names a depth belonging to neither surface, which puts occlusion
* samples and circles of confusion in mid-air. Taking the closest sample keeps
* thin foreground geometry at the cost of dilating silhouettes by a sample.
*
* The sample count is baked in rather than read back with `textureNumSamples`,
* so the loop has a literal bound the compiler can unroll. A loop whose trip
* count the driver supplies is one a bad answer turns into a GPU hang, and a
* hang here costs the device, not the frame. One variant per MSAA level, which
* in practice means one.
*/
const depthResolveShader = (sampleCount) => `
@group(0) @binding(0) var uDepthTexture: texture_depth_multisampled_2d;

struct VertexInput {
  @location(0) position: vec2f,
}

struct VertexOutput {
  @builtin(position) position: vec4f,
}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = vec4f(input.position, 0.0, 1.0);

  return output;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @builtin(frag_depth) f32 {
  // Both textures share the top-left origin, so the fragment position is the
  // source texel coordinate directly — no sampler, no UV remap.
  let coord = vec2i(input.position.xy);

  var nearest = 1.0;
  for (var i = 0; i < ${Math.max(1, Math.trunc(sampleCount))}; i++) {
    nearest = min(nearest, textureLoad(uDepthTexture, coord, i));
  }

  return nearest;
}
`;

/**
* Whether a shader sampling `texture_2d<f32>` through a filtering sampler can
* bind this format. Three ways it cannot: depth and stencil aspects bind as
* their own texture types, integer formats bind as `u32`/`i32`, and 32 bit
* float formats are filterable only with the `float32-filterable` feature,
* which the device may not have.
*/
const isFilterableFloat = (format, device) => !format.startsWith("depth") && !format.startsWith("stencil") && !format.endsWith("uint") && !format.endsWith("sint") && (!format.endsWith("32float") || !!device?.features.has("float32-filterable"));
const explainRequirements = ({ format, multisampled, filterableFloat }) => [
	format && `format ${format}`,
	!multisampled && "single-sample",
	filterableFloat && "sampleable as filterable float"
].filter(Boolean).join(" and ") || "no requirement";
/**
* The images one view has produced so far this frame, under the names the rest
* of the frame knows them by.
*
* Reading a name and publishing under a name are the only two operations, and
* everything uses them: the pipeline's own passes, each post-processing
* sub-pass, and anything injected at a `frameGraph.stage()`. Injecting a pass
* and declaring one are therefore the same act — declare passes, publish the
* last one's output under the name the next reader will ask for.
*
* `"color"` is the frame's image: whatever was published under it last is what
* post-processing reads, what the debug picker defaults to and what the blit
* presents. `"depth"`, `"normal"` and `"emissive"` come from the main pass when
* the pipeline was asked for them; post-processing publishes each sub-pass
* output as `"<effect>.<subPass>"`. Names are otherwise free-form.
*
* Attachments and sampled results share the register, which is why it is named
* for what the entries are — textures — and not for what half of them happen to
* be bound as.
*
* Handles belong to the frame being declared, so a register is only meaningful
* until the next `setup()` clears the graph.
*/
var RenderTextures = class {
	frameGraph;
	renderView;
	/**
	* Every handle published under a name, oldest first. History is what keeps a
	* mismatch local — see `get`.
	*/
	versions = /* @__PURE__ */ new Map();
	/**
	* Every publication in order, with how far into the frame it happened.
	* `versions` answers what a name holds; this answers when it changed, which
	* is what makes the register readable from `inspect()` output.
	*/
	publications = [];
	constructor(frameGraph, renderView) {
		this.frameGraph = frameGraph;
		this.renderView = renderView;
	}
	/** Publish `handle` as the current value of `name`. */
	set(name, handle) {
		this.versions.getOrInsertComputed(name, () => []).push(handle);
		this.publications.push({
			name,
			resource: handle.name,
			declaredAfter: this.frameGraph.state.passes.length
		});
	}
	/** {@link InspectableRegister}: picked up by `frameGraph.inspect()`. */
	inspectRegister() {
		return this.publications;
	}
	/**
	* Most recent handle published under `name` that meets `requirements`.
	*
	* Older versions are considered when the newest does not qualify, and the
	* substitution is reported: a pass that publishes an unusable `"color"` then
	* costs its own contribution and one error naming it, rather than a frame
	* that fails validation somewhere downstream. Nothing qualifying — the
	* pipeline was never asked for that output, or depth is multisampled under
	* MSAA — is not an error here, it is the answer: readers are expected to
	* check and sit the frame out.
	*/
	get(name, requirements = {}) {
		const versions = this.versions.get(name);
		if (!versions) return void 0;
		for (let i = versions.length - 1; i >= 0; i--) {
			const handle = versions[i];
			if (!this.meets(handle, requirements)) continue;
			if (i !== versions.length - 1) this.report(`"${name}" was last published as ${this.explain(versions.at(-1))}, which is not ${explainRequirements(requirements)}. Falling back to ${this.explain(handle)}.`);
			return handle;
		}
	}
	/** `get`, reporting once when nothing published under `name` qualifies. */
	require(name, requirements = {}) {
		const handle = this.get(name, requirements);
		if (handle) return handle;
		const latest = this.versions.get(name)?.at(-1);
		this.report(latest ? `no "${name}" texture that is ${explainRequirements(requirements)}: the frame published ${this.explain(latest)}.` : `nothing published under "${name}" this frame. Available: ${[...this.versions.keys()].join(", ")}.`);
	}
	meets(handle, requirements) {
		const descriptor = this.frameGraph.describe(handle);
		if (!descriptor || !isTextureDescriptor(descriptor)) return false;
		if (requirements.format && descriptor.format !== requirements.format) return false;
		if (requirements.filterableFloat && !isFilterableFloat(descriptor.format ?? "rgba8unorm", this.frameGraph.ctx?.device)) return false;
		return requirements.multisampled || (descriptor.sampleCount ?? 1) === 1;
	}
	/** A handle as it reads in a diagnostic: name, format, size, sample count. */
	explain(handle) {
		const descriptor = this.frameGraph.describe(handle);
		if (!descriptor || !isTextureDescriptor(descriptor)) return `"${handle.name}" (not a texture)`;
		const samples = (descriptor.sampleCount ?? 1) > 1 ? ` ×${descriptor.sampleCount}` : "";
		return `"${handle.name}" (${descriptor.format} ${descriptor.width}×${descriptor.height}${samples})`;
	}
	report(message) {
		if (this.frameGraph.reportedErrors.has(message)) return;
		this.frameGraph.reportedErrors.add(message);
		console.error(NAMESPACE, "render-textures", message);
	}
};

const BLIT_WGSL = blitShader();
const BLIT_PREMULTIPLIED_WGSL = blitShader(/* @__PURE__ */ new Set(["USE_PREMULTIPLIED_ALPHA"]));
const GRAB_PASS_WGSL = grabPassShader();
create$4();
/**
* Render pipeline system
*
* Adds:
*
* - "_shadows" to light components: one LightShadow per camera layer, holding the
*   fitted frustum, the bucket slot the shader samples and the map
*/
var render_pipeline_default = ({ ctx, frameGraph }) => ({
	type: "render-pipeline-system",
	time: 0,
	/** Frames rendered, from the engine. Indexes every per-frame sequence. */
	frameIndex: 0,
	debug: false,
	debugRender: "",
	reversibleToneMap: false,
	fullscreen: fullscreen_geometry_default(ctx),
	samplers: {
		linear: createSampler(ctx, { filter: "linear" }),
		nearest: createSampler(ctx, { filter: "nearest" }),
		linearRepeat: createSampler(ctx, {
			filter: "linear",
			addressMode: "repeat"
		})
	},
	/**
	* Premultiply on the way out, as a canvas configured `alphaMode:
	* "premultiplied"` requires. Follows the context, and settable for a caller
	* presenting somewhere else.
	*
	* Getting it wrong shows only where alpha is neither 0 nor 1 — a faded
	* output, or the soft edges of blended geometry — which is why it follows the
	* one place that knows rather than being repeated per app.
	*/
	premultipliedAlpha: ctx.alphaMode === "premultiplied",
	blitPipeline: {
		shader: BLIT_WGSL,
		depthWriteEnabled: false
	},
	blitPremultipliedPipeline: {
		shader: BLIT_PREMULTIPLIED_WGSL,
		depthWriteEnabled: false
	},
	grabPipeline: {
		shader: GRAB_PASS_WGSL,
		depthWriteEnabled: false
	},
	/**
	* Resolve the depth buffer under MSAA so it can be sampled. Off means
	* anything reading depth — ambient occlusion, depth of field, fog, SMAA's
	* depth edges — sits out the frame instead, and `render()` hands back the
	* multisampled buffer, which `RenderTextures.get` will refuse to hand to a
	* reader.
	*
	* Off by default only because MSAA itself currently hangs the GPU in the
	* multisampled scene pass; the resolve was measured innocent of that and can
	* go back on once it is fixed.
	*/
	depthResolve: false,
	depthResolvePipelines: /* @__PURE__ */ new Map(),
	/** One variant per MSAA level, since the sample loop is unrolled per count. */
	getDepthResolvePipeline(sampleCount) {
		return this.depthResolvePipelines.getOrInsertComputed(sampleCount, () => {
			return {
				shader: depthResolveShader(sampleCount),
				depthWriteEnabled: true,
				depthCompare: "always"
			};
		});
	},
	/**
	* Costs a second geometry pass, and buys two things: fragments that end up
	* hidden are rejected before the expensive shader runs, and geometry exists
	* before lighting, which is what ambient occlusion needs to be an input to
	* shading rather than a multiply over the result.
	*
	* Off by default — for a scene with little overdraw and a cheap shader the
	* extra pass is a net loss.
	*/
	depthPrePass: false,
	/** Always produced. Effects add to it — "normal", "emissive". */
	outputs: /* @__PURE__ */ new Set(["color", "depth"]),
	colorFormat: "rgba16float",
	depthFormat: "depth24plus",
	/**
	* Outputs whose contents are not colour, and so want neither the working
	* colour format nor its channel count. Motion vectors are a screen-space
	* offset: two channels, and signed, which rules out the UNORM formats.
	*/
	outputFormats: {
		velocity: "rg16float",
		responsive: "r8unorm"
	},
	...shadow_mapping_default({ frameGraph }),
	...post_processing_default({
		ctx,
		frameGraph
	}),
	...culling_default(),
	/** The fullscreen triangle, drawn by whatever the command asks for. */
	drawFullscreen(command) {
		submit(ctx, {
			attributes: this.fullscreen.triangle.attributes,
			count: this.fullscreen.triangle.count,
			...command
		});
	},
	/** Dispatch one pass' draws to every renderer implementing its entry point. */
	drawMeshes({ renderers, renderView, colorTextures, msaa, entitiesInView, shadowMappingLight, lightShadow, shadowScope, transparent, transmitted, cullMode, textures, prePass, reflectionProbe }) {
		const options = {
			frameIndex: this.frameIndex,
			outputs: colorTextures ?? {},
			multisampled: msaa,
			msaa: this.reversibleToneMap && msaa,
			textures,
			reflectionProbe,
			shadowScope
		};
		const draw = (method, entities, passOptions) => {
			for (let i = 0; i < renderers.length; i++) renderers[i][method]?.(renderView, entities, passOptions);
		};
		if (shadowMappingLight) return draw("renderShadow", entitiesInView, {
			...options,
			shadowMappingLight,
			lightShadow
		});
		const visible = this.cullEntities(entitiesInView, renderView.camera);
		if (prePass) return draw("renderPrePass", visible, {
			outputs: colorTextures ?? {},
			multisampled: msaa,
			frameIndex: this.frameIndex
		});
		if (transparent) return draw("renderTransparent", visible, options);
		draw("renderOpaque", visible, {
			...options,
			transmitted,
			cullMode
		});
		if (!transmitted) draw("renderBackground", entitiesInView, options);
	},
	async update(entities, options = {}) {
		const { time = 0, frameIndex = 0, renderers = [], drawToScreen = true } = options;
		this.time = time;
		this.frameIndex = frameIndex;
		const renderView = options.renderView ?? (() => {
			const entity = entities.find((entity) => entity.camera);
			return {
				cameraEntity: entity,
				camera: entity.camera,
				viewport: getDefaultViewport(ctx)
			};
		})();
		const { camera } = renderView;
		const cameraEntity = renderView.cameraEntity;
		const width = renderView.viewport[2];
		const height = renderView.viewport[3];
		const postProcessing = cameraEntity.postProcessing;
		const viewId = cameraEntity.id;
		const outputs = new Set(this.outputs);
		for (const name of this.postProcessingOutputs(cameraEntity)) outputs.add(name);
		await frameGraph.stage("outputs", {
			outputs,
			renderView
		});
		const useTAA = !!postProcessing?.taa;
		const requestedSampleCount = (useTAA ? 1 : postProcessing?.msaa?.sampleCount) ?? 1;
		const sampleCount = requestedSampleCount > 1 ? 4 : 1;
		const msaa = sampleCount > 1;
		const renderPassView = {
			...renderView,
			viewport: [
				0,
				0,
				width,
				height
			]
		};
		const textures = new RenderTextures(frameGraph, renderPassView);
		if (requestedSampleCount > 1 && requestedSampleCount !== sampleCount) textures.report(`msaa.sampleCount ${requestedSampleCount} is not a supported sample count — using ${sampleCount}.`);
		if (useTAA && (postProcessing?.msaa?.sampleCount ?? 0) > 1) textures.report("both \"taa\" and \"msaa\" are enabled. Temporal antialiasing supersedes multisampling — rendering single-sample.");
		const sceneOutputs = SCENE_OUTPUT_MEMBERS.map(({ name }) => name);
		const colorOutputs = [
			"color",
			...sceneOutputs.filter((name) => outputs.has(name)),
			...outputs.difference(/* @__PURE__ */ new Set([
				"color",
				"depth",
				...sceneOutputs
			]))
		];
		const colorTextures = {};
		const msaaColorTextures = {};
		for (const name of colorOutputs) {
			const descriptor = {
				width,
				height,
				format: this.outputFormats[name] ?? this.colorFormat
			};
			colorTextures[name] = frameGraph.createTexture({
				label: `renderPipeline.${name}.${viewId}`,
				...descriptor
			});
			textures.set(name, colorTextures[name]);
			if (msaa) msaaColorTextures[name] = frameGraph.createTexture({
				label: `renderPipeline.${name}MSAA.${viewId}`,
				...descriptor,
				sampleCount
			});
		}
		let depthTexture;
		if (outputs.has("depth")) {
			depthTexture = frameGraph.createTexture({
				label: `renderPipelineDepth${msaa ? "MSAA" : ""}.${viewId}`,
				width,
				height,
				format: this.depthFormat,
				...msaa && { sampleCount }
			});
			textures.set("depth", depthTexture);
		}
		frameGraph.blackboard.set(`renderTextures.${viewId}`, textures);
		/**
		* Resolved per pass, not captured once, so a pass injected mid-scene can
		* republish an image and have the passes after it draw into that one.
		*
		* MSAA cannot: WebGPU has no way to load a single-sample image back into
		* the multisampled attachment its resolve target came from. Reads still
		* work — the resolve runs at the end of every pass declaring it — but a
		* replacement has nowhere to go, so it is reported rather than dropped.
		*/
		const colorTarget = (name) => {
			const published = textures.get(name) ?? colorTextures[name];
			if (!msaa) return { texture: published };
			if (published !== colorTextures[name]) textures.report(`"${name}" was republished as ${textures.explain(published)} while the scene passes were still drawing, which MSAA cannot pick up. Move the pass to a stage after them, or turn MSAA off.`);
			return {
				texture: msaaColorTextures[name],
				resolveTarget: colorTextures[name]
			};
		};
		const depthTarget = () => ({ texture: depthTexture });
		/**
		* Republishes the depth buffer as something readers can bind.
		*
		* WebGPU has no depth resolve, so under MSAA the depth buffer stays
		* multisampled and `textures.get("depth")` rightly refuses to hand it back
		* — which is enough to make ambient occlusion, depth of field, fog and
		* SMAA's depth edges all sit out. One fullscreen pass over the samples is
		* what lets them run with MSAA on at all.
		*
		* Declared where depth is first complete, since an effect anchored at the
		* pre-pass stage reads it there.
		*/
		const declareDepthResolve = () => {
			if (!msaa || !depthTexture || !this.depthResolve) return;
			const label = `depthResolve.${viewId}`;
			const resolved = frameGraph.createTexture({
				label: `renderPipelineDepthResolved.${viewId}`,
				width,
				height,
				format: this.depthFormat
			});
			const pipeline = this.getDepthResolvePipeline(sampleCount);
			frameGraph.addPass({
				name: label,
				depth: {
					texture: resolved,
					depthClearValue: 1
				},
				uniforms: { uDepthTexture: depthTexture },
				renderView: renderPassView,
				execute: ({ uniforms }) => {
					this.drawFullscreen({
						label,
						pipeline,
						uniforms
					});
				}
			});
			textures.set("depth", resolved);
		};
		const layer = cameraEntity.layer;
		/**
		* A stage boundary. Every stage is an anchor, not just "postProcessing",
		* which is what lets an effect declare its passes mid-frame and still read
		* and publish through the same register as the rest.
		*
		* External callbacks run before the effects anchored there, so an effect
		* sees what they published.
		*/
		const effectsByStage = this.postProcessingEffectsByStage(cameraEntity);
		const stage = async (name) => {
			await frameGraph.stage(name, textures);
			this.renderPostProcessing({
				renderView: renderPassView,
				textures,
				effects: effectsByStage.get(name)
			});
			effectsByStage.delete(name);
		};
		await stage("lights");
		const entitiesInView = layer ? entities.filter((entity) => !entity.layer || entity.layer === layer) : entities.filter((entity) => !entity.layer);
		const { shadowMaps } = this.declareShadowMaps(entitiesInView, renderers, layer);
		const environmentReads = [];
		let reflectionProbe;
		for (const entity of entitiesInView) {
			const envMap = entity.skybox && getSkyboxEnvMap(entity.skybox);
			if (envMap) environmentReads.push(frameGraph.importTexture(envMap, `skyboxEnvMap.${entity.id}`));
			if (entity._reflectionProbe && !reflectionProbe) {
				reflectionProbe = entity._reflectionProbe;
				environmentReads.push(frameGraph.importTexture(reflectionProbe.specularTexture, `reflectionProbeSpecular.${entity.id}`), frameGraph.importBuffer(reflectionProbe.irradianceCoefficients, `reflectionProbeIrradiance.${entity.id}`));
			}
		}
		const drawMeshOptions = {
			renderers,
			renderView,
			msaa,
			entitiesInView,
			shadowScope: layer ?? "",
			transparent: false,
			transmitted: false,
			reflectionProbe
		};
		/**
		* One pass of scene geometry, differing only in what it draws and where.
		*
		* `outputs` is both the attachment list and what the renderers declare
		* their fragment outputs from — the shaders number their `@location()`s
		* from it, so the two can never be allowed to disagree.
		*
		* A renderer names the images it samples through `inputs` — the frame's
		* ambient occlusion, the grabbed background — rather than the pipeline
		* threading one parameter per texture down to it. Resolving them here is
		* what makes the ask a real read edge; a name nothing published is simply
		* absent from the map the renderer receives.
		*/
		const scenePass = (name, passOptions, { outputs = {
			color: colorTextures.color,
			...colorTextures.responsive && { responsive: colorTextures.responsive }
		}, clearValue, depthClearValue } = {}) => {
			const inputs = {};
			for (const renderer of renderers) for (const input of renderer.inputs?.(passOptions) ?? []) {
				const handle = textures.get(input);
				if (handle) inputs[input] = handle;
			}
			frameGraph.addPass({
				name: `${name}.${viewId}`,
				color: Object.keys(outputs).map((output, index) => ({
					...colorTarget(output),
					...index === 0 && clearValue && { clearValue }
				})),
				...depthTexture && { depth: {
					...depthTarget(),
					...depthClearValue !== void 0 && { depthClearValue }
				} },
				reads: [
					...shadowMaps,
					...environmentReads,
					...Object.values(inputs)
				],
				renderView: renderPassView,
				execute: ({ resolveTexture }) => {
					this.drawMeshes({
						...passOptions,
						colorTextures: outputs,
						textures: mapValues(inputs, resolveTexture)
					});
				}
			});
		};
		const usePrePass = (this.depthPrePass || effectsByStage.has("prePass")) && !!depthTexture;
		const prePassOutputs = usePrePass && colorTextures.normal ? { normal: colorTextures.normal } : {};
		const prePassNormal = !!prePassOutputs.normal;
		const mainOutputs = prePassNormal ? Object.fromEntries(Object.entries(colorTextures).filter(([name]) => name !== "normal")) : colorTextures;
		if (usePrePass) {
			frameGraph.addPass({
				name: `depthPrePass.${viewId}`,
				color: prePassNormal ? [colorTarget("normal")] : [],
				depth: {
					...depthTarget(),
					depthClearValue: 1
				},
				renderView: renderPassView,
				execute: () => {
					this.drawMeshes({
						...drawMeshOptions,
						prePass: true,
						colorTextures: prePassOutputs
					});
				}
			});
			declareDepthResolve();
			await stage("prePass");
		}
		await stage("opaque");
		scenePass("opaque", drawMeshOptions, {
			outputs: mainOutputs,
			clearValue: toLinear(camera.backgroundColor ?? [
				0,
				0,
				0,
				1
			]),
			...!usePrePass && { depthClearValue: 1 }
		});
		if (!usePrePass) declareDepthResolve();
		const hasTransparent = entitiesInView.some((entity) => entity.material?.blend);
		const hasTransmitted = entitiesInView.some((entity) => entity.material?.transmission);
		if (hasTransparent) {
			await stage("transparent");
			scenePass("transparent", {
				...drawMeshOptions,
				transparent: true
			});
		}
		if (hasTransmitted) {
			await stage("transmission");
			const mipLevelCount = 1 + Math.floor(Math.log2(Math.max(width, height)));
			const hasBackTransmitted = entitiesInView.some((entity) => entity.material?.transmission && entity.material.cullMode === "none");
			const grabPass = (name) => {
				const label = `${name}.${viewId}`;
				const grab = frameGraph.createTexture({
					label,
					width,
					height,
					format: this.colorFormat,
					mipLevelCount
				});
				frameGraph.addPass({
					name: label,
					color: [{ texture: grab }],
					uniforms: { uTexture: textures.get("color") },
					renderView: renderPassView,
					execute: ({ uniforms }) => {
						this.drawFullscreen({
							label,
							pipeline: this.grabPipeline,
							uniforms
						});
					}
				});
				if (mipLevelCount > 1) frameGraph.addPass({
					name: `${label}.mips`,
					type: "raw",
					writes: [{
						handle: grab,
						usage: GPUTextureUsage.RENDER_ATTACHMENT
					}],
					execute: ({ resolveTexture, encoder }) => {
						generateMipmaps(ctx, resolveTexture(grab), { encoder });
					}
				});
				textures.set("transmission.grab", grab);
			};
			const transmitted = {
				...drawMeshOptions,
				transmitted: true
			};
			grabPass("grab");
			if (hasBackTransmitted) {
				scenePass("transmissionBack", {
					...transmitted,
					cullMode: "front"
				});
				grabPass("grabTransmissionBack");
			}
			scenePass("transmissionFront", {
				...transmitted,
				...hasBackTransmitted && { cullMode: "back" }
			});
		}
		await stage("postProcessing");
		await stage("present");
		for (const [name, effects] of effectsByStage) textures.report(`${effects.map((effect) => `"${effect.name}"`).join(", ")} declared at the "${name}" stage, which this frame never opened, so nothing was drawn for them.`);
		const color = textures.require("color");
		if (drawToScreen !== false) {
			const presented = this.debugRender && textures.require(this.debugRender, { filterableFloat: true }) || color;
			const label = `blit.${viewId}`;
			frameGraph.addPass({
				name: label,
				uniforms: {
					uTexture: presented,
					uTextureSampler: this.samplers.linear
				},
				renderView,
				neverCull: true,
				execute: ({ uniforms }) => {
					this.drawFullscreen({
						label,
						pipeline: this.premultipliedAlpha ? this.blitPremultipliedPipeline : this.blitPipeline,
						uniforms,
						viewport: renderView.viewport
					});
				}
			});
		}
		const outputTextures = {
			...mapValues(colorTextures, (handle, name) => textures.get(name) ?? handle),
			color,
			...depthTexture && { depth: textures.get("depth") ?? depthTexture }
		};
		for (const handle of Object.values(outputTextures)) frameGraph.exportTexture(handle);
		return outputTextures;
	},
	dispose(entities) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (entity.material) {
				for (const property of Object.values(entity.material)) if (isGpuTexture(property)) property.dispose();
			}
		}
		this.postProcessingPipelines.clear();
		this.depthResolvePipelines.clear();
	}
});

var sky_exports = /* @__PURE__ */ __exportAll({ skyShader: () => skyShader });
const skyShader = (defines, options = {}) => {
	const hooks = options.hooks || {};
	const outputs = options.outputs ?? {};
	return `
struct Sky {
  sunPosition: vec3f,
  parameters: vec4f, // turbidity, rayleigh, mieCoefficient, mieDirectionalG
}
@group(0) @binding(0) var<uniform> uSky: Sky;

struct VertexInput {
  @location(0) position: vec2f,
}

${vertexOutputStruct([
		{
			name: "texCoord0",
			type: "vec2f"
		},
		{
			name: "sunDirection",
			type: "vec3f"
		},
		{
			name: "sunfade",
			type: "f32"
		},
		{
			name: "sunE",
			type: "f32"
		},
		{
			name: "betaR",
			type: "vec3f"
		},
		{
			name: "betaM",
			type: "vec3f"
		},
		{
			name: "mieDirectionalG",
			type: "f32"
		}
	])}

${fragmentOutputStruct(sceneOutputMembers(outputs))}

// Vertex includes
${PI}
${saturate}
${sky_default}

${hooks.vertDeclarationsEnd ?? ""}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;

  let sky = skyVertex(uSky.sunPosition, uSky.parameters);
  output.sunDirection = sky.sunDirection;
  output.sunfade = sky.sunfade;
  output.sunE = sky.sunE;
  output.betaR = sky.betaR;
  output.betaM = sky.betaM;
  output.mieDirectionalG = sky.mieDirectionalG;

  output.texCoord0 = input.position * 0.5 + 0.5;
  output.position = vec4f(input.position, 0.0, 1.0);

  ${hooks.vertEnd ?? ""}

  return output;
}

${hooks.fragDeclarationsEnd ?? ""}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  var output: FragmentOutput;

  // Texture coordinates to direction:
  // https://web.archive.org/web/20170606085139/http://gl.ict.usc.edu/Data/HighResProbes/
  let theta = PI * (input.texCoord0.x * 2.0 - 1.0);
  let phi = PI * (1.0 - input.texCoord0.y);
  let direction = vec3f(sin(phi) * sin(theta), cos(phi), -sin(phi) * cos(theta));

  let sky = SkyData(
    input.sunDirection,
    input.sunfade,
    input.sunE,
    input.betaR,
    input.betaM,
    input.mieDirectionalG,
  );

  // Linear HDR in the model's own units — systems/skybox.ts calibrates them to
  // cd/m² downstream, alongside the equivalent multiply for an env map. Clamped
  // to the float16 max so the sun disc, which reaches ~4.5e5 units at zenith,
  // is never stored as Inf.
  let color = min(skyFrag(direction, sky), vec3f(65504.0));

  output.color = vec4f(color, 1.0);

  ${outputs.normal ? "output.normal = vec4f(0.0, 0.0, 1.0, 1.0);" : ""}
  ${outputs.emissive ? "output.emissive = vec4f(0.0);" : ""}

  ${hooks.fragEnd ?? ""}

  return output;
}
`;
};

const parameters = [
	"turbidity",
	"rayleigh",
	"mieCoefficient",
	"mieDirectionalG"
];
/**
* Skybox system
*
* Adds:
*
* - "_skyTexture" to skybox components with no envMap for skybox-renderer to
*   render
* - "_skyTextureChanged" to skybox components for reflection-probe system
*
* `update` is CPU only. `declareSkybox` records the environment map and its
* bake into the frame's graph, once per frame rather than per camera.
*/
const SKY_REFERENCE_IRRADIANCE = 20.3;
var skybox_default$2 = ({ ctx, frameGraph }) => ({
	type: "skybox-system",
	cache: {},
	debug: false,
	pipeline: null,
	updateSkyboxEntity(entity) {
		const skybox = entity.skybox;
		let cached = this.cache[entity.id];
		if (!cached) {
			skybox._skyTexture = createTexture(ctx, {
				label: "skyTexture",
				width: 512,
				height: 256,
				format: "rgba16float"
			});
			cached = this.cache[entity.id] = {
				sunPosition: [...skybox.sunPosition],
				parameters: [],
				needsBake: true
			};
		}
		if (distance(cached.sunPosition, skybox.sunPosition) > 0) {
			set(cached.sunPosition, skybox.sunPosition);
			skybox.dirty = true;
		}
		for (let i = 0; i < parameters.length; i++) {
			const value = skybox[parameters[i]] ?? 0;
			if (cached.parameters[i] !== value) {
				cached.parameters[i] = value;
				skybox.dirty = true;
			}
		}
		if (skybox.dirty) {
			skybox.dirty = false;
			cached.needsBake = true;
		}
		skybox._skyTextureChanged = cached.needsBake;
	},
	update(entities) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (entity.skybox) {
				entity.skybox._skyTextureChanged = false;
				const intensity = entity.skybox.intensity ?? 1;
				entity.skybox._luminanceScale = entity.skybox.envMap ? intensity : intensity / SKY_REFERENCE_IRRADIANCE;
				if (!entity.skybox.envMap && entity.skybox.sunPosition) this.updateSkyboxEntity(entity);
			}
		}
	},
	/**
	* Records the analytic sky bake into this frame's graph, for every skybox
	* whose sky has moved since it was last drawn.
	*/
	declareSkybox(entities) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			const skybox = entity.skybox;
			const cached = this.cache[entity.id];
			if (!skybox?._skyTexture || !cached?.needsBake) continue;
			const pipeline = this.pipeline ||= { shader: skyShader(/* @__PURE__ */ new Set(), {}) };
			const skyTexture = frameGraph.importTexture(skybox._skyTexture, `skyTexture.${entity.id}`);
			frameGraph.addPass({
				name: `skyTexture.${entity.id}`,
				color: [{
					texture: skyTexture,
					clearValue: [
						0,
						0,
						0,
						0
					]
				}],
				uniforms: { uSky: {
					sunPosition: cached.sunPosition,
					parameters: cached.parameters
				} },
				execute: ({ uniforms }) => {
					submit(ctx, {
						label: "skyboxUpdateSkyTextureCmd",
						pipeline,
						...fullscreen_geometry_default(ctx).triangle,
						uniforms
					});
					cached.needsBake = false;
				}
			});
		}
	},
	dispose(entities) {
		if (entities) for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (this.cache[entity.id]) {
				entity.skybox?._skyTexture?.dispose();
				delete this.cache[entity.id];
			}
		}
		else this.cache = {};
	}
});

function updateSkin(skin) {
	const joints = skin.joints;
	const jointMatrices = skin.jointMatrices;
	const inverseBindMatrices = skin.inverseBindMatrices;
	const previous = skin._previousJointMatrices ??= joints.map(() => create$1());
	const seed = !skin._hasPreviousJointMatrices;
	skin._hasPreviousJointMatrices = true;
	for (let i = 0; i < joints.length; i++) {
		const joint = joints[i];
		const m = jointMatrices[i];
		set$2(previous[i], m);
		identity(m);
		if (joint._transform) {
			const modelMatrix = joint._transform.modelMatrix;
			mult(m, modelMatrix);
			mult(m, inverseBindMatrices[i]);
		}
		if (seed) set$2(previous[i], m);
	}
}
/** Skin system */
var skin_default$1 = () => ({
	type: "skin-system",
	updateSkin,
	update(entities) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (entity.skin) updateSkin(entity.skin);
		}
	}
});

function updateModelMatrix(matrix, transform) {
	identity(matrix);
	if (transform.position) translate(matrix, transform.position);
	if (transform.rotation) mult(matrix, fromQuat(TEMP_MAT4, transform.rotation));
	if (transform.scale) scale$1(matrix, transform.scale);
}
/**
* Transform system
*
* Adds:
*
* - "worldBounds", "dirty" and "aabbDirty" to transform components
* - "_transform" to entities as reference to internal cache
*/
var transform_default$1 = () => ({
	type: "transform-system",
	cache: {},
	debug: false,
	updateModelMatrix,
	sort(entities) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			let parent = entity.transform;
			let depth = 0;
			while (parent) {
				parent = parent.parent;
				if (parent) depth++;
			}
			entity.transform.depth = depth;
		}
		entities.sort((a, b) => a.transform.depth - b.transform.depth);
	},
	updateModelMatrixHierarchy(matrix, transform) {
		identity(matrix);
		const parents = [];
		let parent = transform;
		while (parent) {
			parents.unshift(parent);
			parent = parent.parent;
		}
		for (let i = 0; i < parents.length; i++) {
			const parent = parents[i];
			if (parent.entity) {
				const cachedTransform = this.cache[parent.entity.id];
				if (cachedTransform) mult(matrix, cachedTransform.localModelMatrix);
				else console.error(this.type, "missing cachedTransform", parent);
			} else console.error(this.type, "missing entity", parent);
		}
	},
	updateTransformEntity(entity) {
		const transform = entity.transform;
		let isNotCached = false;
		if (!this.cache[entity.id]) {
			this.cache[entity.id] = {
				transform,
				modelMatrix: create$1(),
				previousModelMatrix: create$1(),
				hasPreviousModelMatrix: false,
				localModelMatrix: create$1(),
				worldPosition: create()
			};
			isNotCached = true;
		}
		const cached = this.cache[entity.id];
		transform.worldBounds ||= create$6();
		if (!(cached.transform !== transform || isNotCached || transform.dirty)) return;
		transform.dirty = false;
		cached.transform = transform;
		if (this.debug) {}
		updateModelMatrix(cached.localModelMatrix, transform);
	},
	updateBoundingBox(transform) {
		if (transform.entity && transform.entity.geometry && transform.entity.geometry.bounds && !isEmpty(transform.entity.geometry.bounds)) {
			getCorners(transform.entity.geometry.bounds, TEMP_BOUNDS_POINTS);
			for (let i = 0; i < TEMP_BOUNDS_POINTS.length; i++) multMat4(TEMP_BOUNDS_POINTS[i], this.cache[transform.entity.id].modelMatrix);
			fromPoints(TEMP_AABB, TEMP_BOUNDS_POINTS);
			includeAABB(transform.worldBounds, TEMP_AABB);
		}
		if (transform.parent?.worldBounds) includeAABB(transform.parent.worldBounds, transform.worldBounds);
	},
	update(entities) {
		const transformEntities = entities.filter((entity) => entity.transform);
		for (let i = 0; i < transformEntities.length; i++) {
			const entity = transformEntities[i];
			entity.transform.entity ||= entity;
			this.updateTransformEntity(entity);
			entity._transform = this.cache[entity.id];
		}
		for (let i = 0; i < transformEntities.length; i++) {
			const entity = transformEntities[i];
			const cached = this.cache[entity.id];
			set$2(cached.previousModelMatrix, cached.modelMatrix);
			if (entity.transform.parent) set$2(cached.modelMatrix, this.cache[entity.transform.parent.entity.id].modelMatrix);
			else identity(cached.modelMatrix);
			mult(cached.modelMatrix, cached.localModelMatrix);
			this.updateModelMatrixHierarchy(cached.modelMatrix, entity.transform);
			if (!cached.hasPreviousModelMatrix) {
				cached.hasPreviousModelMatrix = true;
				set$2(cached.previousModelMatrix, cached.modelMatrix);
			}
			scale(cached.worldPosition, 0);
			multMat4(cached.worldPosition, cached.modelMatrix);
			empty(entity.transform.worldBounds);
		}
		for (let i = transformEntities.length - 1; i >= 0; i--) {
			const entity = transformEntities[i];
			if (entity.transform.worldBounds) {
				entity.transform.aabbDirty = false;
				this.updateBoundingBox(entity.transform);
			}
		}
	},
	dispose(entities) {
		if (entities) for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (entity.transform) delete this.cache[entity.id];
		}
		else this.cache = {};
	}
});

const IDENTITY_MAT3$2 = create$3();
const IDENTITY_MAT4$1 = create$1();
const MAX_JOINTS = 256;
const NO_JITTER = [0, 0];
const TEMP_MAT2X3 = create$5();
const TEMP_MAT3_SET = /* @__PURE__ */ new Map();
function getTextureMatrix(out, texture) {
	if (!texture.offset && !texture.rotation && !texture.scale) return IDENTITY_MAT3$2;
	identity$1(TEMP_MAT2X3);
	if (texture.offset) translate$1(TEMP_MAT2X3, texture.offset);
	if (texture.rotation) rotate(TEMP_MAT2X3, texture.rotation);
	if (texture.scale) scale$2(TEMP_MAT2X3, texture.scale);
	return fromMat2x3(out, TEMP_MAT2X3);
}
/**
* Defines owned by a field's own `runtime` activation. A `requires` pointing at
* one of these is an internal link within the always-declared group (bypassed
* like the field's own gate); a `requires` pointing elsewhere stays enforced.
* Exported so external "is this field declared" checks (e.g.
* shaders/standard.ts) share the exact rule.
*/
function getRuntimeDefines(fields) {
	return new Set(fields.filter((f) => f.runtime && f.define).map((f) => f.define));
}
/**
* Whether `field`'s struct field/uniform should be written for `defines` — the
* single rule shared by getFeatureFlags and external struct-field listings.
* `runtimeDefines` comes from getRuntimeDefines(fields).
*/
function isFieldActive(field, runtimeDefines, defines) {
	if (field.runtime && field.requires && !runtimeDefines.has(field.requires) && !defines.has(field.requires)) return false;
	return field.runtime ? true : defines.has(field.define ?? field.requires ?? "");
}
/**
* Walks `fields` against `source` (material, geometry attributes, any flat bag)
* in two passes: first collect active defines, then write uMaterial/texture
* uniforms. Two passes because WGSL struct packing throws on an unknown member,
* so a field can only write once its define set is final (e.g. `specularColor`
* waits on sibling `specular`). Define-only tables leave `uniforms` empty.
*/
function getFeatureFlags(source, fields, defines, sampler) {
	const values = source;
	for (const field of fields) {
		if (field.requires && !defines.has(field.requires)) continue;
		if (field.excludes && defines.has(field.excludes)) continue;
		const value = values[field.key];
		if (field.texture) {
			if (value && field.define) defines.add(field.define);
			continue;
		}
		const hasValue = field.truthy ? !!value : value !== void 0 && value !== null;
		if (field.define && hasValue) defines.add(field.define);
	}
	const uMaterial = {};
	const uniforms = { uMaterial };
	const constants = {};
	const runtimeDefines = getRuntimeDefines(fields);
	for (const field of fields) {
		if (field.runtime && field.define) constants[field.define] = defines.has(field.define);
		if (!isFieldActive(field, runtimeDefines, defines)) continue;
		const value = values[field.key];
		if (field.texture) {
			if (!value) continue;
			const texture = value;
			const name = uniformName(field.key);
			uniforms[name] = isGpuTexture(texture) ? texture : texture.texture;
			uniforms[samplerName(name)] = isGpuTexture(texture) ? sampler : texture.sampler ?? sampler;
			let scratch = TEMP_MAT3_SET.get(field.key);
			if (!scratch) TEMP_MAT3_SET.set(field.key, scratch = create$3());
			uMaterial[textureMatrixName(field.key)] = getTextureMatrix(scratch, isGpuTexture(texture) ? {} : texture);
			continue;
		}
		if (field.wgslType) uMaterial[field.key] = value ?? field.default;
	}
	return {
		defines,
		uniforms,
		constants
	};
}
function getJointMatricesUniform(skin, maxJoints, previous = false) {
	const key = previous ? "_paddedPreviousJointMatrices" : "_paddedJointMatrices";
	if (skin[key]?.length !== maxJoints) {
		const source = (previous ? skin._previousJointMatrices : skin.jointMatrices) ?? [];
		skin[key] = Array.from({ length: maxJoints }, (_, i) => source[i] ?? IDENTITY_MAT4$1);
	}
	return skin[key];
}
const NO_HOOK_UNIFORMS = {};
const LAST_VARIANT_KEYS = /* @__PURE__ */ new WeakMap();
const keyParts = (key) => new Set(key.split("|"));
/**
* Output names no fragment output corresponds to: `color` is unconditional in
* `fragmentOutputStruct`, and `depth` is an attachment, not a colour target.
*/
const IMPLICIT_OUTPUTS = /* @__PURE__ */ new Set(["color", "depth"]);
/**
* A pass's extra fragment outputs, in the order the shader numbers their
* `@location`s.
*
* Part of every renderer's variant key: `outputs` decides the shape of
* `FragmentOutput`, so two passes asking for different ones need different
* pipelines. A name list rather than a flag per known output, so an output
* added from outside the engine keys itself.
*/
const outputsKey = (outputs = {}) => Object.keys(outputs).filter((name) => !IMPLICIT_OUTPUTS.has(name)).join("|");
/** The buffer behind a cached attribute, which may be the bare buffer. */
const attributeBuffer = (attribute) => isGpuBuffer(attribute) ? attribute : attribute.buffer;
const BLEND_MODES = {
	normal: {
		color: {
			srcFactor: "src-alpha",
			dstFactor: "one-minus-src-alpha"
		},
		alpha: {
			srcFactor: "one",
			dstFactor: "one"
		}
	},
	premultiplied: {
		color: {
			srcFactor: "one",
			dstFactor: "one-minus-src-alpha"
		},
		alpha: {
			srcFactor: "one",
			dstFactor: "one-minus-src-alpha"
		}
	},
	additive: {
		color: {
			srcFactor: "src-alpha",
			dstFactor: "one"
		},
		alpha: {
			srcFactor: "one",
			dstFactor: "one"
		}
	},
	multiply: {
		color: {
			srcFactor: "dst",
			dstFactor: "zero"
		},
		alpha: {
			srcFactor: "dst-alpha",
			dstFactor: "zero"
		}
	},
	screen: {
		color: {
			srcFactor: "one",
			dstFactor: "one-minus-src"
		},
		alpha: {
			srcFactor: "one",
			dstFactor: "one-minus-src"
		}
	}
};
/**
* Base renderer
*
* All renderers are composed with it. Pipelines are cached per shader variant:
* pex-gpu treats a RenderPipeline's WGSL source as immutable per object
* identity, so a new object is only needed when the generated source changes
* (its `defines`). Mutable state (blend, cull, depth) is re-applied per draw on
* the cached object.
*/
var base_default = () => ({
	type: "base-renderer",
	pipelineCache: /* @__PURE__ */ new Map(),
	debug: false,
	getFeatureFlags,
	getShader() {
		return "";
	},
	getShaderOptions(_entity, _options, _defines) {
		return {};
	},
	getDefines(_entity, _options, _precomputed) {
		return /* @__PURE__ */ new Set();
	},
	getVariantKey(entity, defines, _options) {
		return definesKey(defines);
	},
	getPipelineOptions(_entity, _options, _precomputed) {
		return {};
	},
	/**
	* A material's blend, as a pipeline takes it. Anything falsy — the empty
	* string included — is opaque, so one truthiness check covers "no blending"
	* and the named equations alike.
	*/
	getPipelineBlend(blend) {
		if (!blend) return void 0;
		return typeof blend === "string" ? BLEND_MODES[blend] : blend;
	},
	/**
	* The `@group(3)` bindings, identical in every pass that draws geometry.
	*
	* Takes the options the pass generated its shader's `modelStruct` with, so
	* the block and the struct cannot disagree — a binding supplied where the
	* shader declared none is rejected at submit, and one declared but not
	* supplied fails validation.
	*/
	getModelUniforms(entity, normalMatrix, { previousModelMatrix = false, skin = false, previousSkin = false, maxJoints = MAX_JOINTS } = {}) {
		return {
			uModel: {
				modelMatrix: entity._transform.modelMatrix,
				normalMatrix,
				...previousModelMatrix && { previousModelMatrix: entity._transform.previousModelMatrix }
			},
			...skin && {
				uJointMatrices: getJointMatricesUniform(entity.skin, maxJoints),
				...previousSkin && { uPreviousJointMatrices: getJointMatricesUniform(entity.skin, maxJoints, true) }
			}
		};
	},
	/**
	* Uniform values for a material's hook bindings, mapped onto the names the
	* generator declared: a texture entry becomes `u<Name>`/`u<Name>Sampler`
	* (`sampler` when the hook supplies none of its own), everything else a field
	* of the `uHooks` block.
	*
	* Computed once per entity per frame, keyed by `frameIndex`, rather than once
	* per draw: the shadow, pre- and main passes run the same vertex hook, and a
	* value read from a clock would displace a vertex differently in each — a
	* shadow that does not match its caster, and a pre-pass depth the opaque pass
	* can no longer test `less-equal` against. Without a frame index (NaN)
	* nothing is reused.
	*/
	getHookUniforms(entity, frameIndex, sampler) {
		const hooks = entity.material?.hooks;
		if (!hooks?.uniforms) return NO_HOOK_UNIFORMS;
		const cache = entity._hookUniforms ??= {};
		if (cache.hooks === hooks && cache.frameIndex === frameIndex) return cache.uniforms;
		const bindings = hooks.bindings ?? {};
		const values = hooks.uniforms(entity);
		const uHooks = {};
		const uniforms = {};
		for (const [key, value] of Object.entries(values)) {
			if (key.endsWith("Sampler") && bindings[key.slice(0, -7)]) continue;
			if (bindings[key]?.startsWith("texture_")) {
				const name = uniformName(key);
				uniforms[name] = value;
				uniforms[samplerName(name)] = values[`${key}Sampler`] ?? sampler;
			} else uHooks[key] = value;
		}
		if (Object.keys(uHooks).length) uniforms.uHooks = uHooks;
		cache.hooks = hooks;
		cache.frameIndex = frameIndex;
		cache.uniforms = uniforms;
		return uniforms;
	},
	getFrameUniforms(renderView) {
		const { camera, cameraEntity, viewport } = renderView;
		return {
			projectionMatrix: camera.projectionMatrix,
			viewMatrix: camera.viewMatrix,
			inverseViewMatrix: camera.inverseViewMatrix || IDENTITY_MAT4$1,
			cameraPosition: cameraEntity?._transform?.worldPosition ?? [
				0,
				0,
				0
			],
			viewportSize: [viewport[2], viewport[3]],
			exposure: camera._exposure ?? 1,
			jitter: camera._jitter ?? NO_JITTER,
			previousViewProjectionMatrix: camera._previousViewProjectionMatrix ?? IDENTITY_MAT4$1
		};
	},
	/**
	* A pipeline cache lookup by variant key. With `debug` on, a miss logs how
	* long `create` took and what changed since the entity's last key in that
	* cache.
	*/
	getCachedPipeline(name, cache, key, entity, create) {
		if (!this.debug) return cache.getOrInsertComputed(key, create);
		const last = LAST_VARIANT_KEYS.getOrInsertComputed(cache, () => /* @__PURE__ */ new WeakMap());
		const pipeline = cache.getOrInsertComputed(key, () => {
			const start = performance.now();
			const created = create();
			const parts = keyParts(key);
			const previousParts = keyParts(last.get(entity) ?? key);
			console.debug(NAMESPACE, this.type, `${name} variant miss, ${(performance.now() - start).toFixed(1)}ms`, {
				added: [...parts.difference(previousParts)],
				removed: [...previousParts.difference(parts)],
				key
			}, entity);
			return created;
		});
		last.set(entity, key);
		return pipeline;
	},
	getPipeline(entity, options = {}, precomputed) {
		const defines = this.getDefines(entity, options, precomputed);
		const key = this.getVariantKey(entity, defines, options);
		const pipeline = this.getCachedPipeline("pipeline", this.pipelineCache, key, entity, () => ({ shader: this.getShader(defines, this.getShaderOptions(entity, options, defines)) }));
		Object.assign(pipeline, this.getPipelineOptions(entity, options, precomputed));
		if (entity.material) entity.material.needsPipelineUpdate = false;
		return pipeline;
	},
	update() {},
	dispose() {
		this.pipelineCache.clear();
	}
});

var basic_exports = /* @__PURE__ */ __exportAll({
	BASIC_VERTEX_FIELDS: () => BASIC_VERTEX_FIELDS,
	basicShader: () => basicShader
});
const VERTEX_DEFINE$3 = {
	vertexColor: "USE_VERTEX_COLORS",
	instancedOffset: "USE_INSTANCED_OFFSET",
	instancedScale: "USE_INSTANCED_SCALE",
	instancedRotation: "USE_INSTANCED_ROTATION",
	instancedColor: "USE_INSTANCED_COLOR"
};
const BASIC_VERTEX_FIELDS = [
	{
		key: "vertexColor",
		define: VERTEX_DEFINE$3.vertexColor
	},
	{
		key: "offset",
		define: VERTEX_DEFINE$3.instancedOffset
	},
	{
		key: "scale",
		define: VERTEX_DEFINE$3.instancedScale
	},
	{
		key: "rotation",
		define: VERTEX_DEFINE$3.instancedRotation
	},
	{
		key: "color",
		define: VERTEX_DEFINE$3.instancedColor
	}
];
const basicShader = (defines = /* @__PURE__ */ new Set(), options = {}) => {
	const hooks = options.hooks || {};
	const outputs = options.outputs ?? {};
	const vertexFlags = getDefineFlags(VERTEX_DEFINE$3, defines);
	const useColor = vertexFlags.vertexColor || vertexFlags.instancedColor;
	const useMSAA = defines.has("USE_MSAA");
	const colorAssignment = vertexFlags.vertexColor && vertexFlags.instancedColor ? "output.color = input.vertexColor * input.color;" : vertexFlags.instancedColor ? "output.color = input.color;" : vertexFlags.vertexColor ? "output.color = input.vertexColor;" : "";
	return `
${frameStruct()}

${modelStruct({ previousModelMatrix: !!outputs.velocity })}

struct Material {
  baseColor: vec4f,
}
@group(2) @binding(0) var<uniform> uMaterial: Material;
${hookBindingsDeclaration(2, createBindingAllocator(1), hooks.bindings)}

${vertexInputStruct({
		vertexColor: vertexFlags.vertexColor,
		instancedOffset: vertexFlags.instancedOffset,
		instancedScale: vertexFlags.instancedScale,
		instancedRotation: vertexFlags.instancedRotation,
		instancedColor: vertexFlags.instancedColor
	}, hookMembers(hooks.attributes))}

${vertexOutputStruct([
		useColor && {
			name: "color",
			type: "vec4f"
		},
		...outputs.velocity ? VELOCITY_MEMBERS : [],
		...hookMembers(hooks.interStage)
	])}

${fragmentOutputStruct(sceneOutputMembers(outputs))}

${quatToMat4}

${hooks.vertDeclarationsEnd ?? ""}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  var position = vec4f(input.position, 1.0);

  ${hooks.vertBeforeTransform ?? ""}

  ${vertexTransform({
		instancedScale: vertexFlags.instancedScale,
		instancedRotation: vertexFlags.instancedRotation,
		instancedOffset: vertexFlags.instancedOffset
	})}

  ${colorAssignment}

  let positionView = uFrame.viewMatrix * positionWorld;
  let positionOut = uFrame.projectionMatrix * positionView;

  output.position = positionOut;
  ${outputs.velocity ? vertexVelocity() : ""}
  ${vertexJitter()}

  ${hooks.vertEnd ?? ""}

  return output;
}

${encode_decode_default}
${max3}
${reversible_tone_map_default}

${hooks.fragDeclarationsEnd ?? ""}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  var output: FragmentOutput;
  var color = decode(uMaterial.baseColor, SRGB);

  ${useColor ? "color *= decode(input.color, SRGB);" : ""}

  // Pre-exposed like every other writer of scene colour, before the tone map.
  // color = vec4f(color.rgb * uFrame.exposure, color.a);

  ${useMSAA ? "color = vec4f(reversibleToneMap(color.xyz), color.w);" : ""}

  color = vec4f(max(color.xyz, vec3f(0.0)), color.w);

  output.color = color;

  ${outputs.normal ? "output.normal = vec4f(0.0, 0.0, 1.0, 1.0);" : ""}
  ${outputs.emissive ? "output.emissive = vec4f(0.0);" : ""}
  ${outputs.velocity ? FRAGMENT_VELOCITY : ""}
  ${outputs.responsive ? "output.responsive = vec4f(0.0);" : ""}

  ${hooks.fragEnd ?? ""}

  return output;
}
`;
};

const NORMAL_MATRIX$2 = create$3();
/**
* Basic renderer
*
* Unlit draw path built. Uniforms follow the shared bind group struct
* convention: `@group(0)` Frame, `@group(2)` Material, `@group(3)` Model.
*/
var basic_default = ({ ctx }) => ({
	...base_default(),
	type: "basic-renderer",
	debug: false,
	getShader: (defines, options) => basicShader(defines, options),
	getDefines(entity) {
		const defines = /* @__PURE__ */ new Set();
		this.getFeatureFlags(entity._geometry.attributes, BASIC_VERTEX_FIELDS, defines);
		return defines;
	},
	getShaderOptions(entity, options) {
		return {
			outputs: options.outputs,
			hooks: entity.material.hooks
		};
	},
	getVariantKey(entity, defines, options) {
		return [
			definesKey(defines),
			entity.material.blend ? 1 : 0,
			hooksKey(entity.material.hooks),
			outputsKey(options.outputs)
		].join("|");
	},
	getPipelineOptions(entity) {
		const material = entity.material;
		const blend = this.getPipelineBlend(material.blend);
		return {
			depthWriteEnabled: material.depthWriteEnabled ?? !blend,
			depthCompare: material.depthCompare ?? "less-equal",
			cullMode: material.cullMode ?? "back",
			topology: entity._geometry.topology ?? "triangle-list",
			frontFace: determinant(entity._transform.modelMatrix) < 0 ? "cw" : "ccw",
			...blend ? { blend } : {}
		};
	},
	render(renderView, entities, options) {
		const uFrame = this.getFrameUniforms(renderView);
		const renderableEntities = entities.filter((entity) => entity.geometry && entity.material && entity.material.type === void 0 && (options.transparent ? entity.material.blend : !entity.material.blend));
		for (let i = 0; i < renderableEntities.length; i++) {
			const entity = renderableEntities[i];
			const pipeline = this.getPipeline(entity, options);
			submit(ctx, {
				label: options.transparent ? "drawTransparentBasicGeometryCmd" : "drawBasicGeometryCmd",
				pipeline,
				attributes: entity._geometry.attributes,
				indices: entity._geometry.indices,
				count: entity._geometry.count,
				instanceCount: entity._geometry.instanceCount,
				uniforms: {
					uFrame,
					...this.getModelUniforms(entity, fromMat4$1(NORMAL_MATRIX$2, entity._transform.modelMatrix), { previousModelMatrix: !!options.outputs?.velocity }),
					uMaterial: { baseColor: entity.material.baseColor },
					...this.getHookUniforms(entity, options.frameIndex ?? NaN)
				}
			});
		}
	},
	renderOpaque(renderView, entities, options) {
		this.render(renderView, entities, {
			...options,
			transparent: false
		});
	},
	renderTransparent(renderView, entities, options) {
		this.render(renderView, entities, {
			...options,
			transparent: true
		});
	}
});

var line_exports = /* @__PURE__ */ __exportAll({
	LINE_BREAK: () => LINE_BREAK,
	LINE_MATERIAL_FIELDS: () => LINE_MATERIAL_FIELDS,
	LINE_VERTEX_FIELDS: () => LINE_VERTEX_FIELDS,
	lineShader: () => lineShader
});
const VERTEX_DEFINE$2 = {
	vertexColor: "USE_VERTEX_COLORS",
	instancedLineWidth: "USE_INSTANCED_LINE_WIDTH"
};
const MATERIAL_DEFINE$2 = { perspectiveScaling: "USE_PERSPECTIVE_SCALING" };
/** Walked against `_geometry.attributes` by the renderer's `getDefines`. */
const LINE_VERTEX_FIELDS = [{
	key: "vertexColor",
	define: VERTEX_DEFINE$2.vertexColor
}, {
	key: "lineWidth",
	define: VERTEX_DEFINE$2.instancedLineWidth
}];
/** Walked against the material by the renderer's `getDefines`. */
const LINE_MATERIAL_FIELDS = [{
	key: "perspectiveScaling",
	define: MATERIAL_DEFINE$2.perspectiveScaling,
	truthy: true
}];
const LINE_BREAK = 1e34;
const LINE_BREAK_THRESHOLD = "1e33";
const lineShader = (defines = /* @__PURE__ */ new Set(), options = {}) => {
	const hooks = options.hooks || {};
	const outputs = options.outputs ?? {};
	const vertexFlags = getDefineFlags(VERTEX_DEFINE$2, defines);
	const materialFlags = getDefineFlags(MATERIAL_DEFINE$2, defines);
	const useMSAA = defines.has("USE_MSAA");
	const interStageBase = (vertexFlags.vertexColor ? 1 : 0) + (outputs.velocity ? VELOCITY_MEMBERS.length : 0);
	return `
${frameStruct()}

${modelStruct({ previousModelMatrix: !!outputs.velocity })}

struct Material {
  baseColor: vec4f,
  lineWidth: f32,
}
@group(2) @binding(0) var<uniform> uMaterial: Material;
${hookBindingsDeclaration(2, createBindingAllocator(1), hooks.bindings)}

struct VertexInput {
  @location(0) position: vec3f,
  @location(1) pointA: vec3f,
  @location(2) pointB: vec3f,
  ${vertexFlags.vertexColor ? "@location(3) colorA: vec4f,\n  @location(4) colorB: vec4f," : ""}
  ${vertexFlags.instancedLineWidth ? "@location(5) lineWidth: vec2f," : ""}
  ${locationMembers(hookMembers(hooks.attributes), 6)}
}

struct VertexOutput {
  @builtin(position) position: vec4f,
  ${vertexFlags.vertexColor ? "@location(0) color: vec4f," : ""}
  ${outputs.velocity ? VELOCITY_MEMBERS.map(({ name, type }, index) => `@location(${(vertexFlags.vertexColor ? 1 : 0) + index}) ${name}: ${type},`).join("\n  ") : ""}
  ${locationMembers(hookMembers(hooks.interStage), interStageBase)}
}

${fragmentOutputStruct(sceneOutputMembers(outputs))}

${hooks.vertDeclarationsEnd ?? ""}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;

  ${outputs.velocity ? `// Taken on the centreline: the screen-space expansion is the same both
  // frames, so the widened point moves with it.
  let worldPoint = mix(
    uModel.modelMatrix * vec4f(input.pointA, 1.0),
    uModel.modelMatrix * vec4f(input.pointB, 1.0),
    input.position.z
  );
  let previousWorldPoint = mix(
    uModel.previousModelMatrix * vec4f(input.pointA, 1.0),
    uModel.previousModelMatrix * vec4f(input.pointB, 1.0),
    input.position.z
  );
  ${vertexVelocity({
		clip: "uFrame.projectionMatrix * (uFrame.viewMatrix * worldPoint)",
		previousWorld: "previousWorldPoint"
	})}` : ""}

  var lineWidthScale = vec2f(1.0);
  ${vertexFlags.vertexColor ? "output.color = mix(input.colorA, input.colorB, input.position.z);\n  lineWidthScale = vec2f(input.colorA.w, input.colorB.w);" : ""}

  // Drop the segment on a path break (endpoint at the LINE_BREAK sentinel).
  // Finite magnitude test only — see LINE_BREAK.
  let threshold = vec3f(${LINE_BREAK_THRESHOLD});
  if (any(abs(input.pointA) > threshold) || any(abs(input.pointB) > threshold)) {
    output.position = vec4f(0.0, 0.0, 0.0, 1.0);
  } else {
    let positionViewA = uFrame.viewMatrix * uModel.modelMatrix * vec4f(input.pointA, 1.0);
    let positionViewB = uFrame.viewMatrix * uModel.modelMatrix * vec4f(input.pointB, 1.0);

    let clip0 = uFrame.projectionMatrix * positionViewA;
    let clip1 = uFrame.projectionMatrix * positionViewB;

    let screen0 = uFrame.viewportSize * (0.5 * clip0.xy / clip0.w + 0.5);
    let screen1 = uFrame.viewportSize * (0.5 * clip1.xy / clip1.w + 0.5);

    let xBasis = normalize(screen1 - screen0);
    let yBasis = vec2f(-xBasis.y, xBasis.x);

    var width = uMaterial.lineWidth * (input.position.x * xBasis + input.position.y * yBasis);

    ${vertexFlags.instancedLineWidth ? "width *= input.lineWidth;" : ""}

    // Heuristic for resolution scaling to be relative to height / 1000
    width *= uFrame.viewportSize.y * 0.001;

    var pt0 = lineWidthScale.x * width;
    var pt1 = lineWidthScale.y * width;

    ${materialFlags.perspectiveScaling ? "pt0 /= -positionViewA.z;\n    pt1 /= -positionViewB.z;" : ""}

    pt0 += screen0;
    pt1 += screen1;

    let pt = mix(pt0, pt1, input.position.z);
    let clip = mix(clip0, clip1, input.position.z);

    output.position = vec4f(clip.w * ((2.0 * pt) / uFrame.viewportSize - 1.0), clip.z, clip.w);
  }

  ${vertexJitter()}

  ${hooks.vertEnd ?? ""}

  return output;
}

// Fragment includes
${encode_decode_default}
${max3}
${reversible_tone_map_default}

${hooks.fragDeclarationsEnd ?? ""}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  var output: FragmentOutput;
  var color = decode(uMaterial.baseColor, SRGB);

  ${vertexFlags.vertexColor ? "color *= decode(input.color, SRGB);" : ""}

  // Pre-exposed like every other writer of scene colour, before the tone map.
  // color = vec4f(color.rgb * uFrame.exposure, color.a);

  ${useMSAA ? "color = vec4f(reversibleToneMap(color.xyz), color.w);" : ""}

  color = vec4f(max(color.xyz, vec3f(0.0)), color.w);

  output.color = color;

  ${outputs.normal ? "output.normal = vec4f(0.0, 0.0, 1.0, 1.0);" : ""}
  ${outputs.emissive ? "output.emissive = vec4f(0.0);" : ""}
  ${outputs.velocity ? FRAGMENT_VELOCITY : ""}
  ${outputs.responsive ? "output.responsive = vec4f(0.0);" : ""}

  ${hooks.fragEnd ?? ""}

  return output;
}
`;
};

const NORMAL_MATRIX$1 = create$3();
const FLOAT = Float32Array.BYTES_PER_ELEMENT;
const instanceRoundRound = Float32Array.of(0, -.5, 0, 0, -.5, 1, 0, .5, 1, 0, -.5, 0, 0, .5, 1, 0, .5, 0);
const lineBuffers = (renderer) => renderer.cache;
/**
* Line renderer
*
* Screen-space expanded line segments built on the `line` WGSL generator. Each
* segment is drawn as an instanced quad (plus round caps); per-instance
* endpoints alias the geometry position buffer via strided attributes. Uniforms
* follow the shared bind group convention: `@group(0)` Frame, `@group(2)`
* Material, `@group(3)` Model.
*/
var line_default = ({ ctx }) => ({
	...base_default(),
	type: "line-renderer",
	cache: {},
	debug: false,
	getShader: (defines, options) => lineShader(defines, options),
	getShaderOptions(entity, options) {
		return {
			outputs: options.outputs,
			hooks: entity.material.hooks
		};
	},
	getDefines(entity, options) {
		const defines = /* @__PURE__ */ new Set();
		this.getFeatureFlags(entity._geometry.attributes, LINE_VERTEX_FIELDS, defines);
		this.getFeatureFlags(entity.material, LINE_MATERIAL_FIELDS, defines);
		if (options.msaa) defines.add("USE_MSAA");
		return defines;
	},
	getVariantKey(entity, defines, options) {
		return [
			definesKey(defines),
			outputsKey(options.outputs),
			hooksKey(entity.material.hooks)
		].join("|");
	},
	getPipelineOptions(entity) {
		const material = entity.material;
		return {
			depthWriteEnabled: material.depthWriteEnabled !== false,
			depthCompare: material.depthCompare ?? "less",
			cullMode: "none",
			depthBias: material.depthBias,
			depthBiasSlopeScale: material.depthBiasSlopeScale,
			depthBiasClamp: material.depthBiasClamp
		};
	},
	getLinePositionsBuffer(resolution) {
		const cache = lineBuffers(this);
		if (!cache[resolution]) {
			const positions = new Float32Array(instanceRoundRound.length + resolution * 18);
			positions.set(instanceRoundRound);
			for (let step = 0; step < resolution; step++) {
				let index = instanceRoundRound.length / 3 + step * 3;
				let theta0 = Math.PI / 2 + (step + 0) * Math.PI / resolution;
				let theta1 = Math.PI / 2 + (step + 1) * Math.PI / resolution;
				set3(positions, index + 1, .5 * Math.cos(theta0), .5 * Math.sin(theta0), 0);
				set3(positions, index + 2, .5 * Math.cos(theta1), .5 * Math.sin(theta1), 0);
				index += resolution * 3;
				theta0 = 3 * Math.PI / 2 + (step + 0) * Math.PI / resolution;
				theta1 = 3 * Math.PI / 2 + (step + 1) * Math.PI / resolution;
				set3(positions, index, 0, 0, 1);
				set3(positions, index + 1, .5 * Math.cos(theta0), .5 * Math.sin(theta0), 1);
				set3(positions, index + 2, .5 * Math.cos(theta1), .5 * Math.sin(theta1), 1);
			}
			cache[resolution] = createBuffer(ctx, {
				usage: "vertex",
				data: positions
			});
		}
		return cache[resolution];
	},
	render(renderView, entities, options) {
		const shadowMapping = !!options.shadowMappingLight;
		const uFrame = this.getFrameUniforms(renderView);
		const renderableEntities = entities.filter((entity) => entity.geometry && entity.material && entity.material.type === "line" && (!shadowMapping || entity.material.castShadows));
		for (let i = 0; i < renderableEntities.length; i++) {
			const entity = renderableEntities[i];
			const material = entity.material;
			const geometry = entity.geometry;
			const { attributes } = entity._geometry;
			const positionBuffer = attributeBuffer(attributes.position);
			const positions = geometry.positions;
			const positionCount = geometry.count ?? (positions[0].length ? positions.length : positions.length / 3);
			if (positionCount < 2) continue;
			const pipeline = this.getPipeline(entity, options);
			const resolution = material.lineResolution;
			const drawAttributes = {
				position: { buffer: this.getLinePositionsBuffer(resolution) },
				pointA: {
					buffer: positionBuffer,
					stepMode: "instance",
					arrayStride: FLOAT * 6
				},
				pointB: {
					buffer: positionBuffer,
					stepMode: "instance",
					arrayStride: FLOAT * 6,
					offset: FLOAT * 3
				}
			};
			if (attributes.vertexColor) {
				const colorBuffer = attributeBuffer(attributes.vertexColor);
				drawAttributes.colorA = {
					buffer: colorBuffer,
					stepMode: "instance",
					arrayStride: FLOAT * 8
				};
				drawAttributes.colorB = {
					buffer: colorBuffer,
					stepMode: "instance",
					arrayStride: FLOAT * 8,
					offset: FLOAT * 4
				};
			}
			if (attributes.lineWidth) drawAttributes.lineWidth = {
				buffer: attributeBuffer(attributes.lineWidth),
				stepMode: "instance"
			};
			submit(ctx, {
				label: "drawLineGeometryCmd",
				pipeline,
				attributes: drawAttributes,
				count: (instanceRoundRound.length + resolution * 18) / 3,
				instanceCount: positionCount / 2,
				uniforms: {
					uFrame,
					...this.getModelUniforms(entity, fromMat4$1(NORMAL_MATRIX$1, entity._transform.modelMatrix), { previousModelMatrix: !!options.outputs?.velocity }),
					uMaterial: {
						baseColor: material.baseColor,
						lineWidth: material.lineWidth
					},
					...this.getHookUniforms(entity, options.frameIndex ?? NaN)
				}
			});
		}
	},
	renderShadow(renderView, entities, options = {}) {
		this.render(renderView, entities, options);
	},
	renderOpaque(renderView, entities, options = {}) {
		this.render(renderView, entities, options);
	},
	dispose() {
		for (const buffer of Object.values(lineBuffers(this))) buffer.dispose();
		this.cache = {};
		this.pipelineCache.clear();
	}
});

/**
* Light types in the order they are packed into the shared buffer. The ranges
* struct and the renderer's concatenation are both built from this list, so the
* two cannot disagree about what a range refers to.
*/
const LIGHT_TYPES = [
	"ambient",
	"directional",
	"point",
	"spot",
	"area"
];
/**
* One struct for every light type, and one buffer for every light.
*
* Per-type arrays would be the natural shape, but a binding only exists when
* the scene has a light to put in it — so a scene gaining its first spot light
* would regenerate the WGSL of every lit material and recompile it, mid-frame
* and synchronously. Five arrays is also more dynamic storage buffers than the
* default `maxDynamicStorageBuffersPerPipelineLayout` of 4 allows once the
* reflection probe's coefficients are counted, so declaring them all
* unconditionally is not an option either.
*
* With one buffer the shader is independent of what the scene contains: lights
* are concatenated in `LIGHT_TYPES` order and each type reads the range it was
* given. Adding, removing or retyping a light is a buffer write.
*
* The cost is the union: an ambient light carries a shadow projection it will
* never use. Member order is chosen so it packs to exactly 256 bytes with no
* padding, which at any plausible light count is not worth a second thought.
*/
const LIGHT_STRUCTS = `struct SceneLight {
  position: vec3f,
  invSqrFalloff: f32,
  direction: vec3f,
  // Bulb radius, for the penumbra of a point light's shadow.
  radius: f32,
  // rgb authored in sRGB, w the luminance the light was metered at.
  color: vec4f,
  // Area light orientation and half-extents.
  rotation: vec4f,
  size: vec2f,
  innerConeAngle: f32,
  outerConeAngle: f32,
  disk: u32,
  doubleSided: u32,
  castShadows: u32,
  // Which shadow map binding, and which layer of it.
  shadowBucket: u32,
  shadowLayer: u32,
  depthBiasNormalized: f32,
  near: f32,
  far: f32,
  radiusUV: vec2f,
  shadowMapSize: vec2f,
  projectionMatrix: mat4x4f,
  viewMatrix: mat4x4f,
}

struct LightRange {
  offset: u32,
  count: u32,
}

// @align(16) is not decoration: implementations disagree on what a struct
// member that is itself a struct aligns to in the uniform address space —
// Dawn packs LightRange at its natural 8, the std140-style reading of the
// spec says 16, and pex-gpu's reflection computes 16. Stating it leaves
// nothing to infer, and a mismatch here is silent: every range reads as the
// neighbouring one and the scene loses every light but its ambient.
struct LightRanges {
${LIGHT_TYPES.map((type) => `  @align(16) ${type}: LightRange,`).join("\n")}
}`;

var standard_exports = /* @__PURE__ */ __exportAll({
	STANDARD_MATERIAL_COMMON_FIELDS: () => STANDARD_MATERIAL_COMMON_FIELDS,
	STANDARD_MATERIAL_FIELDS: () => STANDARD_MATERIAL_FIELDS,
	STANDARD_MATERIAL_LIT_FIELDS: () => STANDARD_MATERIAL_LIT_FIELDS,
	STANDARD_VERTEX_FIELDS: () => STANDARD_VERTEX_FIELDS,
	STANDARD_WORKFLOW: () => STANDARD_WORKFLOW,
	standardShader: () => standardShader
});
const MATERIAL_DEFINE$1 = {
	unlitWorkflow: "USE_UNLIT_WORKFLOW",
	metallicRoughnessWorkflow: "USE_METALLIC_ROUGHNESS_WORKFLOW",
	specularGlossinessWorkflow: "USE_SPECULAR_GLOSSINESS_WORKFLOW",
	alphaCutoff: "USE_ALPHA_CUTOFF",
	responsiveAA: "USE_RESPONSIVE_AA",
	emissive: "USE_EMISSIVE",
	specular: "USE_SPECULAR",
	clearcoat: "USE_CLEARCOAT",
	clearcoatRoughnessFromMainTexture: "USE_CLEARCOAT_ROUGHNESS_FROM_MAIN_TEXTURE",
	sheen: "USE_SHEEN",
	sheenRoughnessFromMainTexture: "USE_SHEEN_ROUGHNESS_FROM_MAIN_TEXTURE",
	transmission: "USE_TRANSMISSION",
	dispersion: "USE_DISPERSION",
	volume: "USE_VOLUME",
	diffuseTransmission: "USE_DIFFUSE_TRANSMISSION",
	baseColorTexture: "USE_BASE_COLOR_TEXTURE",
	alphaTexture: "USE_ALPHA_TEXTURE",
	emissiveTexture: "USE_EMISSIVE_TEXTURE",
	normalTexture: "USE_NORMAL_TEXTURE",
	metallicRoughnessTexture: "USE_METALLIC_ROUGHNESS_TEXTURE",
	metallicTexture: "USE_METALLIC_TEXTURE",
	roughnessTexture: "USE_ROUGHNESS_TEXTURE",
	specularTexture: "USE_SPECULAR_TEXTURE",
	specularColorTexture: "USE_SPECULAR_COLOR_TEXTURE",
	sgDiffuseTexture: "USE_SG_DIFFUSE_TEXTURE",
	sgSpecularGlossinessTexture: "USE_SG_SPECULAR_GLOSSINESS_TEXTURE",
	clearcoatTexture: "USE_CLEARCOAT_TEXTURE",
	clearcoatRoughnessTexture: "USE_CLEARCOAT_ROUGHNESS_TEXTURE",
	clearcoatNormalTexture: "USE_CLEARCOAT_NORMAL_TEXTURE",
	sheenColorTexture: "USE_SHEEN_COLOR_TEXTURE",
	sheenRoughnessTexture: "USE_SHEEN_ROUGHNESS_TEXTURE",
	transmissionTexture: "USE_TRANSMISSION_TEXTURE",
	thicknessTexture: "USE_THICKNESS_TEXTURE",
	diffuseTransmissionTexture: "USE_DIFFUSE_TRANSMISSION_TEXTURE",
	diffuseTransmissionColorTexture: "USE_DIFFUSE_TRANSMISSION_COLOR_TEXTURE",
	occlusionTexture: "USE_OCCLUSION_TEXTURE"
};
const VERTEX_DEFINE$1 = {
	tangent: "USE_TANGENTS",
	texCoord0: "USE_TEXCOORD_0",
	texCoord1: "USE_TEXCOORD_1",
	vertexColor: "USE_VERTEX_COLORS",
	instancedOffset: "USE_INSTANCED_OFFSET",
	instancedScale: "USE_INSTANCED_SCALE",
	instancedRotation: "USE_INSTANCED_ROTATION",
	instancedColor: "USE_INSTANCED_COLOR",
	skin: "USE_SKIN",
	previousPosition: "USE_PREVIOUS_POSITION",
	previousInstancedOffset: "USE_PREVIOUS_INSTANCED_OFFSET",
	previousInstancedScale: "USE_PREVIOUS_INSTANCED_SCALE",
	previousInstancedRotation: "USE_PREVIOUS_INSTANCED_ROTATION"
};
const STANDARD_MATERIAL_COMMON_FIELDS = [
	{
		key: "baseColorTexture",
		excludes: MATERIAL_DEFINE$1.specularGlossinessWorkflow,
		define: MATERIAL_DEFINE$1.baseColorTexture,
		texture: true
	},
	{
		key: "alphaTexture",
		define: MATERIAL_DEFINE$1.alphaTexture,
		texture: true
	},
	{
		key: "alphaCutoff",
		define: MATERIAL_DEFINE$1.alphaCutoff,
		wgslType: "f32",
		default: 0,
		runtime: true
	},
	{
		key: "responsiveAA",
		define: MATERIAL_DEFINE$1.responsiveAA,
		truthy: true
	}
];
const STANDARD_MATERIAL_LIT_FIELDS = [
	{
		key: "normalTexture",
		define: MATERIAL_DEFINE$1.normalTexture,
		texture: true
	},
	{
		key: "normalTextureScale",
		requires: MATERIAL_DEFINE$1.normalTexture,
		wgslType: "f32",
		default: 1
	},
	{
		key: "sgDiffuseTexture",
		requires: MATERIAL_DEFINE$1.specularGlossinessWorkflow,
		define: MATERIAL_DEFINE$1.sgDiffuseTexture,
		texture: true
	},
	{
		key: "sgSpecularGlossinessTexture",
		requires: MATERIAL_DEFINE$1.specularGlossinessWorkflow,
		define: MATERIAL_DEFINE$1.sgSpecularGlossinessTexture,
		texture: true
	},
	{
		key: "sgDiffuse",
		requires: MATERIAL_DEFINE$1.specularGlossinessWorkflow,
		wgslType: "vec4f",
		default: [
			1,
			1,
			1,
			1
		]
	},
	{
		key: "sgSpecular",
		requires: MATERIAL_DEFINE$1.specularGlossinessWorkflow,
		wgslType: "vec3f",
		default: [
			1,
			1,
			1
		]
	},
	{
		key: "sgGlossiness",
		requires: MATERIAL_DEFINE$1.specularGlossinessWorkflow,
		wgslType: "f32",
		default: 1
	},
	{
		key: "metallicRoughnessTexture",
		requires: MATERIAL_DEFINE$1.metallicRoughnessWorkflow,
		define: MATERIAL_DEFINE$1.metallicRoughnessTexture,
		texture: true
	},
	{
		key: "metallicTexture",
		requires: MATERIAL_DEFINE$1.metallicRoughnessWorkflow,
		excludes: MATERIAL_DEFINE$1.metallicRoughnessTexture,
		define: MATERIAL_DEFINE$1.metallicTexture,
		texture: true
	},
	{
		key: "roughnessTexture",
		requires: MATERIAL_DEFINE$1.metallicRoughnessWorkflow,
		excludes: MATERIAL_DEFINE$1.metallicRoughnessTexture,
		define: MATERIAL_DEFINE$1.roughnessTexture,
		texture: true
	},
	{
		key: "metallic",
		requires: MATERIAL_DEFINE$1.metallicRoughnessWorkflow,
		wgslType: "f32",
		default: 1
	},
	{
		key: "roughness",
		requires: MATERIAL_DEFINE$1.metallicRoughnessWorkflow,
		wgslType: "f32",
		default: 1
	},
	{
		key: "ior",
		requires: MATERIAL_DEFINE$1.metallicRoughnessWorkflow,
		wgslType: "f32",
		default: 1.5
	},
	{
		key: "specular",
		requires: MATERIAL_DEFINE$1.metallicRoughnessWorkflow,
		define: MATERIAL_DEFINE$1.specular,
		wgslType: "f32",
		default: 1,
		runtime: true
	},
	{
		key: "specularColor",
		requires: MATERIAL_DEFINE$1.metallicRoughnessWorkflow,
		define: MATERIAL_DEFINE$1.specular,
		wgslType: "vec3f",
		default: [
			1,
			1,
			1
		],
		runtime: true
	},
	{
		key: "specularTexture",
		requires: MATERIAL_DEFINE$1.specular,
		define: MATERIAL_DEFINE$1.specularTexture,
		texture: true
	},
	{
		key: "specularColorTexture",
		requires: MATERIAL_DEFINE$1.specular,
		define: MATERIAL_DEFINE$1.specularColorTexture,
		texture: true
	},
	{
		key: "clearcoat",
		define: MATERIAL_DEFINE$1.clearcoat,
		truthy: true,
		wgslType: "f32",
		default: 0,
		runtime: true
	},
	{
		key: "clearcoatRoughness",
		requires: MATERIAL_DEFINE$1.clearcoat,
		wgslType: "f32",
		default: 0,
		runtime: true
	},
	{
		key: "clearcoatTexture",
		requires: MATERIAL_DEFINE$1.clearcoat,
		define: MATERIAL_DEFINE$1.clearcoatTexture,
		texture: true
	},
	{
		key: "clearcoatRoughnessTexture",
		requires: MATERIAL_DEFINE$1.clearcoat,
		define: MATERIAL_DEFINE$1.clearcoatRoughnessTexture,
		texture: true
	},
	{
		key: "clearcoatTexture",
		requires: MATERIAL_DEFINE$1.clearcoat,
		excludes: MATERIAL_DEFINE$1.clearcoatRoughnessTexture,
		define: MATERIAL_DEFINE$1.clearcoatRoughnessFromMainTexture
	},
	{
		key: "clearcoatNormalTexture",
		requires: MATERIAL_DEFINE$1.clearcoat,
		define: MATERIAL_DEFINE$1.clearcoatNormalTexture,
		texture: true
	},
	{
		key: "clearcoatNormalTextureScale",
		requires: MATERIAL_DEFINE$1.clearcoatNormalTexture,
		wgslType: "f32",
		default: 1
	},
	{
		key: "sheenColor",
		define: MATERIAL_DEFINE$1.sheen,
		wgslType: "vec4f",
		default: [
			0,
			0,
			0,
			0
		],
		runtime: true
	},
	{
		key: "sheenRoughness",
		requires: MATERIAL_DEFINE$1.sheen,
		wgslType: "f32",
		default: 0,
		runtime: true
	},
	{
		key: "sheenColorTexture",
		requires: MATERIAL_DEFINE$1.sheen,
		define: MATERIAL_DEFINE$1.sheenColorTexture,
		texture: true
	},
	{
		key: "sheenRoughnessTexture",
		requires: MATERIAL_DEFINE$1.sheen,
		define: MATERIAL_DEFINE$1.sheenRoughnessTexture,
		texture: true
	},
	{
		key: "sheenColorTexture",
		requires: MATERIAL_DEFINE$1.sheen,
		excludes: MATERIAL_DEFINE$1.sheenRoughnessTexture,
		define: MATERIAL_DEFINE$1.sheenRoughnessFromMainTexture
	},
	{
		key: "transmission",
		define: MATERIAL_DEFINE$1.transmission,
		truthy: true,
		wgslType: "f32",
		default: 0,
		runtime: true
	},
	{
		key: "transmissionTexture",
		requires: MATERIAL_DEFINE$1.transmission,
		define: MATERIAL_DEFINE$1.transmissionTexture,
		texture: true
	},
	{
		key: "dispersion",
		requires: MATERIAL_DEFINE$1.transmission,
		define: MATERIAL_DEFINE$1.dispersion,
		truthy: true,
		wgslType: "f32",
		default: 0,
		runtime: true
	},
	{
		key: "diffuseTransmission",
		define: MATERIAL_DEFINE$1.diffuseTransmission,
		truthy: true,
		wgslType: "f32",
		default: 0,
		runtime: true
	},
	{
		key: "diffuseTransmissionColor",
		requires: MATERIAL_DEFINE$1.diffuseTransmission,
		wgslType: "vec3f",
		default: [
			1,
			1,
			1
		],
		runtime: true
	},
	{
		key: "diffuseTransmissionTexture",
		requires: MATERIAL_DEFINE$1.diffuseTransmission,
		define: MATERIAL_DEFINE$1.diffuseTransmissionTexture,
		texture: true
	},
	{
		key: "diffuseTransmissionColorTexture",
		requires: MATERIAL_DEFINE$1.diffuseTransmission,
		define: MATERIAL_DEFINE$1.diffuseTransmissionColorTexture,
		texture: true
	},
	{
		key: "thickness",
		define: MATERIAL_DEFINE$1.volume,
		truthy: true,
		wgslType: "f32",
		default: 0,
		runtime: true
	},
	{
		key: "attenuationColor",
		requires: MATERIAL_DEFINE$1.volume,
		wgslType: "vec3f",
		default: [
			1,
			1,
			1
		],
		runtime: true
	},
	{
		key: "attenuationDistance",
		requires: MATERIAL_DEFINE$1.volume,
		wgslType: "f32",
		default: Infinity,
		runtime: true
	},
	{
		key: "thicknessTexture",
		requires: MATERIAL_DEFINE$1.volume,
		define: MATERIAL_DEFINE$1.thicknessTexture,
		texture: true
	},
	{
		key: "occlusionTexture",
		define: MATERIAL_DEFINE$1.occlusionTexture,
		texture: true
	},
	{
		key: "occlusionTextureStrength",
		requires: MATERIAL_DEFINE$1.occlusionTexture,
		wgslType: "f32",
		default: 1
	},
	{
		key: "emissive",
		define: MATERIAL_DEFINE$1.emissive,
		wgslType: "vec4f",
		default: [
			0,
			0,
			0,
			0
		],
		runtime: true
	},
	{
		key: "emissiveStrength",
		requires: MATERIAL_DEFINE$1.emissive,
		wgslType: "f32",
		default: 1,
		runtime: true
	},
	{
		key: "emissiveExposure",
		requires: MATERIAL_DEFINE$1.emissive,
		wgslType: "f32",
		default: 0,
		runtime: true
	},
	{
		key: "emissiveTexture",
		define: MATERIAL_DEFINE$1.emissiveTexture,
		texture: true
	}
];
const STANDARD_MATERIAL_FIELDS = [...STANDARD_MATERIAL_COMMON_FIELDS, ...STANDARD_MATERIAL_LIT_FIELDS];
const MATERIAL_RUNTIME_DEFINES = getRuntimeDefines(STANDARD_MATERIAL_FIELDS);
const STANDARD_VERTEX_FIELDS = [
	{
		key: "tangent",
		define: VERTEX_DEFINE$1.tangent
	},
	{
		key: "texCoord0",
		define: VERTEX_DEFINE$1.texCoord0
	},
	{
		key: "texCoord1",
		define: VERTEX_DEFINE$1.texCoord1
	},
	{
		key: "vertexColor",
		define: VERTEX_DEFINE$1.vertexColor
	},
	{
		key: "offset",
		define: VERTEX_DEFINE$1.instancedOffset
	},
	{
		key: "scale",
		define: VERTEX_DEFINE$1.instancedScale
	},
	{
		key: "rotation",
		define: VERTEX_DEFINE$1.instancedRotation
	},
	{
		key: "color",
		define: VERTEX_DEFINE$1.instancedColor
	},
	{
		key: "joint",
		define: VERTEX_DEFINE$1.skin
	},
	{
		key: "weight",
		define: VERTEX_DEFINE$1.skin
	},
	{
		key: "previousPosition",
		define: VERTEX_DEFINE$1.previousPosition
	},
	{
		key: "previousOffset",
		define: VERTEX_DEFINE$1.previousInstancedOffset
	},
	{
		key: "previousScale",
		define: VERTEX_DEFINE$1.previousInstancedScale
	},
	{
		key: "previousRotation",
		define: VERTEX_DEFINE$1.previousInstancedRotation
	}
];
const STANDARD_WORKFLOW = {
	unlit: MATERIAL_DEFINE$1.unlitWorkflow,
	metallicRoughness: MATERIAL_DEFINE$1.metallicRoughnessWorkflow,
	specularGlossiness: MATERIAL_DEFINE$1.specularGlossinessWorkflow
};
/**
* The surface description every hook, chunk and debug view reads. Module level
* so `PBR_DATA_TYPES` derives from the same text the shader compiles.
*/
const PBR_DATA_STRUCT = `struct PBRData {
  inverseViewMatrix: mat4x4f,
  texCoord0: vec2f,
  texCoord1: vec2f,
  normalView: vec3f,
  tangentView: vec4f,
  positionWorld: vec3f,
  positionView: vec3f,
  eyeDirView: vec3f,
  eyeDirWorld: vec3f,
  normalWorld: vec3f, // N, world space
  bentNormalWorld: vec3f, // average unoccluded direction, world space; N without one
  viewWorld: vec3f, // V, view vector from position to camera, world space
  NdotV: f32,

  baseColor: vec3f,
  emissive: vec3f,
  opacity: f32,
  roughness: f32, // roughness value, as authored by the model creator (input to shader)
  metallic: f32, // metallic value at the surface
  linearRoughness: f32, // roughness mapped to a more linear change in the roughness (proposed by [2])
  f0: vec3f, // Reflectance at normal incidence, specular color
  f90: vec3f, // Specular response at grazing incidence
  clearcoat: f32,
  clearcoatRoughness: f32,
  clearcoatLinearRoughness: f32,
  clearcoatNormal: vec3f,
  reflectionWorld: vec3f,
  directColor: vec3f,
  diffuseColor: vec3f, // color contribution from diffuse lighting
  indirectDiffuse: vec3f, // contribution from IBL light probe and Ambient Light
  indirectSpecular: vec3f, // contribution from IBL light probe
  sheenColor: vec3f,
  sheenRoughness: f32,
  sheenLinearRoughness: f32,
  sheenAlbedoScaling: f32,
  transmitted: vec3f,
  transmission: f32,
  diffuseTransmission: f32,
  diffuseTransmissionColor: vec3f,
  diffuseTransmissionThickness: f32,
  thickness: f32,
  attenuationColor: vec3f,
  attenuationDistance: f32,
  dispersion: f32,
  ior: f32,
  ao: f32,
}
`;
/** PBRData member name to WGSL type, for typing a `debugRender` expression. */
const PBR_DATA_TYPES = Object.fromEntries([...PBR_DATA_STRUCT.matchAll(/^\s+(\w+): (\w+),/gm)].map((match) => [match[1], match[2]]));
/**
* A debug expression as a colour written over the shaded result.
*
* Named PBRData members are coerced by their declared type — a scalar splats, a
* vec2 pads, a vec4 drops its alpha — and anything else is left to `vec3f()`,
* which covers a vec3 inter-stage variable and a scalar alike. Direction-valued
* members are remapped from [-1, 1], the only transform that would otherwise
* clip to black.
*
* The value is written linear and pre-tone-map, so it reads exactly only with
* post-processing off; through a tone curve it is still ordered, just
* compressed.
*/
function debugRenderAssignment(expression) {
	const member = expression.startsWith("data.") ? PBR_DATA_TYPES[expression.slice(5)] : void 0;
	const value = member === "vec2f" ? `vec3f(${expression}, 0.0)` : member === "vec4f" ? `${expression}.xyz` : `vec3f(${expression})`;
	return `output.color = vec4f(${/normal|tangent|reflection/i.test(expression) ? `${value} * 0.5 + 0.5` : value}, 1.0);`;
}
const standardShader = (defines = /* @__PURE__ */ new Set(), options = {}) => {
	const hooks = options.hooks || {};
	const { maxJoints = 256 } = options;
	const outputs = options.outputs ?? {};
	const texCoords = options.texCoords || {};
	const tc = getTexCoordGetter(texCoords);
	const useNormals = defines.has("USE_NORMALS");
	const materialFlags = getDefineFlags(MATERIAL_DEFINE$1, defines);
	const vertexFlags = getDefineFlags(VERTEX_DEFINE$1, defines);
	const useColor = vertexFlags.vertexColor || vertexFlags.instancedColor;
	const useDisplacementTexture = defines.has("USE_DISPLACEMENT_TEXTURE");
	const useSkin = defines.has("USE_SKIN");
	const lit = !materialFlags.unlitWorkflow;
	const useReflectionProbes = defines.has("USE_REFLECTION_PROBES") && lit;
	const shadow2DBuckets = lit ? options.shadow2DBuckets ?? 0 : 0;
	const shadowCubeBuckets = lit ? options.shadowCubeBuckets ?? 0 : 0;
	const colorAssignment = vertexFlags.vertexColor && vertexFlags.instancedColor ? "output.color = input.vertexColor * input.color;" : vertexFlags.instancedColor ? "output.color = input.color;" : vertexFlags.vertexColor ? "output.color = input.vertexColor;" : "";
	const vColorExpr = useColor ? "input.color" : "vec4f(1.0)";
	const materialBindings = createBindingAllocator(1);
	const textures = {};
	for (const field of STANDARD_MATERIAL_FIELDS) {
		if (!field.texture) continue;
		textures[field.key] = defines.has(field.define) ? materialBindings.nextTextureSampler() : null;
	}
	const scalarStructFields = STANDARD_MATERIAL_FIELDS.filter((field) => !field.texture && field.wgslType && isFieldActive(field, MATERIAL_RUNTIME_DEFINES, defines)).map((field) => `${field.key}: ${field.wgslType},`).join("\n  ");
	const textureMatrixFields = STANDARD_MATERIAL_FIELDS.filter((field) => field.texture && textures[field.key]).map((field) => textureMatrixField(field.key, textures[field.key] ?? null)).join("\n  ");
	const lightBindings = createBindingAllocator(0);
	const lightsDecl = lit ? `
${bindingDeclaration(1, lightBindings.next(), "uLights", "array<SceneLight>", "storage, read")}
${bindingDeclaration(1, lightBindings.next(), "uLightRanges", "LightRanges", "uniform")}
${textureSamplerDeclaration(1, lightBindings.nextTextureSampler(), "uLtc1")}
${textureSamplerDeclaration(1, lightBindings.nextTextureSampler(), "uLtc2")}` : "";
	const shadowBucketName = (cube, i) => uniformName(`shadowMaps${cube ? "Cube" : "2D"}${i}`);
	const shadowBucketDecls = (count, cube) => Array.from({ length: count }, (_, i) => textureSamplerDeclaration(1, lightBindings.nextTextureSampler(), shadowBucketName(cube, i), cube ? "texture_depth_cube_array" : "texture_depth_2d_array", cube ? "sampler" : "sampler_comparison")).join("\n");
	const shadow2DDecls = shadowBucketDecls(shadow2DBuckets, false);
	const shadowCubeDecls = shadowBucketDecls(shadowCubeBuckets, true);
	/**
	* Which binding a light samples is runtime data — the size it asked for — so
	* the bucket is dispatched rather than baked per light. Collapses to a single
	* call whenever every light shares a size, which is the usual case.
	*/
	const shadowDispatch = (count, cube, name, signature, args, callee) => `
fn ${name}(bucket: u32, layer: u32, ${signature}) -> f32 {
${count === 0 ? "  return 1.0;" : Array.from({ length: count }, (_, i) => `  if (bucket == ${i}u) { return ${callee}(${shadowBucketName(cube, i)}, ${samplerName(shadowBucketName(cube, i))}, layer, ${args}); }`).join("\n") + "\n  return 1.0;"}
}`;
	const shadowDispatchDecls = materialFlags.unlitWorkflow ? "" : [shadowDispatch(shadow2DBuckets, false, "sampleShadowMap2D", "size: vec2f, uv: vec2f, compare: f32, near: f32, far: f32, radiusUV: vec2f, dzDuv: vec2f, ortho: bool, fragCoord: vec2f", "size, uv, compare, near, far, radiusUV, dzDuv, ortho, fragCoord", "getShadow"), shadowDispatch(shadowCubeBuckets, true, "sampleShadowMapCube", "size: vec2f, direction: vec3f, compare: f32, radius: f32, far: f32, fragCoord: vec2f", "size, direction, compare, radius, far, fragCoord", "getPunctualShadow")].join("\n");
	const reflectionProbeDecl = useReflectionProbes ? `
struct ReflectionProbe {
  rotation: mat3x3f,
  intensity: f32,
}
${bindingDeclaration(1, lightBindings.next(), "uReflectionProbe", "ReflectionProbe", "uniform")}
${textureSamplerDeclaration(1, lightBindings.nextTextureSampler(), "uSpecularEnvMap", "texture_cube<f32>")}
${bindingDeclaration(1, lightBindings.next(), "uIrradianceCoefficients", `array<vec4f, ${9}>`, "storage, read")}` : "";
	const captureDecl = materialFlags.unlitWorkflow ? "" : textureSamplerDeclaration(1, lightBindings.nextTextureSampler(), "uCaptureTexture");
	const ssaoDecl = materialFlags.unlitWorkflow ? "" : textureSamplerDeclaration(1, lightBindings.nextTextureSampler(), "uAOTexture");
	const lightsLoop = (type, call) => `{
    let range = uLightRanges.${type};
    for (var i = range.offset; i < range.offset + range.count; i++) {
      ${call}
    }
  }`;
	const ambientLightsBlock = lightsLoop("ambient", "EvaluateAmbientLight(&data, uLights[i], data.ao);");
	const directionalLightsBlock = lightsLoop("directional", "EvaluateDirectionalLight(&data, uLights[i], input.positionWorld, input.position.xy);");
	const pointLightsBlock = lightsLoop("point", "EvaluatePointLight(&data, uLights[i], input.position.xy);");
	const spotLightsBlock = lightsLoop("spot", "EvaluateSpotLight(&data, uLights[i], input.positionWorld, input.position.xy);");
	const areaLightsBlock = `if (USE_AREA_LIGHTS) ${lightsLoop("area", `EvaluateAreaLight(&data, uLights[i], uLtc1, ${samplerName("uLtc1")}, uLtc2, ${samplerName("uLtc2")}, input.positionWorld, uFrame.cameraPosition, input.position.xy);`)}`;
	const alphaBlock = () => `
  ${materialFlags.alphaTexture ? `let alphaTexCoord = getTextureCoordinatesTransformed(data, ${tc("alpha")}, uMaterial.alphaTextureMatrix);\n  data.opacity *= textureSample(uAlphaTexture, uAlphaTextureSampler, alphaTexCoord).x;` : ""}
  if (USE_ALPHA_CUTOFF && !USE_ALPHA_TO_COVERAGE) {
  alphaTest(&data, uMaterial.alphaCutoff);
  }`;
	const unlitBody = `
  ${materialFlags.baseColorTexture ? `getBaseColorTextured(&data, uMaterial.baseColor, uBaseColorTexture, uBaseColorTextureSampler, ${tc("baseColor")}, uMaterial.baseColorTextureMatrix, ${vColorExpr});` : `getBaseColor(&data, uMaterial.baseColor, ${vColorExpr});`}
  // Display-referred, not metered: an unlit material declares its output
  // colour, and baseColor is an sRGB value capped at 1 with no way to express
  // a luminance, so metering it for daylight would render it black.
  color = data.baseColor;
  ${alphaBlock()}`;
	const litBody = `
  data.inverseViewMatrix = uFrame.inverseViewMatrix;
  data.positionWorld = input.positionWorld;
  data.positionView = input.positionView;
  let frontFacingSign = select(-1.0, 1.0, frontFacing);
  data.normalView = normalize(input.normalView) * frontFacingSign;
  ${vertexFlags.tangent ? "data.tangentView = normalize(input.tangentView) * frontFacingSign;" : ""}
  data.normalWorld = normalize(input.normalWorld) * frontFacingSign;
  data.bentNormalWorld = data.normalWorld;
  data.eyeDirView = normalize(-input.positionView);
  data.eyeDirWorld = (uFrame.inverseViewMatrix * vec4f(data.eyeDirView, 0.0)).xyz;
  data.indirectDiffuse = vec3f(0.0);
  data.indirectSpecular = vec3f(0.0);
  data.ao = 1.0;
  data.opacity = 1.0;
  data.viewWorld = normalize(uFrame.cameraPosition - input.positionWorld);
  data.NdotV = saturateF32(abs(dot(data.normalWorld, data.viewWorld)) + FLT_EPS);

  ${hooks.fragBeforeTextures ?? ""}

  ${materialFlags.normalTexture ? `getNormalTextured(&data, uNormalTexture, uNormalTextureSampler, uMaterial.normalTextureScale, ${tc("normal")}, uMaterial.normalTextureMatrix, frontFacing);` : "getNormal(&data);"}

  ${materialFlags.emissiveTexture ? `getEmissiveTextured(&data, select(vec4f(1.0), uMaterial.emissive, USE_EMISSIVE), select(1.0, uMaterial.emissiveStrength, USE_EMISSIVE), uEmissiveTexture, uEmissiveTextureSampler, ${tc("emissive")}, uMaterial.emissiveTextureMatrix, ${vColorExpr});` : `getEmissive(&data, select(vec4f(0.0), uMaterial.emissive, USE_EMISSIVE), select(0.0, uMaterial.emissiveStrength, USE_EMISSIVE), ${vColorExpr});`}

  // Emissive is display-referred by default: the value authored is the value
  // that reaches the exposed buffer, so it reads the same whether or not the
  // camera is metering physically. emissiveExposure dials it towards being a
  // luminance the camera meters like anything else.
  data.emissive *= mix(1.0, uFrame.exposure, uMaterial.emissiveExposure);

  ${materialFlags.metallicRoughnessWorkflow ? `
  ${materialFlags.baseColorTexture ? `getBaseColorTextured(&data, uMaterial.baseColor, uBaseColorTexture, uBaseColorTextureSampler, ${tc("baseColor")}, uMaterial.baseColorTextureMatrix, ${vColorExpr});` : `getBaseColor(&data, uMaterial.baseColor, ${vColorExpr});`}
  ${textures.metallicRoughnessTexture ? `getMetallicRoughnessTextured(&data, uMaterial.metallic, uMaterial.roughness, uMetallicRoughnessTexture, uMetallicRoughnessTextureSampler, ${tc("metallicRoughness")}, uMaterial.metallicRoughnessTextureMatrix);` : `${textures.metallicTexture ? `getMetallicTextured(&data, uMaterial.metallic, uMetallicTexture, uMetallicTextureSampler, ${tc("metallic")}, uMaterial.metallicTextureMatrix);` : "getMetallic(&data, uMaterial.metallic);"}
  ${textures.roughnessTexture ? `getRoughnessTextured(&data, uMaterial.roughness, uRoughnessTexture, uRoughnessTextureSampler, ${tc("roughness")}, uMaterial.roughnessTextureMatrix);` : "getRoughness(&data, uMaterial.roughness);"}`}
  data.roughness = clamp(data.roughness, MIN_ROUGHNESS, 1.0);` : ""}

  ${materialFlags.specularGlossinessWorkflow ? `
  let sgDiffuseRGBA = ${textures.sgDiffuseTexture ? `getDiffuseTextured(uMaterial.sgDiffuse, data, uSgDiffuseTexture, uSgDiffuseTextureSampler, ${tc("sgDiffuse")}, uMaterial.sgDiffuseTextureMatrix);` : "getDiffuse(uMaterial.sgDiffuse);"}
  let sgSpecGloss = ${textures.sgSpecularGlossinessTexture ? `getSpecularGlossinessTextured(uMaterial.sgSpecular, uMaterial.sgGlossiness, data, uSgSpecularGlossinessTexture, uSgSpecularGlossinessTextureSampler, ${tc("sgSpecularGlossiness")}, uMaterial.sgSpecularGlossinessTextureMatrix);` : "getSpecularGlossiness(uMaterial.sgSpecular, uMaterial.sgGlossiness);"}
  getBaseColorAndMetallicRoughnessFromSpecularGlossiness(&data, sgSpecGloss, sgDiffuseRGBA, ${vColorExpr});` : ""}

  ${alphaBlock()}

  if (USE_CLEARCOAT) {
  ${textures.clearcoatTexture ? `getClearcoatTextured(&data, uMaterial.clearcoat, uMaterial.clearcoatRoughness, uClearcoatTexture, uClearcoatTextureSampler, ${tc("clearcoat")}, uMaterial.clearcoatTextureMatrix);` : "getClearcoat(&data, uMaterial.clearcoat);"}
  ${textures.clearcoatRoughnessTexture ? `getClearcoatRoughnessTextured(&data, uMaterial.clearcoatRoughness, uClearcoatRoughnessTexture, uClearcoatRoughnessTextureSampler, ${tc("clearcoatRoughness")}, uMaterial.clearcoatRoughnessTextureMatrix);` : materialFlags.clearcoatRoughnessFromMainTexture ? "" : "getClearcoatRoughness(&data, uMaterial.clearcoatRoughness);"}
  data.clearcoatLinearRoughness = data.clearcoatRoughness * data.clearcoatRoughness;
  data.f0 = mix(data.f0, f0ClearcoatToSurface(data.f0), data.clearcoat);
  data.roughness = max(data.roughness, data.clearcoatRoughness);
  ${textures.clearcoatNormalTexture ? `getClearcoatNormalTextured(&data, uClearcoatNormalTexture, uClearcoatNormalTextureSampler, uMaterial.clearcoatNormalTextureScale, ${tc("clearcoatNormal")}, uMaterial.clearcoatNormalTextureMatrix, frontFacing);` : "getClearcoatNormal(&data, input.normalView);"}
  }

  if (USE_SHEEN) {
  ${textures.sheenColorTexture ? `getSheenColorTextured(&data, uMaterial.sheenColor, uMaterial.sheenRoughness, uSheenColorTexture, uSheenColorTextureSampler, ${tc("sheenColor")}, uMaterial.sheenColorTextureMatrix);` : "getSheenColor(&data, uMaterial.sheenColor);"}
  ${textures.sheenRoughnessTexture ? `getSheenRoughnessTextured(&data, uMaterial.sheenRoughness, uSheenRoughnessTexture, uSheenRoughnessTextureSampler, ${tc("sheenRoughness")}, uMaterial.sheenRoughnessTextureMatrix);` : materialFlags.sheenRoughnessFromMainTexture ? "" : "getSheenRoughness(&data, uMaterial.sheenRoughness);"}
  getSheenAlbedoScaling(&data);
  data.sheenRoughness = max(data.sheenRoughness, MIN_ROUGHNESS);
  data.sheenLinearRoughness = data.sheenRoughness * data.sheenRoughness;
  }

  if (USE_TRANSMISSION) {
  data.transmitted = vec3f(0.0);
  if (USE_DISPERSION) {
  data.dispersion = uMaterial.dispersion;
  }
  ${textures.transmissionTexture ? `getTransmissionTextured(&data, uMaterial.transmission, uTransmissionTexture, uTransmissionTextureSampler, ${tc("transmission")}, uMaterial.transmissionTextureMatrix);` : "getTransmission(&data, uMaterial.transmission);"}
  }
  if (USE_VOLUME) {
  ${textures.thicknessTexture ? `getThicknessTextured(&data, uMaterial.thickness, uThicknessTexture, uThicknessTextureSampler, ${tc("thickness")}, uMaterial.thicknessTextureMatrix);` : "getThickness(&data, uMaterial.thickness);"}
  getAttenuation(&data, uMaterial.attenuationColor, uMaterial.attenuationDistance);
  }
  if (USE_DIFFUSE_TRANSMISSION) {
  ${materialFlags.diffuseTransmissionTexture && materialFlags.diffuseTransmissionColorTexture ? `getDiffuseTransmissionTextured(&data, uMaterial.diffuseTransmission, uMaterial.diffuseTransmissionColor, uDiffuseTransmissionTexture, uDiffuseTransmissionTextureSampler, ${tc("diffuseTransmission")}, uMaterial.diffuseTransmissionTextureMatrix, uDiffuseTransmissionColorTexture, uDiffuseTransmissionColorTextureSampler, ${tc("diffuseTransmissionColor")}, uMaterial.diffuseTransmissionColorTextureMatrix, uModel.modelMatrix);` : materialFlags.diffuseTransmissionTexture ? `getDiffuseTransmissionStrengthTextured(&data, uMaterial.diffuseTransmission, uMaterial.diffuseTransmissionColor, uDiffuseTransmissionTexture, uDiffuseTransmissionTextureSampler, ${tc("diffuseTransmission")}, uMaterial.diffuseTransmissionTextureMatrix, uModel.modelMatrix);` : materialFlags.diffuseTransmissionColorTexture ? `getDiffuseTransmissionColorTextured(&data, uMaterial.diffuseTransmission, uMaterial.diffuseTransmissionColor, uDiffuseTransmissionColorTexture, uDiffuseTransmissionColorTextureSampler, ${tc("diffuseTransmissionColor")}, uMaterial.diffuseTransmissionColorTextureMatrix, uModel.modelMatrix);` : `getDiffuseTransmission(&data, uMaterial.diffuseTransmission, uMaterial.diffuseTransmissionColor, uModel.modelMatrix);`}
  }

  ${materialFlags.occlusionTexture ? `getAmbientOcclusion(&data, uMaterial.occlusionTextureStrength, uOcclusionTexture, uOcclusionTextureSampler, ${tc("occlusion")}, uMaterial.occlusionTextureMatrix);` : ""}

  // Folded into the same term the material's occlusion texture feeds, so every
  // consumer of ao — ambient, area lights, the light probe, and the analytic
  // multi-bounce inside it — picks it up without knowing where it came from.
  if (USE_SSAO_TEXTURE) {
    let aoTerm = textureSampleLevel(uAOTexture, uAOTextureSampler, input.position.xy / uFrame.viewportSize, 0.0);
    data.ao *= aoTerm.x;
    if (USE_BENT_NORMALS) {
      // The estimator works in view space; the indirect term is world space.
      data.bentNormalWorld = normalize((uFrame.inverseViewMatrix * vec4f(aoTerm.yzw * 2.0 - 1.0, 0.0)).xyz);
    }
  }

  ${hooks.fragBeforeLighting ?? ""}

  data.diffuseColor = data.baseColor * (1.0 - data.metallic);
  data.linearRoughness = data.roughness * data.roughness;

  ${materialFlags.metallicRoughnessWorkflow ? `
  getIor(&data, uMaterial.ior);
  if (USE_SPECULAR) {
  ${textures.specularTexture && textures.specularColorTexture ? `getSpecularTextured(&data, uMaterial.specular, uMaterial.specularColor, uSpecularTexture, uSpecularTextureSampler, ${tc("specular")}, uMaterial.specularTextureMatrix, uSpecularColorTexture, uSpecularColorTextureSampler, ${tc("specularColor")}, uMaterial.specularColorTextureMatrix);` : textures.specularTexture ? `getSpecularStrengthTextured(&data, uMaterial.specular, uMaterial.specularColor, uSpecularTexture, uSpecularTextureSampler, ${tc("specular")}, uMaterial.specularTextureMatrix);` : textures.specularColorTexture ? `getSpecularColorTextured(&data, uMaterial.specular, uMaterial.specularColor, uSpecularColorTexture, uSpecularColorTextureSampler, ${tc("specularColor")}, uMaterial.specularColorTextureMatrix);` : "getSpecular(&data, uMaterial.specular, uMaterial.specularColor);"}
  } else {
  getSpecularFromIor(&data);
  }` : ""}

  ${useReflectionProbes ? `
  data.reflectionWorld = reflect(-data.eyeDirWorld, data.normalWorld);
  EvaluateLightProbe(&data, data.ao, uReflectionProbe.rotation, uReflectionProbe.intensity, uSpecularEnvMap, uSpecularEnvMapSampler, ROUGHNESS_LEVELS, uIrradianceCoefficients);` : ""}

  ${materialFlags.unlitWorkflow ? "" : `
  if (USE_TRANSMISSION) {
    EvaluateTransmission(&data, uCaptureTexture, uCaptureTextureSampler, uFrame.viewportSize, uModel.modelMatrix, uFrame.projectionMatrix, uFrame.viewMatrix);
  }`}

  ${ambientLightsBlock}
  ${directionalLightsBlock}
  ${pointLightsBlock}
  ${spotLightsBlock}
  ${areaLightsBlock}

  ${hooks.fragAfterLighting ?? ""}

  // Only the terms that are scene radiance get metered. data.transmitted is
  // already exposed (it samples the grab texture this same multiply wrote), and
  // data.emissive carries its own exposure treatment from above.
  color = (data.indirectDiffuse + data.indirectSpecular + data.directColor) * uFrame.exposure + data.emissive + data.transmitted;`;
	return `
${frameStruct()}

${modelStruct({
		previousModelMatrix: !!outputs.velocity,
		displacementTexture: useDisplacementTexture,
		skin: useSkin,
		previousSkin: !!outputs.velocity,
		maxJoints
	})}

struct Material {
  baseColor: vec4f,
  ${scalarStructFields}
  ${textureMatrixFields}
}
@group(2) @binding(0) var<uniform> uMaterial: Material;
${STANDARD_MATERIAL_FIELDS.filter((field) => field.texture).map((field) => textureSamplerDeclaration(2, textures[field.key] ?? null, uniformName(field.key))).join("\n")}
${hookBindingsDeclaration(2, materialBindings, hooks.bindings)}

${lightsDecl}
${shadow2DDecls}
${shadowCubeDecls}
${reflectionProbeDecl}
${captureDecl}
${ssaoDecl}

${vertexInputStruct({
		normal: useNormals,
		tangent: vertexFlags.tangent,
		texCoord0: vertexFlags.texCoord0 || useDisplacementTexture,
		texCoord1: vertexFlags.texCoord1,
		vertexColor: vertexFlags.vertexColor,
		instancedOffset: vertexFlags.instancedOffset,
		instancedScale: vertexFlags.instancedScale,
		instancedRotation: vertexFlags.instancedRotation,
		instancedColor: vertexFlags.instancedColor,
		skin: useSkin,
		previousPosition: !!outputs.velocity && vertexFlags.previousPosition,
		previousInstancedOffset: !!outputs.velocity && vertexFlags.previousInstancedOffset,
		previousInstancedScale: !!outputs.velocity && vertexFlags.previousInstancedScale,
		previousInstancedRotation: !!outputs.velocity && vertexFlags.previousInstancedRotation
	}, hookMembers(hooks.attributes))}

${vertexOutputStruct([
		{
			name: "normalWorld",
			type: "vec3f"
		},
		{
			name: "normalView",
			type: "vec3f"
		},
		{
			name: "texCoord0",
			type: "vec2f"
		},
		vertexFlags.texCoord1 && {
			name: "texCoord1",
			type: "vec2f"
		},
		{
			name: "positionWorld",
			type: "vec3f"
		},
		{
			name: "positionView",
			type: "vec3f"
		},
		vertexFlags.tangent && {
			name: "tangentView",
			type: "vec4f"
		},
		useColor && {
			name: "color",
			type: "vec4f"
		},
		...outputs.velocity ? VELOCITY_MEMBERS : [],
		...hookMembers(hooks.interStage)
	])}

${fragmentOutputStruct(sceneOutputMembers(outputs))}

${PBR_DATA_STRUCT}

// Feature toggles the included shaders expect this pipeline shader to declare.
override DEPTH_PASS_ONLY: bool = false;
override DEPTH_PRE_PASS_ONLY: bool = false;
override USE_TEXCOORD_1: bool = ${vertexFlags.texCoord1};
override USE_TANGENTS: bool = ${vertexFlags.tangent};
override USE_NORMAL_TEXTURE: bool = ${materialFlags.normalTexture};
override USE_CLEARCOAT_NORMAL_TEXTURE: bool = ${materialFlags.clearcoatNormalTexture};
override USE_CLEARCOAT_ROUGHNESS_FROM_MAIN_TEXTURE: bool = ${materialFlags.clearcoatRoughnessFromMainTexture};
override USE_SHEEN_ROUGHNESS_FROM_MAIN_TEXTURE: bool = ${materialFlags.sheenRoughnessFromMainTexture};
override DEPTH_PACK_FAR: f32 = 10.0;
// Genuinely overridable (unlike the toggles above, which change bind group
// layout/struct fields and so must be baked per-variant): none of these gate
// a binding or struct field — their scalar uMaterial fields are always
// declared (see the runtime FeatureField flag in systems/renderer/base.ts)
// — only a body branch, so materials that differ only by one of these
// effects being on/off share one compiled shader module. Real per-material
// values are supplied via the pipeline's constants (getPipelineOptions() in
// systems/renderer/standard.ts).
override USE_MSAA: bool = false;
override USE_BLEND: bool = false;
override USE_SSAO_TEXTURE: bool = false;
// The AO texture's remaining channels hold a bent normal, which then drives the
// irradiance lookup and the specular occlusion cone instead of the surface
// normal and the flat visibility term.
override USE_BENT_NORMALS: bool = false;
// Only meaningful alongside USE_BLEND: scales color by opacity before output,
// matching a premultiplied blend equation (see BLEND_MODES and
// getPipelineBlend in systems/renderer/base.ts).
override PREMULTIPLY_ALPHA: bool = false;
override USE_ALPHA_CUTOFF: bool = false;
// Alpha testing against a multisampled attachment: the cutout becomes a
// coverage mask rather than a discard, so its edges antialias like geometry.
// Set by the renderer when the pass is multisampled, paired with the pipeline's
// alphaToCoverage (see systems/renderer/standard.ts).
override USE_ALPHA_TO_COVERAGE: bool = false;
override USE_SPECULAR: bool = false;
override USE_EMISSIVE: bool = false;
override USE_CLEARCOAT: bool = false;
override USE_SHEEN: bool = false;
override USE_AREA_LIGHTS: bool = false;
override USE_TRANSMISSION: bool = false;
override USE_DISPERSION: bool = false;
override USE_VOLUME: bool = false;
override USE_DIFFUSE_TRANSMISSION: bool = false;
// Mip levels in the bound specular cubemap: baked probes always match
// ROUGHNESS_LEVELS (shaders/reflection-probe.ts), but a pre-baked
// EXT_lights_image_based probe reports its own native mip count, so this is
// swapped per-draw via the pipeline's constants rather than hardcoded here
// (see systems/renderer/standard.ts getPipelineOptions).
override ROUGHNESS_LEVELS: f32 = ${6}.0;

// Vertex includes
${quatToMat4}

${hooks.vertDeclarationsEnd ?? ""}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;

  var position = vec4f(input.position, 1.0);
  var normal = vec3f(0.0, 0.0, 0.0);
  ${useNormals ? "normal = input.normal;" : ""}
  ${vertexFlags.tangent ? "var tangent = input.tangent;" : ""}

  var texCoord = vec2f(0.0, 0.0);
  ${vertexFlags.texCoord0 ? "texCoord = input.texCoord0;" : ""}
  output.texCoord0 = texCoord;

  ${vertexFlags.texCoord1 ? "output.texCoord1 = input.texCoord1;" : ""}

  ${hooks.vertBeforeTransform ?? ""}

  ${useDisplacementTexture ? "let h = textureSampleLevel(uDisplacementTexture, uDisplacementTextureSampler, input.texCoord0, 0.0).x;\n  position = vec4f(position.xyz + uModel.displacement * h * normal, position.w);" : ""}

  ${vertexTransform({
		useSkin,
		instancedScale: vertexFlags.instancedScale,
		instancedRotation: vertexFlags.instancedRotation,
		instancedOffset: vertexFlags.instancedOffset,
		transformNormal: true,
		transformTangent: vertexFlags.tangent
	})}

  ${colorAssignment}

  output.normalWorld = normalize((uFrame.inverseViewMatrix * vec4f(output.normalView, 0.0)).xyz);

  let positionView = uFrame.viewMatrix * positionWorld;
  let positionOut = uFrame.projectionMatrix * positionView;

  output.positionWorld = positionWorld.xyz / positionWorld.w;
  output.positionView = positionView.xyz / positionView.w;
  output.position = positionOut;
  ${outputs.velocity ? `${vertexPreviousWorld({
		useSkin,
		instancedScale: vertexFlags.instancedScale,
		instancedRotation: vertexFlags.instancedRotation,
		instancedOffset: vertexFlags.instancedOffset,
		previousPosition: vertexFlags.previousPosition,
		previousInstancedScale: vertexFlags.previousInstancedScale,
		previousInstancedRotation: vertexFlags.previousInstancedRotation,
		previousInstancedOffset: vertexFlags.previousInstancedOffset
	})}
  ${vertexVelocity({ previousWorld: "previousPositionWorld" })}` : ""}
  ${vertexJitter()}

  ${vertexFlags.tangent ? "output.tangentView = vec4f((uModel.normalMatrix * tangent.xyz), tangent.w);" : ""}

  // Note: WebGPU has no gl_PointSize equivalent; point-primitive sizing is
  // not supported and must be done via instanced/billboarded quads instead.

  ${hooks.vertEnd ?? ""}

  return output;
}

// Fragment includes
${PI}
${TWO_PI}
${saturate}
${multQuat$1}
${random}
${glslMod}
${encode_decode_default}
${texture_coordinates_default}
${base_color_default}
${alpha_default}
${multiBounce}
${specular}
${texture}
${max3}
${reversible_tone_map_default}

${materialFlags.unlitWorkflow ? "" : `
  // Lighting
  ${LIGHT_STRUCTS}
  ${depth_unpack_default}
  ${depth_read_default}
  ${normal_perturb_default}
  ${shadowing_default}
  ${shadowDispatchDecls}
  ${brdf_default}
  ${specular_default}
  ${clearcoat_default}
  ${sheen_color_default}
  ${transmission_default}
  ${indirect_default}
  ${direct_default}
  ${light_ambient_default}
  ${light_directional_default}
  ${light_point_default}
  ${light_spot_default}
  ${light_area_default}

  // Material and geometric context
  ${emissive_default}
  ${normal_default}
  ${metallic_roughness_default}
  ${specular_glossiness_default}
`}

${hooks.fragDeclarationsEnd ?? ""}

@fragment
fn fragmentMain(
  input: VertexOutput,
  @builtin(front_facing) frontFacing: bool
) -> FragmentOutput {
  var output: FragmentOutput;
  var color: vec3f;

  var data: PBRData;
  data.texCoord0 = input.texCoord0;
  ${vertexFlags.texCoord1 ? "data.texCoord1 = input.texCoord1;" : ""}

  ${materialFlags.unlitWorkflow ? unlitBody : litBody}

  if (USE_MSAA) {
    color = reversibleToneMap(color);
  }

  color = max(color, vec3f(0.0));

  output.color = vec4f(color, 1.0);

  ${outputs.normal ? "output.normal = vec4f(data.normalView * 0.5 + 0.5, 1.0);" : ""}
  ${outputs.emissive ? "output.emissive = vec4f(data.emissive, 1.0);" : ""}
  ${outputs.velocity ? FRAGMENT_VELOCITY : ""}
  ${outputs.responsive ? `// Blended and transmissive surfaces mark themselves without being asked:
  // neither is drawn in the pass that writes motion vectors, so the history
  // behind them belongs to whatever they are in front of. The opacity rides
  // along as alpha, so a surface covering part of a pixel claims that part.
  output.responsive = vec4f(
    ${defines.has(MATERIAL_DEFINE$1.responsiveAA) ? "1.0" : "select(0.0, 1.0, USE_BLEND || USE_TRANSMISSION)"},
    0.0,
    0.0,
    data.opacity
  );` : ""}
  if (USE_TRANSMISSION || USE_BLEND) {
    output.color.w = data.opacity;
    if (PREMULTIPLY_ALPHA) {
      output.color = vec4f(output.color.rgb * data.opacity, data.opacity);
    }
  }

  if (USE_ALPHA_CUTOFF && USE_ALPHA_TO_COVERAGE) {
    // Alpha drives the coverage mask, so it has to be a coverage value rather
    // than the mask texture's own gradient: rescaled by its screen-space rate
    // of change, it saturates to 0 or 1 everywhere except the pixel straddling
    // the cutoff. Without this, every partially transparent texel in the
    // interior would thin out the surface instead of only its silhouette.
    output.color.w = saturateF32(
      (data.opacity - uMaterial.alphaCutoff) / max(fwidth(data.opacity), 1e-4) + 0.5
    );
  }

  ${hooks.fragEnd ?? ""}
  ${options.debugRender ? debugRenderAssignment(options.debugRender) : ""}

  return output;
}
`;
};

var depth_pass_exports = /* @__PURE__ */ __exportAll({
	DEPTH_PASS_ALPHA_VERTEX_FIELDS: () => DEPTH_PASS_ALPHA_VERTEX_FIELDS,
	DEPTH_PASS_MATERIAL_FIELDS: () => DEPTH_PASS_MATERIAL_FIELDS,
	DEPTH_PASS_VERTEX_FIELDS: () => DEPTH_PASS_VERTEX_FIELDS,
	depthPassShader: () => depthPassShader
});
const VERTEX_DEFINE = {
	texCoord0: "USE_TEXCOORD_0",
	texCoord1: "USE_TEXCOORD_1",
	vertexColor: "USE_VERTEX_COLORS",
	instancedOffset: "USE_INSTANCED_OFFSET",
	instancedScale: "USE_INSTANCED_SCALE",
	instancedRotation: "USE_INSTANCED_ROTATION",
	instancedColor: "USE_INSTANCED_COLOR",
	skin: "USE_SKIN"
};
const MATERIAL_DEFINE = {
	alphaCutoff: "USE_ALPHA_CUTOFF",
	baseColorTexture: "USE_BASE_COLOR_TEXTURE",
	alphaTexture: "USE_ALPHA_TEXTURE"
};
const DEPTH_PASS_VERTEX_FIELDS = [
	{
		key: "texCoord0",
		define: VERTEX_DEFINE.texCoord0
	},
	{
		key: "offset",
		define: VERTEX_DEFINE.instancedOffset
	},
	{
		key: "scale",
		define: VERTEX_DEFINE.instancedScale
	},
	{
		key: "rotation",
		define: VERTEX_DEFINE.instancedRotation
	},
	{
		key: "joint",
		define: VERTEX_DEFINE.skin
	},
	{
		key: "weight",
		define: VERTEX_DEFINE.skin
	}
];
/**
* Geometry attributes only an alpha test reads. Kept out of
* {@link DEPTH_PASS_VERTEX_FIELDS} so an opaque shadow caster that happens to
* carry vertex colors or a second UV set doesn't get its own pipeline variant
* emitting identical WGSL.
*/
const DEPTH_PASS_ALPHA_VERTEX_FIELDS = [
	{
		key: "texCoord1",
		define: VERTEX_DEFINE.texCoord1
	},
	{
		key: "vertexColor",
		define: VERTEX_DEFINE.vertexColor
	},
	{
		key: "color",
		define: VERTEX_DEFINE.instancedColor
	}
];
/**
* Material state the alpha test needs, and nothing else. It mirrors every term
* the main pass folds into `data.opacity` — base color alpha, its texture,
* KHR_materials_alpha's separate map, vertex/instance color — because the two
* have to agree exactly: a fragment kept here and discarded there leaves depth
* in front of nothing to shade.
*/
const DEPTH_PASS_MATERIAL_FIELDS = [
	{
		key: "alphaCutoff",
		define: MATERIAL_DEFINE.alphaCutoff,
		wgslType: "f32",
		default: 0
	},
	{
		key: "baseColor",
		wgslType: "vec4f",
		default: [
			1,
			1,
			1,
			1
		],
		requires: MATERIAL_DEFINE.alphaCutoff
	},
	{
		key: "baseColorTexture",
		define: MATERIAL_DEFINE.baseColorTexture,
		texture: true,
		requires: MATERIAL_DEFINE.alphaCutoff
	},
	{
		key: "alphaTexture",
		define: MATERIAL_DEFINE.alphaTexture,
		texture: true,
		requires: MATERIAL_DEFINE.alphaCutoff
	}
];
/**
* Geometry-only pass: write clip-space depth into the depth attachment, with no
* fragment stage or color output unless one of the variants below asks for one.
* Shared by shadow maps and the depth pre-pass, which differ only in what they
* do with the fragment.
*
* USE_NORMAL_OUTPUT is the pre-pass variant: a fragment stage writes the
* view-space normal to location 0 alongside the depth it already produces, so
* anything needing geometry before shading (ambient occlusion as a lighting
* input) has both.
*
* USE_LINEAR_DEPTH switches to omni (point) shadows: a fragment stage overrides
* the depth attachment with the normalized radial distance from the light
* (length(viewPosition) / far). Radial distance is continuous across all six
* cube faces, so there is no perspective-depth seam or near-plane precision
* bunching. Because frag_depth is written explicitly, rasterizer depth bias no
* longer applies — bias is done in the light shader's compare instead.
*
* USE_ALPHA_CUTOFF adds the fragment stage's other job: recompute opacity the
* way the main pass does and discard below the cutoff. It composes with either
* variant above, and is the only reason this pass binds material state at all.
*
* USE_ALPHA_TO_COVERAGE resolves that cutout as a coverage mask instead, for a
* multisampled pre-pass. It needs the normal output: the mask comes from the
* alpha at location 0, which a depth-only pass has no target for.
*
* The displacement offset is stretched 1.3x relative to standard.js's to reduce
* acne/peter-panning from displaced surfaces — a shadow-map bias, so
* USE_DEPTH_PRE_PASS drops it. A pre-pass has to compute the same position the
* opaque pass will, to the bit; anything else is z-fighting rather than bias.
*/
const depthPassShader = (defines = /* @__PURE__ */ new Set(), options = {}) => {
	const hooks = options.hooks || {};
	const { maxJoints = 256 } = options;
	const useNormals = defines.has("USE_NORMALS");
	const vertexFlags = getDefineFlags(VERTEX_DEFINE, defines);
	const useDisplacementTexture = defines.has("USE_DISPLACEMENT_TEXTURE");
	const useSkin = defines.has("USE_SKIN");
	const useLinearDepth = defines.has("USE_LINEAR_DEPTH");
	const useNormalOutput = defines.has("USE_NORMAL_OUTPUT");
	const usePrePass = defines.has("USE_DEPTH_PRE_PASS");
	const writeNormal = useNormalOutput && useNormals;
	const useAlphaTest = defines.has(MATERIAL_DEFINE.alphaCutoff);
	const useAlphaToCoverage = useAlphaTest && useNormalOutput && defines.has("USE_ALPHA_TO_COVERAGE");
	const materialFlags = getDefineFlags(MATERIAL_DEFINE, defines);
	const useBaseColorTexture = useAlphaTest && materialFlags.baseColorTexture;
	const useAlphaTexture = useAlphaTest && materialFlags.alphaTexture;
	const useColor = useAlphaTest && (vertexFlags.vertexColor || vertexFlags.instancedColor);
	const tc = getTexCoordGetter(options.texCoords ?? {});
	const texCoordSets = /* @__PURE__ */ new Set();
	if (useBaseColorTexture) texCoordSets.add(tc("baseColor"));
	if (useAlphaTexture) texCoordSets.add(tc("alpha"));
	const hookPrelude = hooks.vertDeclarationsEnd ? [
		PI,
		TWO_PI,
		saturate,
		multQuat$1,
		random,
		glslMod,
		max3,
		encode_decode_default
	].join("\n") : "";
	const materialBindings = createBindingAllocator(1);
	const baseColorTextureBinding = useBaseColorTexture ? materialBindings.nextTextureSampler() : null;
	const alphaTextureBinding = useAlphaTexture ? materialBindings.nextTextureSampler() : null;
	const sampleAlpha = (key, varName, binding, channel) => binding ? `opacity *= textureSample(${varName}, ${varName}Sampler, (uMaterial.${key}TextureMatrix * vec3f(input.texCoord${tc(key)}, 1.0)).xy).${channel};` : "";
	return `
${frameStruct({ extraFields: useLinearDepth ? "far: f32," : "" })}
${useAlphaTest ? `struct Material {
  baseColor: vec4f,
  ${textureMatrixField("baseColorTexture", baseColorTextureBinding)}
  ${textureMatrixField("alphaTexture", alphaTextureBinding)}
  alphaCutoff: f32,
}
${bindingDeclaration(2, 0, "uMaterial", "Material", "uniform")}
${textureSamplerDeclaration(2, baseColorTextureBinding, "uBaseColorTexture")}
${textureSamplerDeclaration(2, alphaTextureBinding, "uAlphaTexture")}` : ""}
${hookBindingsDeclaration(2, materialBindings, hooks.bindings)}

${modelStruct({
		displacementTexture: useDisplacementTexture,
		skin: useSkin,
		maxJoints
	})}

${vertexInputStruct({
		normal: useNormals,
		texCoord0: vertexFlags.texCoord0 || useDisplacementTexture,
		texCoord1: texCoordSets.has(1),
		vertexColor: useColor && vertexFlags.vertexColor,
		instancedOffset: vertexFlags.instancedOffset,
		instancedScale: vertexFlags.instancedScale,
		instancedRotation: vertexFlags.instancedRotation,
		instancedColor: useColor && vertexFlags.instancedColor,
		skin: useSkin
	}, hookMembers(hooks.attributes))}

${vertexOutputStruct([
		useLinearDepth && {
			name: "viewPosition",
			type: "vec3f"
		},
		writeNormal && {
			name: "normalView",
			type: "vec3f"
		},
		texCoordSets.has(0) && {
			name: "texCoord0",
			type: "vec2f"
		},
		texCoordSets.has(1) && {
			name: "texCoord1",
			type: "vec2f"
		},
		useColor && {
			name: "color",
			type: "vec4f"
		},
		...hookMembers(hooks.interStage)
	])}

${quatToMat4}
${hookPrelude}

${hooks.vertDeclarationsEnd ?? ""}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  // Declared up front: vertexTransform writes output.normalView itself when it
  // is transforming normals.
  var output: VertexOutput;
  var position = vec4f(input.position, 1.0);
  var normal = vec3f(0.0, 0.0, 0.0);
  ${useNormals ? "normal = input.normal;" : ""}

  ${hooks.vertBeforeTransform ?? ""}

  ${useDisplacementTexture ? `let h = textureSampleLevel(uDisplacementTexture, uDisplacementTextureSampler, input.texCoord0, 0.0).x;\n  position = vec4f(position.xyz + uModel.displacement * h * normal${usePrePass ? "" : " * 1.3"}, position.w);` : ""}

  ${vertexTransform({
		useSkin,
		instancedScale: vertexFlags.instancedScale,
		instancedRotation: vertexFlags.instancedRotation,
		instancedOffset: vertexFlags.instancedOffset,
		transformNormal: writeNormal
	})}

  ${hooks.vertEnd ?? ""}

  let viewPosition = uFrame.viewMatrix * positionWorld;
  output.position = uFrame.projectionMatrix * viewPosition;
  ${vertexJitter()}
  ${useLinearDepth ? "output.viewPosition = viewPosition.xyz;" : ""}
  ${texCoordSets.has(0) ? "output.texCoord0 = input.texCoord0;" : ""}
  ${texCoordSets.has(1) ? "output.texCoord1 = input.texCoord1;" : ""}
  ${useColor ? vertexFlags.vertexColor && vertexFlags.instancedColor ? "output.color = input.vertexColor * input.color;" : vertexFlags.vertexColor ? "output.color = input.vertexColor;" : "output.color = input.color;" : ""}
  return output;
}
${(() => {
		const opacityBlock = useAlphaTest ? `var opacity = uMaterial.baseColor.w;
  ${useColor ? "opacity *= input.color.w;" : ""}
  ${sampleAlpha("baseColor", "uBaseColorTexture", baseColorTextureBinding, "w")}
  ${sampleAlpha("alpha", "uAlphaTexture", alphaTextureBinding, "x")}` : "";
		const discardBlock = useAlphaTest && !useAlphaToCoverage ? `${opacityBlock}
  if (opacity < uMaterial.alphaCutoff) {
    discard;
  }` : "";
		if (useLinearDepth) return `@fragment
fn fragmentMain(input: VertexOutput) -> @builtin(frag_depth) f32 {
  ${discardBlock}
  return length(input.viewPosition) / uFrame.far;
}`;
		const coverageExpr = useAlphaToCoverage ? `clamp((opacity - uMaterial.alphaCutoff) / max(fwidth(opacity), 1e-4) + 0.5, 0.0, 1.0)` : "1.0";
		if (useNormalOutput) return `@fragment
fn fragmentMain(input: VertexOutput, @builtin(front_facing) frontFacing: bool) -> @location(0) vec4f {
  ${useAlphaToCoverage ? opacityBlock : discardBlock}
  ${writeNormal ? `let frontFacingSign = select(-1.0, 1.0, frontFacing);
  let normalView = normalize(input.normalView) * frontFacingSign;` : "let normalView = vec3f(0.0, 0.0, 1.0);"}
  return vec4f(normalView * 0.5 + 0.5, ${coverageExpr});
}`;
		return useAlphaTest ? `@fragment
fn fragmentMain(input: VertexOutput) {
  ${discardBlock}
}` : "";
	})()}
`;
};

/**
* A light the frame declared no shadow for. The struct members still have to
* pack, and `castShadows: 0` is what makes the shader skip them.
*/
const NO_SHADOW = {
	cubemap: false,
	bucket: 0,
	layer: 0,
	near: 0,
	far: 0,
	radiusUV: [0, 0],
	projectionMatrix: create$1(),
	texture: void 0
};
function getTexCoords(material, fields, defines) {
	const textures = material;
	const texCoords = {};
	for (const { key, texture, define } of fields) {
		if (!texture || !defines.has(define)) continue;
		const texCoord = textures[key]?.texCoord;
		if (texCoord) texCoords[key.replace(/Texture$/, "")] = texCoord;
	}
	return texCoords;
}
const RUNTIME_DEFINES = new Set(STANDARD_MATERIAL_FIELDS.filter((field) => field.runtime && field.define).map((field) => field.define));
const NORMAL_MATRIX = create$3();
const IDENTITY_MAT3$1 = create$3();
const lightColor = (light) => [
	light.color[0],
	light.color[1],
	light.color[2],
	light._intensity
];
function getViewNormalMatrix(viewMatrix, modelMatrix) {
	set$2(TEMP_MAT4, viewMatrix);
	mult(TEMP_MAT4, modelMatrix);
	invert(TEMP_MAT4);
	transpose(TEMP_MAT4);
	return fromMat4$1(NORMAL_MATRIX, TEMP_MAT4);
}
const isStandardMesh = (entity) => entity.geometry && entity.material && entity.material.type === void 0 && entity._geometry && entity._transform;
/**
* Standard renderer
*
* PBR draw path built on pex-shaders' `standard` WGSL generator. Bind group
* convention: group(0) Frame, group(1) Lights, group(2) Material, group(3)
* Model.
*/
var standard_default = ({ ctx, shadowQuality = 4 }) => ({
	...base_default(),
	type: "standard-renderer",
	debug: false,
	shadowQuality,
	debugRender: "",
	dummyTexture2D: createTexture(ctx, {
		label: "dummyShadowMap2D",
		width: 4,
		height: 4,
		depth: 1,
		viewDimension: "2d-array",
		format: "depth32float"
	}),
	dummyTextureCube: createTexture(ctx, {
		label: "dummyShadowMapCube",
		width: 4,
		height: 4,
		depth: 6,
		viewDimension: "cube-array",
		format: "depth32float"
	}),
	dummyCaptureTexture: createTexture(ctx, {
		label: "dummyCaptureTexture",
		width: 4,
		height: 4,
		format: "rgba8unorm"
	}),
	dummyWhiteTexture: createTexture(ctx, {
		label: "dummyWhiteTexture",
		width: 1,
		height: 1,
		format: "rgba8unorm",
		data: new Uint8Array([
			255,
			255,
			255,
			255
		])
	}),
	shadowSampler: createSampler(ctx, { filter: "nearest" }),
	shadowCompareSampler: createSampler(ctx, {
		filter: "linear",
		compare: "less-equal"
	}),
	ltcSampler: createSampler(ctx, { filter: "linear" }),
	materialSampler: createSampler(ctx, {
		filter: "linear",
		addressMode: "repeat"
	}),
	captureSampler: createSampler(ctx, {
		filter: "linear",
		addressMode: "clamp-to-edge"
	}),
	ltcTextures: {
		ltc_1: null,
		ltc_2: null
	},
	isLoadingAreaLightData: null,
	depthPipelineCache: /* @__PURE__ */ new Map(),
	prePassPipelineCache: /* @__PURE__ */ new Map(),
	async loadAreaLightData() {
		try {
			const { g_ltc_1, g_ltc_2 } = await import("./_chunks/area-light-data-aapWXTa8.js");
			const options = {
				width: 64,
				height: 64,
				format: "rgba16float"
			};
			this.ltcTextures.ltc_1 = createTexture(ctx, {
				label: "areaLightMatTexture",
				data: g_ltc_1,
				...options
			});
			this.ltcTextures.ltc_2 = createTexture(ctx, {
				label: "areaLightMagTexture",
				data: g_ltc_2,
				...options
			});
		} catch (error) {
			console.error(NAMESPACE, error);
		}
	},
	getShader: (defines, options) => standardShader(defines, options),
	getShaderOptions(entity, options, defines) {
		return {
			shadow2DBuckets: options.lights.shadow2DBuckets,
			shadowCubeBuckets: options.lights.shadowCubeBuckets,
			outputs: options.outputs,
			texCoords: getTexCoords(entity.material, STANDARD_MATERIAL_FIELDS, defines),
			hooks: entity.material.hooks,
			debugRender: this.debugRender
		};
	},
	getMaterialDefines(entity) {
		const material = entity.material;
		const unlit = this.isUnlit(entity);
		const defines = /* @__PURE__ */ new Set();
		if (unlit) defines.add(STANDARD_WORKFLOW.unlit);
		else {
			const useSpecularGlossiness = !!(material.sgDiffuse || material.sgSpecular || material.sgGlossiness);
			defines.add(useSpecularGlossiness ? STANDARD_WORKFLOW.specularGlossiness : STANDARD_WORKFLOW.metallicRoughness);
			defines.add("USE_NORMALS");
		}
		return this.getFeatureFlags(material, unlit ? STANDARD_MATERIAL_COMMON_FIELDS : STANDARD_MATERIAL_FIELDS, defines, this.materialSampler);
	},
	getDefines(entity, options, materialFeatures) {
		const { defines } = materialFeatures ?? this.getMaterialDefines(entity);
		this.getFeatureFlags(entity._geometry.attributes, STANDARD_VERTEX_FIELDS, defines);
		if (options.reflectionProbe && !this.isUnlit(entity)) defines.add("USE_REFLECTION_PROBES");
		return defines;
	},
	getVariantKey(entity, defines, options) {
		const material = entity.material;
		return [
			definesKey(defines.difference(RUNTIME_DEFINES)),
			options.lights.shadow2DBuckets,
			options.lights.shadowCubeBuckets,
			outputsKey(options.outputs),
			JSON.stringify(getTexCoords(material, STANDARD_MATERIAL_FIELDS, defines)),
			hooksKey(material.hooks),
			this.debugRender
		].join("|");
	},
	isUnlit(entity) {
		return entity.material.unlit || !entity._geometry.attributes.normal;
	},
	getPipelineOptions(entity, options, precomputed) {
		const material = entity.material;
		const blend = this.getPipelineBlend(material.blend);
		const alphaToCoverage = !!options.multisampled && material.alphaCutoff !== void 0 && !blend;
		return {
			alphaToCoverage,
			blend,
			depthWriteEnabled: material.depthWriteEnabled ?? !blend,
			depthCompare: material.depthCompare ?? "less-equal",
			cullMode: options.cullMode ?? material.cullMode ?? "back",
			topology: entity._geometry.topology ?? "triangle-list",
			frontFace: determinant(entity._transform.modelMatrix) < 0 ? "cw" : "ccw",
			constants: {
				USE_MSAA: !!options.msaa,
				USE_ALPHA_TO_COVERAGE: alphaToCoverage,
				USE_BLEND: !!blend,
				USE_SSAO_TEXTURE: !!options.textures?.["ssao.main"],
				USE_BENT_NORMALS: !!options.textures?.["ssao.bentNormal"],
				PREMULTIPLY_ALPHA: blend?.color?.srcFactor === "one" && blend?.color?.dstFactor === "one-minus-src-alpha",
				...precomputed?.constants,
				...this.isUnlit(entity) ? {} : {
					SHADOW_QUALITY: material.receiveShadows ? this.shadowQuality : 0,
					USE_AREA_LIGHTS: options.lights.area,
					...options.reflectionProbe && { ROUGHNESS_LEVELS: options.reflectionProbe.roughnessLevels }
				}
			}
		};
	},
	gatherLights(entities, scope) {
		const ambient = entities.filter((e) => e.ambientLight);
		const directional = entities.filter((e) => e.directionalLight);
		const point = entities.filter((e) => e.pointLight);
		const spot = entities.filter((e) => e.spotLight);
		const area = entities.filter((e) => e.areaLight);
		if (area.length && !this.isLoadingAreaLightData) {
			this.isLoadingAreaLightData = true;
			this.loadAreaLightData();
		}
		const areaActive = this.ltcTextures.ltc_1 && this.ltcTextures.ltc_2 ? area : [];
		const uniforms = {};
		const shadowBuckets = {
			textures2D: [],
			texturesCube: []
		};
		const shadowOf = (light) => light._shadows?.get(scope) ?? NO_SHADOW;
		const shadowSlot = (light, shadow, cube) => {
			const map = light.castShadows ? shadow.texture : void 0;
			if (map) (cube ? shadowBuckets.texturesCube : shadowBuckets.textures2D)[shadow.bucket] = map;
			return {
				castShadows: map ? 1 : 0,
				shadowBucket: map ? shadow.bucket : 0,
				shadowLayer: map ? shadow.layer : 0,
				shadowMapSize: map ? [map.width, map.height] : [0, 0]
			};
		};
		const shadow2D = (light) => {
			const shadow = shadowOf(light);
			return {
				...shadowSlot(light, shadow, false),
				projectionMatrix: shadow.projectionMatrix,
				near: shadow.near,
				far: shadow.far,
				radiusUV: shadow.radiusUV
			};
		};
		const byType = {
			ambient: ambient.map((e) => ({ color: lightColor(e.ambientLight) })),
			directional: directional.map((e) => {
				const light = e.directionalLight;
				return {
					direction: light._direction,
					color: lightColor(light),
					viewMatrix: light._viewMatrix,
					...shadow2D(light)
				};
			}),
			point: point.map((e) => {
				const light = e.pointLight;
				const shadow = shadowOf(light);
				return {
					position: e._transform.worldPosition,
					color: lightColor(light),
					invSqrFalloff: light._invSqrFalloff,
					depthBiasNormalized: light.depthBiasNormalized ?? 0,
					radius: light.bulbRadius ?? 0,
					far: shadow.far,
					...shadowSlot(light, shadow, true)
				};
			}),
			spot: spot.map((e) => {
				const light = e.spotLight;
				return {
					position: e._transform.worldPosition,
					direction: light._direction,
					color: lightColor(light),
					innerConeAngle: light.innerConeAngle,
					outerConeAngle: light.outerConeAngle,
					invSqrFalloff: light._invSqrFalloff,
					viewMatrix: light._viewMatrix,
					...shadow2D(light)
				};
			}),
			area: areaActive.map((e) => {
				const light = e.areaLight;
				return {
					position: e.transform.position,
					color: lightColor(light),
					rotation: e.transform.rotation,
					size: [e.transform.scale[0] / 2, e.transform.scale[1] / 2],
					disk: light.disk ? 1 : 0,
					doubleSided: light.doubleSided ? 1 : 0,
					viewMatrix: light._viewMatrix,
					...shadow2D(light)
				};
			})
		};
		const lights = [];
		const ranges = {};
		for (const type of LIGHT_TYPES) {
			ranges[type] = {
				offset: lights.length,
				count: byType[type].length
			};
			lights.push(...byType[type]);
		}
		uniforms.uLights = lights;
		uniforms.uLightRanges = ranges;
		uniforms.uLtc1 = this.ltcTextures.ltc_1 ?? this.dummyWhiteTexture;
		uniforms[samplerName("uLtc1")] = this.ltcSampler;
		uniforms.uLtc2 = this.ltcTextures.ltc_2 ?? this.dummyWhiteTexture;
		uniforms[samplerName("uLtc2")] = this.ltcSampler;
		for (let i = 0; i < shadowBuckets.textures2D.length; i++) {
			const name = uniformName(`shadowMaps2D${i}`);
			uniforms[name] = shadowBuckets.textures2D[i] ?? this.dummyTexture2D;
			uniforms[samplerName(name)] = this.shadowCompareSampler;
		}
		for (let i = 0; i < shadowBuckets.texturesCube.length; i++) {
			const name = uniformName(`shadowMapsCube${i}`);
			uniforms[name] = shadowBuckets.texturesCube[i] ?? this.dummyTextureCube;
			uniforms[samplerName(name)] = this.shadowSampler;
		}
		return {
			uniforms,
			shadow2DBuckets: shadowBuckets.textures2D.length,
			shadowCubeBuckets: shadowBuckets.texturesCube.length,
			area: areaActive.length > 0
		};
	},
	inputs({ transparent, transmitted } = {}) {
		if (transmitted) return ["transmission.grab"];
		return transparent ? [] : ["ssao.main", "ssao.bentNormal"];
	},
	render(renderView, entities, options) {
		const { transparent, transmitted, cullMode, textures = {}, frameIndex = NaN, reflectionProbe } = options;
		const passOptions = {
			...options,
			lights: this.gatherLights(entities, options.shadowScope ?? "")
		};
		const velocity = !!options.outputs?.velocity;
		const reflectionUniforms = reflectionProbe ? {
			uReflectionProbe: {
				rotation: reflectionProbe.rotation ?? IDENTITY_MAT3$1,
				intensity: reflectionProbe.intensity ?? 1
			},
			uSpecularEnvMap: reflectionProbe.specularTexture,
			uSpecularEnvMapSampler: reflectionProbe.sampler,
			uIrradianceCoefficients: reflectionProbe.irradianceCoefficients
		} : void 0;
		const captureUniforms = {
			uCaptureTexture: textures["transmission.grab"] || this.dummyCaptureTexture,
			uCaptureTextureSampler: this.captureSampler,
			uAOTexture: textures["ssao.main"] || this.dummyWhiteTexture,
			uAOTextureSampler: this.captureSampler
		};
		const uFrame = this.getFrameUniforms(renderView);
		const renderableEntities = entities.filter((e) => isStandardMesh(e) && (transmitted ? cullMode === "front" ? e.material.cullMode === "none" && e.material.transmission : e.material.transmission : !e.material.transmission) && (transparent ? e.material.blend : !e.material.blend));
		for (let i = 0; i < renderableEntities.length; i++) {
			const entity = renderableEntities[i];
			const materialFeatures = this.getMaterialDefines(entity);
			const pipeline = this.getPipeline(entity, passOptions, materialFeatures);
			const materialUniforms = materialFeatures.uniforms;
			materialUniforms.uMaterial.baseColor = entity.material.baseColor;
			const modelStructOptions = {
				previousModelMatrix: velocity,
				skin: materialFeatures.defines.has("USE_SKIN"),
				previousSkin: velocity
			};
			submit(ctx, {
				label: transparent ? "drawTransparentGeometryCmd" : "drawOpaqueGeometryCmd",
				pipeline,
				attributes: entity._geometry.attributes,
				indices: entity._geometry.indices,
				count: entity._geometry.count,
				instanceCount: entity._geometry.instanceCount,
				uniforms: {
					uFrame,
					...this.getModelUniforms(entity, getViewNormalMatrix(uFrame.viewMatrix, entity._transform.modelMatrix), modelStructOptions),
					...materialUniforms,
					...passOptions.lights.uniforms,
					...reflectionUniforms,
					...captureUniforms,
					...this.getHookUniforms(entity, frameIndex, this.materialSampler)
				}
			});
		}
	},
	renderOpaque(renderView, entities, options) {
		this.render(renderView, entities, {
			...options,
			transparent: false
		});
	},
	renderTransparent(renderView, entities, options) {
		this.render(renderView, entities, {
			...options,
			transparent: true
		});
	},
	/**
	* Defines and material uniforms for one depth-pass draw.
	*
	* Position-affecting features always; everything else only when the material
	* alpha tests, which is the one thing that makes a depth-only draw care what
	* a surface looks like. `texCoords` mirrors what the main pass resolved so
	* both sample the same UV set.
	*/
	getDepthPassMaterial(entity) {
		const { attributes } = entity._geometry;
		const defines = /* @__PURE__ */ new Set();
		this.getFeatureFlags(attributes, DEPTH_PASS_VERTEX_FIELDS, defines);
		const { hooks } = entity.material;
		if ((hooks?.vertBeforeTransform || hooks?.vertDeclarationsEnd || hooks?.vertEnd) && attributes.normal) defines.add("USE_NORMALS");
		if (entity.material.alphaCutoff === void 0) return {
			defines,
			hooks
		};
		this.getFeatureFlags(attributes, DEPTH_PASS_ALPHA_VERTEX_FIELDS, defines);
		const { uniforms } = this.getFeatureFlags(entity.material, DEPTH_PASS_MATERIAL_FIELDS, defines, this.materialSampler);
		return {
			defines,
			hooks,
			uniforms,
			texCoords: getTexCoords(entity.material, DEPTH_PASS_MATERIAL_FIELDS, defines)
		};
	},
	getDepthPassPipeline(name, entity, cache, material) {
		const { defines, texCoords, hooks } = material;
		const key = [
			definesKey(defines),
			JSON.stringify(texCoords ?? {}),
			hooksKey(hooks)
		].join("|");
		const pipeline = this.getCachedPipeline(name, cache, key, entity, () => {
			const shader = depthPassShader(defines, {
				...texCoords && { texCoords },
				...hooks && { hooks }
			});
			return [
				"USE_ALPHA_CUTOFF",
				"USE_LINEAR_DEPTH",
				"USE_NORMAL_OUTPUT"
			].some((define) => defines.has(define)) ? { shader } : { vertex: shader };
		});
		pipeline.depthWriteEnabled = true;
		pipeline.cullMode = entity.material.cullMode ?? "back";
		pipeline.topology = entity._geometry.topology ?? "triangle-list";
		pipeline.frontFace = determinant(entity._transform.modelMatrix) < 0 ? "cw" : "ccw";
		return pipeline;
	},
	getDepthPipeline(entity, linear, light, material) {
		if (linear) material.defines.add("USE_LINEAR_DEPTH");
		const pipeline = this.getDepthPassPipeline("shadow", entity, this.depthPipelineCache, material);
		if (linear) {
			pipeline.cullMode = "none";
			pipeline.depthBias = 0;
			pipeline.depthBiasSlopeScale = 0;
			pipeline.depthBiasClamp = 0;
		} else {
			const bias = light;
			pipeline.depthBias = bias?.depthBias ?? 1;
			pipeline.depthBiasSlopeScale = bias?.depthBiasSlopeScale ?? 2;
			pipeline.depthBiasClamp = bias?.depthBiasClamp ?? 0;
		}
		return pipeline;
	},
	getPrePassPipeline(entity, normalOutput, multisampled, material) {
		if (entity._geometry.attributes.normal) material.defines.add("USE_NORMALS");
		if (normalOutput) material.defines.add("USE_NORMAL_OUTPUT");
		material.defines.add("USE_DEPTH_PRE_PASS");
		const alphaToCoverage = multisampled && normalOutput && material.defines.has("USE_ALPHA_CUTOFF");
		if (alphaToCoverage) material.defines.add("USE_ALPHA_TO_COVERAGE");
		const pipeline = this.getDepthPassPipeline("prePass", entity, this.prePassPipelineCache, material);
		pipeline.alphaToCoverage = alphaToCoverage;
		pipeline.depthCompare = "less-equal";
		return pipeline;
	},
	/**
	* Depth (and optionally view-space normal) ahead of shading.
	*
	* Draws exactly what the opaque pass will, so the depth it leaves behind is
	* what that pass tests against — anything drawn here and not there would
	* occlude geometry that should be visible. Alpha-tested materials included:
	* the shader recomputes the same opacity and discards on the same threshold.
	*/
	renderPrePass(renderView, entities, options = {}) {
		const normalOutput = !!options.outputs?.normal;
		const multisampled = !!options.multisampled;
		const frameIndex = options.frameIndex ?? NaN;
		const uFrame = this.getFrameUniforms(renderView);
		const skipAlphaTested = multisampled && !normalOutput;
		const drawable = entities.filter((e) => isStandardMesh(e) && !e.material.transmission && !e.material.blend && e.material.depthWriteEnabled !== false && (!skipAlphaTested || e.material.alphaCutoff === void 0));
		for (let i = 0; i < drawable.length; i++) {
			const entity = drawable[i];
			const material = this.getDepthPassMaterial(entity);
			submit(ctx, {
				label: "drawPrePassGeometryCmd",
				pipeline: this.getPrePassPipeline(entity, normalOutput, multisampled, material),
				attributes: entity._geometry.attributes,
				indices: entity._geometry.indices,
				count: entity._geometry.count,
				instanceCount: entity._geometry.instanceCount,
				uniforms: {
					uFrame,
					...this.getModelUniforms(entity, getViewNormalMatrix(uFrame.viewMatrix, entity._transform.modelMatrix), { skin: material.defines.has("USE_SKIN") }),
					...material.uniforms,
					...this.getHookUniforms(entity, frameIndex, this.materialSampler)
				}
			});
		}
	},
	renderShadow(renderView, entities, options = {}) {
		const light = options.shadowMappingLight;
		const shadow = options.lightShadow;
		const linear = !!shadow?.cubemap;
		const frameIndex = options.frameIndex ?? NaN;
		const uFrame = {
			...this.getFrameUniforms(renderView),
			cameraPosition: [
				0,
				0,
				0
			],
			...linear && { far: shadow.far }
		};
		const casters = entities.filter((e) => isStandardMesh(e) && e.material.castShadows);
		for (let i = 0; i < casters.length; i++) {
			const entity = casters[i];
			const material = this.getDepthPassMaterial(entity);
			submit(ctx, {
				label: "drawShadowGeometryCmd",
				pipeline: this.getDepthPipeline(entity, linear, light, material),
				attributes: entity._geometry.attributes,
				indices: entity._geometry.indices,
				count: entity._geometry.count,
				instanceCount: entity._geometry.instanceCount,
				uniforms: {
					uFrame,
					...this.getModelUniforms(entity, fromMat4$1(NORMAL_MATRIX, entity._transform.modelMatrix), { skin: material.defines.has("USE_SKIN") }),
					...material.uniforms,
					...this.getHookUniforms(entity, frameIndex, this.materialSampler)
				}
			});
		}
	},
	dispose() {
		this.dummyWhiteTexture.dispose();
		this.dummyTexture2D.dispose();
		this.dummyTextureCube.dispose();
		this.dummyCaptureTexture.dispose();
		this.ltcTextures.ltc_1?.dispose();
		this.ltcTextures.ltc_2?.dispose();
		this.ltcTextures.ltc_1 = null;
		this.ltcTextures.ltc_2 = null;
		this.isLoadingAreaLightData = null;
		this.pipelineCache.clear();
		this.depthPipelineCache.clear();
		this.prePassPipelineCache.clear();
	}
});

var skybox_exports = /* @__PURE__ */ __exportAll({ skyboxShader: () => skyboxShader });
const skyboxShader = (defines = /* @__PURE__ */ new Set(), options = {}) => {
	const hooks = options.hooks || {};
	const outputs = options.outputs ?? {};
	const useMSAA = defines.has("USE_MSAA");
	const useBackgroundBlur = defines.has("USE_BACKGROUND_BLUR");
	return `
struct Skybox {
  projectionMatrix: mat4x4f,
  viewMatrix: mat4x4f,
  rotation: mat3x3f,
  luminanceScale: f32,
  // The view's, separate from the environment's calibration: the blur path
  // reads a cubemap that already carries that calibration but knows nothing of
  // the camera, so this one applies to both paths.
  cameraExposure: f32,
  backgroundBlur: f32,
  jitter: vec2f,
  previousViewProjectionMatrix: mat4x4f,
}
@group(0) @binding(0) var<uniform> uSkybox: Skybox;
@group(0) @binding(1) var uEnvMap: texture_2d<f32>;
@group(0) @binding(2) var uEnvMapSampler: sampler;
${useBackgroundBlur ? textureSamplerDeclaration(0, {
		texture: 3,
		sampler: 4
	}, "uSpecularEnvMap", "texture_cube<f32>") : ""}
${useBackgroundBlur ? `override ROUGHNESS_LEVELS: f32 = ${6}.0;` : ""}

struct VertexInput {
  @location(0) position: vec2f,
}

${vertexOutputStruct([{
		name: "normal",
		type: "vec3f"
	}, ...outputs.velocity ? VELOCITY_MEMBERS : []])}

${fragmentOutputStruct(sceneOutputMembers(outputs))}

// Vertex includes
${inverseMat4}

${hooks.vertDeclarationsEnd ?? ""}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;

  let inverseProjection = inverseMat4(uSkybox.projectionMatrix);
  let inverseModelView = transpose(mat3x3f(
    uSkybox.viewMatrix[0].xyz,
    uSkybox.viewMatrix[1].xyz,
    uSkybox.viewMatrix[2].xyz,
  ));
  // Geometry jittered by d appears at proj(world) + d, so the fragment at
  // clip position p sees the direction that was at p - d.
  let unprojected = (inverseProjection * vec4f(input.position - uSkybox.jitter, 0.0, 1.0)).xyz;
  output.normal = inverseModelView * unprojected;

  // z = 1.0 sits at the ZO far plane so geometry (depthCompare less-equal) wins.
  output.position = vec4f(input.position, 1.0, 1.0);

  ${outputs.velocity ? `// The sky is at infinity, so it has no position to reproject — only a
  // direction, which w = 0 carries through the previous view-projection to
  // that direction's vanishing point. Camera translation correctly drops out;
  // rotation does not.
  output.positionClip = vec4f(input.position - uSkybox.jitter, 1.0, 1.0);
  output.previousPositionClip = uSkybox.previousViewProjectionMatrix * vec4f(output.normal, 0.0);` : ""}

  ${hooks.vertEnd ?? ""}

  return output;
}

// Fragment includes
${PI}
${TWO_PI}
${max3}
${env_map_equirect_default}
${reversible_tone_map_default}

${hooks.fragDeclarationsEnd ?? ""}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  var output: FragmentOutput;

  // uSkybox.rotation matches standard.ts's material IBL sampling of the same
  // entity transform, so background and reflections rotate together.
  let N = uSkybox.rotation * normalize(input.normal);
  ${useBackgroundBlur ? `let lod = uSkybox.backgroundBlur * (ROUGHNESS_LEVELS - 1.0);
  var color = textureSampleLevel(uSpecularEnvMap, uSpecularEnvMapSampler, N, lod);` : `var color = textureSample(uEnvMap, uEnvMapSampler, envMapEquirect(N));
  color = vec4f(color.rgb * uSkybox.luminanceScale, color.a);`}

  color = vec4f(color.rgb * uSkybox.cameraExposure, color.a);

  ${useMSAA ? "color = vec4f(reversibleToneMap(color.xyz), color.w);" : ""}

  output.color = color;

  ${outputs.normal ? "output.normal = vec4f(0.0, 0.0, 1.0, 1.0);" : ""}
  ${outputs.emissive ? "output.emissive = vec4f(0.0);" : ""}
  ${outputs.velocity ? FRAGMENT_VELOCITY : ""}
  ${outputs.responsive ? "output.responsive = vec4f(0.0);" : ""}

  ${hooks.fragEnd ?? ""}

  return output;
}
`;
};

const IDENTITY_MAT3 = create$3();
const IDENTITY_MAT4 = create$1();
/**
* Skybox renderer
*
* Draws an equirectangular environment map (a baked analytic sky or a user
* envMap) as the scene background, built on the `skybox` WGSL generator. A
* single `@group(0)` holds the uSkybox uniforms plus the env map and its
* sampler.
*
* The skybox entity's own transform drives environment rotation for both the
* background (equirect or, with backgroundBlur, the paired reflectionProbe's
* cubemap) and material IBL — see utils.js's getEnvironmentRotation, applied
* the same way in systems/reflection-probe.ts.
*
* `skybox.backgroundBlur` (0-1) is sampled from the paired reflectionProbe
* entity's prefiltered specular cubemap instead of a dedicated blur pass — the
* same source `standard.ts` uses for material reflections.
*/
var skybox_default$1 = ({ ctx }) => ({
	...base_default(),
	type: "skybox-renderer",
	debug: false,
	sampler: createSampler(ctx, { filter: "linear" }),
	_warnedBackgroundBlur: /* @__PURE__ */ new Set(),
	getShader: (defines, options) => skyboxShader(defines, options),
	getShaderOptions(_entity, options) {
		return { outputs: options.outputs };
	},
	getDefines(entity, options) {
		const defines = /* @__PURE__ */ new Set();
		if (options.msaa) defines.add("USE_MSAA");
		if (this.useBackgroundBlur(entity, options)) defines.add("USE_BACKGROUND_BLUR");
		return defines;
	},
	getVariantKey(_entity, defines, options) {
		return `${definesKey(defines)}|${outputsKey(options.outputs)}`;
	},
	getPipelineOptions(entity, options) {
		return {
			depthWriteEnabled: false,
			depthCompare: "less-equal",
			cullMode: "none",
			...this.useBackgroundBlur(entity, options) ? { constants: { ROUGHNESS_LEVELS: options.reflectionProbe.roughnessLevels } } : {}
		};
	},
	/**
	* `backgroundBlur` reads the paired probe's prefiltered cubemap, so it can
	* only apply where the view has one.
	*/
	useBackgroundBlur(entity, options) {
		return !!options.reflectionProbe && (entity.skybox.backgroundBlur ?? 0) > 0;
	},
	checkSkybox(skybox) {
		if (getSkyboxEnvMap(skybox)) return true;
		console.warn(NAMESPACE, this.type, `skybox component missing texture. Provide an "envMap" or add a skyboxSystem.update(world.entities).`);
	},
	render(renderView, entity, options) {
		if (!this.checkSkybox(entity.skybox)) return;
		const { camera } = renderView;
		const skybox = entity.skybox;
		const texture = getSkyboxEnvMap(skybox);
		const backgroundBlur = skybox.backgroundBlur ?? 0;
		const useBackgroundBlur = this.useBackgroundBlur(entity, options);
		if (backgroundBlur > 0 && !options.reflectionProbe && !this._warnedBackgroundBlur.has(entity.id)) {
			this._warnedBackgroundBlur.add(entity.id);
			console.warn(NAMESPACE, this.type, "skybox.backgroundBlur requires a paired reflectionProbe entity; rendering unblurred.", entity);
		}
		const pipeline = this.getPipeline(entity, options);
		submit(ctx, {
			label: "drawSkyboxCmd",
			pipeline,
			...fullscreen_geometry_default(ctx).triangle,
			uniforms: {
				uSkybox: {
					projectionMatrix: camera.projectionMatrix,
					viewMatrix: camera.viewMatrix,
					rotation: getEnvironmentRotation(TEMP_MAT3, entity._transform?.modelMatrix) ?? IDENTITY_MAT3,
					luminanceScale: skybox._luminanceScale ?? 1,
					cameraExposure: camera._exposure ?? 1,
					backgroundBlur,
					jitter: camera._jitter ?? NO_JITTER,
					previousViewProjectionMatrix: camera._previousViewProjectionMatrix ?? IDENTITY_MAT4
				},
				uEnvMap: texture,
				uEnvMapSampler: this.sampler,
				...useBackgroundBlur && {
					uSpecularEnvMap: options.reflectionProbe.specularTexture,
					uSpecularEnvMapSampler: options.reflectionProbe.sampler
				}
			}
		});
	},
	renderBackground(renderView, entities, options = {}) {
		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i];
			if (entity.skybox && (entity.skybox.sunPosition || entity.skybox.envMap)) this.render(renderView, entity, options);
		}
	}
});

var renderer_exports = /* @__PURE__ */ __exportAll({
	base: () => base_default,
	basic: () => basic_default,
	line: () => line_default,
	skybox: () => skybox_default$1,
	standard: () => standard_default
});

var systems_exports = /* @__PURE__ */ __exportAll({
	animation: () => animation_default$1,
	camera: () => camera_default$1,
	geometry: () => geometry_default$1,
	helper: () => helper_default,
	layer: () => layer_default,
	light: () => light_default,
	morph: () => morph_default$1,
	reflectionProbe: () => reflection_probe_default$1,
	renderPipeline: () => render_pipeline_default,
	renderer: () => renderer_exports,
	skin: () => skin_default$1,
	skybox: () => skybox_default$2,
	transform: () => transform_default$1
});

const isResourceHandle = (value) => typeof value === "object" && value !== null && value.__frameGraphResource === true;

/**
* Declaration helpers: record resources and the edges between them into a
* {@link GraphState}. {@link FrameGraph} holds the API that calls them.
*
* Handles identify a resource, not a version of it — reads bind to the latest
* write declared before them. Versioning lives in the edges recorded here.
*/
const createHandle = (index, name) => Object.freeze({
	__frameGraphResource: true,
	index,
	name
});
const addResource = (state, name, kind, descriptor, imported) => {
	const index = state.resources.length;
	const handle = createHandle(index, name);
	const entry = {
		index,
		name,
		kind,
		descriptor,
		handle,
		exported: false,
		usage: 0,
		lastWriter: -1,
		currentReaders: [],
		refCount: 0
	};
	if (imported) {
		entry.imported = imported;
		entry.exported = true;
		entry.refCount = 1;
	}
	state.resources.push(entry);
	return handle;
};
/** Handle-valued entries in a uniform bag are read edges. */
const collectUniformReads = (uniforms, into) => {
	if (!uniforms) return;
	for (const value of Object.values(uniforms)) if (isResourceHandle(value)) into.push(value);
};
const readResource = (state, pass, handle, usage) => {
	const resource = state.resources[handle.index];
	if (!resource) throw new Error(`${NAMESPACE}: unknown resource handle`);
	if (pass.reads.includes(handle.index)) return;
	resource.usage |= usage;
	resource.refCount++;
	resource.currentReaders.push(pass.index);
	pass.reads.push(handle.index);
	if (resource.lastWriter >= 0) pass.dependencies.add(resource.lastWriter);
};
const writeResource = (state, pass, handle, usage, site) => {
	const resource = state.resources[handle.index];
	if (!resource) throw new Error(`${NAMESPACE}: unknown resource handle`);
	if (pass.reads.includes(handle.index)) throw new Error(`${NAMESPACE}: pass "${pass.name}" both reads and writes "${resource.name}". WebGPU forbids sampling a texture that is an attachment of the same pass; use a separate target.`);
	resource.usage |= usage;
	for (const reader of resource.currentReaders) pass.dependencies.add(reader);
	if (resource.lastWriter >= 0) pass.dependencies.add(resource.lastWriter);
	resource.lastWriter = pass.index;
	resource.currentReaders = [];
	pass.writes.push({
		resource: handle.index,
		layer: site.layer ?? 0,
		level: site.level ?? 0,
		...site.resolveTarget && { resolveTarget: site.resolveTarget.index }
	});
};

/**
* Physical resource allocator behind the graph's virtual resources. Acquire and
* release follow compiled lifetimes rather than call order, so a target freed
* at pass 3 can serve a different resource at pass 4.
*/
var ResourcePool = class ResourcePool {
	/**
	* Frames a pooled resource may sit unused before it is disposed. High enough
	* that toggling an effect or resizing doesn't pay for reallocation.
	*/
	static IDLE_FRAMES_BEFORE_EVICTION = 30;
	/**
	* Every parameter that must match for two textures to be substitutable,
	* `usage` included: a sampled target needs TEXTURE_BINDING, and a
	* render-attachment-only texture would fail validation at bind time.
	*/
	static textureKey(descriptor, usage, mipLevelCount) {
		return `${descriptor.format ?? "rgba8unorm"}|${descriptor.width}x${descriptor.height}x${descriptor.depth ?? 1}|s${descriptor.sampleCount ?? 1}|m${mipLevelCount}|${descriptor.viewDimension ?? "2d"}|u${usage}`;
	}
	/** What makes two requests the same upload. */
	static bufferKey(descriptor) {
		const size = descriptor.size ?? (ArrayBuffer.isView(descriptor.data) ? descriptor.data.byteLength : 0);
		return `${descriptor.usage}|${descriptor.label ?? ""}|${size}`;
	}
	/** Levels a descriptor asks for. Static: compile budgets memory with it. */
	static resolveMipLevelCount(descriptor) {
		return descriptor.mipLevelCount ?? (descriptor.mipmap ? fullMipLevelCount(descriptor.width, descriptor.height) : 1);
	}
	ctx;
	/** Free lists of interchangeable textures, keyed by shape and usage. */
	buckets = /* @__PURE__ */ new Map();
	/** Which bucket a handed-out texture came from, so release is O(1). */
	checkedOut = /* @__PURE__ */ new Map();
	/**
	* Content-addressed rather than pooled: graph uploads are immutable and tiny
	* next to render targets.
	*/
	bufferCache = /* @__PURE__ */ new Map();
	/** Keyed by resource name: persistent textures are never substitutable. */
	persistent = /* @__PURE__ */ new Map();
	liveBytes = 0;
	peakBytes = 0;
	/** Never reclaimed, so tracked apart from the pooled total. */
	persistentBytes = 0;
	constructor(ctx) {
		this.ctx = ctx;
	}
	/** The only method that creates a texture; the rest hand out existing ones. */
	allocate(descriptor, usage, mipLevelCount) {
		const options = { ...descriptor };
		delete options.persistent;
		delete options.mipmap;
		return createTexture(this.ctx, {
			label: "frame-graph texture",
			...options,
			format: options.format ?? "rgba8unorm",
			...mipLevelCount > 1 && { mipLevelCount },
			usage
		});
	}
	acquireTexture(descriptor, usage) {
		const mipLevelCount = ResourcePool.resolveMipLevelCount(descriptor);
		const key = ResourcePool.textureKey(descriptor, usage, mipLevelCount);
		let pooled = this.buckets.get(key)?.pop();
		if (!pooled) {
			const texture = this.allocate(descriptor, usage, mipLevelCount);
			pooled = {
				texture,
				bytes: textureByteSize(texture),
				idleFrames: 0
			};
		}
		pooled.idleFrames = 0;
		if (descriptor.label) pooled.texture.texture.label = descriptor.label;
		this.checkedOut.set(pooled.texture, {
			key,
			bytes: pooled.bytes
		});
		this.liveBytes += pooled.bytes;
		if (this.liveBytes > this.peakBytes) this.peakBytes = this.liveBytes;
		return pooled.texture;
	}
	/**
	* Dedicated texture for `name`, kept across frames and never recycled.
	* Reallocated only if the shape it was created with changes, or if a frame
	* needs it for something the existing one was not created to do.
	*
	* Usage accumulates across frames rather than being taken from the frame in
	* hand, because that is the difference between a persistent resource and a
	* pooled one: its contents have to survive, so it cannot be reallocated
	* merely because this frame uses it differently. A ping-pong pair is exactly
	* that case — each half alternates between being written and only being read
	* — and taking one frame's usage would discard both halves every frame,
	* leaving the reader nothing but a freshly zeroed texture.
	*/
	acquirePersistentTexture(name, descriptor, usage) {
		const mipLevelCount = ResourcePool.resolveMipLevelCount(descriptor);
		const existing = this.persistent.get(name);
		const combined = (existing?.usage ?? 0) | usage;
		const key = ResourcePool.textureKey(descriptor, combined, mipLevelCount);
		if (existing) {
			if (existing.key === key) return existing.texture;
			existing.texture.dispose();
			this.persistentBytes -= existing.bytes;
		}
		const texture = this.allocate(descriptor, combined, mipLevelCount);
		const bytes = textureByteSize(texture);
		this.persistentBytes += bytes;
		this.persistent.set(name, {
			texture,
			key,
			bytes,
			usage: combined
		});
		return texture;
	}
	releaseTexture(texture) {
		const entry = this.checkedOut.get(texture);
		if (!entry) return;
		this.checkedOut.delete(texture);
		this.liveBytes -= entry.bytes;
		this.buckets.getOrInsertComputed(entry.key, () => []).push({
			texture,
			bytes: entry.bytes,
			idleFrames: 0
		});
	}
	acquireBuffer(descriptor) {
		return this.bufferCache.getOrInsertComputed(ResourcePool.bufferKey(descriptor), () => createBuffer(this.ctx, {
			label: "frame-graph buffer",
			...descriptor
		}));
	}
	endFrame() {
		for (const [key, bucket] of this.buckets) {
			for (let i = bucket.length - 1; i >= 0; i--) {
				const pooled = bucket[i];
				if (++pooled.idleFrames > ResourcePool.IDLE_FRAMES_BEFORE_EVICTION) {
					pooled.texture.dispose();
					bucket.splice(i, 1);
				}
			}
			if (!bucket.length) this.buckets.delete(key);
		}
	}
	stats() {
		let idleBytes = 0;
		let textureCount = this.checkedOut.size + this.persistent.size;
		for (const bucket of this.buckets.values()) {
			textureCount += bucket.length;
			for (const pooled of bucket) idleBytes += pooled.bytes;
		}
		return {
			liveBytes: this.liveBytes + this.persistentBytes,
			idleBytes,
			peakBytes: this.peakBytes,
			textureCount,
			bucketCount: this.buckets.size
		};
	}
	dispose() {
		for (const bucket of this.buckets.values()) for (const pooled of bucket) pooled.texture.dispose();
		for (const texture of this.checkedOut.keys()) texture.dispose();
		for (const { texture } of this.persistent.values()) texture.dispose();
		for (const buffer of this.bufferCache.values()) buffer.dispose();
		this.buckets.clear();
		this.checkedOut.clear();
		this.persistent.clear();
		this.bufferCache.clear();
		this.liveBytes = 0;
		this.persistentBytes = 0;
	}
};

/** Memoryless attachments, Chrome 146+. Undefined where unsupported. */
const TRANSIENT_ATTACHMENT = GPUTextureUsage.TRANSIENT_ATTACHMENT;
/** Attachments are tracked per layer and mip: cube faces are independent chains. */
const siteKey = (site) => `${site.resource}:${site.layer}:${site.level}`;
const attachmentsMatch = (a, b) => {
	if (a.color.length !== b.color.length) return false;
	for (let i = 0; i < a.color.length; i++) {
		const left = a.color[i];
		const right = b.color[i];
		if (left.texture.index !== right.texture.index || (left.layer ?? 0) !== (right.layer ?? 0) || (left.level ?? 0) !== (right.level ?? 0) || left.resolveTarget?.index !== right.resolveTarget?.index) return false;
	}
	if (Boolean(a.depth) !== Boolean(b.depth)) return false;
	if (a.depth && b.depth && (a.depth.texture.index !== b.depth.texture.index || (a.depth.layer ?? 0) !== (b.depth.layer ?? 0))) return false;
	return true;
};
/**
* Same attachments and no data flowing between them: one render pass. WebGPU
* has no subpasses, so merging is the only way to avoid a tile store/reload.
*/
const canMerge = (previous, next) => {
	if (previous.type !== "render" || next.type !== "render") return false;
	if (next.color.some((attachment) => attachment.clearValue !== void 0)) return false;
	if (next.depth?.depthClearValue !== void 0) return false;
	if (!attachmentsMatch(previous, next)) return false;
	const previousWrites = new Set(previous.writes.map((write) => write.resource));
	return next.reads.every((resource) => !previousWrites.has(resource));
};
/**
* Turn the declared graph into an execution plan: cull, merge, derive
* load/store ops and usage flags, then hand out physical resources by
* lifetime.
*
* Declaration order is preserved: setup is sequential, so every dependency
* already points backwards and no topological sort is needed.
*/
function compile(state, pool, options = {}) {
	const { passes, resources } = state;
	const writersByResource = resources.map(() => []);
	for (const pass of passes) {
		const written = /* @__PURE__ */ new Set();
		for (const write of pass.writes) written.add(write.resource);
		pass.refCount = written.size;
		for (const resource of written) writersByResource[resource].push(pass.index);
	}
	const stack = [];
	for (const resource of resources) if (resource.refCount === 0) stack.push(resource.index);
	while (stack.length) {
		const resource = resources[stack.pop()];
		for (const writerIndex of writersByResource[resource.index]) {
			const writer = passes[writerIndex];
			if (writer.neverCull) continue;
			if (--writer.refCount === 0) for (const read of writer.reads) {
				const readResource = resources[read];
				if (--readResource.refCount === 0) stack.push(read);
			}
		}
	}
	const live = [];
	const culledPasses = [];
	for (const pass of passes) {
		pass.culled = pass.refCount === 0 && !pass.neverCull;
		if (pass.culled) culledPasses.push({
			name: pass.name,
			writes: [...new Set(pass.writes.map((write) => resources[write.resource]?.name ?? `resource${write.resource}`))]
		});
		else live.push(pass);
	}
	const groups = [];
	for (const pass of live) {
		const previousGroup = groups.at(-1);
		if (previousGroup && canMerge(previousGroup.at(-1), pass)) previousGroup.push(pass);
		else groups.push([pass]);
	}
	const records = resources.map((entry) => ({
		entry,
		firstUse: -1,
		lastUse: -1,
		bytes: isTextureDescriptor(entry.descriptor) ? textureByteSize({
			...entry.descriptor,
			mipLevelCount: ResourcePool.resolveMipLevelCount(entry.descriptor)
		}) : 0,
		transient: false,
		usage: entry.usage | (entry.exported && entry.kind === "texture" ? GPUTextureUsage.TEXTURE_BINDING : 0),
		...entry.imported && { physical: entry.imported }
	}));
	const touch = (resource, group) => {
		const record = records[resource];
		if (record.firstUse === -1) record.firstUse = group;
		record.lastUse = group;
	};
	for (let group = 0; group < groups.length; group++) for (const pass of groups[group]) {
		for (const read of pass.reads) touch(read, group);
		for (const write of pass.writes) touch(write.resource, group);
	}
	const writtenBefore = /* @__PURE__ */ new Set();
	const groupAttachments = [];
	for (let group = 0; group < groups.length; group++) {
		const head = groups[group][0];
		const color = [];
		const buildAttachment = (texture, layer, level, cleared, resolveTarget) => {
			const record = records[texture.index];
			const { entry } = record;
			const key = siteKey({
				resource: texture.index,
				layer,
				level
			});
			const loadOp = cleared ? "clear" : writtenBefore.has(key) || entry.imported ? "load" : "clear";
			const storeOp = entry.exported || entry.imported || record.lastUse > group ? "store" : "discard";
			writtenBefore.add(key);
			return {
				handle: entry.handle,
				...layer !== 0 && { layer },
				...level !== 0 && { level },
				...resolveTarget && { resolveTarget: records[resolveTarget.index].entry.handle },
				loadOp,
				storeOp
			};
		};
		for (const attachment of head.color) color.push({
			...buildAttachment(attachment.texture, attachment.layer ?? 0, attachment.level ?? 0, attachment.clearValue !== void 0, attachment.resolveTarget),
			...attachment.clearValue !== void 0 && { clearValue: attachment.clearValue }
		});
		const depth = head.depth ? {
			...buildAttachment(head.depth.texture, head.depth.layer ?? 0, 0, head.depth.depthClearValue !== void 0),
			...head.depth.depthClearValue !== void 0 && { depthClearValue: head.depth.depthClearValue },
			...head.depth.stencilClearValue !== void 0 && { stencilClearValue: head.depth.stencilClearValue }
		} : void 0;
		groupAttachments.push({
			color,
			...depth && { depth }
		});
	}
	const compiledResources = [];
	let liveBytes = 0;
	let peakBytes = 0;
	let naiveBytes = 0;
	const acquireAt = groups.map(() => []);
	const releaseAfter = groups.map(() => []);
	for (const record of records) {
		if (record.firstUse === -1) continue;
		acquireAt[record.firstUse].push(record);
		releaseAfter[record.lastUse].push(record);
	}
	if (TRANSIENT_ATTACHMENT !== void 0 && options.transientAttachments) for (const record of records) {
		const { entry } = record;
		record.transient = record.firstUse !== -1 && !entry.imported && !entry.exported && entry.usage === GPUTextureUsage.RENDER_ATTACHMENT && record.firstUse === record.lastUse;
		if (record.transient) record.usage |= TRANSIENT_ATTACHMENT;
	}
	for (let group = 0; group < groups.length; group++) {
		for (const record of acquireAt[group]) {
			const { entry } = record;
			if (entry.imported) continue;
			const { descriptor } = entry;
			if (!isTextureDescriptor(descriptor)) {
				record.physical = pool.acquireBuffer(descriptor);
				continue;
			}
			record.physical = entry.persistent ? pool.acquirePersistentTexture(entry.name, descriptor, record.usage) : pool.acquireTexture(descriptor, record.usage);
			liveBytes += record.bytes;
			if (liveBytes > peakBytes) peakBytes = liveBytes;
		}
		for (const record of releaseAfter[group]) {
			const { entry } = record;
			if (entry.imported || entry.kind === "buffer") continue;
			if (entry.exported || entry.persistent) continue;
			pool.releaseTexture(record.physical);
			liveBytes -= record.bytes;
		}
	}
	for (const record of records) {
		const { entry } = record;
		if (!entry.exported || entry.persistent || entry.imported || entry.kind === "buffer" || !record.physical) continue;
		pool.releaseTexture(record.physical);
		liveBytes -= record.bytes;
	}
	for (const record of records) {
		const { entry } = record;
		const used = record.firstUse !== -1;
		if (used && !entry.imported) naiveBytes += record.bytes;
		compiledResources.push({
			index: entry.index,
			name: entry.name,
			kind: entry.kind,
			imported: !!entry.imported,
			descriptor: entry.descriptor,
			usage: record.usage,
			transient: record.transient,
			persistent: !!entry.persistent,
			culled: !used,
			firstUse: record.firstUse,
			lastUse: record.lastUse,
			bytes: record.bytes,
			...record.physical && { physicalId: record.physical.id }
		});
	}
	const compiledPasses = groups.map((group, index) => {
		const head = group[0];
		const attachments = groupAttachments[index];
		const reads = /* @__PURE__ */ new Set();
		const writes = /* @__PURE__ */ new Set();
		for (const pass of group) {
			for (const read of pass.reads) reads.add(read);
			for (const write of pass.writes) writes.add(write.resource);
		}
		const first = head.color[0] ?? head.depth;
		const target = first ? records[first.texture.index].entry.descriptor : void 0;
		const level = (first && "level" in first ? first.level : 0) ?? 0;
		const viewport = target && isTextureDescriptor(target) ? [
			0,
			0,
			Math.max(1, target.width >> level),
			Math.max(1, target.height >> level)
		] : [
			0,
			0,
			0,
			0
		];
		return {
			name: head.name,
			label: group.map((pass) => pass.name).join(" + "),
			type: head.type,
			color: attachments.color,
			...attachments.depth && { depth: attachments.depth },
			subPasses: group.map((pass) => ({
				name: pass.name,
				execute: pass.execute,
				declarationIndex: pass.index
			})),
			reads: [...reads],
			writes: [...writes],
			...head.renderView && { renderView: head.renderView },
			viewport
		};
	});
	if (options.debug && culledPasses.length) console.debug(NAMESPACE, "frame-graph", `culled ${culledPasses.length} pass(es):`, culledPasses.map(({ name, writes }) => `${name} (nothing reads ${writes.join(", ")})`).join("; "));
	return {
		passes: compiledPasses,
		resources: compiledResources,
		physical: records.map((record) => record.physical),
		culledPasses,
		stats: {
			declaredPasses: passes.length,
			culledPasses: culledPasses.length,
			mergedPasses: live.length - groups.length,
			peakBytes,
			naiveBytes
		}
	};
}

const RESOLVE_HINT = "Capture the handle in setup and resolve it inside a pass's execute.";
/**
* Sub-resource views, keyed on the raw `GPUTexture` so entries are collected
* with it. Caching is a correctness requirement, not an optimisation: pex-gpu
* keys bind groups by view identity and can only prune them through the
* `GpuTexture` wrapper, so a view built per frame leaks a bind group per
* frame.
*/
const viewCache = /* @__PURE__ */ new WeakMap();
/** Every field that makes two views of one texture interchangeable. */
const viewKey = (descriptor) => `${descriptor.dimension ?? ""}|${descriptor.baseMipLevel ?? 0}|${descriptor.mipLevelCount ?? 0}|${descriptor.baseArrayLayer ?? 0}|${descriptor.arrayLayerCount ?? 0}`;
function textureView(texture, descriptor) {
	return viewCache.getOrInsertComputed(texture.texture, () => /* @__PURE__ */ new Map()).getOrInsertComputed(viewKey(descriptor), () => texture.texture.createView(descriptor));
}
/**
* View dimensions whose default view spans several layers, so an attachment
* into one of them has to name it. `1d` and `3d` are absent deliberately: a 1d
* texture cannot carry `RENDER_ATTACHMENT` at all, and a 3d one selects a slice
* through the attachment's `depthSlice` rather than a view — neither is
* something a single-layer 2D view could stand in for.
*/
const LAYERED_VIEW_DIMENSIONS = /* @__PURE__ */ new Set([
	"2d-array",
	"cube",
	"cube-array"
]);
/**
* Attachments must target exactly one mip level and one array layer, and a
* default view spans all of them. So the texture's shape decides whether an
* explicit view is needed, not whether a sub-resource was asked for: a cube
* needs one even for layer 0.
*
* Layer count alone doesn't answer it. A one-layer array texture — a shadow
* bucket holding a single light — still defaults to a `2d-array` view, which an
* attachment rejects, so the declared view dimension decides too.
*/
function attachmentView(texture, layer, level) {
	const layered = texture.depthOrArrayLayers > 1 || LAYERED_VIEW_DIMENSIONS.has(texture.viewDimension ?? "2d");
	if (!layered && texture.mipLevelCount === 1) return void 0;
	return textureView(texture, {
		...layered && {
			dimension: "2d",
			baseArrayLayer: layer ?? 0,
			arrayLayerCount: 1
		},
		baseMipLevel: level ?? 0,
		mipLevelCount: 1
	});
}
const physical = (plan, handle) => {
	const resource = plan.physical[handle.index];
	if (!resource) throw new Error(`${NAMESPACE}: "${handle.name}" has no physical resource. It was culled, or it belongs to a different frame's plan.`);
	return resource;
};
/** Attachments are always textures. */
const physicalTexture = (plan, handle) => physical(plan, handle);
const buildColorAttachment = (plan, attachment) => {
	const texture = physicalTexture(plan, attachment.handle);
	const view = attachmentView(texture, attachment.layer, attachment.level);
	return {
		texture,
		...view && { view },
		...attachment.resolveTarget && { resolveTarget: physicalTexture(plan, attachment.resolveTarget) },
		...attachment.clearValue !== void 0 && { clearValue: attachment.clearValue },
		loadOp: attachment.loadOp,
		storeOp: attachment.storeOp
	};
};
const buildDepthAttachment = (plan, depth) => {
	const texture = physicalTexture(plan, depth.handle);
	const view = attachmentView(texture, depth.layer);
	return {
		texture,
		...view && { view },
		depthLoadOp: depth.loadOp,
		depthStoreOp: depth.storeOp,
		...depth.depthClearValue !== void 0 && { depthClearValue: depth.depthClearValue },
		...depth.stencilClearValue !== void 0 && { stencilClearValue: depth.stencilClearValue }
	};
};
const buildPassDescriptor = (plan, pass) => {
	return {
		...!(pass.color.length === 0 && !pass.depth) && { colorAttachments: pass.color.map((attachment) => buildColorAttachment(plan, attachment)) },
		...pass.depth && { depthStencilAttachment: buildDepthAttachment(plan, pass.depth) }
	};
};
/** Swap handle-valued entries for their physical resources. */
const resolveUniforms = (uniforms, resolve) => {
	if (!uniforms) return {};
	const resolved = {};
	for (const [key, value] of Object.entries(uniforms)) resolved[key] = isResourceHandle(value) ? resolve(value) : value;
	return resolved;
};
function execute(ctx, state, plan, reportedErrors, profiler) {
	const resolve = (handle) => {
		requirePhase(state, "executing", `resolving "${handle.name}"`, RESOLVE_HINT);
		return physical(plan, handle);
	};
	const resolveTexture = (handle) => resolve(handle);
	const resolveBuffer = (handle) => resolve(handle);
	const resolveView = (handle, { level, levelCount, layer, layerCount, dimension } = {}) => textureView(resolveTexture(handle), {
		...dimension && { dimension },
		baseMipLevel: level ?? 0,
		mipLevelCount: levelCount ?? 1,
		baseArrayLayer: layer ?? 0,
		...layerCount !== void 0 && { arrayLayerCount: layerCount }
	});
	const runSubPasses = (pass, extra) => {
		state.phase = "executing";
		try {
			for (const subPass of pass.subPasses) {
				const declaration = state.passes[subPass.declarationIndex];
				const context = {
					ctx,
					resolveTexture,
					resolveBuffer,
					resolveView,
					uniforms: resolveUniforms(declaration.uniforms, resolve),
					...declaration.renderView && { renderView: declaration.renderView },
					viewport: pass.viewport,
					...extra
				};
				try {
					subPass.execute(context);
				} catch (error) {
					const err = error instanceof Error ? error : new Error(String(error));
					if (!reportedErrors.has(err.message)) {
						reportedErrors.add(err.message);
						console.error(NAMESPACE, "frame-graph", `pass "${subPass.name}" crashed.`, err);
					}
				}
			}
		} finally {
			state.phase = "compiled";
		}
	};
	for (const [index, pass] of plan.passes.entries()) {
		if (pass.type === "raw") {
			runSubPasses(pass, { encoder: frameState(ctx).encoder });
			continue;
		}
		if (pass.type === "compute") {
			const computeWrites = profiler?.writesFor(index, pass.label);
			runSubPasses(pass, { ...computeWrites && { timestampWrites: computeWrites } });
			continue;
		}
		const timestampWrites = profiler?.writesFor(index, pass.label);
		const command = {
			label: pass.label,
			pass: {
				...buildPassDescriptor(plan, pass),
				...timestampWrites && { timestampWrites }
			}
		};
		submit(ctx, command, () => runSubPasses(pass));
	}
}

/**
* Plain-data view of the compiled frame, for debug overlays and graph viewers.
* Not a renderer: consumers decide how to draw it.
*/
function inspect(state, plan, pool, blackboard = /* @__PURE__ */ new Map()) {
	const empty = {
		passes: [],
		culledPasses: [],
		resources: [],
		registers: [],
		memory: {
			peakBytes: 0,
			naiveBytes: 0,
			savedBytes: 0,
			pool: pool.stats()
		},
		stats: {
			declaredPasses: 0,
			culledPasses: 0,
			mergedPasses: 0,
			peakBytes: 0,
			naiveBytes: 0
		}
	};
	if (!plan) return empty;
	const resourceName = (index) => plan.resources[index]?.name ?? `resource${index}`;
	const physicalId = (index) => plan.resources[index]?.physicalId;
	const inspectAttachment = (attachment) => {
		const id = physicalId(attachment.handle.index);
		return {
			name: attachment.handle.name,
			loadOp: attachment.loadOp,
			storeOp: attachment.storeOp,
			...id !== void 0 && { physicalId: id }
		};
	};
	const passes = plan.passes.map((pass, index) => ({
		name: pass.name,
		subPasses: pass.subPasses.map((subPass) => subPass.name),
		index,
		reads: pass.reads.map(resourceName),
		writes: pass.writes.map(resourceName),
		colorAttachments: pass.color.map(inspectAttachment),
		...pass.depth && { depthAttachment: inspectAttachment(pass.depth) }
	}));
	const resources = plan.resources.map((resource) => {
		const descriptor = isTextureDescriptor(resource.descriptor) ? resource.descriptor : void 0;
		return {
			name: resource.name,
			kind: resource.kind,
			imported: resource.imported,
			transient: resource.transient,
			persistent: resource.persistent,
			culled: resource.culled,
			firstUse: resource.firstUse,
			lastUse: resource.lastUse,
			bytes: resource.bytes,
			...resource.physicalId !== void 0 && { physicalId: resource.physicalId },
			...descriptor?.format && { format: descriptor.format },
			...descriptor && {
				width: descriptor.width,
				height: descriptor.height,
				depth: descriptor.depth
			}
		};
	});
	const compiledIndexByDeclaration = Array.from({ length: state.passes.length }, () => -1);
	plan.passes.forEach((pass, index) => {
		for (const subPass of pass.subPasses) compiledIndexByDeclaration[subPass.declarationIndex] = index;
	});
	let latest = -1;
	for (let i = 0; i < compiledIndexByDeclaration.length; i++) if (compiledIndexByDeclaration[i] === -1) compiledIndexByDeclaration[i] = latest;
	else latest = compiledIndexByDeclaration[i];
	const registers = [];
	for (const [key, value] of blackboard) {
		const register = value;
		if (typeof register?.inspectRegister !== "function") continue;
		const publications = register.inspectRegister().map((publication) => ({
			...publication,
			afterPass: compiledIndexByDeclaration[publication.declaredAfter - 1] ?? -1
		}));
		const current = {};
		for (const { name, resource } of publications) current[name] = resource;
		registers.push({
			key,
			publications,
			current
		});
	}
	return {
		passes,
		culledPasses: plan.culledPasses,
		resources,
		registers,
		memory: {
			peakBytes: plan.stats.peakBytes,
			naiveBytes: plan.stats.naiveBytes,
			savedBytes: plan.stats.naiveBytes - plan.stats.peakBytes,
			pool: pool.stats()
		},
		stats: plan.stats
	};
}
/** Resource lifetimes as rows on the pass timeline: shows where the peak sits. */
function memoryTimeline(inspection) {
	return {
		passCount: inspection.passes.length,
		rows: inspection.resources.filter((resource) => !resource.culled && !resource.imported).toSorted((a, b) => a.firstUse - b.firstUse || b.bytes - a.bytes).map((resource) => ({
			name: resource.name,
			firstUse: resource.firstUse,
			lastUse: resource.lastUse,
			bytes: resource.bytes,
			...resource.physicalId !== void 0 && { physicalId: resource.physicalId }
		}))
	};
}

/** Longer than any plausible pass; beyond this the slot was never written. */
const MAX_PLAUSIBLE_MS = 1e4;
/**
* Slots are allocated in blocks so the pass count moving by one — an effect
* toggling, MSAA adding its resolve — doesn't reallocate the query set.
*/
const CAPACITY_BLOCK = 32;
/**
* Per-pass GPU timing, from WebGPU timestamp queries.
*
* Answers the only question a frame time can't: which pass spent it. Recording
* time and `onSubmittedWorkDone` both measure the whole queue, so a frame that
* costs 50ms says nothing about where.
*
* Two slots per pass, written by the GPU at the pass boundaries, so the numbers
* are device timestamps rather than anything the CPU observed. Results lag a
* frame or two: the readback is asynchronous and skipped while a previous one
* is mapping, which is why `latest` is a snapshot rather than this frame's
* result.
*/
var PassProfiler = class {
	ctx;
	slot;
	/** Pass names in plan order, rebuilt each frame as descriptors are built. */
	names = [];
	/** Most recent completed read, in plan order. */
	latest = [];
	/**
	* Wall-clock GPU time from the first timed pass beginning to the last one
	* ending, in milliseconds, or null when the last read produced nothing
	* usable.
	*
	* What a frame budget is measured against, where summing {@link latest} is
	* not: passes pipeline, so two can be in flight over the same microsecond and
	* a sum counts it twice. A span counts it once, and counts the gaps between
	* passes too — idle time waiting on the CPU is real elapsed GPU time.
	*
	* Covers this graph's passes alone. Anything submitted outside it — a clear
	* the caller issued, another module's compute — falls outside the span, as do
	* `raw` passes, which carry no timestamps and so cannot extend it.
	*/
	totalTime = null;
	/** Set once the feature turns out to be missing, so it reports once. */
	unavailable = false;
	constructor(ctx) {
		this.ctx = ctx;
	}
	/** Release a slot once nothing is reading from it. */
	#releaseIfIdle(slot) {
		if (slot.retired && slot.reads === 0) slot.query.dispose();
	}
	/**
	* Size the query set for this frame's passes. Returns false when timing is
	* unavailable, which leaves every `writesFor` empty and costs nothing.
	*/
	begin(passCount) {
		if (this.unavailable) return false;
		if (!this.ctx.device.features.has("timestamp-query")) {
			this.unavailable = true;
			console.error(NAMESPACE, "frame-graph", "per-pass profiling needs the \"timestamp-query\" feature. Create the context with requiredFeatures: [\"timestamp-query\"].");
			return false;
		}
		const needed = passCount * 2;
		if (!this.slot || needed > this.slot.capacity) {
			if (this.slot) {
				this.slot.retired = true;
				this.#releaseIfIdle(this.slot);
			}
			const capacity = Math.ceil(needed / CAPACITY_BLOCK) * CAPACITY_BLOCK;
			this.slot = {
				query: createTimestampQuery(this.ctx, { count: capacity }),
				capacity,
				reads: 0,
				retired: false
			};
		}
		this.names = [];
		return true;
	}
	/** Timestamp writes for the pass at `index`, recording its name in order. */
	writesFor(index, name) {
		const { slot } = this;
		if (!slot || index * 2 + 1 >= slot.capacity) return void 0;
		this.names[index] = name;
		return {
			querySet: slot.query.querySet,
			beginningOfPassWriteIndex: index * 2,
			endOfPassWriteIndex: index * 2 + 1
		};
	}
	/**
	* Encode the resolve and start a read. Must run after the passes are encoded
	* and before the frame's submit; the read is deliberately not awaited, since
	* awaiting it would stall the very submit it depends on.
	*/
	end(encoder) {
		const { slot } = this;
		if (!slot) return;
		slot.query.resolve(encoder);
		const names = this.names;
		slot.reads++;
		(async () => {
			try {
				const timestamps = await slot.query.read();
				if (!timestamps) return;
				const timings = [];
				let first;
				let last;
				for (let index = 0; index < names.length; index++) {
					const name = names[index];
					if (name === void 0) continue;
					const begin = timestamps[index * 2];
					const end = timestamps[index * 2 + 1];
					const ms = Number(end - begin) / 1e6;
					const valid = Number.isFinite(ms) && ms >= 0 && ms < MAX_PLAUSIBLE_MS;
					timings.push({
						name,
						ms,
						valid
					});
					if (!valid) continue;
					if (first === void 0 || begin < first) first = begin;
					if (last === void 0 || end > last) last = end;
				}
				this.latest = timings;
				const spanMs = first === void 0 ? null : Number(last - first) / 1e6;
				this.totalTime = spanMs !== null && Number.isFinite(spanMs) && spanMs < MAX_PLAUSIBLE_MS ? spanMs : null;
			} catch {} finally {
				slot.reads--;
				this.#releaseIfIdle(slot);
			}
		})();
	}
	/**
	* Slowest first. Unmeasured passes sort to the top rather than being hidden:
	* a pass that failed to report is usually the one being looked for.
	*
	* Chrome quantises timestamp query results, so anything under ~0.1ms is
	* granularity rather than signal.
	*/
	report() {
		let total = 0;
		let unmeasured = 0;
		for (const { ms, valid } of this.latest) if (valid) total += ms;
		else unmeasured++;
		const rows = this.latest.toSorted((left, right) => {
			if (left.valid !== right.valid) return left.valid ? 1 : -1;
			return right.ms - left.ms;
		}).map(({ name, ms, valid }) => valid ? `  ${ms.toFixed(3).padStart(11)}ms  ${name}` : `  ${"unmeasured".padStart(13)}  ${name}`);
		return [`GPU ${this.totalTime === null ? "unmeasured" : `${this.totalTime.toFixed(3)}ms`} span (${total.toFixed(3)}ms summed` + (unmeasured ? `, ${unmeasured} pass(es) unmeasured` : "") + ")", ...rows].join("\n");
	}
	dispose() {
		if (!this.slot) return;
		this.slot.retired = true;
		this.#releaseIfIdle(this.slot);
		this.slot = void 0;
	}
};

const DECLARE_HINT = "Declare resources and passes inside frameGraph.setup().";
/**
* Retained-mode frame graph: passes and virtual resources are declared every
* frame, compiled into an execution plan, then executed.
*
* Culls passes nobody reads, merges adjacent passes sharing attachments,
* derives load/store ops and usage flags from lifetimes, and recycles textures
* whose lifetimes don't overlap.
*
* Nothing is private: the phase guards, not visibility, protect the invariants.
*/
var FrameGraph = class {
	ctx;
	/** Everything declared this frame, plus the phase the graph is in. */
	state;
	pool;
	overrides = /* @__PURE__ */ new Map();
	stages = /* @__PURE__ */ new Map();
	passHooks = /* @__PURE__ */ new Map();
	/** Type-loose channel for passing handles between decoupled modules. */
	blackboard = /* @__PURE__ */ new Map();
	/** Messages already logged, so a pass that throws every frame logs once. */
	reportedErrors = /* @__PURE__ */ new Set();
	/** Last compiled plan; cleared when a new frame's setup starts. */
	plan;
	debug = false;
	/**
	* Measure each pass' GPU time with timestamp queries, into `profiler.latest`.
	* Needs the context created with `requiredFeatures: ["timestamp-query"]`.
	*
	* Off by default: it adds two query writes per pass and a readback, and the
	* results lag a frame or two behind.
	*/
	profile = false;
	profiler;
	/**
	* Give attachments that live and die inside one render pass no backing memory
	* (Chrome 146+, `TRANSIENT_ATTACHMENT`). Saves the bandwidth of writing them
	* out on tiled GPUs, where an MSAA attachment resolving into a single-sample
	* target is the case it exists for.
	*
	* Off by default: it is a very new flag, and in this pipeline the only
	* resources that ever qualify are the MSAA colour attachments — so a driver
	* that mishandles it fails exactly when MSAA is on and nowhere else.
	*/
	transientAttachments = false;
	constructor(ctx) {
		this.ctx = ctx;
		this.state = createGraphState();
		this.pool = new ResourcePool(ctx);
		this.profiler = new PassProfiler(ctx);
	}
	/** Declare a texture the graph owns, allocates and recycles. */
	createTexture(descriptor) {
		const { state } = this;
		requirePhase(state, "declaring", "createTexture", DECLARE_HINT);
		const name = descriptor.label ?? `texture${state.resources.length}`;
		const handle = addResource(state, name, "texture", descriptor);
		if (descriptor.persistent) {
			if (state.persistentNames.has(name)) throw new Error(`${NAMESPACE}: duplicate persistent resource "${name}". Persistent resources are looked up by label across frames, so two sharing one would hand back the same texture.`);
			state.persistentNames.add(name);
			const entry = state.resources[handle.index];
			entry.persistent = true;
			entry.exported = true;
			entry.refCount++;
		}
		return handle;
	}
	createBuffer(descriptor) {
		const { state } = this;
		requirePhase(state, "declaring", "createBuffer", DECLARE_HINT);
		return addResource(state, descriptor.label ?? `buffer${state.resources.length}`, "buffer", descriptor);
	}
	/**
	* Reference a resource the graph does not own (shadow maps, IBL, canvas).
	*
	* Importing one texture twice in a frame returns the first handle: a handle
	* identifies a resource, and two for one would hide the edges between them.
	*/
	importTexture(texture, label) {
		const { state } = this;
		requirePhase(state, "declaring", "importTexture", DECLARE_HINT);
		const existing = state.importedResources.get(texture);
		if (existing) return existing;
		const handle = addResource(state, label ?? `importedTexture${texture.id}`, "texture", {
			width: texture.width,
			height: texture.height,
			depth: texture.depthOrArrayLayers,
			format: texture.format,
			sampleCount: texture.sampleCount,
			mipLevelCount: texture.mipLevelCount,
			viewDimension: texture.viewDimension
		}, texture);
		state.importedResources.set(texture, handle);
		return handle;
	}
	/** As {@link FrameGraph.importTexture}, interned the same way. */
	importBuffer(buffer, label) {
		const { state } = this;
		requirePhase(state, "declaring", "importBuffer", DECLARE_HINT);
		const existing = state.importedResources.get(buffer);
		if (existing) return existing;
		const handle = addResource(state, label ?? `importedBuffer${state.resources.length}`, "buffer", { usage: "storage" }, buffer);
		state.importedResources.set(buffer, handle);
		return handle;
	}
	/**
	* Mark a resource as read outside the graph: it survives culling, its last
	* write is stored, and it is not recycled until the frame ends.
	*/
	exportTexture(handle) {
		requirePhase(this.state, "declaring", "exportTexture", DECLARE_HINT);
		const resource = this.state.resources[handle.index];
		if (resource) {
			resource.exported = true;
			resource.refCount++;
		}
		return handle;
	}
	addPass(declaration) {
		const { state } = this;
		requirePhase(state, "declaring", `addPass("${declaration.name}")`, DECLARE_HINT);
		const override = this.overrides.get(declaration.name);
		if (override) {
			const replaced = override(declaration);
			if (!replaced) return;
			declaration = replaced;
		}
		if (state.passNames.has(declaration.name)) throw new Error(`${NAMESPACE}: duplicate pass name "${declaration.name}". Names identify passes for overrides and inspection, so they must be unique within a frame.`);
		state.passNames.add(declaration.name);
		const pass = {
			index: state.passes.length,
			name: declaration.name,
			type: declaration.type ?? "render",
			color: declaration.color ?? [],
			...declaration.depth && { depth: declaration.depth },
			reads: [],
			writes: [],
			...declaration.uniforms && { uniforms: declaration.uniforms },
			neverCull: declaration.neverCull ?? false,
			...declaration.renderView && { renderView: declaration.renderView },
			execute: declaration.execute,
			dependencies: /* @__PURE__ */ new Set(),
			refCount: 0,
			culled: false
		};
		state.passes.push(pass);
		const reads = [...declaration.reads ?? []];
		collectUniformReads(declaration.uniforms, reads);
		for (const handle of reads) readResource(state, pass, handle, state.resources[handle.index]?.kind === "buffer" ? GPUBufferUsage.STORAGE : GPUTextureUsage.TEXTURE_BINDING);
		for (const attachment of pass.color) {
			writeResource(state, pass, attachment.texture, GPUTextureUsage.RENDER_ATTACHMENT, attachment);
			if (attachment.resolveTarget) writeResource(state, pass, attachment.resolveTarget, GPUTextureUsage.RENDER_ATTACHMENT, {});
		}
		if (pass.depth) writeResource(state, pass, pass.depth.texture, GPUTextureUsage.RENDER_ATTACHMENT, pass.depth);
		for (const write of declaration.writes ?? []) {
			const handle = isResourceHandle(write) ? write : write.handle;
			const usage = isResourceHandle(write) ? state.resources[handle.index]?.kind === "buffer" ? GPUBufferUsage.STORAGE : GPUTextureUsage.STORAGE_BINDING : write.usage;
			writeResource(state, pass, handle, usage, {});
		}
		const hooks = this.passHooks.get(pass.name);
		if (hooks) for (const hook of hooks) hook(declaration);
	}
	/**
	* Run everything registered at this injection point, in registration order,
	* handing each callback the payload the caller publishes for this stage.
	*
	* The payload is how a callback learns what exists at this point in the frame
	* and how it hands something back — the graph passes it through untouched, so
	* the vocabulary stays with the caller rather than becoming graph API. See
	* `RenderTextures`, the payload the render pipeline publishes: a callback
	* reads the frame's images by name from it and publishes its own the same
	* way, which is what splices its passes into the frame.
	*
	* Callbacks may be async, but only for CPU work: declaration runs inside the
	* caller's frame segment, and yielding past a browser present destroys the
	* swapchain texture it acquired, which fails the submit for the whole frame.
	* Fetch outside the frame and use what has arrived, as post-processing does
	* with its effect modules.
	*/
	async stage(name, context) {
		requirePhase(this.state, "declaring", `stage("${name}")`, DECLARE_HINT);
		const callbacks = this.stages.get(name);
		if (!callbacks) return;
		for (const callback of callbacks) await callback(context, name);
	}
	/** Register work at a named stage. Persists across frames. */
	on(name, callback) {
		const callbacks = this.stages.getOrInsertComputed(name, () => /* @__PURE__ */ new Set());
		callbacks.add(callback);
		return () => callbacks.delete(callback);
	}
	/**
	* Declare passes immediately after `name` enters the graph, at that point in
	* the frame.
	*
	* Every pass is an injection point this way, so positioning work relative to
	* one costs the caller nothing: no `stage()` to add, and no set of stage
	* names shadowing the pass list. Named stages remain for the boundaries no
	* single pass marks — a phase that exists whether or not the pass before it
	* was declared — and for the payload and the awaiting that come with them.
	*
	* The hook runs after the pass and its edges are recorded, and after any
	* override, so a dropped pass fires nothing and a renamed one fires under its
	* new name. Reading the frame's images from here is the register's job, keyed
	* by the view on the declaration.
	*/
	afterPass(name, hook) {
		const hooks = this.passHooks.getOrInsertComputed(name, () => /* @__PURE__ */ new Set());
		hooks.add(hook);
		return () => hooks.delete(hook);
	}
	/** Register a {@link PassOverride} for a pass name; null clears it. */
	overridePass(name, transform) {
		if (transform) this.overrides.set(name, transform);
		else this.overrides.delete(name);
	}
	disablePass(name) {
		this.overrides.set(name, () => null);
	}
	/** Declare the frame. May await: nothing is recorded until execute. */
	async setup(declare) {
		resetGraphState(this.state);
		this.blackboard.clear();
		this.plan = void 0;
		this.state.phase = "declaring";
		try {
			await declare();
		} finally {
			this.state.phase = "declared";
		}
	}
	compile() {
		requirePhase(this.state, "declared", "compile()", "Call setup() first.");
		this.plan = compile(this.state, this.pool, {
			debug: this.debug,
			transientAttachments: this.transientAttachments
		});
		this.state.phase = "compiled";
		return this.plan;
	}
	/** Record and submit. Opens its own pex-gpu segment unless one is open. */
	execute() {
		requirePhase(this.state, "compiled", "execute()", "Call compile() first.");
		const timing = this.profile && this.profiler.begin(this.plan.passes.length);
		execute(this.ctx, this.state, this.plan, this.reportedErrors, timing ? this.profiler : void 0);
		if (timing) this.profiler.end(frameState(this.ctx).encoder);
		this.state.phase = "idle";
	}
	/** Setup + compile + execute, bracketing execution in one command buffer. */
	async render(declare) {
		await this.setup(declare);
		const compiled = this.compile();
		const ownsSegment = !commandsState(this.ctx).frame;
		if (ownsSegment) beginFrame(this.ctx);
		try {
			this.execute();
		} finally {
			if (ownsSegment) endFrame(this.ctx);
			this.pool.endFrame();
		}
		return compiled;
	}
	/**
	* Descriptor a handle was declared or imported with: format, size, sample
	* count, mip levels.
	*
	* Readable from declaration onwards, so a pass sizes and formats its own
	* textures from what it is about to read instead of being handed those values
	* separately — the graph already holds them, and a copy is one more thing to
	* keep in sync.
	*/
	describe(handle) {
		return this.state.resources[handle.index]?.descriptor;
	}
	/**
	* Physical resource behind a handle. Undefined before compile, after the next
	* `setup` clears the plan, or when the resource was culled.
	*/
	resolve(handle) {
		return this.plan?.physical[handle.index];
	}
	inspect() {
		return inspect(this.state, this.plan, this.pool, this.blackboard);
	}
	poolStats() {
		return this.pool.stats();
	}
	dispose() {
		this.pool.dispose();
		resetGraphState(this.state);
		this.overrides.clear();
		this.stages.clear();
		this.passHooks.clear();
		this.blackboard.clear();
		this.reportedErrors.clear();
		this.plan = void 0;
	}
};

var render_engine_default = ({ ctx, debug = false }) => {
	const frameGraph = new FrameGraph(ctx);
	const options = {
		ctx,
		frameGraph
	};
	const animationSystem = animation_default$1();
	const skinSystem = skin_default$1();
	const geometrySystem = geometry_default$1(options);
	const morphSystem = morph_default$1();
	const transformSystem = transform_default$1();
	const layerSystem = layer_default();
	const skyboxSystem = skybox_default$2(options);
	const cameraSystem = camera_default$1(options);
	const helperSystem = helper_default();
	const reflectionProbeSystem = reflection_probe_default$1(options);
	const lightSystem = light_default();
	const renderPipelineSystem = render_pipeline_default(options);
	const standardRendererSystem = standard_default(options);
	const lineRendererSystem = line_default(options);
	const skyboxRendererSystem = skybox_default$1(options);
	const renderEngine = {
		debug(enabled) {
			for (let i = 0; i < this.systems.length; i++) this.systems[i].debug = enabled;
			for (let i = 0; i < this.renderers.length; i++) this.renderers[i].debug = enabled;
			frameGraph.debug = enabled;
			this.debugMode = enabled;
		},
		debugMode: false,
		time: 0,
		deltaTime: 0,
		/**
		* Frames ticked, advanced by `update()` alongside `time` — so the camera
		* system, which runs there, indexes the same frame the render that follows
		* will. Drives the temporal antialiasing jitter and the ambient occlusion
		* noise index, both of which need a frame to differ from the one before
		* it.
		*
		* Owned here rather than read from pex-gpu's frame loop: that counter lives
		* in the `frame()` closure and only reaches a caller through its callback,
		* so a caller driving their own loop would have none.
		*/
		frameIndex: 0,
		_prevTime: performance.now(),
		frameGraph,
		systems: [
			animationSystem,
			skinSystem,
			geometrySystem,
			morphSystem,
			transformSystem,
			layerSystem,
			skyboxSystem,
			cameraSystem,
			helperSystem,
			reflectionProbeSystem,
			lightSystem,
			renderPipelineSystem
		],
		renderers: [
			standardRendererSystem,
			lineRendererSystem,
			skyboxRendererSystem
		],
		/** CPU-side scene update. Records no GPU commands; `render()` does. */
		update(entities, deltaTime) {
			const now = performance.now();
			this.deltaTime = deltaTime || (now - this._prevTime) / 1e3;
			this._prevTime = now;
			this.time += this.deltaTime;
			this.frameIndex++;
			animationSystem.update(entities, this);
			skinSystem.update(entities);
			geometrySystem.update(entities);
			morphSystem.update(entities);
			transformSystem.update(entities);
			layerSystem.update(entities);
			skyboxSystem.update(entities);
			reflectionProbeSystem.update(entities);
			cameraSystem.update(entities, this);
			for (let i = 0; i < this.renderers.length; i++) this.renderers[i].update(entities, this);
		},
		/**
		* Declare, compile and execute one frame.
		*
		* Async because `stage()` hooks may be. Call it from an async `gpu.frame`
		* callback: that keeps one segment open across the whole tick, so this and
		* everything drawn after it — GUI included — share a command buffer. What
		* it awaits must never yield long enough for the browser to present, which
		* destroys the swapchain texture the open segment holds and fails the
		* submit for the entire frame.
		*
		* All cameras share one graph, so a target finished by the first camera can
		* back a different one for the second: peak memory tracks the heaviest
		* camera rather than their sum.
		*/
		async render(entities, cameraEntities, options = {}) {
			const cameras = Array.isArray(cameraEntities) ? cameraEntities : [cameraEntities];
			let targetHandlesPerCamera = [];
			await frameGraph.render(async () => {
				targetHandlesPerCamera = [];
				skyboxSystem.declareSkybox(entities);
				reflectionProbeSystem.declareReflectionProbes(entities);
				for (const cameraEntity of cameras) {
					const camera = cameraEntity.camera;
					const viewport = camera.viewport || getDefaultViewport(ctx);
					const aspect = viewport[2] / viewport[3];
					if (aspect !== camera.aspect) {
						camera.aspect = aspect;
						camera.dirty = true;
					}
					const renderView = {
						camera,
						cameraEntity,
						viewport
					};
					const entitiesForCamera = cameraEntity.layer ? entities.filter((entity) => !entity.layer || entity.layer == cameraEntity.layer) : entities;
					const updateOptions = {
						time: options.time ?? this.time,
						frameIndex: this.frameIndex,
						renderers: options.renderers || this.renderers,
						renderView,
						drawToScreen: options.drawToScreen,
						renderEngine: this
					};
					const { entities: helperEntities } = helperSystem.update(entitiesForCamera, updateOptions);
					lightSystem.update(entitiesForCamera);
					targetHandlesPerCamera.push(await renderPipelineSystem.update([...entitiesForCamera, ...helperEntities], updateOptions));
				}
			});
			return targetHandlesPerCamera.map((handles) => mapValues(handles, (handle) => frameGraph.resolve(handle)));
		},
		dispose(entities) {
			for (let i = 0; i < this.systems.length; i++) this.systems[i].dispose?.(entities);
			for (let i = 0; i < this.renderers.length; i++) this.renderers[i].dispose?.(entities);
			frameGraph.dispose();
		}
	};
	renderEngine.debug(debug);
	return renderEngine;
};

/** Geometry component */
var geometry_default = (options) => ({ ...options });

/** Material component */
var material_default = (options) => {
	if (options?.type === "line") return {
		baseColor: [
			1,
			1,
			1,
			1
		],
		depthWriteEnabled: true,
		castShadows: false,
		lineWidth: 1,
		lineResolution: 6,
		perspectiveScaling: false,
		...options
	};
	return {
		baseColor: [
			1,
			1,
			1,
			1
		],
		emissiveStrength: 1,
		emissiveExposure: 0,
		metallic: 1,
		roughness: 1,
		ior: 1.5,
		normalTextureScale: 1,
		occlusionTextureStrength: 1,
		clearcoatNormalTextureScale: 1,
		responsiveAA: false,
		cullMode: "back",
		castShadows: false,
		receiveShadows: false,
		...options
	};
};

/** Transform component */
var transform_default = (options) => ({
	position: [
		0,
		0,
		0
	],
	rotation: [
		0,
		0,
		0,
		1
	],
	scale: [
		1,
		1,
		1
	],
	...options
});

/** Camera component */
var camera_default = (options) => {
	const camera = {
		projection: "perspective",
		near: .5,
		far: 1e3,
		aspect: 1,
		backgroundColor: [
			0,
			0,
			0,
			1
		],
		viewMatrix: lookAt(create$1(), [
			0,
			0,
			1
		], [
			0,
			0,
			0
		], [
			0,
			1,
			0
		]),
		inverseViewMatrix: create$1(),
		projectionMatrix: create$1(),
		culling: false,
		frustum: /* @__PURE__ */ new Float32Array(24),
		focalLength: 50,
		fStop: 16,
		sensorSize: [36, 24],
		actualSensorHeight: 24,
		sensorFit: "vertical",
		shutterSpeed: 1 / 125,
		iso: 100,
		exposureCompensation: 0,
		...options
	};
	if (camera.projection === "orthographic") {
		camera.left ||= -1;
		camera.right ||= 1;
		camera.bottom ||= -1;
		camera.top ||= 1;
		camera.zoom ||= 1;
	} else camera.fov ||= Math.PI / 4;
	return camera;
};

/** Orbiter component */
var orbiter_default = (options) => ({
	target: [
		0,
		0,
		0
	],
	lat: 0,
	lon: 0,
	distance: 10,
	...options
});

/** Animation component */
var animation_default = (options) => ({
	playing: false,
	loop: false,
	time: 0,
	channels: [],
	...options
});

/** Morph component */
var morph_default = (options) => ({
	weights: [],
	current: options.current || Object.keys(options.sources).reduce((current, attribute) => {
		current[attribute] = [...options.sources[attribute]];
		return current;
	}, {}),
	...options
});

/** Skin component */
var skin_default = (options) => ({ ...options });

/** Ambient light component */
var ambient_light_default = (options) => ({
	color: [
		1,
		1,
		1,
		1
	],
	intensity: 1,
	...options
});

/** Area light component */
var area_light_default = (options) => ({
	color: [
		1,
		1,
		1,
		1
	],
	intensity: 1e3,
	disk: false,
	doubleSided: false,
	depthBias: 1,
	depthBiasSlopeScale: 2,
	depthBiasClamp: 0,
	bulbRadius: 1,
	castShadows: true,
	shadowMapSize: 2048,
	...options
});

/** Directional light component */
var directional_light_default = (options) => ({
	color: [
		1,
		1,
		1,
		1
	],
	intensity: 1e5,
	depthBias: 1,
	depthBiasSlopeScale: 2,
	depthBiasClamp: 0,
	bulbRadius: 1,
	castShadows: true,
	shadowMapSize: 2048,
	...options
});

/** Point light component */
var point_light_default = (options) => ({
	color: [
		1,
		1,
		1,
		1
	],
	intensity: 1e3,
	range: Infinity,
	depthBiasNormalized: .005,
	bulbRadius: 1,
	castShadows: true,
	shadowMapSize: 2048,
	...options
});

/** Spot light component */
var spot_light_default = (options) => ({
	color: [
		1,
		1,
		1,
		1
	],
	intensity: 1e3,
	outerConeAngle: Math.PI / 4,
	innerConeAngle: 0,
	focusedSpot: false,
	range: Infinity,
	depthBias: 1,
	depthBiasSlopeScale: 2,
	depthBiasClamp: 0,
	bulbRadius: 1,
	castShadows: true,
	shadowMapSize: 2048,
	...options
});

/** Skybox component */
var skybox_default = (options) => ({
	backgroundBlur: 0,
	intensity: 3e4,
	turbidity: 10,
	rayleigh: 2,
	mieCoefficient: .005,
	mieDirectionalG: .8,
	...options
});

/** Reflection probe component */
var reflection_probe_default = (options) => ({ ...options });

/** Post Processing component */
const postProcessing = ((options) => ({
	exposure: 0,
	toneMap: "aces",
	opacity: 1,
	blades: 0,
	bladeRotation: 0,
	bladeCurvature: 0,
	...options
}));
/** Post Processing SSAO subcomponent */
postProcessing.ssao = (options) => ({
	type: "sao",
	mix: 1,
	radius: .5,
	brightness: 0,
	contrast: 1,
	saoSamples: 11,
	intensity: 1,
	bias: .01,
	spiralTurns: 7,
	blurRadius: 8,
	blurSharpness: 10,
	slices: 3,
	/** Steps along each slice: the total tap count is slices * this. */
	stepsPerSlice: 3,
	bentNormals: false,
	radiusMultiplier: 1.457,
	falloffRange: .615,
	sampleDistributionPower: 2,
	thinOccluderCompensation: 0,
	finalValuePower: 2.2,
	depthMipSamplingOffset: 3.3,
	denoisePasses: 1,
	denoiseBlurBeta: 1.2,
	...options
});
/** Post Processing DoF subcomponent */
postProcessing.dof = (options) => ({
	physical: true,
	focusDistance: 7,
	focusOnScreenPoint: false,
	screenPoint: [.5, .5],
	focusScale: 1,
	blurriness: .03,
	focusRange: 1,
	focusFalloff: 1,
	maxCoCRadius: .05,
	nearRings: 8,
	farRings: 8,
	samples: 6,
	ringOcclusion: true,
	postFilter: true,
	transitionBlur: true,
	chromaticAberration: .05,
	luminanceThreshold: .7,
	luminanceGain: 0,
	luminanceKnee: .5,
	debug: false,
	...options
});
/** Post Processing MSAA subcomponent */
postProcessing.msaa = (options) => ({
	sampleCount: 4,
	...options
});
/** Post Processing FXAA subcomponent */
postProcessing.fxaa = (options) => ({
	quality: 3,
	subPixelQuality: .75,
	...options
});
/** Post Processing SMAA subcomponent */
postProcessing.smaa = (options) => ({
	quality: 2,
	edges: "luma",
	predication: false,
	predicationThreshold: .01,
	predicationScale: 2,
	predicationStrength: .4,
	mode: "1x",
	reprojection: true,
	reprojectionWeightScale: 30,
	...options
});
/** Post Processing TAA subcomponent */
postProcessing.taa = (options) => ({
	blendFactor: .1,
	varianceGamma: 1.25,
	sharpness: 0,
	disocclusionTolerance: .02,
	debug: false,
	...options
});
/** Post Processing Motion Blur subcomponent */
postProcessing.motionBlur = (options) => ({
	intensity: 1,
	samples: 35,
	tileSize: 40,
	centerWeightBias: 40,
	directionBlend: 1.5,
	jitterScale: 27,
	tileBlend: 1,
	...options
});
/** Post Processing Fog subcomponent */
postProcessing.fog = (options) => ({
	color: [
		.5,
		.5,
		.5
	],
	start: 5,
	density: .15,
	sunPosition: [
		1,
		1,
		1
	],
	sunDispertion: .2,
	sunIntensity: .1,
	sunColor: [
		.98,
		.98,
		.7
	],
	inscatteringCoeffs: [
		.3,
		.3,
		.3
	],
	...options
});
/** Post Processing Bloom subcomponent */
postProcessing.bloom = (options) => ({
	quality: 1,
	colorFunction: "luma",
	threshold: 1,
	softKnee: .5,
	source: false,
	radius: 1,
	intensity: .1,
	...options
});
/** Post Processing Lens Flare subcomponent */
postProcessing.lensFlare = (options) => ({
	intensity: 1,
	tint: [
		1,
		1,
		1
	],
	threshold: 3,
	softKnee: .5,
	source: false,
	clamp: 50,
	blur: 2,
	ghosts: 4,
	ghostIntensity: 1,
	reversedIntensity: .5,
	warpedIntensity: 0,
	ghostStart: 1.25,
	ghostSpacing: 1.5,
	ghostDimmer: .8,
	haloIntensity: .4,
	haloRadius: .4,
	chromaticAberration: .02,
	chromaticSamples: 4,
	vignette: 1,
	streakIntensity: 0,
	streakLength: .5,
	streakThreshold: 0,
	streakRotation: 0,
	streakIterations: 5,
	streakDirections: 0,
	...options
});
/** Post Processing Vignette subcomponent */
postProcessing.vignette = (options) => ({
	radius: .8,
	intensity: .2,
	...options
});
/** Post Processing LUT subcomponent */
postProcessing.lut = (options) => ({ ...options });
/** Post Processing Color Correction subcomponent */
postProcessing.colorCorrection = (options) => ({
	brightness: 0,
	contrast: 1,
	saturation: 1,
	hue: 0,
	...options
});
/** Post Processing Film Grain subcomponent */
postProcessing.filmGrain = (options) => ({
	quality: 2,
	size: 1.6,
	intensity: .05,
	colorIntensity: .6,
	luminanceIntensity: 1,
	speed: .5,
	...options
});

/** Bounding box helper component */
var bounding_box_helper_default = (options) => ({
	color: [
		1,
		0,
		0,
		1
	],
	...options
});

/** Vertex helper component */
var vertex_helper_default = (options) => ({
	color: [
		0,
		1,
		0,
		1
	],
	size: 1,
	attribute: "normals",
	...options
});

/** Skeleton helper component */
var skeleton_helper_default = (options) => ({
	color: [[
		0,
		0,
		1,
		1
	], [
		0,
		1,
		0,
		1
	]],
	...options
});

/** Light helper component */
var light_helper_default = (options) => ({ ...options });

/** Camera helper component */
var camera_helper_default = (options) => ({
	color: [
		1,
		1,
		1,
		1
	],
	...options
});

/** Axes helper component */
var axes_helper_default = (options) => ({ ...options });

/** Grid helper component */
var grid_helper_default = (options) => ({
	color: [
		1,
		1,
		1,
		1
	],
	size: 10,
	...options
});

var components_exports = /* @__PURE__ */ __exportAll({
	ambientLight: () => ambient_light_default,
	animation: () => animation_default,
	areaLight: () => area_light_default,
	axesHelper: () => axes_helper_default,
	boundingBoxHelper: () => bounding_box_helper_default,
	camera: () => camera_default,
	cameraHelper: () => camera_helper_default,
	directionalLight: () => directional_light_default,
	geometry: () => geometry_default,
	gridHelper: () => grid_helper_default,
	lightHelper: () => light_helper_default,
	material: () => material_default,
	morph: () => morph_default,
	orbiter: () => orbiter_default,
	pointLight: () => point_light_default,
	postProcessing: () => postProcessing,
	reflectionProbe: () => reflection_probe_default,
	skeletonHelper: () => skeleton_helper_default,
	skin: () => skin_default,
	skybox: () => skybox_default,
	spotLight: () => spot_light_default,
	transform: () => transform_default,
	vertexHelper: () => vertex_helper_default
});

const SUPPORTED_EXTENSIONS = /* @__PURE__ */ new Set([
	"KHR_materials_pbrSpecularGlossiness",
	"EXT_mesh_gpu_instancing",
	"KHR_draco_mesh_compression",
	"KHR_lights_punctual",
	"KHR_materials_clearcoat",
	"KHR_materials_dispersion",
	"KHR_materials_emissive_strength",
	"KHR_materials_ior",
	"KHR_materials_sheen",
	"KHR_materials_specular",
	"KHR_materials_transmission",
	"KHR_materials_diffuse_transmission",
	"KHR_materials_unlit",
	"KHR_materials_volume",
	"KHR_mesh_quantization",
	"KHR_texture_transform",
	"EXT_lights_image_based",
	"KHR_texture_basisu",
	"EXT_texture_webp"
]);
const WEBGL_CONSTANTS = {
	ELEMENT_ARRAY_BUFFER: 34963,
	ARRAY_BUFFER: 34962,
	BYTE: 5120,
	UNSIGNED_BYTE: 5121,
	SHORT: 5122,
	UNSIGNED_SHORT: 5123,
	UNSIGNED_INT: 5125,
	FLOAT: 5126
};
const WEBGL_TYPED_ARRAY_BY_COMPONENT_TYPES = {
	[WEBGL_CONSTANTS.BYTE]: Int8Array,
	[WEBGL_CONSTANTS.UNSIGNED_BYTE]: Uint8Array,
	[WEBGL_CONSTANTS.SHORT]: Int16Array,
	[WEBGL_CONSTANTS.UNSIGNED_SHORT]: Uint16Array,
	[WEBGL_CONSTANTS.UNSIGNED_INT]: Uint32Array,
	[WEBGL_CONSTANTS.FLOAT]: Float32Array
};
const GLTF_ACCESSOR_COMPONENT_TYPE_SIZE = {
	[WEBGL_CONSTANTS.BYTE]: 1,
	[WEBGL_CONSTANTS.UNSIGNED_BYTE]: 1,
	[WEBGL_CONSTANTS.SHORT]: 2,
	[WEBGL_CONSTANTS.UNSIGNED_SHORT]: 2,
	[WEBGL_CONSTANTS.UNSIGNED_INT]: 4,
	[WEBGL_CONSTANTS.FLOAT]: 4
};
const GLTF_ACCESSOR_TYPE_COMPONENTS_NUMBER = {
	SCALAR: 1,
	VEC2: 2,
	VEC3: 3,
	VEC4: 4,
	MAT2: 4,
	MAT3: 9,
	MAT4: 16
};
const MAGIC = 1179937895;
const CHUNK_TYPE = {
	JSON: 1313821514,
	BIN: 5130562
};
const MESH_QUANTIZATION_SCALE = /* @__PURE__ */ new Map([
	[Int8Array, 1 / 127],
	[Uint8Array, 1 / 255],
	[Int16Array, 1 / 32767],
	[Uint16Array, 1 / 65535]
]);
const normalizeData = (data) => new Float32Array(data).map((v) => v * (MESH_QUANTIZATION_SCALE.get(data.constructor) ?? 1));
const isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent ?? "");

function uint8ArrayToArrayBuffer({ buffer, byteOffset, byteLength }) {
	return buffer.slice(byteOffset, byteLength + byteOffset);
}
var BinaryReader = class {
	_arrayBuffer;
	_dataView;
	_byteOffset;
	constructor(arrayBuffer) {
		this._arrayBuffer = arrayBuffer;
		this._dataView = new DataView(arrayBuffer);
		this._byteOffset = 0;
	}
	getPosition() {
		return this._byteOffset;
	}
	getLength() {
		return this._arrayBuffer.byteLength;
	}
	readUint32() {
		const value = this._dataView.getUint32(this._byteOffset, true);
		this._byteOffset += 4;
		return value;
	}
	readUint8Array(length) {
		const value = new Uint8Array(this._arrayBuffer, this._byteOffset, length);
		this._byteOffset += length;
		return value;
	}
	skipBytes(length) {
		this._byteOffset += length;
	}
};
/**
* Unpack a GLB (binary glTF) buffer into its JSON and BIN chunks.
* https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html#glb-file-format-specification
*/
function unpackBinary(data) {
	const binaryReader = new BinaryReader(data);
	const magic = binaryReader.readUint32();
	if (magic !== 1179937895) throw new Error(`Unexpected magic: ${magic}`);
	const version = binaryReader.readUint32();
	if (version !== 2) throw new Error(`Unsupported version: ${version} `);
	const length = binaryReader.readUint32();
	if (length !== binaryReader.getLength()) throw new Error(`Length in header does not match actual data length: ${length} != ${binaryReader.getLength()}`);
	const chunkLength = binaryReader.readUint32();
	if (binaryReader.readUint32() !== CHUNK_TYPE.JSON) throw new Error("First chunk format is not JSON");
	const buffer = binaryReader.readUint8Array(chunkLength);
	const json = typeof TextDecoder === "undefined" ? Array.from(buffer, (byte) => String.fromCodePoint(byte)).join("") : new TextDecoder().decode(buffer);
	let bin = null;
	while (binaryReader.getPosition() < binaryReader.getLength()) {
		const chunkLength = binaryReader.readUint32();
		switch (binaryReader.readUint32()) {
			case CHUNK_TYPE.JSON: throw new Error("Unexpected JSON chunk");
			case CHUNK_TYPE.BIN:
				bin = binaryReader.readUint8Array(chunkLength);
				break;
			default: binaryReader.skipBytes(chunkLength);
		}
	}
	return {
		json,
		bin
	};
}
/**
* Splits raw input (GLB ArrayBuffer, or already-parsed/loaded JSON) into {
* json, bin }.
*/
function loadData(data) {
	if (data instanceof ArrayBuffer) {
		const unpacked = unpackBinary(data);
		return {
			json: JSON.parse(unpacked.json),
			bin: unpacked.bin ? uint8ArrayToArrayBuffer(unpacked.bin) : void 0
		};
	}
	return { json: data };
}
function isBase64(uri) {
	return uri.startsWith("data:");
}
function decodeBase64(uri) {
	const decodedString = atob(uri.split(",", 2)[1]);
	const bufferLength = decodedString.length;
	const bufferView = new Uint8Array(new ArrayBuffer(bufferLength));
	for (let i = 0; i < bufferLength; i++) bufferView[i] = decodedString.codePointAt(i);
	return bufferView.buffer;
}

/**
* A pool of decoder workers speaking a small request/response protocol:
* requests carry a numeric `id`, replies are `{ type: "decode", id, ... }` on
* success or `{ type: "error", id, error }` on failure.
*
* The pool owns scheduling, reply routing, result caching and teardown; how a
* worker is created and initialised is left to `createWorker`, since each
* decoder loads its own transcoder.
*
* @private
*/
var WorkerPool = class {
	/**
	* @param {object} options
	* @param {function(): Promise<Worker>} options.createWorker Creates a worker
	*   that is ready to accept decode requests — including any transcoder
	*   initialisation.
	* @param {number} [options.workerLimit=4] Maximum number of concurrent
	*   workers.
	*/
	constructor({ createWorker, workerLimit = 4 }) {
		this.createWorker = createWorker;
		this.workerLimit = workerLimit;
		/** One promise per worker, pushed synchronously when the slot is claimed. */
		this.entries = [];
		/** Entries whose worker has finished being created. */
		this.live = /* @__PURE__ */ new Set();
		/** Tasks assigned but not yet finished, tracked synchronously. */
		this.outstanding = 0;
		this.nextTaskId = 0;
		this.taskCache = /* @__PURE__ */ new WeakMap();
		/**
		* Bumped by dispose(), so workers still being created can tell they are
		* already obsolete when they land.
		*/
		this.generation = 0;
	}
	#spawn() {
		const generation = this.generation;
		const pending = this.createWorker().then((worker) => {
			const entry = {
				worker,
				callbacks: /* @__PURE__ */ new Map(),
				costs: /* @__PURE__ */ new Map(),
				load: 0
			};
			worker.onmessage = ({ data: message }) => {
				const callback = entry.callbacks.get(message.id);
				if (!callback) {
					if (message.type === "error") this.#fail(entry, message.error);
					return;
				}
				if (message.type === "error") callback.reject(new Error(message.error));
				else callback.resolve(message);
			};
			worker.onerror = ({ message }) => this.#fail(entry, message ?? "worker error");
			worker.onmessageerror = () => this.#fail(entry, "worker message could not be deserialized");
			if (this.generation !== generation) {
				worker.terminate();
				throw new Error("pex-loaders: worker pool disposed");
			}
			this.live.add(entry);
			return entry;
		});
		pending.catch(() => {
			const index = this.entries.indexOf(pending);
			if (index !== -1) this.entries.splice(index, 1);
		});
		return pending;
	}
	#fail(entry, error) {
		for (const { reject } of entry.callbacks.values()) reject(new Error(error));
		entry.callbacks.clear();
		entry.costs.clear();
		entry.load = 0;
	}
	async #acquire(cost) {
		if (this.outstanding >= this.entries.length && this.entries.length < this.workerLimit) this.entries.push(this.#spawn());
		this.outstanding++;
		let entries;
		try {
			entries = await Promise.all(this.entries);
		} catch (error) {
			this.outstanding--;
			throw error;
		}
		const entry = entries.reduce((least, candidate) => candidate.load < least.load ? candidate : least);
		const taskId = ++this.nextTaskId;
		entry.costs.set(taskId, cost);
		entry.load += cost;
		return {
			entry,
			taskId
		};
	}
	#release(entry, taskId) {
		entry.load -= entry.costs.get(taskId) ?? 0;
		entry.costs.delete(taskId);
		entry.callbacks.delete(taskId);
		this.outstanding--;
	}
	/**
	* Run one decode task, reusing the cached result when the same buffer is
	* decoded again with the same configuration.
	*
	* @param {object} options
	* @param {object} options.message Payload merged with `{ type: "decode", id
	*   }` and posted to the worker.
	* @param {Transferable[]} [options.transfer=[]] Buffers to transfer rather
	*   than clone.
	* @param {number} [options.cost=0] Relative task weight used to balance load
	*   across workers.
	* @param {string} [options.key] Configuration identity — a cache hit requires
	*   a matching key.
	* @param {ArrayBuffer} [options.cacheKey] Buffer the result is cached
	*   against.
	* @returns {Promise<object>} The worker's reply message.
	*/
	run({ message, transfer = [], cost = 0, key, cacheKey }) {
		const cached = this.#cached(key, cacheKey);
		if (cached) return cached;
		const pending = this.#run({
			message,
			transfer,
			cost
		});
		if (cacheKey) this.taskCache.set(cacheKey, {
			key,
			promise: pending
		});
		return pending;
	}
	#cached(key, cacheKey) {
		if (!cacheKey) return void 0;
		const entry = this.taskCache.get(cacheKey);
		return entry?.key === key ? entry.promise : void 0;
	}
	async #run({ message, transfer, cost }) {
		const { entry, taskId } = await this.#acquire(cost);
		try {
			const { promise, resolve, reject } = Promise.withResolvers();
			entry.callbacks.set(taskId, {
				resolve,
				reject
			});
			entry.worker.postMessage({
				...message,
				id: taskId
			}, transfer);
			return await promise;
		} finally {
			this.#release(entry, taskId);
		}
	}
	/** Terminate every worker. The pool can be used again afterwards. */
	dispose() {
		this.generation++;
		for (const entry of this.live) {
			this.#fail(entry, "worker pool disposed");
			entry.worker.terminate();
		}
		this.live.clear();
		for (const pending of this.entries) pending.catch(() => {});
		this.entries = [];
		this.outstanding = 0;
	}
	[Symbol.dispose]() {
		this.dispose();
	}
};

const WORKER_URL$1 = new URL("assets/draco-worker-Bbnnr7Eo.js", import.meta.url);
const WRAPPER_URL = new URL("assets/draco_wasm_wrapper-DxJM36Ib.js", import.meta.url);
const WASM_URL$1 = new URL("assets/draco_decoder-DsQ12WqX.wasm", import.meta.url);
const DEFAULT_TRANSCODE_CONFIG = {
	attributeIDs: {
		positions: "POSITION",
		normals: "NORMAL",
		texCoords: "TEX_COORD",
		colors: "COLOR"
	},
	attributeTypes: {
		positions: "Float32Array",
		normals: "Float32Array",
		texCoords: "Float32Array",
		colors: "Float32Array"
	},
	useUniqueIDs: false
};
const pools$1 = /* @__PURE__ */ new Map();
const resolve$1 = (path, fallback) => path ? new URL(path, globalThis.location?.href).href : fallback.href;
function getPool$1({ transcoderPath, workerPath, workerLimit }) {
	const poolKey = `${transcoderPath ?? ""}|${workerPath ?? ""}|${workerLimit ?? ""}`;
	let pool = pools$1.get(poolKey);
	if (pool) return pool;
	const workerUrl = resolve$1(workerPath, WORKER_URL$1);
	const wrapperUrl = resolve$1(transcoderPath && `${transcoderPath}draco_wasm_wrapper.js`, WRAPPER_URL);
	const wasmUrl = resolve$1(transcoderPath && `${transcoderPath}draco_decoder.wasm`, WASM_URL$1);
	let wasmPending;
	pool = new WorkerPool({
		workerLimit,
		createWorker: async () => {
			wasmPending ??= loadArrayBuffer(wasmUrl);
			const worker = new Worker(workerUrl);
			worker.postMessage({
				type: "init",
				config: {
					wrapperUrl,
					wasmBinary: await wasmPending
				}
			});
			return worker;
		}
	});
	pools$1.set(poolKey, pool);
	return pool;
}
/**
* @typedef {object} DracoOptions
* @property {string} [transcoderPath] Directory holding `draco_wasm_wrapper.js`
*   and `draco_decoder.wasm`, with a trailing slash. Defaults to the decoder
*   vendored alongside this package.
* @property {string} [workerPath] Path to `draco-worker.js` — a file, not a
*   directory, since bundlers emit it under a hashed name. Defaults to the
*   worker vendored alongside this package.
* @property {object} [transcodeConfig] Draco attribute mapping: `attributeIDs`,
*   `attributeTypes` (TypedArray constructor names) and `useUniqueIDs`. Set
*   `useUniqueIDs` for glTF-sourced buffers, which identify attributes by
*   unique ID rather than semantic name.
* @property {number} [workerLimit=4] Maximum number of concurrent decoder
*   workers.
*/
/**
* @typedef {object} DracoAttribute
* @property {import("./worker-pool.js").TypedArray} data
* @property {number} itemSize Components per element.
*/
/**
* Load a Draco file (.drc) or array buffer as geometry attributes.
*
* Decoding runs in a pool of workers and the geometry buffers are transferred
* back, not copied. Returns plain typed arrays: creating GPU buffers from them
* is left to the caller.
*
* @param {string | ArrayBuffer} urlOrArrayBuffer
* @param {DracoOptions} [options]
* @returns {Promise<Record<string, DracoAttribute>>} One entry per decoded
*   attribute, plus `indices` for meshes.
* @alias module:pex-loaders.loadDraco
*/
async function loadDraco(urlOrArrayBuffer, options = {}) {
	const { transcoderPath, workerPath, transcodeConfig = DEFAULT_TRANSCODE_CONFIG, workerLimit } = options;
	const buffer = urlOrArrayBuffer instanceof ArrayBuffer ? urlOrArrayBuffer : await loadArrayBuffer(urlOrArrayBuffer);
	const { geometry } = await getPool$1({
		transcoderPath,
		workerPath,
		workerLimit
	}).run({
		message: {
			type: "decode",
			taskConfig: transcodeConfig,
			buffer
		},
		transfer: [buffer],
		cost: buffer.byteLength,
		key: JSON.stringify(transcodeConfig),
		cacheKey: buffer
	});
	return geometry;
}

/**
* Creates a 'default' {@link KTX2Container} object, initialized with common
* configuration wfor BT709 primaries and sRGB transfer, without pixel data.
* There's nothing particularly special about the 'default' container; creating
* the KTX2Container object explicitly is also fine.
*/
function createDefaultContainer() {
	return {
		vkFormat: 0,
		typeSize: 1,
		pixelWidth: 0,
		pixelHeight: 0,
		pixelDepth: 0,
		layerCount: 0,
		faceCount: 1,
		levelCount: 0,
		supercompressionScheme: 0,
		levels: [],
		dataFormatDescriptor: [{
			vendorId: 0,
			descriptorType: 0,
			versionNumber: 2,
			colorModel: 0,
			colorPrimaries: 1,
			transferFunction: 2,
			flags: 0,
			texelBlockDimension: [
				0,
				0,
				0,
				0
			],
			bytesPlane: [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			],
			samples: []
		}],
		keyValue: {},
		globalData: null
	};
}
var BufferReader = class {
	_dataView;
	_littleEndian;
	_offset;
	constructor(data, byteOffset, byteLength, littleEndian) {
		this._dataView = new DataView(data.buffer, data.byteOffset + byteOffset, byteLength);
		this._littleEndian = littleEndian;
		this._offset = 0;
	}
	_nextUint8() {
		const value = this._dataView.getUint8(this._offset);
		this._offset += 1;
		return value;
	}
	_nextUint16() {
		const value = this._dataView.getUint16(this._offset, this._littleEndian);
		this._offset += 2;
		return value;
	}
	_nextUint32() {
		const value = this._dataView.getUint32(this._offset, this._littleEndian);
		this._offset += 4;
		return value;
	}
	_nextUint64() {
		const value = this._dataView.getUint32(this._offset, this._littleEndian) + 2 ** 32 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
		this._offset += 8;
		return value;
	}
	_nextInt32() {
		const value = this._dataView.getInt32(this._offset, this._littleEndian);
		this._offset += 4;
		return value;
	}
	_nextUint8Array(len) {
		const value = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._offset, len);
		this._offset += len;
		return value;
	}
	_skip(bytes) {
		this._offset += bytes;
		return this;
	}
	_scan(maxByteLength, term = 0) {
		const byteOffset = this._offset;
		let byteLength = 0;
		while (this._dataView.getUint8(this._offset) !== term && byteLength < maxByteLength) {
			byteLength++;
			this._offset++;
		}
		if (byteLength < maxByteLength) this._offset++;
		return new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + byteOffset, byteLength);
	}
};
const NUL = new Uint8Array([0]);
const KTX2_ID = [
	171,
	75,
	84,
	88,
	32,
	50,
	48,
	187,
	13,
	10,
	26,
	10
];
/** Decodes an ArrayBuffer to text. */
function decodeText(buffer) {
	return new TextDecoder().decode(buffer);
}
/**
* Parses a KTX 2.0 file, returning an unpacked {@link KTX2Container} instance with all associated
* data. Returned mip levels and other typed arrays are pointers into the source buffer, not
* deep copies — use caution if overwriting bytes of the source buffer later.
*
* @param data Bytes of KTX 2.0 file, as Uint8Array or Buffer.
*/
function read(data) {
	const bytes = data;
	const id = new Uint8Array(bytes.buffer, bytes.byteOffset, KTX2_ID.length);
	if (id[0] !== KTX2_ID[0] || id[1] !== KTX2_ID[1] || id[2] !== KTX2_ID[2] || id[3] !== KTX2_ID[3] || id[4] !== KTX2_ID[4] || id[5] !== KTX2_ID[5] || id[6] !== KTX2_ID[6] || id[7] !== KTX2_ID[7] || id[8] !== KTX2_ID[8] || id[9] !== KTX2_ID[9] || id[10] !== KTX2_ID[10] || id[11] !== KTX2_ID[11]) throw new Error("Missing KTX 2.0 identifier.");
	const container = createDefaultContainer();
	const headerByteLength = 17 * Uint32Array.BYTES_PER_ELEMENT;
	const headerReader = new BufferReader(bytes, KTX2_ID.length, headerByteLength, true);
	container.vkFormat = headerReader._nextUint32();
	container.typeSize = headerReader._nextUint32();
	container.pixelWidth = headerReader._nextUint32();
	container.pixelHeight = headerReader._nextUint32();
	container.pixelDepth = headerReader._nextUint32();
	container.layerCount = headerReader._nextUint32();
	container.faceCount = headerReader._nextUint32();
	container.levelCount = headerReader._nextUint32();
	container.supercompressionScheme = headerReader._nextUint32();
	const dfdByteOffset = headerReader._nextUint32();
	const dfdByteLength = headerReader._nextUint32();
	const kvdByteOffset = headerReader._nextUint32();
	const kvdByteLength = headerReader._nextUint32();
	const sgdByteOffset = headerReader._nextUint64();
	const sgdByteLength = headerReader._nextUint64();
	const levelByteLength = Math.max(container.levelCount, 1) * 3 * 8;
	const levelReader = new BufferReader(bytes, KTX2_ID.length + headerByteLength, levelByteLength, true);
	for (let i = 0, il = Math.max(container.levelCount, 1); i < il; i++) container.levels.push({
		levelData: new Uint8Array(bytes.buffer, bytes.byteOffset + levelReader._nextUint64(), levelReader._nextUint64()),
		uncompressedByteLength: levelReader._nextUint64()
	});
	const dfdReader = new BufferReader(bytes, dfdByteOffset, dfdByteLength, true);
	dfdReader._skip(4);
	const vendorId = dfdReader._nextUint16();
	const descriptorType = dfdReader._nextUint16();
	const versionNumber = dfdReader._nextUint16();
	const descriptorBlockSize = dfdReader._nextUint16();
	const dfd = {
		vendorId,
		descriptorType,
		versionNumber,
		colorModel: dfdReader._nextUint8(),
		colorPrimaries: dfdReader._nextUint8(),
		transferFunction: dfdReader._nextUint8(),
		flags: dfdReader._nextUint8(),
		texelBlockDimension: [
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8()
		],
		bytesPlane: [
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8(),
			dfdReader._nextUint8()
		],
		samples: []
	};
	const numSamples = (descriptorBlockSize / 4 - 6) / 4;
	for (let i = 0; i < numSamples; i++) {
		const sample = {
			bitOffset: dfdReader._nextUint16(),
			bitLength: dfdReader._nextUint8(),
			channelType: dfdReader._nextUint8(),
			samplePosition: [
				dfdReader._nextUint8(),
				dfdReader._nextUint8(),
				dfdReader._nextUint8(),
				dfdReader._nextUint8()
			],
			sampleLower: Number.NEGATIVE_INFINITY,
			sampleUpper: Number.POSITIVE_INFINITY
		};
		if (sample.channelType & 64) {
			sample.sampleLower = dfdReader._nextInt32();
			sample.sampleUpper = dfdReader._nextInt32();
		} else {
			sample.sampleLower = dfdReader._nextUint32();
			sample.sampleUpper = dfdReader._nextUint32();
		}
		dfd.samples[i] = sample;
	}
	container.dataFormatDescriptor.length = 0;
	container.dataFormatDescriptor.push(dfd);
	const kvdReader = new BufferReader(bytes, kvdByteOffset, kvdByteLength, true);
	while (kvdReader._offset < kvdByteLength) {
		const keyValueByteLength = kvdReader._nextUint32();
		const keyData = kvdReader._scan(keyValueByteLength);
		const key = decodeText(keyData);
		container.keyValue[key] = kvdReader._nextUint8Array(keyValueByteLength - keyData.byteLength - 1);
		if (key.match(/^ktx/i)) {
			const text = decodeText(container.keyValue[key]);
			container.keyValue[key] = text.substring(0, text.lastIndexOf("\0"));
		}
		const kvPadding = keyValueByteLength % 4 ? 4 - keyValueByteLength % 4 : 0;
		kvdReader._skip(kvPadding);
	}
	if (sgdByteLength <= 0) return container;
	const sgdReader = new BufferReader(bytes, sgdByteOffset, sgdByteLength, true);
	const endpointCount = sgdReader._nextUint16();
	const selectorCount = sgdReader._nextUint16();
	const endpointsByteLength = sgdReader._nextUint32();
	const selectorsByteLength = sgdReader._nextUint32();
	const tablesByteLength = sgdReader._nextUint32();
	const extendedByteLength = sgdReader._nextUint32();
	const imageDescs = [];
	for (let i = 0, il = Math.max(container.levelCount, 1); i < il; i++) imageDescs.push({
		imageFlags: sgdReader._nextUint32(),
		rgbSliceByteOffset: sgdReader._nextUint32(),
		rgbSliceByteLength: sgdReader._nextUint32(),
		alphaSliceByteOffset: sgdReader._nextUint32(),
		alphaSliceByteLength: sgdReader._nextUint32()
	});
	const endpointsByteOffset = sgdByteOffset + sgdReader._offset;
	const selectorsByteOffset = endpointsByteOffset + endpointsByteLength;
	const tablesByteOffset = selectorsByteOffset + selectorsByteLength;
	const extendedByteOffset = tablesByteOffset + tablesByteLength;
	container.globalData = {
		endpointCount,
		selectorCount,
		imageDescs,
		endpointsData: new Uint8Array(bytes.buffer, bytes.byteOffset + endpointsByteOffset, endpointsByteLength),
		selectorsData: new Uint8Array(bytes.buffer, bytes.byteOffset + selectorsByteOffset, selectorsByteLength),
		tablesData: new Uint8Array(bytes.buffer, bytes.byteOffset + tablesByteOffset, tablesByteLength),
		extendedData: new Uint8Array(bytes.buffer, bytes.byteOffset + extendedByteOffset, extendedByteLength)
	};
	return container;
}

let init;
let instance;
let heap;
const IMPORT_OBJECT = { env: { emscripten_notify_memory_growth: (_) => {
	heap = new Uint8Array(instance.exports.memory.buffer);
} } };
/**
* ZSTD (Zstandard) decoder.
*/
var ZSTDDecoder = class {
	init() {
		if (init) return init;
		if (typeof fetch !== "undefined") init = fetch(`data:application/wasm;base64,${wasm}`).then((response) => response.arrayBuffer()).then((arrayBuffer) => WebAssembly.instantiate(arrayBuffer, IMPORT_OBJECT)).then(this._init);
		else init = WebAssembly.instantiate(Buffer.from(wasm, "base64"), IMPORT_OBJECT).then(this._init);
		return init;
	}
	_init(result) {
		instance = result.instance;
		IMPORT_OBJECT.env.emscripten_notify_memory_growth(0);
	}
	decode(array, uncompressedSize = 0) {
		if (!instance) throw new Error("ZSTDDecoder: Await .init() before decoding.");
		const compressedSize = array.byteLength;
		const compressedPtr = instance.exports.malloc(compressedSize);
		heap.set(array, compressedPtr);
		uncompressedSize = uncompressedSize || Number(instance.exports.ZSTD_findDecompressedSize(compressedPtr, compressedSize));
		const uncompressedPtr = instance.exports.malloc(uncompressedSize);
		const actualSize = instance.exports.ZSTD_decompress(uncompressedPtr, uncompressedSize, compressedPtr, compressedSize);
		const dec = heap.slice(uncompressedPtr, uncompressedPtr + actualSize);
		instance.exports.free(compressedPtr);
		instance.exports.free(uncompressedPtr);
		return dec;
	}
};
/**
* BSD License
*
* For Zstandard software
*
* Copyright (c) 2016-present, Yann Collet, Facebook, Inc. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification,
* are permitted provided that the following conditions are met:
*
*  * Redistributions of source code must retain the above copyright notice, this
*    list of conditions and the following disclaimer.
*
*  * Redistributions in binary form must reproduce the above copyright notice,
*    this list of conditions and the following disclaimer in the documentation
*    and/or other materials provided with the distribution.
*
*  * Neither the name Facebook nor the names of its contributors may be used to
*    endorse or promote products derived from this software without specific
*    prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
* ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
* ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
* ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
const wasm = "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AikACDcACCAHIDo3AAAgEUEZSA0BIARBGGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgCkkNAAsMAQsCQAJAIAUoAswCIhEgBUHgAWogJUEHcUEMbGoiDygCACICaiIHIBxLDQAgCSAPKAIEIgogAmoiBmogG0sNACAGQSBqIBQgCWtNDQELIAUgDygCCDYCoAEgBSAPKQIANwOYASAJIBQgBUGYAWogBUHMAmogHCALIBcgIhAgIQYMAQsgAiAJaiEEIA8oAgghFSARKQAAITogCSARKQAINwAIIAkgOjcAAAJAIAJBEUkNACARKQAQITogCSARKQAYNwAYIAkgOjcAECACQRBrQRFIDQAgEUEQaiECIAlBIGohEgNAIAIpABAhOiASIAIpABg3AAggEiA6NwAAIAIpACAhOiASIAIpACg3ABggEiA6NwAQIAJBIGohAiASQSBqIhIgBEkNAAsLIAQgFWshAiAFIAc2AswCIAQgC2sgFUkEQCAVIAQgF2tLDQwgIiAiIAIgC2siD2oiByAKak8EQCAKRQ0CIAQgByAK/AoAAAwCC0EAIA9rIgIEQCAEIAcgAvwKAAALIAogD2ohCiAEIA9rIQQgCyECCyAVQRBPBEAgAikAACE6IAQgAikACDcACCAEIDo3AAAgCkERSA0BIAQgCmohByAEQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAELAkAgFUEHTQRAIAQgAi0AADoAACAEIAItAAE6AAEgBCACLQACOgACIAQgAi0AAzoAAyAEIAIgFUECdCIHQeAaaigCAGoiAigAADYABCACIAdBgBtqKAIAayECDAELIAQgAikAADcAAAsgCkEJSQ0AIAQgCmohDyAEQQhqIgcgAkEIaiICa0EPTARAA0AgByACKQAANwAAIAJBCGohAiAHQQhqIgcgD0kNAAwCCwALIAIpAAAhOiAHIAIpAAg3AAggByA6NwAAIApBGUgNACAEQRhqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIA9JDQALCyAGQYh/SwRAIAYhAwwLCyAFQeABaiAlQQdxQQxsaiICIA02AgggAiAMNgIEIAIgEDYCAAsgBiAJaiEJICVBAWohJSAQIC1qIAxqIS0MAQsLIAUoArABIAUoArQBRw0HIAUoAqwBQSBHDQcgDiAoayEQA0ACQCAOIBBMBEBBACECA0AgAkEDRg0CIDIgAkECdCIDaiADICZqKAIANgIAIAJBAWohAgwACwALIAVB4AFqIBBBB3FBDGxqIQoCfwJAIAgoAoTsAUECRgRAIAUoAswCIg8gCigCACIEaiIHIAgoAoDsASICSwRAIAIgD0cEQCACIA9rIgIgFCAJa0sNCyAJIA8gAhAfIAogBCACayIENgIAIAIgCWohCQsgBSAWNgLMAiAIQQA2AoTsAQJAAkACQCAEQYCABEoNACAJIAooAgQiDSAEaiIGaiAbSw0AIAZBIGogFCAJa00NAQsgBSAKKAIINgJQIAUgCikCADcDSCAJIBQgBUHIAGogBUHMAmogGSALIBcgIhAgIQYMAQsgBCAWaiEHIAQgCWohDCAKKAIIIQogFikAACE6IAkgFikACDcACCAJIDo3AAACQCAEQRFJDQAgHikAACE6IAkgHikACDcAGCAJIDo3ABAgBEEQa0ERSA0AIAlBIGohAiAeIQQDQCAEKQAQITogAiAEKQAYNwAIIAIgOjcAACAEKQAgITogAiAEKQAoNwAYIAIgOjcAECAEQSBqIQQgAkEgaiICIAxJDQALCyAMIAprIQIgBSAHNgLMAiAMIAtrIApJBEAgCiAMIBdrSw0PICIgIiACIAtrIgdqIgQgDWpPBEAgDUUNAiAMIAQgDfwKAAAMAgtBACAHayICBEAgDCAEIAL8CgAACyAHIA1qIQ0gDCAHayEMIAshAgsgCkEQTwRAIAIpAAAhOiAMIAIpAAg3AAggDCA6NwAAIA1BEUgNASAMIA1qIQcgDEEQaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwwBCwJAIApBB00EQCAMIAItAAA6AAAgDCACLQABOgABIAwgAi0AAjoAAiAMIAItAAM6AAMgDCACIApBAnQiBEHgGmooAgBqIgIoAAA2AAQgAiAEQYAbaigCAGshAgwBCyAMIAIpAAA3AAALIA1BCUkNACAMIA1qIQcgDEEIaiIEIAJBCGoiAmtBD0wEQANAIAQgAikAADcAACACQQhqIQIgBEEIaiIEIAdJDQAMAgsACyACKQAAITogBCACKQAINwAIIAQgOjcAACANQRlIDQAgDEEYaiEEA0AgAikAECE6IAQgAikAGDcACCAEIDo3AAAgAikAICE6IAQgAikAKDcAGCAEIDo3ABAgAkEgaiECIARBIGoiBCAHSQ0ACwsgBkGJf08EQCAGIQMMDgsgGSEcIAYgCWoMAwsgB0EgayECAkACQCAHIBxLDQAgCSAKKAIEIhIgBGoiDGogAksNACAMQSBqIBQgCWtNDQELIAUgCigCCDYCYCAFIAopAgA3A1ggCSAUIAIgBUHYAGogBUHMAmogHCALIBcgIhAhIQwMAgsgBCAJaiEGIAooAgghCiAPKQAAITogCSAPKQAINwAIIAkgOjcAAAJAIARBEUkNACAPKQAQITogCSAPKQAYNwAYIAkgOjcAECAEQRBrQRFIDQAgD0EQaiECIAlBIGohBANAIAIpABAhOiAEIAIpABg3AAggBCA6NwAAIAIpACAhOiAEIAIpACg3ABggBCA6NwAQIAJBIGohAiAEQSBqIgQgBkkNAAsLIAYgCmshAiAFIAc2AswCIAYgC2sgCkkEQCAKIAYgF2tLDQ0gIiAiIAIgC2siB2oiBCASak8EQCASRQ0DIAYgBCAS/AoAAAwDC0EAIAdrIgIEQCAGIAQgAvwKAAALIAcgEmohEiAGIAdrIQYgCyECCyAKQRBPBEAgAikAACE6IAYgAikACDcACCAGIDo3AAAgEkERSA0CIAYgEmohByAGQRBqIQQDQCACKQAQITogBCACKQAYNwAIIAQgOjcAACACKQAgITogBCACKQAoNwAYIAQgOjcAECACQSBqIQIgBEEgaiIEIAdJDQALDAILAkAgCkEHTQRAIAYgAi0AADoAACAGIAItAAE6AAEgBiACLQACOgACIAYgAi0AAzoAAyAGIAIgCkECdCIEQeAaaigCAGoiAigAADYABCACIARBgBtqKAIAayECDAELIAYgAikAADcAAAsgEkEJSQ0BIAYgEmohByAGQQhqIgQgAkEIaiICa0EPTARAA0AgBCACKQAANwAAIAJBCGohAiAE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";

const WORKER_URL = new URL("assets/basis-worker-BAC--lch.js", import.meta.url);
const TRANSCODER_URL = new URL("assets/basis_transcoder-hUMjzRyR.js", import.meta.url);
const WASM_URL = new URL("assets/basis_transcoder-Cs4NvtKU.wasm", import.meta.url);
/**
* Basis Universal source encodings.
*
* @readonly
* @enum {number}
*/
const BasisFormat = {
	ETC1S: 0,
	UASTC_4x4: 1
};
const pools = /* @__PURE__ */ new Map();
const resolve = (path, fallback) => path ? new URL(path, globalThis.location?.href).href : fallback.href;
const deviceFeatures = (ctx) => ({
	bc: ctx.device.features.has("texture-compression-bc"),
	etc2: ctx.device.features.has("texture-compression-etc2"),
	astc: ctx.device.features.has("texture-compression-astc")
});
function getPool({ transcoderPath, workerPath, workerLimit, features }) {
	const poolKey = `${transcoderPath ?? ""}|${workerPath ?? ""}|${workerLimit ?? ""}|${features.bc}${features.etc2}${features.astc}`;
	let pool = pools.get(poolKey);
	if (pool) return pool;
	const workerUrl = resolve(workerPath, WORKER_URL);
	const transcoderUrl = resolve(transcoderPath && `${transcoderPath}basis_transcoder.js`, TRANSCODER_URL);
	const wasmUrl = resolve(transcoderPath && `${transcoderPath}basis_transcoder.wasm`, WASM_URL);
	let wasmPending;
	pool = new WorkerPool({
		workerLimit,
		createWorker: async () => {
			wasmPending ??= loadArrayBuffer(wasmUrl);
			const worker = new Worker(workerUrl);
			worker.postMessage({
				type: "init",
				config: {
					transcoderUrl,
					wasmBinary: await wasmPending,
					features
				}
			});
			return worker;
		}
	});
	pools.set(poolKey, pool);
	return pool;
}
/**
* @typedef {object} BasisOptions
* @property {string} [transcoderPath] Directory holding `basis_transcoder.js`
*   and `basis_transcoder.wasm`, with a trailing slash. Defaults to the
*   transcoder vendored alongside this package.
* @property {string} [workerPath] Path to `basis-worker.js` — a file, not a
*   directory, since bundlers emit it under a hashed name. Defaults to the
*   worker vendored alongside this package.
* @property {"srgb" | "linear"} [colorSpace="linear"] Selects the `-srgb`
*   variant of the transcode target. Colour textures generally want "srgb";
*   normal/roughness maps want "linear".
* @property {object} [transcodeConfig] Low-level transcode descriptor, supplied
*   by {@link module:pex-loaders.loadKtx2} for KTX2 containers. Omit for
*   standalone `.basis` files.
* @property {number} [workerLimit=4] Maximum number of concurrent transcoder
*   workers.
*/
/**
* @typedef {object} BasisLevel
* @property {Uint8Array} data Transcoded bytes for one mip level.
* @property {number} width
* @property {number} height
*/
/**
* @typedef {object} BasisResult
* @property {number} width
* @property {number} height
* @property {GPUTextureFormat} format WebGPU format the levels are encoded in.
* @property {boolean} hasAlpha
* @property {BasisLevel[]} levels Mip chain, largest first.
*/
/**
* Transcode a basis file, array buffer, or pre-parsed KTX2 payload into mip
* levels, without creating a GPU texture.
*
* The transcode target is chosen from the device's compressed-texture features
* — ASTC, then BC7, then ETC2, then BC1/BC3 — falling back to uncompressed
* `rgba8unorm` when none are available.
*
* @param {import("pex-gpu").GpuContext} ctx
* @param {string | ArrayBuffer | ArrayBuffer[]} urlOrArrayBuffer
* @param {BasisOptions} [options]
* @returns {Promise<BasisResult>}
* @alias module:pex-loaders.transcodeBasis
*/
async function transcodeBasis(ctx, urlOrArrayBuffer, options = {}) {
	const { transcoderPath, workerPath, workerLimit, colorSpace = "linear", transcodeConfig } = options;
	const buffers = Array.isArray(urlOrArrayBuffer) ? urlOrArrayBuffer : urlOrArrayBuffer instanceof ArrayBuffer ? [urlOrArrayBuffer] : [await loadArrayBuffer(urlOrArrayBuffer)];
	const taskConfig = {
		colorSpace,
		...transcodeConfig
	};
	const { globalData, levels, ...taskConfigForCache } = taskConfig;
	const { type, id, ...result } = await getPool({
		transcoderPath,
		workerPath,
		workerLimit,
		features: deviceFeatures(ctx)
	}).run({
		message: {
			type: "decode",
			taskConfig,
			buffers
		},
		transfer: buffers,
		cost: buffers.reduce((total, { byteLength }) => total + byteLength, 0),
		key: JSON.stringify(taskConfigForCache),
		cacheKey: buffers[0]
	});
	return result;
}

let zstd;
let zstdPending;
const KTX2ChannelETC1S = {
	RGB: 0,
	RRR: 3,
	GGG: 4,
	AAA: 15
};
const KTX2ChannelUASTC = {
	RGB: 0,
	RGBA: 3,
	RRR: 4,
	RRRG: 5
};
const getAlpha = ({ colorModel, samples }) => {
	if (colorModel === 166) return (samples[0].channelType & 15) === KTX2ChannelUASTC.RGBA;
	return samples.length === 2 && (samples[1].channelType & 15) === KTX2ChannelETC1S.AAA;
};
/**
* @typedef {object} Ktx2Options
* @property {import("./basis.js").BasisOptions} [basisOptions={}] Forwarded to
*   the Basis transcoder. `colorSpace` is taken from the container's transfer
*   function and cannot be overridden here.
*/
/**
* @typedef {object} Ktx2Result
* @property {number} width
* @property {number} height
* @property {GPUTextureFormat} format
* @property {boolean} hasAlpha
* @property {import("./basis.js").BasisLevel[]} levels
* @property {boolean} premultipliedAlpha Whether RGB is already scaled by
*   alpha. WebGPU has no premultiply step for raw uploads, so honouring this is
*   left to the renderer.
*/
/**
* Transcode a ktx2 file or array buffer into mip levels, without creating a GPU
* texture.
*
* Handles Basis-compressed payloads (UASTC and ETC1S), optionally
* zstd-supercompressed. 3D, array and cube textures are not supported yet.
*
* - KTX: https://registry.khronos.org/KTX/specs/2.0/ktxspec.v2.html
* - DFD:
*   https://registry.khronos.org/DataFormat/specs/1.3/dataformat.1.3.html#basicdescriptor
*
* @param {import("pex-gpu").GpuContext} ctx
* @param {string | ArrayBuffer} urlOrArrayBuffer
* @param {Ktx2Options} [options]
* @returns {Promise<Ktx2Result>}
* @alias module:pex-loaders.transcodeKtx2
*/
async function transcodeKtx2(ctx, urlOrArrayBuffer, { basisOptions = {} } = {}) {
	const buffer = urlOrArrayBuffer instanceof ArrayBuffer ? urlOrArrayBuffer : await loadArrayBuffer(urlOrArrayBuffer);
	const ktx = read(new Uint8Array(buffer));
	if (ktx.pixelDepth > 0) throw new Error("pex-loaders: loadKtx2 only supports 2D textures.");
	if (ktx.layerCount > 1) throw new Error("pex-loaders: loadKtx2 does not support array textures.");
	if (ktx.faceCount > 1) throw new Error("pex-loaders: loadKtx2 does not support cube textures.");
	const isZstd = ktx.supercompressionScheme === 2;
	if (isZstd) {
		zstd ??= new ZSTDDecoder();
		zstdPending ??= zstd.init();
		await zstdPending;
	}
	const { pixelWidth: width, pixelHeight: height } = ktx;
	const levels = ktx.levels.map((level, index) => ({
		index,
		width: Math.max(1, width >> index),
		height: Math.max(1, height >> index),
		data: isZstd ? zstd.decode(level.levelData, level.uncompressedByteLength) : level.levelData
	}));
	const dfd = ktx.dataFormatDescriptor[0];
	const basisFormat = dfd.colorModel === 166 ? BasisFormat.UASTC_4x4 : BasisFormat.ETC1S;
	const transcodeConfig = {
		levels,
		width,
		height,
		basisFormat,
		hasAlpha: getAlpha(dfd),
		lowLevel: true,
		...basisFormat === BasisFormat.ETC1S && { globalData: ktx.globalData }
	};
	return {
		...await transcodeBasis(ctx, [...new Set(levels.map((level) => level.data.buffer))], {
			...basisOptions,
			colorSpace: dfd.transferFunction === 2 ? "srgb" : "linear",
			transcodeConfig
		}),
		premultipliedAlpha: !!(dfd.flags & 1)
	};
}

const GL_NEAREST = 9728;
const GL_NEAREST_MIPMAP_NEAREST = 9984;
const GL_LINEAR_MIPMAP_NEAREST = 9985;
const GL_NEAREST_MIPMAP_LINEAR = 9986;
const GL_CLAMP_TO_EDGE = 33071;
const GL_MIRRORED_REPEAT = 33648;
const loadImageBitmap = async (blob) => await createImageBitmap(blob, {
	premultiplyAlpha: "none",
	colorSpaceConversion: "none"
});
const loadCrossOriginImage = (url) => loadImage({
	url,
	crossOrigin: "anonymous"
});
function magFilterToWebGPU(glFilter) {
	return glFilter === GL_NEAREST ? "nearest" : "linear";
}
function minFilterToWebGPU(glFilter) {
	switch (glFilter) {
		case GL_NEAREST: return {
			minFilter: "nearest",
			mipmapFilter: "nearest",
			hasMipmap: false
		};
		case GL_NEAREST_MIPMAP_NEAREST: return {
			minFilter: "nearest",
			mipmapFilter: "nearest",
			hasMipmap: true
		};
		case GL_LINEAR_MIPMAP_NEAREST: return {
			minFilter: "linear",
			mipmapFilter: "nearest",
			hasMipmap: true
		};
		case GL_NEAREST_MIPMAP_LINEAR: return {
			minFilter: "nearest",
			mipmapFilter: "linear",
			hasMipmap: true
		};
		default: return {
			minFilter: "linear",
			mipmapFilter: "linear",
			hasMipmap: true
		};
	}
}
function wrapToWebGPU(glWrap) {
	switch (glWrap) {
		case GL_CLAMP_TO_EDGE: return "clamp-to-edge";
		case GL_MIRRORED_REPEAT: return "mirror-repeat";
		default: return "repeat";
	}
}
const KTX2_MIME = "image/ktx2";
const isKtx2 = (image) => image.mimeType === KTX2_MIME || typeof image.uri === "string" && image.uri.split("?", 1)[0].endsWith(".ktx2");
/**
* Decodes every glTF image (bufferView-embedded, data URI, or external file)
* into `image._img`, ready for texture upload.
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/image.schema.json
*/
async function resolveImages(json, options) {
	if (!json.images) return;
	const bufferViews = json.bufferViews ?? [];
	const buffers = json.buffers ?? [];
	await Promise.all(json.images.map(async (image) => {
		if (isKtx2(image)) {
			if (!options.ctx) {
				console.warn("glTF loader: KHR_texture_basisu image skipped (resolveImages needs a ctx to pick a transcode target).");
				return;
			}
			const buffer = image.bufferView === void 0 ? await loadArrayBuffer(decodeURIComponent([options.basePath, image.uri].join("/"))) : bufferViews[image.bufferView]._data;
			image._ktx2 = await transcodeKtx2(options.ctx, buffer);
			return;
		}
		if (image.bufferView !== void 0) {
			const bufferView = bufferViews[image.bufferView];
			bufferView.byteOffset = bufferView.byteOffset || 0;
			const data = buffers[bufferView.buffer]._data.slice(bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength);
			const blob = new Blob([data], { type: image.mimeType ?? "" });
			image._img = options.supportImageBitmap ? await loadImageBitmap(blob) : await loadCrossOriginImage(URL.createObjectURL(blob));
		} else if (image.uri !== void 0 && isBase64(image.uri)) image._img = await loadCrossOriginImage(image.uri);
		else {
			const url = decodeURIComponent([options.basePath, image.uri].join("/"));
			image._img = options.supportImageBitmap ? await loadImageBitmap(await loadBlob(url, { mode: "cors" })) : await loadCrossOriginImage(url);
		}
	}));
}
/**
* Picks the image a texture should load from.
*
* Extensions each nominate their own image, replacing `texture.source` — which
* a required extension may omit entirely, since there is then no fallback to
* describe. KHR_texture_basisu wins over EXT_texture_webp when both are
* present: it stays GPU-compressed, where webp decodes to RGBA like any other
* image.
*/
function resolveTextureSource(texture) {
	const basisu = texture.extensions?.KHR_texture_basisu;
	const webp = texture.extensions?.EXT_texture_webp;
	return basisu?.source ?? webp?.source ?? texture.source;
}
/**
* Resolves a glTF textureInfo (`{ index, texCoord, extensions }`) into a
* MaterialTexture: the GPU texture is uploaded once per glTF texture index and
* cached on the texture object (`texture._tex`) — reused across every material
* field that references it. If two fields reference the same texture index
* requesting different pixelFormats (e.g. one sRGB, one linear), the first
* requested format wins; this mirrors the previous WebGL loader's behavior.
*
* Returns undefined when no image source is usable, so the material simply
* renders without that map rather than failing the whole load.
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/textureInfo.schema.json
*/
function resolveTexture(materialTexture, gltf, ctx, samplerCache, pixelFormat) {
	const { textures = [], images = [], samplers } = gltf;
	const texture = textures[materialTexture.index];
	const source = resolveTextureSource(texture);
	if (source === void 0) {
		console.warn(`glTF loader: texture ${materialTexture.index} has no image source this loader supports (extensions: ${Object.keys(texture.extensions ?? {}).join(", ") || "none"}).`);
		return;
	}
	const image = images[source];
	const samplerDef = texture.sampler === void 0 ? void 0 : samplers?.[texture.sampler];
	const label = image.uri || image.name || "glTF image";
	if (!texture._tex) {
		const { minFilter, mipmapFilter, hasMipmap } = minFilterToWebGPU(samplerDef?.minFilter);
		const { _ktx2: ktx2, _img: decoded } = image;
		if (ktx2) texture._tex = createTexture(ctx, {
			label,
			width: ktx2.width,
			height: ktx2.height,
			format: ktx2.format,
			mipLevels: ktx2.levels.map((level) => level.data)
		});
		else if (decoded) texture._tex = createTexture(ctx, {
			label,
			data: decoded,
			format: pixelFormat ?? "rgba8unorm",
			mipmap: hasMipmap
		});
		else {
			console.warn(`glTF loader: image ${source} was never decoded (a KHR_texture_basisu payload resolveImages had no ctx for, or a failed load).`);
			return;
		}
		if (texture.sampler !== void 0 && !samplerCache.has(texture.sampler)) {
			const magFilter = magFilterToWebGPU(samplerDef?.magFilter);
			const allLinear = hasMipmap && magFilter === "linear" && minFilter === "linear" && mipmapFilter === "linear";
			samplerCache.set(texture.sampler, createSampler(ctx, {
				magFilter,
				minFilter,
				mipmapFilter,
				addressModeU: wrapToWebGPU(samplerDef?.wrapS),
				addressModeV: wrapToWebGPU(samplerDef?.wrapT),
				...allLinear && { maxAnisotropy: 16 }
			}));
		}
	}
	const sampler = texture.sampler === void 0 ? void 0 : samplerCache.get(texture.sampler);
	const textureTransform = materialTexture.extensions?.KHR_texture_transform;
	const texCoord = materialTexture.texCoord;
	if (texCoord || textureTransform || sampler) return {
		texture: texture._tex,
		...sampler && { sampler },
		...textureTransform,
		texCoord: (textureTransform?.texCoord ?? texCoord) === 1 ? 1 : 0,
		...textureTransform?.rotation !== void 0 && { rotation: -textureTransform.rotation }
	};
	return texture._tex;
}

/**
* Resolves a glTF node's local transform, decomposing `matrix` into TRS when
* present.
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/node.schema.json
*/
function resolveNodeTransform(node) {
	if (node.matrix) {
		const mn = create$1();
		const matrix = node.matrix;
		const scale = [
			Math.hypot(matrix[0], matrix[1], matrix[2]),
			Math.hypot(matrix[4], matrix[5], matrix[6]),
			Math.hypot(matrix[8], matrix[9], matrix[10])
		];
		for (const col of [
			0,
			1,
			2
		]) {
			mn[col] = matrix[col] / scale[0];
			mn[col + 4] = matrix[col + 4] / scale[1];
			mn[col + 8] = matrix[col + 8] / scale[2];
		}
		return {
			position: [
				node.matrix[12],
				node.matrix[13],
				node.matrix[14]
			],
			rotation: Array.from(fromMat4(create$2(), mn)),
			scale
		};
	}
	return {
		position: node.translation || [
			0,
			0,
			0
		],
		rotation: node.rotation || [
			0,
			0,
			0,
			1
		],
		scale: node.scale || [
			1,
			1,
			1
		]
	};
}

/**
* Resolves a glTF camera definition into a generic camera data object.
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/camera.schema.json
*/
function resolveCamera(camera, ctx) {
	if (camera.type === "orthographic") return {
		name: camera.name,
		projection: "orthographic",
		near: camera.orthographic.znear,
		far: camera.orthographic.zfar,
		left: -camera.orthographic.xmag,
		right: camera.orthographic.xmag,
		top: camera.orthographic.ymag,
		bottom: -camera.orthographic.ymag
	};
	return {
		name: camera.name,
		projection: "perspective",
		near: camera.perspective.znear,
		far: camera.perspective.zfar ?? Infinity,
		fov: camera.perspective.yfov,
		aspect: camera.perspective.aspectRatio ?? ctx.width / ctx.height
	};
}

/**
* Resolves a KHR_lights_punctual light definition, caching the result on the
* light object.
* https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_lights_punctual
*/
function resolveLight(light) {
	if (light._resolved) return light._resolved;
	light._resolved = {
		type: light.type,
		name: light.name,
		color: light.color ?? [
			1,
			1,
			1
		],
		intensity: light.intensity ?? 1,
		...(light.type === "point" || light.type === "spot") && { range: light.range },
		...light.type === "spot" && {
			innerConeAngle: light.spot?.innerConeAngle ?? 0,
			outerConeAngle: light.spot?.outerConeAngle ?? Math.PI / 4
		}
	};
	return light._resolved;
}

/**
* Resolves a glTF accessor's data into a typed array (`accessor._data`),
* caching the result on the accessor object. Handles bufferView byteStride
* mismatches and sparse accessors.
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/accessor.schema.json
*/
function getAccessor(source, bufferViews) {
	const accessor = source;
	if (accessor._data) return accessor;
	const numberOfComponents = GLTF_ACCESSOR_TYPE_COMPONENTS_NUMBER[accessor.type];
	if (accessor.byteOffset === void 0) accessor.byteOffset = 0;
	accessor._bufferView = bufferViews[accessor.bufferView];
	const TypedArrayConstructor = WEBGL_TYPED_ARRAY_BY_COMPONENT_TYPES[accessor.componentType];
	const itemBytes = GLTF_ACCESSOR_COMPONENT_TYPE_SIZE[accessor.componentType] * numberOfComponents;
	const byteStride = accessor._bufferView.byteStride;
	if (byteStride && byteStride !== itemBytes) {
		accessor._data = new TypedArrayConstructor(accessor.count * numberOfComponents);
		for (let i = 0; i < accessor.count; i++) accessor._data.set(new TypedArrayConstructor(accessor._bufferView._data, accessor.byteOffset + i * byteStride, numberOfComponents), i * numberOfComponents);
	} else accessor._data = new TypedArrayConstructor(accessor._bufferView._data, accessor.byteOffset, accessor.count * numberOfComponents);
	if (accessor.sparse !== void 0) {
		const TypedArrayIndicesConstructor = WEBGL_TYPED_ARRAY_BY_COMPONENT_TYPES[accessor.sparse.indices.componentType];
		const sparseIndices = new TypedArrayIndicesConstructor(bufferViews[accessor.sparse.indices.bufferView]._data, accessor.sparse.indices.byteOffset || 0, accessor.sparse.count);
		const sparseValues = new TypedArrayConstructor(bufferViews[accessor.sparse.values.bufferView]._data, accessor.sparse.values.byteOffset || 0, accessor.sparse.count * numberOfComponents);
		if (accessor._data !== null) accessor._data = accessor._data.slice();
		let valuesIndex = 0;
		for (let indicesIndex = 0; indicesIndex < sparseIndices.length; indicesIndex++) {
			let dataIndex = sparseIndices[indicesIndex] * numberOfComponents;
			for (let componentIndex = 0; componentIndex < numberOfComponents; componentIndex++) accessor._data[dataIndex++] = sparseValues[valuesIndex++];
		}
	}
	return accessor;
}

/**
* Resolves a glTF skin's inverse bind matrices. `joints` stays as raw node
* indices — resolving them to entities is loaders/glTF/pex-renderer.ts's job.
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/skin.schema.json
*/
function resolveSkin(skin, gltf) {
	const data = getAccessor(gltf.accessors[skin.inverseBindMatrices], gltf.bufferViews)._data;
	const inverseBindMatrices = [];
	for (let i = 0; i < data.length; i += 16) inverseBindMatrices.push(data.slice(i, i + 16));
	return {
		jointNodeIndices: skin.joints,
		inverseBindMatrices
	};
}

/**
* Resolves an animation's channels/samplers into per-keyframe output arrays.
* `weights` channels group output values by the target mesh's declared morph
* target count (from the glTF document, not from any built entity).
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/animation.schema.json
*/
function resolveAnimation(animation, gltf, index) {
	const accessors = gltf.accessors;
	const bufferViews = gltf.bufferViews;
	const channels = animation.channels.map((channel) => {
		const sampler = animation.samplers[channel.sampler];
		const input = getAccessor(accessors[sampler.input], bufferViews);
		const output = getAccessor(accessors[sampler.output], bufferViews);
		const targetNode = gltf.nodes[channel.target.node];
		const outputValues = output.normalized ? normalizeData(output._data) : output._data;
		const stride = channel.target.path === "weights" ? gltf.meshes[targetNode.mesh].weights?.length ?? 1 : GLTF_ACCESSOR_TYPE_COMPONENTS_NUMBER[output.type];
		const outputData = [];
		for (let i = 0; i < outputValues.length; i += stride) outputData.push(Array.from(outputValues.slice(i, i + stride)));
		return {
			input: input._data,
			output: outputData,
			interpolation: sampler.interpolation ?? "LINEAR",
			targetNodeIndex: channel.target.node,
			path: channel.target.path
		};
	});
	const duration = channels.reduce((duration, { input }) => Math.max(duration, input.at(-1) ?? 0), 0);
	return {
		name: animation.name || `Animation ${index}`,
		duration,
		channels
	};
}

/**
* @module typedArrayInterleave
*/
/**
* Interleave n typed arrays
*
* @alias module:typedArrayInterleave
* @param {TypedArray} ResultConstructor Returned typed array constructor
* @param {Array} elements Number of elements to group for each typed array
* @param {...TypedArray} arrays Arrays to interleave
* @returns {TypedArray}
*/
function typedArrayInterleave(ResultConstructor, elements, ...arrays) {
	const totalLength = arrays.reduce((total, arr) => total + arr.length, 0);
	const result = new ResultConstructor(totalLength);
	const stride = elements.reduce((a, b) => a + b);
	for (let i = 0; i < totalLength; i++) {
		let offset = 0;
		for (let j = 0; j < elements.length; j++) for (let k = 0; k < elements[j]; k++) {
			result[i * stride + offset] = arrays[j][elements[j] * i + k];
			offset++;
		}
	}
	return result;
}

/**
* Decodes a Draco-compressed primitive into its geometry attributes, keyed by
* glTF attribute semantic name (e.g. "POSITION", "NORMAL") to stay consistent
* with the uncompressed path.
* https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
*/
async function resolveDracoPrimitive(primitive, bufferViews, accessors, options = {}) {
	const dracoExt = primitive.extensions?.KHR_draco_mesh_compression;
	if (!dracoExt) return null;
	const bufferView = bufferViews[dracoExt.bufferView];
	const gltfAttributeMap = dracoExt.attributes;
	const attributeIDs = {};
	const attributeTypes = {};
	const normalizedAttributes = [];
	for (const name in gltfAttributeMap) attributeIDs[name] = gltfAttributeMap[name];
	for (const name in primitive.attributes) {
		if (gltfAttributeMap[name] === void 0) continue;
		const accessor = accessors[primitive.attributes[name]];
		attributeTypes[name] = WEBGL_TYPED_ARRAY_BY_COMPONENT_TYPES[accessor.componentType].name;
		if (accessor.normalized === true) normalizedAttributes.push(name);
	}
	try {
		const geometry = await loadDraco(bufferView._data, {
			transcodeConfig: {
				attributeIDs,
				attributeTypes,
				useUniqueIDs: true
			},
			...options.dracoOptions
		});
		for (const name of normalizedAttributes) {
			const attribute = geometry[name];
			if (attribute) attribute.data = normalizeData(attribute.data);
		}
		if (geometry.JOINTS_0) {
			const componentBytes = geometry.JOINTS_0.data.BYTES_PER_ELEMENT;
			geometry.JOINTS_0.format = componentBytes === 1 ? "uint8x4" : "uint16x4";
			geometry.JOINTS_0.arrayStride = componentBytes * 4;
		}
		return geometry;
	} catch (error) {
		console.warn("glTF loader: error decoding Draco geometry, falling back to uncompressed.", error);
		return null;
	}
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_clearcoat#clearcoat */
function resolveClearcoat(material, gltf, ctx, samplerCache) {
	const ext = material.extensions?.KHR_materials_clearcoat;
	if (!ext) return null;
	const result = {
		clearcoatFactor: ext.clearcoatFactor ?? 0,
		clearcoatRoughnessFactor: ext.clearcoatRoughnessFactor ?? 0
	};
	if (ext.clearcoatTexture) result.clearcoatTexture = resolveTexture(ext.clearcoatTexture, gltf, ctx, samplerCache);
	if (ext.clearcoatRoughnessTexture) result.clearcoatRoughnessTexture = resolveTexture(ext.clearcoatRoughnessTexture, gltf, ctx, samplerCache);
	if (ext.clearcoatNormalTexture) {
		result.clearcoatNormalTexture = resolveTexture(ext.clearcoatNormalTexture, gltf, ctx, samplerCache);
		result.clearcoatNormalTextureScale = ext.clearcoatNormalTexture.scale ?? 1;
	}
	return result;
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_sheen#sheen */
function resolveSheen(material, gltf, ctx, samplerCache) {
	const ext = material.extensions?.KHR_materials_sheen;
	if (!ext) return null;
	const result = {
		sheenColorFactor: ext.sheenColorFactor ?? [
			0,
			0,
			0
		],
		sheenRoughnessFactor: ext.sheenRoughnessFactor ?? 0
	};
	if (ext.sheenColorTexture) result.sheenColorTexture = resolveTexture(ext.sheenColorTexture, gltf, ctx, samplerCache, "rgba8unorm-srgb");
	if (ext.sheenRoughnessTexture && ext.sheenColorTexture?.index !== ext.sheenRoughnessTexture.index) result.sheenRoughnessTexture = resolveTexture(ext.sheenRoughnessTexture, gltf, ctx, samplerCache);
	return result;
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_transmission */
function resolveTransmission(material, gltf, ctx, samplerCache) {
	const ext = material.extensions?.KHR_materials_transmission;
	if (!ext) return null;
	const result = { transmissionFactor: ext.transmissionFactor ?? 0 };
	if (ext.transmissionTexture) result.transmissionTexture = resolveTexture(ext.transmissionTexture, gltf, ctx, samplerCache);
	return result;
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_diffuse_transmission */
function resolveDiffuseTransmission(material, gltf, ctx, samplerCache) {
	const ext = material.extensions?.KHR_materials_diffuse_transmission;
	if (!ext) return null;
	const result = {
		diffuseTransmissionFactor: ext.diffuseTransmissionFactor ?? 0,
		diffuseTransmissionColorFactor: ext.diffuseTransmissionColorFactor ?? [
			1,
			1,
			1
		]
	};
	if (ext.diffuseTransmissionTexture) result.diffuseTransmissionTexture = resolveTexture(ext.diffuseTransmissionTexture, gltf, ctx, samplerCache);
	if (ext.diffuseTransmissionColorTexture) result.diffuseTransmissionColorTexture = resolveTexture(ext.diffuseTransmissionColorTexture, gltf, ctx, samplerCache, "rgba8unorm-srgb");
	return result;
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_volume */
function resolveVolume(material, gltf, ctx, samplerCache) {
	const ext = material.extensions?.KHR_materials_volume;
	if (!ext) return null;
	const result = {
		thicknessFactor: ext.thicknessFactor ?? 0,
		attenuationDistance: ext.attenuationDistance ?? Infinity,
		attenuationColor: ext.attenuationColor ?? [
			1,
			1,
			1
		]
	};
	if (ext.thicknessTexture) result.thicknessTexture = resolveTexture(ext.thicknessTexture, gltf, ctx, samplerCache);
	return result;
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_dispersion */
function resolveDispersion(material) {
	const ext = material.extensions?.KHR_materials_dispersion;
	return ext ? { dispersion: ext.dispersion ?? 0 } : null;
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_ior */
function resolveIor(material) {
	const ext = material.extensions?.KHR_materials_ior;
	return ext ? { ior: ext.ior ?? 1.5 } : null;
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_specular */
function resolveSpecular(material, gltf, ctx, samplerCache) {
	const ext = material.extensions?.KHR_materials_specular;
	if (!ext) return null;
	const result = {
		specularFactor: ext.specularFactor ?? 1,
		specularColorFactor: ext.specularColorFactor ?? [
			1,
			1,
			1
		]
	};
	if (ext.specularTexture) result.specularTexture = resolveTexture(ext.specularTexture, gltf, ctx, samplerCache);
	if (ext.specularColorTexture) result.specularColorTexture = resolveTexture(ext.specularColorTexture, gltf, ctx, samplerCache, "rgba8unorm-srgb");
	return result;
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_emissive_strength */
function resolveEmissiveStrength(material) {
	const ext = material.extensions?.KHR_materials_emissive_strength;
	return ext ? { emissiveStrength: ext.emissiveStrength ?? 1 } : null;
}

/** https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_unlit */
function resolveUnlit(material) {
	return !!material.extensions?.KHR_materials_unlit;
}

/** https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Archived/KHR_materials_pbrSpecularGlossiness/schema/glTF.KHR_materials_pbrSpecularGlossiness.schema.json */
function resolvePbrSpecularGlossiness(material, gltf, ctx, samplerCache) {
	const ext = material.extensions?.KHR_materials_pbrSpecularGlossiness;
	if (!ext) return null;
	const result = {
		sgDiffuseFactor: ext.diffuseFactor ?? [
			1,
			1,
			1,
			1
		],
		sgSpecularFactor: ext.specularFactor?.slice(0, 3) ?? [
			1,
			1,
			1
		],
		sgGlossinessFactor: ext.glossinessFactor ?? 1
	};
	if (ext.diffuseTexture) result.sgDiffuseTexture = resolveTexture(ext.diffuseTexture, gltf, ctx, samplerCache, "rgba8unorm-srgb");
	if (ext.specularGlossinessTexture) result.sgSpecularGlossinessTexture = resolveTexture(ext.specularGlossinessTexture, gltf, ctx, samplerCache, "rgba8unorm-srgb");
	return result;
}

/**
* Resolves a glTF material into a flat, glTF-vocabulary PBR data object
* (`baseColorFactor`, `metallicFactor`, extension fields like `clearcoatFactor`
* flattened to the top level, ...) with textures uploaded to GPU. Field names
* intentionally match the glTF spec, not any pex-renderer component — see
* loaders/glTF/pex-renderer.ts for the ECS mapping.
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/material.schema.json
*/
function resolveMaterial(material, gltf, ctx, samplerCache) {
	const result = {
		name: material.name,
		doubleSided: !!material.doubleSided,
		alphaMode: material.alphaMode ?? "OPAQUE",
		alphaCutoff: material.alphaMode === "MASK" ? material.alphaCutoff ?? .5 : void 0,
		unlit: resolveUnlit(material)
	};
	const pbrMetallicRoughness = material.pbrMetallicRoughness;
	if (pbrMetallicRoughness) {
		result.baseColorFactor = pbrMetallicRoughness.baseColorFactor ?? [
			1,
			1,
			1,
			1
		];
		result.metallicFactor = pbrMetallicRoughness.metallicFactor ?? 1;
		result.roughnessFactor = pbrMetallicRoughness.roughnessFactor ?? 1;
		if (pbrMetallicRoughness.baseColorTexture) result.baseColorTexture = resolveTexture(pbrMetallicRoughness.baseColorTexture, gltf, ctx, samplerCache, "rgba8unorm-srgb");
		if (pbrMetallicRoughness.metallicRoughnessTexture) result.metallicRoughnessTexture = resolveTexture(pbrMetallicRoughness.metallicRoughnessTexture, gltf, ctx, samplerCache);
	}
	Object.assign(result, resolveClearcoat(material, gltf, ctx, samplerCache), resolveSheen(material, gltf, ctx, samplerCache), resolveTransmission(material, gltf, ctx, samplerCache), resolveDiffuseTransmission(material, gltf, ctx, samplerCache), resolveVolume(material, gltf, ctx, samplerCache), resolveDispersion(material), resolveIor(material), resolveSpecular(material, gltf, ctx, samplerCache), resolveEmissiveStrength(material), resolvePbrSpecularGlossiness(material, gltf, ctx, samplerCache));
	if (material.normalTexture) {
		result.normalTexture = resolveTexture(material.normalTexture, gltf, ctx, samplerCache);
		result.normalTextureScale = material.normalTexture.scale ?? 1;
	}
	if (material.occlusionTexture) {
		result.occlusionTexture = resolveTexture(material.occlusionTexture, gltf, ctx, samplerCache);
		result.occlusionTextureStrength = material.occlusionTexture.strength ?? 1;
	}
	if (material.emissiveTexture) result.emissiveTexture = resolveTexture(material.emissiveTexture, gltf, ctx, samplerCache, "rgba8unorm-srgb");
	if (material.emissiveFactor) result.emissiveFactor = material.emissiveFactor;
	return result;
}

/**
* Resolves a primitive/instancing attributes map into GPU-backed descriptors
* keyed by glTF attribute semantic name (POSITION, NORMAL, TEXCOORD_0, ...).
* Attributes from the same (non-quantized) bufferView share one GPU buffer —
* matching how the accessor's byteOffset/byteStride already describe an
* interleaved layout — cached on the bufferView itself so multiple
* primitives/attributes referencing it don't re-upload.
*/
function resolveAttributes(attributesMap, gltf, ctx) {
	const attributes = {};
	for (const name in attributesMap) {
		const accessor = getAccessor(gltf.accessors[attributesMap[name]], gltf.bufferViews);
		let data;
		if (accessor.sparse) data = accessor._data;
		if (accessor.normalized) data = normalizeData(data ?? accessor._data);
		if (name === "COLOR_0" && accessor.type === "VEC3") data = typedArrayInterleave(Float32Array, [3, 1], data ?? accessor._data, new Float32Array(accessor.count).fill(1));
		const joints = name === "JOINTS_0" ? accessor.componentType === WEBGL_CONSTANTS.UNSIGNED_BYTE ? {
			format: "uint8x4",
			arrayStride: 4
		} : {
			format: "uint16x4",
			arrayStride: 8
		} : void 0;
		if (data) attributes[name] = joints ? {
			data,
			...joints
		} : data;
		else {
			const bufferViewData = accessor._bufferView._data;
			let buffer = accessor._bufferView._vertexBuffer;
			if (!buffer) buffer = accessor._bufferView._vertexBuffer = createBuffer(ctx, {
				usage: "vertex",
				data: bufferViewData
			});
			attributes[name] = {
				buffer,
				data: accessor._data,
				offset: accessor.byteOffset,
				arrayStride: accessor._bufferView.byteStride ?? joints?.arrayStride,
				...joints && { format: joints.format }
			};
		}
	}
	return attributes;
}
/** Resolves a primitive's indices accessor into a raw typed array + count. */
function resolveIndices(indicesAccessorIndex, gltf) {
	if (indicesAccessorIndex === void 0) return null;
	const accessor = getAccessor(gltf.accessors[indicesAccessorIndex], gltf.bufferViews);
	return {
		indices: accessor._data,
		count: accessor.count
	};
}
/**
* Resolves POSITION accessor min/max into `[min, max]` bounds,
* quantization-scaled.
*/
function resolvePositionBounds(positionAccessor) {
	if (!positionAccessor?.min || !positionAccessor?.max) return void 0;
	const scale = positionAccessor.normalized ? MESH_QUANTIZATION_SCALE.get(WEBGL_TYPED_ARRAY_BY_COMPONENT_TYPES[positionAccessor.componentType]) ?? 1 : 1;
	return [positionAccessor.min.map((v) => v * scale), positionAccessor.max.map((v) => v * scale)];
}
const GLTF_PRIMITIVE_MODE = {
	POINTS: 0,
	LINES: 1,
	LINE_LOOP: 2,
	LINE_STRIP: 3,
	TRIANGLES: 4,
	TRIANGLE_STRIP: 5,
	TRIANGLE_FAN: 6
};
const GLTF_MODE_TOPOLOGY = {
	[GLTF_PRIMITIVE_MODE.POINTS]: "point-list",
	[GLTF_PRIMITIVE_MODE.LINES]: "line-list",
	[GLTF_PRIMITIVE_MODE.LINE_STRIP]: "line-strip",
	[GLTF_PRIMITIVE_MODE.TRIANGLES]: "triangle-list",
	[GLTF_PRIMITIVE_MODE.TRIANGLE_STRIP]: "triangle-strip"
};
/**
* Resolves a primitive's mode into a WebGPU topology, mutating `geometry` in
* place. WebGPU has no LINE_LOOP/TRIANGLE_FAN topology (unlike WebGL) so both
* are expanded here into an explicit index buffer over a supported topology:
* LINE_LOOP closes into a line-strip by repeating the first index at the end;
* TRIANGLE_FAN is re-triangulated into a triangle-list, fanned from index 0.
*/
function resolveTopology(mode, geometry) {
	if (mode !== GLTF_PRIMITIVE_MODE.LINE_LOOP && mode !== GLTF_PRIMITIVE_MODE.TRIANGLE_FAN) return GLTF_MODE_TOPOLOGY[mode] ?? "triangle-list";
	const existingIndices = geometry.indices;
	const indexCount = existingIndices ? existingIndices.length : geometry.count ?? 0;
	const indexAt = (i) => existingIndices ? existingIndices[i] : i;
	if (mode === GLTF_PRIMITIVE_MODE.LINE_LOOP) {
		const closed = new ((existingIndices?.constructor) ?? Uint32Array)(indexCount + 1);
		for (let i = 0; i < indexCount; i++) closed[i] = indexAt(i);
		closed[indexCount] = indexAt(0);
		geometry.indices = closed;
		geometry.count = closed.length;
		return "line-strip";
	}
	const triangleCount = Math.max(0, indexCount - 2);
	const triangles = new (indexCount > 65535 ? Uint32Array : Uint16Array)(triangleCount * 3);
	for (let i = 0, t = 0; i < triangleCount; i++) {
		triangles[t++] = indexAt(0);
		triangles[t++] = indexAt(i + 1);
		triangles[t++] = indexAt(i + 2);
	}
	geometry.indices = triangles;
	geometry.count = triangles.length;
	return "triangle-list";
}
/**
* Resolves a mesh primitive's geometry: attributes, indices, bounds and
* primitive mode. `instancedAttributes` (from EXT_mesh_gpu_instancing) are
* merged in as-is.
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/mesh.primitive.schema.json
*/
async function resolvePrimitiveGeometry(primitive, gltf, ctx, instancedAttributes, options) {
	let geometry = {};
	const draco = await resolveDracoPrimitive(primitive, gltf.bufferViews, gltf.accessors, options);
	if (draco) geometry = draco;
	const remainingAttributes = { ...primitive.attributes };
	if (draco) for (const name of Object.keys(draco)) delete remainingAttributes[name];
	Object.assign(geometry, resolveAttributes(remainingAttributes, gltf, ctx), instancedAttributes);
	const positionAccessor = gltf.accessors[primitive.attributes.POSITION];
	const bounds = resolvePositionBounds(positionAccessor);
	if (bounds) geometry.bounds = bounds;
	if (!geometry.indices && primitive.indices !== void 0) Object.assign(geometry, resolveIndices(primitive.indices, gltf));
	else if (!geometry.indices && positionAccessor) geometry.count = getAccessor(positionAccessor, gltf.bufferViews).count;
	geometry.topology = resolveTopology(primitive.mode ?? GLTF_PRIMITIVE_MODE.TRIANGLES, geometry);
	return geometry;
}
/**
* Resolves a primitive's morph targets: `{ sources, targets, weights }`,
* sources/targets keyed by attribute semantic.
*/
function resolvePrimitiveMorphTargets(primitive, geometry, gltf, weights) {
	if (!primitive.targets) return null;
	const sources = {};
	const targets = {};
	for (const target of primitive.targets) for (const targetKey in target) {
		targets[targetKey] ??= [];
		const accessor = getAccessor(gltf.accessors[target[targetKey]], gltf.bufferViews);
		targets[targetKey].push(accessor.normalized ? normalizeData(accessor._data) : accessor._data);
		if (!sources[targetKey]) {
			const sourceAccessorIndex = primitive.attributes[targetKey];
			const sourceAccessor = sourceAccessorIndex === void 0 ? void 0 : gltf.accessors[sourceAccessorIndex];
			if (sourceAccessor?._bufferView) {
				const resolved = getAccessor(sourceAccessor, gltf.bufferViews);
				sources[targetKey] = resolved.normalized ? normalizeData(resolved._data) : resolved._data;
			} else {
				const attribute = geometry[targetKey];
				sources[targetKey] = attribute?.data ?? attribute;
			}
		}
	}
	return {
		sources,
		targets,
		weights: weights ?? []
	};
}
/**
* Resolves a mesh's primitives into `{ geometry, material, morph? }` entries,
* one per primitive.
* https://github.com/KhronosGroup/glTF/blob/main/specification/2.0/schema/mesh.schema.json
*/
async function resolveMesh(mesh, instancedAttributes, gltf, ctx, samplerCache, options) {
	return Promise.all(mesh.primitives.map(async (primitive) => {
		const geometry = await resolvePrimitiveGeometry(primitive, gltf, ctx, instancedAttributes, options);
		const morph = resolvePrimitiveMorphTargets(primitive, geometry, gltf, mesh.weights ?? []);
		return {
			geometry,
			material: primitive.material === void 0 ? {} : resolveMaterial(gltf.materials[primitive.material], gltf, ctx, samplerCache),
			morph
		};
	}));
}

/**
* Resolves per-instance attributes (TRANSLATION/ROTATION/SCALE, plus any
* application-specific `_`-prefixed ones) into the same descriptor shape as
* regular vertex attributes, each marked `stepMode: "instance"`. The three spec
* semantics would step per-instance anyway once loaders/glTF/pex-renderer.ts
* renames them to offsets/rotations/scales (see the name match in
* systems/geometry.ts); a custom attribute has no such name, so the descriptor
* has to say so itself.
* https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Vendor/EXT_mesh_gpu_instancing
*/
function resolveMeshGpuInstancing(node, gltf, ctx) {
	const ext = node.extensions?.EXT_mesh_gpu_instancing;
	if (!ext?.attributes) return {};
	const attributes = resolveAttributes(ext.attributes, gltf, ctx);
	for (const attribute of Object.values(attributes)) attribute.stepMode = "instance";
	const counts = Object.values(ext.attributes).map((accessor) => gltf.accessors?.[accessor]?.count ?? 0);
	attributes.instanceCount = counts.length ? Math.max(...counts) : 0;
	return attributes;
}

/**
* Resolves the scene-level `EXT_lights_image_based` reference (unlike
* KHR_lights_punctual, this extension is scene-scoped, not node-scoped) into
* pre-baked reflection-probe data. Returns null when the scene doesn't
* reference one. Image sources are looked up from `gltf.images[]._img`, already
* decoded by loaders/glTF/texture.ts's resolveImages for the whole document
* (specularImages indices point into the same images array as regular
* textures).
* https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_lights_image_based/
*/
function resolveLightsImageBased(scene, gltf) {
	const reference = scene.extensions?.EXT_lights_image_based;
	if (reference?.light === void 0) return null;
	const light = (gltf.extensions?.EXT_lights_image_based)?.lights?.[reference.light];
	if (!light) return null;
	const images = gltf.images;
	return {
		specularImages: light.specularImages.map((mip) => mip.map((imageIndex) => images[imageIndex]._img)),
		specularImageSize: light.specularImageSize,
		irradianceCoefficients: light.irradianceCoefficients,
		...light.rotation && { rotation: light.rotation },
		...light.intensity !== void 0 && { intensity: light.intensity }
	};
}

const DEFAULT_OPTIONS = {
	includeCameras: false,
	includeLights: false,
	includeAnimations: true,
	dracoOptions: {},
	supportImageBitmap: !isSafari
};
/**
* Loads and fully resolves a glTF/GLB file into a generic, glTF-spec-shaped
* document: GPU textures/buffers are created via pex-gpu, but node/mesh/
* material data uses glTF vocabulary throughout (attribute semantics like
* "POSITION", material fields like "baseColorFactor") — no pex-renderer entity
* or component types appear anywhere here. See loaders/glTF/pex-renderer.ts for
* the ECS mapping.
*/
async function loadGltfDocument(urlOrData, options) {
	const opts = {
		...DEFAULT_OPTIONS,
		...options
	};
	const { ctx } = opts;
	let data;
	let basePath = opts.basePath;
	if (urlOrData instanceof ArrayBuffer || isObject(urlOrData)) data = urlOrData;
	else {
		const url = urlOrData;
		const extension = getFileExtension(url);
		basePath ??= getDirname(url);
		data = extension === "glb" ? await loadArrayBuffer(url) : await loadJson(url);
	}
	const { json, bin } = loadData(data);
	const requiredExtensions = (json.extensionsRequired ?? []).filter((extension) => !SUPPORTED_EXTENSIONS.has(extension));
	if (requiredExtensions.length) console.error("glTF loader: missing required extensions", requiredExtensions);
	const unsupportedExtensions = (json.extensionsUsed ?? []).filter((extension) => !SUPPORTED_EXTENSIONS.has(extension));
	if (unsupportedExtensions.length) console.warn("glTF loader: unsupported extensions", unsupportedExtensions);
	const version = Number(json.asset.version);
	if (!version || version < 2) console.warn(`glTF loader: invalid or unsupported version: ${json.asset.version}`);
	await Promise.all((json.buffers ?? []).map(async (buffer) => {
		const uri = buffer.uri ?? "";
		buffer._data = bin ?? (isBase64(uri) ? decodeBase64(uri) : await loadArrayBuffer([basePath, uri].join("/")));
	}));
	for (const bufferView of json.bufferViews ?? []) {
		const bufferData = json.buffers[bufferView.buffer]._data;
		bufferView.byteOffset ??= 0;
		bufferView._data = bufferData.slice(bufferView.byteOffset, bufferView.byteOffset + bufferView.byteLength);
	}
	await resolveImages(json, {
		basePath,
		supportImageBitmap: opts.supportImageBitmap,
		ctx
	});
	const samplerCache = /* @__PURE__ */ new Map();
	const nodes = await Promise.all((json.nodes ?? []).map(async (node) => {
		const resolved = {
			name: node.name,
			transform: resolveNodeTransform(node),
			childrenIndices: node.children ?? []
		};
		if (opts.includeCameras && Number.isInteger(node.camera)) {
			resolved.cameraIndex = node.camera;
			resolved.camera = resolveCamera(json.cameras[node.camera], ctx);
		}
		const lightIndex = (node.extensions?.KHR_lights_punctual)?.light;
		if (opts.includeLights && Number.isInteger(lightIndex)) {
			const documentLights = json.extensions?.KHR_lights_punctual;
			resolved.lightIndex = lightIndex;
			resolved.light = resolveLight(documentLights.lights[lightIndex]);
		}
		if (Number.isInteger(node.skin)) {
			resolved.skinIndex = node.skin;
			resolved.skin = resolveSkin(json.skins[node.skin], json);
		}
		if (Number.isInteger(node.mesh)) {
			resolved.meshIndex = node.mesh;
			const instancedAttributes = resolveMeshGpuInstancing(node, json, ctx);
			resolved.primitives = await resolveMesh(json.meshes[node.mesh], instancedAttributes, json, ctx, samplerCache, { ...opts.dracoOptions && { dracoOptions: opts.dracoOptions } });
		}
		return resolved;
	}));
	const animations = opts.includeAnimations ? (json.animations ?? []).map((animation, index) => resolveAnimation(animation, json, index)) : [];
	const scenes = (json.scenes ?? [{ nodes: [] }]).map((scene) => ({
		...scene.name !== void 0 && { name: scene.name },
		rootNodeIndices: scene.nodes ?? [],
		reflectionProbe: resolveLightsImageBased(scene, json)
	}));
	return {
		ctx,
		asset: json.asset,
		defaultSceneIndex: json.scene ?? 0,
		scenes,
		nodes,
		animations
	};
}

const PEX_ATTRIBUTE_NAME_MAP = {
	POSITION: "positions",
	NORMAL: "normals",
	TANGENT: "tangents",
	TEXCOORD_0: "uvs",
	TEXCOORD_1: "uvs1",
	JOINTS_0: "joints",
	WEIGHTS_0: "weights",
	COLOR_0: "vertexColors",
	TRANSLATION: "offsets",
	ROTATION: "rotations",
	SCALE: "scales"
};
const GEOMETRY_PASSTHROUGH = /* @__PURE__ */ new Set([
	"bounds",
	"count",
	"instanceCount",
	"topology"
]);
function mapAttributeName(name) {
	return PEX_ATTRIBUTE_NAME_MAP[name] ?? name.toLowerCase();
}
function mapGeometry(geometry) {
	const result = {};
	for (const key in geometry) if (key === "indices") result.cells = geometry[key];
	else if (GEOMETRY_PASSTHROUGH.has(key)) result[key] = geometry[key];
	else if (PEX_ATTRIBUTE_NAME_MAP[key]) result[PEX_ATTRIBUTE_NAME_MAP[key]] = geometry[key];
	else if (key.startsWith("_")) {
		const attributes = result.attributes ??= {};
		attributes[key.slice(1).toLowerCase()] = geometry[key];
	} else console.debug(`${NAMESPACE} glTF loader: unsupported attribute`, key);
	return result;
}
const srgb = (color) => fromLinear([], color[0], color[1], color[2], color.length === 4 ? color[3] : 1);
const SRGB_MATERIAL_FACTORS = {
	baseColorFactor: srgb,
	emissiveFactor: srgb,
	sheenColorFactor: srgb,
	sgDiffuseFactor: srgb,
	sgSpecularFactor: (color) => srgb(color).slice(0, 3)
};
const MATERIAL_CONSUMED = /* @__PURE__ */ new Set([
	"name",
	"unlit",
	"doubleSided",
	"alphaMode"
]);
function mapMaterial(material) {
	const result = {
		name: material.name,
		unlit: material.unlit || void 0,
		cullMode: material.doubleSided ? "none" : "back",
		castShadows: true,
		receiveShadows: true
	};
	for (const key in material) {
		if (MATERIAL_CONSUMED.has(key)) continue;
		const value = material[key];
		if (value === void 0) continue;
		const toSrgb = SRGB_MATERIAL_FACTORS[key];
		result[key.replace(/Factor$/, "")] = toSrgb ? toSrgb(value) : value;
	}
	if (material.alphaMode === "BLEND") result.blend = "normal";
	return result;
}
function buildLightComponent(light) {
	const common = {
		color: srgb(light.color),
		...light.range !== void 0 && { range: light.range }
	};
	switch (light.type) {
		case "directional": return directional_light_default({
			...common,
			intensity: light.intensity
		});
		case "point": return point_light_default({
			...common,
			intensity: pointIntensityToPower(light.intensity)
		});
		case "spot": return spot_light_default({
			...common,
			intensity: spotIntensityToPower(light.intensity, light.outerConeAngle, true),
			focusedSpot: true,
			innerConeAngle: light.innerConeAngle,
			outerConeAngle: light.outerConeAngle
		});
		default: throw new Error(`Unexpected light type: ${light.type}`);
	}
}
function buildNode(nodeIndex, ctx, parentTransform, sceneEntities) {
	const cached = ctx.nodeEntities.get(nodeIndex);
	if (cached) return cached;
	const node = ctx.document.nodes[nodeIndex];
	const entityComponents = { transform: transform_default({
		...node.transform,
		parent: parentTransform
	}) };
	if (node.camera) entityComponents.camera = camera_default(node.camera);
	if (node.light) entityComponents[`${node.light.type}Light`] = buildLightComponent(node.light);
	const nodeEntity = entity_default(entityComponents);
	nodeEntity.name = node.name || `node_${nodeIndex}`;
	sceneEntities.push(nodeEntity);
	const skinComponent = node.skin ? skin_default({}) : null;
	let resultEntities = [nodeEntity];
	if (node.primitives) {
		const primitiveComponents = node.primitives.map(({ geometry, material, morph }) => {
			const entityProps = {
				geometry: geometry_default(mapGeometry(geometry)),
				material: material_default(mapMaterial(material))
			};
			if (morph) entityProps.morph = morph_default({
				sources: mapKeys(morph.sources, mapAttributeName),
				targets: mapKeys(morph.targets, mapAttributeName),
				weights: morph.weights
			});
			return entityProps;
		});
		if (primitiveComponents.length === 1) {
			Object.assign(nodeEntity, primitiveComponents[0]);
			if (skinComponent) nodeEntity.skin = skinComponent;
		} else resultEntities = [nodeEntity, ...primitiveComponents.map((props, j) => {
			const subEntity = entity_default(props);
			subEntity.name = `node_${nodeIndex}_${j}`;
			subEntity.transform = transform_default({ parent: nodeEntity.transform });
			if (skinComponent) subEntity.skin = skinComponent;
			sceneEntities.push(subEntity);
			return subEntity;
		})];
	}
	ctx.nodeEntities.set(nodeIndex, resultEntities);
	for (const childIndex of node.childrenIndices) buildNode(childIndex, ctx, nodeEntity.transform, sceneEntities);
	return resultEntities;
}
/**
* Resolves every node.skin's joint node indices into entities + fresh joint
* matrices.
*/
function resolveSkins(ctx) {
	ctx.document.nodes.forEach((node, nodeIndex) => {
		if (!node.skin) return;
		const skinComponent = ctx.nodeEntities.get(nodeIndex)?.find((e) => e.skin)?.skin;
		if (!skinComponent) return;
		const joints = node.skin.jointNodeIndices.map((jointNodeIndex) => ctx.nodeEntities.get(jointNodeIndex)[0]);
		skinComponent.inverseBindMatrices = node.skin.inverseBindMatrices;
		skinComponent.joints = joints;
		skinComponent.jointMatrices = joints.map(() => create$1());
	});
}
function buildAnimations(document, nodeEntities) {
	return document.animations.map((animation) => animation_default({
		name: animation.name,
		duration: animation.duration,
		loop: true,
		channels: animation.channels.flatMap((channel) => {
			const target = nodeEntities.get(channel.targetNodeIndex)?.[0];
			return target ? [{
				input: channel.input,
				output: channel.output,
				interpolation: channel.interpolation,
				target,
				path: channel.path
			}] : [];
		})
	}));
}
/**
* Converts a generic GltfDocument (see loaders/glTF/document.ts) into
* pex-renderer scenes: entity trees built from components, one per glTF scene.
* This is the only file in loaders/glTF/ that imports pex-renderer's
* entity/components/systems.
*/
function buildGltfScenes(document) {
	const buildCtx = {
		document,
		nodeEntities: /* @__PURE__ */ new Map()
	};
	const scenes = document.scenes.map((scene) => {
		const root = entity_default({ transform: transform_default({}) });
		root.name = scene.name || "scene";
		const entities = [root];
		for (const rootNodeIndex of scene.rootNodeIndices) buildNode(rootNodeIndex, buildCtx, root.transform, entities);
		if (scene.reflectionProbe) {
			const reflectionProbeEntity = entity_default({
				transform: transform_default(scene.reflectionProbe.rotation ? { rotation: scene.reflectionProbe.rotation } : {}),
				reflectionProbe: reflection_probe_default({ data: scene.reflectionProbe })
			});
			reflectionProbeEntity.name = "EXT_lights_image_based";
			entities.push(reflectionProbeEntity);
		}
		return {
			name: scene.name,
			root,
			entities
		};
	});
	resolveSkins(buildCtx);
	if (document.animations.length) {
		const animations = buildAnimations(document, buildCtx.nodeEntities);
		const rootWithAnimations = scenes[0]?.root;
		if (rootWithAnimations) {
			rootWithAnimations.animations = animations;
			rootWithAnimations.animation = animations[0];
		}
	}
	const transformSystem = transform_default$1();
	for (const scene of scenes) {
		transformSystem.sort(scene.entities);
		transformSystem.update(scene.entities);
	}
	transformSystem.dispose();
	return scenes;
}

/**
* Loads a glTF/GLB file and converts it into pex-renderer entities, one
* {@link GltfScene} per glTF scene. For a generic, non-ECS representation (e.g.
* to drive a different renderer on top of pex-gpu), use {@link loadGltfDocument}
* directly instead.
*/
async function loadGltf(urlOrData, options) {
	const document = await loadGltfDocument(urlOrData, options);
	return buildGltfScenes(document);
}

var loaders_exports = /* @__PURE__ */ __exportAll({ gltf: () => loadGltf });

var overlay_exports = /* @__PURE__ */ __exportAll({ overlayShader: () => overlayShader });
const overlayShader = (defines, options = {}) => {
	const hooks = options.hooks || {};
	return `
struct Overlay {
  bounds: vec4f, // x, y, width, height
}
@group(0) @binding(0) var<uniform> uOverlay: Overlay;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uTextureSampler: sampler;

struct VertexInput {
  @location(0) position: vec2f,
  @location(1) texCoord0: vec2f,
}

${vertexOutputStruct([{
		name: "texCoord0",
		type: "vec2f"
	}])}

${hooks.vertDeclarationsEnd ?? ""}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;

  var pos = (input.position + 1.0) / 2.0; // move from -1..1 to 0..1
  pos = vec2f(
    uOverlay.bounds.x + pos.x * uOverlay.bounds.z,
    uOverlay.bounds.y + pos.y * uOverlay.bounds.w
  );
  pos = pos * 2.0 - 1.0;

  output.position = vec4f(pos, 0.0, 1.0);
  output.texCoord0 = input.texCoord0;

  ${hooks.vertEnd ?? ""}

  return output;
}

${fragmentOutputStruct()}

${hooks.fragDeclarationsEnd ?? ""}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  var output: FragmentOutput;
  output.color = textureSample(uTexture, uTextureSampler, input.texCoord0);

  ${hooks.fragEnd ?? ""}

  return output;
}
`;
};

var post_processing_exports = /* @__PURE__ */ __exportAll({
	DEPTH_MIP_LEVELS: () => 4,
	FRAGMENT_COORD: () => FRAGMENT_COORD,
	TONE_MAP_DEFINE: () => TONE_MAP_DEFINE,
	TONE_MAP_OPERATORS: () => TONE_MAP_OPERATORS,
	bilateralBlurShader: () => bilateralBlurShader,
	combineShader: () => combineShader,
	depthPyramidShader: () => depthPyramidShader,
	dofCoCResolveShader: () => dofCoCResolveShader,
	dofCompositeShader: () => dofCompositeShader,
	dofDownsampleShader: () => dofDownsampleShader,
	dofFocusShader: () => dofFocusShader,
	dofGatherShader: () => dofGatherShader,
	dofPostFilterShader: () => dofPostFilterShader,
	dofPrefilterShader: () => dofPrefilterShader,
	dofTileDilateShader: () => dofTileDilateShader,
	dofTileMaxXShader: () => dofTileMaxXShader,
	dofTileMaxYShader: () => dofTileMaxYShader,
	downsampleShader: () => downsampleShader,
	finalShader: () => finalShader,
	fullscreenVertex: () => fullscreenVertex,
	gtaoDenoiseShader: () => gtaoDenoiseShader,
	gtaoShader: () => gtaoShader,
	lensFlareBrightShader: () => lensFlareBrightShader,
	lensFlareMainShader: () => lensFlareMainShader,
	lensFlareStreakSeedShader: () => lensFlareStreakSeedShader,
	lensFlareStreakShader: () => lensFlareStreakShader,
	lumaShader: () => lumaShader,
	motionBlurNeighborMaxShader: () => motionBlurNeighborMaxShader,
	motionBlurShader: () => motionBlurShader,
	motionBlurTileMaxXShader: () => motionBlurTileMaxXShader,
	motionBlurTileMaxYShader: () => motionBlurTileMaxYShader,
	postProcessingStruct: () => postProcessingStruct,
	saoShader: () => saoShader,
	smaaBlendShader: () => smaaBlendShader,
	smaaEdgesShader: () => smaaEdgesShader,
	smaaResolveShader: () => smaaResolveShader,
	smaaWeightsShader: () => smaaWeightsShader,
	taaDepthHistoryShader: () => taaDepthHistoryShader,
	taaShader: () => taaShader,
	taaSharpenShader: () => taaSharpenShader,
	thresholdShader: () => thresholdShader,
	upsampleShader: () => upsampleShader
});

var reversible_tone_map_exports = /* @__PURE__ */ __exportAll({ reversibleToneMapShader: () => reversibleToneMapShader });
const reversibleToneMapShader = (defines, options = {}) => {
	const hooks = options.hooks || {};
	return `
@group(0) @binding(0) var uTexture: texture_2d<f32>;
@group(0) @binding(1) var uTextureSampler: sampler;

struct VertexInput {
  @location(0) position: vec2f,
}

${vertexOutputStruct([{
		name: "texCoord0",
		type: "vec2f"
	}])}

@vertex
fn vertexMain(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = vec4f(input.position, 0.0, 1.0);
  output.texCoord0 = input.position * 0.5 + 0.5;
  return output;
}

// Fragment includes
${max3}
${reversible_tone_map_default}

${hooks.fragDeclarationsEnd ?? ""}

${fragmentOutputStruct()}

@fragment
fn fragmentMain(input: VertexOutput) -> FragmentOutput {
  var output: FragmentOutput;
  var color = textureSample(uTexture, uTextureSampler, input.texCoord0);
  color = vec4f(reversibleToneMapInverse(color.rgb), color.w);

  output.color = color;

  ${hooks.fragEnd ?? ""}

  return output;
}
`;
};

var shaders_exports = /* @__PURE__ */ __exportAll({
	basic: () => basic_exports,
	blit: () => blit_exports,
	depthPass: () => depth_pass_exports,
	depthResolve: () => depth_resolve_exports,
	line: () => line_exports,
	overlay: () => overlay_exports,
	postProcessing: () => post_processing_exports,
	reversibleToneMap: () => reversible_tone_map_exports,
	sky: () => sky_exports,
	skybox: () => skybox_exports,
	standard: () => standard_exports
});

export { FrameGraph, RenderTextures, ResourcePool, components_exports as components, entity_default as entity, isResourceHandle, isTextureDescriptor, loaders_exports as loaders, memoryTimeline, render_engine_default as renderEngine, shaders_exports as shaders, systems_exports as systems, utils_exports as utils, world_default as world };