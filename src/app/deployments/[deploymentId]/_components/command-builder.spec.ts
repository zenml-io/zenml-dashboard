import { describe, it, expect } from "vitest";
import {
	buildCurl,
	buildZenCommand,
	buildPythonCommand,
	replaceAuthTokenPlaceholder
} from "./command-builder";

describe("replaceAuthTokenPlaceholder", () => {
	it("should replace the placeholder with the token", () => {
		expect(replaceAuthTokenPlaceholder("Bearer **********", "test-token-123")).toBe(
			"Bearer test-token-123"
		);
	});

	it("should not change string if placeholder not present", () => {
		expect(replaceAuthTokenPlaceholder("Bearer my-token", "test-token-123")).toBe(
			"Bearer my-token"
		);
	});

	it("should handle empty token and placeholder present", () => {
		expect(replaceAuthTokenPlaceholder("Bearer **********", undefined)).toBe("Bearer **********");
	});

	it("should handle empty string input", () => {
		expect(replaceAuthTokenPlaceholder("", "abc")).toBe("");
	});

	it("should replace when placeholder is in the middle", () => {
		expect(replaceAuthTokenPlaceholder("Start ***** End", "value")).toBe("Start value End");
	});
});

describe("build invocation curl command", () => {
	describe("happy paths", () => {
		it("should build basic curl command without auth or body", () => {
			const result = buildCurl("https://api.example.com");

			expect(result).toBe(
				`curl -X POST https://api.example.com/invoke \\
  -H "Content-Type: application/json"`
			);
		});

		it("should include authorization header when authKey is provided", () => {
			const result = buildCurl("https://api.example.com", undefined, "test-token-123");

			expect(result).toContain(`-H "Authorization: Bearer **********"`);
			expect(result).toContain(`-H "Content-Type: application/json"`);
		});

		it("should include body with simple object", () => {
			const body = { name: "test", count: 42 };
			const result = buildCurl("https://api.example.com", body);

			expect(result).toContain(`-d '{`);
			expect(result).toContain(`"parameters":`);
			expect(result).toContain(`"name": "test"`);
			expect(result).toContain(`"count": 42`);
		});

		it("should include both auth and body when both provided", () => {
			const body = { param: "value" };
			const result = buildCurl("https://api.example.com", body, "auth-key");

			expect(result).toContain(`-H "Authorization: Bearer ********"`);
			expect(result).toContain(`-H "Content-Type: application/json"`);
			expect(result).toContain(`"parameters":`);
			expect(result).toContain(`"param": "value"`);
		});

		it("should handle array body", () => {
			const body = [1, 2, 3];
			const result = buildCurl("https://api.example.com", body);

			expect(result).toContain(`"parameters": [`);
			expect(result).toContain("1");
			expect(result).toContain("2");
			expect(result).toContain("3");
		});

		it("should handle boolean and null values", () => {
			const body = { flag: true, optional: null, disabled: false };
			const result = buildCurl("https://api.example.com", body);

			expect(result).toContain(`"flag": true`);
			expect(result).toContain(`"optional": null`);
			expect(result).toContain(`"disabled": false`);
		});
	});

	describe("edge cases", () => {
		it("should handle empty object body", () => {
			const result = buildCurl("https://api.example.com", {});

			expect(result).toContain(`"parameters": {}`);
		});

		it("should handle empty string in URL", () => {
			const result = buildCurl("", undefined, "token");

			expect(result).toBe(
				`curl -X POST /invoke \\
  -H "Authorization: Bearer *****" \\
  -H "Content-Type: application/json"`
			);
		});

		it("should handle string primitive as body", () => {
			const result = buildCurl("https://api.example.com", "test-string");

			expect(result).toContain(`"parameters": "test-string"`);
		});

		it("should handle number primitive as body", () => {
			const result = buildCurl("https://api.example.com", 42);

			expect(result).toContain(`"parameters": 42`);
		});

		it("should format deeply nested objects correctly", () => {
			const body = {
				level1: {
					level2: {
						level3: "deep"
					}
				}
			};
			const result = buildCurl("https://api.example.com", body);

			expect(result).toContain(`"level1":`);
			expect(result).toContain(`"level2":`);
			expect(result).toContain(`"level3": "deep"`);
		});
	});
});

