import { LogEntry, LogEntryInternal, LoggingLevel, LogResponse } from "@/types/logs";

export function unchunkLogEntries(entries: LogEntry[]): LogEntry[] {
	if (!Array.isArray(entries) || entries.length === 0) return [];

	// Map preserves insertion order, so we keep first-seen group order naturally
	const groups = new Map<string, LogEntry[]>();

	for (let i = 0; i < entries.length; i++) {
		const entry = entries[i];
		const isChunked = (entry.total_chunks ?? 1) > 1 || entry.chunk_index != null;

		const key = isChunked
			? entry.id
				? `id:${entry.id}`
				: `k:${entry.timestamp ?? ""}|${entry.level ?? ""}|${entry.module ?? ""}|${
						entry.filename ?? ""
					}|${entry.lineno ?? ""}`
			: `single:${i}`;

		const arr = groups.get(key);
		if (arr) arr.push(entry);
		else groups.set(key, [entry]);
	}

	const merged: LogEntry[] = [];
	groups.forEach((chunks) => {
		if (
			chunks.length === 1 &&
			(chunks[0].total_chunks ?? 1) <= 1 &&
			chunks[0].chunk_index == null
		) {
			merged.push(chunks[0]);
			return;
		}

		const sorted = chunks
			.slice()
			.sort((a: LogEntry, b: LogEntry) => (a.chunk_index ?? 0) - (b.chunk_index ?? 0));
		const base: LogEntry = { ...sorted[0] };
		(base as any).message = sorted.map((c: LogEntry) => c.message ?? "").join("");
		delete (base as any).chunk_index;
		delete (base as any).total_chunks;
		merged.push(base);
	});

	return merged;
}

export function buildInternalLogEntries(logEntry: LogResponse): LogEntryInternal[] {
	const merged = unchunkLogEntries(logEntry);
	return merged.map((log) => {
		const originalMessage = `[${LOG_LEVEL_NAMES[log.level || 20]}] [${log.timestamp}] ${
			log.message
		}`;
		return { ...log, originalEntry: originalMessage };
	});
}

export const LOG_LEVEL_NAMES: Record<LoggingLevel, string> = {
	0: "",
	10: "DEBUG",
	20: "INFO",
	30: "WARNING",
	40: "ERROR",
	50: "CRITICAL"
} as const;
