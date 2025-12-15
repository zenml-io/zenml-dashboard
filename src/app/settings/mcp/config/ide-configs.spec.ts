import { describe, it, test, expect } from "vitest";
import {
	getProjectIdDockerArgs,
	getProjectIdBashLine,
	getProjectIdJqArrayLine,
	getProjectIdJqEnvLine,
	getProjectIdEnvFlag,
	buildDockerArgs,
	buildVsCodeDeepLink,
	buildCursorDeepLink,
	buildVsCodeCliCommand,
	buildDockerConfig,
	buildUvConfig
} from "./ide-configs";

describe("getProjectIdDockerArgs", () => {
	const testCases: { projectId: string; expected: string[] }[] = [
		{ projectId: "", expected: [] },
		{
			projectId: "project-123",
			expected: ["-e", "ZENML_ACTIVE_PROJECT_ID=project-123"]
		}
	];

	testCases.forEach(({ projectId, expected }) => {
		test(`returns correct docker args for projectId="${projectId}"`, () => {
			expect(getProjectIdDockerArgs(projectId)).toEqual(expected);
		});
	});
});

describe("getProjectIdBashLine", () => {
	const testCases = [
		{
			projectId: "",
			expected: ""
		},
		{
			projectId: "project-123",
			expected: `\n\t-e ZENML_ACTIVE_PROJECT_ID=project-123 \\`
		}
	];

	testCases.forEach(({ projectId, expected }) => {
		test(`returns correct bash line for projectId="${projectId}"`, () => {
			expect(getProjectIdBashLine(projectId)).toBe(expected);
		});
	});
});

describe("getProjectIdJqArrayLine", () => {
	const testCases = [
		{
			projectId: "",
			expected: ""
		},
		{
			projectId: "project-123",
			expected: `\n\t\t\t"-e","ZENML_ACTIVE_PROJECT_ID=project-123",`
		}
	];

	testCases.forEach(({ projectId, expected }) => {
		test(`returns correct jq array line for projectId="${projectId}"`, () => {
			expect(getProjectIdJqArrayLine(projectId)).toBe(expected);
		});
	});
});

describe("getProjectIdJqEnvLine", () => {
	const testCases = [
		{
			projectId: "",
			expected: ""
		},
		{
			projectId: "project-123",
			expected: `,\n\t\t"ZENML_ACTIVE_PROJECT_ID": "project-123"`
		}
	];

	testCases.forEach(({ projectId, expected }) => {
		test(`returns correct jq env line for projectId="${projectId}"`, () => {
			expect(getProjectIdJqEnvLine(projectId)).toBe(expected);
		});
	});
});

describe("getProjectIdEnvFlag", () => {
	const testCases = [
		{
			projectId: "",
			expected: ""
		},
		{
			projectId: "project-123",
			expected: `\n\t--env ZENML_ACTIVE_PROJECT_ID=project-123 \\`
		}
	];

	testCases.forEach(({ projectId, expected }) => {
		test(`returns correct env flag for projectId="${projectId}"`, () => {
			expect(getProjectIdEnvFlag(projectId)).toBe(expected);
		});
	});
});

