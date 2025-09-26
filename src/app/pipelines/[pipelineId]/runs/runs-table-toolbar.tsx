import Refresh from "@/assets/icons/refresh.svg?react";
import { SearchField } from "@/components/SearchField";
import { useAllPipelineRuns } from "@/data/pipeline-runs/all-pipeline-runs-query";
import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { Button } from "@zenml-io/react-component-library";
import { RunsButtonGroup } from "../../../runs/ButtonGroup";
import { useRunsSelectorContext } from "../../../runs/RunsSelectorContext";

type Props = {
	params: PipelineRunOvervieweParams;
};

export function RunsTableToolbar({ params }: Props) {
	const { refetch } = useAllPipelineRuns({ params }, { throwOnError: true });
	const { selectedRowCount } = useRunsSelectorContext();

	return (
		<div className="flex items-center justify-between">
			{selectedRowCount ? <RunsButtonGroup /> : <SearchField searchParams={params} />}
			<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
				<Refresh className="h-5 w-5 fill-theme-text-brand" />
				Refresh
			</Button>
		</div>
	);
}
