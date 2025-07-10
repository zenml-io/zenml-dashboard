import { useStopPipelineRun } from "@/data/pipeline-runs/stop-run";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";

export function useStopRun() {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const stopRunQuery = useStopPipelineRun({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["runs"] });
		},
		onError: (err) => {
			toast({
				rounded: true,
				status: "error",
				emphasis: "subtle",
				description: <div>{err.message}</div>
			});
		}
	});

	return { stopRunQuery };
}
