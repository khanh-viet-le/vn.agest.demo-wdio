import { Route } from "@constants/common.constants";
import { GeneralPage } from "@pages/general.page";
import { Product } from "@models/product.model";
import { extractNumbers } from "@utils/extractor.utils";

export class ShopPage extends GeneralPage {
  async open() {
    await browser.url(Route.SHOP);
  }

  async getProducts(): Promise<Array<[WebdriverIO.Element, Product]>> {
    const result: Array<[WebdriverIO.Element, Product]> = [];
    const productList = await $(".products").$$(".product").getElements();

    for (const productElement of productList) {
      const product = new Product();
      product.title = (
        await productElement.$(".product-title").getText()
      ).trim();
      product.price =
        extractNumbers(await productElement.$(".price").getText()).pop() ?? 0;

      result.push([productElement, product]);
    }

    return result;
  }

  async selectProduct(productTitle: string | RegExp): Promise<Product> {
    const titleMatcher =
      productTitle instanceof RegExp
        ? productTitle
        : new RegExp(productTitle, "i");

    const selectedProduct = (await this.getProducts()).find((item) =>
      titleMatcher.test(item[1].title),
    );

    if (!selectedProduct) {
      throw new Error("Product not found");
    }

    await selectedProduct[0].click();

    return selectedProduct[1];
  }
}
