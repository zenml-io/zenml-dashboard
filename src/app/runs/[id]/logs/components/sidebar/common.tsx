import { cn } from "@zenml-io/react-component-library/utilities";
import { ReactNode } from "react";

type Props = {
	isActive: boolean;
	icon: ReactNode;
	title: ReactNode;
	tooltip?: string;
	duration: string | null;
};

export function PipelineRunLogSidebarItem({
	duration,
	icon,
	title,
	tooltip = typeof title === "string" ? title : undefined,
	isActive
}: Props) {
	return (
		<div
			className={cn(
				"flex items-center gap-1 rounded-md border p-1 transition-colors duration-200 hover:bg-theme-surface-secondary",
				{
					"border-theme-border-moderate bg-theme-surface-secondary": isActive,
					"border-transparent": !isActive
				}
			)}
		>
			{icon}
			<span title={tooltip} className="truncate text-text-sm text-theme-text-primary">
				{title}
			</span>
			{duration !== null && (
				<span className="ml-auto whitespace-nowrap text-text-xs text-theme-text-secondary">
					{duration}
				</span>
			)}
		</div>
	);
}

type EmptyStateProps = {
	message: string;
};

export function PipelineRunLogSidebarEmptyState({ message }: EmptyStateProps) {
	return (
		<div className="flex flex-1 px-3 pb-5">
			<div className="flex w-full flex-1 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-theme-border-moderate text-center">
				<p className="text-text-sm text-theme-text-secondary">{message}</p>
			</div>
		</div>
	);
}
