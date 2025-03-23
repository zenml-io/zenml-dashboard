import { Codesnippet } from "@/components/CodeSnippet";
import { InfoBox as InfoBoxPrimitive } from "@/components/Infobox";
import { Box } from "@zenml-io/react-component-library";
import { useSearchParams } from "react-router-dom";

export function InfoBox() {
	return (
		<InfoBoxPrimitive>
			<div className="flex w-full flex-wrap items-center gap-x-2 gap-y-0.5 text-text-md">
				<p className="font-semibold">This is a ZenML Pro feature. </p>
				<p>
					Upgrade to ZenML Pro to access the Artifact Control Plane and interact with your artifacts
					in the Dashboard.
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
		return "zenml artifact --help";
	}

	return (
		<Box className="flex w-full flex-wrap justify-between p-5">
			<div>
				<p className="text-text-xl font-semibold">Keep using existing version?</p>
				<p className="text-theme-text-secondary">
					No problem! Use this CLI command to see all available artifact operations:
				</p>
			</div>
			<Codesnippet highlightCode code={getCommand()} />
		</Box>
	);
}
