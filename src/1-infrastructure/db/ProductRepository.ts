import { eq } from "drizzle-orm";
import { Product } from "../../0-domain/entities/Product.ts";
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
    }
  }
  async getProductById(id: number): Promise<Product | null> {
    try {
      const row = await db
        .select()
        .from(productSchema)
        .where(eq(productSchema.id, id));
      if (row.length === 0) {
        console.log("Repo: Not found");
        return null;
      }
      const record = row[0];
      const product = new Product(record);
      product.validate();
      return product;
    } catch (err) {
      throw err;
    }
  }

  async createProduct(product: Product): Promise<Product> {
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
  deleteProduct(id: number): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  editProduct(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
