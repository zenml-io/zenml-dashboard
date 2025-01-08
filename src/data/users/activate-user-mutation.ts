import { apiPaths } from "@/data/api";
import { UpdateUser, User } from "@/types/user";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api-client";

type ActivateUserArgs = {
	userId: string;
	body: UpdateUser;
};

export async function activateUser({ userId, body }: ActivateUserArgs) {
	const data = await apiClient<User>(apiPaths.users.activate(userId), {
		method: "PUT",
		body: JSON.stringify(body)
	});
	return data;
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
