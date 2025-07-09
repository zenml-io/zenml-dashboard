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

export function useGithubPipelines(
	options?: Omit<UseQueryOptions<GithubDirectory>, "queryKey" | "queryFn">
) {
	return useQuery<GithubDirectory>({
		queryKey: ["github", "repos", "zenml-io", "vscode-tutorial-extension", "pipelines"],
		queryFn: async () => fetchGithubPipeliens(),
		...options
	});
}
