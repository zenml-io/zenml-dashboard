import { pipelineBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { Pipeline } from "@/types/pipelines";

import { useEffect } from "react";

export function usePipelineDetailRunsBreadcrumbs(activeTab: string, pipeline?: Pipeline) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (pipeline) {
			setBreadcrumbs([
				pipelineBreadcrumb,
				{
					disabled: true,
					label: pipeline.name,
					href: routes.projects.pipelines.detail.runs(pipeline.id)
				},
				{
					label: activeTab,
					href: "#"
				}
			]);
		}
	}, [setBreadcrumbs, pipeline, activeTab]);
}
