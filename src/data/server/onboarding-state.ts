import { FetchError } from "@/lib/fetch-error";
import { OnboardingResponse } from "@/types/onboarding";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export function getOnboardingKey() {
	return ["onboarding_state"];
}

export async function fetchOnboarding() {
	const url = createApiPath(apiPaths.onboarding);
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
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
			.catch(() => "Failed to update activate user");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useOnboarding(
	options?: Omit<UseQueryOptions<OnboardingResponse, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<OnboardingResponse, FetchError>({
		queryKey: getOnboardingKey(),
		queryFn: async () => fetchOnboarding(),
		...options
	});
}
