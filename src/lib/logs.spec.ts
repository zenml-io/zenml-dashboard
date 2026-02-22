import { LogEntry } from "@/types/logs";
import { describe, expect, it } from "vitest";
import {
	buildInternalLogEntries,
	buildMergedInternalLogEntries,
	LOG_LEVEL_NAMES,
	stripLegacySandboxPrefix,
	unchunkLogEntries
} from "./logs";

describe("unchunkLogEntries", () => {
	it("returns empty array for non-array or empty input", () => {
		expect(unchunkLogEntries([])).toEqual([]);
		expect((unchunkLogEntries as any)(null)).toEqual([]);
		expect((unchunkLogEntries as any)(undefined)).toEqual([]);
	});

	it("merges chunks by id, concatenates messages, removes chunk fields, preserves order", () => {
		const entries: LogEntry[] = [
			{
				id: "a",
				timestamp: 111,
				level: 20 as any,
				module: "m1",
				filename: "f1",
				lineno: 1,
				message: "Hel",
				chunk_index: 0,
				total_chunks: 2
			} as any,
			{
				id: "b-single",
				timestamp: 222,
				level: 40 as any,
				message: "single error"
			} as any,
			{
				id: "c",
				timestamp: 333,
				level: 10 as any,
				message: "two",
				chunk_index: 1,
				total_chunks: 2
			} as any,
			{
				id: "a",
				timestamp: 111,
				level: 20 as any,
				module: "m1",
				filename: "f1",
				lineno: 1,
				message: "lo",
				chunk_index: 1,
				total_chunks: 2
			} as any,
			{
				id: "c",
				timestamp: 333,
				level: 10 as any,
				message: "one",
				chunk_index: 0,
				total_chunks: 2
			} as any
		];

		const merged = unchunkLogEntries(entries);

		expect(merged).toHaveLength(3);
		// order preserved by first-seen group key: a, b-single, c
		expect(merged[0].id).toBe("a");
		expect(merged[1].id).toBe("b-single");
		expect(merged[2].id).toBe("c");

		// messages concatenated in chunk_index order
		expect(merged[0].message).toBe("Hello");
		expect(merged[2].message).toBe("onetwo");

		// chunk fields removed on merged items
		expect("chunk_index" in (merged[0] as any)).toBe(false);
		expect("total_chunks" in (merged[0] as any)).toBe(false);

		// non-chunked entry passes through unchanged
		expect(merged[1]).toMatchObject({ id: "b-single", message: "single error", level: 40 });
	});

	it("removes chunk fields for single chunk that is flagged as chunked", () => {
		const only = {
			id: "only",
			timestamp: 1,
			level: 20 as any,
			message: "hello",
			chunk_index: 0,
			total_chunks: 2
		} as any as LogEntry;

		const merged = unchunkLogEntries([only]);
		expect(merged).toHaveLength(1);
		expect(merged[0].message).toBe("hello");
		expect("chunk_index" in (merged[0] as any)).toBe(false);
		expect("total_chunks" in (merged[0] as any)).toBe(false);
	});

	it("does not merge non-chunked entries even if they share the same id", () => {
		const a = { id: "same", timestamp: 1, level: 20 as any, message: "a" } as any as LogEntry;
		const b = { id: "same", timestamp: 2, level: 20 as any, message: "b" } as any as LogEntry;
		const merged = unchunkLogEntries([a, b]);
		expect(merged).toHaveLength(2);
		expect(merged[0].message).toBe("a");
		expect(merged[1].message).toBe("b");
	});

	it("treats missing chunk messages as empty strings when joining", () => {
		const a = {
			id: "m",
			timestamp: 1,
			level: 20 as any,
			message: "A",
			chunk_index: 0,
			total_chunks: 2
		} as any as LogEntry;
		const b = {
			id: "m",
			timestamp: 1,
			level: 20 as any,
			message: undefined as any,
			chunk_index: 1,
			total_chunks: 2
		} as any as LogEntry;
		const merged = unchunkLogEntries([a, b]);
		expect(merged).toHaveLength(1);
		expect(merged[0].message).toBe("A");
	});

	it("merges chunked entries without id using composite key", () => {
		const e1 = {
			id: undefined,
			timestamp: 123456,
			level: 30 as any,
			module: "mod",
			filename: "file.py",
			lineno: 99,
			message: "part-1",
			chunk_index: 0,
			total_chunks: 2
		} as any as LogEntry;
		const e2 = {
			id: undefined,
			timestamp: 123456,
			level: 30 as any,
			module: "mod",
			filename: "file.py",
			lineno: 99,
			message: "part-2",
			chunk_index: 1,
			total_chunks: 2
		} as any as LogEntry;

		const merged = unchunkLogEntries([e1, e2]);
		expect(merged).toHaveLength(1);
		expect(merged[0].message).toBe("part-1part-2");
		expect("chunk_index" in (merged[0] as any)).toBe(false);
		expect("total_chunks" in (merged[0] as any)).toBe(false);
	});

	it("does not merge entries with different composite attributes", () => {
		const base = {
			id: undefined,
			timestamp: 1,
			level: 30 as any,
			module: "m",
			filename: "f",
			lineno: 1,
			chunk_index: 0,
			total_chunks: 2
		} as any;
		const a = { ...base, message: "A" } as LogEntry;
		const b = { ...base, module: "m2", message: "B", chunk_index: 1 } as any as LogEntry;

		const merged = unchunkLogEntries([a, b]);
		expect(merged).toHaveLength(2);
	});
});

