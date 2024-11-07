export function isString(value: unknown): value is string {
	return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
	return typeof value === "number" && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
	return typeof value === "boolean";
}

export function isArray<T = unknown>(value: unknown): value is T[] {
	return Array.isArray(value);
}

export function isObject(value: unknown): value is object {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}
