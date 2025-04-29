import RunIcon from "@/assets/icons/terminal.svg?react";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { PageHeader } from "@/components/PageHeader";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { Skeleton } from "@zenml-io/react-component-library";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RunActionsMenu } from "./RunActionMenu";
import { RunRefreshGroup } from "@/components/runs/refresh-group";

export function RunsDetailHeader() {
	const { runId } = useParams() as { runId: string };
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();

	const { data, isSuccess } = usePipelineRun({ runId }, { throwOnError: true });

	useEffect(() => {
		if (!data) return;
		if (data.body?.pipeline) {
			setCurrentBreadcrumbData({ segment: "runs", data: data });
		} else {
			setCurrentBreadcrumbData({ segment: "runsNoPipelines", data: data });
		}
	}, [data]);

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
				<RunActionsMenu />
			</div>
		</PageHeader>
	);
}
