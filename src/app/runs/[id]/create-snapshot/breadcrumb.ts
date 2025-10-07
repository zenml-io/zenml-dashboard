import { pipelineBreadcrumb, runBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { routes } from "@/router/routes";
import { PipelineRun } from "@/types/pipeline-runs";

import { useEffect } from "react";

export function useCreateSnapshotFromRunBreadcrumbs(run?: PipelineRun) {
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
						label: run.name || "",
						href: routes.projects.runs.detail(run.id)
					},
					{
						label: "Create Snapshot",
						href: routes.projects.runs.createSnapshot(run.id)
					}
				]);
			} else {
				setBreadcrumbs([
					runBreadcrumb,
					{
						label: run.name || "",
						href: routes.projects.runs.detail(run.id)
					},
					{
						label: "Create Snapshot",
						href: routes.projects.runs.createSnapshot(run.id)
					}
				]);
			}
		}
	}, [setBreadcrumbs, run]);
}
