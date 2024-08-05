import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { Workspace } from "@/types/workspaces";
import { apiPaths, createApiPath } from "../api";
export type StackDetailArgs = {
	workspaceId: string;
};

export async function fetchWorkspace({ workspaceId }: StackDetailArgs): Promise<Workspace> {
	const url = createApiPath(apiPaths.workspaces.detail(workspaceId));
	const res = await fetch(url, {
		method: "GET",
		credentials: "include",
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
			.catch(() => `Error while fetching workspace ${workspaceId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
