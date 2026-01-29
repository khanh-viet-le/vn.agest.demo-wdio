import { CartItem } from "@models/cart-item.model";
import { GeneralPage } from "./general.page";
import { extractNumbers } from "@utils/extractor.utils";

export class CartPage extends GeneralPage {
  open(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  get updateCartButton() {
    return $("button[name=update_cart]");
  }

  get alertMessage() {
    return $(".woocommerce-message");
  }

  async getCartItems(): Promise<Array<[WebdriverIO.Element, CartItem]>> {
    const result: Array<[WebdriverIO.Element, CartItem]> = [];
    const productList = await $("table.cart").$$("tr.cart_item").getElements();

    for (const productElement of productList) {
      const cartItem = new CartItem();
      cartItem.product.title = (
        await productElement.$(".product-title").getText()
      ).trim();

      cartItem.product.price =
        extractNumbers(
          await productElement.$(".product-price").getText(),
        ).pop() ?? 0;

      cartItem.quantity =
        extractNumbers(await productElement.$("input").getValue()).pop() ?? 0;

      result.push([productElement, cartItem]);
    }

    return result;
  }

  async changeQuantity(productTitle: string | RegExp, quantity: number) {
    const titleMatcher =
      productTitle instanceof RegExp
        ? productTitle
        : new RegExp(productTitle, "i");

    const updatedItem = (await this.getCartItems()).find((item) =>
      titleMatcher.test(item[1].product.title),
    );

    if (!updatedItem) {
      throw new Error("Product not found");
    }

    await updatedItem[0].$("input.qty").setValue(quantity);
    await this.updateCartButton.click();

    updatedItem[1].quantity =
      extractNumbers(await updatedItem[0].$("input.qty").getValue()).pop() ?? 0;
    return updatedItem[1];
  }
}