describe("buildDockerArgs", () => {
	const endpointUrl = "https://api.example.com";
	const token = "test-token";

	const expectedMcpEnvVars: Record<string, string> = {
		LOGLEVEL: "WARNING",
		NO_COLOR: "1",
		ZENML_LOGGING_COLORS_DISABLED: "true",
		ZENML_LOGGING_VERBOSITY: "WARN",
		ZENML_ENABLE_RICH_TRACEBACK: "false",
		PYTHONUNBUFFERED: "1",
		PYTHONIOENCODING: "UTF-8"
	};

	const testCases = [
		{ projectId: "", hasProjectId: false },
		{ projectId: "project-123", hasProjectId: true }
	];

	testCases.forEach(({ projectId, hasProjectId }) => {
		test(`builds correct docker args for projectId="${projectId}"`, () => {
			const args = buildDockerArgs(endpointUrl, token, projectId);

			// Basic structure
			expect(args[0]).toBe("run");
			expect(args[1]).toBe("-i");
			expect(args[2]).toBe("--rm");

			// Store URL and API key should be present and preceded by -e
			const storeUrlEnv = `ZENML_STORE_URL=${endpointUrl}`;
			const storeUrlIndex = args.indexOf(storeUrlEnv);
			expect(storeUrlIndex).toBeGreaterThan(-1);
			expect(args[storeUrlIndex - 1]).toBe("-e");

			const apiKeyEnv = `ZENML_STORE_API_KEY=${token}`;
			const apiKeyIndex = args.indexOf(apiKeyEnv);
			expect(apiKeyIndex).toBeGreaterThan(-1);
			expect(args[apiKeyIndex - 1]).toBe("-e");

			// MCP env vars should all be present and preceded by -e
			Object.entries(expectedMcpEnvVars).forEach(([key, value]) => {
				const envString = `${key}=${value}`;
				const index = args.indexOf(envString);
				expect(index).toBeGreaterThan(-1);
				expect(args[index - 1]).toBe("-e");
			});

			// Project ID env var presence/absence
			const projectEnvPrefix = "ZENML_ACTIVE_PROJECT_ID=";
			const hasProjectEnv = args.some((arg) => arg.startsWith(projectEnvPrefix));
			expect(hasProjectEnv).toBe(hasProjectId);

			if (hasProjectId) {
				const projectEnv = `${projectEnvPrefix}${projectId}`;
				const projectIndex = args.indexOf(projectEnv);
				expect(projectIndex).toBeGreaterThan(-1);
				expect(args[projectIndex - 1]).toBe("-e");
			}

			// Last element should be the docker image
			expect(args[args.length - 1]).toBe("zenmldocker/mcp-zenml:latest");
		});
	});
});

describe("buildVsCodeDeepLink", () => {
	const endpointUrl = "https://api.example.com";
	const token = "test-token";
	const projectId = "project-123";

	it("returns a vscode deep link with encoded JSON payload", () => {
		const url = buildVsCodeDeepLink(endpointUrl, token, projectId);

		expect(url.startsWith("vscode:mcp/install?")).toBe(true);

		const questionMarkIndex = url.indexOf("?");
		expect(questionMarkIndex).toBeGreaterThan(-1);

		const query = url.slice(questionMarkIndex + 1);
		const decoded = decodeURIComponent(query);
		const payload = JSON.parse(decoded) as {
			name: string;
			command: string;
			args: string[];
		};

		expect(payload.name).toBe("zenml");
		expect(payload.command).toBe("docker");
		expect(Array.isArray(payload.args)).toBe(true);
		expect(payload.args).toEqual(buildDockerArgs(endpointUrl, token, projectId));
	});
});

describe("buildCursorDeepLink", () => {
	const endpointUrl = "https://api.example.com";
	const token = "test-token";
	const projectId = "project-123";

	it("returns a cursor deep link with base64-encoded config", () => {
		const deepLink = buildCursorDeepLink(endpointUrl, token, projectId);

		expect(deepLink.startsWith("cursor://anysphere.cursor-deeplink/mcp/install?")).toBe(true);

		const url = new URL(deepLink);
		expect(url.protocol).toBe("cursor:");
		expect(url.hostname).toBe("anysphere.cursor-deeplink");
		expect(url.pathname).toBe("/mcp/install");

		const nameParam = url.searchParams.get("name");
		const configParam = url.searchParams.get("config");

		expect(nameParam).toBe("zenml");
		expect(configParam).toBeTruthy();

		const decodedConfigJson = atob(configParam as string);
		const config = JSON.parse(decodedConfigJson) as {
			command: string;
			args: string[];
			type: string;
		};

		expect(config.command).toBe("docker");
		expect(config.type).toBe("stdio");
		expect(Array.isArray(config.args)).toBe(true);
		expect(config.args).toEqual(buildDockerArgs(endpointUrl, token, projectId));
	});
});

