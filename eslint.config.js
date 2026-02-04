import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores([
		"dist",
		"dist-ssr",
		"node_modules",
		"*.log",
		"*.local",
		".vscode",
		".idea",
		".DS_Store",
		".env*",
		"!.env.example",
		"pnpm-lock.yaml",
		"yarn.lock",
		"scripts/types.js",
		"src/types/core.ts" // Auto-generated from OpenAPI
	]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		rules: {
			"no-mixed-spaces-and-tabs": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_"
				}
			]
		}
	},
	// Override for files that export constants only (not React components)
	{
		files: ["src/router/routes.tsx"],
		rules: {
			"react-refresh/only-export-components": "off"
		}
	}
]);
