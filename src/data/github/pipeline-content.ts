import { useQuery, UseQueryOptions } from "@tanstack/react-query";

async function fetchPipelineContent(pipelineName: string) {
	const url = `https://raw.githubusercontent.com/zenml-io/vscode-tutorial-extension/refs/heads/develop/pipelines/${pipelineName}/${pipelineName}.py`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Failed to fetch pipeline content");
	}
	const data = await response.text();
	return data;
}

export function useGithubPipelineContent(
	pipelineName: string,
	options?: Omit<UseQueryOptions<string>, "queryKey" | "queryFn">
) {
	return useQuery<string>({
		queryKey: ["github", "vscode-tutorial-extension", "pipeline-content", pipelineName],
		queryFn: async () => fetchPipelineContent(pipelineName),
		...options
	});
}
