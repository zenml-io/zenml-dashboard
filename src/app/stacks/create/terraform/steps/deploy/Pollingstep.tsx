import Tool from "@/assets/icons/tool-02.svg?react";
import { StackDeploymentProvider } from "@/types/stack";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { CloudComponents } from "../../../new-infrastructure/Providers";
import { usePollinglist } from "./usePollinglist";

function Pollinglist() {
	const { fullstackDeployment, data } = usePollinglist();
	if (fullstackDeployment.isError) return <p>Error fetching Terraform Command</p>;
	if (fullstackDeployment.isPending) return <Skeleton className="h-[200px] w-full" />;

	return <Components provider={data.provider || "aws"} stackName={data.stackName || ""} />;
}

export function PollingSection() {
	return (
		<section className="space-y-5 border-t border-theme-border-moderate pt-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Tool className="h-5 w-5 fill-primary-400" />
					Waiting for your Terraform script to finish...
				</p>
				<p className="text-theme-text-secondary">
					We are detecting whether your Terraform script ran through successfully. Once the
					terraform script has finished successfully, come back to check your brand new stack and
					components ready.
				</p>
			</div>

			<Pollinglist />
		</section>
	);
}

function Components({
	stackName,
	provider
}: {
	stackName: string;
	provider: StackDeploymentProvider;
}) {
	return (
		<div className="relative overflow-hidden rounded-md">
			<div className="absolute z-50 h-full w-full bg-neutral-50/50"></div>
			<CloudComponents
				type={provider}
				componentProps={{ isLoading: true, isSuccess: false, stackName: stackName }}
			/>
		</div>
	);
}
