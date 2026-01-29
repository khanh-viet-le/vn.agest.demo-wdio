import { BasePage } from "@pages/base.page";
import { $ } from "@wdio/globals";
import { extractNumbers } from "@utils/extractor.utils";
import { Product } from "@models/product.model";

export abstract class GeneralPage extends BasePage {
  get title() {
    return $("h1.title");
  }

  get contactPhone() {
    return $("#header")
      .$(".header-wrapper")
      .$(".header-top")
      .$(".et-phone-call ~ span");
  }

  get contactAddress() {
    return $("#header")
      .$(".header-wrapper")
      .$(".header-top")
      .$(".et-internet ~ span");
  }

  get loginButton() {
    return $(".*=log in");
  }

  getSocialMediaLink(name: string) {
    return $("#header")
      .$(".header-wrapper")
      .$(".header-top")
      .$(`a[title=${name}]`);
  }

  getMenuItemLink(name: string) {
    return $("#header")
      .$(".header-wrapper")
      .$(".header-bottom")
      .$(".header-main-menu")
      .$(`a.*=${name}`);
  }

  async closeSalesPopup() {
    const closeBtn = $("#sales-booster-popup .close");
    await closeBtn.waitForExist({ timeout: 10_000 });

    if (await closeBtn.isClickable()) {
      await closeBtn.click();
    }
  }

  async acceptCookie() {
    const acceptBtn = $("#cookie-notice").$(".*=ok");
    await acceptBtn.waitForExist({ timeout: 10_000 });

    if (await acceptBtn.isExisting()) {
      await acceptBtn.click();
    }
  }

  async search(keyword: string, categoryName?: string) {
    const header = $("#header").$(".header-wrapper").$(".header-main");
    const cateMenu = header.$("select[name=product_cat]");
    const searchTextbox = header.$("input[type=text]");
    const searchBtn = header.$("button.search-button");

    if (categoryName) {
      await cateMenu.click();
      await cateMenu.selectByVisibleText(categoryName);
    }

    await searchTextbox.setValue(keyword);

    await searchBtn.click();
  }

  get categoryMenu() {
    return $(".header-secondary-menu");
  }

  async hoverCategoryMenu() {
    await this.categoryMenu.waitForDisplayed();
    await this.categoryMenu.moveTo();
  }

  getCategoryItemLink(categoryName: string) {
    return this.categoryMenu.$(`a.*=${categoryName}`);
  }

  async navigateToCategoryPage(categoryName: string) {
    const categoryItem = this.getCategoryItemLink(categoryName);

    await categoryItem.click();
  }

  async navigateToPageInMenu(menuItem: string) {
    await this.getMenuItemLink(menuItem).click();
  }

  get cartButton() {
    return $(".header-wrapper .et_b_header-cart");
  }

  async getCartCount() {
    const rawText = await this.cartButton.$(".et-cart-quantity").getText();

    return extractNumbers(rawText).pop();
  }

  async getCartTotal() {
    const rawText = await this.cartButton.$(".et-cart-total").getText();

    return extractNumbers(rawText).pop();
  }

  async getInCartProducts(): Promise<Array<[WebdriverIO.Element, Product]>> {
    const result: Array<[WebdriverIO.Element, Product]> = [];
    const productList = await this.cartButton
      .$$(".cart-widget-products")
      .getElements();

    for (const productElement of productList) {
      const product = new Product();
      product.title = (
        await productElement.$(".product-title").getText()
      ).trim();

      result.push([productElement, product]);
    }

    return result;
  }
}
