import { createApiPath, apiPaths } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

type DeleteStackParams = {
	stackId: string;
};

export async function deleteStack({ stackId }: DeleteStackParams, token?: string) {
	const url = createApiPath(apiPaths.stacks.detail(stackId));

	const res = await fetch(url, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: `Bearer ${token}` } : {})
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
			.catch(() => `Error while deleting stack ${stackId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useDeleteStackMutation(
	options?: UseMutationOptions<string, FetchError, DeleteStackParams, any>
) {
	return useMutation<string, FetchError, DeleteStackParams, unknown>({
		...options,
		mutationFn: async ({ stackId }: DeleteStackParams) => {
			return deleteStack({ stackId });
		}
	});
}
