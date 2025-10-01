import {
	createDeploymentAuthorColumn,
	createDeploymentCreatedColumn,
	createDeploymentNameColumn,
	createDeploymentSnapshotColumn,
	createDeploymentStatusColumn
} from "@/components/deployments/list/column-definitions";
import { Deployment } from "@/types/deployments";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function usePipelineDeploymentColumns(): ColumnDef<Deployment>[] {
	return useMemo<ColumnDef<Deployment>[]>(
		() => [
			createDeploymentNameColumn(),
			createDeploymentStatusColumn(),
			createDeploymentSnapshotColumn(),
			createDeploymentAuthorColumn(),
			createDeploymentCreatedColumn()
		],

		[]
	);
}
