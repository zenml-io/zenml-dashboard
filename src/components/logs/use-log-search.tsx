"use client";

import { LogEntryInternal } from "@/types/logs";
import { useCallback, useMemo, useState } from "react";

/** Match range within a single log line (stable data for memoization) */
export interface MatchRange {
	start: number;
	end: number;
}

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
	/** Map of log index -> array of match ranges (stable reference when query unchanged) */
	matchesByLogIndex: Map<number, MatchRange[]>;
	/** Log index that contains the currently active match, or -1 if none */
	activeMatchLogIndex: number;
	/** Index within the log's matches that is active (0-based), or -1 */
	activeMatchWithinLog: number;
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
				start = found + query.length;
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

	// Group matches by log index for efficient lookup
	// This map is stable when searchQuery is unchanged (only depends on matches)
	const matchesByLogIndex = useMemo(() => {
		const byLog = new Map<number, MatchRange[]>();
		matches.forEach((match) => {
			const existing = byLog.get(match.logIndex) || [];
			existing.push({ start: match.startIndex, end: match.endIndex });
			byLog.set(match.logIndex, existing);
		});
		return byLog;
	}, [matches]);

	// Compute which log contains the active match and which match within that log
	const activeMatch = matches[safeIndex];
	const activeMatchLogIndex = activeMatch?.logIndex ?? -1;
	const activeMatchWithinLog = activeMatch?.matchIndex ?? -1;

	return {
		searchQuery,
		setSearchQuery,
		matches,
		currentMatchIndex: safeIndex,
		totalMatches,
		goToNextMatch,
		goToPreviousMatch,
		matchesByLogIndex,
		activeMatchLogIndex,
		activeMatchWithinLog
	};
}
