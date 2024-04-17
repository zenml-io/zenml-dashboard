import { CommandListItem } from "../components/fallback-pages/Commands";

export const secretCommands: CommandListItem[] = [
	{
		command: `zenml secret create SECRET_NAME --key1=value1 --key2=value2 --key3=value3 ...
            \n
# Another option is to use the '--values' option and provide key-value pairs in either JSON or YAML format.
zenml secret create SECRET_NAME --values '{"key1":"value2","key2":"value2","key3":"value3"}'`,
		description: "Create a secret"
	},
	{
		command: "zenml secret list",
		description: "List all the available secrets"
	},
	{
		command: "zenml secret get SECRET_NAME",
		description: "Get the key-value pairs for a particular secret"
	},
	{
		command: "zenml secret delete SECRET_NAME",
		description: "Delete a secret that you have previously registered"
	}
];
