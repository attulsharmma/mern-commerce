import mongoose from "mongoose";
import dotenv from "dotenv";
import {Product} from "./models/Product/Product.js"

dotenv.config();

const products = [
  {
    "_id": "690274bef2dc678b30ce4701",
    "image": "",
    "title": "Nike Air Zoom Pegasus 40",
    "description": "Lightweight running shoes with superior cushioning.",
    "category": "men",
    "brand": "nike",
    "price": 8999,
    "salePrice": 6999,
    "totalStock": 25,
    "sku": "SKU-MEN-NIKE-001",
    "createdAt": "2025-10-29T20:10:38.364+00:00",
    "updatedAt": "2025-10-30T20:15:01.560+00:00",
    "__v": 0
  },
  {
    "_id": "690274bef2dc678b30ce4702",
    "image": "",
    "title": "Adidas Ultraboost Light",
    "description": "High-performance running shoes with responsive Boost cushioning.",
    "category": "men",
    "brand": "adidas",
    "price": 14999,
    "salePrice": 10999,
    "totalStock": 18,
    "sku": "SKU-MEN-ADI-002",
    "createdAt": "2025-10-29T20:11:38.364+00:00",
    "updatedAt": "2025-10-30T20:16:01.560+00:00",
    "__v": 0
  },
  {
    "_id": "690274bef2dc678b30ce4703",
    "image": "",
    "title": "Puma Smash V2",
    "description": "Classic sneakers with premium suede upper for everyday comfort.",
    "category": "men",
    "brand": "puma",
    "price": 4999,
    "salePrice": 3499,
    "totalStock": 40,
    "sku": "SKU-MEN-PUMA-003",
    "createdAt": "2025-10-29T20:12:38.364+00:00",
    "updatedAt": "2025-10-30T20:17:01.560+00:00",
    "__v": 0
  },
  {
    "_id": "690274bef2dc678b30ce4704",
    "image": "",
    "title": "Reebok Nano X3",
    "description": "Cross-training shoes built for versatility and stability.",
    "category": "men",
    "brand": "reebok",
    "price": 9999,
    "salePrice": 7999,
    "totalStock": 22,
    "sku": "SKU-MEN-REEBOK-004",
    "createdAt": "2025-10-29T20:13:38.364+00:00",
    "updatedAt": "2025-10-30T20:18:01.560+00:00",
    "__v": 0
  },
  {
    "_id": "690274bef2dc678b30ce4705",
    "image": "",
    "title": "Skechers Go Walk 6",
    "description": "Ultra-comfort walking shoes with lightweight design.",
    "category": "men",
    "brand": "skechers",
    "price": 6999,
    "salePrice": 4999,
    "totalStock": 30,
    "sku": "SKU-MEN-SKECH-005",
    "createdAt": "2025-10-29T20:14:38.364+00:00",
    "updatedAt": "2025-10-30T20:19:01.560+00:00",
    "__v": 0
  },
  {
    "_id": "690274bef2dc678b30ce4706",
    "image": "",
    "title": "Nike Air Force 1 Shadow",
    "description": "Stylish and iconic sneakers with layered design for women.",
    "category": "women",
    "brand": "nike",
    "price": 10499,
    "salePrice": 8299,
    "totalStock": 20,
    "sku": "SKU-WOM-NIKE-006",
    "createdAt": "2025-10-29T20:15:38.364+00:00",
    "updatedAt": "2025-10-30T20:20:01.560+00:00",
    "__v": 0
  },
  {
    "_id": "690274bef2dc678b30ce4707",
    "image": "",
    "title": "Adidas Stan Smith Bold",
    "description": "Timeless tennis-style shoes with a modern twist for women.",
    "category": "women",
    "brand": "adidas",
    "price": 8499,
    "salePrice": 6499,
    "totalStock": 26,
    "sku": "SKU-WOM-ADI-007",
    "createdAt": "2025-10-29T20:16:38.364+00:00",
    "updatedAt": "2025-10-30T20:21:01.560+00:00",
    "__v": 0
  },
  {
    "_id": "690274bef2dc678b30ce4708",
    "image": "",
    "title": "Puma Mayze Stack",
    "description": "Platform sneakers designed for bold streetwear looks.",
    "category": "women",
    "brand": "puma",
    "price": 8999,
    "salePrice": 6999,
    "totalStock": 28,
    "sku": "SKU-WOM-PUMA-008",
    "createdAt": "2025-10-29T20:17:38.364+00:00",
    "updatedAt": "2025-10-30T20:22:01.560+00:00",
    "__v": 0
  },
  {
    "_id": "690274bef2dc678b30ce4709",
    "image": "",
    "title": "Reebok Classic Leather",
    "description": "Retro-style shoes offering both comfort and durability.",
    "category": "women",
    "brand": "reebok",
    "price": 7499,
    "salePrice": 5499,
    "totalStock": 19,
    "sku": "SKU-WOM-REEBOK-009",
    "createdAt": "2025-10-29T20:18:38.364+00:00",
    "updatedAt": "2025-10-30T20:23:01.560+00:00",
    "__v": 0
  },
  {
    "_id": "690274bef2dc678b30ce4710",
    "image": "",
    "title": "Skechers Arch Fit Sunny Days",
    "description": "Comfortable walking shoes with arch support for women.",
    "category": "women",
    "brand": "skechers",
    "price": 6999,
    "salePrice": 4999,
    "totalStock": 35,
    "sku": "SKU-WOM-SKECH-010",
    "createdAt": "2025-10-29T20:19:38.364+00:00",
    "updatedAt": "2025-10-30T20:24:01.560+00:00",
    "__v": 0
  }
]



const seedProducts = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/mern-commerce`);
    console.log("✅ Connected to DB");

    await Product.deleteMany({});
    console.log("🧹 Cleared old data");

    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
