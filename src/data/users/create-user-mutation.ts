import { apiPaths } from "@/data/api";
import { CreateUser, User } from "@/types/user";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api-client";

export async function createUser(body: CreateUser) {
	const data = await apiClient<User>(apiPaths.users.all, {
		method: "POST",
		body: JSON.stringify(body)
	});
	return data;
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
