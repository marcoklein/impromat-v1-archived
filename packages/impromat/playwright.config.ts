import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    command: process.env.CI
      ? // test against production build
        "yarn build:serve -p 3000"
      : "yarn start",
    url: "http://localhost:3000/",
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: true,
    viewport: { width: 360, height: 800 },
    ignoreHTTPSErrors: true,
    isMobile: true,
    baseURL: "http://localhost:3000/",
  },
  timeout: 30 * 1000,
};

export default config;