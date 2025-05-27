import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { ProjectStatistics } from "@/types/projects";
import { apiPaths, createApiPath } from "../api";
export type ProjectDetailArgs = {
	projectId: string;
};

export async function fetchProjectStatistics({
	projectId
}: ProjectDetailArgs): Promise<ProjectStatistics> {
	const url = createApiPath(apiPaths.projects.statistics(projectId));
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
			.catch(() => `Error while fetching project statistics ${projectId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
