import { CommandListItem } from "../components/fallback-pages/Commands";

export const repositoryCommands: CommandListItem[] = [
	{
		command:
			"zenml code-repository register <NAME> --type=<CODE_REPOSITORY_TYPE] [--CODE_REPOSITORY_OPTIONS]",
		description: "Register a code repository"
	},
	{
		command:
			"zenml code-repository register <NAME> --type=custom --source=<CODE_REPOSITORY_SOURCE> [--CODE_REPOSITORY_OPTIONS]",
		description: "Use a custom repository "
	},
	{
		command: "zenml code-repository list",
		description: "List your registered code repositories"
	},
	{
		command: "zenml code-repository delete <REPOSITORY_NAME_OR_ID>",
		description: "Delete a code repository that you have previously registered"
	}
];
