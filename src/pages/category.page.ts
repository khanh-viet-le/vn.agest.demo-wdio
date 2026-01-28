import { Route } from "@constants/common.constants";
import { GeneralPage } from "./general.page";

export class CategoryPage extends GeneralPage {
  async open() {
    await browser.url(Route.CATEGORY);
    await browser.maximizeWindow();
  }
}