describe("buildVsCodeCliCommand", () => {
	const endpointUrl = "https://api.example.com";
	const token = "test-token";
	const projectId = "project-123";

	it("returns a CLI command with embedded JSON payload", () => {
		const cmd = buildVsCodeCliCommand(endpointUrl, token, projectId);

		expect(cmd.startsWith("code --add-mcp ")).toBe(true);

		const jsonWithQuotes = cmd.slice("code --add-mcp ".length).trim();

		// jsonWithQuotes is a JSON string literal representing the payload JSON
		const payloadJson = JSON.parse(jsonWithQuotes) as string;
		const payload = JSON.parse(payloadJson) as {
			name: string;
			command: string;
			args: string[];
		};

		expect(payload.name).toBe("zenml");
		expect(payload.command).toBe("docker");
		expect(Array.isArray(payload.args)).toBe(true);
		expect(payload.args).toEqual(buildDockerArgs(endpointUrl, token, projectId));
	});
});

describe("buildDockerConfig", () => {
	const endpointUrl = "https://api.example.com";
	const token = "test-token";

	const testCases = [
		{ projectId: "", hasProjectId: false },
		{ projectId: "project-123", hasProjectId: true }
	];

	testCases.forEach(({ projectId, hasProjectId }) => {
		test(`returns valid docker JSON config for projectId="${projectId}"`, () => {
			const json = buildDockerConfig(endpointUrl, token, projectId);
			const parsed = JSON.parse(json) as {
				mcpServers: {
					zenml: {
						command: string;
						args: string[];
					};
				};
			};

			const zenml = parsed.mcpServers.zenml;
			expect(zenml.command).toBe("docker");
			expect(Array.isArray(zenml.args)).toBe(true);

			// Args should match buildDockerArgs output
			expect(zenml.args).toEqual(buildDockerArgs(endpointUrl, token, projectId));

			const hasProjectEnv = zenml.args.some((arg) => arg.startsWith("ZENML_ACTIVE_PROJECT_ID="));
			expect(hasProjectEnv).toBe(hasProjectId);
		});
	});
});

describe("buildUvConfig", () => {
	const endpointUrl = "https://api.example.com";
	const token = "test-token";

	const expectedMcpEnvVars: Record<string, string> = {
		LOGLEVEL: "WARNING",
		NO_COLOR: "1",
		ZENML_LOGGING_COLORS_DISABLED: "true",
		ZENML_LOGGING_VERBOSITY: "WARN",
		ZENML_ENABLE_RICH_TRACEBACK: "false",
		PYTHONUNBUFFERED: "1",
		PYTHONIOENCODING: "UTF-8"
	};

	const testCases = [
		{ projectId: "", hasProjectId: false },
		{ projectId: "project-123", hasProjectId: true }
	];

	testCases.forEach(({ projectId, hasProjectId }) => {
		test(`returns valid uv JSON config for projectId="${projectId}"`, () => {
			const json = buildUvConfig(endpointUrl, token, projectId);
			const parsed = JSON.parse(json) as {
				mcpServers: {
					zenml: {
						command: string;
						args: string[];
						env: Record<string, string>;
					};
				};
			};

			const zenml = parsed.mcpServers.zenml;
			expect(zenml.command).toBe("/usr/local/bin/uv");
			expect(zenml.args).toEqual(["run", "path/to/mcp-zenml/server/zenml_server.py"]);

			const env = zenml.env;

			// MCP env vars
			expect(env).toMatchObject(expectedMcpEnvVars);

			// Store URL and API key
			expect(env.ZENML_STORE_URL).toBe(endpointUrl);
			expect(env.ZENML_STORE_API_KEY).toBe(token);

			// Project ID conditional env
			if (hasProjectId) {
				expect(env.ZENML_ACTIVE_PROJECT_ID).toBe(projectId);
			} else {
				expect(env.ZENML_ACTIVE_PROJECT_ID).toBeUndefined();
			}
		});
	});
});
