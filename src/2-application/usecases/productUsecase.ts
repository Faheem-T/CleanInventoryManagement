import { Product } from "../../0-domain/entities/Product.ts";
import { IProductRepository } from "../../0-domain/repositories/IProductRepository.ts";

export class ProductUsecase {
  constructor(private productRepo: IProductRepository) {}

  async getProducts(): Promise<Product[]> {
    return await this.productRepo.getProducts();
  }

  async getProdutById(id: number): Promise<Product | null> {
    return await this.productRepo.getProductById(id);
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      return await this.productRepo.createProduct(product);
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(id: number): Promise<Product | null> {
    return await this.productRepo.deleteProduct(id);
  }

  async editProduct(
    id: number,
    product: Partial<Product>
  ): Promise<Product | null> {
    try {
      return await this.productRepo.editProduct(id, product);
    } catch (err) {
      throw err;
    }
  }
}
