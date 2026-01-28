import { Route } from "@constants/common.constants";
import { GeneralPage } from "@pages/general.page";
import { Product } from "@models/product.model";

export class ShopPage extends GeneralPage {
  async open() {
    await browser.url(Route.SHOP);
    await browser.maximizeWindow();
  }

  async getProducts(): Promise<Product[]> {
    const products: Product[] = [];
    const productList = await $(".products").$$(".product").getElements();

    for (const productElement of productList) {
      const title = await productElement.$(".product-title").getText();

      products.push(new Product(title.trim()));
    }

    return products;
  }
}
