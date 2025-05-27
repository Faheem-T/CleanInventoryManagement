import { AppError } from "./AppError.ts";

export class ProductNotFoundError extends AppError {
  override statusCode: number = 404;
  override serialize(): { message: string; field?: string }[] {
    return [{ message: "Product Not Found" }];
  }
}
