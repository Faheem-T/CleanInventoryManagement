import { Product } from "../../0-domain/entities/Product.ts";
import { IProductRepository } from "../../0-domain/repositories/IProductRepository.ts";

export class ProductRepository implements IProductRepository {
  getProducts(): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  getProductById(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  createProduct(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  deleteProduct(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  editProduct(product: Product): Promise<Product> {
    throw new Error("Method not implemented.");
  }
}
