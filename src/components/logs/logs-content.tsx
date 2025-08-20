"use client";

import Collapse from "@/assets/icons/collapse-text.svg?react";
import Expand from "@/assets/icons/expand-full.svg?react";
import { LogPage } from "@/types/logs";
import { Button } from "@zenml-io/react-component-library/components/server";
import React from "react";
import LogLine from "./log-line";
import { LogviewerPagination } from "./pagination";

type Props = {
	logPage: LogPage;
	searchQuery: string;
	textWrapEnabled: boolean;
	highlightText: (text: string, logIndex: number) => React.ReactNode;
	handleToggleTextWrap: () => void;
	startIndex: number;
};

export function LogsContent({
	logPage,
	searchQuery,
	textWrapEnabled,
	highlightText,
	handleToggleTextWrap,
	startIndex
}: Props) {
	const totalPages = logPage.total_pages;
	const logs = logPage.items;

	return (
		<div className="flex-1 overflow-hidden rounded-md border border-theme-border-moderate">
			{/* Fixed header - always same width */}
			<div className="sticky top-0 z-10 bg-theme-surface-tertiary">
				{/* Table-style header with fixed structure */}
				<div className="flex w-full min-w-[600px] space-x-3 bg-theme-surface-tertiary px-4 py-1 font-medium text-theme-text-secondary">
					{/* Type column header - match LogLine badge area */}
					<div className="flex w-12 flex-shrink-0 items-center">
						<span className="text-text-sm font-semibold">Type</span>
					</div>

					{/* Time column header - match LogLine timestamp width */}
					<div className="w-[178px] flex-shrink-0">
						<span className="text-text-sm font-semibold">Time</span>
					</div>

					{/* Event column header - flexible but consistent */}
					<div className="flex min-w-0 flex-1 items-center justify-between">
						<span className="text-text-sm font-semibold">Event</span>
					</div>
					<div className="flex flex-shrink-0 items-center">
						{/* Text wrap toggle button */}
						<Button
							onClick={handleToggleTextWrap}
							size="sm"
							emphasis="subtle"
							intent="secondary"
							className="ml-2 h-5 w-5 rounded-sm bg-theme-surface-primary p-0.25"
							title={textWrapEnabled ? "Collapse text" : "Expand text"}
						>
							{textWrapEnabled ? (
								<Collapse className="h-4 w-4 shrink-0 text-theme-text-tertiary hover:text-theme-text-secondary" />
							) : (
								<Expand className="h-4 w-4 shrink-0 fill-theme-text-tertiary hover:fill-theme-text-secondary" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Scrollable content - behavior changes based on text wrap */}
			<div className="flex-1 overflow-x-auto overflow-y-auto">
				<div className={textWrapEnabled ? "min-w-full" : "flex w-full min-w-full"}>
					{/* Logs content */}
					<div className="flex-1 bg-theme-surface-primary">
						{logs.map((entry, index) => {
							// Calculate the actual log index in the filtered logs array
							const actualLogIndex = startIndex + index;

							return (
								<LogLine
									key={entry.id}
									entry={entry}
									searchTerm={searchQuery}
									textWrapEnabled={textWrapEnabled}
									highlightedMessage={highlightText(entry.message, actualLogIndex)}
								/>
							);
						})}
					</div>
				</div>
			</div>

			{/* Pagination - only show when there are multiple pages */}
			{totalPages > 1 && <LogviewerPagination logPage={logPage} />}
		</div>
	);
}
