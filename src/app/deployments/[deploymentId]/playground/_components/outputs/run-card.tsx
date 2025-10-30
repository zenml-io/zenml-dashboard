import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { secondsToTimeString } from "@/lib/dates";
import { routes } from "@/router/routes";
import { Box, Button } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { PlaygroundRunCardAvatar } from "./run-card-avatar";

type Props = {
	runId?: string;
	runName?: string;
	duration: number;
	success: boolean;
};

export function PlaygroundRunCard({ runId, runName, duration, success }: Props) {
	const statusName = success ? "completed" : "failed";

	return (
		<Box className="space-y-3 p-3">
			<div className="flex flex-wrap items-start justify-between gap-1">
				<div className="max-w-full">
					<p className="text-text-xs text-theme-text-tertiary">Run</p>
					<div className="flex items-center gap-1">
						<p className="truncate font-semibold">{runName}</p>
						<ExecutionStatusIcon
							className="size-3 shrink-0"
							status={success ? "completed" : "failed"}
						/>
					</div>
				</div>

				{runId && (
					<Button
						intent="secondary"
						size="sm"
						emphasis="subtle"
						className="w-fit whitespace-nowrap"
						asChild
					>
						<Link to={routes.projects.runs.detail(runId)}>Run Details</Link>
					</Button>
				)}
			</div>
			<div className="flex w-full flex-wrap items-center justify-between gap-1">
				{runId ? <PlaygroundRunCardAvatar runId={runId} /> : <div></div>}
				<p className="text-text-sm text-theme-text-secondary">
					<span
						className="capitalize data-[status=completed]:text-theme-text-success data-[status=failed]:text-theme-text-error"
						data-status={statusName}
					>
						{statusName}
					</span>
					·<span>{secondsToTimeString(duration)}</span>
				</p>
			</div>
		</Box>
	);
}
