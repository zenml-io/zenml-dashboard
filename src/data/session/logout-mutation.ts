import { apiPaths, createApiPath } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../FetchError";

export async function loginUser() {
	const url = createApiPath(apiPaths.logout);

	// TODO possibly this fetch can be abstracted
	const res = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			accept: "application/json"
		}
	});

	if (!res.ok) {
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: "Failed to Login"
		});
	}

	return res.json();
}

export function useLogoutMutation(
	options?: Omit<UseMutationOptions<string, unknown>, "mutationFn">
) {
	return useMutation<string, unknown>({
		mutationFn: async () => {
			return loginUser();
		},
		...options
	});
}
