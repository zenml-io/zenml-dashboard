import { StackDeploymentProvider } from "../types/stack";

export function getCloudProviderName(name: StackDeploymentProvider | string) {
	switch (name) {
		case "aws":
			return "AWS";
		case "azure":
			return "Azure";
		case "gcp":
			return "GCP";
		default:
			return "Provider";
	}
}
