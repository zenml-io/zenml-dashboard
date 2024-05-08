import { test, expect, describe } from "vitest";
import { sanitizeSearchValue } from "./search";

describe("sanitizeSearchValue removes filter prefix if present", () => {
	const testCases = [
		{ input: "equals:apple", expected: "apple" },
		{ input: "contains:banana", expected: "banana" },
		{ input: "startswith:cherry", expected: "cherry" },
		{ input: "endswith:date", expected: "date" },
		{ input: "gte:5", expected: "5" },
		{ input: "gt:10", expected: "10" },
		{ input: "lte:100", expected: "100" },
		{ input: "lt:50", expected: "50" },
		{ input: "dummyData", expected: "dummyData" },
		{ input: "random:value", expected: "random:value" }, // No filter prefix, should return unchanged
		{ input: "", expected: "" } // Empty string should remain empty
	];

	testCases.forEach(({ input, expected }) =>
		test(input, () => expect(sanitizeSearchValue(input)).toBe(expected))
	);
});
