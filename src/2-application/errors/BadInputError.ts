import { AppError } from "./AppError.ts";

export class BadInputError extends AppError {
  override statusCode: number = 400;
  constructor(message: string, public field: string) {
    super(message);
  }
  override serialize(): { message: string; field?: string }[] {
    return [{ message: this.message, field: this.field }];
  }
}
