import { LogEntry, LogLevel } from "@/types/logs";

/**
 * Parses a log string into an array of LogEntry objects
 * Handles various log formats and attempts to extract timestamp, level, and message
 */
export function parseLogString(logString: string): LogEntry[] {
	if (!logString || typeof logString !== "string") {
		return [];
	}

	const lines = logString.split("\n").filter((line) => line.trim() !== "");
	const logEntries: LogEntry[] = [];

	lines.forEach((line, index) => {
		const entry = parseLogLine(line, index);
		if (entry && entry.message.trim() !== "") {
			logEntries.push(entry);
		}
	});

	return logEntries;
}

/**
 * Parses a single log line into a LogEntry object
 * Attempts to extract timestamp, log level, and message from various formats
 */
function parseLogLine(line: string, fallbackIndex: number): LogEntry | null {
	if (!line.trim()) {
		return null;
	}

	// Common log patterns to match
	const patterns = [
		// ZenML format: "[2025-04-25 12:18:16 UTC] Message"
		/^\[(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\s+UTC\]\s*(.*)$/,
		// ISO timestamp with level: "2023-10-27T10:00:00.000Z [INFO] Message"
		/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z?)\s*\[(\w+)\]\s*(.*)$/,
		// Timestamp with level: "2023-10-27 10:00:00 INFO Message"
		/^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}(?:\.\d{3})?)\s+(\w+)\s+(.*)$/,
		// Level first: "INFO 2023-10-27T10:00:00 Message"
		/^(\w+)\s+(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z?)\s+(.*)$/,
		// Level in brackets: "[INFO] 2023-10-27T10:00:00 Message"
		/^\[(\w+)\]\s+(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z?)\s+(.*)$/,
		// Simple level: "INFO: Message"
		/^(\w+):\s*(.*)$/,
		// Level in brackets only: "[INFO] Message"
		/^\[(\w+)\]\s*(.*)$/
	];

	let timestamp: string | number = Date.now();
	let level: LogLevel = "INFO";
	let message = line;

	// Try to match against known patterns
	for (const pattern of patterns) {
		const match = line.match(pattern);
		if (match) {
			// Special handling for ZenML format: [timestamp UTC] message
			if (pattern.source.includes("UTC")) {
				timestamp = match[1].replace(" ", "T") + "Z";
				level = "INFO"; // Default level for ZenML logs
				message = match[2] || "";
				break;
			} else if (pattern.source.includes("\\d{4}-\\d{2}-\\d{2}")) {
				// Pattern includes timestamp
				if (match[1] && isValidTimestamp(match[1])) {
					timestamp = match[1];
					level = normalizeLogLevel(match[2]);
					message = match[3] || "";
				} else if (match[2] && isValidTimestamp(match[2])) {
					level = normalizeLogLevel(match[1]);
					timestamp = match[2];
					message = match[3] || "";
				}
			} else {
				// Pattern is level only
				level = normalizeLogLevel(match[1]);
				message = match[2] || match[1] || "";
			}
			break;
		}
	}

	// If no timestamp was extracted, use current time with offset
	if (timestamp === Date.now()) {
		timestamp = Date.now() + fallbackIndex * 1000; // Add seconds to make unique
	}

	// Don't create entries for empty messages
	const trimmedMessage = message.trim();
	if (!trimmedMessage) {
		return null;
	}

	return {
		originalEntry: line,
		id: `log-${fallbackIndex}-${Date.now()}`,
		timestamp,
		level,
		message: trimmedMessage
	};
}

/**
 * Validates if a string is a valid timestamp
 */
function isValidTimestamp(str: string): boolean {
	// Check for UTC format: "2025-04-25 12:18:16 UTC"
	if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s+UTC$/.test(str)) {
		return !isNaN(Date.parse(str));
	}
	// Check for ISO format
	if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) {
		return !isNaN(Date.parse(str));
	}
	// Check for simple date format
	if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}/.test(str)) {
		return !isNaN(Date.parse(str));
	}
	return false;
}

/**
 * Normalizes log level strings to our LogLevel type
 */
function normalizeLogLevel(levelStr: string): LogLevel {
	if (!levelStr) return "INFO";

	const normalized = levelStr.toUpperCase().trim();

	switch (normalized) {
		case "ERROR":
		case "ERR":
			return "ERROR";
		case "WARN":
		case "WARNING":
			return "WARN";
		case "INFO":
		case "INFORMATION":
			return "INFO";
		case "DEBUG":
		case "DBG":
			return "DEBUG";
		case "CRITICAL":
		case "CRIT":
			return "CRITICAL";
		default:
			// If it looks like a log level but doesn't match, default to INFO
			if (/^[A-Z]{3,8}$/.test(normalized)) {
				return "INFO";
			}
			return "INFO";
	}
}

/**
 * Formats log entries back to a string format
 * Useful for copy/download functionality
 */
export function formatLogsAsString(logs: LogEntry[]): string {
	return logs
		.map((log) => {
			const timestamp = new Date(log.timestamp).toISOString();
			return `[${timestamp}] ${log.level}: ${log.message}`;
		})
		.join("\n");
}

/**
 * Estimates the log level distribution for analytics
 */
export function getLogLevelStats(logs: LogEntry[]): Record<LogLevel, number> {
	const stats: Record<LogLevel, number> = {
		INFO: 0,
		ERROR: 0,
		WARN: 0,
		DEBUG: 0,
		CRITICAL: 0
	};

	logs.forEach((log) => {
		stats[log.level]++;
	});

	return stats;
}
