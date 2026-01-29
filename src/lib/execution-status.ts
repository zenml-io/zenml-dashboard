import { ExecutionStatus } from "@/types/pipeline-runs";

const RUNNING_STATUSES: ExecutionStatus[] = [
	"running",
	"retrying",
	"initializing",
	"provisioning",
	"stopping"
];

export function isRunningStatus(status: ExecutionStatus): boolean {
	return RUNNING_STATUSES.includes(status);
}
