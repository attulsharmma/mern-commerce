import ImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useState, type FormEvent } from "react";
export interface ProductFormData {
  image: File | null;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: string;
  sellPrice: string;
  totalStock: string;
}

const initialFormData: ProductFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  sellPrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <>
      <div className="w-full mb-5 flex justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => setOpenCreateProductDialog(true)}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => setOpenCreateProductDialog((prev) => !prev)}
      >
        <SheetContent
          side="right"
          className="overflow-auto"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <SheetHeader className="px-5">Add New Product</SheetHeader>
          <div className="pb-4 px-5">
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
            />
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
