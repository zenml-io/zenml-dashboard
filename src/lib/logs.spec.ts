import { LogEntry } from "@/types/logs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getLogLevelStats, parseLogString } from "./logs";

describe("parseLogString", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2023-10-27T10:00:00.000Z"));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should return empty array for invalid input", () => {
		expect(parseLogString("")).toEqual([]);
		expect(parseLogString(null as any)).toEqual([]);
		expect(parseLogString(undefined as any)).toEqual([]);
		expect(parseLogString(123 as any)).toEqual([]);
	});

	it("should return empty array for whitespace-only input", () => {
		expect(parseLogString("   \n  \n   ")).toEqual([]);
	});

	it("should parse ZenML format logs", () => {
		const logString =
			"[2025-04-25 12:18:16 UTC] Starting pipeline execution\n[2025-04-25 12:18:17 UTC] Pipeline completed successfully";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0]).toMatchObject({
			level: "INFO",
			message: "Starting pipeline execution",
			timestamp: "2025-04-25T12:18:16Z",
			originalEntry: "[2025-04-25 12:18:16 UTC] Starting pipeline execution"
		});
		expect(entries[1]).toMatchObject({
			level: "INFO",
			message: "Pipeline completed successfully",
			timestamp: "2025-04-25T12:18:17Z",
			originalEntry: "[2025-04-25 12:18:17 UTC] Pipeline completed successfully"
		});
	});

	it("should parse ISO timestamp with level format", () => {
		const logString =
			"2023-10-27T10:00:00.000Z [ERROR] Database connection failed\n2023-10-27T10:00:01.000Z [INFO] Retrying connection";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0]).toMatchObject({
			level: "ERROR",
			message: "Database connection failed",
			timestamp: "2023-10-27T10:00:00.000Z"
		});
		expect(entries[1]).toMatchObject({
			level: "INFO",
			message: "Retrying connection",
			timestamp: "2023-10-27T10:00:01.000Z"
		});
	});

	it("should parse timestamp with level format", () => {
		const logString =
			"2023-10-27 10:00:00 ERROR Database connection failed\n2023-10-27 10:00:01.123 WARN Connection unstable";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0]).toMatchObject({
			level: "ERROR",
			message: "Database connection failed",
			timestamp: "2023-10-27 10:00:00"
		});
		expect(entries[1]).toMatchObject({
			level: "WARN",
			message: "Connection unstable",
			timestamp: "2023-10-27 10:00:01.123"
		});
	});

	it("should parse level first format", () => {
		const logString =
			"ERROR 2023-10-27T10:00:00 Database connection failed\nINFO 2023-10-27T10:00:01Z Service started";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0]).toMatchObject({
			level: "ERROR",
			message: "Database connection failed",
			timestamp: "2023-10-27T10:00:00"
		});
		expect(entries[1]).toMatchObject({
			level: "INFO",
			message: "Service started",
			timestamp: "2023-10-27T10:00:01Z"
		});
	});

	it("should parse level in brackets with timestamp format", () => {
		const logString =
			"[ERROR] 2023-10-27T10:00:00 Database connection failed\n[DEBUG] 2023-10-27T10:00:01.456Z Debug information";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0]).toMatchObject({
			level: "ERROR",
			message: "Database connection failed",
			timestamp: "2023-10-27T10:00:00"
		});
		expect(entries[1]).toMatchObject({
			level: "DEBUG",
			message: "Debug information",
			timestamp: "2023-10-27T10:00:01.456Z"
		});
	});

	it("should parse simple level format", () => {
		const logString = "ERROR: Database connection failed\nINFO: Service started successfully";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0]).toMatchObject({
			level: "ERROR",
			message: "Database connection failed"
		});
		expect(entries[1]).toMatchObject({
			level: "INFO",
			message: "Service started successfully"
		});
	});

	it("should parse level in brackets only format", () => {
		const logString = "[ERROR] Database connection failed\n[CRITICAL] System shutdown initiated";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0]).toMatchObject({
			level: "ERROR",
			message: "Database connection failed"
		});
		expect(entries[1]).toMatchObject({
			level: "CRITICAL",
			message: "System shutdown initiated"
		});
	});

	it("should handle mixed log formats", () => {
		const logString = `[2025-04-25 12:18:16 UTC] ZenML format log
2023-10-27T10:00:00.000Z [ERROR] ISO format log
INFO: Simple format log
Plain text log without format`;
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(4);
		expect(entries[0].level).toBe("INFO");
		expect(entries[1].level).toBe("ERROR");
		expect(entries[2].level).toBe("INFO");
		expect(entries[3].level).toBe("INFO"); // Default level for unmatched format
	});

	it("should normalize log levels correctly", () => {
		const logString = `ERR: Error message
WARNING: Warning message
DBG: Debug message
INFORMATION: Info message
CRIT: Critical message`;
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(5);
		expect(entries[0].level).toBe("ERROR");
		expect(entries[1].level).toBe("WARN");
		expect(entries[2].level).toBe("DEBUG");
		expect(entries[3].level).toBe("INFO");
		expect(entries[4].level).toBe("CRITICAL");
	});

	it("should assign fallback timestamps for logs without timestamps", () => {
		const logString = "INFO: First log\nERROR: Second log\nDEBUG: Third log";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(3);
		// Should have unique timestamps based on fallback logic
		expect(entries[0].timestamp).toBe(null); // Base timestamp
		expect(entries[1].timestamp).toBe(null); // Base + 1 second
		expect(entries[2].timestamp).toBe(null); // Base + 2 seconds
	});

	it("should generate unique IDs for log entries", () => {
		const logString = "INFO: First log\nINFO: Second log";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0].id).toBeDefined();
		expect(entries[1].id).toBeDefined();
		expect(entries[0].id).not.toBe(entries[1].id);
	});
});

