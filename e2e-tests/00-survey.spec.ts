import { test } from "@playwright/test";
import { login } from "./utils";

test.describe("Survey", () => {
	test("Fill survey for first time", async ({ page }) => {
		await login(page);

		const isVisible = await page.locator("text=Add your account details").isVisible();

		if (!isVisible) {
			return;
		}

		//survey form - Step 1
		await page.fill('input[name="fullName"]', "test");
		await page.fill('input[name="email"]', "test@test.com");
		await page
			.getByLabel("I want to receive news and recommendations about how to use ZenML")
			.check();
		await page.click('button span:has-text("Continue")');
		await page.waitForSelector("text=What will be your primary use for ZenML?");

		//survey form - Step 2
		await page.click('div label:has-text("Personal")');
		await page.click('button span:has-text("Continue")');
		await page.waitForSelector("text=What best describes your current situation with ZenML?");

		//survey form - Step 3
		await page.check('label:has-text("I\'m new to MLOps and exploring")');
		await page.click('button span:has-text("Continue")');
		await page.waitForSelector("text=What is your current infrastructure?");

		//survey form - Step 4
		await page.check('label:has-text("GCP") button');
		await page.check('label:has-text("Azure")');
		await page.check('label:has-text("Openshift")');
		await page.check('label:has-text("AWS")');
		await page.check('label:has-text("Native Kubernetes")');
		await page.click('button span:has-text("Continue")');
		await page.waitForSelector("text=Join The ZenML Slack Community");

		//survey form - Step 5
		await page.click('button span:has-text("Skip")');
	});
});
