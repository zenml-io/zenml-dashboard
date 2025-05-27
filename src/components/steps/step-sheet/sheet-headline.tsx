import { getIsStatusUnknown } from "@/components/dag-visualizer/layout/status";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { Badge, Skeleton } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import {
	ExecutionStatusIcon,
	getBadgeColor,
	getExecutionStatusBackgroundColor
} from "../../ExecutionStatus";
type Props = {
	stepId: string;
};
export function SheetHeadline({ stepId }: Props) {
	const { runId } = useParams() as { runId: string };
	const stepQuery = useStepDetail({ stepId });
	const runQuery = usePipelineRun({ runId });

	if (stepQuery.isPending || runQuery.isPending) {
		return <Skeleton className="h-6 w-[200px]" />;
	}

	if (stepQuery.error || runQuery.error) return null;

	const stepStatus = stepQuery.data.body?.status;
	const runStatus = runQuery.data.body?.status;

	const isStatusUnknown = getIsStatusUnknown(stepStatus ?? "running", runStatus ?? "running");

	return (
		<div className="flex items-center gap-1">
			<div
				className={`rounded-sm p-0.5 ${
					isStatusUnknown ? "bg-blue-50" : getExecutionStatusBackgroundColor(stepStatus)
				}`}
			>
				<ExecutionStatusIcon
					status={isStatusUnknown ? "unknown" : stepStatus}
					className="h-4 w-4 shrink-0"
				/>
			</div>
			<h2 className="text-display-xs font-semibold">{stepQuery.data.name}</h2>
			<Badge
				size="sm"
				className="capitalize"
				color={getBadgeColor(isStatusUnknown ? "unknown" : stepStatus)}
			>
				{isStatusUnknown ? `Unknown - Last reported: ${stepStatus}` : stepStatus || "None"}
			</Badge>
		</div>
	);
}
