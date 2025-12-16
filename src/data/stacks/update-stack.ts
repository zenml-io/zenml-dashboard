import { FetchError } from "@/lib/fetch-error";
import { Stack, StackUpdateRequest } from "@/types/stack";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type UpdateStackParams = {
	stackId: string;
	payload: StackUpdateRequest;
};

export async function updateStack({ stackId, payload }: UpdateStackParams): Promise<Stack> {
	const url = createApiPath(apiPaths.stacks.detail(stackId));

	const res = await fetcher(url, {
		method: "PUT",
		credentials: "include",
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
			.catch(() => `Error while updating stack ${stackId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useUpdateStack(options?: UseMutationOptions<Stack, FetchError, UpdateStackParams>) {
	return useMutation<Stack, FetchError, UpdateStackParams, unknown>({
		...options,
		mutationFn: async ({ payload, stackId }: UpdateStackParams) => {
			return updateStack({ payload, stackId });
		}
	});
}
