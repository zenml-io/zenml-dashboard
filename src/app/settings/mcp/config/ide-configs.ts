import type { IDEConfig } from "../types";

const DOCKER_IMAGE = "zenmldocker/mcp-zenml:latest";

const MCP_ENV_VARS = {
	LOGLEVEL: "WARNING",
	NO_COLOR: "1",
	ZENML_LOGGING_COLORS_DISABLED: "true",
	ZENML_LOGGING_VERBOSITY: "WARN",
	ZENML_ENABLE_RICH_TRACEBACK: "false",
	PYTHONUNBUFFERED: "1",
	PYTHONIOENCODING: "UTF-8"
} as const;

// Helper to conditionally include project ID in docker args array
function getProjectIdDockerArgs(projectId: string): string[] {
	return projectId ? ["-e", `ZENML_ACTIVE_PROJECT_ID=${projectId}`] : [];
}

// Helper for bash command docker -e lines
function getProjectIdBashLine(projectId: string): string {
	return projectId ? `\n\t-e ZENML_ACTIVE_PROJECT_ID=${projectId} \\` : "";
}

// Helper for jq JSON array docker -e entries
function getProjectIdJqArrayLine(projectId: string): string {
	return projectId ? `\n\t\t\t"-e","ZENML_ACTIVE_PROJECT_ID=${projectId}",` : "";
}

// Helper for jq JSON env object entries
function getProjectIdJqEnvLine(projectId: string): string {
	return projectId ? `,\n\t\t"ZENML_ACTIVE_PROJECT_ID": "${projectId}"` : "";
}

// Helper for CLI --env flag
function getProjectIdEnvFlag(projectId: string): string {
	return projectId ? `\n\t--env ZENML_ACTIVE_PROJECT_ID=${projectId} \\` : "";
}

function getMcpEnvDockerArgs(): string[] {
	return Object.entries(MCP_ENV_VARS).flatMap(([key, value]) => ["-e", `${key}=${value}`]);
}

// Browser-only Base64-encode JSON using window.btoa
function encodeJsonToBase64(value: unknown): string {
	const json = JSON.stringify(value);
	return window.btoa(json);
}

function buildDockerArgs(endpointUrl: string, token: string, projectId: string): string[] {
	return [
		"run",
		"-i",
		"--rm",
		"-e",
		`ZENML_STORE_URL=${endpointUrl}`,
		"-e",
		`ZENML_STORE_API_KEY=${token}`,
		...getProjectIdDockerArgs(projectId),
		...getMcpEnvDockerArgs(),
		DOCKER_IMAGE
	];
}

function buildVsCodeDeepLink(endpointUrl: string, token: string, projectId: string): string {
	const payload = {
		name: "zenml",
		command: "docker",
		args: buildDockerArgs(endpointUrl, token, projectId)
	};
	return `vscode:mcp/install?${encodeURIComponent(JSON.stringify(payload))}`;
}

function buildCursorDeepLink(endpointUrl: string, token: string, projectId: string): string {
	// Config object matches ~/.cursor/mcp.json.mcpServers.zenml structure
	const cursorServerConfig = {
		command: "docker",
		args: buildDockerArgs(endpointUrl, token, projectId),
		type: "stdio"
	};

	const base64Config = encodeJsonToBase64(cursorServerConfig);
	const name = "zenml";

	return `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent(
		name
	)}&config=${base64Config}`;
}

