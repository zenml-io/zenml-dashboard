import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

function dryRun(): GithubPipelineMetadata {
	return {
		pipelineOrder: [
			{
				index: 0,
				directory: "hello_pipeline",
				name: "Hello World"
			},
			{
				index: 1,
				directory: "io_pipeline",
				name: "Step IO"
			},
			{
				index: 2,
				directory: "param_pipeline",
				name: "Parameters"
			},
			{
				index: 3,
				directory: "tagged_pipeline",
				name: "Tagging"
			},
			{
				index: 4,
				directory: "meta_pipeline",
				name: "Metadata"
			},
			{
				index: 5,
				directory: "cache_pipeline",
				name: "Caching"
			},
			{
				index: 6,
				directory: "viz_pipeline",
				name: "Visualizations"
			},
			{
				index: 7,
				directory: "fan_pipeline",
				name: "Fan Out Fan In"
			},
			{
				index: 8,
				directory: "robust_pipeline",
				name: "Retries and Hooks"
			},
			{
				index: 9,
				directory: "yaml_pipeline",
				name: "YAML Config"
			}
		]
	} as const;
}

const githubPipelineOrderEntrySchema = z.object({
	index: z.number(),
	directory: z.string(),
	name: z.string()
});

const githubPipelinesOrderSchema = z.object({
	pipelineOrder: z.array(githubPipelineOrderEntrySchema)
});

export type GithubPipelineOrderEntry = z.infer<typeof githubPipelineOrderEntrySchema>;
type GithubPipelineMetadata = z.infer<typeof githubPipelinesOrderSchema>;

async function fetchGithubPipeliens(): Promise<GithubPipelineMetadata> {
	const response = await fetch(
		"https://api.github.com/repos/zenml-io/vscode-tutorial-extension/contents/pipelines"
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
		queryFn: async () => dryRun(),
		...options
	});
}
