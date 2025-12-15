import RunIcon from "@/assets/icons/terminal-square.svg?react";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { ExecutionStatusIcon, getExecutionStatusColor } from "../../ExecutionStatus";
import { RunName } from "../run-name";

type Props = {
	runId: string;
};

export function RunSheetHeadline({ runId }: Props) {
	const runQuery = usePipelineRun({ runId });

	if (runQuery.isPending) return <Skeleton className="h-6 w-[200px]" />;
	if (runQuery.isError) return null;

	const run = runQuery.data;

	const name = run.name;
	const status = run.body?.status;
	const index = run.body?.index;

	return (
		<div className="flex items-center gap-1 overflow-hidden border-b border-b-theme-border-moderate bg-theme-surface-primary p-5">
			<RunIcon className={`h-5 w-5 shrink-0 ${getExecutionStatusColor(status)}`} />
			<p className="min-w-0 truncate text-display-xs font-semibold">
				<RunName name={name} index={index} />
			</p>
			<ExecutionStatusIcon className="h-5 w-5 shrink-0" status={status} />
		</div>
	);
}
