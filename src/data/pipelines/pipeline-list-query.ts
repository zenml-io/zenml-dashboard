import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { objectToSearchParams } from "@/lib/url";
import { PipelineListParams } from "@/types/pipelines";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export type PipelineOverview = {
	params: PipelineListParams;
};

export async function fetchAllPipelines({ params }: PipelineOverview) {
	const url = createApiPath(apiPaths.pipelines.all + "?" + objectToSearchParams(params));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: "Error while fetching pipelines",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}
