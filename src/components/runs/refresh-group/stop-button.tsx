import StopCircle from "@/assets/icons/stop-circle.svg?react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Skeleton, useToast } from "@zenml-io/react-component-library";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useParams } from "react-router-dom";
import { useStopPipelineRun } from "@/data/pipeline-runs/stop-run";

export function StopRunButton() {
	const { runId } = useParams() as { runId: string };
	const runQuery = usePipelineRun({ runId });
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate: stopPipelineRun, isPending } = useStopPipelineRun({
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

	if (runQuery.isError) return null;
	if (runQuery.isPending) return <Skeleton className="h-6 w-[75px]" />;

	const status = runQuery.data?.body?.status;
	const isActive = status === "running" || status === "initializing";

	function handleStop() {
		stopPipelineRun({
			runId,
			params: { graceful: false }
		});
	}

	return (
		<Button
			data-tour-id="stop-run-button"
			disabled={!isActive || isPending}
			intent="secondary"
			size="sm"
			className="group whitespace-nowrap"
			onClick={handleStop}
			emphasis="subtle"
		>
			<StopCircle className="h-4 w-4 shrink-0 fill-theme-text-primary transition-all duration-200 group-disabled:fill-neutral-300" />
			Stop
		</Button>
	);
}
