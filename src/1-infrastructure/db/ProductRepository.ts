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
  async deleteProduct(id: number): Promise<Product | null> {
    try {
      const rows = await db
        .delete(productSchema)
        .where(eq(productSchema.id, id))
        .returning();
      if (rows.length === 0) {
        return null;
      }
      const deleted = new Product(rows[0]);
      deleted.validate();
      return deleted;
    } catch (err) {
      throw err;
    }
  }

  async editProduct(
    id: number,
    product: Partial<Product>
  ): Promise<Product | null> {
    try {
      const { name, price, qty } = product;
      const rows = await db
        .update(productSchema)
        .set({ name, price, qty })
        .where(eq(productSchema.id, id))
        .returning();
      if (rows.length === 0) {
        return null;
      }
      const updated = new Product(rows[0]);
      updated.validate();
      return updated;
    } catch (err) {
      throw err;
    }
  }
}
