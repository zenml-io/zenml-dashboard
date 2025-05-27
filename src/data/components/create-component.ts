import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { StackComponent, StackComponentRequest } from "@/types/components";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type CreateComponentParams = {
	payload: StackComponentRequest;
};

export async function createComponent({ payload }: CreateComponentParams): Promise<StackComponent> {
	const url = createApiPath(apiPaths.components.all);
	const res = await fetcher(url, {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
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

export function useCreateComponent(
	options?: UseMutationOptions<StackComponent, FetchError, CreateComponentParams, any>
) {
	return useMutation({
		...options,
		mutationFn: async ({ payload }: CreateComponentParams) => {
			return createComponent({ payload });
		}
	});
}
