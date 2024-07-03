import External from "@/assets/icons/link-external.svg?react";
import Aws from "@/assets/icons/services/aws.svg?react";
import { InfoBox } from "@/components/Infobox";
import { useDeploymentUrl } from "@/data/stacks/stack-deployment-url";
import { Button } from "@zenml-io/react-component-library";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { useNewInfraWizardContext } from "../../NewInfraWizardContext";

export function AWSDeployStep() {
	const { isLoading } = useNewInfraWizardContext();
	const { setIsNextButtonDisabled } = useNewInfraFormContext();
	setIsNextButtonDisabled(true);
	if (isLoading) return <ProvisioningStep />;
	return <DeployButtonPart />;
}

function DeployButtonPart() {
	return (
		<div className="space-y-5">
			<InfoBox>
				This will provision and register a basic AWS ZenML stack with all the necessary resources
				and credentials required to run pipelines in AWS.
			</InfoBox>
			<div>
				<div className="flex flex-wrap items-center gap-1">
					<Aws className="h-5 w-5" />
					<p className="text-text-lg font-semibold">Deploy the Stack</p>
				</div>
				<p className="text-theme-text-secondary">
					Deploy the stack using AWS CloudFormation in your browser by clicking the button below:
				</p>
			</div>
			<DeploymentButton />
		</div>
	);
}

function ProvisioningStep() {
	return <p>Provisioning</p>;
}

function DeploymentButton() {
	const { data } = useNewInfraFormContext();
	const { setIsLoading } = useNewInfraWizardContext();
	const { mutate } = useDeploymentUrl({
		onSuccess: async (data) => {
			setIsLoading(true);
			window.open(data[0], "_blank");
		}
	});

	function handleClick() {
		mutate({ stack_name: data.stackName!, location: data.location, provider: "aws" });
	}
	return (
		<Button size="md" onClick={() => handleClick()}>
			Deploy in AWS <External className="h-5 w-5 fill-white" />
		</Button>
	);
}
