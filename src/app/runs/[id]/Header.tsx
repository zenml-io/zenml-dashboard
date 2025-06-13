import RunIcon from "@/assets/icons/terminal.svg?react";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { PageHeader } from "@/components/PageHeader";
import { RunRefreshGroup } from "@/components/runs/refresh-group";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import { useRunDetailBreadcrumbs } from "./breadcrumbs";
import { RunActionsMenu } from "./RunActionMenu";
import { RunStopGroup } from "@/components/runs/stop-group";

export function RunsDetailHeader() {
	const { runId } = useParams() as { runId: string };

	const { data, isSuccess } = usePipelineRun({ runId }, { throwOnError: true });

	useRunDetailBreadcrumbs(data);

	return (
		<PageHeader className="flex items-center justify-between">
			<div className="flex items-center gap-1 truncate">
				{isSuccess ? (
					<>
						<RunIcon
							className={`h-5 w-5 shrink-0 ${getExecutionStatusColor(data?.body?.status)}`}
						/>
						<h1 className="min-w-0 truncate text-display-xs font-semibold">{data?.name}</h1>
						<ExecutionStatusIcon className="h-5 w-5 shrink-0" status={data?.body?.status} />
					</>
				) : (
					<>
						<Skeleton className="h-5 w-5" />
						<Skeleton className="h-6 w-[250px]" />
						<Skeleton className="h-5 w-5" />
					</>
				)}
			</div>
			<div className="flex items-center gap-1">
				<RunRefreshGroup runId={runId} />
				<RunStopGroup runId={runId} />
				<RunActionsMenu />
			</div>
		</PageHeader>
	);
}
