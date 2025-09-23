import { components, operations } from "./core";

// Detail
export type PipelineSnapshot = components["schemas"]["PipelineSnapshotResponse"];

// List

export type PipelineSnapshotList = components["schemas"]["Page_PipelineSnapshotResponse_"];

export type PipelineSnapshotListQueryParams = NonNullable<
	operations["list_pipeline_snapshots_api_v1_pipeline_snapshots_get"]["parameters"]["query"]
>;

// Update
export type PipelineSnapshotUpdate = components["schemas"]["PipelineSnapshotUpdate"];
