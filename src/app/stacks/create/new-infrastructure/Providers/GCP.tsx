import ConfigIcon from "@/assets/icons/logs.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { InfoBox } from "@/components/Infobox";
import { Tick } from "@/components/Tick";
import { stackQueries } from "@/data/stacks";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, Skeleton, Spinner } from "@zenml-io/react-component-library";
import { ComponentListItem, ProviderComponents } from ".";
import { ComponentBadge } from "../../../../../components/stack-components/ComponentBadge";
import { useNewInfraFormContext } from "../NewInfraFormContext";
import { PermissionsCard } from "./PermissionsCard";

type Props = ProviderComponents;

export function GcpComponents({
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
					title={components?.connector?.name || "Service Account"}
					isLoading={isLoading}
					isSuccess={isSuccess}
					subtitle={components?.connector?.id || "Manage access to GCP resources"}
					badge={<ComponentBadge type="annotator">Service Connector</ComponentBadge>}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/service_connector/gcp-iam.webp",
						alt: "Service Account logo"
					}}
				/>
				{displayPermissions && <PermissionsCard provider="gcp" />}
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.artifactStore?.name || "GCS Bucket"}
					subtitle={components?.artifactStore?.id || "Artifact storage for ML pipelines"}
					badge={<ComponentBadge type="artifact_store">Artifact Store</ComponentBadge>}
					isLoading={isLoading}
					isSuccess={isSuccess}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/artifact_store/gcp.png",
						alt: "GCS logo"
					}}
				/>
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.registry?.name || "Google Artifact Registry"}
					subtitle={components?.registry?.id || "Container image storage"}
					badge={<ComponentBadge type="container_registry">Container Registry</ComponentBadge>}
					isLoading={isLoading}
					isSuccess={isSuccess}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/gcp.png",
						alt: "Google Artifact Registry logo"
					}}
				/>
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.orchestrator?.name || "Vertex AI"}
					isLoading={isLoading}
					isSuccess={isSuccess}
					subtitle={components?.orchestrator?.id || "ML Workflow orchestration"}
					badge={<ComponentBadge type="orchestrator">Orchestrator</ComponentBadge>}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/vertexai.png",
						alt: "VertexAI logo"
					}}
				/>
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.imageBuilder?.name || "Cloud Build"}
					isLoading={isLoading}
					isSuccess={isSuccess}
					subtitle={components?.imageBuilder?.id || "Build, test, and deploy images"}
					badge={<ComponentBadge type="image_builder">Image Builder</ComponentBadge>}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/image_builder/gcp.png",
						alt: "Cloud Build logo"
					}}
				/>
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.operator?.name || "Vertex Step Operator"}
					subtitle={components?.operator?.id || "Execute individual steps"}
					badge={<ComponentBadge type="step_operator">Step Operator</ComponentBadge>}
					isLoading={isLoading}
					isSuccess={isSuccess}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/step_operator/vertexai.png",
						alt: "Vertex step operator logo"
					}}
				/>
			</div>
		</div>
	);
}

export function GCPWarning() {
	return (
		<InfoBox className="border-warning-300 bg-warning-50" intent="warning">
			The Cloud Shell session will warn you that the ZenML GitHub repository is untrusted. We
			recommend that you review the contents of the repository and then check the "Trust repo"
			checkbox to proceed with the deployment, otherwise the Cloud Shell session will not be
			authenticated to access your GCP projects.
		</InfoBox>
	);
}

export function GCPCodesnippet() {
	const { data } = useNewInfraFormContext();
	const deploymentConfig = useQuery({
		...stackQueries.stackDeploymentConfig({
			provider: "gcp",
			stack_name: data.stackName!,
			location: data.location
		})
	});
	if (deploymentConfig.isError) return null;
	if (deploymentConfig.isPending) return <Skeleton className="h-[200px] w-full" />;

	return (
		<section className="space-y-5 border-t border-theme-border-moderate pt-5">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<ConfigIcon className="h-5 w-5 fill-primary-400" />
					Configuration
				</p>
				<p className="text-theme-text-secondary">
					You will be asked to provide the following configuration values during the deployment
					process.
				</p>
			</div>
			<Codesnippet
				fullWidth
				highlightCode
				codeClasses="whitespace-pre-wrap word-break-all"
				wrap
				code={deploymentConfig.data.configuration || ""}
			/>
		</section>
	);
}
