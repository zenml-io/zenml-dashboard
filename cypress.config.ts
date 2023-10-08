import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: Cypress.env('CYPRESS_BASE_URL'),
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 40,
  },
});
