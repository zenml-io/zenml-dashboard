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
		"**/*.spec.ts",
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
			// React Compiler rules (not used in this project) — see https://github.com/oxc-project/oxc/issues/1022
			"react-hooks/component-hook-factories": "off",
			"react-hooks/config": "off",
			"react-hooks/error-boundaries": "off",
			"react-hooks/gating": "off",
			"react-hooks/globals": "off",
			"react-hooks/immutability": "off",
			"react-hooks/incompatible-library": "off",
			"react-hooks/preserve-manual-memoization": "off",
			"react-hooks/purity": "off",
			"react-hooks/refs": "off",
			"react-hooks/set-state-in-effect": "off",
			"react-hooks/set-state-in-render": "off",
			"react-hooks/static-components": "off",
			"react-hooks/unsupported-syntax": "off",
			"react-hooks/use-memo": "off",
			// Other rules
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
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
	{
		files: ["src/router/**/*.{ts,tsx}"],
		rules: {
			"react-refresh/only-export-components": "off"
		}
	}
]);
