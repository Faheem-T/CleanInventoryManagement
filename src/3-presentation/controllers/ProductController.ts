import { Request, NextFunction, Response } from "express";
import { ProductUsecase } from "../../2-application/usecases/productUsecase.ts";
import { Product } from "../../0-domain/entities/Product.ts";
import { ProductNotFoundError } from "../../2-application/errors/NotFoundError.ts";
import { BadInputError } from "../../2-application/errors/BadInputError.ts";

export class ProductController {
  constructor(private productUsecase: ProductUsecase) {}

  getProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productUsecase.getProducts();
      const safeProducts = products.map((product) => product.toJSON());
      res.status(200).json({ products: safeProducts });
    } catch (err) {
      next(err);
    }
  };

  getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id) {
        throw new BadInputError("ID not found", "id");
      }

      const intId = Number(id);
      if (isNaN(intId)) {
        throw new ProductNotFoundError();
      }

      const product = await this.productUsecase.getProdutById(intId);

      if (!product) {
        throw new ProductNotFoundError();
      }

      res.status(200).json({ product: product.toJSON() });
    } catch (err) {
      next(err);
    }
  };

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productData = req.body;
      const product = new Product(productData);
      product.validate();
      const created = await this.productUsecase.createProduct(product);
      res.status(201).json({ created: created.toJSON() });
    } catch (err) {
      next(err);
    }
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id) {
        throw new BadInputError("ID not found", "id");
      }

      const intId = Number(id);
      if (isNaN(intId)) {
        throw new ProductNotFoundError();
      }
      const deleted = await this.productUsecase.deleteProduct(intId);
      if (!deleted) {
        throw new ProductNotFoundError();
      }

      res.status(200).json({ deleted: deleted.toJSON() });
    } catch (err) {
      next(err);
    }
  };

  editProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      if (!id) {
        throw new BadInputError("ID not found", "id");
      }

      const intId = Number(id);
      if (isNaN(intId)) {
        throw new ProductNotFoundError();
      }

      const { name, qty, price } = req.body;

      const updated = await this.productUsecase.editProduct(intId, {
        name,
        qty,
        price,
      });

      if (!updated) {
        throw new ProductNotFoundError();
      }

      res.status(200).json({ updated: updated.toJSON() });
    } catch (err) {
      next(err);
    }
  };
}
