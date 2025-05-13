import { queryOptions } from "@tanstack/react-query";
import { fetchProject } from "./project-detail";

export const projectQueries = {
	all: ["projects"],
	projectDetail: (projectId: string) =>
		queryOptions({
			queryKey: [...projectQueries.all, projectId],
			queryFn: async () => fetchProject({ projectId })
		})
};
