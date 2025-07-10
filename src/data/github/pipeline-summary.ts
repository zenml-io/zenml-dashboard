import { useQuery, UseQueryOptions } from "@tanstack/react-query";

async function fetchPipelineContent(pipelineName: string) {
	const url = `https://raw.githubusercontent.com/zenml-io/vscode-tutorial-extension/refs/heads/develop/pipelines/${pipelineName}/summary.md`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Failed to fetch pipeline summary");
	}
	const data = await response.text();
	return data;
}

export function useGithubPipelineSummary(
	pipelineName: string,
	options?: Omit<UseQueryOptions<string>, "queryKey" | "queryFn">
) {
	return useQuery<string>({
		queryKey: ["github", "vscode-tutorial-extension", "pipeline-summary", pipelineName],
		queryFn: async () => fetchPipelineContent(pipelineName),
		...options
	});
}
