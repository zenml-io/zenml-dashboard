import { prepareBackendTimestamp } from "@/lib/dates";
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

/**
 * Regex that matches the legacy `[sandbox:stdout] ` / `[sandbox:stderr] `
 * prefix that older backends prepend to sandbox log messages.
 */
const LEGACY_SANDBOX_PREFIX_RE = /^\[sandbox:(?:stdout|stderr)\]\s?/;

/**
 * Strips the legacy `[sandbox:stdout]` / `[sandbox:stderr]` prefix from a
 * message when the log already belongs to a structurally identified sandbox
 * source. For non-sandbox sources the message is returned unchanged.
 */
export function stripLegacySandboxPrefix(message: string, source: string): string {
	if (source !== "sandbox") return message;
	return message.replace(LEGACY_SANDBOX_PREFIX_RE, "");
}

type BuildOpts = {
	/** The log stream source label (e.g. "step", "sandbox"). Defaults to "step". */
	source?: string;
};

export function buildInternalLogEntries(
	logEntry: LogResponse,
	opts?: BuildOpts
): LogEntryInternal[] {
	const source = opts?.source ?? "step";
	const merged = unchunkLogEntries(logEntry);
	return merged.map((log) => {
		const cleanMessage = stripLegacySandboxPrefix(log.message ?? "", source);
		const originalMessage = `[${LOG_LEVEL_NAMES[log.level || 20]}] [${log.timestamp}] ${cleanMessage}`;
		// Pull session_id from the log entry if the backend provides it
		const sessionId = (log as Record<string, unknown>).session_id as string | null | undefined;
		return {
			...log,
			message: cleanMessage,
			originalEntry: originalMessage,
			source,
			session_id: sessionId ?? null
		};
	});
}

/**
 * Builds a merged, time-sorted array of internal log entries from multiple
 * sources. Each source's raw entries are unchunked independently (to prevent
 * cross-source chunk corruption) before being merged and sorted by timestamp.
 */
export function buildMergedInternalLogEntries(
	sourceEntries: Array<{ source: string; entries: LogResponse }>
): LogEntryInternal[] {
	const allInternal: LogEntryInternal[] = [];
	for (const { source, entries } of sourceEntries) {
		allInternal.push(...buildInternalLogEntries(entries, { source }));
	}

	// Stable sort by timestamp — entries without timestamps sort to the end
	allInternal.sort((a, b) => {
		if (!a.timestamp && !b.timestamp) return 0;
		if (!a.timestamp) return 1;
		if (!b.timestamp) return -1;
		return (
			prepareBackendTimestamp(a.timestamp).getTime() -
			prepareBackendTimestamp(b.timestamp).getTime()
		);
	});

	return allInternal;
}

export const LOG_LEVEL_NAMES: Record<LoggingLevel, string> = {
	0: "",
	10: "DEBUG",
	20: "INFO",
	30: "WARNING",
	40: "ERROR",
	50: "CRITICAL"
} as const;
