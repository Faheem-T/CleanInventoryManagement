import { DomainError } from "../../../0-domain/errors/DomainError.ts";

export abstract class AppError extends DomainError {
  abstract statusCode: number;
  constructor(message?: string) {
    super(message);
  }
}
