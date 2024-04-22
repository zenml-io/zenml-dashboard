import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	RadialProgress
} from "@zenml-io/react-component-library";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { useState } from "react";

export function StarterSetupList() {
	const [open, setOpen] = useState(false);
	return (
		<Collapsible
			open={open}
			onOpenChange={setOpen}
			className={"rounded-md border border-theme-border-moderate bg-theme-surface-primary"}
		>
			<CollapsibleTrigger className="flex w-full items-center justify-between gap-[10px] p-3">
				<div className="flex items-center gap-3">
					<RadialProgress value={45} />

					<div className="text-left">
						<p className="text-text-xl font-semibold">
							<span className="text-text-md font-medium text-theme-text-secondary">(2 min)</span>
						</p>
						<p className="text-theme-text-secondary">
							Follow these steps to make sure your client is connected and run your first MLOps
							pipeline with ZenML
						</p>
					</div>
				</div>
				<ChevronDown
					className={` ${
						open ? "" : "-rotate-90"
					} h-5 w-5 shrink-0 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent className="border-t border-theme-border-moderate p-5"></CollapsibleContent>
		</Collapsible>
	);
}
