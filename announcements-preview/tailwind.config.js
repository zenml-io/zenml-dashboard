/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { zenmlPreset } from "@zenml-io/react-component-library/tailwind";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@zenml-io/react-component-library/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
				mono: ["JetBrains Mono Variable", ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: [
		require("@tailwindcss/forms")({
			strategy: "class"
		}),
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/container-queries")
	],
	presets: [zenmlPreset]
};
