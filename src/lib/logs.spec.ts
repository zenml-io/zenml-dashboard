import { LogEntry } from "@/types/logs";
import { describe, expect, it } from "vitest";
import { buildInternalLogEntries, LOG_LEVEL_NAMES, unchunkLogEntries } from "./logs";

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
});
