import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { Project } from "@/types/projects";
import { apiPaths, createApiPath } from "../api";
export type ProjectDetailArgs = {
	projectId: string;
};

export async function fetchProject({ projectId }: ProjectDetailArgs): Promise<Project> {
	const url = createApiPath(apiPaths.projects.detail(projectId));
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
			.catch(() => `Error while fetching project ${projectId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
