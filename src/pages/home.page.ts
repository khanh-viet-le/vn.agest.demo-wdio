import { GeneralPage } from "@pages/general.page";
import { Route } from "@constants/common.constants";

export class HomePage extends GeneralPage {
  async open(): Promise<void> {
    await browser.url(Route.HOME);
  }
}
