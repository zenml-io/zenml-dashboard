import { CommandListItem } from "@/components/fallback-pages/Commands";
import { ComponentTypeSectionProps } from "../app/stacks/StackComponentFragments";

export const OrchestratorSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"orchestrator",
		"orchestrators",
		"orchestrator",
		"ORCHESTRATOR"
	),
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/orchestrators",
	description:
		"An orchestrator is a special kind of backend that manages the running of each step of the pipeline. Orchestrators administer the actual pipeline runs. By default, ZenML initializes your repository with an orchestrator that runs everything on your local machine."
};

export const ArtifactStoreSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"artifact store",
		"artifact stores",
		"artifact-store",
		"ARTIFACT_STORE"
	),
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/artifact-stores",
	description:
		"The Artifact Store is a central component in any MLOps stack. As the name suggests, it acts as a data persistence layer where artifacts (e.g. datasets, models) ingested or generated by the machine learning pipelines are stored."
};

export const ContainerRegistrySection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"container registry",
		"container registries",
		"container-registry",
		"CONTAINER_REGISTRY"
	),
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/container-registries",
	description:
		"Container registry is used to store container images that are built to run machine learning pipelines in remote environments. Containerization of the pipeline code creates a portable environment that allows code to run in an isolated manner."
};

export const StepOperatorSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"step operator",
		"step operators",
		"step-operator",
		"STEP_OPERATOR"
	),
	description:
		"Step operators allow you to run individual steps in a custom environment different from the default one used by your active orchestrator.",
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/step-operators"
};

export const ModelDeployerSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"model deployer",
		"model deployers",
		"model-deployer",
		"MODEL_DEPLOYER"
	),
	description:
		"Model deployers are stack components responsible for online model serving. They are responsible for deploying models to a remote server. Model deployers also act as a registry for models that are served with ZenML.",
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/model-deployers"
};

export const FeatureStoreSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"feature store",
		"feature stores",
		"feature-store",
		"FEATURE_STORE"
	),
	description:
		"ZenML supports connecting to a Redis-backed Feast feature store as a stack component integration.",
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/feature-stores"
};

export const ExperimentTrackerSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"experiment tracker",
		"experiment trackers",
		"experiment-tracker",
		"EXPERIMENT_TRACKER"
	),
	description:
		"Experiment trackers let you track your ML experiments by logging the parameters and allowing you to compare between different runs.",
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/experiment-trackers"
};

export const AlerterSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands("alerter", "alerters", "alerter", "ALERTER"),
	description:
		"Alerters allow you to send messages to chat services (like Slack, Discord, Mattermost, etc.) from within your pipelines. This is useful to immediately get notified when failures happen, for general monitoring/reporting, and also for building human-in-the-loop ML.",
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/alerters	"
};

export const AnnotatorSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands("annotator", "annotators", "annotator", "ANNOTATOR"),
	description:
		"Annotators are a stack component that enables the use of data annotation as part of your ZenML stack and pipelines.",
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/annotators"
};

export const DataValidatorSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"data validator",
		"data validators",
		"data-validator",
		"DATA_VALIDATOR"
	),
	description:
		"Data Validators used in ZenML pipelines usually generate data profiles and data quality check reports that are versioned and stored in the Artifact Store and can be retrieved and visualized later.",
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/data-validators"
};

export const ImageBuilderSection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"image builder",
		"image builders",
		"image-builder",
		"IMAGE_BUILDER"
	),
	description:
		"The image builder is an essential part of most remote MLOps stacks. It is used to build container images such that your machine-learning pipelines and steps can be executed in remote environments.",
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/image-builders"
};

export const ModelRegistrySection: ComponentTypeSectionProps = {
	commandList: getComponentCommands(
		"model registry",
		"model registries",
		"model-registry",
		"MODEL_REGISTRY"
	),
	description:
		"Model registries are centralized storage solutions for managing and tracking machine learning models across various stages of development and deployment.",
	helpLink: "https://docs.zenml.io/stacks-and-components/component-guide/model-registries"
};

export function getComponentCommands(
	type: string,
	plural: string,
	commandName: string,
	capitalized: string
): CommandListItem[] {
	return [
		{
			description: `Register a new ${type}`,
			command: `zenml ${commandName} register ${capitalized}_NAME --flavor=${capitalized}_FLAVOR [--${capitalized}_OPTIONS]`
		},
		{
			description: `List the ${plural} that you have registered within your current ZenML server`,
			command: `zenml ${commandName} list`
		},
		{
			description: `List the available flavors for your ${plural}`,
			command: `zenml ${commandName} flavor list`
		},
		{
			description: `To connect your ${type} to a service connector`,
			command: `zenml ${commandName} connect ${capitalized}_NAME -c CONNECTOR_NAME`
		},
		{
			description: `For details about a particular ${type}`,
			command: `zenml ${commandName} describe [${capitalized}_NAME]`
		},
		{
			description: "In order to get a full list of available functions, use the command:",
			command: `zenml ${commandName} --help`
		}
	];
}
