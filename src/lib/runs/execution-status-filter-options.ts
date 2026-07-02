import type { ExecutionStatusFilterValue } from "@/types/pipeline-runs";

export type ExecutionStatusFilterOption = {
	value: ExecutionStatusFilterValue;
	label: string;
};

export const EXECUTION_STATUS_FILTER_OPTIONS = [
	{ value: "all", label: "All" },
	{ value: "completed", label: "Completed" },
	{ value: "failed", label: "Failed" },
	{ value: "running", label: "Running" },
	{ value: "cached", label: "Cached" },
	{ value: "stopped", label: "Stopped" },
	{ value: "retried", label: "Retried" },
	{ value: "initializing", label: "Initializing" },
	{ value: "provisioning", label: "Provisioning" },
	{ value: "queued", label: "Queued" },
	{ value: "retrying", label: "Retrying" },
	{ value: "resuming", label: "Resuming" },
	{ value: "paused", label: "Paused" },
	{ value: "skipped", label: "Skipped" },
	{ value: "stopping", label: "Stopping" },
	{ value: "cancelling", label: "Cancelling" },
	{ value: "cancelled", label: "Cancelled" }
] as const satisfies readonly ExecutionStatusFilterOption[];
