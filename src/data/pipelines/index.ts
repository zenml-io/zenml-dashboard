import { PipelineListParams } from "@/types/pipelines";
import { queryOptions } from "@tanstack/react-query";
import { fetchAllPipelines } from "./pipeline-list-query";

export const pipelineQueries = {
	all: ["pipelines"],
	pipelineList: (queryParams: PipelineListParams) =>
		queryOptions({
			queryKey: [...pipelineQueries.all, queryParams],
			queryFn: async () => fetchAllPipelines({ params: queryParams })
		})
};
