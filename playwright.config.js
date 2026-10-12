// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { trace } from "node:console";

const config = {
  testDir: "./tests",
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    trace: "on",
  },
};

module.exports = config;
