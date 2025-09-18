// ui-tests/playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60 * 1000,
  use: {
    headless: false,
    video: "retain-on-failure", // graba video en fallos; puedes poner 'on' si quieres siempre.
    screenshot: "only-on-failure",
  },
});
