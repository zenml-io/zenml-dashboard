import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Info from "@/assets/icons/info.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { CopyButton } from "@/components/CopyButton";
import { Key, Value } from "@/components/KeyValue";
import { RepoBadge } from "@/components/repositories/RepoBadge";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { Metadata, MetadataMap } from "@/types/common";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function InfoCollapsible() {
	const { runId } = useParams() as { runId: string };

	const [open, setOpen] = useState(true);
	const { data, isError, isPending } = usePipelineRun({ runId });

	const orchestrator_url: Metadata | undefined = (data?.metadata?.run_metadata as MetadataMap)
		?.orchestrator_url;
	const orchestrator_run_id = data?.metadata?.orchestrator_run_id;

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[200px]" />;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} mr-2 h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					Info
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					<Key>Orchestrator URL</Key>
					<Value>
						{orchestrator_url ? (
							<div className="group/copybutton flex items-center gap-0.5">
								<a
									className="truncate underline transition-all duration-200 hover:decoration-transparent"
									rel="noopener noreferrer"
									target="_blank"
									href={orchestrator_url.body.value}
								>
									{orchestrator_url.body.value}
								</a>
								<CopyButton copyText={orchestrator_url.body.value} />
							</div>
						) : (
							"Not available"
						)}
					</Value>
					<Key>Orchestrator Run ID</Key>
					<Value>
						{orchestrator_run_id ? (
							<div className="group/copybutton flex items-center gap-0.5">
								{orchestrator_run_id}
								<CopyButton copyText={orchestrator_run_id} />
							</div>
						) : (
							"Not available"
						)}
					</Value>
					<Key>
						<div className="flex items-center space-x-0.5 truncate">
							<span className="truncate">Repository/Commit</span>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="cursor-default">
										<Info className="h-3 w-3 fill-theme-text-secondary" />
										<span className="sr-only">Info</span>
									</TooltipTrigger>
									<TooltipContent className="w-full max-w-md whitespace-normal">
										Git hash of code repository. Only set if pipeline was run in a clean git
										repository connected to your ZenML server.
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</Key>
					<Value>
						{data.body?.code_reference ? (
							<RepoBadge
								repositoryId={data.body?.code_reference.body?.code_repository.id}
								commit={data.body.code_reference.body?.commit}
							/>
						) : (
							"Not available"
						)}
					</Value>
					<Key className={data.metadata?.code_path ? "col-span-3" : ""}>
						<div className="flex items-center space-x-0.5 truncate">
							<span>Code Path</span>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="cursor-default">
										<Info className="h-3 w-3 fill-theme-text-secondary" />
										<span className="sr-only">Info</span>
									</TooltipTrigger>
									<TooltipContent className="w-full max-w-md whitespace-normal">
										Path to where code was uploaded in the artifact store. Only set on a pipeline
										with a non-local orchestrator and if Repository/Commit is not set
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</Key>
					<Value className={data.metadata?.code_path ? "col-span-3 h-auto" : ""}>
						{data.metadata?.code_path ? (
							<Codesnippet code={data.metadata.code_path} />
						) : (
							"Not available"
						)}
					</Value>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
