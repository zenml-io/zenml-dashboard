/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		exclude: ["node_modules/**/*", "build/**/*", "dist/**/*", "e2e-tests/**/*"]
	},
	plugins: [svgr(), react()],
	resolve: {
		alias: {
			"@": "/src"
		}
	}
});
