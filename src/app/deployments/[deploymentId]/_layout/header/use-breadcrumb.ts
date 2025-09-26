import { deploymentBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { Deployment } from "@/types/deployments";
import { useEffect } from "react";

export function usePipelineDetailRunsBreadcrumbs(activeTab: string, deployment?: Deployment) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (deployment) {
			setBreadcrumbs([
				deploymentBreadcrumb,
				{
					disabled: true,
					label: deployment.name,
					href: routes.projects.deployments.detail.overview(deployment.id)
				},
				{
					label: activeTab,
					href: "#"
				}
			]);
		}
	}, [setBreadcrumbs, deployment, activeTab]);
}
