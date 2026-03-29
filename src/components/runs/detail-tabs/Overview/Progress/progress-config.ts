import { ExecutionStatus } from "@/types/pipeline-runs";
import { Node } from "@/types/dag-visualizer";
import { getRealSteps, getPreviewSteps } from "@/components/dag-visualizer/node-types";

export type ProgressCategory = "completed" | "not_started" | "pending" | "running" | "failed";

type CategoryConfig = {
	key: ProgressCategory;
	label: string;
	representativeStatus: ExecutionStatus;
	bgColor: string;
};

export const CATEGORY_CONFIG: CategoryConfig[] = [
	{
		key: "completed",
		label: "Completed",
		representativeStatus: "completed",
		bgColor: "bg-success-500"
	},
	{
		key: "not_started",
		label: "Not started",
		representativeStatus: "stopped",
		bgColor: "bg-neutral-400"
	},
	{
		key: "pending",
		label: "Pending",
		representativeStatus: "initializing",
		bgColor: "bg-primary-400"
	},
	{ key: "running", label: "Running", representativeStatus: "running", bgColor: "bg-warning-500" },
	{ key: "failed", label: "Failed", representativeStatus: "failed", bgColor: "bg-error-500" }
];

function categorizeStatus(status: ExecutionStatus): ProgressCategory {
	switch (status) {
		case "completed":
		case "cached":
		case "skipped":
			return "completed";
		case "initializing":
		case "provisioning":
		case "resuming":
		case "paused":
			return "pending";
		case "running":
		case "retrying":
			return "running";
		case "failed":
		case "stopped":
		case "stopping":
		case "retried":
			return "failed";
	}
}

export function computeStepCounts(nodes: Node[]): Record<ProgressCategory, number> {
	const realSteps = getRealSteps(nodes);
	const previewSteps = getPreviewSteps(nodes);

	const counts: Record<ProgressCategory, number> = {
		completed: 0,
		not_started: previewSteps.length,
		pending: 0,
		running: 0,
		failed: 0
	};

	for (const step of realSteps) {
		const category = categorizeStatus(step.metadata.status);
		counts[category]++;
	}

	return counts;
}
