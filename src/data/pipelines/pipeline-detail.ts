import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";
export type PipelineDetailArgs = {
	pipelineId: string;
};

export async function fetchPipelineDetail({ pipelineId }: PipelineDetailArgs) {
	const url = createApiPath(apiPaths.pipelines.detail(pipelineId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: `Error while fetching pipeline ${pipelineId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}
