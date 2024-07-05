import { Tick } from "@/components/Tick";
import { Avatar, AvatarFallback, Spinner } from "@zenml-io/react-component-library";
import { ComponentListItem, ProviderComponents } from ".";
import { ComponentBadge } from "../ComponentBadge";
import { PermissionsCard } from "./PermissionsCard";

type Props = ProviderComponents;

export const gcpPrizes = {
	orchestratorCosts: "$0.27",
	storageCosts: "$4.60"
};

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
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/service_connector/iam.webp",
						alt: "Service connector logo"
					}}
				/>
				{displayPermissions && <PermissionsCard />}
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
		</div>
	);
}
