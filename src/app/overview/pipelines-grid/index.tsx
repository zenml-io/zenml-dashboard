import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { useGithubPipelines } from "@/data/github/pipelines";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import Download from "@/assets/icons/download-01.svg?react";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { parsePipelines } from "./parse-pipelines";
import { PipelineItem } from "./pipeline-item";
import { PipelineProgress } from "./progressbar";
import { useQuery } from "@tanstack/react-query";
import { pipelineQueries } from "@/data/pipelines";

export function PipelinesGridCollapsible() {
	const githubPipelines = useGithubPipelines({
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchInterval: false,
		refetchIntervalInBackground: false
	});
	const [open, setOpen] = useState(true);

	if (githubPipelines.isPending) {
		return <Skeleton className="h-[400px] w-full" />;
	}

	if (githubPipelines.isError) return null;

	const pipelines = parsePipelines(githubPipelines.data)
		.filter((pipeline) => pipeline !== "welcome" && pipeline !== "completion")
		.sort((a, b) => a.localeCompare(b));

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px] p-0">
				<div className="flex w-full flex-col items-center justify-between gap-5 p-5 lg:flex-row">
					<CollapsibleTrigger className="flex-1 space-y-5">
						<div className="flex flex-col items-start">
							<p className="text-text-xl font-semibold">Learn the core concepts of ZenML</p>
							<p className="text-theme-text-secondary">
								Click on a pipeline and follow the instructions to run it locally or run the
								tutorials with our VSCode Extension.
							</p>
						</div>
						<PipelineProgress githubPipelines={pipelines} />
					</CollapsibleTrigger>
					<Button className="flex items-center gap-2" asChild size="md">
						<a href="vscode:extension/zenml-io.zenml-codespace-tutorial">
							<Download className="h-4 w-4 shrink-0 fill-white" />
							Install the VsCode Extension
						</a>
					</Button>
					<CollapsibleTrigger>
						<ChevronDown
							className={` ${
								open ? "" : "-rotate-90"
							} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
						/>
					</CollapsibleTrigger>
				</div>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary p-5">
				<PipelinesGrid pipelines={pipelines} />
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}

type Props = {
	pipelines: string[];
};

function PipelinesGrid({ pipelines }: Props) {
	const piplinesQuery = useQuery({
		...pipelineQueries.pipelineList({
			name: `oneof:${JSON.stringify(pipelines)}`
		})
	});

	if (piplinesQuery.isPending) {
		return (
			<ul className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
				{Array.from({ length: pipelines.length }).map((_, index) => (
					<li key={index}>
						<Skeleton className="h-[130px] w-full" />
					</li>
				))}
			</ul>
		);
	}

	if (piplinesQuery.isError) return <p>Error loading pipelines</p>;

	const apiPipelines = piplinesQuery.data.items;

	return (
		<ul className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
			{pipelines.map((pipeline) => (
				<li key={pipeline}>
					<PipelineItem
						isDone={apiPipelines.some((p) => p.name === pipeline)}
						pipelineName={pipeline}
					/>
				</li>
			))}
		</ul>
	);
}
