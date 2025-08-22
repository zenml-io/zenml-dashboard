import { components, operations } from "./core";

export type LoggingLevel = components["schemas"]["LoggingLevels"];

export type LogEntry = components["schemas"]["LogEntry"];

export type LogPage = components["schemas"]["Page_LogEntry_"];

export type RunLogsQueryParams = NonNullable<
	operations["run_logs_api_v1_runs__run_id__logs_get"]["parameters"]["query"]
>;
