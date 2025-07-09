import { GithubDirectory } from "@/types/github";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

async function fetchGithubPipeliens(): Promise<GithubDirectory> {
	const response = await fetch(
		"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines"
	);
	if (!response.ok) {
		throw new Error("Failed to fetch pipelines from Github");
	}
	const data: GithubDirectory = await response.json();
	return data;
}

function dryRun() {
	console.log("called");
	return [
		{
			name: "caching",
			path: "pipelines/caching",
			sha: "9797c2524291f9f0a10ea412a361a9eb62e8e271",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/caching?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/caching",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/9797c2524291f9f0a10ea412a361a9eb62e8e271",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/caching?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/9797c2524291f9f0a10ea412a361a9eb62e8e271",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/caching"
			}
		},
		{
			name: "completion",
			path: "pipelines/completion",
			sha: "cee4a53e7c2d9ca69dac33f52f55bfe418a7ed65",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/completion?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/completion",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/cee4a53e7c2d9ca69dac33f52f55bfe418a7ed65",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/completion?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/cee4a53e7c2d9ca69dac33f52f55bfe418a7ed65",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/completion"
			}
		},
		{
			name: "fanOut",
			path: "pipelines/fanOut",
			sha: "7a1db38b4293be751a45163b3c075fafa0f40fac",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/fanOut?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/fanOut",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/7a1db38b4293be751a45163b3c075fafa0f40fac",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/fanOut?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/7a1db38b4293be751a45163b3c075fafa0f40fac",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/fanOut"
			}
		},
		{
			name: "helloWorld",
			path: "pipelines/helloWorld",
			sha: "d0b68fcea651b4461b5c78d8936a0b01b96e6a19",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/helloWorld?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/helloWorld",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/d0b68fcea651b4461b5c78d8936a0b01b96e6a19",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/helloWorld?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/d0b68fcea651b4461b5c78d8936a0b01b96e6a19",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/helloWorld"
			}
		},
		{
			name: "metadata",
			path: "pipelines/metadata",
			sha: "5fc4cee54a30736bdc3fb7109f5519bd3bc16871",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/metadata?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/metadata",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/5fc4cee54a30736bdc3fb7109f5519bd3bc16871",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/metadata?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/5fc4cee54a30736bdc3fb7109f5519bd3bc16871",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/metadata"
			}
		},
		{
			name: "parameters",
			path: "pipelines/parameters",
			sha: "5f3571724d6c7c1812470816cd06d218799ad79e",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/parameters?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/parameters",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/5f3571724d6c7c1812470816cd06d218799ad79e",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/parameters?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/5f3571724d6c7c1812470816cd06d218799ad79e",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/parameters"
			}
		},
		{
			name: "retries",
			path: "pipelines/retries",
			sha: "9dc526410c761c15216d680f4697b8c62edae100",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/retries?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/retries",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/9dc526410c761c15216d680f4697b8c62edae100",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/retries?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/9dc526410c761c15216d680f4697b8c62edae100",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/retries"
			}
		},
		{
			name: "stepIO",
			path: "pipelines/stepIO",
			sha: "bdd52a1f0968ccbe349b51e529e004c3d4a73b87",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/stepIO?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/stepIO",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/bdd52a1f0968ccbe349b51e529e004c3d4a73b87",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/stepIO?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/bdd52a1f0968ccbe349b51e529e004c3d4a73b87",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/stepIO"
			}
		},
		{
			name: "tagging",
			path: "pipelines/tagging",
			sha: "4486a70fdeceed2988bb38675674f89e400e1724",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/tagging?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/tagging",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/4486a70fdeceed2988bb38675674f89e400e1724",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/tagging?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/4486a70fdeceed2988bb38675674f89e400e1724",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/tagging"
			}
		},
		{
			name: "visualizations",
			path: "pipelines/visualizations",
			sha: "acb9d8e0591e1d2bbe4b4ab720a6e5202d7ef6e4",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/visualizations?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/visualizations",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/acb9d8e0591e1d2bbe4b4ab720a6e5202d7ef6e4",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/visualizations?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/acb9d8e0591e1d2bbe4b4ab720a6e5202d7ef6e4",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/visualizations"
			}
		},
		{
			name: "welcome",
			path: "pipelines/welcome",
			sha: "bd694dcadf930afffc826251b8d95e85816dae44",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/welcome?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/welcome",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/bd694dcadf930afffc826251b8d95e85816dae44",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/welcome?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/bd694dcadf930afffc826251b8d95e85816dae44",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/welcome"
			}
		},
		{
			name: "yamlConfig",
			path: "pipelines/yamlConfig",
			sha: "29fac04391e96abf4f2508a11fe9cdd888b5aa4b",
			size: 0,
			url: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/yamlConfig?ref=develop",
			html_url:
				"https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/yamlConfig",
			git_url:
				"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/29fac04391e96abf4f2508a11fe9cdd888b5aa4b",
			download_url: null,
			type: "dir",
			_links: {
				self: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines/yamlConfig?ref=develop",
				git: "https://api.github.com/repos/zenml-io/vscode-tutorial-extension/git/trees/29fac04391e96abf4f2508a11fe9cdd888b5aa4b",
				html: "https://github.com/zenml-io/vscode-tutorial-extension/tree/develop/pipelines/yamlConfig"
			}
		}
	];
}

export function useGithubPipelines(
	options?: Omit<UseQueryOptions<GithubDirectory>, "queryKey" | "queryFn">
) {
	return useQuery<GithubDirectory>({
		queryKey: ["github", "repos", "zenml-io", "vscode-tutorial-extension", "pipelines"],
		queryFn: async () => dryRun(),
		...options
	});
}
