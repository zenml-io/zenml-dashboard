import { DeploymentType } from "@/types/server";

export function checkIsLocalServer(deploymentType: DeploymentType) {
	return deploymentType === "local" || deploymentType === "docker";
}
