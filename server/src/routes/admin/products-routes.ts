import express from "express";
import {
  handleImageUpload,
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "../../controllers/admin/products.controller.js";
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.get("/", getAllProducts);
router.post("/", addProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export { router as adminProductsRouter };
