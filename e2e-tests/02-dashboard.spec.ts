import { test, expect } from "@playwright/test";
import { login } from "./utils";

test.describe("Dashboard", () => {
	test("Check dashboard and Navbar", async ({ page }) => {
		await login(page);

		const overviewLink = await page.locator('a:has-text("Overview")').isVisible();

		if (!overviewLink) {
			return;
		}
		//Visible the navbar
		await expect(page.locator('a:has-text("Pipelines")')).toBeVisible();
		await expect(page.locator('a:has-text("Models")')).toBeVisible();
		await expect(page.locator('a:has-text("Artifacts")')).toBeVisible();
		await expect(page.locator('a:has-text("Stacks")')).toBeVisible();

		//Change the URL by clicking each nav item
		await page.click('a:has-text("Pipelines")');
		await expect(page).toHaveURL(/\/pipelines\?tab=pipelines/);

		await page.click('a:has-text("Models")');
		await expect(page).toHaveURL(/\/models/);

		await page.click('a:has-text("Artifacts")');
		await expect(page).toHaveURL(/\/artifacts/);

		await page.click('a:has-text("Stacks")');
		await expect(page).toHaveURL(/\/stacks/);
	});
});
