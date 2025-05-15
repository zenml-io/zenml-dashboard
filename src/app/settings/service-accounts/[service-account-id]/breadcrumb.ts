import { serviceAccountBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { ServiceAccount } from "@/types/service-accounts";
import { useEffect } from "react";

export function useServiceAccountDetailBreadcrumbs(serviceAccount?: ServiceAccount) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (serviceAccount) {
			setBreadcrumbs([
				...serviceAccountBreadcrumb,
				{
					label: serviceAccount.name,
					href: routes.settings.service_accounts.detail(serviceAccount.id)
				}
			]);
		}
	}, [setBreadcrumbs, serviceAccount]);
}
