import { stackQueries } from "@/data/stacks";
import { StackComponent } from "@/types/components";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { CloudComponents } from "../../Providers";
import { WizardStepWrapper } from "../../Wizard";

export function SuccessStep() {
	const { setIsNextButtonDisabled } = useNewInfraFormContext();
	setIsNextButtonDisabled(false);
	return (
		<WizardStepWrapper title="Your Stack">
			<div className="space-y-5">
				<p className="text-theme-text-secondary">
					Here you can review the created stack and stack components. Now you can start running
					pipelines using this new configuration.
				</p>
				<SuccessList />
			</div>
		</WizardStepWrapper>
	);
}

function SuccessList() {
	const { timestamp, data } = useNewInfraFormContext();
	const {
		isPending,
		isError,
		data: stack
	} = useQuery({
		...stackQueries.stackDeploymentStack({
			provider: data.provider!,
			stack_name: data.stackName!,
			date_start: timestamp
		}),

		throwOnError: true
	});

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return null;

	const stackName = stack.stack.name;
	const orchestrators = stack.stack.metadata?.components["orchestrator"] as
		| StackComponent[]
		| undefined;
	const artifactStores = stack.stack.metadata?.components["artifact_store"] as
		| StackComponent[]
		| undefined;
	const registry = stack.stack.metadata?.components["container_registry"] as
		| StackComponent[]
		| undefined;
	const imageBuilder = stack.stack.metadata?.components["image_builder"] as
		| StackComponent[]
		| undefined;
	const operator = stack.stack.metadata?.components["step_operator"] as
		| StackComponent[]
		| undefined;

	const components = {
		orchestrator: {
			name: orchestrators?.[0]?.name ?? "Orchestrator",
			id: orchestrators?.[0]?.id.split("-")[0] ?? ""
		},
		artifactStore: {
			name: artifactStores?.[0]?.name ?? "Artifact Store",
			id: artifactStores?.[0]?.id.split("-")[0] ?? ""
		},
		registry: {
			name: registry?.[0]?.name ?? "Container Registry",
			id: registry?.[0]?.id.split("-")[0] ?? ""
		},
		connector: {
			name: stack.service_connector?.name as string,
			id: stack.service_connector?.id?.split("-")[0] ?? ""
		},
		imageBuilder: {
			name: imageBuilder?.[0]?.name ?? "Image Builder",
			id: imageBuilder?.[0]?.id.split("-")[0] ?? ""
		},
		operator: {
			name: operator?.[0]?.name ?? "Step Operator",
			id: operator?.[0]?.id.split("-")[0] ?? ""
		}
	};

	return (
		<CloudComponents
			type={data.provider!}
			componentProps={{ components: components, isSuccess: true, stackName }}
		/>
	);
}
