import { useEffect } from "react";
import { useBreadcrumbsContext } from "../AuthenticatedLayout/BreadcrumbsContext";
import { ServiceConnector } from "@/types/service-connectors";
import { routes } from "@/router/routes";
import { connectorBreadcrumb } from "@/components/breadcrumbs/library";

export function useConnectorDetailBreadcrumbs(connector?: ServiceConnector) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (connector) {
			setBreadcrumbs([
				...connectorBreadcrumb,
				{
					label: connector.name,
					href: routes.settings.connectors.detail.configuration(connector.id)
				}
			]);
		}
	}, [setBreadcrumbs, connector]);
}
