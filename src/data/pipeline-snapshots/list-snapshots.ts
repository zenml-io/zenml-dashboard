import { FetchError } from "@/lib/fetch-error";
import { objectToSearchParams } from "@/lib/url";
import { PipelineSnapshotList, PipelineSnapshotListQueryParams } from "@/types/pipeline-snapshots";
import { notFound } from "../../lib/not-found-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type SnapshotListOverview = {
	params: PipelineSnapshotListQueryParams;
};

export async function fetchSnapshotList({
	params
}: SnapshotListOverview): Promise<PipelineSnapshotList> {
	const queryParams = objectToSearchParams(params).toString();
	const url =
		createApiPath(apiPaths.pipeline_snapshots.list) + (queryParams ? `?${queryParams}` : "");
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
			.catch(() => "Failed to fetch pipeline snapshots");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
