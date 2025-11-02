import ImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import type { RootState } from "@/redux";
import { z } from "zod";
import {
  setAddUpdateProductsData,
  setAddUpdateProductsError,
  setLoadingAddUpdateProduct,
  setLoadingProducts,
  setProductsData,
  setProductsError,
} from "@/redux/admin/product-slice";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "@/services/admin/product/product.services";
import { apiWrapper } from "@/services/apiWrapper";
import {
  Fragment,
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { createProductSchema } from "@/schemas/products.schema";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import ConfirmDialog from "@/components/admin-view/confirm-dialog";

export interface ProductFormData {
  image: string | null;
  title: string;
  description: string;
  category: string;
  brand: string;
  sku: string;
  price: string | number;
  salePrice: string | number;
  totalStock: string | number;
  _id?: string;
}
const initialFormData: ProductFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  sku: "",
};
const AdminProducts = () => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [openCreateProductDialog, setOpenCreateProductDialog] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLoadingState, setImageLoadingState] = useState<boolean>(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [currentEditedId, setCurrentEditedId] = useState<string | null>(null);
  const {
    products: { data: productList, loading },
  } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const payload: ProductFormData = {
      ...formData,
      image: uploadedImageUrl ? uploadedImageUrl : formData.image ?? "",
      price: +formData.price,
      salePrice: +formData.salePrice,
      totalStock: +formData.totalStock,
    };
    const { _id, ...restPayload } = payload;
    try {
      createProductSchema.parse(restPayload);
      dispatch(setLoadingAddUpdateProduct(true));
      const response = await apiWrapper(
        () =>
          _id
            ? updateProduct({ ...restPayload, _id })
            : createProduct(restPayload),
        {
          skipToast: false,
        }
      );
      if (response.data.success) {
        toast.success(response?.data?.message);
        await fetchProducts();
      } else {
        toast.error(response?.data?.message);
        dispatch(setAddUpdateProductsError(true));
      }
      dispatch(setAddUpdateProductsData(response.data.data));
      setImageFile(null);
      setUploadedImageUrl("");
      setOpenCreateProductDialog(false);
    } catch (error) {
      console.log("error", error);
      dispatch(setAddUpdateProductsError(true));
      if (error instanceof z.ZodError) {
        const fieldErrors = error.issues.map((e) => e.message).join(". ");
        toast.error(fieldErrors);
      }
    } finally {
      dispatch(setLoadingAddUpdateProduct(false));
    }
  };
  const fetchProducts = useCallback(async () => {
    try {
      dispatch(setLoadingProducts(true));
      const result = await apiWrapper(() => getAllProducts(), {
        skipToast: true,
      });

      if (result.data.success) {
        dispatch(setProductsData(result.data.data));
      } else {
        dispatch(setProductsError(true));
      }
    } catch (error) {
      dispatch(setProductsError(true));
      console.error(error);
    } finally {
      dispatch(setLoadingProducts(false));
    }
  }, [dispatch]);
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const handleDelete = async (productId: string) => {
    try {
      dispatch(setLoadingProducts(true));
      const response = await apiWrapper(() => deleteProduct(productId), {
        skipToast: false,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(
          setProductsData(productList.filter((p) => p._id !== productId))
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(setProductsError(true));
      console.log(error);
    } finally {
      dispatch(setLoadingProducts(false));
      setIsOpenConfirm(false);
      setCurrentEditedId(null);
    }
  };
  const onOpenChange = (open: boolean) => {
    setIsOpenConfirm(open);
    if (!open) {
      setCurrentEditedId(null);
    }
  };
  const onDeleteClick = (id: string) => {
    setCurrentEditedId(id);
    setIsOpenConfirm(true);
  };
  return (
    <Fragment>
      {loading ? <Spinner /> : null}
      <div className="w-full mb-5 flex justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => {
            setOpenCreateProductDialog(true);
            setCurrentEditedId(null);
            setFormData(initialFormData);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList?.length
          ? productList.map((productItem: ProductFormData) => (
              <AdminProductTile
                key={productItem?._id}
                product={productItem}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductDialog}
                setCurrentEditedId={setCurrentEditedId}
                handleDelete={onDeleteClick}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => setOpenCreateProductDialog((prev) => !prev)}
      >
        <SheetContent
          side="right"
          className="overflow-auto min-w-[450px]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <SheetHeader className="px-5">
            <SheetTitle>
              {currentEditedId ? "Edit" : "Add New"} Product
            </SheetTitle>
            {/* To avoid warning - SheetDescription */}
            <SheetDescription />
          </SheetHeader>
          <div className="pb-4 px-5">
            <ImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              isBtnDisabled={!!imageLoadingState || !!loading}
              isLoadingButton={!!loading}
              buttonText={currentEditedId ? "Update" : "Save"}
            />
          </div>
        </SheetContent>
      </Sheet>
      <ConfirmDialog
        open={isOpenConfirm}
        onOpenChange={onOpenChange}
        onConfirm={() => handleDelete(currentEditedId as string)}
        confirmText="Delete"
        title="Are you sure?"
      />
      {/* <AlertDialog onOpenChange={} /> */}
    </Fragment>
  );
};
export default AdminProducts;
