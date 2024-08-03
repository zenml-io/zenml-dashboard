import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { stackQueries } from "@/data/stacks";
import { useCreateStack } from "@/data/stacks/create-stack";
import { useCurrentUser } from "@/data/users/current-user-query";
import { workspaceQueries } from "@/data/workspaces";
import { routes } from "@/router/routes";
import { StackRequest } from "@/types/stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import { FormType } from "./schema";

export function useManualStack() {
	const workspace = useQuery({ ...workspaceQueries.workspaceDetail("default") });
	const user = useCurrentUser();
	const { toast } = useToast();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const createStack = useCreateStack({
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: stackQueries.all });
			navigate(routes.stacks.overview);
		},
		onError: (error) => {
			toast({
				status: "error",
				emphasis: "subtle",
				icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
				description: error.message,
				rounded: true
			});
		}
	});

	function createManualStack(data: FormType) {
		// filter out null from data.components object
		const components = Object.entries(data.components).reduce(
			(acc, [key, value]) => {
				if (value) {
					acc[key] = [value.id];
				}
				return acc;
			},
			{} as Record<string, [string]>
		);

		const payload: StackRequest = {
			name: data.stackName,
			user: user.data?.id || "",
			workspace: workspace.data?.id || "",
			components: components
		};

		createStack.mutate({ workspaceId: workspace.data?.id || "", payload });
	}

	return { createManualStack };
}
