import { FetchError } from "@/lib/fetch-error";
import {
	DeploymentInvocationRequest,
	DeploymentInvocationResponse,
	InvocationValidationError
} from "@/types/deployment-invocations";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type InvokeConfig = {
	url: string;
	payload: DeploymentInvocationRequest;
	authKey: string | undefined;
};

async function invokeDeployment({
	url,
	payload,
	authKey
}: InvokeConfig): Promise<DeploymentInvocationResponse> {
	const invocationUrl = `${url}/invoke`;

	const res = await fetch(invocationUrl, {
		method: "POST",
		headers: {
			...(authKey ? { Authorization: `Bearer ${authKey}` } : {}),
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		let errorMessage: string;
		if (res.status === 422) {
			const resData = (await res.json()) as InvocationValidationError;
			errorMessage =
				resData.detail?.map((detail) => `${detail.loc[2]}: ${detail.msg}`).join(", ") ||
				"Validation error";
		} else {
			errorMessage = await res
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
				.catch(() => `Failed to invoke ${url}`);
		}

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorMessage
		});
	}

	return res.json();
}

export function useInvokeDeployment(
	options?: UseMutationOptions<DeploymentInvocationResponse, unknown, InvokeConfig>
) {
	return useMutation<DeploymentInvocationResponse, unknown, InvokeConfig>({
		...options,
		mutationFn: async (config) => invokeDeployment(config)
	});
}
