export const SCRIPT_CONFIG = {
	aws: {
		stackName: "zenml-aws",
		region: "eu-central-1",
		scriptLink:
			"https://raw.githubusercontent.com/zenml-io/zenml/refs/heads/main/infra/scripts/aws-artifact-store-setup.sh",
		cliName: "AWS CLI",
		integration: "s3"
	},
	azure: {
		stackName: "zenml-azure",
		region: "francecentral",
		scriptLink:
			"https://raw.githubusercontent.com/zenml-io/zenml/refs/heads/main/infra/scripts/azure-artifact-store-setup.sh",
		cliName: "Azure CLI",
		integration: "azure"
	},

	gcp: {
		stackName: "zenml-gcp",
		region: "europe-west1",
		scriptLink:
			"https://raw.githubusercontent.com/zenml-io/zenml/refs/heads/main/infra/scripts/gcp-artifact-store-setup.sh",
		cliName: "gcloud CLI",
		integration: "gcp"
	}
} as const;
