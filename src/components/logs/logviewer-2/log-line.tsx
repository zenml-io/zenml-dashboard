import type { MatchRange } from "@/components/logs/use-log-search";
import { LOG_LEVEL_NAMES } from "@/lib/logs";
import { LogEntryInternal, LoggingLevel } from "@/types/logs";
import { cn } from "@zenml-io/react-component-library/utilities";
import { memo, ReactNode, useMemo } from "react";
import { LOG_VIEWER_2_GRID_COLUMNS_CLASS } from "./layout";

type LogLineProps = {
	entry: LogEntryInternal;
	matchRanges?: MatchRange[];
	activeMatchIndex?: number;
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

function _LogLine({ entry, matchRanges, activeMatchIndex = -1, className }: LogLineProps) {
	const { formattedTimestamp, message, level } = entry;
	const levelColorClass = getLogLevelColor(level ?? undefined);
	const hasActiveMatch = activeMatchIndex > -1;

	const renderedMessage = useMemo(() => {
		return (): string | ReactNode[] => {
			if (!matchRanges || matchRanges.length === 0) return message;

			const parts: ReactNode[] = [];
			let lastEnd = 0;

			matchRanges.forEach((range, index) => {
				if (range.start > lastEnd) {
					parts.push(message.slice(lastEnd, range.start));
				}

				const isActive = index === activeMatchIndex;
				parts.push(
					<span
						key={`${range.start}-${range.end}-${index}`}
						className={cn(
							"inline-block rounded-sm px-0.5",
							isActive
								? "bg-warning-200 text-warning-900 ring-1 ring-warning-400"
								: "bg-warning-100 text-warning-800"
						)}
					>
						{message.slice(range.start, range.end)}
					</span>
				);

				lastEnd = range.end;
			});

			if (lastEnd < message.length) {
				parts.push(message.slice(lastEnd));
			}

			return parts;
		};
	}, [message, matchRanges, activeMatchIndex]);

	return (
		<div
			className={cn(
				"grid w-full items-start gap-x-3 border-b border-theme-border-minimal bg-theme-surface-primary px-4 py-1 font-mono text-text-sm font-normal hover:bg-theme-surface-tertiary",
				hasActiveMatch && "bg-warning-50 hover:bg-warning-100/60",
				LOG_VIEWER_2_GRID_COLUMNS_CLASS,
				className
			)}
		>
			<div className="flex items-center gap-2 whitespace-nowrap text-theme-text-tertiary">
				<div className={cn("h-4 w-[2px] rounded-sm", levelColorClass)} />
				<span className="text-xs">{LOG_LEVEL_NAMES[level ?? 20]}</span>
			</div>
			<div className="text-theme-text-secondary">{formattedTimestamp}</div>
			<div className="min-w-0 whitespace-pre-wrap break-words text-theme-text-primary">
				{renderedMessage()}
			</div>
		</div>
	);
}

export const LogLine = memo(_LogLine);
