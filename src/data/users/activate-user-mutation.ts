import { apiPaths, createApiPath } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { fetcher } from "../fetch";
import { UpdateUser, User } from "@/types/user";

type ActivateUserArgs = {
	userId: string;
	body: UpdateUser;
};

export async function activateUser({ userId, body }: ActivateUserArgs) {
	const url = createApiPath(apiPaths.users.activate(userId));

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
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => "Failed to update activate user");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useActivateUser(
	options?: Omit<UseMutationOptions<User, unknown, ActivateUserArgs>, "mutationFn">
) {
	return useMutation<User, unknown, ActivateUserArgs>({
		mutationFn: async (payload) => {
			return activateUser(payload);
		},
		...options
	});
}
