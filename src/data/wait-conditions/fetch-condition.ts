import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { RunWaitCondition } from "@/types/wait-conditions";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export async function fetchRunWaitCondition(runWaitConditionId: string): Promise<RunWaitCondition> {
	const url = createApiPath(apiPaths.run_wait_conditions.detail(runWaitConditionId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => "Error while fetching run wait condition ${runWaitConditionId}");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json() as Promise<RunWaitCondition>;
}
