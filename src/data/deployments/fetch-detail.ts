import { FetchError } from "@/lib/fetch-error";
import { Deployment } from "@/types/deployments";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export type DeploymentDetailArgs = {
	deploymentId: string;
};

export async function fetchDeploymentDetail({
	deploymentId
}: DeploymentDetailArgs): Promise<Deployment> {
	const url = createApiPath(apiPaths.deployments.detail(deploymentId));

	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data)) {
					return data[1];
				}
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => `Error while fetching deployment ${deploymentId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
