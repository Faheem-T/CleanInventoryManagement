import { ProductValidationError } from "../errors/validationError.ts";

export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public qty: number
  ) {}

  validate() {
    if (this.price < 0) {
      throw new ProductValidationError("Price cannot be less than 0", "price");
    }
    if (this.qty < 0) {
      throw new ProductValidationError(
        "Product quantity cannot be less than 0",
        "qty"
      );
    }
  }

  toJSON() {
    return { id: this.id, name: this.name, price: this.price, qty: this.qty };
  }
}
