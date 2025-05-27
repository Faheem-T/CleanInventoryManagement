import { Product } from "../../0-domain/entities/Product.ts";
import { ProductValidationError } from "../../0-domain/errors/validationError.ts";
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

  async editProduct(product: Product): Promise<Product | null> {
    try {
      product.validate();
      return await this.productRepo.editProduct(product);
    } catch (err) {
      if (err instanceof ProductValidationError) {
        console.log(err);
      }
      return null;
    }
  }
}
