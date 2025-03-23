import { Codesnippet } from "@/components/CodeSnippet";
import { UpgradeFallback } from "@/components/upgrade-fallback";
import { Box } from "@zenml-io/react-component-library/components/server";

export function TemplateBody() {
	return (
		<div className="layout-container flex flex-col items-center space-y-7 py-5">
			<UpgradeFallback />
			<CommandSection />
		</div>
	);
}

export function CommandSection() {
	return (
		<Box className="flex w-full flex-wrap justify-between p-5">
			<div>
				<p className="text-text-xl font-semibold">Keep using existing version?</p>
				<p className="text-theme-text-secondary">
					No problem! Use this CLI command to see all available model operations:
				</p>
			</div>
			<Codesnippet highlightCode code={"zenml pipeline create-run-template"} />
		</Box>
	);
}
