import { Router } from "express";
import { ProductController } from "../controllers/ProductController.ts";
import { ProductUsecase } from "../../2-application/usecases/productUsecase.ts";
import { ProductRepository } from "../../1-infrastructure/db/ProductRepository.ts";

const router = Router();

const productRepository = new ProductRepository();
const productUsecase = new ProductUsecase(productRepository);
const productController = new ProductController(productUsecase);

// /api/products/
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", productController.editProduct);

export { router as productRouter };
