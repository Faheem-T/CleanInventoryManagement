import { Product } from "../entities/Product.ts";
import { DomainError } from "./DomainError.ts";

export class ProductValidationError extends DomainError {
  constructor(public fields: { field: keyof Product; message: string }[]) {
    super("Error validating product");
  }
  override serialize(): { message: string; field?: string }[] {
    return this.fields;
  }
}
