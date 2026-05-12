import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { stackQueries } from "@/data/stacks";
import { useCreateStack } from "@/data/stacks/create-stack";
import { routes } from "@/router/routes";
import { StackRequest } from "@/types/stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormType, formSchema } from "./schema";

export function useManualStack() {
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
		const components = Object.fromEntries(
			Object.entries(data.components)
				.filter(([, items]) => items.length > 0)
				.map(([type, items]) => [type, items.map((item) => item.id)])
		);

		const payload: StackRequest = {
			name: data.stackName,
			components
		};

		createStack.mutate({ payload });
	}

	const form = useForm<FormType>({
		resolver: zodResolver(formSchema()),
		defaultValues: {
			components: {
				alerter: [],
				orchestrator: [],
				annotator: [],
				artifact_store: [],
				container_registry: [],
				data_validator: [],
				experiment_tracker: [],
				feature_store: [],
				model_registry: [],
				image_builder: [],
				model_deployer: [],
				step_operator: [],
				deployer: [],
				log_store: []
			},
			stackName: ""
		}
	});

	return { createManualStack, form };
}
