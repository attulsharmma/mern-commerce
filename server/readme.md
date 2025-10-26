=====================================================================
🧾 PRODUCT VALIDATION NOTES (Add / Update Product)
=====================================================================

| Field Name  | Type   | Required | Default Value               | Validation Rules / Notes                                                                 |
|--------------|--------|-----------|------------------------------|------------------------------------------------------------------------------------------|
| image        | string | ❌ No     | ""                           | Optional. If missing, set to empty string.                                               |
| title        | string | ✅ Yes    | -                            | Must be non-empty. Error: "Title is required".                                           |
| description  | string | ❌ No     | "No description provided"    | Optional. Provide a default if missing.                                                  |
| category     | string | ✅ Yes    | -                            | Must be non-empty. Error: "Category is required".                                        |
| brand        | string | ❌ No     | "Generic"                    | Optional. Default to "Generic" if not provided.                                          |
| price        | number | ✅ Yes    | -                            | Must be a number greater than 0. Error: "Price must be greater than 0".                  |
| salePrice    | number | ❌ No     | -                            | Optional. If present, must be less than `price` (for discounts).                         |
|              |        |           |                              | 👉 Example: salePrice < price (e.g., ₹800 < ₹1000).                                      |
|              |        |           |                              | If using cost/selling model, then sellPrice > costPrice.                                 |
| totalStock   | number | ✅ Yes    | -                            | Must be an integer and ≥ 0. Error: "Total stock must be 0 or greater".                   |

---------------------------------------------------------------------
🔧 EXTRA VALIDATION RULES (General Logic)
---------------------------------------------------------------------
1️⃣ Default values should be applied for optional fields:
    image = image || ""
    description = description || "No description provided"
    brand = brand || "Generic"

2️⃣ Cross-field validation (compare salePrice with price):
    if (salePrice && salePrice >= price) throw Error("Sale price must be less than price")

3️⃣ For inventory systems (cost/sell model):
    if (sellPrice && sellPrice <= costPrice) throw Error("Sell price must be greater than cost price")

4️⃣ Keep error messages clear and user-friendly:
    "Title is required"
    "Category must be selected"
    "Price must be greater than 0"
    "Sale price must be less than price"

---------------------------------------------------------------------
💡 ZOD METHODS (If using Zod validation)
---------------------------------------------------------------------
Use built-in Zod validators where possible:
    .nonempty("msg")
    .positive("msg")
    .int()
    .default("value")
    .optional()
    .gt(), .gte()
    .refine()  → for cross-field checks

✅ Example schema snippet:
--------------------------------------------------
import { z } from "zod";

export const createProductSchema = z.object({
  image: z.string().optional().default(""),
  title: z.string().nonempty("Title is required"),
  description: z.string().optional().default("No description provided"),
  category: z.string().nonempty("Category is required"),
  brand: z.string().optional().default("Generic"),
  price: z.number().positive("Price must be greater than 0"),
  salePrice: z.number().optional(),
  totalStock: z.number().int().nonnegative("Total stock must be 0 or greater"),
}).refine((data) => {
  if (data.salePrice === undefined) return true;
  return data.salePrice < data.price;
}, { message: "Sale price must be less than price", path: ["salePrice"] });
--------------------------------------------------

=====================================================================
🧠 QUICK SUMMARY:
---------------------------------------------------------------------
✅ Use `price` for base/MRP.  
✅ Use `salePrice` for discounted rate (< price).  
✅ Validate types, emptiness, and numeric ranges.  
✅ Add defaults to avoid undefined values.  
✅ Compare fields when needed using custom logic or .refine().
=====================================================================
