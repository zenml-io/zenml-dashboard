import External from "@/assets/icons/link-external.svg?react";
import { InfoBox } from "@/components/Infobox";
import { CloudProviderIcon } from "@/components/ProviderIcon";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "@zenml-io/react-component-library";
import { stackQueries } from "../../../../../../data/stacks";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { useNewInfraWizardContext } from "../../NewInfraWizardContext";
import { GCPCodesnippet, GCPWarning } from "../../Providers/GCP";

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
			{data.provider === "gcp" && <GCPWarning />}
			<DeploymentButton setTimestampBool />
			{data.provider === "gcp" && <GCPCodesnippet />}
		</div>
	);
}

type DeploymentButtonProps = {
	setTimestampBool?: boolean;
};
export function DeploymentButton({ setTimestampBool }: DeploymentButtonProps) {
	const { data, setTimestamp } = useNewInfraFormContext();

	const { setIsLoading } = useNewInfraWizardContext();

	const stackDeploymentConfig = useQuery({
		...stackQueries.stackDeploymentConfig({
			provider: data.provider!,
			location: data.location,
			stack_name: data.stackName!
		})
	});

	if (stackDeploymentConfig.isError) {
		return null;
	}

	if (stackDeploymentConfig.isPending) {
		return <Skeleton className="h-[48px] w-[100px]" />;
	}

	function handleClick() {
		setTimestampBool && setTimestamp(new Date().toISOString().slice(0, -1)!);
		setIsLoading(true);
	}

	return (
		<Button asChild className="w-fit whitespace-nowrap" size="md" onClick={() => handleClick()}>
			<a href={stackDeploymentConfig.data.deployment_url} target="_blank" rel="noopener noreferrer">
				Deploy in {data.provider?.toUpperCase()}{" "}
				<External className="h-5 w-5 shrink-0 fill-white" />
			</a>
		</Button>
	);
}
