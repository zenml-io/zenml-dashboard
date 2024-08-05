import { createApiPath, apiPaths } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { Stack, StackRequest } from "@/types/stack";

type CreateStackParams = {
	workspaceId: string;
	payload: StackRequest;
};

export async function createStack({ workspaceId, payload }: CreateStackParams): Promise<Stack> {
	const url = createApiPath(apiPaths.workspaces.stacks(workspaceId));

	const res = await fetch(url, {
		method: "POST",
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
			.catch(() => "Error while creating new stack");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useCreateStack(
	options?: UseMutationOptions<Stack, FetchError, CreateStackParams, any>
) {
	return useMutation<Stack, FetchError, CreateStackParams, unknown>({
		...options,
		mutationFn: async ({ workspaceId, payload }: CreateStackParams) => {
			return createStack({ workspaceId, payload });
		}
	});
}
