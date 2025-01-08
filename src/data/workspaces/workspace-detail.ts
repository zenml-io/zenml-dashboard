import { Workspace } from "@/types/workspaces";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";
export type StackDetailArgs = {
	workspaceId: string;
};

export async function fetchWorkspace({ workspaceId }: StackDetailArgs): Promise<Workspace> {
	const data = await apiClient<Workspace>(apiPaths.workspaces.detail(workspaceId));
	return data;
}
