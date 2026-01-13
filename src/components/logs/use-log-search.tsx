"use client";

import { LogEntryInternal } from "@/types/logs";
import React, { useCallback, useMemo, useState } from "react";

export interface SearchMatch {
	logIndex: number;
	matchIndex: number;
	startIndex: number;
	endIndex: number;
}

export interface UseLogSearchReturn {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	matches: SearchMatch[];
	currentMatchIndex: number;
	totalMatches: number;
	goToNextMatch: () => number;
	goToPreviousMatch: () => number;
	highlightText: (text: string, logIndex: number) => React.ReactNode;
}

export function useLogSearch(logs: LogEntryInternal[]): UseLogSearchReturn {
	const [searchQuery, setSearchQueryState] = useState("");
	const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

	// Find all matches across logs (case-insensitive)
	const matches = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return [];

		const allMatches: SearchMatch[] = [];

		logs.forEach((log, logIndex) => {
			const text = log.message.toLowerCase();
			let start = 0;
			let matchIndex = 0;

			while (start < text.length) {
				const found = text.indexOf(query, start);
				if (found === -1) break;

				allMatches.push({
					logIndex,
					matchIndex: matchIndex++,
					startIndex: found,
					endIndex: found + query.length
				});
				start = found + 1;
			}
		});

		return allMatches;
	}, [logs, searchQuery]);

	const totalMatches = matches.length;

	// Clamp index to valid range
	const safeIndex = totalMatches === 0 ? 0 : Math.min(currentMatchIndex, totalMatches - 1);

	const setSearchQuery = useCallback((q: string) => {
		setSearchQueryState(q);
		setCurrentMatchIndex(0);
	}, []);

	const goToNextMatch = useCallback(() => {
		if (totalMatches === 0) return -1;
		const next = (safeIndex + 1) % totalMatches;
		setCurrentMatchIndex(next);
		return next;
	}, [totalMatches, safeIndex]);

	const goToPreviousMatch = useCallback(() => {
		if (totalMatches === 0) return -1;
		const prev = (safeIndex - 1 + totalMatches) % totalMatches;
		setCurrentMatchIndex(prev);
		return prev;
	}, [totalMatches, safeIndex]);

	// Highlight search terms in text
	const highlightText = useCallback(
		(text: string, logIndex: number): React.ReactNode => {
			if (!searchQuery.trim()) return text;

			const logMatches = matches.filter((m) => m.logIndex === logIndex);
			if (logMatches.length === 0) return text;

			const parts: React.ReactNode[] = [];
			let lastEnd = 0;

			logMatches.forEach((match, i) => {
				if (match.startIndex > lastEnd) {
					parts.push(text.slice(lastEnd, match.startIndex));
				}

				const isActive =
					matches.findIndex(
						(m) => m.logIndex === match.logIndex && m.matchIndex === match.matchIndex
					) === safeIndex;

				const className = isActive
					? "bg-warning-200 text-warning-900 inline-block rounded-sm px-1"
					: "bg-warning-100 text-warning-800 inline-block rounded-sm px-1";

				parts.push(
					React.createElement(
						"span",
						{ key: `${logIndex}-${i}`, className },
						text.slice(match.startIndex, match.endIndex)
					)
				);

				lastEnd = match.endIndex;
			});

			if (lastEnd < text.length) {
				parts.push(text.slice(lastEnd));
			}

			return parts;
		},
		[searchQuery, matches, safeIndex]
	);

	return {
		searchQuery,
		setSearchQuery,
		matches,
		currentMatchIndex: safeIndex,
		totalMatches,
		goToNextMatch,
		goToPreviousMatch,
		highlightText
	};
}
