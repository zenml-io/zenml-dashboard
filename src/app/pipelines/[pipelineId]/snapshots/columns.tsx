import {
	createSnapshotAdminActionsColumn,
	createSnapshotCheckColumn,
	createSnapshotCreatedColumn,
	createSnapshotDeploymentColumn,
	createSnapshotLatestRunAuthorColumn,
	createSnapshotLatestRunColumn,
	createSnapshotNameColumn
} from "@/components/pipeline-snapshots/list/column-definitions";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function usePipelineSnapshotColumns(): ColumnDef<PipelineSnapshot>[] {
	return useMemo<ColumnDef<PipelineSnapshot>[]>(
		() => [
			createSnapshotCheckColumn(),
			createSnapshotNameColumn(),
			createSnapshotDeploymentColumn(),
			createSnapshotLatestRunColumn(),
			createSnapshotLatestRunAuthorColumn(),
			createSnapshotCreatedColumn(),
			createSnapshotAdminActionsColumn()
		],
		[]
	);
}
