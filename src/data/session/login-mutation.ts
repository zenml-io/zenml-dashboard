import { apiPaths, createApiPath } from "@/data/api";
import { LoginFormType, LoginResponse } from "@/types/session";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { fetcher } from "../fetch";

export async function loginUser(body: LoginFormType) {
	const url = createApiPath(apiPaths.login);

	const res = await fetcher(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams(body)
	});

	if (!res.ok) {
		const data = await res
			.json()
			.then((data) => data.detail)
			.catch(() => ["", "Failed to login"]);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: data[1] || "Failed to login"
		});
	}

	return res.json();
}

export function useLoginMutation(
	options?: Omit<UseMutationOptions<LoginResponse, unknown, LoginFormType>, "mutationFn">
) {
	return useMutation<LoginResponse, unknown, LoginFormType>({
		mutationFn: async (payload) => {
			return loginUser(payload);
		},
		...options
	});
}
