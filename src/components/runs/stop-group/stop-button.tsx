import StopCircle from "@/assets/icons/stop-circle.svg?react";
import { Button } from "@zenml-io/react-component-library";
import { useStopRun } from "./use-stop-run";

type Props = {
	runId: string;
	isActive: boolean;
};

export function StopRunButton({ runId, isActive }: Props) {
	const {
		stopRunQuery: { mutate: stopPipelineRun, isPending }
	} = useStopRun();

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
			className="group whitespace-nowrap rounded-r-sharp"
			onClick={handleStop}
			emphasis="subtle"
		>
			<StopCircle className="h-4 w-4 shrink-0 fill-theme-text-primary transition-all duration-200 group-disabled:fill-neutral-300" />
			Stop
		</Button>
	);
}
