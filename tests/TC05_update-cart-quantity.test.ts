import { CartPage } from "@pages/cart.page";
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
  const cartPage = new CartPage();

  const TestData = {
    selectedProduct: {
      title: "Bose SoundLink Mini",
      quantity: 2,
    },
    message: /success|updated/i,
  };

  it("TC05_Verify Product Quantity Can Be Updated in Cart", async () => {
    await reportTestData(TestData);

    await allure.addStep("Product is in cart");
    await homePage.open();
    await homePage.closeSalesPopup();
    await homePage.acceptCookie();

    await homePage.navigateToPageInMenu("Shop");
    await shopPage.selectProduct(TestData.selectedProduct.title);

    await productPage.addToCart();
    const oldCartTotal = (await productPage.getCartTotal()) ?? 0;

    await allure.step("1. Navigate to Cart page", async () => {
      await productPage.cartButton.click();
    });

    await allure.addStep("2. Locate quantity field");
    await allure.addStep(
      `3. Change quantity to ${TestData.selectedProduct.quantity}`,
    );
    await allure.addStep("4. Click 'Update Cart' button");
    const updatedProduct = await cartPage.changeQuantity(
      TestData.selectedProduct.title,
      TestData.selectedProduct.quantity,
    );

    await allure.step("5. Verify cart updates", async () => {
      await allure.step("- Quantity should update", async () => {
        expect(updatedProduct.quantity).toBe(TestData.selectedProduct.quantity);
      });

      await allure.step("- Cart total should recalculate", async () => {
        const newTotal =
          oldCartTotal +
          (TestData.selectedProduct.quantity - 1) *
            updatedProduct.product.price;

        expect(await cartPage.getCartTotal()).toBe(newTotal);
      });

      await allure.step("- update message should appear", async () => {
        await expect(cartPage.alertMessage).toHaveText(TestData.message);
      });
    });
  });
});
