import { apiPaths, createApiPath } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { fetcher } from "../fetch";
import { CreateUser, User } from "@/types/user";

export async function createUser(body: CreateUser) {
	const url = createApiPath(apiPaths.users.all);

	const res = await fetcher(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => data.detail)
			.catch(() => "Failed to create User");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useCreateUserMutation(
	options?: Omit<UseMutationOptions<User, unknown, CreateUser>, "mutationFn">
) {
	return useMutation<User, unknown, CreateUser>({
		mutationFn: async (payload) => {
			return createUser(payload);
		},
		...options
	});
}