function buildVsCodeCliCommand(endpointUrl: string, token: string, projectId: string): string {
	const payload = {
		name: "zenml",
		command: "docker",
		args: buildDockerArgs(endpointUrl, token, projectId)
	};
	const escapedJson = JSON.stringify(payload).replace(/"/g, '\\"');
	return `code --add-mcp "${escapedJson}"`;
}

const buildDockerConfig = (endpointUrl: string, token: string, projectId: string) =>
	JSON.stringify(
		{
			mcpServers: {
				zenml: {
					command: "docker",
					args: [
						"run",
						"-i",
						"--rm",
						"-e",
						`ZENML_STORE_URL=${endpointUrl}`,
						"-e",
						`ZENML_STORE_API_KEY=${token}`,
						...getProjectIdDockerArgs(projectId),
						...getMcpEnvDockerArgs(),
						DOCKER_IMAGE
					]
				}
			}
		},
		null,
		2
	);

const buildUvConfig = (endpointUrl: string, token: string, projectId: string) =>
	JSON.stringify(
		{
			mcpServers: {
				zenml: {
					command: "/usr/local/bin/uv",
					args: ["run", "path/to/mcp-zenml/server/zenml_server.py"],
					env: {
						...MCP_ENV_VARS,
						ZENML_STORE_URL: endpointUrl,
						ZENML_STORE_API_KEY: token,
						...(projectId ? { ZENML_ACTIVE_PROJECT_ID: projectId } : {})
					}
				}
			}
		},
		null,
		2
	);

export function getIDEConfigs(endpointUrl: string, token: string, projectId?: string): IDEConfig[] {
	const activeProjectId = projectId ?? "";

	const dockerConfig = buildDockerConfig(endpointUrl, token, activeProjectId);
	const uvConfig = buildUvConfig(endpointUrl, token, activeProjectId);

	return [
		{
			name: "VS Code",
			value: "vscode",
			methods: [
				{
					title: "Automatic Registration (Deep Link)",
					type: "automatic",
					hasDeepLink: true,
					deepLinkUrl: buildVsCodeDeepLink(endpointUrl, token, activeProjectId),
					description: "Click the link to add the Docker-driven MCP server to VS Code.",
					steps: [
						"Click the 'Install via Link' button above",
						"VS Code will prompt you to install the server"
					]
				},
				{
					title: "Manual Method (Docker CLI)",
					type: "cli",
					bashCommand: buildVsCodeCliCommand(endpointUrl, token, activeProjectId),
					description: "Use the VS Code CLI to install the ZenML MCP Server.",
					steps: [
						"Run the command in your terminal",
						"The server will be added to your VS Code configuration"
					]
				},
				{
					title: "Manual Method (uv CLI)",
					type: "cli",
					bashCommand: `code --add-mcp '{\n  "name": "zenml",\n  "command": "/usr/local/bin/uv",\n  "args": ["run", "/path/to/mcp-zenml/server/zenml_server.py"],\n  "env": {\n    "LOGLEVEL": "WARNING",\n    "NO_COLOR": "1",\n    "ZENML_LOGGING_COLORS_DISABLED": "true",\n    "ZENML_LOGGING_VERBOSITY": "WARN",\n    "ZENML_ENABLE_RICH_TRACEBACK": "false",\n    "PYTHONUNBUFFERED": "1",\n    "PYTHONIOENCODING": "UTF-8",\n    "ZENML_STORE_URL": "${endpointUrl}",\n    "ZENML_STORE_API_KEY": "${token}"${
						activeProjectId ? `,\n    "ZENML_ACTIVE_PROJECT_ID": "${activeProjectId}"` : ""
					}\n  }\n}'`,
					description: "Use the VS Code CLI with uv to install the ZenML MCP Server.",
					steps: [
						"Clone the repository: `git clone --depth 1 --branch main https://github.com/zenml-io/mcp-zenml.git`",
						"Ensure `uv` is installed globally",
						"Update the command to point to your `uv` and repository paths",
						"Run the command in your terminal"
					]
				}
			]
		},
		{
			name: "Claude Desktop",
			value: "claude-desktop",
			methods: [
				{
					title: "Automatic Registration (.mcpb file)",
					type: "mcpb",
					hasDeepLink: true,
					deepLinkUrl: "https://github.com/zenml-io/mcp-zenml/releases",
					steps: [
						"Visit https://github.com/zenml-io/mcp-zenml/releases and click on the latest release",
						"Download the mcp-zenml.mcpb file from the Assets section",
						"Open Claude Desktop and drag the .mcpb file onto the icon",
						'Click the "Disabled" button to enable the MCP server'
					]
				},
				{
					title: "Manual Method (Docker)",
					type: "docker",
					config: dockerConfig,
					steps: [
						"Add the configuration to your `claude_desktop_config.json` file",
						"This file is usually located in `Application Support/Claude` directory",
						"If you already have MCP servers configured, only add the `zenml` section"
					]
				},
				{
					title: "Manual Method (uv)",
					type: "uv",
					config: uvConfig,
					steps: [
						"Clone the repository: `git clone --depth 1 --branch main https://github.com/zenml-io/mcp-zenml.git`",
						"Ensure `uv` is installed globally on your system",
						"Add the configuration to your `claude_desktop_config.json` file",
						"Update the `command` and `args` to point to where `uv` is installed and where you cloned the repository"
					],
					note: "You will need to update the command and args paths to match your local installation."
				}
			],
			troubleshooting:
				"If the MCP server is not installed correctly, Claude Desktop will tell you it doesn't have access to the ZenML tools. Check the logs for any errors."
		},
		{
			name: "Cursor",
			value: "cursor",
			methods: [
				{
					title: "Automatic Registration (Deep Link)",
					type: "automatic",
					hasDeepLink: true,
					deepLinkUrl: buildCursorDeepLink(endpointUrl, token, activeProjectId),
					description: "Click to add the ZenML MCP server to Cursor.",
					steps: [
						"Click the 'Install via Link' button above",
						"Cursor will prompt you to install the server"
					]
				},
				{
					title: "Manual Method (Docker)",
					type: "docker",
					bashCommand: `mkdir -p ~/.cursor && \\
if [ -f ~/.cursor/mcp.json ]; then \\
	cp ~/.cursor/mcp.json ~/.cursor/mcp.json.backup && \\
	jq '.mcpServers.zenml = {
	"command":"docker",
	"args":["run","-i","--rm",
			"-e","ZENML_STORE_URL=${endpointUrl}",
			"-e","ZENML_STORE_API_KEY=${token}",${getProjectIdJqArrayLine(activeProjectId)}
			"-e","LOGLEVEL=WARNING",
			"-e","NO_COLOR=1",
			"-e","ZENML_LOGGING_COLORS_DISABLED=true",
			"-e","ZENML_LOGGING_VERBOSITY=WARN",
			"-e","ZENML_ENABLE_RICH_TRACEBACK=false",
			"-e","PYTHONUNBUFFERED=1",
			"-e","PYTHONIOENCODING=UTF-8",
			"${DOCKER_IMAGE}"],
	"type":"stdio"
	}' ~/.cursor/mcp.json > ~/.cursor/mcp.json.tmp && \\
	mv ~/.cursor/mcp.json.tmp ~/.cursor/mcp.json; \\
else \\
	echo '{"mcpServers":{}}' | jq '.mcpServers.zenml = {
	"command":"docker",
	"args":["run","-i","--rm",
			"-e","ZENML_STORE_URL=${endpointUrl}",
			"-e","ZENML_STORE_API_KEY=${token}",${getProjectIdJqArrayLine(activeProjectId)}
			"-e","LOGLEVEL=WARNING",
			"-e","NO_COLOR=1",
			"-e","ZENML_LOGGING_COLORS_DISABLED=true",
			"-e","ZENML_LOGGING_VERBOSITY=WARN",
			"-e","ZENML_ENABLE_RICH_TRACEBACK=false",
			"-e","PYTHONUNBUFFERED=1",
			"-e","PYTHONIOENCODING=UTF-8",
			"${DOCKER_IMAGE}"],
	"type":"stdio"
	}' > ~/.cursor/mcp.json; \\
fi`,
					description: "Use this CLI command to install the ZenML MCP Server in Cursor.",
					steps: [
						"Run the command in your terminal",
						"The server will be added to `~/.cursor/mcp.json`"
					]
				},
				{
					title: "Manual Method (uv)",
					type: "uv",
					bashCommand: `mkdir -p ~/.cursor && \\
if [ -f ~/.cursor/mcp.json ]; then \\
	cp ~/.cursor/mcp.json ~/.cursor/mcp.json.backup && \\
	jq '.mcpServers.zenml = {
	"command": "/usr/local/bin/uv",
	"args": ["run", "path/to/mcp-zenml/server/zenml_server.py"],
	"env": {
		"LOGLEVEL": "WARNING",
		"NO_COLOR": "1",
		"ZENML_LOGGING_COLORS_DISABLED": "true",
		"ZENML_LOGGING_VERBOSITY": "WARN",
		"ZENML_ENABLE_RICH_TRACEBACK": "false",
		"PYTHONUNBUFFERED": "1",
		"PYTHONIOENCODING": "UTF-8",
		"ZENML_STORE_URL": "${endpointUrl}",
		"ZENML_STORE_API_KEY": "${token}"${getProjectIdJqEnvLine(activeProjectId)}
	}
	}' ~/.cursor/mcp.json > ~/.cursor/mcp.json.tmp && \\
	mv ~/.cursor/mcp.json.tmp ~/.cursor/mcp.json; \\
else \\
	echo '{"mcpServers":{}}' | jq '.mcpServers.zenml = {
	"command": "/usr/local/bin/uv",
	"args": ["run", "path/to/mcp-zenml/server/zenml_server.py"],
	"env": {
		"LOGLEVEL": "WARNING",
		"NO_COLOR": "1",
		"ZENML_LOGGING_COLORS_DISABLED": "true",
		"ZENML_LOGGING_VERBOSITY": "WARN",
		"ZENML_ENABLE_RICH_TRACEBACK": "false",
		"PYTHONUNBUFFERED": "1",
		"PYTHONIOENCODING": "UTF-8",
		"ZENML_STORE_URL": "${endpointUrl}",
		"ZENML_STORE_API_KEY": "${token}"${getProjectIdJqEnvLine(activeProjectId)}
	}
	}' > ~/.cursor/mcp.json; \\
fi`,
					description: "Use this CLI command to install the ZenML MCP Server with uv in Cursor.",
					steps: [
						"Clone the repository: `git clone --depth 1 --branch main https://github.com/zenml-io/mcp-zenml.git`",
						"Ensure `uv` is installed globally",
						"Update the command to point to your `uv` and repository paths",
						"Run the command in your terminal"
					]
				}
			]
		},
		{
			name: "Claude Code",
			value: "claude-code",
			methods: [
				{
					title: "Manual Method (Docker)",
					type: "cli",
					bashCommand: `# Add for your current project (local scope)
claude mcp add zenml -- \\
	docker run -i --rm \\
	-e ZENML_STORE_URL=${endpointUrl} \\
	-e ZENML_STORE_API_KEY=${token} \\${getProjectIdBashLine(activeProjectId)}
	-e LOGLEVEL=WARNING \\
	-e NO_COLOR=1 \\
	-e ZENML_LOGGING_COLORS_DISABLED=true \\
	-e ZENML_LOGGING_VERBOSITY=WARN \\
	-e ZENML_ENABLE_RICH_TRACEBACK=false \\
	-e PYTHONUNBUFFERED=1 \\
	-e PYTHONIOENCODING=UTF-8 \\
	${DOCKER_IMAGE}`,
					description: "Install the ZenML MCP Server using the Claude CLI.",
					steps: [
						"Run the command in your terminal for local scope",
						"For user-scoped installation, add `--scope user` flag after `zenml`"
					],
					note: "User scope: `claude mcp add zenml --scope user --` [rest of command]"
				},
				{
					title: "Manual Method (uv)",
					type: "cli",
					bashCommand: `# Add for your current project (local scope)
claude mcp add zenml \\
	--env LOGLEVEL=WARNING \\
	--env NO_COLOR=1 \\
	--env ZENML_LOGGING_COLORS_DISABLED=true \\
	--env ZENML_LOGGING_VERBOSITY=WARN \\
	--env ZENML_ENABLE_RICH_TRACEBACK=false \\
	--env PYTHONUNBUFFERED=1 \\
	--env PYTHONIOENCODING=UTF-8 \\
	--env ZENML_STORE_URL=${endpointUrl} \\
	--env ZENML_STORE_API_KEY=${token} \\${getProjectIdEnvFlag(activeProjectId)}
	-- /usr/local/bin/uv run /path/to/mcp-zenml/server/zenml_server.py`,
					description: "Install the ZenML MCP Server with uv using the Claude CLI.",
					steps: [
						"Clone the repository: `git clone --depth 1 --branch main https://github.com/zenml-io/mcp-zenml.git`",
						"Ensure `uv` is installed globally",
						"Update the command to point to your `uv` and repository paths",
						"Run the command in your terminal",
						"For user-scoped installation, add `--scope user` flag after `zenml`"
					]
				}
			],
			troubleshooting:
				"Use the `/mcp` command inside claude to check connection status and trigger reconnect if needed."
		},
		{
			name: "OpenAI Codex",
			value: "codex",
			methods: [
				{
					title: "Manual Method (Docker)",
					type: "cli",
					bashCommand: `codex mcp add zenml docker run -i --rm \\
	-e ZENML_STORE_URL=${endpointUrl} \\
	-e ZENML_STORE_API_KEY=${token} \\${getProjectIdBashLine(activeProjectId)}
	-e LOGLEVEL=WARNING \\
	-e NO_COLOR=1 \\
	-e ZENML_LOGGING_COLORS_DISABLED=true \\
	-e ZENML_LOGGING_VERBOSITY=WARN \\
	-e ZENML_ENABLE_RICH_TRACEBACK=false \\
	-e PYTHONUNBUFFERED=1 \\
	-e PYTHONIOENCODING=UTF-8 \\
	${DOCKER_IMAGE}`,
					description: "Install the ZenML MCP Server using the Codex CLI.",
					steps: ["Run the command in your terminal"]
				},
				{
					title: "Manual Method (uv)",
					type: "cli",
					bashCommand: `codex mcp add zenml /usr/local/bin/uv run path/to/mcp-zenml/server/zenml_server.py \\
	--env LOGLEVEL=WARNING \\
	--env NO_COLOR=1 \\
	--env ZENML_LOGGING_COLORS_DISABLED=true \\
	--env ZENML_LOGGING_VERBOSITY=WARN \\
	--env ZENML_ENABLE_RICH_TRACEBACK=false \\
	--env PYTHONUNBUFFERED=1 \\
	--env PYTHONIOENCODING=UTF-8 \\
	--env ZENML_STORE_URL=${endpointUrl} \\
	--env ZENML_STORE_API_KEY=${token}${activeProjectId ? " \\" : ""}${
		activeProjectId ? getProjectIdEnvFlag(activeProjectId).replace(" \\", "") : ""
	}`,
					description: "Install the ZenML MCP Server with uv using the Codex CLI.",
					steps: [
						"Clone the repository: `git clone --depth 1 --branch main https://github.com/zenml-io/mcp-zenml.git`",
						"Ensure `uv` is installed globally",
						"Update the command to point to your `uv` and repository paths",
						"Run the command in your terminal"
					]
				}
			],
			troubleshooting:
				"Use the `/mcp` command inside codex to check connection status and trigger reconnect if needed."
		},
		{
			name: "Other Clients",
			value: "other",
			methods: [
				{
					title: "Docker Installation",
					type: "docker",
					config: dockerConfig,
					description:
						"Use this JSON configuration for any MCP client that supports Docker-based servers.",
					steps: [
						"Insert this configuration where your application requires MCP server registration",
						"Update `ZENML_STORE_URL`, `ZENML_STORE_API_KEY`, and `ZENML_ACTIVE_PROJECT_ID` with your values"
					]
				},
				{
					title: "Non-Docker Installation (uv)",
					type: "uv",
					config: uvConfig,
					description:
						"Use this JSON configuration for any MCP client that supports local execution with `uv`.",
					steps: [
						"Clone the repository: `git clone --depth 1 --branch main https://github.com/zenml-io/mcp-zenml.git`",
						"Ensure `uv` is installed globally",
						"Update the `command` and `args` paths to match your installation",
						"Update `ZENML_STORE_URL`, `ZENML_STORE_API_KEY`, and `ZENML_ACTIVE_PROJECT_ID` with your values",
						"Insert this configuration where your application requires MCP server registration"
					]
				}
			]
		}
	];
}

/**
 * Internal helpers exposed for unit testing. Application code should prefer using getIDEConfigs
 * and avoid depending directly on these lower-level utilities.
 */
export {
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
};
