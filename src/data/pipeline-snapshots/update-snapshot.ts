import { FetchError } from "@/lib/fetch-error";
import { PipelineSnapshot, PipelineSnapshotUpdate } from "@/types/pipeline-snapshots";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { fetcher } from "../fetch";
import { apiPaths, createApiPath } from "../api";

type SnapshotUpdateParams = {
	payload: PipelineSnapshotUpdate;
	snapshotId: string;
};

export async function updateSnapshot({
	payload,
	snapshotId
}: SnapshotUpdateParams): Promise<PipelineSnapshot> {
	const url = createApiPath(apiPaths.pipeline_snapshots.detail(snapshotId));
	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => `Failed to update snapshot ${snapshotId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useUpdateSnapshot(
	options?: UseMutationOptions<PipelineSnapshot, unknown, SnapshotUpdateParams>
) {
	return useMutation<PipelineSnapshot, unknown, SnapshotUpdateParams>({
		...options,
		mutationFn: async ({ payload, snapshotId }) => {
			return updateSnapshot({ payload, snapshotId });
		}
	});
}
