import { apiPaths, createApiPath } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { fetcher } from "../fetch";
import { UpdateUser, User } from "@/types/user";

export async function updateUser(body: UpdateUser) {
	const url = createApiPath(apiPaths.currentUser);

	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (data.detail instanceof Array) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => "Failed to update User");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useUpdateCurrentUserMutation(
	options?: Omit<UseMutationOptions<User, unknown, UpdateUser>, "mutationFn">
) {
	return useMutation<User, unknown, UpdateUser>({
		mutationFn: async (payload) => {
			return updateUser(payload);
		},
		...options
	});
}
