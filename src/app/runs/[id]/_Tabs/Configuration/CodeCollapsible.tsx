import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { PipelineRun } from "@/types/pipeline-runs";
import { useState } from "react";
import { Codesnippet } from "@/components/CodeSnippet";

type Props = {
	runId: PipelineRun["id"];
};

export function CodeCollapsible({ runId }: Props) {
	const [open, setOpen] = useState(false);
	const runCode = `from zenml.client import Client
run = Client().get_pipeline_run('${runId}')
config = run.config`;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px]">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					Code
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<p className="mb-2 text-theme-text-secondary">Get config programmatically</p>
				<Codesnippet fullWidth highlightCode wrap code={runCode} />
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
