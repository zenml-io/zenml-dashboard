import ConfigIcon from "@/assets/icons/logs.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { InfoBox } from "@/components/Infobox";
import { Numberbox } from "@/components/NumberBox";
import { ComponentBadge } from "@/components/stack-components/ComponentBadge";
import { Tick } from "@/components/Tick";
import { stackQueries } from "@/data/stacks";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, Skeleton, Spinner } from "@zenml-io/react-component-library";
import { useNewInfraFormContext } from "../NewInfraFormContext";
import { DeploymentButton } from "../Steps/Deploy/ButtonStep";
import { ComponentListItem, ProviderComponents } from "./index";
import { PermissionsCard } from "./PermissionsCard";

type Props = ProviderComponents;

export function AzureComponents({
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
					title={components?.connector?.name || "Azure Service Principal"}
					isLoading={isLoading}
					isSuccess={isSuccess}
					subtitle={components?.connector?.id || "Manage access to Azure resources"}
					badge={<ComponentBadge type="annotator">Service Connector</ComponentBadge>}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/service_connector/azure-service-principal.webp",
						alt: "Service Principal logo"
					}}
				/>
				{displayPermissions && <PermissionsCard provider="azure" />}
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.artifactStore?.name || "Azure Blob Storage"}
					subtitle={components?.artifactStore?.id || "Artifact storage for ML pipelines"}
					badge={<ComponentBadge type="artifact_store">Artifact Store</ComponentBadge>}
					isLoading={isLoading}
					isSuccess={isSuccess}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/artifact_store/azure.png",
						alt: "Blob Storage logo"
					}}
				/>
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.registry?.name || "Azure Container Registry"}
					subtitle={components?.registry?.id || "Container image storage"}
					badge={<ComponentBadge type="container_registry">Container Registry</ComponentBadge>}
					isLoading={isLoading}
					isSuccess={isSuccess}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/container_registry/azure.png",
						alt: "Azure Container Registry logo"
					}}
				/>
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.orchestrator?.name || "Azure ML"}
					isLoading={isLoading}
					isSuccess={isSuccess}
					subtitle={components?.orchestrator?.id || "ML Workflow orchestration"}
					badge={<ComponentBadge type="orchestrator">Orchestrator</ComponentBadge>}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/orchestrator/azureml.png",
						alt: "Azure ML logo"
					}}
				/>
			</div>
			<div className="py-3 pl-9 pr-5">
				<ComponentListItem
					title={components?.operator?.name || "Azure Step Operator"}
					subtitle={components?.operator?.id || "Execute individual steps"}
					badge={<ComponentBadge type="step_operator">Step Operator</ComponentBadge>}
					isLoading={isLoading}
					isSuccess={isSuccess}
					img={{
						src: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/step_operator/azureml.png",
						alt: "Azure Step Operator logo"
					}}
				/>
			</div>
		</div>
	);
}

export function AzureInstructions({ displayInfobox = false }: { displayInfobox?: boolean }) {
	return (
		<section className="space-y-5">
			<AzureHeader />
			<AzureDeploymentButton displayInfobox={displayInfobox} />
			<CodeSnippetStep />
			<CommandStep />
		</section>
	);
}

function AzureDeploymentButton({ displayInfobox = false }: { displayInfobox: boolean }) {
	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Numberbox>1</Numberbox>
					<span className="text-text-lg font-semibold">Open the Azure Cloud Shell Console</span>
				</div>
				<p className="text-theme-text-secondary">
					Deploy the stack using the Azure Cloud Shell console.
				</p>
			</div>
			<DeploymentButton setTimestampBool>
				<span className="text-text-lg font-semibold">Open the Azure Cloud Shell</span>
			</DeploymentButton>
			{displayInfobox && (
				<InfoBox className="border-warning-300 bg-warning-50" intent="warning">
					After the Terraform deployment is complete, you can close the Cloud Shell session and
					return to the dashboard to view details about the associated ZenML stack automatically
					registered with ZenML.
				</InfoBox>
			)}
		</div>
	);
}

function CodeSnippetStep() {
	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Numberbox>2</Numberbox>
					<span className="text-text-lg font-semibold">
						Create a file with the following configuration
					</span>
				</div>
				<p className="text-theme-text-secondary">
					Create a file named <code className="font-mono text-primary-400">main.tf</code> in the
					Cloud Shell and copy and paste the Terraform configuration below into it.
				</p>
			</div>
			<AzureCodesnippet />
		</div>
	);
}

function CommandStep() {
	return (
		<div className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Numberbox>3</Numberbox>
					<span className="text-text-lg font-semibold">Run the following commands</span>
				</div>
			</div>
			<div>
				<p className="mb-1 text-text-sm text-theme-text-secondary">
					Initialize the Terraform configuration.
				</p>
				<Codesnippet code="terraform init --upgrade" />
			</div>
			<div>
				<p className="mb-1 text-text-sm text-theme-text-secondary">
					Run terraform apply to deploy the ZenML stack to Azure.
				</p>
				<Codesnippet code="terraform apply" />
			</div>
		</div>
	);
}

function AzureCodesnippet() {
	const { data } = useNewInfraFormContext();
	const deploymentConfig = useQuery({
		...stackQueries.stackDeploymentConfig({
			provider: "azure",
			stack_name: data.stackName!,
			location: data.location
		}),
		enabled: !!data.stackName
	});
	if (deploymentConfig.isError) return null;
	if (deploymentConfig.isPending) return <Skeleton className="h-[200px] w-full" />;

	return (
		// This should be a unified component for gcp as well

		<Codesnippet
			fullWidth
			highlightCode
			codeClasses="whitespace-pre-wrap word-break-all"
			wrap
			code={deploymentConfig.data.configuration || ""}
		/>
	);
}

function AzureHeader() {
	return (
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
	);
}
