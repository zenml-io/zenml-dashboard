import { cn } from "@zenml-io/react-component-library/utilities";
import { HTMLAttributes } from "react";

export function PipelineRunLogsViewerHeader({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<section
			className={cn(
				"flex items-center gap-1 border-b border-theme-border-moderate bg-theme-surface-primary p-5",
				className
			)}
			{...props}
		>
			{children}
		</section>
	);
}
