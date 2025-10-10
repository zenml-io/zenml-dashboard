import { snapshotBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";

import { useEffect } from "react";

export function useCreateSnapshotBreadcrumbs() {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		setBreadcrumbs([
			snapshotBreadcrumb,
			{
				label: "Create",
				href: routes.projects.snapshots.create
			}
		]);
	}, [setBreadcrumbs]);
}
