import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { NestedCollapsible } from "@/components/NestedCollapsible";
import { PipelineRun } from "@/types/pipeline-runs";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";

type Props = {
	run: PipelineRun;
};

export function EnvironmentCollapsible({ run }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader intent="primary" className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					Environment
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-3 border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<NestedCollapsible
					isInitialOpen
					intent="secondary"
					title="Client Environment"
					data={run.metadata?.client_environment}
				/>
				<NestedCollapsible
					isInitialOpen
					intent="secondary"
					title="Orchestrator Environment"
					data={run.metadata?.orchestrator_environment}
				/>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
