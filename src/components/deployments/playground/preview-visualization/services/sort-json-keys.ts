import { isArray, isObject } from "@/lib/type-guards";

export function sortJsonKeys(json: Record<string, unknown>, sortKeysAlphabetically = true) {
	const objects: { [key: string]: Record<string, unknown> } = {};
	const nonObjects: Record<string, unknown> = {};
	const arrays: { [key: string]: unknown[] } = {};

	for (const [key, value] of Object.entries(json || {})) {
		if (isObject(value)) {
			objects[key] = value as Record<string, unknown>;
		} else if (isArray(value)) {
			arrays[key] = value;
		} else {
			nonObjects[key] = value;
		}
	}

	const values = Object.entries(nonObjects);
	if (sortKeysAlphabetically) {
		values.sort((a, b) => a[0].localeCompare(b[0]));
	}

	return { objects, nonObjects: values, arrays };
}
