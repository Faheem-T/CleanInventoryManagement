import { Product } from "../entities/Product.ts";

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product>;
  createProduct(product: Product): Promise<Product | null>;
  deleteProduct(id: string): Promise<Product | null>;
  editProduct(product: Product): Promise<Product | null>;
}
