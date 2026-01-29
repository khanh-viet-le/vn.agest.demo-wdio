import { HomePage } from "@pages/home.page";
import { ProductPage } from "@pages/product.page";
import { ShopPage } from "@pages/shop.page";
import { reportTestData } from "@utils/common.utils";
import allure from "@wdio/allure-reporter";
import test from "node:test";

test.describe(async () => {
  const homePage = new HomePage();
  const shopPage = new ShopPage();
  const productPage = new ProductPage();
  const TestData = {
    selectedProduct: {
      title: "Bose SoundLink Mini",
    },
  };

  it("TC04_Verify Product Can Be Added to Shopping Cart", async () => {
    await reportTestData(TestData);

    await allure.step("1. Navigate to Shop page", async () => {
      await homePage.open();
      await homePage.navigateToPageInMenu("Shop");
      await shopPage.closeSalesPopup();
      await shopPage.acceptCookie();
    });

    // track data before processing adding to cart
    const oldCartCount = (await shopPage.getCartCount()) ?? 0;
    const oldCartTotal = (await shopPage.getCartTotal()) ?? 0;

    const selectedProduct = await allure.step(
      "2. Select any available product",
      async () => {
        return await shopPage.selectProduct(TestData.selectedProduct.title);
      },
    );

    await allure.step("3. Click 'Add to Cart' button", async () => {
      await productPage.addToCart();
    });

    await allure.step("4. Verify cart notification", async () => {
      await allure.step("- Success message should appear", async () => {
        await expect(productPage.alertMessage).toHaveText(/success|added/i);
      });
    });

    await allure.step("5. Check cart icon update", async () => {
      await allure.step("- Cart count should increase", async () => {
        expect(await productPage.getCartCount()).toBe(oldCartCount + 1);
      });

      await allure.step("- Cart total should update", async () => {
        expect(await productPage.getCartTotal()).toBe(
          oldCartTotal + selectedProduct.price,
        );
      });

      await productPage.cartButton.moveTo();

      await allure.step("- Product should be added to cart", async () => {
        const productTitles = (await productPage.getInCartProducts()).map(
          (item) => item[1].title,
        );

        expect(productTitles).toContain(selectedProduct.title);
      });
    });
  });
});
