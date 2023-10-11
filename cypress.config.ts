import { defineConfig } from 'cypress';
require('dotenv').config();
export default defineConfig({
  env: { ...process.env },
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
