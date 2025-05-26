import { ProductValidationError } from "../errors/validationError.ts";

export class Product {
  id: number | null;
  name: string;
  price: number;
  qty: number;
  constructor({
    id,
    name,
    price,
    qty,
  }: {
    id: number;
    name: string;
    price: number;
    qty: number;
  }) {
    this.id = id || null;
    this.name = name;
    this.price = price || 0;
    this.qty = qty || 0;
  }
  // constructor(
  //   public id: number,
  //   public name: string,
  //   public price: number,
  //   public qty: number
  // ) {}

  validate() {
    // TODO make this proper
    const missing = !this.name || !this.price || !this.qty;
    if (missing) {
      throw new ProductValidationError("Missing field", "price");
    }
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
