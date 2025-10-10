import {
	createSnapshotAdminActionsColumn,
	createSnapshotCheckColumn,
	createSnapshotCreatedColumn,
	createSnapshotDeploymentColumn,
	createSnapshotLatestRunAuthorColumn,
	createSnapshotLatestRunColumn,
	createSnapshotNameColumn,
	createSnapshotPipelineColumn
} from "@/components/pipeline-snapshots/list/column-definitions";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function useGlobalSnapshotColumns(): ColumnDef<PipelineSnapshot>[] {
	return useMemo(
		() => [
			createSnapshotCheckColumn(),
			createSnapshotNameColumn(),
			createSnapshotDeploymentColumn(),
			createSnapshotPipelineColumn(),
			createSnapshotLatestRunColumn(),
			createSnapshotLatestRunAuthorColumn(),
			createSnapshotCreatedColumn(),
			createSnapshotAdminActionsColumn()
		],
		[]
	);
}
