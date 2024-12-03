import { DeploymentType } from "../types/server";

export function getLoginCommand(deploymentType: DeploymentType) {
	switch (deploymentType) {
		case "local":
			return "zenml login --local";

		case "docker":
			return "zenml login --local --docker";
		default:
			return `zenml login ${window.location.origin}`;
	}
}