describe("build invocation zenml command", () => {
	describe("happy paths", () => {
		it("should build basic command without body", () => {
			const result = buildZenCommand("my-deployment");

			expect(result).toBe("zenml deployment invoke my-deployment");
		});

		it("should handle mixed parameter types (string, number, boolean, array, object)", () => {
			const body = {
				name: "test",
				count: 5,
				enabled: true,
				tags: ["a", "b"],
				config: { key: "val" }
			};
			const result = buildZenCommand("my-deployment", body);

			expect(result).toContain('--name="test"');
			expect(result).toContain("--count=5");
			expect(result).toContain("--enabled=true");
			expect(result).toContain(`--tags='["a","b"]'`);
			expect(result).toContain(`--config='{"key":"val"}'`);
		});

		it("should handle null values", () => {
			const body = { optional: null };
			const result = buildZenCommand("my-deployment", body);

			expect(result).toBe("zenml deployment invoke my-deployment --optional=null");
		});
	});

	describe("edge cases and fallbacks", () => {
		it("should fallback to basic command when body is undefined", () => {
			const result = buildZenCommand("my-deployment", undefined);

			expect(result).toBe("zenml deployment invoke my-deployment");
		});

		it("should fallback to basic command when body is null", () => {
			const result = buildZenCommand("my-deployment", null);

			expect(result).toBe("zenml deployment invoke my-deployment");
		});

		it("should fallback to basic command when body is an array", () => {
			const result = buildZenCommand("my-deployment", [1, 2, 3]);

			expect(result).toBe("zenml deployment invoke my-deployment");
		});

		it("should fallback to basic command when body is a string", () => {
			const result = buildZenCommand("my-deployment", "not-an-object");

			expect(result).toBe("zenml deployment invoke my-deployment");
		});

		it("should fallback to basic command when body is a number", () => {
			const result = buildZenCommand("my-deployment", 42);

			expect(result).toBe("zenml deployment invoke my-deployment");
		});

		it("should fallback to basic command when body is a boolean", () => {
			const result = buildZenCommand("my-deployment", true);

			expect(result).toBe("zenml deployment invoke my-deployment");
		});

		it("should handle empty object (produces trailing space)", () => {
			const result = buildZenCommand("my-deployment", {});

			// Note: Empty object produces a trailing space due to implementation
			expect(result).toBe("zenml deployment invoke my-deployment ");
		});

		it("should handle deployment name with special characters", () => {
			const body = { param: "value" };
			const result = buildZenCommand("my-deployment-123_test", body);

			expect(result).toBe('zenml deployment invoke my-deployment-123_test --param="value"');
		});

		it("should properly JSON stringify complex nested objects and remain parseable", () => {
			const body = {
				config: {
					database: {
						host: "localhost",
						port: 5432,
						credentials: {
							user: "admin",
							pass: "secret"
						}
					}
				}
			};
			const result = buildZenCommand("my-deployment", body);

			expect(result).toContain("--config=");
			expect(result).toContain("'");
			// Verify the JSON is properly stringified and can be parsed back
			const jsonMatch = result.match(/--config='(.+)'/);
			expect(jsonMatch).toBeTruthy();
			if (jsonMatch) {
				const parsed = JSON.parse(jsonMatch[1]);
				expect(parsed.database.credentials.user).toBe("admin");
			}
		});

		it("should handle empty string values", () => {
			const body = { name: "" };
			const result = buildZenCommand("my-deployment", body);

			expect(result).toBe('zenml deployment invoke my-deployment --name=""');
		});

		it("should preserve order of parameters", () => {
			const body = { alpha: 1, beta: 2, gamma: 3 };
			const result = buildZenCommand("my-deployment", body);

			const alphaIndex = result.indexOf("--alpha");
			const betaIndex = result.indexOf("--beta");
			const gammaIndex = result.indexOf("--gamma");

			expect(alphaIndex).toBeLessThan(betaIndex);
			expect(betaIndex).toBeLessThan(gammaIndex);
		});
	});
});

