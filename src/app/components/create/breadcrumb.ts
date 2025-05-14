import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { componentBreadcrumb } from "@/components/breadcrumbs/library";
import { routes } from "@/router/routes";
import { useEffect } from "react";

export function useComponentCreateBreadcrumbs() {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		setBreadcrumbs([
			componentBreadcrumb,
			{
				label: "Create",
				href: routes.components.create
			}
		]);
	}, [setBreadcrumbs]);
}
