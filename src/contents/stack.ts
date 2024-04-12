import { CommandListItem } from "../components/fallback-pages/Commands";

export const stackCommands: CommandListItem[] = [
	{
		command: "zenml stack register a_new_local_stack -o default -a my_artifact_store",
		description: "Register a stack"
	},
	{
		command: "zenml stack list",
		description: "List the stacks that you have registered within your current ZenML server"
	},
	{
		command: "zenml stack delete STACK_NAME",
		description: "Delete a stack that you have previously registered"
	},
	{
		command: "zenml stack set STACK_NAME",
		description: "Set a different stack"
	},
	{
		command: "zenml stack get",
		description: "Check which stack is currently set as the default active stack"
	},
	{
		command: "zenml stack update STACK_NAME -o NEW_ORCHESTRATOR_NAME",
		description: "Update a stack"
	}
];
