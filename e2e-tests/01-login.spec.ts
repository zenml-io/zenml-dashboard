import { test } from "@playwright/test";
import { login } from "./utils";

test.describe("Login", () => {
	test("Login with default username", async ({ page }) => {
		await login(page);
	});
});
