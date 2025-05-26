import { Request, NextFunction, Response } from "express";
import { ProductUsecase } from "../../2-application/usecases/productUsecase.ts";

export class ProductController {
  constructor(private productUsecase: ProductUsecase) {}

  getProducts = async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const products = await this.productUsecase.getProducts();
      res.status(200).json({ products });
    } catch (err) {
      console.log("Error from product controller", err);
      res.status(500).json({ errors: [{ message: "Something went wrong" }] });
    }
  };
}
