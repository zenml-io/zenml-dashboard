import { stacksBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { useEffect } from "react";

export function useStackCreateBreadcrumbs() {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		setBreadcrumbs([
			stacksBreadcrumb,
			{
				label: "New Stack",
				href: routes.stacks.create.index
			}
		]);
	}, [setBreadcrumbs]);
}
