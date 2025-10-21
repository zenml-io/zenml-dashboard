import { useState, useMemo, useCallback } from "react";
import { LogEntryInternal } from "@/types/logs";
import React from "react";

export interface SearchMatch {
	logIndex: number;
	matchIndex: number;
	startIndex: number;
	endIndex: number;
}

export interface UseLogSearchReturn {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	caseSensitive: boolean;
	setCaseSensitive: (caseSensitive: boolean) => void;
	filteredLogs: LogEntryInternal[];
	matches: SearchMatch[];
	currentMatchIndex: number;
	totalMatches: number;
	goToNextMatch: () => void;
	goToPreviousMatch: () => void;
	clearSearch: () => void;
	highlightText: (text: string, logIndex: number) => React.ReactNode;
}

export function useLogSearch(logs: LogEntryInternal[]): UseLogSearchReturn {
	const [searchQuery, setSearchQuery] = useState("");
	const [caseSensitive, setCaseSensitive] = useState(false);
	const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

	// Filter logs and find matches
	const { filteredLogs, matches } = useMemo(() => {
		if (!searchQuery.trim()) {
			return { filteredLogs: logs, matches: [] };
		}

		const query = caseSensitive ? searchQuery : searchQuery.toLowerCase();
		const filtered: LogEntryInternal[] = [];
		const allMatches: SearchMatch[] = [];

		logs.forEach((log) => {
			const searchText = caseSensitive ? log.message : log.message.toLowerCase();
			const matchIndices: number[] = [];

			// Find all occurrences of the search query in the log message
			let startIndex = 0;
			while (startIndex < searchText.length) {
				const foundIndex = searchText.indexOf(query, startIndex);
				if (foundIndex === -1) break;

				matchIndices.push(foundIndex);
				startIndex = foundIndex + 1;
			}

			// If matches found, add log to filtered results and record matches
			if (matchIndices.length > 0) {
				filtered.push(log);

				matchIndices.forEach((matchStart, matchIndex) => {
					allMatches.push({
						logIndex: filtered.length - 1, // Index in filtered array
						matchIndex,
						startIndex: matchStart,
						endIndex: matchStart + query.length
					});
				});
			}
		});

		return { filteredLogs: filtered, matches: allMatches };
	}, [logs, searchQuery, caseSensitive]);

	// Reset current match index when search changes
	useMemo(() => {
		setCurrentMatchIndex(0);
	}, []);

	const totalMatches = matches.length;

	const goToNextMatch = useCallback(() => {
		if (totalMatches > 0) {
			setCurrentMatchIndex((prev) => (prev + 1) % totalMatches);
		}
	}, [totalMatches]);

	const goToPreviousMatch = useCallback(() => {
		if (totalMatches > 0) {
			setCurrentMatchIndex((prev) => (prev - 1 + totalMatches) % totalMatches);
		}
	}, [totalMatches]);

	const clearSearch = useCallback(() => {
		setSearchQuery("");
		setCurrentMatchIndex(0);
	}, []);

	// Function to highlight search terms in text
	const highlightText = useCallback(
		(text: string, logIndex: number): React.ReactNode => {
			if (!searchQuery.trim()) {
				return text;
			}

			const parts: React.ReactNode[] = [];
			let lastIndex = 0;

			// Find all matches in this specific log
			const logMatches = matches.filter((match) => match.logIndex === logIndex);

			logMatches.forEach((match, index) => {
				// Add text before the match
				if (match.startIndex > lastIndex) {
					parts.push(text.slice(lastIndex, match.startIndex));
				}

				// Add highlighted match
				const isCurrentMatch =
					matches.findIndex(
						(m) => m.logIndex === match.logIndex && m.matchIndex === match.matchIndex
					) === currentMatchIndex;

				const highlightClass = isCurrentMatch
					? "bg-warning-200 text-warning-900"
					: "bg-warning-100 text-warning-800";

				parts.push(
					React.createElement(
						"span",
						{
							key: `match-${logIndex}-${index}`,
							className: `${highlightClass} inline-block rounded-sm px-1`
						},
						text.slice(match.startIndex, match.endIndex)
					)
				);

				lastIndex = match.endIndex;
			});

			// Add remaining text after last match
			if (lastIndex < text.length) {
				parts.push(text.slice(lastIndex));
			}

			return parts.length > 0 ? parts : text;
		},
		[searchQuery, matches, currentMatchIndex]
	);

	return {
		searchQuery,
		setSearchQuery,
		caseSensitive,
		setCaseSensitive,
		filteredLogs,
		matches,
		currentMatchIndex,
		totalMatches,
		goToNextMatch,
		goToPreviousMatch,
		clearSearch,
		highlightText
	};
}
