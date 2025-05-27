import { NextFunction, Request, Response } from "express";
import { AppError } from "../../2-application/errors/AppError.ts";
import { DomainError } from "../../0-domain/errors/DomainError.ts";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ errors: err.serialize() });
  } else if (err instanceof DomainError) {
    res.status(400).json({ errors: err.serialize() });
  } else {
    console.log(err);
    res.status(500).json({ errors: [{ message: "Something went wrong" }] });
  }
};
