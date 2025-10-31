import { AnalyticsEvent } from "@/types/analytics";
import { fetcher } from "../fetch";
import { analyticsServerUrl } from "@/lib/analytics";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

async function performAnalyticsEvent(event: AnalyticsEvent) {
	fetcher(analyticsServerUrl, {
		method: "POST",
		credentials: "omit",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify([event])
	});
}

export function useAnalyticsEvent(options?: UseMutationOptions<void, unknown, AnalyticsEvent>) {
	return useMutation({
		...options,
		mutationFn: async (event: AnalyticsEvent) => {
			return performAnalyticsEvent(event);
		}
	});
}