describe("stripLegacySandboxPrefix", () => {
	it("strips [sandbox:stdout] prefix for sandbox source", () => {
		expect(stripLegacySandboxPrefix("[sandbox:stdout] hello world", "sandbox")).toBe("hello world");
	});

	it("strips [sandbox:stderr] prefix for sandbox source", () => {
		expect(stripLegacySandboxPrefix("[sandbox:stderr] error occurred", "sandbox")).toBe(
			"error occurred"
		);
	});

	it("strips prefix without trailing space", () => {
		expect(stripLegacySandboxPrefix("[sandbox:stdout]message", "sandbox")).toBe("message");
	});

	it("does not strip prefix for non-sandbox sources", () => {
		expect(stripLegacySandboxPrefix("[sandbox:stdout] hello", "step")).toBe(
			"[sandbox:stdout] hello"
		);
	});

	it("returns message unchanged when no prefix is present", () => {
		expect(stripLegacySandboxPrefix("plain message", "sandbox")).toBe("plain message");
	});
});

describe("buildInternalLogEntries", () => {
	it("builds originalEntry using level mapping and merged message", () => {
		const chunked: LogEntry[] = [
			{
				id: "x",
				timestamp: 999,
				level: 40 as any, // ERROR
				message: "err",
				chunk_index: 0,
				total_chunks: 2
			} as any,
			{
				id: "x",
				timestamp: 999,
				level: 40 as any,
				message: "or happened",
				chunk_index: 1,
				total_chunks: 2
			} as any
		];

		const internal = buildInternalLogEntries(chunked);
		expect(internal).toHaveLength(1);
		expect(internal[0].message).toBe("error happened");
		const levelName = LOG_LEVEL_NAMES[40];
		expect(internal[0].originalEntry).toBe(
			`[${levelName}] [${chunked[0].timestamp}] ${internal[0].message}`
		);
	});

	it("defaults to INFO when level is missing", () => {
		const logs: LogEntry[] = [
			{ id: "nolevel", timestamp: 1, level: undefined as any, message: "hi" } as any
		];
		const internal = buildInternalLogEntries(logs);
		expect(internal).toHaveLength(1);
		expect(internal[0].originalEntry.startsWith("[INFO] ")).toBe(true);
	});

	it("uses INFO when level is 0 due to fallback behavior", () => {
		const logs: LogEntry[] = [{ id: "lvl0", timestamp: 2, level: 0 as any, message: "msg" } as any];
		const internal = buildInternalLogEntries(logs);
		expect(internal).toHaveLength(1);
		expect(internal[0].originalEntry.startsWith("[INFO] ")).toBe(true);
	});

	it("defaults source to 'step' when no opts provided", () => {
		const logs: LogEntry[] = [{ id: "s", timestamp: 1, level: 20 as any, message: "hi" } as any];
		const internal = buildInternalLogEntries(logs);
		expect(internal[0].source).toBe("step");
		expect(internal[0].session_id).toBeNull();
	});

	it("sets source from opts and strips sandbox prefix", () => {
		const logs: LogEntry[] = [
			{ id: "s", timestamp: 1, level: 20 as any, message: "[sandbox:stdout] hello" } as any
		];
		const internal = buildInternalLogEntries(logs, { source: "sandbox" });
		expect(internal[0].source).toBe("sandbox");
		expect(internal[0].message).toBe("hello");
	});

	it("preserves session_id from backend LogEntry when present", () => {
		const logs: LogEntry[] = [
			{ id: "s", timestamp: 1, level: 20 as any, message: "hi", session_id: "sess-123" } as any
		];
		const internal = buildInternalLogEntries(logs, { source: "sandbox" });
		expect(internal[0].session_id).toBe("sess-123");
	});
});

