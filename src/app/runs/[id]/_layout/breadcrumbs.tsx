import { pipelineBreadcrumb, runBreadcrumb } from "@/components/breadcrumbs/library";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { RunName } from "@/components/runs/run-name";
import { routes } from "@/router/routes";
import { PipelineRun } from "@/types/pipeline-runs";

import { useEffect } from "react";
import { useActivePipelineRunTab } from "./use-active-pipeline-run-tab";

export function useRunDetailBreadcrumbs(run?: PipelineRun) {
	const { setBreadcrumbs } = useBreadcrumbsContext();
	const activeTab = useActivePipelineRunTab();

	useEffect(() => {
		if (!run) return;

		const pipeline = run.resources?.pipeline;

		const baseCrumbs = pipeline
			? [
					pipelineBreadcrumb,
					{
						label: pipeline.name || "",
						href: routes.projects.pipelines.detail.runs(pipeline.id)
					}
				]
			: [runBreadcrumb];

		setBreadcrumbs([
			...baseCrumbs,
			{
				label: <RunName name={run.name} index={run.body?.index} />,
				href: routes.projects.runs.detail(run.id)
			},
			...(activeTab === "logs"
				? [{ label: "Logs", href: routes.projects.runs.detailLogs(run.id) }]
				: [])
		]);
	}, [setBreadcrumbs, run, activeTab]);
}
