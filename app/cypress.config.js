const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    MAILISK_API_KEY: "YOUR_API_KEY",
    MAILISK_NAMESPACE: "YOUR_NAMESPACE",
  },
});
