import Refresh from "@/assets/icons/refresh.svg?react";
import { useDeploymentSelectorContext } from "@/components/deployments/selector-context";
import { SearchField } from "@/components/SearchField";
import { deploymentQueries } from "@/data/deployments";
import { DeploymentsListQueryParams } from "@/types/deployments";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library";
import { PipelineDeploymentsButtonGroup } from "./button-group";

type Props = {
	params: DeploymentsListQueryParams;
};

export function DeploymentsTableToolbar({ params }: Props) {
	const { refetch } = useQuery({ ...deploymentQueries.list(params), throwOnError: true });
	const { selectedRowCount } = useDeploymentSelectorContext();

	return (
		<div className="flex items-center justify-between">
			{selectedRowCount ? (
				<PipelineDeploymentsButtonGroup />
			) : (
				<SearchField searchParams={params} />
			)}
			<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
				<Refresh className="h-5 w-5 fill-theme-text-brand" />
				Refresh
			</Button>
		</div>
	);
}
