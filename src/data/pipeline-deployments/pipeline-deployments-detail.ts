import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { PipelineDeployment } from "@/types/pipeline-deployments";

export type PipelineDeploymentArgs = {
	deploymentId: string;
};

export async function fetchPipelineDeployment(
	{ deploymentId }: PipelineDeploymentArgs,
	token?: string
): Promise<PipelineDeployment> {
	const url = createApiPath(apiPaths.pipeline_deployments.detail(deploymentId));

	const res = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` })
		}
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => `Error while fetching pipeline deployment ${deploymentId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
