import { LogSourceOption } from "@/components/logs/log-source-combobox";
import { LogEntry, LogEntryInternal, LoggingLevel, LogResponse, LogsResponse } from "@/types/logs";

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

/**
 * Maps a list of `LogsResponse` entries to `LogSourceOption[]` for the log source combobox.
 * The label is always the last segment of the `body.source` path (falling back to the full source).
 * The value is either the log's `id` (>= 0.95.0) or the raw `body.source` string (< 0.95.0).
 */
export function buildLogSourceOptions(logs: LogsResponse[] | null | undefined): LogSourceOption[] {
	const options =
		logs
			?.filter(
				(log): log is LogsResponse & { body: { source: string } } =>
					log.body?.source != null && log.body.source !== undefined
			)
			.map((log) => {
				const source = log.body.source;
				return {
					value: log.id,
					label: source.split("/").pop() ?? source
				};
			}) ?? [];

	const labelCounts = options.reduce<Record<string, number>>((acc, { label }) => {
		acc[label] = (acc[label] ?? 0) + 1;
		return acc;
	}, {});

	const seen: Record<string, number> = {};
	return options.map((option) => {
		if (labelCounts[option.label] <= 1) return option;
		seen[option.label] = (seen[option.label] ?? 0) + 1;
		return { ...option, label: `${option.label} #${seen[option.label]}` };
	});
}
