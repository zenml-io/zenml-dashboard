import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { stackQueries } from "@/data/stacks";
import { useDeleteStackMutation } from "@/data/stacks/delete-stack";
import { routes } from "@/router/routes";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";

export function useDeleteStack(stackId: string) {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const deleteStack = useDeleteStackMutation({
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

	function handleDelete() {
		deleteStack.mutate({ stackId });
	}
	return { handleDelete, deleteStack };
}
