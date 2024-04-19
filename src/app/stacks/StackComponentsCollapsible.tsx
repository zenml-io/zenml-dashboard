import {
	AlerterSection,
	AnnotatorSection,
	ArtifactStoreSection,
	ContainerRegistrySection,
	DataValidatorSection,
	ExperimentTrackerSection,
	FeatureStoreSection,
	ImageBuilderSection,
	ModelDeployerSection,
	ModelRegistrySection,
	OrchestratorSection,
	StepOperatorSection
} from "@/contents/components";
import { StackComponentType } from "@/types/components";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { ComponentTypeSection } from "./StackComponentFragments";
import { StackComponentsSelect } from "./StackComponentsSelect";
import { Icon } from "@/components/Icon";

export function StackComponentCollapsible() {
	const [open, setOpen] = useState(true);
	const [selectedType, setSelectedType] = useState<StackComponentType>("orchestrator");
	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px] text-text-lg font-semibold">
					<Icon
						name="chevron-down"
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

function getCategory(selected: StackComponentType) {
	switch (selected) {
		case "orchestrator":
			return ComponentTypeSection(OrchestratorSection);
		case "artifact_store":
			return ComponentTypeSection(ArtifactStoreSection);
		case "container_registry":
			return ComponentTypeSection(ContainerRegistrySection);
		case "alerter":
			return ComponentTypeSection(AlerterSection);
		case "annotator":
			return ComponentTypeSection(AnnotatorSection);
		case "data_validator":
			return ComponentTypeSection(DataValidatorSection);
		case "experiment_tracker":
			return ComponentTypeSection(ExperimentTrackerSection);
		case "feature_store":
			return ComponentTypeSection(FeatureStoreSection);
		case "image_builder":
			return ComponentTypeSection(ImageBuilderSection);
		case "model_deployer":
			return ComponentTypeSection(ModelDeployerSection);
		case "model_registry":
			return ComponentTypeSection(ModelRegistrySection);
		case "step_operator":
			return ComponentTypeSection(StepOperatorSection);
	}
}
