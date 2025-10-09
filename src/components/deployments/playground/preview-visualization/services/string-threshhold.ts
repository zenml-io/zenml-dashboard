const COLLAPSE_THRESHOLD = 100; // characters

export function shouldCollapseString(value: string) {
	return value.length > COLLAPSE_THRESHOLD;
}