describe("buildMergedInternalLogEntries", () => {
	it("merges entries from multiple sources sorted by timestamp", () => {
		const stepEntries: LogEntry[] = [
			{ id: "s1", timestamp: "2025-01-01T00:00:02", level: 20 as any, message: "step log" } as any
		];
		const sandboxEntries: LogEntry[] = [
			{
				id: "sb1",
				timestamp: "2025-01-01T00:00:01",
				level: 20 as any,
				message: "sandbox log"
			} as any,
			{
				id: "sb2",
				timestamp: "2025-01-01T00:00:03",
				level: 20 as any,
				message: "[sandbox:stdout] tagged log"
			} as any
		];

		const merged = buildMergedInternalLogEntries([
			{ source: "step", entries: stepEntries },
			{ source: "sandbox", entries: sandboxEntries }
		]);

		expect(merged).toHaveLength(3);
		// Sorted by timestamp: sandbox(01) -> step(02) -> sandbox(03)
		expect(merged[0].source).toBe("sandbox");
		expect(merged[0].message).toBe("sandbox log");
		expect(merged[1].source).toBe("step");
		expect(merged[1].message).toBe("step log");
		expect(merged[2].source).toBe("sandbox");
		// Legacy prefix stripped for sandbox source
		expect(merged[2].message).toBe("tagged log");
	});

	it("returns empty array when no sources provided", () => {
		expect(buildMergedInternalLogEntries([])).toEqual([]);
	});

	it("unchunks per-source independently before merging", () => {
		const stepChunks: LogEntry[] = [
			{
				id: "x",
				timestamp: "2025-01-01T00:00:01",
				level: 20 as any,
				message: "step-",
				chunk_index: 0,
				total_chunks: 2
			} as any,
			{
				id: "x",
				timestamp: "2025-01-01T00:00:01",
				level: 20 as any,
				message: "part2",
				chunk_index: 1,
				total_chunks: 2
			} as any
		];
		const sandboxEntries: LogEntry[] = [
			{
				id: "x",
				timestamp: "2025-01-01T00:00:02",
				level: 20 as any,
				message: "sandbox-only"
			} as any
		];

		const merged = buildMergedInternalLogEntries([
			{ source: "step", entries: stepChunks },
			{ source: "sandbox", entries: sandboxEntries }
		]);

		// Step chunks should be merged into one entry, sandbox entry passes through
		expect(merged).toHaveLength(2);
		expect(merged[0].message).toBe("step-part2");
		expect(merged[0].source).toBe("step");
		expect(merged[1].message).toBe("sandbox-only");
		expect(merged[1].source).toBe("sandbox");
	});
});
