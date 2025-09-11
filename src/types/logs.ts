import { operations, components } from "./core";

// @ts-expect-error - LoggingLevels does not exist in the core schema
export type LoggingLevel = components["schemas"]["LoggingLevels"];

// @ts-expect-error - LogEntry does not exist in the core schema
export type LogEntry = components["schemas"]["LogEntry"];

export type LogResponse = LogEntry[];

export type LogEntryInternal = LogEntry & {
	originalEntry: string;
};

export type RunLogsQueryParams = NonNullable<
	operations["run_logs_api_v1_runs__run_id__logs_get"]["parameters"]["query"]
>;
