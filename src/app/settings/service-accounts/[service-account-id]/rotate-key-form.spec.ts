import { describe, expect, it } from "vitest";

import { buildRotateApiKeyRequest, rotateFormSchema } from "./rotate-key-form";

describe("rotateFormSchema", () => {
	it("allows rotation without retention when minutes are empty", () => {
		const result = rotateFormSchema.safeParse({
			enableRetention: false,
			rotateMinutes: ""
		});

		expect(result.success).toBe(true);
	});

	it("requires positive minutes when retention is enabled", () => {
		const result = rotateFormSchema.safeParse({
			enableRetention: true,
			rotateMinutes: ""
		});

		expect(result.success).toBe(false);
	});
});

describe("buildRotateApiKeyRequest", () => {
	it("uses zero retention minutes when retention is disabled", () => {
		expect(
			buildRotateApiKeyRequest({
				enableRetention: false,
				rotateMinutes: undefined
			})
		).toEqual({ retain_period_minutes: 0 });
	});

	it("uses submitted minutes when retention is enabled", () => {
		expect(
			buildRotateApiKeyRequest({
				enableRetention: true,
				rotateMinutes: 15
			})
		).toEqual({ retain_period_minutes: 15 });
	});
});
