import { InfoBox } from "@/components/Infobox";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { MetadataMap } from "@/types/common";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useParams } from "react-router-dom";

function FailedPanel() {
	return (
		<InfoBox className="truncate" intent="error">
			<div className="flex items-center justify-between space-x-2">
				<p className="truncate">
					Pipeline run failed. Check orchestrator logs for error details and troubleshooting steps.
				</p>
				<Button intent="danger" asChild>
					{/* React-Router seems to have issues with Hashes. There's the alternative of using react-router-hash-link, but I refrain for installing a new package for this single use case for now
					 */}
					<a href="#orchestrator-collapsible">Review</a>
				</Button>
			</div>
		</InfoBox>
	);
}

function InitializingPanel() {
	return (
		<InfoBox className="truncate">
			<div className="flex items-center justify-between space-x-2">
				<p>
					Pipeline run initializing. Check orchestrator URL and logs for real-time status updates.
				</p>
				<Button asChild>
					{/* React-Router seems to have issues with Hashes. There's the alternative of using react-router-hash-link, but I refrain for installing a new package for this single use case for now
					 */}
					<a href="#orchestrator-collapsible">Review</a>
				</Button>
			</div>
		</InfoBox>
	);
}

export function AlertPanels() {
	const { runId } = useParams() as { runId: string };
	const { data, isError, isPending } = usePipelineRun({ runId });
	const metadata = data?.metadata?.run_metadata as MetadataMap | undefined;
	const orchestrator_url = metadata?.orchestrator_url;
	const orchestrator_logs = metadata?.orchestrator_logs_url;

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[100px]" />;

	if (data.body?.status === "initializing" && (orchestrator_logs || orchestrator_url))
		return <InitializingPanel />;
	if (data.body?.status === "failed" && orchestrator_logs) return <FailedPanel />;
	return null;
}
