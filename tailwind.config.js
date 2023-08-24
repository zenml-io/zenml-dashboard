import { zenmlPreset } from '@zenml-io/react-component-library';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,css,scss}',
    './node_modules/@zenml-io/react-component-library/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
        mono: ['SourceCodePro', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
  presets: [zenmlPreset],
};
