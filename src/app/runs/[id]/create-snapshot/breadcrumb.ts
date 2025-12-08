import { pipelineBreadcrumb, runBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { formatRunName } from "@/lib/runs";
import { routes } from "@/router/routes";
import { PipelineRun } from "@/types/pipeline-runs";

import { useEffect } from "react";

export function useCreateSnapshotFromRunBreadcrumbs(run?: PipelineRun) {
	const { setBreadcrumbs } = useBreadcrumbsContext();

	useEffect(() => {
		if (run) {
			setBreadcrumbs([
				...(run.resources?.pipeline
					? [
							pipelineBreadcrumb,
							{
								label: run.resources.pipeline.name || "",
								href: routes.projects.pipelines.detail.runs(run.resources.pipeline.id)
							}
						]
					: [runBreadcrumb]),
				{
					label: formatRunName(run.name, run.body?.index),
					href: routes.projects.runs.detail(run.id)
				},
				{
					label: "Create Snapshot",
					href: routes.projects.runs.createSnapshot(run.id)
				}
			]);
		}
	}, [setBreadcrumbs, run]);
}
