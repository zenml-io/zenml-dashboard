import { DeploymentInvocationRequest } from "@/types/deployment-invocations";

type Args = {
	authKey: string | undefined;
};

export function createDeploymentInvocationClient({ authKey }: Args) {
	const defaultHeaders = {
		...(authKey ? { Authorization: `Bearer ${authKey}` } : {}),
		"Content-Type": "application/json"
	};

	const fetcher = function (input: RequestInfo | URL, init?: RequestInit) {
		return fetch(input, {
			...init,
			headers: {
				...defaultHeaders,
				...init?.headers
			}
		});
	};

	async function invokeDeployment(baseUrl: string, payload: DeploymentInvocationRequest) {
		const invocationUrl = `${baseUrl}/invoke`;
		const res = await fetcher(invocationUrl, {
			method: "POST",
			body: JSON.stringify(payload)
		});
		return res;
	}

	return { fetcher, invokeDeployment };
}
