import { components, operations } from "./core";

export type ExecutionStatus = components["schemas"]["ExecutionStatus"];
export type PipelineRun = components["schemas"]["PipelineRunResponse"];
export type PipelineRunBody = components["schemas"]["PipelineRunResponseBody"];

export type PipelineRunOvervieweParams = NonNullable<
	operations["list_runs_api_v1_runs_get"]["parameters"]["query"]
>;

export type PipelineRunDetailQueryParams = NonNullable<
	operations["get_run_api_v1_runs__run_id__get"]["parameters"]["query"]
>;
export type PipelineRunPage = components["schemas"]["Page_PipelineRunResponse_"];

export type RunRefreshQueryParams = NonNullable<
	operations["refresh_run_status_api_v1_runs__run_id__refresh_post"]["parameters"]["query"]
>;

export type PipelineRunStopParams = NonNullable<
	operations["stop_run_api_v1_runs__run_id__stop_post"]["parameters"]["query"]
>;

export type RunLogsDownloadTokenQueryParams = NonNullable<
	operations["get_run_logs_download_token_api_v1_runs__run_id__logs_download_token_get"]["parameters"]["query"]
>;
