/**
* History bookkeeping for an effect accumulating across frames, one per effect
* as each tracks its own textures.
*
* Kept by the effect rather than on the camera component because nothing else
* reads it — and weakly, so a discarded camera entity does not pin an entry.
*
* The returned function records this frame and reports whether the previous
* one's history is usable: not when the textures were just allocated (first
* frame for this camera), reallocated (a resize changed their shape), left
* behind by a frame that is not the one immediately before this, or describing
* a view this one does not continue from (a cut, via
* `cameraSystem.resetTemporal`).
*/
function createHistoryTracker() {
	const states = /* @__PURE__ */ new WeakMap();
	return (cameraEntity, frameIndex, width, height) => {
		const state = states.get(cameraEntity);
		states.set(cameraEntity, {
			width,
			height,
			frameIndex
		});
		return !cameraEntity.camera._temporalReset && !!state && state.width === width && state.height === height && state.frameIndex === frameIndex - 1;
	};
}
/**
* Two histories alternating by frame parity, because a pass may not read and
* write one handle. Persistent: their contents have to survive to the next
* frame, which is the one thing the pool's per-frame recycling would otherwise
* take away. Declared both ways round every frame, as the read side has no
* producing pass this frame and only a persistent declaration gives it a handle
* at all.
*/
const createHistoryPair = (createTexture, label, viewId, descriptor) => [createTexture({
	label: `${label}0.${viewId}`,
	...descriptor,
	persistent: true
}), createTexture({
	label: `${label}1.${viewId}`,
	...descriptor,
	persistent: true
})];

export { createHistoryTracker as n, createHistoryPair as t };