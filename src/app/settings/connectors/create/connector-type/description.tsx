import Cloud from "@/assets/icons/cloud.svg?react";

export function StepDescription() {
	return (
		<div className="space-y-1">
			<div className="flex items-center gap-1">
				<Cloud className="size-5 shrink-0 stroke-primary-400" />
				<p className="font-sebmibold text-text-lg">Select a Service Connector Type</p>
			</div>
			<p className="text-theme-text-secondary">
				Select the type of service connector you want to create. This will allow you to integrate
				your cloud resources with ZenML for model deployment and management.
			</p>
		</div>
	);
}
