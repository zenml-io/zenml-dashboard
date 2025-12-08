import { pipelineBreadcrumb, runBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { formatRunName } from "@/lib/runs";
import { routes } from "@/router/routes";
import { PipelineRun } from "@/types/pipeline-runs";

import { useEffect } from "react";

export function useRunDetailBreadcrumbs(run?: PipelineRun) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (run) {
			if (run.resources?.pipeline) {
				setBreadcrumbs([
					pipelineBreadcrumb,
					{
						label: run.resources.pipeline.name || "",
						href: routes.projects.pipelines.detail.runs(run.resources.pipeline.id)
					},
					{
						label: formatRunName(run.name, run.body?.index),
						href: "#"
					}
				]);
			} else {
				setBreadcrumbs([
					runBreadcrumb,
					{
						label: formatRunName(run.name, run.body?.index),
						href: routes.projects.runs.detail(run.id)
					}
				]);
			}
		}
	}, [setBreadcrumbs, run]);
}