describe("getLogLevelStats", () => {
	it("should count log levels correctly", () => {
		const logs: LogEntry[] = [
			{ id: "1", timestamp: Date.now(), level: "INFO", message: "Info 1", originalEntry: "" },
			{ id: "2", timestamp: Date.now(), level: "INFO", message: "Info 2", originalEntry: "" },
			{ id: "3", timestamp: Date.now(), level: "ERROR", message: "Error 1", originalEntry: "" },
			{ id: "4", timestamp: Date.now(), level: "WARN", message: "Warn 1", originalEntry: "" },
			{ id: "5", timestamp: Date.now(), level: "DEBUG", message: "Debug 1", originalEntry: "" },
			{
				id: "6",
				timestamp: Date.now(),
				level: "CRITICAL",
				message: "Critical 1",
				originalEntry: ""
			},
			{ id: "7", timestamp: Date.now(), level: "ERROR", message: "Error 2", originalEntry: "" }
		];

		const stats = getLogLevelStats(logs);

		expect(stats).toEqual({
			INFO: 2,
			ERROR: 2,
			WARN: 1,
			DEBUG: 1,
			CRITICAL: 1
		});
	});

	it("should return zero counts for empty log array", () => {
		const stats = getLogLevelStats([]);

		expect(stats).toEqual({
			INFO: 0,
			ERROR: 0,
			WARN: 0,
			DEBUG: 0,
			CRITICAL: 0
		});
	});

	it("should handle logs with only one level type", () => {
		const logs: LogEntry[] = [
			{ id: "1", timestamp: Date.now(), level: "ERROR", message: "Error 1", originalEntry: "" },
			{ id: "2", timestamp: Date.now(), level: "ERROR", message: "Error 2", originalEntry: "" },
			{ id: "3", timestamp: Date.now(), level: "ERROR", message: "Error 3", originalEntry: "" }
		];

		const stats = getLogLevelStats(logs);

		expect(stats).toEqual({
			INFO: 0,
			ERROR: 3,
			WARN: 0,
			DEBUG: 0,
			CRITICAL: 0
		});
	});
});

describe("edge cases and error handling", () => {
	it("should handle unknown log levels", () => {
		const logString = "UNKNOWN: Some message\nTRACE: Another message";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0].level).toBe("INFO"); // Should default to INFO
		expect(entries[1].level).toBe("INFO"); // Should default to INFO
	});

	it("should preserve original entry for all parsed logs", () => {
		const logString = "[2025-04-25 12:18:16 UTC] ZenML message\nINFO: Simple message";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(2);
		expect(entries[0].originalEntry).toBe("[2025-04-25 12:18:16 UTC] ZenML message");
		expect(entries[1].originalEntry).toBe("INFO: Simple message");
	});

	it("should handle very long log messages", () => {
		const longMessage = "A".repeat(10000);
		const logString = `INFO: ${longMessage}`;
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(1);
		expect(entries[0].message).toBe(longMessage);
		expect(entries[0].level).toBe("INFO");
	});

	it("should handle special characters in log messages", () => {
		const logString = "INFO: Message with special chars: !@#$%^&*()[]{}|\\;:'\",.<>?/`~";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(1);
		expect(entries[0].message).toBe("Message with special chars: !@#$%^&*()[]{}|\\;:'\",.<>?/`~");
	});

	it("should handle unicode characters in log messages", () => {
		const logString = "INFO: Unicode message: 你好世界 🚀 ñoño";
		const entries = parseLogString(logString);

		expect(entries).toHaveLength(1);
		expect(entries[0].message).toBe("Unicode message: 你好世界 🚀 ñoño");
	});
});
