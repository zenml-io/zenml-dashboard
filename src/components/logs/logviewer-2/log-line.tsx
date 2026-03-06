import { LOG_LEVEL_NAMES } from "@/lib/logs";
import { LogEntryInternal, LoggingLevel } from "@/types/logs";
import { cn } from "@zenml-io/react-component-library/utilities";
import { memo } from "react";
import { LOG_VIEWER_2_GRID_COLUMNS_CLASS } from "./layout";

type LogLineProps = {
	entry: LogEntryInternal;
	className?: string;
};

function getLogLevelColor(level: LoggingLevel | undefined): string {
	switch (level) {
		case 10:
			return "bg-neutral-400";
		case 20:
			return "bg-blue-500";
		case 30:
			return "bg-warning-500";
		case 40:
			return "bg-error-500";
		case 50:
			return "bg-error-700";
		default:
			return "bg-neutral-400";
	}
}

function _LogLine({ entry, className }: LogLineProps) {
	const { formattedTimestamp, message, level } = entry;
	const levelColorClass = getLogLevelColor(level ?? undefined);

	return (
		<div
			className={cn(
				"grid w-full items-start gap-x-3 border-b border-theme-border-minimal bg-theme-surface-primary px-4 py-1 font-mono text-text-sm font-normal hover:bg-theme-surface-tertiary",
				LOG_VIEWER_2_GRID_COLUMNS_CLASS,
				className
			)}
		>
			<div className="flex items-center gap-2 whitespace-nowrap text-theme-text-tertiary">
				<div className={cn("h-4 w-[2px] rounded-sm", levelColorClass)} />
				<span className="text-xs">{LOG_LEVEL_NAMES[level ?? 20]}</span>
			</div>
			<div className="text-theme-text-secondary">{formattedTimestamp}</div>
			<div className="min-w-0 whitespace-pre-wrap text-theme-text-primary">{message}</div>
		</div>
	);
}

export const LogLine = memo(_LogLine);
