import StopCircle from "@/assets/icons/stop-circle.svg?react";
import { Button } from "@zenml-io/react-component-library";
import { useState } from "react";
import { StopGracefullyAlert } from "./stop-alert";

type Props = {
	runId: string;
	isActive: boolean;
};

export function StopRunButton({ runId, isActive }: Props) {
	const [isStopAlertOpen, setIsStopAlertOpen] = useState(false);

	return (
		<>
			<Button
				disabled={!isActive}
				intent="secondary"
				size="sm"
				className="group whitespace-nowrap rounded-r-sharp"
				onClick={() => setIsStopAlertOpen(true)}
				emphasis="subtle"
			>
				<StopCircle className="h-4 w-4 shrink-0 fill-theme-text-primary transition-all duration-200 group-disabled:fill-neutral-300" />
				Stop
			</Button>
			<StopGracefullyAlert open={isStopAlertOpen} setOpen={setIsStopAlertOpen} runId={runId} />
		</>
	);
}
