import { Product } from "../entities/Product.ts";

export class ProductValidationError extends Error {
  constructor(
    message: string,
    public field: keyof Pick<Product, "qty" | "price">
  ) {
    super(message);
    Object.setPrototypeOf(this, ProductValidationError.prototype);
  }
}
