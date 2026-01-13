import { PageHeader } from "@/components/PageHeader";
import { RunRefreshGroup } from "@/components/runs/refresh-group";
import { RunsDetailHeaderNameSection } from "@/components/runs/runs-detail-header-name-section";
import { RunStopGroup } from "@/components/runs/stop-group";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useParams } from "react-router-dom";
import { useRunDetailBreadcrumbs } from "./breadcrumbs";
import { RunActionsMenu } from "./RunActionMenu";
import { PipelineRunDetailTabs } from "./tabs";

export function RunsDetailHeader() {
	const { runId } = useParams() as { runId: string };

	const { data } = usePipelineRun({ runId }, { throwOnError: true });

	useRunDetailBreadcrumbs(data);

	return (
		<PageHeader className="space-y-1 pb-0">
			<div className="flex w-full items-center justify-between gap-1">
				<RunsDetailHeaderNameSection runId={runId} />
				<div className="flex items-center gap-1">
					<RunRefreshGroup runId={runId} />
					<RunStopGroup runId={runId} />
					<RunActionsMenu runId={runId} />
				</div>
			</div>
			<PipelineRunDetailTabs />
		</PageHeader>
	);
}
