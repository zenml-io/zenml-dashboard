import { describe, expect, test } from "vitest";
import { formatRunIndex, formatRunName } from "./runs";

describe("formatRunIndex formats run index as 4-digit zero-padded string", () => {
	describe("happy path - standard indexes", () => {
		const testCases = [
			{ input: 1, expected: "0001", description: "single digit" },
			{ input: 42, expected: "0042", description: "double digits" },
			{ input: 123, expected: "0123", description: "triple digits" },
			{ input: 1234, expected: "1234", description: "four digits" }
		];

		testCases.forEach(({ input, expected, description }) => {
			test(description, () => {
				expect(formatRunIndex(input)).toBe(expected);
			});
		});
	});

	describe("edge cases - boundary values", () => {
		test("should handle zero", () => {
			expect(formatRunIndex(0)).toBe("0000");
		});

		test("should handle maximum 4-digit value", () => {
			expect(formatRunIndex(9999)).toBe("9999");
		});
	});

	describe("edge cases - numbers with more than 4 digits", () => {
		const testCases = [
			{ input: 10000, expected: "10000", description: "minimum 5-digit value" },
			{ input: 12345, expected: "12345", description: "5-digit value" },
			{ input: 99999, expected: "99999", description: "maximum 5-digit value" },
			{ input: 100000, expected: "100000", description: "minimum 6-digit value" },
			{ input: 123456, expected: "123456", description: "6-digit value" },
			{ input: 999999, expected: "999999", description: "maximum 6-digit value" },
			{ input: 1000000, expected: "1000000", description: "7-digit value" },
			{ input: 9999999, expected: "9999999", description: "maximum 7-digit value" }
		];

		testCases.forEach(({ input, expected, description }) => {
			test(description, () => {
				expect(formatRunIndex(input)).toBe(expected);
			});
		});
	});
});

describe("formatRunName formats run name with optional index prefix", () => {
	describe("happy path - with index", () => {
		const testCases = [
			{ name: "my-run", index: 1, expected: "#0001-my-run", description: "single digit index" },
			{
				name: "pipeline-run",
				index: 42,
				expected: "#0042-pipeline-run",
				description: "double digit index"
			},
			{
				name: "test-execution",
				index: 1234,
				expected: "#1234-test-execution",
				description: "four digit index"
			}
		];

		testCases.forEach(({ name, index, expected, description }) => {
			test(description, () => {
				expect(formatRunName(name, index)).toBe(expected);
			});
		});
	});

	describe("happy path - without index", () => {
		test("should return name unchanged when index is undefined", () => {
			expect(formatRunName("my-run")).toBe("my-run");
		});

		test("should return name unchanged when index is undefined (explicit)", () => {
			expect(formatRunName("my-run", undefined)).toBe("my-run");
		});

		test("should return name unchanged when index is null", () => {
			expect(formatRunName("my-run", null)).toBe("my-run");
		});
	});

	describe("edge cases - zero index", () => {
		test("should format with zero index", () => {
			expect(formatRunName("my-run", 0)).toBe("#0000-my-run");
		});
	});

	describe("edge cases - name variations", () => {
		test("should handle empty string name with index", () => {
			expect(formatRunName("", 1)).toBe("#0001-");
		});

		test("should handle empty string name without index", () => {
			expect(formatRunName("")).toBe("");
		});

		test("should handle name with special characters", () => {
			expect(formatRunName("my_run@v1.0", 1)).toBe("#0001-my_run@v1.0");
		});

		test("should handle name with spaces", () => {
			expect(formatRunName("my run name", 5)).toBe("#0005-my run name");
		});

		test("should handle name with unicode characters", () => {
			expect(formatRunName("run-🚀", 99)).toBe("#0099-run-🚀");
		});
	});

	describe("edge cases - indexes with more than 4 digits", () => {
		const testCases = [
			{
				name: "my-run",
				index: 10000,
				expected: "#10000-my-run",
				description: "minimum 5-digit index"
			},
			{
				name: "pipeline",
				index: 12345,
				expected: "#12345-pipeline",
				description: "5-digit index"
			},
			{
				name: "test-run",
				index: 99999,
				expected: "#99999-test-run",
				description: "maximum 5-digit index"
			},
			{
				name: "my-run",
				index: 100000,
				expected: "#100000-my-run",
				description: "minimum 6-digit index"
			},
			{
				name: "workflow",
				index: 123456,
				expected: "#123456-workflow",
				description: "6-digit index"
			},
			{
				name: "my-run",
				index: 999999,
				expected: "#999999-my-run",
				description: "maximum 6-digit index"
			},
			{
				name: "run",
				index: 1000000,
				expected: "#1000000-run",
				description: "7-digit index"
			}
		];

		testCases.forEach(({ name, index, expected, description }) => {
			test(description, () => {
				expect(formatRunName(name, index)).toBe(expected);
			});
		});
	});
});
