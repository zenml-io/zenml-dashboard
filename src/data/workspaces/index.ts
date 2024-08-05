import { queryOptions } from "@tanstack/react-query";
import { fetchWorkspace } from "./workspace-detail";

export const workspaceQueries = {
	all: ["workspaces"],
	workspaceDetail: (workspaceId: string) =>
		queryOptions({
			queryKey: [...workspaceQueries.all, workspaceId],
			queryFn: async () => fetchWorkspace({ workspaceId })
		})
};
