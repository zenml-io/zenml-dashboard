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
				size="md"
				onClick={() => refetch()}
			>
				<Refresh className="h-5 w-5 fill-theme-text-brand" />
				Refresh
			</Button>
			<RunRefreshDropdown runId={runId} />
		</div>
	);
}
