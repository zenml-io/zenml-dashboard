import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { KeyValue } from "@/components/KeyValue";
import { AuthRequired } from "@/components/runs/auth-required";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { isString } from "@/lib/type-guards";
import { MetadataMap } from "@/types/common";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";

type Props = {
	runId: string;
};

export function OrchestratorCollapsible({ runId }: Props) {
	const [open, setOpen] = useState(true);
	const { data, isError, isPending } = usePipelineRun({ runId: runId });

	const metadata = data?.metadata?.run_metadata as MetadataMap | undefined;
	const orchestrator_url = metadata?.orchestrator_url;
	const orchestrator_run_id = data?.metadata?.orchestrator_run_id;
	const orchestrator_logs = metadata?.orchestrator_logs_url;

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
					<p id="orchestrator-collapsible">Orchestrator</p>
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-3 border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					<KeyValue
						label="Orchestrator URL"
						value={
							orchestrator_url && isString(orchestrator_url) ? (
								<div className="group/copybutton flex items-center gap-0.5">
									<a
										className="truncate text-theme-text-brand underline transition-all duration-200 hover:decoration-transparent"
										rel="noopener noreferrer"
										target="_blank"
										href={orchestrator_url}
									>
										{orchestrator_url}
									</a>
									<CopyButton copyText={orchestrator_url} />
								</div>
							) : (
								"Not available"
							)
						}
					/>
					<KeyValue
						label="Orchestrator Logs"
						value={
							orchestrator_logs && isString(orchestrator_logs) ? (
								<div className="flex items-center gap-1">
									<AuthRequired />
									<div className="group/copybutton flex items-center gap-0.5">
										<a
											className="truncate text-theme-text-brand underline transition-all duration-200 hover:decoration-transparent"
											rel="noopener noreferrer"
											target="_blank"
											href={orchestrator_logs}
										>
											{orchestrator_logs}
										</a>
										<CopyButton copyText={orchestrator_logs} />
									</div>
								</div>
							) : (
								"Not available"
							)
						}
					/>
					<KeyValue
						label="Orchestrator Run ID"
						value={
							orchestrator_run_id ? (
								<div className="group/copybutton flex items-center gap-0.5">
									{orchestrator_run_id}
									<CopyButton copyText={orchestrator_run_id} />
								</div>
							) : (
								"Not available"
							)
						}
					/>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
