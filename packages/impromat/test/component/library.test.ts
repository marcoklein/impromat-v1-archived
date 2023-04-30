import { expect } from "@playwright/test";
import { pageTest } from "./fixtures/page-fixtures";

pageTest.describe("Library", () => {
  pageTest("should render the library page", async ({ auth, libraryPage }) => {
    // given
    await auth.loginAsRandomUser();
    // when
    await libraryPage.goto();
    // then
    await libraryPage.expectToolbarTextToBe("Element Library");
    await expect(libraryPage.tabLocator(/Explore/)).toBeVisible();
    await expect(libraryPage.tabLocator(/Favorites/)).toBeVisible();
    await expect(libraryPage.tabLocator(/My Library/)).toBeVisible();
  });

  pageTest("should open an element", async ({ page, auth, libraryPage }) => {
    // given
    await auth.loginAsRandomUser();
    await libraryPage.goto();
    // when
    await libraryPage.gotoFirstElementFromSearch();
    // then
    await libraryPage.expectToolbarTextToBe("Freeze");
  });

  pageTest(
    "should create a custom element",
    async ({ page, auth, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      const name = "test-custom-element";
      // when
      await libraryPage.goto();
      await libraryPage.createCustomElement(name);
      await libraryPage.goto();
      await libraryPage.libraryTabLocator().click();
      // then
      await expect(page.getByText(new RegExp(name))).toBeVisible();
    },
  );

  pageTest(
    "should show custom elements in search",
    async ({ page, auth, libraryPage }) => {
      // given
      await auth.loginAsRandomUser();
      const name = "test-custom-element";
      await libraryPage.goto();
      await libraryPage.createCustomElement(name);
      // when
      await libraryPage.gotoSearch();
      await libraryPage.searchForElement(name);
      // then
      await expect(page.getByText(new RegExp(name))).toBeVisible();
    },
  );
});
