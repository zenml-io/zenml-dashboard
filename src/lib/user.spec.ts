import { describe, expect, test } from "vitest";
import { checkUserOnboarding } from "./user";
import { User } from "@/types/user";

describe("check user onboarding", () => {
	test("should return true if email is null", () => {
		const user: User = {
			body: {
				created: "2024-04-23T14:09:46.715695",
				updated: "2024-04-23T14:34:04.268455",
				active: true,
				full_name: "John Doe",
				// @ts-expect-error // if its the initial value, email_opted_in is null
				email_opted_in: null,
				is_service_account: false,
				is_admin: true
			},
			id: "7310dfc0-0c6d-4d63-affb-863901893892",
			name: "default"
		};
		expect(checkUserOnboarding(user)).toBeTruthy();
	});

	test("should return true if awareness_channels isn't defined in metadata"),
		() => {
			const user: User = {
				body: {
					created: "2024-04-23T14:09:46.715695",
					updated: "2024-04-23T14:34:04.268455",
					active: true,
					full_name: "John Doe",
					email_opted_in: true,
					is_service_account: false,
					is_admin: true
				},
				metadata: {
					email: "julian@twitch.com",

					metadata: {}
				},
				id: "7310dfc0-0c6d-4d63-affb-863901893892",
				name: "default"
			};
			expect(checkUserOnboarding(user)).toBeTruthy();
		};
	test("should return true if awareness_channels is having no entry"),
		() => {
			const user: User = {
				body: {
					created: "2024-04-23T14:09:46.715695",
					updated: "2024-04-23T14:34:04.268455",
					active: true,
					full_name: "John Doe",
					email_opted_in: true,
					is_service_account: false,
					is_admin: true
				},
				metadata: {
					email: "julian@twitch.com",

					metadata: {
						awareness_channels: []
					}
				},
				id: "7310dfc0-0c6d-4d63-affb-863901893892",
				name: "default"
			};
			expect(checkUserOnboarding(user)).toBeTruthy();
		};
	test(
		"should return false if awareness_channels is having no entry and email_opted_in is not null"
	),
		() => {
			const user: User = {
				body: {
					created: "2024-04-23T14:09:46.715695",
					updated: "2024-04-23T14:34:04.268455",
					active: true,
					full_name: "John Doe",
					email_opted_in: true,
					is_service_account: false,
					is_admin: true
				},
				metadata: {
					email: "julian@twitch.com",

					metadata: {
						awareness_channels: ["Conference", "Newsletter", "Blog"]
					}
				},
				id: "7310dfc0-0c6d-4d63-affb-863901893892",
				name: "default"
			};
			expect(checkUserOnboarding(user)).toBeTruthy();
		};
});
