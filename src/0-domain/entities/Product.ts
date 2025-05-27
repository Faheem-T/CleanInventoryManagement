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
    id: number | null;
    name: string;
    price: number;
    qty: number;
  }) {
    this.id = id || null;
    this.name = name;
    this.price = price || 0;
    this.qty = qty || 0;
  }

  validate() {
    // TODO make this proper
    // const missingFields: (keyof Pick<Product, "name" | "price" | "qty">)[] = [];

    const validationErrors: {
      field: keyof Pick<Product, "name" | "price" | "qty">;
      message: string;
    }[] = [];
    // Populating errors

    // missing field errors
    if (!this.name) {
      validationErrors.push({ field: "name", message: "Missing field" });
    }
    if (!this.price) {
      validationErrors.push({ field: "price", message: "Missing field" });
    }
    if (!this.qty) {
      validationErrors.push({ field: "qty", message: "Missing field" });
    }

    // validation errors
    if (this.price < 0) {
      validationErrors.push({
        field: "price",
        message: "Price cannot be less than 0",
      });
    }
    if (this.qty < 0) {
      validationErrors.push({
        field: "qty",
        message: "Quantity cannot be less than 0",
      });
    }

    // throwing error
    if (validationErrors.length > 0) {
      throw new ProductValidationError(validationErrors);
    }
  }

  toJSON() {
    return { id: this.id, name: this.name, price: this.price, qty: this.qty };
  }
}
