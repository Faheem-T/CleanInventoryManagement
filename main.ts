// @ts-types="npm:@types/express@5.0.2"
import express from "express";
import { productRouter } from "./src/3-presentation/routes/productRouter.ts";
import { errorHandler } from "./src/3-presentation/middlewares/errorHandler.ts";
import { ENV, validateEnv } from "./src/config/config.ts";

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);

app.use(errorHandler);

validateEnv(); // Make sure all env variables are set before starting server

app.listen(ENV.PORT, () => {
  console.log(`listening on port ${ENV.PORT}`);
});
