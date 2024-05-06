import { Codesnippet } from "@/components/CodeSnippet";
import { InfoBox as InfoBoxPrimitive } from "@/components/Infobox";
import { Box } from "@zenml-io/react-component-library";
import { useSearchParams } from "react-router-dom";

export function InfoBox() {
	return (
		<InfoBoxPrimitive>
			<div className="flex w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-text-md">
				<p className="font-semibold">This is a ZenML Cloud feature. </p>
				<p>
					Upgrade to ZenML Cloud to access the Artifact Control Plane and interact with your
					artifacts in the Dashboard.
				</p>
			</div>
		</InfoBoxPrimitive>
	);
}

export function CommandSection() {
	const [searchParams] = useSearchParams();
	const artifactName = searchParams.get("artifact");

	function getCommand() {
		if (artifactName) return `zenml artifact list --name='contains:${artifactName}'`;
		return "zenml artifact list";
	}

	return (
		<Box className="flex flex-wrap justify-between p-5">
			<div>
				<p className="text-text-xl font-semibold">Staying Open Source? </p>
				<p className="text-theme-text-secondary">
					No problem! Use this CLI command to list your artifacts
				</p>
			</div>
			<Codesnippet code={getCommand()} />
		</Box>
	);
}
