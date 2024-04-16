import { ReactNode } from "react";
import Azure from "@/assets/icons/services/azure.svg?react";
import Kubernetes from "@/assets/icons/services/kubernetes.svg?react";
import GCP from "@/assets/icons/services/gcp.svg?react";
import Docker from "@/assets/icons/services/docker.svg?react";
import AWS from "@/assets/icons/services/aws.svg?react";
import { ConnectorTypeSectionProps } from "@/app/settings/connectors/Fragments";
import { CommandListItem } from "@/components/fallback-pages/Commands";

export type ConnectorType = "kubernetes" | "gcp" | "docker" | "azure" | "aws";

const classes = "w-5 h-5";

export const ConnectorSelectOptions: { label: string; value: ConnectorType; icon: ReactNode }[] = [
	{
		label: "Kubernetes",
		value: "kubernetes",
		icon: <Kubernetes className={classes} />
	},
	{
		label: "GCP",
		value: "gcp",
		icon: <GCP className={classes} />
	},
	{
		label: "Docker",
		value: "docker",
		icon: <Docker className={classes} />
	},
	{
		label: "Azure",
		value: "azure",
		icon: <Azure className={classes} />
	},
	{ label: "AWS", value: "aws", icon: <AWS className={classes} /> }
];

export const KubernetesSection: ConnectorTypeSectionProps = {
	help: {
		href: "https://docs.zenml.io/stacks-and-components/auth-management/kubernetes-service-connector",
		text: "Use the complete guide to set up your Kubernetes Service Connector."
	},
	prerequisites: getPrerequites("kubernetes", "Kubernetes"),
	listCommand: getListCommand("kubernetes", "Kubernetes"),
	topInfobox:
		"The ZenML Kubernetes service connector facilitates authenticating and connecting to a Kubernetes cluster. The connector can be used to access to any generic Kubernetes cluster by providing pre-authenticated Kubernetes python clients to Stack Components that are linked to it and also allows configuring the local Kubernetes CLI (i.e. kubectl).",
	bottomInfobox:
		"Upon completion of the installation of the required prerequisites and integration, our documentation provides you with a comprehensive list of resource types that can be employed to establish your connector. Please refer to the documentation to explore all available options."
};

export const GCPSection: ConnectorTypeSectionProps = {
	help: {
		text: "Use the complete guide to set up your GCP Service Connector.",
		href: "https://docs.zenml.io/stacks-and-components/auth-management/gcp-service-connector"
	},
	prerequisites: getPrerequites("gcp", "GCP"),
	listCommand: getListCommand("gcp", "GCP"),
	bottomInfobox:
		"Upon completion of the installation of the required prerequisites and integration, our documentation will guide you with a comprehensive list of all the resource types that can be employed to establish your GCP connector. Please refer to the documentation to explore all available options.",
	topInfobox:
		"The ZenML GCP Service Connector facilitates the authentication and access to managed GCP services and resources. These encompass a range of resources, including GCS buckets, GCR container repositories, and GKE clusters. The connector provides support for various authentication methods, including GCP user accounts, service accounts, short-lived OAuth 2.0 tokens, and implicit authentication."
};

export const DockerSection: ConnectorTypeSectionProps = {
	help: {
		text: "Use the complete guide to set up your Docker Service Connector.",
		href: "https://docs.zenml.io/stacks-and-components/auth-management/docker-service-connector"
	},
	listCommand: getListCommand("docker", "Docker"),
	topInfobox:
		"The ZenML Docker Service Connector allows authenticating with a Docker or OCI container registry and managing Docker clients for the registry. This connector provides pre-authenticated python-docker Python clients to Stack Components that are linked to it.",
	bottomInfobox:
		"No Python packages are required for this Service Connector. All prerequisites are included in the base ZenML Python package. Docker needs to be installed on environments where container images are built and pushed to the target container registry. Please refer to the documentation to explore all available options."
};

export const AzureSection: ConnectorTypeSectionProps = {
	help: {
		text: "Use the complete guide to set up your Azure Service Connector.",
		href: "https://docs.zenml.io/stacks-and-components/auth-management/azure-service-connector"
	},
	listCommand: getListCommand("azure", "Azure"),
	prerequisites: getPrerequites("azure", "Azure"),
	topInfobox:
		"The ZenML Azure Service Connector facilitates the authentication and access to managed Azure services and resources. These encompass a range of resources, including blob storage containers, ACR repositories, and AKS clusters.",
	bottomInfobox:
		"Upon completion of the installation of the required prerequisites and integration, our documentation will guide you with a comprehensive list of all the resource types that can be employed to establish your Azure connector. Please refer to the documentation to explore all available options."
};

export const AWSSection: ConnectorTypeSectionProps = {
	help: {
		text: "Use the complete guide to set up your AWS Service Connector.",
		href: "https://docs.zenml.io/stacks-and-components/auth-management/aws-service-connector"
	},
	listCommand: getListCommand("aws", "AWS"),
	prerequisites: getPrerequites("aws", "AWS"),
	topInfobox:
		"The ZenML AWS Service Connector facilitates the authentication and access to managed AWS services and resources. These encompass a range of resources, including S3 buckets, ECR container repositories, and EKS clusters. The connector provides support for various authentication methods, including explicit long-lived AWS secret keys, IAM roles, short-lived STS tokens, and implicit authentication.",
	bottomInfobox:
		"Upon completion of the installation of the required prerequisites and integration, our documentation will guide you with a comprehensive list of all the resource types that can be employed to establish your AWS connector. Please refer to the documentation to explore all available options."
};

function getListCommand(type: string, capitalized: string): CommandListItem {
	return {
		command: `pip service-connector list-types --type ${type}`,
		description: `List ${capitalized} Connector Types`
	};
}

function getPrerequites(type: string, capitalized: string): CommandListItem[] {
	return [
		{
			description: "Install the prerequisites",
			command: `pip install "zenml[connectors-${type}]"`
		},

		{
			description: `Install the entire ${capitalized} ZenML integration`,
			command: `zenml integration install ${type}`
		}
	];
}
