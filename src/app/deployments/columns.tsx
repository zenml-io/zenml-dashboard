import {
	createDeploymentAuthorColumn,
	createDeploymentCreatedColumn,
	createDeploymentNameColumn,
	createDeploymentPipelineColumn,
	createDeploymentSnapshotColumn,
	createDeploymentStatusColumn
} from "@/components/deployments/list/column-definitions";
import { Deployment } from "@/types/deployments";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function useGlobalDeploymentColumns(): ColumnDef<Deployment>[] {
	return useMemo<ColumnDef<Deployment>[]>(
		() => [
			createDeploymentNameColumn(),
			createDeploymentStatusColumn(),
			createDeploymentPipelineColumn(),
			createDeploymentSnapshotColumn(),
			createDeploymentAuthorColumn(),
			createDeploymentCreatedColumn()
		],

		[]
	);
}
