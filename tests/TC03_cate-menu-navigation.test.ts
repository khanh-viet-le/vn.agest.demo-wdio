import test from "node:test";
import allure from "@wdio/allure-reporter";
import { reportTestData } from "@utils/common.utils";
import { HomePage } from "@pages/home.page";
import { CategoryPage } from "@pages/category.page";

test.describe(async () => {
  const homePage = new HomePage();
  const categoryPage = new CategoryPage();

  const TestData = {
    categoryList: [
      "Automobiles & Motorcycles",
      "Car Electronics",
      "Mobile Phone Accessories",
      "Computer & Office",
      "Tablet Accessories",
      "Consumer Electronics",
      "Electronic Components & Supplies",
      "Phones & Telecommunications",
      "Watches",
    ],
  };

  it("TC03_Verify Main Menu Categories Navigate Correctly", async () => {
    await reportTestData(TestData);

    await allure.step("Homepage is loaded", async () => {
      await homePage.open();
      await homePage.closeSalesPopup();
      await homePage.acceptCookie();
    });

    for (const category of TestData.categoryList) {
      await allure.step("1. Hover over 'All departments' menu", async () => {
        await homePage.hoverCategoryMenu();
      });

      await allure.step(
        "2. Verify all main categories are present:",
        async () => {
          await allure.step(`${category} is visible in the menu`, async () => {
            await expect(
              homePage.getCategoryItemLink(category),
            ).toBeDisplayed();
          });
        },
      );

      await allure.step(
        "3. Click each category and verify navigation",
        async () => {
          await allure.step(
            "Clicking each category should navigate to correct page",
            async () => {
              await homePage.navigateToCategoryPage(category);

              await expect(categoryPage.title).toHaveText(
                new RegExp(category, "i"),
              );
            },
          );
        },
      );

      await browser.back();
    }
  });
});
