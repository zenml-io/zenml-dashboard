import { ComponentTypeSectionProps } from "../app/stacks/StackComponentFragments";

export const OrchestratorSection: ComponentTypeSectionProps = {
	commandList: [
		{
			description: "Register a new orchestrator",
			command:
				"zenml orchestrator register ORCHESTRATOR_NAME --flavor=ORCHESTRATOR_FLAVOR [--ORCHESTRATOR_OPTIONS]"
		},
		{
			description:
				"List the orchestrators that you have registered within your current ZenML server",
			command: "zenml orchestrator list"
		},
		{
			description: "List the available flavors for your orchestratorr",
			command: "zenml orchestrator flavor list"
		},
		{
			description: "To connect your orchestrator to a service connector",
			command: "zenml orchestrator connect ORCHESTRATOR_NAME -c CONNECTOR_NAME"
		},
		{
			description: "For details about a particular orchestrator",
			command: "zenml orchestrator describe [ORCHESTRATOR_NAME]"
		},
		{
			description: "In order to get a full list of available functions, use the command",
			command: "zenml orchestrator --help"
		}
	],
	helpLink: "",
	description:
		"An orchestrator is a special kind of backend that manages the running of each step of the pipeline. Orchestrators administer the actual pipeline runs. By default, ZenML initializes your repository with an orchestrator that runs everything on your local machine."
};
