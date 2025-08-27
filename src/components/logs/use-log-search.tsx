import { useState, useMemo, useCallback } from "react";
import { LogEntry } from "@/types/logs";
import React from "react";

export interface SearchMatch {
	logIndex: number;
	matchIndex: number;
	startIndex: number;
	endIndex: number;
}

export interface UseLogSearchReturn {
	matches: SearchMatch[];
	currentMatchIndex: number;
	totalMatches: number;
	goToNextMatch: () => void;
	goToPreviousMatch: () => void;
	highlightText: (text: string, logIndex: number) => React.ReactNode;
}

export function useLogSearch(
	logs: LogEntry[],
	searchQuery: string,
	caseSensitive: boolean
): UseLogSearchReturn {
	const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

	// Find matches in logs (logs are already filtered by backend)
	const matches = useMemo(() => {
		if (!searchQuery.trim()) {
			return [];
		}

		const query = caseSensitive ? searchQuery : searchQuery.toLowerCase();
		const allMatches: SearchMatch[] = [];

		logs.forEach((log, logIndex) => {
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

			// Record matches with original log index
			matchIndices.forEach((matchStart, matchIndex) => {
				allMatches.push({
					logIndex, // Index in original logs array
					matchIndex,
					startIndex: matchStart,
					endIndex: matchStart + query.length
				});
			});
		});

		return allMatches;
	}, [logs, searchQuery, caseSensitive]);

	// Reset current match index when search changes
	useMemo(() => {
		setCurrentMatchIndex(0);
	}, [searchQuery, caseSensitive]);

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
		matches,
		currentMatchIndex,
		totalMatches,
		goToNextMatch,
		goToPreviousMatch,
		highlightText
	};
}
