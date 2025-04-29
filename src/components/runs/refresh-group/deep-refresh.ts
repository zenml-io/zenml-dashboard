import { useFetchOrchestratorPipelineRun } from "@/data/pipeline-runs/fetch-orchestrator-run";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library/components/client";

export function useDeepRefresh(setIsOpen: (isOpen: boolean) => void) {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const mutation = useFetchOrchestratorPipelineRun({
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["runs"]
			});
			toast({
				rounded: true,
				status: "success",
				emphasis: "subtle",
				description: "The run has been refreshed successfully"
			});
			setIsOpen(false);
		},
		onError: (e) => {
			toast({
				rounded: true,
				status: "error",
				emphasis: "subtle",
				description: e.message
			});
			setIsOpen(false);
		}
	});

	return mutation;
}
