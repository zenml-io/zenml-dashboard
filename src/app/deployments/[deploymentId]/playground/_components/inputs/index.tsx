import { Button } from "@zenml-io/react-component-library";

export function PlaygroundInputs() {
	return (
		<div className="flex h-full w-full flex-col divide-y divide-theme-border-moderate xl:w-1/2">
			<div className="flex h-full flex-col pt-5">
				<p className="text-text-lg font-semibold">Input</p>
				<section className="flex-1"></section>
			</div>
			<div className="flex items-center justify-end p-5">
				<Button size="md">Run</Button>
			</div>
		</div>
	);
}
