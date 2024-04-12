import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { generateCommandList } from "@/components/fallback-pages/Commands";
import { HelpBox } from "@/components/fallback-pages/Helpbox";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { Fragment, useState } from "react";
import { InfoBox } from "../../components/Infobox";
import { stackCommands } from "../../contents/stack";
import { StackComponentsSelect } from "./StackComponentsSelect";
import { StackComponentType } from "@/types/components";
import { ComponentTypeSection } from "./StackComponentFragments";
import { OrchestratorSection } from "@/contents/components";

export function StackComponentCollapsible() {
	const [open, setOpen] = useState(true);
	const [selectedType, setSelectedType] = useState<StackComponentType>("orchestrator");
	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px] text-text-lg font-semibold">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					Getting started with stack components
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-5 border-t border-theme-border-moderate bg-theme-surface-primary p-5">
				<div className="space-y-1">
					<label
						htmlFor="artifact-store-provider"
						className="text-text-sm text-theme-text-secondary"
					>
						Select a category
					</label>
					<StackComponentsSelect
						id="artifact-store-provider"
						selectedType={selectedType}
						onTypeChange={setSelectedType}
					/>
				</div>
				{getCategory(selectedType)}
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}

export function CommandSection() {
	return (
		<section className="space-y-5 pl-8 pr-5">
			<InfoBox className="text-text-md" intent="neutral">
				To register a new stack, you must already have registered the individual components of the
				stack using the commands listed here.
			</InfoBox>
			{stackCommands.map((item, index) => (
				<Fragment key={index}>{generateCommandList(item)}</Fragment>
			))}
			{/* TODO add link */}
			<HelpBox link="" />
		</section>
	);
}

function getCategory(selected: StackComponentType) {
	switch (selected) {
		case "orchestrator":
			return ComponentTypeSection(OrchestratorSection);
	}
}
