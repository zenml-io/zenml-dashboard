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
				sans: ["Inter", ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("tailwindcss-animate"),
		require("@tailwindcss/typography")
	],
	presets: [zenmlPreset]
};
