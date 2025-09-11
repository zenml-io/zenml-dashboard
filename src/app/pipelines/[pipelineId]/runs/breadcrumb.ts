import { pipelineBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { Pipeline } from "@/types/pipelines";
import { useEffect } from "react";

export function usePipelineDetailBreadcrumbs(pipeline?: Pipeline) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (pipeline) {
			setBreadcrumbs([
				pipelineBreadcrumb,
				{
					label: pipeline.name,
					href: routes.projects.pipelines.detail.runs(pipeline.id)
				}
			]);
		}
	}, [setBreadcrumbs, pipeline]);
}
