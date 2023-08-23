import { zenmlPreset } from '@zenml-io/react-component-library';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,css,scss}',
    './node_modules/@zenml-io/react-component-library/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [zenmlPreset],
};
