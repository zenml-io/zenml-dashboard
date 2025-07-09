import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { objectToSearchParams } from "@/lib/url";
import { PipelineList, PipelineListParams } from "@/types/pipelines";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export type PipelineOverview = {
	params: PipelineListParams;
};

export async function fetchAllPipelines({ params }: PipelineOverview): Promise<PipelineList> {
	const url = createApiPath(apiPaths.pipelines.all + "?" + objectToSearchParams(params));
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
			.catch(() => "Error while fetching pipelines");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
