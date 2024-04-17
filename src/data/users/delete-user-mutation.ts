import { apiPaths, createApiPath } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { fetcher } from "../fetch";

export async function deleteUser(userId: string) {
	const url = createApiPath(apiPaths.users.detail(userId));

	const res = await fetcher(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => data.detail)
			.catch(() => "Failed to delete User");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useDeleteUserMutation(
	options?: Omit<UseMutationOptions<string, unknown, string>, "mutationFn">
) {
	return useMutation<string, unknown, string>({
		mutationFn: async (id) => {
			return deleteUser(id);
		},
		...options
	});
}
