import { pipelineBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { useEffect } from "react";

export function usePipelineDetailBreadcrumbs(namespace?: string) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (namespace) {
			setBreadcrumbs([
				pipelineBreadcrumb,
				{
					label: namespace,
					href: routes.projects.pipelines.namespace(namespace)
				}
			]);
		}
	}, [setBreadcrumbs, namespace]);
}
