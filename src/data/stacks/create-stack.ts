import { FetchError } from "@/lib/fetch-error";
import { Stack, StackRequest } from "@/types/stack";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type CreateStackParams = {
	payload: StackRequest;
};

export async function createStack({ payload }: CreateStackParams): Promise<Stack> {
	const url = createApiPath(apiPaths.stacks.all);

	const res = await fetcher(url, {
		method: "POST",
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
		mutationKey: ["stacks", "create"],
		...options,
		mutationFn: async ({ payload }: CreateStackParams) => {
			return createStack({ payload });
		}
	});
}
