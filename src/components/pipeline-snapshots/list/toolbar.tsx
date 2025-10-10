import Plus from "@/assets/icons/plus.svg?react";
import Refresh from "@/assets/icons/refresh.svg?react";
import { useSnapshotSelectorContext } from "@/components/pipeline-snapshots/selector-context";
import { SearchField } from "@/components/SearchField";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { routes } from "@/router/routes";
import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { PipelineSnapshotsButtonGroup } from "./button-group";

type Props = {
	params: PipelineRunOvervieweParams;
	displayCreateButton?: boolean;
};

export function SnapshotTableToolbar({ params, displayCreateButton = false }: Props) {
	const { refetch } = useQuery({ ...pipelineSnapshotQueries.list(params), throwOnError: true });
	const { selectedRowCount } = useSnapshotSelectorContext();

	return (
		<div className="flex flex-wrap items-center justify-between gap-1">
			{selectedRowCount ? <PipelineSnapshotsButtonGroup /> : <SearchField searchParams={params} />}
			<div className="flex items-center gap-1">
				<Button
					className="bg-theme-surface-primary"
					intent="primary"
					emphasis="subtle"
					size="md"
					onClick={() => refetch()}
				>
					<Refresh className="h-5 w-5 fill-theme-text-brand" />
					Refresh
				</Button>
				{displayCreateButton && (
					<Button className="whitespace-nowrap" asChild size="md">
						<Link to={routes.projects.snapshots.create}>
							<Plus className="h-5 w-5 shrink-0 fill-white" />
							<span>Create Snapshot</span>
						</Link>
					</Button>
				)}
			</div>
		</div>
	);
}
