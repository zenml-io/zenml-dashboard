import { queryOptions } from "@tanstack/react-query";
import { fetchProject } from "./project-detail";
import { fetchProjectStatistics } from "./project-statistics";

export const projectQueries = {
	all: ["projects"],
	projectDetail: (projectId: string) =>
		queryOptions({
			queryKey: [...projectQueries.all, projectId],
			queryFn: async () => fetchProject({ projectId })
		}),
	projectStatistics: (projectId: string) =>
		queryOptions({
			queryKey: [...projectQueries.all, projectId, "statistics"],
			queryFn: async () => fetchProjectStatistics({ projectId })
		})
};
