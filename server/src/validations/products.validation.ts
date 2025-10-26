import { z } from "zod";
//NOTE: Add enums for category and brand
export const createProductSchema = z.object({
    image: z.string().optional().default(""),
    title:z.string().nonempty("Title is required"),
    description:z.string().nonempty("Description is required"),
    category: z.string().nonempty("Catgory is required"),
    brand: z.string().nonempty("Brand is required"),
    sku: z.string().nonempty("SKU is required"),
    price: z.number().positive("Price must be greater than zero"),
    salePrice:z.number().nonnegative("Sale Price can't be a negative integer").optional(),
    totalStock:z.number().int().nonnegative("Total Stock can't be a negative integer"),
}).refine((data)=>{
    if(data.salePrice === undefined) return true;
    return data.salePrice < data.price
},{
    message:"Sale Price must be less than price", path:["salePrice"]
});

export const updateProductSchema = createProductSchema
  .partial().superRefine((data, ctx) => {
    if (data.salePrice !== undefined && data.price !== undefined && data.salePrice >= data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Sale Price must be less than price",
        path: ["salePrice"],
      });
    }
  }).strict();
