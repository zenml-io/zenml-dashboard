import Refresh from "@/assets/icons/refresh.svg?react";
import { Button } from "@zenml-io/react-component-library/components/server";
import { RunRefreshDropdown } from "./dropdown";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";

type Props = {
	runId: string;
};

export function RunRefreshGroup({ runId }: Props) {
	const { refetch } = usePipelineRun({ runId });

	return (
		<div className="flex">
			<Button
				className="rounded-r-sharp"
				intent="primary"
				emphasis="subtle"
				size="sm"
				onClick={() => refetch()}
			>
				<Refresh className="size-4 shrink-0 fill-theme-text-brand" />
				Refresh
			</Button>
			<RunRefreshDropdown runId={runId} />
		</div>
	);
}
