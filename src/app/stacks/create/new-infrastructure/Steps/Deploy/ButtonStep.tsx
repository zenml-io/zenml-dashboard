import External from "@/assets/icons/link-external.svg?react";
import { InfoBox } from "@/components/Infobox";
import { CloudProviderIcon } from "@/components/ProviderIcon";
import { useDeploymentUrl } from "@/data/stacks/stack-deployment-url";
import { Button } from "@zenml-io/react-component-library";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { useNewInfraWizardContext } from "../../NewInfraWizardContext";

export function DeployButtonPart() {
	const { data } = useNewInfraFormContext();
	return (
		<div className="space-y-5">
			<InfoBox>
				This will provision and register a basic ZenML stack with all the necessary resources and
				credentials required to run pipelines.
			</InfoBox>
			<div>
				<div className="flex flex-wrap items-center gap-1">
					<CloudProviderIcon provider={data.provider!} className="h-5 w-5" />
					<p className="text-text-lg font-semibold">Deploy the Stack</p>
				</div>
				<p className="text-theme-text-secondary">
					Deploy the stack from your browser by clicking the button below:
				</p>
			</div>
			<DeploymentButton setTimestampBool />
		</div>
	);
}

type DeploymentButtonProps = {
	setTimestampBool?: boolean;
};
export function DeploymentButton({ setTimestampBool }: DeploymentButtonProps) {
	const { data, setTimestamp } = useNewInfraFormContext();
	const { setIsLoading } = useNewInfraWizardContext();
	const { mutate } = useDeploymentUrl({
		onSuccess: async (data) => {
			setTimestampBool && setTimestamp(new Date().toISOString().slice(0, -1)!);
			setIsLoading(true);
			window.open(data[0], "_blank");
		}
	});

	function handleClick() {
		mutate({
			stack_name: data.stackName!,
			location: data.location,
			provider: data.provider!
		});
	}
	return (
		<Button className="min-w-fit" size="md" onClick={() => handleClick()}>
			Deploy in {data.provider?.toUpperCase()} <External className="h-5 w-5 fill-white" />
		</Button>
	);
}
