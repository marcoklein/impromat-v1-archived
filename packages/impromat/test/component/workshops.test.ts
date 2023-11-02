import { expect, Page } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures.js";

pageTest.describe("Workshops Page", () => {
  pageTest(
    "should create a workshop",
    async ({ page, auth, workshopsPage }) => {
      // given
      await auth.loginAsRandomUser();
      const workshopId = await workshopsPage.addWorkshop("testworkshop");

      // when
      await workshopsPage.goto();
      await page.getByRole("link", { name: "Open" }).last().click();

      // then
      await expect(page).toHaveURL(`/workshop/${workshopId}`);
    },
  );

  // TODO disabled because of Refresher not working properly with grid
  pageTest.skip(
    "should show a network error notification",
    async ({ page, auth, workshopsPage }) => {
      // given
      await auth.loginAsRandomUser();
      // when
      await blockImpromatApiRequests(page);
      await workshopsPage.goto();
      // then
      await expect(page.getByRole("button", { name: "Retry" })).toBeVisible();
    },
  );

  // TODO disabled because of Refresher not working properly with grid
  pageTest.skip(
    "should reload page on network error retry",
    async ({ page, auth, workshopsPage }) => {
      // given
      await auth.loginAsRandomUser();
      await workshopsPage.addWorkshop("testworkshop");
      await blockImpromatApiRequests(page);
      await workshopsPage.goto();
      // when
      await page.getByRole("button", { name: "Retry" }).click();
      await unblockImpromatApiRequests(page);
      // then
      await expect(page.getByText("testworkshop").first()).toBeVisible();
    },
  );
});

async function blockImpromatApiRequests(page: Page) {
  await page.route(`${process.env.VITE_API_URL}/*`, async (route) => {
    await route.abort();
  });
}

async function unblockImpromatApiRequests(page: Page) {
  await page.unroute(`${process.env.VITE_API_URL}/*`);
}
