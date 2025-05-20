import { ExecutionStatus } from "@/types/pipeline-runs";

export function getIsStatusUnknown(stepStatus: ExecutionStatus, runStatus: ExecutionStatus) {
	return ["initializing", "running"].includes(stepStatus) && runStatus === "failed";
}
