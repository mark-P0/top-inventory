export function randomInteger() {
	const array = crypto.getRandomValues(new Uint8Array(1));

	const int = array[0];
	if (int === undefined) {
		throw new Error("No integer?");
	}

	return int;
}

/** Allows "overflow" and "underflow" indexing */
export function wrappedAccess<T>(sequence: ArrayLike<T>, index: number): T {
	const length = sequence.length;

	if (length === 0) {
		throw new Error("Empty sequence");
	}

	let item = sequence[index];
	if (index < 0) {
		item = sequence[length + index];
	}
	if (index >= length) {
		item = sequence[index - length];
	}

	if (item === undefined) {
		throw new Error("Failed to access item");
	}

	return item;
}

/** Alternative to "ugly" IIFE syntax `(() => {})()` */
export function iife<T>(fn: () => T) {
	return fn();
}
