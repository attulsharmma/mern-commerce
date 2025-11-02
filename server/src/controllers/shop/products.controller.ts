import { Request, Response } from "express";

import { Product } from "../../models/Product/Product.js";

const sortMapping: Record<string, Record<string, 1 | -1>> = {
  "price-lowtohigh": { price: 1 },
  "price-hightolow": { price: -1 },
  "title-atoz": { title: 1 },
  "title-ztoa": { title: -1 },
};


export const getFilteredProducts = async (req: Request, res: Response) => {
  try {
    const allowedFilters = ["brand", "category"];
    const filters: any = {};
    const sortParams = req.query.sort as string;
    for (const [key, value] of Object.entries(req.query)) {
      if (!allowedFilters.includes(key)) continue;
      if (!value) continue;
      if (typeof value === "string") {
        const values = value.split(",");
        filters[key] = values.length > 1 ? { $in: values } : values[0];
      } else if (Array.isArray(value)) {
        filters[key] = { $in: value };
      }
    }
    const sort =
      sortParams && sortMapping[sortParams] ? sortMapping[sortParams] : {};
    const products = await Product.find(filters).sort(sort);
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
