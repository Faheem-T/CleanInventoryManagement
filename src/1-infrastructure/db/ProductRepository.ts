import { Product } from "../../0-domain/entities/Product.ts";
import { ProductValidationError } from "../../0-domain/errors/validationError.ts";
import { IProductRepository } from "../../0-domain/repositories/IProductRepository.ts";
import { db } from "../../config/config.ts";
import { productSchema } from "./schemas/productSchema.ts";

export class ProductRepository implements IProductRepository {
  constructor() {}

  async getProducts(): Promise<Product[]> {
    try {
      const rows = await db.select().from(productSchema);

      return rows.map((row) => {
        const p = new Product(row);
        p.validate();
        return p;
      });
    } catch (err) {
      throw err;
      // console.log("Error from Product Repo: \n", err);
      // return [];
    }
  }
  getProductById(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }

  async createProduct(product: Product): Promise<Product | null> {
    try {
      const { name, price, qty } = product.toJSON();
      const result = await db
        .insert(productSchema)
        .values({ name, price, qty })
        .returning();
      const record = result[0];
      const newProduct = new Product(record);
      newProduct.validate();
      return newProduct;
    } catch (err) {
      throw err;
    }
  }
  deleteProduct(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  editProduct(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
