import { describe, expect, test } from "vitest";
import { snakeCaseToTitleCase } from "./strings";

describe("snakeCaseToTitleCase converts snake_case to Title Case", () => {
	const testCases = [
		{ input: "hello_world", expected: "Hello World" },
		{ input: "another_example_string", expected: "Another Example String" },
		{ input: "single", expected: "Single" },
		{ input: "with-", expected: "With-" },
		{ input: "", expected: "" }
	];

	testCases.forEach(({ input, expected }) => {
		test(input, () => {
			expect(snakeCaseToTitleCase(input)).toBe(expected);
		});
	});
});
