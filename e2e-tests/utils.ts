import { Page, expect } from "@playwright/test";

// reusable login function
export async function login(page: Page) {
	await page.goto("http://127.0.0.1:8237/");
	await expect(page.locator('h1:has-text("Log in to your account")')).toBeVisible();
	await page.fill('input[name="username"]', "default");
	await page.fill('input[name="password"]', "");
	await page.click('button span:has-text("Login")');
}
