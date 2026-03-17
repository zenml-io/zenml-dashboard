import { FetchError } from "@/lib/fetch-error";
import { ResolvedRunWaitConditionRequest, RunWaitCondition } from "@/types/wait-conditions";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type resolveRunWaitConditionParams = {
	runWaitConditionId: string;
	payload: ResolvedRunWaitConditionRequest;
};

export async function resolveRunWaitCondition({
	payload,
	runWaitConditionId
}: resolveRunWaitConditionParams): Promise<RunWaitCondition> {
	const url = createApiPath(apiPaths.run_wait_conditions.resolve(runWaitConditionId));

	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
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
			.catch(() => "Error while resolving run wait condition ${runWaitConditionId}");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useResolveRunWaitCondition(
	options?: UseMutationOptions<RunWaitCondition, FetchError, resolveRunWaitConditionParams, any>
) {
	return useMutation<RunWaitCondition, FetchError, resolveRunWaitConditionParams, unknown>({
		...options,
		mutationFn: async ({ payload, runWaitConditionId }: resolveRunWaitConditionParams) => {
			return resolveRunWaitCondition({ payload, runWaitConditionId });
		}
	});
}
