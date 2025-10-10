import { PipelineListParams } from "@/types/pipelines";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchAllPipelines } from "./pipeline-list-query";
import { fetchPipelineDetail } from "./pipeline-detail";

export const pipelineQueries = {
	all: ["pipelines"],
	pipelineList: (queryParams: PipelineListParams) =>
		queryOptions({
			queryKey: [...pipelineQueries.all, queryParams],
			queryFn: async () => fetchAllPipelines({ params: queryParams })
		}),
	pipelineListInfinite: (queryParams: PipelineListParams) =>
		infiniteQueryOptions({
			queryKey: [...pipelineQueries.all, queryParams, "infinite"],
			queryFn: async ({ pageParam }) =>
				fetchAllPipelines({ params: { ...queryParams, page: pageParam } }),
			getNextPageParam: (lastPage) =>
				lastPage.index < lastPage.total_pages ? lastPage.index + 1 : null,
			initialPageParam: 1
		}),
	pipelineDetail: (pipelineId: string) =>
		queryOptions({
			queryKey: [...pipelineQueries.all, pipelineId],
			queryFn: async () => fetchPipelineDetail({ pipelineId })
		})
};
