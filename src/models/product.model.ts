export class Product {
  private _title: string;
  private _price: number;

  get title() {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get price() {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  constructor(title: string = "") {
    this._title = title;
    this._price = 0;
  }
}
