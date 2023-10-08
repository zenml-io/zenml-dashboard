import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://zenml-ui-dev.netlify.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 40,
  },
});
