import { PipelineSnapshotListQueryParams } from "@/types/pipeline-snapshots";
import { queryOptions } from "@tanstack/react-query";
import { fetchPipelineSnapshotDetail } from "./fetch-snapshot-detail";
import { fetchSnapshotList } from "./list-snapshots";

export const pipelineSnapshotQueries = {
	all: ["pipeline_snapshots"] as const,
	detail: (snapshotId: string) =>
		queryOptions({
			queryKey: [...pipelineSnapshotQueries.all, snapshotId],
			queryFn: async () => fetchPipelineSnapshotDetail({ snapshotId })
		}),
	list: (queryParams: PipelineSnapshotListQueryParams) =>
		queryOptions({
			queryKey: [...pipelineSnapshotQueries.all, queryParams],
			queryFn: async () => fetchSnapshotList({ params: queryParams })
		})
};
