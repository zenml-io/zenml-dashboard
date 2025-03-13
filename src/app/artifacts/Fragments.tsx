import { Codesnippet } from "@/components/CodeSnippet";
import { Box } from "@zenml-io/react-component-library";
import { useSearchParams } from "react-router-dom";

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
					No problem! Use this CLI command to see all available model operations:
				</p>
			</div>
			<Codesnippet highlightCode code={getCommand()} />
		</Box>
	);
}
