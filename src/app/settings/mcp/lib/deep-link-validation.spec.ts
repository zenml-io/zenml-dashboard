import { describe, it, expect } from "vitest";
import { isSafeDeepLinkUrl } from "./deep-link-validation";

describe("isSafeDeepLinkUrl", () => {
	describe("allowed protocols", () => {
		it("allows https URLs", () => {
			expect(isSafeDeepLinkUrl("https://example.com")).toBe(true);
			expect(isSafeDeepLinkUrl("https://github.com/zenml-io/mcp-zenml/releases")).toBe(true);
		});

		it("allows http URLs", () => {
			expect(isSafeDeepLinkUrl("http://localhost:8080")).toBe(true);
		});

		it("allows vscode deep links", () => {
			expect(isSafeDeepLinkUrl("vscode:mcp/install?config=test")).toBe(true);
			expect(isSafeDeepLinkUrl("vscode:mcp/install?%7B%22name%22%3A%22zenml%22%7D")).toBe(true);
		});

		it("allows valid cursor deep links", () => {
			expect(isSafeDeepLinkUrl("cursor://anysphere.cursor-deeplink/mcp/install")).toBe(true);
			expect(
				isSafeDeepLinkUrl("cursor://anysphere.cursor-deeplink/mcp/install?name=zenml&config=abc")
			).toBe(true);
		});
	});

	describe("blocked protocols", () => {
		it("rejects javascript protocol", () => {
			expect(isSafeDeepLinkUrl("javascript:alert(1)")).toBe(false);
		});

		it("rejects data protocol", () => {
			expect(isSafeDeepLinkUrl("data:text/html,<script>alert(1)</script>")).toBe(false);
		});

		it("rejects file protocol", () => {
			expect(isSafeDeepLinkUrl("file:///etc/passwd")).toBe(false);
		});

		it("rejects ftp protocol", () => {
			expect(isSafeDeepLinkUrl("ftp://example.com/file")).toBe(false);
		});
	});

	describe("cursor hostname validation", () => {
		it("rejects cursor deep links with wrong hostname", () => {
			expect(isSafeDeepLinkUrl("cursor://malicious.com/something")).toBe(false);
			expect(isSafeDeepLinkUrl("cursor://evil.cursor-deeplink/mcp/install")).toBe(false);
		});

		it("rejects cursor deep links with no hostname", () => {
			expect(isSafeDeepLinkUrl("cursor:///mcp/install")).toBe(false);
		});
	});

	describe("invalid inputs", () => {
		it("rejects empty strings", () => {
			expect(isSafeDeepLinkUrl("")).toBe(false);
		});

		it("rejects invalid URLs", () => {
			expect(isSafeDeepLinkUrl("not-a-url")).toBe(false);
			expect(isSafeDeepLinkUrl("://missing-protocol")).toBe(false);
		});

		it("rejects whitespace-only strings", () => {
			expect(isSafeDeepLinkUrl("   ")).toBe(false);
		});
	});
});
