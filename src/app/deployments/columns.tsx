import {
	DeploymentAuthorColumn,
	DeploymentCreatedColumn,
	DeploymentNameColumn,
	DeploymentPipelineColumn,
	DeploymentSnapshotColumn,
	DeploymentStatusColumn
} from "@/components/deployments/list/column-definitions";
import { Deployment } from "@/types/deployments";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function useGlobalDeploymentColumns(): ColumnDef<Deployment>[] {
	return useMemo<ColumnDef<Deployment>[]>(
		() => [
			DeploymentNameColumn(),
			DeploymentStatusColumn(),
			DeploymentPipelineColumn(),
			DeploymentSnapshotColumn(),
			DeploymentAuthorColumn(),
			DeploymentCreatedColumn()
		],

		[]
	);
}
