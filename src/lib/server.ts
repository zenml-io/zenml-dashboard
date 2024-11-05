import { AuthScheme, DeploymentType } from "@/types/server";

export function checkIsLocalServer(deploymentType: DeploymentType) {
	return deploymentType === "local" || deploymentType === "docker";
}

export function isNoAuthServer(authScheme: AuthScheme) {
	return authScheme === "NO_AUTH";
}
