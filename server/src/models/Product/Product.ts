import mongoose from "mongoose";
import { IProduct } from "./Products.types";

const ProductSchema = new mongoose.Schema<IProduct>(
  {
     image: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  totalStock: { type: Number, required: true },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>("Product",ProductSchema)