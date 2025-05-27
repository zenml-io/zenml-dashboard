import { connectorBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { useEffect } from "react";

export function useCreateConnectorBreadcrumbs() {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		setBreadcrumbs([
			...connectorBreadcrumb,
			{
				label: "New Connector",
				href: routes.settings.connectors.create
			}
		]);
	}, [setBreadcrumbs]);
}
