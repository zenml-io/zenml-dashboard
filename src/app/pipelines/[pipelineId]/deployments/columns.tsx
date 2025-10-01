import {
	DeploymentAuthorColumn,
	DeploymentCreatedColumn,
	DeploymentNameColumn,
	DeploymentSnapshotColumn,
	DeploymentStatusColumn
} from "@/components/deployments/list/column-definitions";
import { Deployment } from "@/types/deployments";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function useDeploymentColumns(): ColumnDef<Deployment>[] {
	return useMemo<ColumnDef<Deployment>[]>(
		() => [
			DeploymentNameColumn(),
			DeploymentStatusColumn(),
			DeploymentSnapshotColumn(),
			DeploymentAuthorColumn(),
			DeploymentCreatedColumn()
		],

		[]
	);
}
