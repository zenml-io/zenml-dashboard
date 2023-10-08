import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: '',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 40,
  },
});

if (process.env.CYPRESS_BASE_URL) {
  // Update the baseUrl with the environment variable value
  module.exports.e2e.baseUrl = process.env.CYPRESS_BASE_URL;
}
