import { Product } from "../entities/Product.ts";

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | null>;
  createProduct(product: Product): Promise<Product>;
  deleteProduct(id: number): Promise<Product | null>;
  editProduct(id: number, product: Partial<Product>): Promise<Product | null>;
}
