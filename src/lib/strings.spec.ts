import { describe, expect, it, test } from "vitest";
import {
	capitalize,
	extractDockerImageKey,
	formatIdToTitleCase,
	getFirstUuidSegment,
	pluralize,
	renderAnyToString,
	shellEscape,
	snakeCaseToDashCase,
	snakeCaseToLowerCase,
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

describe("formatIdToTitleCase converts hyphenated-strings to Title Case", () => {
	const testCases = [
		{ input: "hello_world", expected: "Hello_world" },
		{ input: "another_example_string", expected: "Another_example_string" },
		{ input: "single", expected: "Single" },
		{ input: "", expected: "" }
	];

	testCases.forEach(({ input, expected }) => {
		test(input, () => {
			expect(formatIdToTitleCase(input)).toBe(expected);
		});
	});
});

describe("format snake_case to lowercase correctly", () => {
	const testCases = [
		{
			input: "hello_world",
			expected: "hello world",
			description: "string in snakecase to lowercase"
		},
		{ input: "single", expected: "single", description: "string without separator to lowercase" },
		{ input: "", expected: "", description: "empty string" }
	];

	testCases.forEach(({ input, expected, description }) => {
		test(description, () => {
			expect(snakeCaseToLowerCase(input)).toBe(expected);
		});
	});
});

describe("format snake_case to dashcase correctly", () => {
	const testCases = [
		{
			input: "hello_world",
			expected: "hello-world",
			description: "string in snakecase to dashcase"
		},
		{ input: "single", expected: "single", description: "string without separator to dashcase" },
		{ input: "", expected: "", description: "empty string" }
	];

	testCases.forEach(({ input, expected, description }) => {
		test(description, () => {
			expect(snakeCaseToDashCase(input)).toBe(expected);
		});
	});
});

describe("capitalizes string correctly", () => {
	const testCases = [
		{
			input: "hello_world",
			expected: "Hello_world",
			description: "string in snake case"
		},
		{ input: "single", expected: "Single", description: "lowercase string" },
		{ input: "Single", expected: "Single", description: "already capitalized" },
		{ input: "SINGLE", expected: "SINGLE", description: "uppercase string" }
	];
	testCases.forEach(({ input, expected, description }) => {
		test(description, () => {
			expect(capitalize(input)).toBe(expected);
		});
	});
});

describe("pluralize pluralizes string correctly", () => {
	it("should handle basic pluralization", () => {
		expect(pluralize(1, "item")).toBe("item");
		expect(pluralize(2, "item")).toBe("items");
		expect(pluralize(0, "item")).toBe("items");
	});

	it("should handle custom suffix", () => {
		expect(pluralize(1, "fox", "es")).toBe("fox");
		expect(pluralize(2, "fox", "es")).toBe("foxes");
		expect(pluralize(0, "fox", "es")).toBe("foxes");
	});
});

describe("getFirstUuidSection gets the first section of a uuid", () => {
	it("should get the first section of a uuid", () => {
		expect(getFirstUuidSegment("12345678-1234-1234-1234-123456789012")).toBe("12345678");
	});
});

describe("shellEscape escapes strings for safe shell usage", () => {
	describe("happy path - basic strings", () => {
		it("should return simple strings unchanged", () => {
			expect(shellEscape("hello")).toBe("hello");
		});

		it("should return strings with spaces unchanged", () => {
			expect(shellEscape("hello world")).toBe("hello world");
		});

		it("should return strings with common special characters unchanged", () => {
			expect(shellEscape("hello-world_123")).toBe("hello-world_123");
		});

		it("should return strings with shell metacharacters unchanged", () => {
			expect(shellEscape("echo $HOME")).toBe("echo $HOME");
			expect(shellEscape("test & background")).toBe("test & background");
			expect(shellEscape("pipe | test")).toBe("pipe | test");
			expect(shellEscape("redirect > file")).toBe("redirect > file");
		});
	});

	describe("edge cases - single quotes", () => {
		it("should escape a single quote in the middle", () => {
			expect(shellEscape("don't")).toBe("don\\'t");
		});

		it("should escape multiple single quotes", () => {
			expect(shellEscape("it's a test's case")).toBe("it\\'s a test\\'s case");
		});

		it("should escape consecutive single quotes", () => {
			expect(shellEscape("test''case")).toBe("test\\'\\'case");
		});

		it("should handle string that is only a single quote", () => {
			expect(shellEscape("'")).toBe("\\'");
		});

		it("should handle single quote at the beginning", () => {
			expect(shellEscape("'hello")).toBe("\\'hello");
		});

		it("should handle single quote at the end", () => {
			expect(shellEscape("hello'")).toBe("hello\\'");
		});

		it("should handle string surrounded by single quotes", () => {
			expect(shellEscape("'hello'")).toBe("\\'hello\\'");
		});
	});

	describe("edge cases - backslashes", () => {
		it("should escape single backslash", () => {
			expect(shellEscape("test\\value")).toBe("test\\\\value");
		});

		it("should escape multiple backslashes", () => {
			expect(shellEscape("path\\to\\file")).toBe("path\\\\to\\\\file");
		});

		it("should escape consecutive backslashes", () => {
			expect(shellEscape("test\\\\case")).toBe("test\\\\\\\\case");
		});

		it("should handle string that is only a backslash", () => {
			expect(shellEscape("\\")).toBe("\\\\");
		});

		it("should handle backslash at the beginning", () => {
			expect(shellEscape("\\hello")).toBe("\\\\hello");
		});

		it("should handle backslash at the end", () => {
			expect(shellEscape("hello\\")).toBe("hello\\\\");
		});
	});

	describe("edge cases - combined quotes and backslashes", () => {
		it("should escape both single quotes and backslashes", () => {
			expect(shellEscape("it's\\a\\test")).toBe("it\\'s\\\\a\\\\test");
		});

		it("should handle backslash before single quote", () => {
			expect(shellEscape("\\'hello")).toBe("\\\\\\'hello");
		});

		it("should handle single quote before backslash", () => {
			expect(shellEscape("'\\test")).toBe("\\'\\\\test");
		});

		it("should handle complex mix of quotes and backslashes", () => {
			// Test a simple case: single quote followed by backslash
			expect(shellEscape("a'b\\c")).toBe("a\\'b\\\\c");
		});
	});

	describe("edge cases - special scenarios", () => {
		it("should handle empty string", () => {
			expect(shellEscape("")).toBe("");
		});

		it("should handle string with newlines", () => {
			expect(shellEscape("line1\nline2")).toBe("line1\nline2");
		});

		it("should handle string with tabs", () => {
			expect(shellEscape("tab\there")).toBe("tab\there");
		});

		it("should handle string with double quotes", () => {
			expect(shellEscape('say "hello"')).toBe('say "hello"');
		});

		it("should handle string with backticks", () => {
			expect(shellEscape("command `ls`")).toBe("command `ls`");
		});
	});

	describe("complex real-world scenarios", () => {
		it("should handle mixed special characters with single quotes", () => {
			expect(shellEscape("user's $HOME dir & file.txt")).toBe("user\\'s $HOME dir & file.txt");
		});

		it("should handle SQL-like strings with quotes", () => {
			expect(shellEscape("SELECT * FROM users WHERE name='John'")).toBe(
				"SELECT * FROM users WHERE name=\\'John\\'"
			);
		});

		it("should handle JSON strings", () => {
			expect(shellEscape('{"key": "value"}')).toBe('{"key": "value"}');
		});

		it("should escape quotes in command injection attempts", () => {
			expect(shellEscape("'; rm -rf /")).toBe("\\'; rm -rf /");
			expect(shellEscape("$(cat /etc/passwd)")).toBe("$(cat /etc/passwd)");
		});

		it("should handle Windows-style paths with backslashes", () => {
			expect(shellEscape("C:\\Users\\Documents\\file.txt")).toBe(
				"C:\\\\Users\\\\Documents\\\\file.txt"
			);
		});

		it("should handle escaped quotes in strings", () => {
			expect(shellEscape("She said \\'hello\\'")).toBe("She said \\\\\\'hello\\\\\\'");
		});

		it("should handle URLs", () => {
			expect(shellEscape("https://example.com?q=test&foo=bar")).toBe(
				"https://example.com?q=test&foo=bar"
			);
		});

		it("should handle file paths with spaces", () => {
			expect(shellEscape("/path/to/my documents/file.txt")).toBe("/path/to/my documents/file.txt");
		});
	});
});
