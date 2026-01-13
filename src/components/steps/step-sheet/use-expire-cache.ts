import { useUpdateStep } from "@/data/steps/update-step";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";

export function useExpireCache(stepId: string) {
	const queryClient = useQueryClient();

	const { toast } = useToast();

	const { mutate: updateStep, isPending } = useUpdateStep({
		onError: (e) => {
			toast({
				status: "error",
				emphasis: "subtle",
				description: e.message,
				rounded: true
			});
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["steps", stepId]
			});
		}
	});

	function handleExpireNow() {
		updateStep({
			id: stepId,
			body: {
				cache_expires_at: new Date().toISOString()
			}
		});
	}

	return { handleExpireNow, isPending };
}
