import { describe, expect, test } from "vitest";
import { getUserMetadata, parseUserMetadata } from "./user-metadata";
import { User } from "@/types/user";

function createUser(overrides: Partial<User> = {}): User {
	return {
		body: {
			created: "2024-04-23T14:09:46.715695",
			updated: "2024-04-23T14:34:04.268455",
			active: true,
			full_name: "John Doe",
			email_opted_in: true,
			is_service_account: false,
			is_admin: true,
			...overrides.body
		},
		metadata: {
			email: "",
			user_metadata: {},
			...overrides.metadata
		},
		id: "7310dfc0-0c6d-4d63-affb-863901893892",
		name: "default",
		...overrides
	};
}

describe("parseUserMetadata", () => {
	test("returns parsed known fields", () => {
		expect(
			parseUserMetadata({
				primary_role: "ml_engineer",
				infra_type: "local",
				finished_onboarding_survey: true
			})
		).toEqual({
			primary_role: "ml_engineer",
			infra_type: "local",
			finished_onboarding_survey: true
		});
	});

	test("preserves unknown legacy fields via passthrough", () => {
		expect(parseUserMetadata({ awareness_channels: ["twitter"], custom_field: "value" })).toEqual({
			awareness_channels: ["twitter"],
			custom_field: "value"
		});
	});

	test("returns empty object for non-object input", () => {
		expect(parseUserMetadata(null)).toEqual({});
		expect(parseUserMetadata("invalid")).toEqual({});
	});

	test("coerces invalid field types to empty defaults", () => {
		expect(parseUserMetadata({ primary_role: 123 })).toEqual({ primary_role: "" });
		expect(parseUserMetadata({ infra_type: true })).toEqual({ infra_type: "" });
		expect(parseUserMetadata({ awareness_channels: "not-an-array" })).toEqual({
			awareness_channels: []
		});
		expect(parseUserMetadata({ ai_types_working_with: [1, 2, 3] })).toEqual({
			ai_types_working_with: []
		});
		expect(parseUserMetadata({ overview_tour_done: "true" })).toEqual({});
	});

	test("keeps valid fields when other fields have invalid types", () => {
		expect(
			parseUserMetadata({
				primary_role: "ml_engineer",
				infra_type: 42,
				finished_onboarding_survey: true
			})
		).toEqual({
			primary_role: "ml_engineer",
			infra_type: "",
			finished_onboarding_survey: true
		});
	});
});

describe("getUserMetadata", () => {
	test("reads metadata from user response", () => {
		const user = createUser({
			metadata: {
				user_metadata: {
					primary_role: "platform_engineer",
					overview_tour_done: false
				}
			}
		});

		expect(getUserMetadata(user)).toEqual({
			primary_role: "platform_engineer",
			overview_tour_done: false
		});
	});

	test("returns empty object when metadata is missing", () => {
		const user = createUser({ metadata: undefined });
		expect(getUserMetadata(user)).toEqual({});
	});
});
