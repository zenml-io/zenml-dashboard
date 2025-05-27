import { ProviderCard } from "@/app/stacks/create/components/ProviderRadio";
import { CloudProviderRadioButton } from "@/app/stacks/create/components/ProviderRadio";
import { Numberbox } from "@/components/NumberBox";
import { CloudProviderIcon } from "@/components/ProviderIcon";
import { routes } from "@/router/routes";
import { StackDeploymentProvider } from "@/types/stack";
import { Box } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

type Props = {
	selectedProvider: StackDeploymentProvider | null;
	setSelectedProvider: Dispatch<SetStateAction<StackDeploymentProvider | null>>;
};

export function ProviderOnboardingStep({ selectedProvider, setSelectedProvider }: Props) {
	const handleProviderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedProvider(event.target.value as StackDeploymentProvider);
	};

	return (
		<Box className="space-y-5 p-5">
			<div className="flex flex-wrap items-center gap-2 text-text-lg">
				<Numberbox>1</Numberbox>
				<p className="font-semibold">Select your Cloud Provider</p>
			</div>
			<form className="grid grid-cols-1 gap-3 md:grid-cols-3">
				<CloudProviderRadioButton
					id="aws-provider"
					value="aws"
					checked={selectedProvider === "aws"}
					onChange={handleProviderChange}
					name="provider"
				>
					<ProviderCard
						icon={<CloudProviderIcon provider="aws" className="h-6 w-6 shrink-0" />}
						title="AWS"
						subtitle="ZenML stack with S3, ECR, and SageMaker integration"
					/>
				</CloudProviderRadioButton>
				<CloudProviderRadioButton
					id="gcp-provider"
					value="gcp"
					checked={selectedProvider === "gcp"}
					onChange={handleProviderChange}
					name="provider"
				>
					<ProviderCard
						icon={<CloudProviderIcon provider="gcp" className="h-6 w-6 shrink-0" />}
						title="GCP"
						subtitle="Create ZenML infrastructure using GCS, Artifact Registry, and Vertex AI"
					/>
				</CloudProviderRadioButton>
				<CloudProviderRadioButton
					id="azure-provider"
					value="azure"
					checked={selectedProvider === "azure"}
					onChange={handleProviderChange}
					name="provider"
				>
					<ProviderCard
						icon={<CloudProviderIcon provider="azure" className="h-6 w-6 shrink-0" />}
						title="Azure"
						subtitle="Set up ZenML with Azure Storage, Container Registry, and ML services"
					/>
				</CloudProviderRadioButton>
			</form>
			<p className="text-text-sm">
				Using a different Cloud or don't have access to Terraform?{" "}
				<span className="text-theme-text-secondary">
					Use one of our{" "}
					<Link className="link text-theme-text-brand" to={routes.stacks.create.index}>
						stack creation tools
					</Link>
				</span>
			</p>
		</Box>
	);
}

import { PropsWithChildren } from "react";

type DisabledOptionProps = PropsWithChildren<{ number: number }>;

export function DisabledOption({ number, children }: DisabledOptionProps) {
	return (
		<div className="relative">
			<Box className="flex items-center gap-2 border border-theme-border-moderate p-5 text-text-lg font-semibold">
				<Numberbox intent="disabled">{number}</Numberbox>
				{children}
			</Box>
			<div className="absolute right-0 top-0 h-full w-full bg-theme-surface-primary/60" />
		</div>
	);
}
