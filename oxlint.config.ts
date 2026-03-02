import { defineConfig } from "oxlint";

export default defineConfig({
	plugins: ["eslint", "typescript", "unicorn", "oxc", "react"],
	env: {
		browser: true,
		es2020: true
	},
	ignorePatterns: [
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
		"src/types/core.ts"
	],
	rules: {
		"react/only-export-components": ["warn", { allowConstantExport: true }],
		"no-mixed-spaces-and-tabs": "off",
		"typescript/no-explicit-any": "warn",
		"typescript/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_"
			}
		]
	}
});
