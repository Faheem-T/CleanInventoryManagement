import { Router } from "express";
import { ProductController } from "../controllers/ProductController.ts";
import { ProductUsecase } from "../../2-application/usecases/productUsecase.ts";
import { ProductRepository } from "../../1-infrastructure/db/ProductRepository.ts";

const router = Router();

const productRepository = new ProductRepository();
const productUsecase = new ProductUsecase(productRepository);
const productController = new ProductController(productUsecase);

router.get("/", productController.getProducts);

export { router as productRouter };
