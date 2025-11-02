import axiosInstance from "@/services/axiosInstanceProvider";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
} from "./product.constants";
import type { ProductFormData } from "@/pages/admin-view/products";
export const getAllProducts = async () => {
  const response = await axiosInstance.get(GET_ALL_PRODUCTS);
  return response;
};
export const createProduct = async (payload: ProductFormData) => {
  const response = await axiosInstance.post(CREATE_PRODUCT, payload);
  return response;
};
export const updateProduct = async (payload: ProductFormData) => {
  const { _id, ...restPayload } = payload;
  const response = await axiosInstance.patch(
    `${CREATE_PRODUCT}/${_id}`,
    restPayload
  );
  return response;
};
export const deleteProduct = async (productId: string) => {
  const response = await axiosInstance.delete(`${DELETE_PRODUCT}/${productId}`);
  return response;
};
