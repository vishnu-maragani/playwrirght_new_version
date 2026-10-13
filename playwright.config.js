// @ts-check
const { defineConfig } = require("@playwright/test");

const config = {
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    trace: "on",
  },
};

module.exports = config;
