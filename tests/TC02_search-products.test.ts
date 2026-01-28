import test from "node:test";
import allure from "@wdio/allure-reporter";
import { HomePage } from "@pages/home.page";
import { reportTestData } from "@utils/common.utils";
import { ShopPage } from "@pages/shop.page";

test.describe(async () => {
  const homePage = new HomePage();
  const shopPage = new ShopPage();

  const TestData = {
    searchKeyword: "camera",
    urlTerm: /s=camera/,
    loadTitle: /Search results for “camera”/i,
  };

  it("TC02_Verify Product Search Functionality Works", async () => {
    await reportTestData(TestData);

    await allure.step(
      "1. Navigate to https://demo.testarchitect.com/",
      homePage.open,
    );

    await allure.step(
      "2. Close any popup notifications if present",
      homePage.closeSalesPopup,
    );

    await allure.step(
      "3. Accept cookie notice if present",
      homePage.acceptCookie,
    );

    await allure.step(
      `Search products with keyword '${TestData.searchKeyword}'`,
      async () => {
        await allure.addStep("4. Locate the search bar in the header");
        await allure.addStep("5. Click on the category dropdown");
        await allure.addStep("6. Select 'All categories'");
        await allure.addStep(
          `7. Enter '${TestData.searchKeyword}' in the search field`,
        );
        await allure.addStep("8. Click the search button");
        await homePage.search(TestData.searchKeyword);
      },
    );

    await allure.step("9. Observe search results page", async () => {
      await allure.step(
        `- URL should contain search term '${TestData.urlTerm}'`,
        async () => {
          await expect(browser).toHaveUrl(TestData.urlTerm);
        },
      );

      await allure.step("- Search results should load", async () => {
        await expect(shopPage.title).toHaveText(TestData.loadTitle);
      });

      await allure.step(
        `- Products related to '${TestData.searchKeyword}' should be displayed`,
        async () => {
          const products = await shopPage.getProducts();

          expect(
            products.every((product) =>
              new RegExp(TestData.searchKeyword, "i").test(product.title),
            ),
          ).toBeTruthy();
        },
      );
    });
  });
});
