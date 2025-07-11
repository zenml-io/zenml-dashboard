import { operations } from "./core";

export type LogLevel = "INFO" | "ERROR" | "WARN" | "DEBUG" | "CRITICAL";

export interface LogEntry {
	id: string; // Unique identifier for the log line, can be helpful for keys in React
	timestamp: string | number | null; // Can be a string (ISO format) or a number (Unix timestamp)
	level: LogLevel;
	message: string;
	originalEntry: string;
	// Optional: For structured logs, you might want to include an object for additional data
	details?: Record<string, any>;
}

export type RunLogsQueryParams = NonNullable<
	operations["run_logs_api_v1_runs__run_id__logs_get"]["parameters"]["query"]
>;
