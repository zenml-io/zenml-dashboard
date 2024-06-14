import { ExecutionStatus } from "@/types/pipeline-runs";
import { TagProps, cn } from "@zenml-io/react-component-library";
import { Icon } from "./Icon";

export function getExecutionStatusColor(status?: ExecutionStatus) {
	if (!status) return null;
	switch (status) {
		case "completed":
			return "fill-success-500";
		case "failed":
			return "fill-error-500";
		case "initializing":
			return "fill-primary-400";
		case "cached":
			return "fill-neutral-400";
		case "running":
			return "fill-warning-500";
	}
}

export function getExecutionStatusBackgroundColor(status?: ExecutionStatus) {
	if (!status) return null;
	switch (status) {
		case "completed":
			return "bg-success-50";
		case "failed":
			return "bg-error-50";
		case "initializing":
			return "bg-primary-50";
		case "cached":
			return "bg-theme-surface-tertiary";
		case "running":
			return "bg-warning-50";
	}
}

export function getExecutionStatusTagColor(status?: ExecutionStatus): TagProps["color"] {
	if (!status) return "grey";
	switch (status) {
		case "completed":
			return "green";
		case "failed":
			return "red";
		case "initializing":
			return "purple";
		case "cached":
			return "grey";
		case "running":
			return "yellow";
	}
}

export function ExecutionStatusIcon({
	status,
	className
}: {
	status?: ExecutionStatus;
	className?: string;
}) {
	if (!status) return null;
	const classNames = cn(`h-4 shrink-0 w-4`, getExecutionStatusColor(status), className);
	switch (status) {
		case "completed":
			return <Icon name="check-circle" className={classNames} />;
		case "failed":
			return <Icon name="alert-circle" className={classNames} />;
		case "initializing":
			return <Icon name="initializing" className={classNames} />;
		case "cached":
			return <Icon name="cached" className={classNames} />;
		case "running":
			return <Icon name="dots-circle" className={classNames} />;
	}
}

export const getTagColor = (status: string) => {
	switch (status) {
		case "completed":
			return "green";
		case "cached":
			return "grey";
		default:
			return "grey";
	}
};

export const getIconFill = (value: string) => {
	switch (value) {
		case "completed":
			return "fill-success-500";
		case "cached":
			return "fill-neutral-400";
		default:
			return "fill-neutral-400";
	}
};
