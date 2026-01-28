import { BasePage } from "@pages/base.page";
import { $ } from "@wdio/globals";

export abstract class GeneralPage extends BasePage {
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

    if (await acceptBtn.isClickable()) {
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
}
