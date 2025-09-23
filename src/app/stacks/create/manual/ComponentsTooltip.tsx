import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent
} from "@zenml-io/react-component-library/components/client";
import { StackComponentType } from "@/types/components";
import InfoIcon from "@/assets/icons/info.svg?react";
import {
	AlerterSection,
	AnnotatorSection,
	OrchestratorSection,
	StepOperatorSection,
	FeatureStoreSection,
	ArtifactStoreSection,
	ImageBuilderSection,
	ContainerRegistrySection,
	DataValidatorSection,
	ExperimentTrackerSection,
	ModelDeployerSection,
	ModelRegistrySection,
	DeployerSection
} from "@/contents/components";

type Props = {
	type: StackComponentType;
};
export function ComponentTooltip({ type }: Props) {
	const { description, link } = getTooltip(type);
	return (
		<TooltipProvider>
			<Tooltip delayDuration={200}>
				<TooltipTrigger>
					<InfoIcon className="h-4 w-4 shrink-0 fill-theme-text-tertiary" />
					<div className="sr-only">Info for {type}</div>
				</TooltipTrigger>
				<TooltipContent
					align="start"
					side="bottom"
					className="flex max-w-xl flex-col gap-2 bg-theme-surface-primary p-5 text-text-sm text-theme-text-primary"
				>
					<p>{description}</p>
					<a className="link mt-2 text-primary-400" target="_blank" href={link}>
						Learn more
					</a>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

function getTooltip(type: StackComponentType): { description: string; link: string } {
	switch (type) {
		case "orchestrator":
			return {
				description: OrchestratorSection.description,
				link: OrchestratorSection.helpLink
			};
		case "alerter":
			return {
				description: AlerterSection.description,
				link: AlerterSection.helpLink
			};
		case "annotator":
			return {
				description: AnnotatorSection.description,
				link: AnnotatorSection.helpLink
			};
		case "artifact_store":
			return {
				description: ArtifactStoreSection.description,
				link: ArtifactStoreSection.helpLink
			};
		case "container_registry":
			return {
				description: ContainerRegistrySection.description,
				link: ContainerRegistrySection.helpLink
			};
		case "data_validator":
			return {
				description: DataValidatorSection.description,
				link: DataValidatorSection.helpLink
			};
		case "experiment_tracker":
			return {
				description: ExperimentTrackerSection.description,
				link: ExperimentTrackerSection.helpLink
			};
		case "feature_store":
			return {
				description: FeatureStoreSection.description,
				link: FeatureStoreSection.helpLink
			};
		case "image_builder":
			return {
				description: ImageBuilderSection.description,
				link: ImageBuilderSection.helpLink
			};
		case "model_deployer":
			return {
				description: ModelDeployerSection.description,
				link: ModelDeployerSection.helpLink
			};
		case "model_registry":
			return {
				description: ModelRegistrySection.description,
				link: ModelRegistrySection.helpLink
			};
		case "step_operator":
			return {
				description: StepOperatorSection.description,
				link: StepOperatorSection.helpLink
			};
		case "deployer":
			return {
				description: DeployerSection.description,
				link: DeployerSection.helpLink
			};
	}
}
