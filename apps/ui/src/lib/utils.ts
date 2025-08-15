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
