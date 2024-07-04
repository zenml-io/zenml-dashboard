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
			provider: data.provider!,
			stack_name: data.stackName!,
			date_start: timestamp
		}),

		throwOnError: true
	});

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return null;

	const components = {
		orchestrator: {
			name: (stack.stack.metadata?.components["orchestrator"] as StackComponent[])[0].name,
			id: (stack.stack.metadata?.components["orchestrator"] as StackComponent[])[0].id.split("-")[0]
		},
		artifactStore: {
			name: (stack.stack.metadata?.components["artifact_store"] as StackComponent[])[0].name,
			id: (stack.stack.metadata?.components["artifact_store"] as StackComponent[])[0].id.split(
				"-"
			)[0]
		},
		registry: {
			name: (stack.stack.metadata?.components["container_registry"] as StackComponent[])[0].name,
			id: (stack.stack.metadata?.components["container_registry"] as StackComponent[])[0].id.split(
				"-"
			)[0]
		},
		connector: {
			name: stack.service_connector?.name as string,
			id: (stack.service_connector?.id as string).split("-")[0]
		}
	};

	return <AWSComponents components={components} isSuccess stackName={data.stackName!} />;
}
