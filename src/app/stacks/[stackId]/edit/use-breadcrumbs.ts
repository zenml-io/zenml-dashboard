import { stacksBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { useEffect } from "react";

export function useStackUpdateBreadcrumbs(stackName?: string) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (!stackName) return;
		setBreadcrumbs([
			stacksBreadcrumb,
			{
				label: stackName,
				href: routes.stacks.overview,
				disabled: true
			},
			{
				label: "Update Stack",
				href: routes.stacks.overview,
				disabled: true
			}
		]);
	}, [setBreadcrumbs, stackName]);
}
