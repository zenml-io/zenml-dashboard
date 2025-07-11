import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { GithubPipelineOrderEntry, useGithubPipelines } from "@/data/github/pipelines";
import { pipelineQueries } from "@/data/pipelines";
import { useQuery } from "@tanstack/react-query";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { Box, Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { PipelineItem } from "./pipeline-item";
import { PipelineProgress } from "./progressbar";
import Cursor from "@/assets/images/cursor.webp";
import VsCode from "@/assets/images/vs-code.webp";

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

	const pipelines = githubPipelines.data.pipelineOrder.sort((a, b) => a.index - b.index);
	const pipelinesKeys = pipelines.map((p) => p.directory);

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
						<PipelineProgress githubPipelines={pipelinesKeys} />
					</CollapsibleTrigger>
					<ExtensionButtons />
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
	pipelines: GithubPipelineOrderEntry[];
};

function PipelinesGrid({ pipelines }: Props) {
	const pipelineKeys = pipelines.map((p) => p.directory);
	const piplinesQuery = useQuery({
		...pipelineQueries.pipelineList({
			name: `oneof:${JSON.stringify(pipelineKeys)}`
		}),
		refetchInterval: 30000
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
				<li key={pipeline.index}>
					<PipelineItem
						isDone={apiPipelines.some((p) => p.name === pipeline.directory)}
						pipelineName={pipeline.directory}
						displayName={pipeline.name}
					/>
				</li>
			))}
		</ul>
	);
}

const extensionId = "zenml-io.zenml-tutorial";

function ExtensionButtons() {
	return (
		<Box className="flex items-center justify-between gap-5 p-3">
			<div>
				<p className="text-text-lg font-semibold">Install the extension</p>
				<p className="text-text-md text-theme-text-secondary">Available for VsCode or Cursor</p>
			</div>
			<div className="flex items-center gap-3">
				<Button
					intent="secondary"
					emphasis="minimal"
					className="aspect-square size-8 shrink-0 overflow-hidden border border-theme-border-moderate bg-theme-surface-primary p-0"
					asChild
				>
					<a href={`vscode:extension/${extensionId}`}>
						<img src={VsCode} alt="VsCode" className="h-full w-full" />
					</a>
				</Button>
				<Button
					intent="secondary"
					emphasis="minimal"
					className="aspect-square size-8 shrink-0 overflow-hidden bg-theme-surface-primary p-0"
					asChild
				>
					<a href={`cursor:extension/${extensionId}`}>
						<img src={Cursor} alt="Cursor" className="h-full w-full" />
					</a>
				</Button>
			</div>
		</Box>
	);
}