describe("build invocation python command", () => {
	describe("happy paths", () => {
		it("should build basic command without body", () => {
			const result = buildPythonCommand({
				deploymentId: "my-deployment",
				defaultBody: undefined
			});

			expect(result).toBe(
				`from zenml.deployers.utils import invoke_deployment\n\nresponse = invoke_deployment(\n    deployment_name_or_id="my-deployment"\n)`
			);
		});

		it("should handle mixed parameter types (string, number, boolean, array, object)", () => {
			const body = {
				name: "test",
				count: 5,
				enabled: true,
				tags: ["a", "b"],
				config: { key: "val" }
			};
			const result = buildPythonCommand({
				deploymentId: "my-deployment",
				defaultBody: body
			});

			expect(result).toContain('name="test"');
			expect(result).toContain("count=5");
			expect(result).toContain("enabled=true");
			expect(result).toContain('tags=["a","b"]');
			expect(result).toContain('config={"key":"val"}');
		});

		it("should handle null values", () => {
			const body = { optional: null };
			const result = buildPythonCommand({
				deploymentId: "my-deployment",
				defaultBody: body
			});

			expect(result).toContain("optional=None");
		});
	});

	describe("edge cases and fallbacks", () => {
		it("should fallback to basic command when body is null", () => {
			const result = buildPythonCommand({
				deploymentId: "my-deployment",
				defaultBody: null
			});

			expect(result).toBe(
				`from zenml.deployers.utils import invoke_deployment\n\nresponse = invoke_deployment(\n    deployment_name_or_id="my-deployment"\n)`
			);
		});

		it("should fallback to basic command when body is an array", () => {
			const result = buildPythonCommand({
				deploymentId: "my-deployment",
				defaultBody: [1, 2, 3]
			});

			expect(result).toBe(
				`from zenml.deployers.utils import invoke_deployment\n\nresponse = invoke_deployment(\n    deployment_name_or_id="my-deployment"\n)`
			);
		});

		it("should fallback to basic command when body is a string", () => {
			const result = buildPythonCommand({
				deploymentId: "my-deployment",
				defaultBody: "not-an-object"
			});

			expect(result).toBe(
				`from zenml.deployers.utils import invoke_deployment\n\nresponse = invoke_deployment(\n    deployment_name_or_id="my-deployment"\n)`
			);
		});

		it("should handle empty object", () => {
			const result = buildPythonCommand({
				deploymentId: "my-deployment",
				defaultBody: {}
			});

			expect(result).toBe(
				`from zenml.deployers.utils import invoke_deployment\n\nresponse = invoke_deployment(\n    deployment_name_or_id="my-deployment"\n)`
			);
		});

		it("should handle deployment ID with special characters", () => {
			const body = { param: "value" };
			const result = buildPythonCommand({
				deploymentId: "my-deployment-123_test",
				defaultBody: body
			});

			expect(result).toContain('deployment_name_or_id="my-deployment-123_test"');
			expect(result).toContain('param="value"');
		});

		it("should properly JSON stringify complex nested objects and remain parseable", () => {
			const body = {
				config: {
					database: {
						host: "localhost",
						port: 5432,
						credentials: {
							user: "admin",
							pass: "secret"
						}
					}
				}
			};
			const result = buildPythonCommand({
				deploymentId: "my-deployment",
				defaultBody: body
			});

			expect(result).toContain("config=");
			// Verify the JSON is properly stringified
			const jsonMatch = result.match(/config=(.+)/);
			expect(jsonMatch).toBeTruthy();
			if (jsonMatch) {
				const jsonStr = jsonMatch[1].trim();
				const parsed = JSON.parse(jsonStr);
				expect(parsed.database.credentials.user).toBe("admin");
			}
		});

		it("should handle empty string values", () => {
			const body = { name: "" };
			const result = buildPythonCommand({
				deploymentId: "my-deployment",
				defaultBody: body
			});

			expect(result).toContain('name=""');
		});
	});
});
