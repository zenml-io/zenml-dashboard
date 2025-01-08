import { apiPaths } from "@/data/api";
import { UpdateUser, User } from "@/types/user";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api-client";

export async function updateUser(body: UpdateUser) {
	const data = await apiClient<User>(apiPaths.currentUser, {
		method: "PUT",
		body: JSON.stringify(body)
	});
	return data;
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
