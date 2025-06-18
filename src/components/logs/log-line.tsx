import React from "react";
import { LogEntry, LogLevel } from "@/types/logs";
import { CopyButton } from "../CopyButton";

interface LogLineProps {
	entry: LogEntry;
	searchTerm?: string;
	isCurrentMatch?: boolean;
	textWrapEnabled?: boolean;
	highlightedMessage?: React.ReactNode;
}

const getLogLevelColor = (level: LogLevel): string => {
	switch (level) {
		case "INFO":
			return "bg-blue-500";
		case "ERROR":
			return "bg-error-500";
		case "WARN":
			return "bg-warning-500";
		case "DEBUG":
			return "bg-neutral-400";
		case "CRITICAL":
			return "bg-error-700";
		default:
			return "bg-neutral-400";
	}
};

const formatTimestamp = (timestamp: string | number): string => {
	const date = new Date(timestamp);
	return date.toISOString().replace("T", " ").slice(0, 19);
};

export function LogLine({
	entry,
	searchTerm,
	isCurrentMatch,
	textWrapEnabled,
	highlightedMessage
}: LogLineProps) {
	const { timestamp, level, message, originalEntry } = entry;
	const formattedTimestamp = formatTimestamp(timestamp);
	const levelColorClass = getLogLevelColor(level);

	const highlightSearchTerm = (text: string) => {
		if (!searchTerm) return text;

		const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
		const parts = text.split(regex);

		return parts.map((part, index) => {
			// Check if this part matches the search term (case-insensitive)
			if (part.toLowerCase() === searchTerm.toLowerCase()) {
				return (
					<span
						key={index}
						className={`${
							isCurrentMatch ? "bg-warning-200 text-warning-900" : "bg-warning-100 text-warning-800"
						} inline-block rounded-sm px-1`}
					>
						{part}
					</span>
				);
			}
			return part;
		});
	};

	return (
		<div className="group/copybutton flex w-full items-start space-x-3 border-b border-theme-border-minimal px-4 py-1 font-mono text-text-sm transition-colors hover:bg-theme-surface-secondary">
			{/* Compact log level badge */}
			<div className="flex max-h-6 w-8 flex-shrink-0 items-center">
				<div className={`h-4 w-[2px] rounded-sm ${levelColorClass} mr-2`}></div>
				<span className="text-xs font-medium text-theme-text-tertiary">{level}</span>
			</div>

			{/* Timestamp */}
			<div className="w-[178px] flex-shrink-0 text-theme-text-secondary">{formattedTimestamp}</div>

			{/* Message */}
			<div
				className={`flex-1 text-theme-text-primary ${
					textWrapEnabled ? "min-w-0 whitespace-pre-wrap break-words" : "whitespace-nowrap"
				}`}
			>
				{highlightedMessage || highlightSearchTerm(message)}
			</div>

			{/* Compact copy button - appears on hover, doesn't change height */}
			<div className="flex flex-shrink-0 items-center">
				<CopyButton copyText={originalEntry} copyTitle="Copy log line" />
			</div>
		</div>
	);
}

export default LogLine;
