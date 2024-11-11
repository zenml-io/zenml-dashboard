import { Codesnippet } from "@/components/CodeSnippet";
import { Box } from "@zenml-io/react-component-library";
import { useSearchParams } from "react-router-dom";

export function CommandSection() {
	const [searchParams] = useSearchParams();
	const modelName = searchParams.get("model");

	function getCommand() {
		if (modelName) return `zenml model list --name='contains:${modelName}'`;
		return "zenml model list";
	}

	return (
		<Box className="flex flex-wrap justify-between p-5">
			<div>
				<p className="text-text-xl font-semibold">Staying Open Source? </p>
				<p className="text-theme-text-secondary">
					No problem! Use this CLI command to list your models
				</p>
			</div>
			<Codesnippet code={getCommand()} />
		</Box>
	);
}
