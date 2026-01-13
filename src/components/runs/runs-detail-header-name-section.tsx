import RunIcon from "@/assets/icons/terminal-square.svg?react";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { RunName } from "@/components/runs/run-name";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";

type Props = {
	runId: string;
};
export function RunsDetailHeaderNameSection({ runId }: Props) {
	const { data, isError, isPending } = usePipelineRun({ runId });

	if (isError) return <p>Error loading run</p>;
	if (isPending)
		return (
			<div className="flex items-center gap-1">
				<Skeleton className="h-5 w-5" />
				<Skeleton className="h-6 w-[250px]" />
				<Skeleton className="h-5 w-5" />
			</div>
		);

	return (
		<div className="flex items-center gap-1 truncate">
			<RunIcon className={`h-5 w-5 shrink-0 ${getExecutionStatusColor(data?.body?.status)}`} />
			<h1 className="min-w-0 truncate text-display-xs font-semibold">
				<RunName name={data?.name ?? ""} index={data?.body?.index} />
			</h1>
			<ExecutionStatusIcon className="h-5 w-5 shrink-0" status={data?.body?.status} />
		</div>
	);
}
