import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { stackComponentTypes } from "@/lib/constants";
import { stackQueries } from "@/data/stacks";
import { useUpdateStack } from "@/data/stacks/update-stack";
import { routes } from "@/router/routes";
import { StackComponentType } from "@/types/components";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import { FormType } from "../../create/manual/schema";

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
		const components = stackComponentTypes.reduce<Partial<Record<StackComponentType, string[]>>>(
			(acc, type) => {
				const ids = data.components[type].map((component) => component.id);
				if (ids.length > 0) acc[type] = ids;
				return acc;
			},
			{}
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
