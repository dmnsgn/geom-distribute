function fmix(input) {
	input ^= input >>> 16;
	input = Math.imul(input, 2246822507);
	input ^= input >>> 13;
	input = Math.imul(input, 3266489909);
	input ^= input >>> 16;
	return input >>> 0;
}

export { fmix as default };