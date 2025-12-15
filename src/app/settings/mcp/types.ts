export interface InstallationMethod {
	title: string;
	type: "automatic" | "docker" | "uv" | "mcpb" | "cli";
	hasDeepLink?: boolean;
	deepLinkUrl?: string;
	config?: string;
	bashCommand?: string;
	description?: string;
	steps: string[];
	note?: string;
}

export interface IDEConfig {
	name: string;
	value: string;
	methods: InstallationMethod[];
	troubleshooting?: string;
}
