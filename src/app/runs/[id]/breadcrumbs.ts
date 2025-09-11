import { pipelineBreadcrumb, runBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { PipelineRun } from "@/types/pipeline-runs";

import { useEffect } from "react";

export function useRunDetailBreadcrumbs(run?: PipelineRun) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (run) {
			if (run.body?.pipeline) {
				setBreadcrumbs([
					pipelineBreadcrumb,
					{
						label: run.body.pipeline.name || "",
						href: routes.projects.pipelines.detail.runs(run.body.pipeline.id)
					},
					{
						label: run.name || "",
						href: "#"
					}
				]);
			} else {
				setBreadcrumbs([
					runBreadcrumb,
					{
						label: run.name || "",
						href: routes.projects.runs.detail(run.id)
					}
				]);
			}
		}
	}, [setBreadcrumbs, run]);
}
