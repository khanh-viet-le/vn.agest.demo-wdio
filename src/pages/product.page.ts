import { GeneralPage } from "@pages/general.page";

export class ProductPage extends GeneralPage {
  open(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async addToCart(quantity: number = 1) {
    await $("input.qty").setValue(quantity);
    await $("button.add_to_cart_button").click();
  }

  get alertMessage() {
    return $(".et-notify");
  }
}
