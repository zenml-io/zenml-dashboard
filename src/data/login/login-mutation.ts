import { apiPaths, createApiPath } from "@/data/api";
import { LoginPayload, LoginResponse } from "@/types/session";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../FetchError";

export async function loginUser(body: LoginPayload) {
	const url = createApiPath(apiPaths.login);

	// TODO possibly this fetch can be abstracted
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams(body)
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

export function useLoginMutation(
	options?: Omit<UseMutationOptions<LoginResponse, unknown, LoginPayload>, "mutationFn">
) {
	return useMutation<LoginResponse, unknown, LoginPayload>({
		mutationFn: async (payload) => {
			return loginUser(payload);
		},
		...options
	});
}
