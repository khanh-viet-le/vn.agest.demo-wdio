import { Product } from "./product.model";

export class CartItem {
  private _product: Product;
  private _quantity: number;

  get product() {
    return this._product;
  }

  set product(product: Product) {
    if (!product.title) {
      throw new Error("Invalid product");
    }
    this._product = product;
  }

  get quantity() {
    return this._quantity;
  }

  set quantity(quantity: number) {
    if (quantity <= 0) {
      throw new Error("Invalid quanity");
    }
    this._quantity = quantity;
  }

  constructor() {
    this._product = new Product();
    this._quantity = 1;
  }
}
