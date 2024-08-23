import { useQuery } from "@tanstack/react-query";
import { stackQueries } from "@/data/stacks";
import { Skeleton } from "@zenml-io/react-component-library";
import { StackComponent } from "@/types/components";
import { StackDeploymentProvider } from "@/types/stack";
import { CloudComponents } from "../../Providers";

type SuccessListProps = {
	timestamp: string;
	provider: StackDeploymentProvider;
	stackName: string;
	isTerraform?: boolean;
};
export function SuccessList({ provider, stackName, timestamp, isTerraform }: SuccessListProps) {
	const {
		isPending,
		isError,
		data: stack
	} = useQuery({
		...stackQueries.stackDeploymentStack({
			provider: provider,
			stack_name: stackName,
			date_start: timestamp,
			terraform: isTerraform
		}),

		throwOnError: true
	});

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return null;

	const createdStackName = stack.stack.name;
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
	const stepOperator = stack.stack.metadata?.components["step_operator"] as
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
		stepOperator: {
			name: stepOperator?.[0]?.name ?? "Step Operator",
			id: stepOperator?.[0]?.id.split("-")[0] ?? ""
		}
	};

	return (
		<CloudComponents
			type={provider}
			componentProps={{ components: components, isSuccess: true, stackName: createdStackName }}
		/>
	);
}
