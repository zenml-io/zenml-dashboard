import { operations, components } from "./core";

export type LoggingLevel = components["schemas"]["LoggingLevels"];

export type LogEntry = components["schemas"]["LogEntry"];

export type LogResponse = LogEntry[];

export type LogEntryInternal = LogEntry & {
	originalEntry: string;
	formattedTimestamp: string | null;
};

export type RunLogsQueryParams = NonNullable<
	operations["run_logs_api_v1_runs__run_id__logs_get"]["parameters"]["query"]
>;

export type LogEntriesResponse = components["schemas"]["LogsEntriesResponse"];
export type LogEntriesQueryParams = NonNullable<
	operations["get_logs_entries_api_v1_logs__logs_id__entries_get"]["parameters"]["query"]
>;

export type LogSourceOption = {
	value: string;
	label: string;
	hasLogStore: boolean;
};
