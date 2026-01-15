import { prepareBackendTimestamp } from "@/lib/dates";
import { LOG_LEVEL_NAMES } from "@/lib/logs";
import { LogEntryInternal, LoggingLevel } from "@/types/logs";
import { cn } from "@zenml-io/react-component-library/utilities";
import React from "react";
import { CopyButton } from "../CopyButton";
import { MatchRange } from "./use-log-search";

interface LogLineProps {
	entry: LogEntryInternal;
	textWrapEnabled?: boolean;
	/** Match ranges for this log line (stable when search query unchanged) */
	matchRanges?: MatchRange[];
	/** Index of the active match within this log (-1 if no active match here) */
	activeMatchIndex?: number;
	className?: string;
}

const getLogLevelColor = (level: LoggingLevel | undefined): string => {
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
};

const formatTimestamp = (timestamp: string | number): string => {
	const date = prepareBackendTimestamp(timestamp);
	return date.toLocaleString("sv-SE", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	});
};

export const LogLine = React.memo(function Logline({
	entry,
	textWrapEnabled,
	matchRanges,
	activeMatchIndex = -1,
	className
}: LogLineProps) {
	const { timestamp, level, message, originalEntry } = entry;
	const formattedTimestamp = timestamp ? formatTimestamp(timestamp) : "";
	const levelColorClass = getLogLevelColor(level ?? undefined);

	// Render message with highlighted matches
	const renderMessage = () => {
		if (!matchRanges || matchRanges.length === 0) {
			return message;
		}

		const parts: React.ReactNode[] = [];
		let lastEnd = 0;

		matchRanges.forEach((range, i) => {
			// Add text before this match
			if (range.start > lastEnd) {
				parts.push(message.slice(lastEnd, range.start));
			}

			// Determine if this match is the active one
			const isActive = i === activeMatchIndex;
			const highlightClass = isActive
				? "bg-warning-200 text-warning-900 inline-block rounded-sm px-1"
				: "bg-warning-100 text-warning-800 inline-block rounded-sm px-1";

			parts.push(
				<span key={i} className={highlightClass}>
					{message.slice(range.start, range.end)}
				</span>
			);

			lastEnd = range.end;
		});

		// Add remaining text after last match
		if (lastEnd < message.length) {
			parts.push(message.slice(lastEnd));
		}

		return parts;
	};

	return (
		<div
			className={cn(
				"group/copybutton flex w-full items-start space-x-3 border-b border-theme-border-minimal bg-theme-surface-primary px-4 py-1 font-mono text-text-sm font-normal transition-colors hover:bg-theme-surface-tertiary",
				className
			)}
		>
			{" "}
			{/* Compact log level badge */}
			<div className="flex max-h-6 w-12 flex-shrink-0 items-center">
				<div className={`h-4 w-[2px] rounded-sm ${levelColorClass} mr-2`}></div>
				<span className="text-xs text-theme-text-tertiary">{LOG_LEVEL_NAMES[level ?? 20]}</span>
			</div>
			{/* Timestamp */}
			<div className="w-[178px] flex-shrink-0 text-theme-text-secondary">{formattedTimestamp}</div>
			{/* Message */}
			<div
				className={`flex-1 text-theme-text-primary ${
					textWrapEnabled ? "min-w-0 whitespace-pre-wrap break-words" : "whitespace-nowrap"
				}`}
			>
				{renderMessage()}
			</div>
			{/* Compact copy button - appears on hover, doesn't change height */}
			<div className="flex flex-shrink-0 items-center">
				<CopyButton copyText={originalEntry} copyTitle="Copy log line" />
			</div>
		</div>
	);
});

export default LogLine;
