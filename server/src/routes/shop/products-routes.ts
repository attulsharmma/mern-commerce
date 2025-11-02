import express from "express";
import { getFilteredProducts } from "../../controllers/shop/products.controller.js";

const router = express.Router();

router.get("/", getFilteredProducts)


export { router as shopProductsRouter };
