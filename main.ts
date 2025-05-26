// @ts-types="npm:@types/express@5.0.2"
import express from "express";
import { productRouter } from "./3-presentation/routes/productRouter.ts";

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
