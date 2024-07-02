import { Box } from "@zenml-io/react-component-library";

export function SmartSetup() {
	return (
		<section className="w-full space-y-5">
			<div>
				<h2 className="text-text-xl font-semibold">Smart Stack Setup</h2>
				<p className="text-theme-text-secondary">
					Use our smart tools to connect to your Cloud in a quick and simplified way.
				</p>
			</div>
			<div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
				<NewInfrastructure />
				<ExistingCloud />
			</div>
		</section>
	);
}

function NewInfrastructure() {
	return <Box className="w-full px-6 py-5">New Infrastructure</Box>;
}

function ExistingCloud() {
	return <Box className="w-full px-6 py-5">Use existing cloud</Box>;
}
