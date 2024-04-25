import { describe, expect, test } from "vitest";
import { checkUserOnboarding, getUsername } from "./user";
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
			metadata: {},
			...overrides.metadata
		},
		id: "7310dfc0-0c6d-4d63-affb-863901893892",
		name: "default",
		...overrides
	};
}

describe("check user onboarding", () => {
	test("should return true if email is null", () => {
		//@ts-expect-error its a tenary, where the default value is null in case it was never changed
		const user: User = createUser({ body: { email_opted_in: null } });
		expect(checkUserOnboarding(user)).toBeTruthy();
	});

	test("should return true if awareness_channels isn't defined in metadata", () => {
		const user: User = createUser();
		expect(checkUserOnboarding(user)).toBeTruthy();
	});

	test("should return true if awareness_channels is empty", () => {
		const user: User = createUser({ metadata: { metadata: { awareness_channels: [] } } });
		expect(checkUserOnboarding(user)).toBeTruthy();
	});

	test("should return true if awareness_channels is empty and email_opted_in is true", () => {
		const user: User = createUser({
			//@ts-expect-error its a tenary, where the default value is null in case it was never changed
			body: { email_opted_in: true },
			metadata: { metadata: { awareness_channels: [] } }
		});
		expect(checkUserOnboarding(user)).toBeTruthy();
	});
});

describe("returns correct username", () => {
	test("returns name if full_name is not present", () => {
		// @ts-expect-error only a partial of the UserBody
		const user: User = createUser({ body: { full_name: "" } });
		expect(getUsername(user)).toBe(user.name);
	});
	test("returns name if full_name is not present", () => {
		// @ts-expect-error only a partial of the UserBody
		const user: User = createUser({ body: { full_name: "John Doe" } });
		expect(getUsername(user)).toBe(user.body?.full_name);
	});
});
