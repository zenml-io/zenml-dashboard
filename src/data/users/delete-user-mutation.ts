import { apiPaths } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../api-client";

export async function deleteUser(userId: string) {
	const data = await apiClient<string>(apiPaths.users.detail(userId), {
		method: "DELETE"
	});
	return data;
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
