import { describe, expect, test } from "vitest";
import {
	extractDockerImageKey,
	renderAnyToString,
	snakeCaseToTitleCase,
	transformToEllipsis
} from "./strings";

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

describe("renderAnyToString converts any value to string", () => {
	const testCases = [
		{ value: true, expected: "true", description: "Boolean conversion" },
		{ value: false, expected: "false", description: "Boolean conversion" },
		{ value: { key: "value" }, expected: '{"key":"value"}', description: "Object conversion" },
		{ value: "text", expected: "text", description: "Original value" },
		{ value: 123, expected: 123, description: "Original value" }
	];

	testCases.forEach(({ value, expected, description }) => {
		test(description, () => {
			expect(renderAnyToString(value)).toBe(expected);
		});
	});
});

describe("transformToEllipsis truncates text to maxLength and adds '...'", () => {
	const testCases = [
		{
			text: "Short text",
			maxLength: 20,
			expected: "Short text",
			description: "Text shorter than maxLength"
		},
		{
			text: "This is a long text",
			maxLength: 12,
			expected: "This is a...",
			description: "Text longer than maxLength"
		},
		{
			text: "Equal length",
			maxLength: 12,
			expected: "Equal length",
			description: "Text equal to maxLength"
		}
	];

	testCases.forEach(({ text, maxLength, expected, description }) => {
		test(description, () => {
			expect(transformToEllipsis(text, maxLength)).toBe(expected);
		});
	});
});

describe("extractDockerImageKey extracts Docker image key from string", () => {
	const testCases = [
		{
			string: "1.amazonaws.com/zenml:0.57.0",
			expected: "zenml:0.57.0",
			description: "String with tag"
		},
		{
			string:
				"339712793861.dkr.ecr.eu-central-1.amazonaws.com/zenml@sha256:8913beaf69e74a4b5b6cf2ee7c99f34dc6eac26fa967a743e9894a890c46a4e1",
			expected: "zenml",
			description: "String without tag"
		}
	];

	testCases.forEach(({ string, expected, description }) => {
		test(description, () => {
			expect(extractDockerImageKey(string)).toBe(expected);
		});
	});
});
