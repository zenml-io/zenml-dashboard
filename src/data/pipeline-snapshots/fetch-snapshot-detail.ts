import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { fetcher } from "../fetch";

export type PipelineSnapshotArgs = {
	snapshotId: string;
};

export async function fetchPipelineSnapshotDetail({
	snapshotId
}: PipelineSnapshotArgs): Promise<PipelineSnapshot> {
	const url = createApiPath(apiPaths.pipeline_snapshots.detail(snapshotId));

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
				if (Array.isArray(data)) {
					return data[1] || "Unknown error";
				}
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => `Error while fetching pipeline snapshot ${snapshotId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
