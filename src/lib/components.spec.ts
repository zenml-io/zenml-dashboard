import { describe, expect, test } from "vitest";
import { stackComponentTypes } from "@/lib/constants";
import { StackComponent, StackComponentType } from "@/types/components";
import {
	getSortedComponentTypeEntries,
	getStackComponentTypeOrder,
	isStackComponentActiveInStep,
	type StepComponentConfig
} from "./components";

function sc(
	partial: Pick<StackComponent, "id" | "name"> & { type: StackComponentType }
): StackComponent {
	return {
		id: partial.id,
		name: partial.name,
		body: { type: partial.type }
	} as StackComponent;
}

describe("getStackComponentTypeOrder", () => {
	test("known types use stackComponentTypes index", () => {
		expect(getStackComponentTypeOrder("orchestrator")).toBe(0);
		expect(getStackComponentTypeOrder("artifact_store")).toBe(1);
	});

	test("unknown types sort after all known types", () => {
		expect(getStackComponentTypeOrder("not_a_real_type")).toBe(stackComponentTypes.length);
	});
});

describe("getSortedComponentTypeEntries", () => {
	test("returns empty array for undefined", () => {
		expect(getSortedComponentTypeEntries(undefined)).toEqual([]);
	});

	test("returns empty array for empty object", () => {
		expect(getSortedComponentTypeEntries({})).toEqual([]);
	});

	test("sorts entries by stack component type order", () => {
		const a: StackComponent[] = [];
		const b: StackComponent[] = [];
		const c: StackComponent[] = [];
		const input = {
			step_operator: a,
			orchestrator: b,
			artifact_store: c
		};

		const result = getSortedComponentTypeEntries(input);
		expect(result.map(([type]) => type)).toEqual([
			"orchestrator",
			"artifact_store",
			"step_operator"
		]);
		expect(result.map(([, arr]) => arr)).toEqual([b, c, a]);
	});

	test("places unknown types after known types", () => {
		const known: StackComponent[] = [];
		const unknown: StackComponent[] = [];
		const input = {
			totally_unknown: unknown,
			orchestrator: known
		};

		const result = getSortedComponentTypeEntries(input);
		expect(result.map(([type]) => type)).toEqual(["orchestrator", "totally_unknown"]);
	});
});

describe("isStackComponentActiveInStep", () => {
	const stepConfig: StepComponentConfig = {
		step_operator: "my-op",
		experiment_tracker: "my-tracker"
	};

	test("without stepConfig, always active", () => {
		const c = sc({ id: "1", name: "x", type: "step_operator" });
		expect(isStackComponentActiveInStep(c, [c], undefined)).toBe(true);
	});

	test("alerter and orchestrator stay active when stepConfig is set", () => {
		const alerter = sc({ id: "a", name: "al", type: "alerter" });
		const orch = sc({ id: "o", name: "or", type: "orchestrator" });
		expect(isStackComponentActiveInStep(alerter, [alerter], stepConfig)).toBe(true);
		expect(isStackComponentActiveInStep(orch, [orch], stepConfig)).toBe(true);
	});

	describe("step_operator", () => {
		const first = sc({ id: "so-1", name: "default-op", type: "step_operator" });
		const second = sc({ id: "so-2", name: "other-op", type: "step_operator" });
		const list = [first, second];

		test("string: only matching name is active", () => {
			expect(isStackComponentActiveInStep(first, list, { step_operator: "default-op" })).toBe(true);
			expect(isStackComponentActiveInStep(second, list, { step_operator: "default-op" })).toBe(
				false
			);
		});

		test("true: only first in list is active", () => {
			expect(isStackComponentActiveInStep(first, list, { step_operator: true })).toBe(true);
			expect(isStackComponentActiveInStep(second, list, { step_operator: true })).toBe(false);
		});

		test("false, null, or missing step_operator: all inactive", () => {
			for (const step_operator of [false, null, undefined] as const) {
				expect(isStackComponentActiveInStep(first, list, { step_operator })).toBe(false);
				expect(isStackComponentActiveInStep(second, list, { step_operator })).toBe(false);
			}
		});
	});

	describe("experiment_tracker", () => {
		const first = sc({ id: "et-1", name: "t1", type: "experiment_tracker" });
		const second = sc({ id: "et-2", name: "t2", type: "experiment_tracker" });
		const list = [first, second];

		test("string: only matching name is active", () => {
			expect(isStackComponentActiveInStep(first, list, { experiment_tracker: "t1" })).toBe(true);
			expect(isStackComponentActiveInStep(second, list, { experiment_tracker: "t1" })).toBe(false);
		});

		test("true: all active", () => {
			expect(isStackComponentActiveInStep(first, list, { experiment_tracker: true })).toBe(true);
			expect(isStackComponentActiveInStep(second, list, { experiment_tracker: true })).toBe(true);
		});

		test("false, null, or missing experiment_tracker: all inactive", () => {
			for (const experiment_tracker of [false, null, undefined] as const) {
				expect(isStackComponentActiveInStep(first, list, { experiment_tracker })).toBe(false);
				expect(isStackComponentActiveInStep(second, list, { experiment_tracker })).toBe(false);
			}
		});
	});
});
