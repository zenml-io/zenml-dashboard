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
			components: components
		};

		createStack.mutate({ payload });
	}

	const form = useForm<FormType>({
		resolver: zodResolver(formSchema()),
		defaultValues: {
			components: {
				alerter: null,
				orchestrator: {},
				annotator: null,
				artifact_store: {},
				container_registry: null,
				data_validator: null,
				experiment_tracker: null,
				feature_store: null,
				model_registry: null,
				image_builder: null,
				model_deployer: null,
				step_operator: null,
				deployer: null,
				log_store: null
			},
			stackName: ""
		}
	});

	return { createManualStack, form };
}
