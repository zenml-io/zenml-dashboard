import { queryOptions } from "@tanstack/react-query";
import { fetchPipelineDeployment } from "./fetch-snapshot-detail";

export const pipelineSnapshotQueries = {
	all: ["pipeline_snapshots"] as const,
	detail: (snapshotId: string) =>
		queryOptions({
			queryKey: [...pipelineSnapshotQueries.all, snapshotId],
			queryFn: async () => fetchPipelineDeployment({ snapshotId })
		})
};
