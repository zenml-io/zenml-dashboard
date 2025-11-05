import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

const githubPipelineOrderEntrySchema = z.object({
	index: z.number(),
	directory: z.string(),
	name: z.string(),
	deployable: z.boolean()
});

const githubPipelinesOrderSchema = z.object({
	pipelineOrder: z.array(githubPipelineOrderEntrySchema)
});

export type GithubPipelineOrderEntry = z.infer<typeof githubPipelineOrderEntrySchema>;
type GithubPipelineMetadata = z.infer<typeof githubPipelinesOrderSchema>;

async function fetchGithubPipeliens(): Promise<GithubPipelineMetadata> {
	const response = await fetch(
		"https://raw.githubusercontent.com/zenml-io/vscode-tutorial-extension/HEAD/pipelines/metadata.json"
	);
	if (!response.ok) {
		throw new Error("Failed to fetch pipelines from Github");
	}
	const data = await response.json();
	const parsedData = githubPipelinesOrderSchema.parse(data);
	return parsedData;
}

export function useGithubPipelines(
	options?: Omit<UseQueryOptions<GithubPipelineMetadata>, "queryKey" | "queryFn">
) {
	return useQuery<GithubPipelineMetadata>({
		queryKey: ["github", "vscode-tutorial-extension", "pipelines"],
		queryFn: async () => fetchGithubPipeliens(),
		...options
	});
}
