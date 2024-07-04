import Configuration from "@/assets/icons/tool-02.svg?react";
import { InfoBox } from "@/components/Infobox";
import { CloudProviderIcon } from "@/components/ProviderIcon";
import { stackQueries } from "@/data/stacks";
import { StackDeploymentStack } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import { Box, Skeleton } from "@zenml-io/react-component-library";
import { useEffect, useState } from "react";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { useNewInfraWizardContext } from "../../NewInfraWizardContext";
import { AWSComponents } from "../aws/Components";
import { DeploymentButton } from "./ButtonStep";

export function ProvisioningStep() {
	const { data, timestamp, setIsNextButtonDisabled } = useNewInfraFormContext();
	const { setCurrentStep } = useNewInfraWizardContext();

	const {
		isPending,
		isError,
		data: stackData
	} = useQuery({
		...stackQueries.stackDeploymentStack({
			provider: data.provider!,
			stack_name: data.stackName!,
			date_start: timestamp
		}),
		refetchInterval: 5000,
		throwOnError: true
	});

	useEffect(() => {
		if (stackData) {
			setCurrentStep((prev) => prev + 1);
			setIsNextButtonDisabled(false);
		}
	}, [stackData]);

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return null;

	return (
		<div className="space-y-5">
			<LoadingHeader />
			<PollingList stack={stackData} />
		</div>
	);
}

function LoadingHeader() {
	const { data } = useNewInfraFormContext();
	return (
		<Box className="flex items-center justify-between gap-4 px-6 py-5">
			<div className="flex items-start gap-3">
				<CloudProviderIcon provider={data.provider!} className="h-6 w-6 shrink-0" />
				<div>
					<p className="text-text-lg font-semibold">Deploying the Stack...</p>
					<p className="text-theme-text-secondary">
						Follow the steps in your Cloud console to finish the setup. You can come back to check
						once your components are deployed.
					</p>
				</div>
			</div>
			<DeploymentButton />
		</Box>
	);
}

type PollingListProps = {
	stack?: StackDeploymentStack;
};
function PollingList({ stack }: PollingListProps) {
	const isReady = !!stack;
	return (
		<div className="space-y-5">
			{!isReady && (
				<div className="space-y-1">
					<p className="flex items-center gap-1 text-text-lg font-semibold">
						<Configuration className="h-5 w-5 fill-primary-400" />
						Creating your stack and components...
					</p>
					<p className="text-theme-text-secondary">
						We are creating your stack and stack components based on your configuration. Once you
						finish the setup, come back to check your brand new stack and components ready.
					</p>
				</div>
			)}
			<ItTakesLongerBox isReady={isReady} />
			<Components stack={stack} />
		</div>
	);
}

type CompnentProps = {
	stack?: StackDeploymentStack;
};
function Components({ stack }: CompnentProps) {
	const isReady = !!stack;
	const { data } = useNewInfraFormContext();

	return (
		<div className="relative overflow-hidden rounded-md">
			{!isReady && <div className="absolute z-50 h-full w-full bg-neutral-50/50"></div>}
			<AWSComponents isLoading={!isReady} isSuccess={isReady} stackName={data.stackName!} />
		</div>
	);
}

function ItTakesLongerBox({ isReady }: { isReady: boolean }) {
	const [show, setIsShow] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsShow(true);
		}, 300000);

		return () => clearTimeout(timer);
	}, []);

	if (!show || isReady) return null;
	return (
		<InfoBox>
			Your stack is taking longer than usual to deploy. Please check your Cloud console, or the
			stacks list in ZenML.
		</InfoBox>
	);
}
