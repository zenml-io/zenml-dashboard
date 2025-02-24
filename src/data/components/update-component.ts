import { apiPaths, createApiPath } from "../api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { fetcher } from "../fetch";
import { StackComponent, StackComponentUpdateRequest } from "../../types/components";

type CreateComponentParams = {
	componentId: string;
	payload: StackComponentUpdateRequest;
};

export async function updateComponent({
	componentId,
	payload
}: CreateComponentParams): Promise<StackComponent> {
	const url = createApiPath(apiPaths.components.detail(componentId));
	const res = await fetcher(url, {
		headers: {
			"Content-Type": "application/json"
		},
		method: "PUT",
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

export function useUpdateComponent(
	options?: UseMutationOptions<StackComponent, FetchError, CreateComponentParams, any>
) {
	return useMutation({
		...options,
		mutationFn: async ({ payload, componentId }: CreateComponentParams) => {
			return updateComponent({ payload, componentId });
		}
	});
}
