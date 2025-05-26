import { Request, NextFunction, Response } from "express";
import { ProductUsecase } from "../../2-application/usecases/productUsecase.ts";
import { Product } from "../../0-domain/entities/Product.ts";

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

  createProduct = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const { productData } = req.body;
      const product = new Product(productData);
      product.validate();
      const created = await this.productUsecase.createProduct(product);
      res.status(201).json({ created });
    } catch (err) {
      // TODO add custom type
      console.log(err);
      res.status(500).json({ errors: [{ message: "Something went wrong" }] });
    }
  };
}
