import Refresh from "@/assets/icons/refresh.svg?react";
import { useSnapshotSelectorContext } from "@/components/pipeline-snapshots/selector-context";
import { SearchField } from "@/components/SearchField";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library";
import { PipelineSnapshotsButtonGroup } from "./button-group";

type Props = {
	params: PipelineRunOvervieweParams;
};

export function SnapshotTableToolbar({ params }: Props) {
	const { refetch } = useQuery({ ...pipelineSnapshotQueries.list(params), throwOnError: true });
	const { selectedRowCount } = useSnapshotSelectorContext();

	return (
		<div className="flex items-center justify-between">
			{selectedRowCount ? <PipelineSnapshotsButtonGroup /> : <SearchField searchParams={params} />}
			<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
				<Refresh className="h-5 w-5 fill-theme-text-brand" />
				Refresh
			</Button>
		</div>
	);
}
