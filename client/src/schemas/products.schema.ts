import { z } from "zod";

export const createProductSchema = z
  .object({
    image: z.string().optional().default(""),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),
    brand: z.string().min(1, "Brand is required"),
    sku: z.string().min(1, "SKU is required"),
    price: z.number().positive("Price must be greater than zero"),
    salePrice: z
      .number()
      .nonnegative("Sale Price can't be negative")
      .optional(),
    totalStock: z.number().int().nonnegative("Total Stock can't be negative"),
  })
  .refine(
    (data) => data.salePrice === undefined || data.salePrice < data.price,
    { message: "Sale Price must be less than price", path: ["salePrice"] }
  );

export const updateProductSchema = createProductSchema
  .partial()
  .superRefine((data, ctx) => {
    if (
      data.salePrice !== undefined &&
      data.price !== undefined &&
      data.salePrice >= data.price
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Sale Price must be less than price",
        path: ["salePrice"],
      });
    }
  });

export type CreateProductInput = z.infer<typeof createProductSchema>;
