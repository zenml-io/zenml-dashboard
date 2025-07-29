import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { useStopRun } from "./use-stop-run";

type Props = {
	handleStop: () => void;
	isPending: boolean;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

function StopBaseAlert({
	open,
	setOpen,
	handleStop,
	isPending,
	children
}: PropsWithChildren<Props>) {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Stop Run</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription className="overflow-hidden p-5">{children}</AlertDialogDescription>
				<AlertDialogFooter className="gap-[10px]">
					<AlertDialogCancel asChild>
						<Button size="sm" intent="secondary">
							Cancel
						</Button>
					</AlertDialogCancel>
					<Button
						onClick={handleStop}
						className="flex items-center gap-1"
						disabled={isPending}
						intent="primary"
						type="submit"
					>
						{isPending && (
							<div
								role="alert"
								aria-busy="true"
								className="full h-[20px] w-[20px] animate-spin rounded-rounded border-2 border-theme-text-negative border-b-theme-text-brand"
							></div>
						)}
						Stop
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

type StopAlertProps = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	runId: string;
};
export function StopGracefullyAlert({ open, setOpen, runId }: StopAlertProps) {
	const {
		stopRunQuery: { mutate: stopPipelineRun, isPending }
	} = useStopRun(() => setOpen(false));

	function handleStop() {
		stopPipelineRun({
			runId,
			params: { graceful: true }
		});
	}

	return (
		<StopBaseAlert open={open} setOpen={setOpen} handleStop={handleStop} isPending={isPending}>
			<div className="space-y-1">
				<div>This will stop the run gracefully and allow the current step to finish.</div>
				<div>Are you sure you want to stop the run?</div>
			</div>
		</StopBaseAlert>
	);
}

export function StopImmediatelyAlert({ open, setOpen, runId }: StopAlertProps) {
	const {
		stopRunQuery: { mutate: stopPipelineRun, isPending }
	} = useStopRun(() => setOpen(false));

	function handleStop() {
		stopPipelineRun({
			runId,
			params: { graceful: false }
		});
	}

	return (
		<StopBaseAlert open={open} setOpen={setOpen} handleStop={handleStop} isPending={isPending}>
			<div className="space-y-1">
				<div>This will stop the run immediately and won't allow the current step to finish.</div>

				<div>Are you sure you want to stop the run right now?</div>
			</div>
		</StopBaseAlert>
	);
}
