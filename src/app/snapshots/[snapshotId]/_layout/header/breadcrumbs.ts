import { snapshotBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";

import { useEffect } from "react";

export function useSnapshotDetailRunsBreadcrumbs(activeTab: string, snapshot?: PipelineSnapshot) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (snapshot) {
			setBreadcrumbs([
				snapshotBreadcrumb,
				{
					label: snapshot.name || "",
					href: routes.projects.snapshots.detail.overview(snapshot.id)
				},
				{
					href: "#",
					label: activeTab
				}
			]);
		}
	}, [setBreadcrumbs, snapshot, activeTab]);
}
