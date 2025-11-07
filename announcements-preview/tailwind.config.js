import { zenmlPreset } from "@zenml-io/react-component-library/tailwind";
import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";

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
		forms({
			strategy: "class"
		}),
		animate,
		typography,
		containerQueries
	],
	presets: [zenmlPreset]
};
