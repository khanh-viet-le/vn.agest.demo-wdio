import { expect } from "@wdio/globals";
import { HomePage } from "@pages/home.page";
import test from "node:test";
import allure from "@wdio/allure-reporter";
import { reportTestData } from "@utils/common.utils";

test.describe(async () => {
  const homePage = new HomePage();
  const TestData = {
    phoneNumber: /\(\+1800\) 000 8808/,
    address: /1730.*Amphlett Blvd. Suite 200.*San Mateo.*CA/,
    socailMedias: ["Pinterest", " Instagram", " Twitter", " Facebook"],
    mainNavMenu: ["Home", "About Us", "Shop", "Offers", "Blog", "Contact Us"],
  };

  it("TC01_Verify Homepage Elements Are Visible", async () => {
    await reportTestData(TestData);

    await allure.step(
      "1. Navigate to https://demo.testarchitect.com",
      homePage.open,
    );

    await allure.step("2. Close popup notifications", homePage.closeSalesPopup);

    await allure.step("3. Accept cookie notice", homePage.acceptCookie);

    await allure.step("4. Verify header section elements:", async () => {
      await allure.addStep(
        `- Element 'Phone number '${TestData.phoneNumber}' is visible`,
      );
      await expect(homePage.contactPhone).toHaveText(TestData.phoneNumber);

      await allure.addStep(
        `- Element 'Address '${TestData.address}' is visible`,
      );
      await expect(homePage.contactAddress).toHaveText(TestData.address);
    });

    await allure.step("5. Verify top navigation elements:", async () => {
      await allure.addStep("- Element 'Login/Sign up link' is clickable");
      await expect(homePage.loginButton).toBeClickable();

      for (const socailMedia of TestData.socailMedias) {
        await allure.step(
          `- Element 'Social media icon of ${socailMedia}' is clickable`,
          async () => {
            await expect(
              homePage.getSocialMediaLink(socailMedia),
            ).toBeClickable();
          },
        );
      }
    });

    await allure.step("6. Verify main navigation menu:", async () => {
      for (const mainNavItem of TestData.mainNavMenu) {
        await allure.step(
          `- Element '${mainNavItem}' is clickable`,
          async () => {
            await expect(homePage.getMenuItemLink(mainNavItem)).toBeClickable();
          },
        );
      }
    });
  });
});
