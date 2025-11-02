import type { ProductFormData } from "@/pages/admin-view/products";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { defaultImage } from "@/config";

interface AdminProductTileProps {
  product: ProductFormData;
  setFormData: (data: ProductFormData) => void;
  setOpenCreateProductsDialog: (open: boolean) => void;
  setCurrentEditedId: (id: string) => void;
  handleDelete: (id: string) => void;
}
function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}: AdminProductTileProps) {
  return (
    <Card className="w-full max-w-sm mx-auto pt-0">
      <div>
        <div className="relative">
          <img
            src={product?.image || defaultImage}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                (product?.salePrice as number) > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {(product?.salePrice as number) > 0 ? (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            className="cursor-pointer"
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id as string);
              setFormData({
                _id: product._id,
                image: product.image,
                title: product.title,
                description: product.description,
                category: product.description,
                brand: product.brand,
                price: product.price,
                salePrice: product.salePrice,
                totalStock: product.totalStock,
                sku: product.sku,
              });
            }}
          >
            Edit
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => handleDelete(product?._id as string)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
