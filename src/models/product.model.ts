export class Product {
  _title: string;

  get title() {
    return this._title;
  }

  constructor(title: string) {
    this._title = title;
  }
}
