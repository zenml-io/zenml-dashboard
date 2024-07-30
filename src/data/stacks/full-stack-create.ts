import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { FullStackRequest, Stack } from "@/types/stack";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type CreateFullStackParams = {
	workspaceId: string;
	payload: FullStackRequest;
};

export async function createFullstack({
	workspaceId,
	payload
}: CreateFullStackParams): Promise<Stack> {
	const url = createApiPath(apiPaths.workspaces.fullStack(workspaceId));

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
			.catch(() => "Error while creating full stack");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useCreateFullstack(
	options?: UseMutationOptions<Stack, FetchError, CreateFullStackParams, any>
) {
	return useMutation<Stack, FetchError, CreateFullStackParams, unknown>({
		...options,
		mutationFn: async ({ workspaceId, payload }: CreateFullStackParams) => {
			return createFullstack({ workspaceId, payload });
		}
	});
}
