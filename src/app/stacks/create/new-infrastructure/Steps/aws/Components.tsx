import Coin from "@/assets/icons/coin.svg?react";
import CreditCard from "@/assets/icons/credit-card.svg?react";
import { Tick } from "@/components/Tick";
import { Avatar, AvatarFallback, Box, Spinner } from "@zenml-io/react-component-library";
import { ComponentBadge } from "../../ComponentBadge";
import { ComponentListItem } from "../Configuration";
import { PermissionsCard } from "../Configuration/AWSPermissions";

type Component = {
	name: string;
	id: string;
};
type Props = {
	stackName: string;
	isLoading?: boolean;
	isSuccess?: boolean;
	displayPermissions?: boolean;
	components?: {
		connector?: Component;
		artifactStore?: Component;
		registry?: Component;
		orchestrator?: Component;
	};
};
export function AWSComponents({
	stackName,
	isLoading,
	isSuccess,
	components,
	displayPermissions = false
}: Props) {
	return (
		<div className="divide-y divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="flex items-center gap-3 bg-theme-surface-secondary p-5 text-text-lg font-semibold">
				{isLoading && <Spinner className="h-5 w-5 shrink-0 border-[3px]" />}
				{isSuccess && <Tick className="h-5 w-5" tickClasses="w-3 h-3" />}
				<Avatar type="square" size="lg">
					<AvatarFallback size="lg">{stackName[0]}</AvatarFallback>
				</Avatar>
				{stackName}
			</div>
			<div className="space-y-1 py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.connector?.name || "IAM Role"}
					isLoading={isLoading}
					isSuccess={isSuccess}
					subtitle={components?.connector?.id || "Manage access to AWS resources"}
					badge={<ComponentBadge type="annotator">Service Connector</ComponentBadge>}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/service_connector/iam.webp",
						alt: "Sagemaker logo"
					}}
				/>
				{displayPermissions && <PermissionsCard />}
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.artifactStore?.name || "S3 Bucket"}
					subtitle={components?.artifactStore?.id || "Artifact storage for ML pipelines"}
					badge={<ComponentBadge type="artifact_store">Artifact Store</ComponentBadge>}
					isLoading={isLoading}
					isSuccess={isSuccess}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/artifact_store/aws.png",
						alt: "S3 logo"
					}}
				/>
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.registry?.name || "ECR Repository"}
					subtitle={components?.registry?.id || "Container image storage"}
					badge={<ComponentBadge type="container_registry">Container Registry</ComponentBadge>}
					isLoading={isLoading}
					isSuccess={isSuccess}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/aws.png",
						alt: "Sagemaker logo"
					}}
				/>
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.orchestrator?.name || "SageMaker"}
					isLoading={isLoading}
					isSuccess={isSuccess}
					subtitle={components?.orchestrator?.id || "Manage access to AWS resources"}
					badge={<ComponentBadge type="orchestrator">Orchestrator</ComponentBadge>}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/sagemaker.png",
						alt: "Sagemaker logo"
					}}
				/>
			</div>
		</div>
	);
}

export function AwsEstimateCosts() {
	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Coin className="h-5 w-5 fill-primary-400" />
					Estimated Cost
				</p>
				<p className="text-theme-text-secondary">
					These are rough estimates and actual costs may vary based on your usage and specific AWS
					pricing. Some services may be eligible for AWS Free Tier.
				</p>
			</div>
			<Box className="flex items-start gap-[10px] p-3">
				<div className="content-center rounded-sm bg-blue-25 p-1">
					<CreditCard className="h-5 w-5 fill-blue-400" />
				</div>
				<div>
					<p>
						Processing jobs: <span className="font-semibold text-theme-text-secondary">$0.922</span>{" "}
						<span className="text-theme-text-secondary">per hour</span>
					</p>
					<p>
						200GB of general storage:{" "}
						<span className="font-semibold text-theme-text-secondary">$0.14</span>{" "}
						<span className="text-theme-text-secondary">per hour</span>
					</p>
					<p>
						An average processing example would cost:{" "}
						<span className="font-semibold text-theme-text-success">$0.3112</span>
					</p>
					<p className="pt-3 text-text-xs text-theme-text-secondary">
						Use AWS Pricing Calculator for a detailed estimate
					</p>
				</div>
			</Box>
		</div>
	);
}
