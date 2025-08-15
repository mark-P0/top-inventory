export function randomInteger() {
	const array = crypto.getRandomValues(new Uint8Array(1));

	return array[0];
}

/** Allows "overflow" and "underflow" indexing */
export function wrappedAccess<T>(sequence: ArrayLike<T>, index: number): T {
	const length = sequence.length;

	if (index < 0) {
		return sequence[length + index];
	}

	if (index >= length) {
		return sequence[index - length];
	}

	return sequence[index];
}
