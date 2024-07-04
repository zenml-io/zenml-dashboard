import { stackQueries } from "@/data/stacks";
import { StackComponent } from "@/types/components";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { WizardStepWrapper } from "../../Wizard";
import { AWSComponents } from "../aws/Components";

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
			provider: "aws",
			stack_name: data.stackName!,
			date_start: timestamp
		}),

		throwOnError: true
	});

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return null;

	const names = {
		orchestratorName: (stack.stack.metadata?.components["orchestrator"] as StackComponent[])[0]
			.name,
		artifactStoreName: (stack.stack.metadata?.components["artifact_store"] as StackComponent[])[0]
			.name,
		registryName: (stack.stack.metadata?.components["container_registry"] as StackComponent[])[0]
			.name,
		connectorName: stack.service_connector?.name
	};

	return <AWSComponents names={names} isSuccess stackName={data.stackName!} />;
}
