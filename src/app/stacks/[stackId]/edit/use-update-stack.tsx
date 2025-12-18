import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { useUpdateStack } from "@/data/stacks/update-stack";
import { useQueryClient } from "@tanstack/react-query";
import { FormType } from "../../create/manual/schema";
import { stackQueries } from "@/data/stacks";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router/routes";
import { useToast } from "@zenml-io/react-component-library";

export function useUpdateStackHook(stackId: string) {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const updateStack = useUpdateStack({
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

	function updateExistingStack(data: FormType) {
		const components = Object.entries(data.components).reduce(
			(acc, [key, value]) => {
				if (value) {
					acc[key] = [value.id];
				}
				return acc;
			},
			{} as Record<string, [string]>
		);

		updateStack.mutate({
			stackId,
			payload: {
				name: data.stackName,
				components: components
			}
		});
	}

	return { updateExistingStack, isPending: updateStack.isPending };
}
