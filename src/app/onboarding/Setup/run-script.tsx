import { Numberbox } from "@/components/NumberBox";
import { StackDeploymentProvider } from "@/types/stack";
import { SCRIPT_CONFIG } from "./constant";
import { useMemo } from "react";
import { Box } from "@zenml-io/react-component-library";
import { Codesnippet } from "@/components/CodeSnippet";

function generateRandomSuffix() {
	const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < 8; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

type Props = {
	provider: StackDeploymentProvider;
};

export function RunScript({ provider }: Props) {
	const script = SCRIPT_CONFIG[provider];
	const suffix = useMemo(() => generateRandomSuffix(), []);
	return (
		<Box className="space-y-5 p-5">
			<div className="space-y-1">
				<div className="flex flex-wrap items-center gap-2 text-text-lg">
					<Numberbox>2</Numberbox>
					<p className="font-semibold">Run the script</p>
				</div>
				<p className="text-theme-text-secondary">
					Make sure you are logged in locally with the {script.cliName} with an account with
					appropriate permissions.
					<br /> This script will create a cloud bucket on your account and register it back to your
					workspace.
				</p>
			</div>
			<div>
				<p className="mb-1 text-text-sm text-theme-text-secondary">Run this script</p>
				<Codesnippet
					code={`curl -sL ${script.scriptLink} | NAME=${script.stackName} REGION=${script.region} RANDOM_SUFFIX=${suffix}  bash`}
				/>
			</div>
		</Box>
	);
}
