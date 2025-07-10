import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import Cached from "@/assets/icons/cached.svg?react";
import CheckCircle from "@/assets/icons/check-circle.svg?react";
import Initializing from "@/assets/icons/dots-circle.svg?react";
import QuestionMark from "@/assets/icons/help.svg?react";
import Retried from "@/assets/icons/retried.svg?react";
import Running from "@/assets/icons/running.svg?react";
import Stopped from "@/assets/icons/stopped.svg?react";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { BadgeProps, TagProps, cn } from "@zenml-io/react-component-library";
import { RerunningWrapper } from "./icons/rerunning-wrapper";

export function getExecutionStatusColor(status?: ExecutionStatus | "unknown" | null) {
	if (!status) return null;
	switch (status) {
		case "completed":
			return "fill-success-500";
		case "failed":
			return "fill-error-500";
		case "initializing":
			return "fill-primary-400";
		case "cached":
		case "stopped":
		case "stopping":
		case "retried":
			return "fill-neutral-400";
		case "running":
		case "retrying":
			return "fill-warning-500";
		case "unknown":
			return "fill-blue-500";
	}
}

export function getExecutionStatusBackgroundColor(status?: ExecutionStatus | "unknown") {
	if (!status) return null;
	switch (status) {
		case "completed":
			return "bg-success-50";
		case "failed":
			return "bg-error-50";
		case "initializing":
			return "bg-primary-50";
		case "cached":
		case "stopped":
		case "stopping":
		case "retried":
			return "bg-theme-surface-tertiary";
		case "running":
		case "retrying":
			return "bg-warning-50";
		case "unknown":
			return "bg-blue-50";
	}
}

export function getExecutionStatusTagColor(
	status?: ExecutionStatus | "unknown"
): TagProps["color"] {
	if (!status) return "grey";
	switch (status) {
		case "completed":
			return "green";
		case "failed":
			return "red";
		case "initializing":
			return "purple";
		case "cached":
		case "stopped":
		case "stopping":
		case "retried":
			return "grey";
		case "unknown":
			return "blue";
		case "running":
		case "retrying":
			return "yellow";
	}
}

export function ExecutionStatusIcon({
	status,
	className
}: {
	status?: ExecutionStatus | "unknown" | null;
	className?: string;
}) {
	if (!status) return null;
	const classNames = cn(`h-4 shrink-0 w-4`, getExecutionStatusColor(status), className);
	switch (status) {
		case "completed":
			return <CheckCircle className={classNames} />;
		case "failed":
			return <AlertCircle className={classNames} />;
		case "initializing":
		case "stopping":
			return <Initializing className={classNames} />;
		case "cached":
			return <Cached className={classNames} />;
		case "unknown":
			return <QuestionMark className={classNames} />;
		case "stopped":
			return <Stopped className={classNames} />;
		case "retried":
			return <Retried className={classNames} />;
		case "retrying":
			return <RerunningWrapper className={`${classNames} overflow-visible`} isSpinning />;
		case "running":
			return (
				<Running
					className={cn(
						"animate-spin [animation-duration:_5s] motion-reduce:animate-none",
						classNames
					)}
				/>
			);
	}
}

export function getBadgeColor(status?: ExecutionStatus | "unknown"): BadgeProps["color"] {
	if (!status) return "grey";
	switch (status) {
		case "failed":
			return "red";
		case "retrying":
		case "running":
			return "yellow";
		case "completed":
			return "green";
		case "cached":
			return "grey";
		case "unknown":
			return "blue";
		default:
			return "grey";
	}
}
