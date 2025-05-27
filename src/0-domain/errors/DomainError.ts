export abstract class DomainError extends Error {
  constructor(message?: string) {
    super(message);

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serialize(): { message: string; field?: string }[];
}
