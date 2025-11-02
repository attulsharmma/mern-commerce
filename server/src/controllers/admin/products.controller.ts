import { Request, Response } from "express";
import { imageUploadUtil } from "../../helpers/cloudinary.js";
import { Product } from "../../models/Product/Product.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../validations/products.validation.js";

export const handleImageUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const b64 = Buffer.from((req as any).file.buffer).toString("base64");
    const url = `data:${req.file?.mimetype};base64,${b64}`;
    const result = await imageUploadUtil(url);
    res.json({
      success: true,
      result,
      message: "Image Uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
//Add a Product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const validatedProductData = createProductSchema.strict().parse(req.body);
    const newProduct = new Product(validatedProductData);
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product saved successfully",
    });
  } catch (error: any) {
    
    // Zod validation errors
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: error.issues.map((e: any) => e.message).join(". "),
      });
    }
    const code = error.errorResponse.code;
    const keyPatternSKU = error.keyPattern?.sku
    if(code ===11000 && keyPatternSKU){
        return res.status(400).json({
        success: false,
        message: "Product already existed! Try different SKU",
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
//Get All Products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.find();
    // throw new Error("error")
    res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
//Update a Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found..",
      });
    }
    const validatedProductData = updateProductSchema.strict().parse(req.body);
    product.set(validatedProductData); // it merges the updated data with existing data.
    await product.save();
    res.status(200).json({
      success: true,
      data: product,
      message: "Product saved successfully",
    });
  } catch (error: any) {
    console.log("error", error);
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: error.issues.map((e: any) => e.message).join(". "),
      });
    }
    const code = error.errorResponse.code;
    const keyPatternSKU = error.keyPattern?.sku
    if(code ===11000 && keyPatternSKU){
        return res.status(400).json({
        success: false,
        message: "Product already existed! Try different SKU",
      });
    }
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
// Delete a Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
