import axiosInstance from "@/services/axiosInstanceProvider";
import { GET_ALL_PRODUCTS } from "./product.constants";

export const getAllFilteredProducts = async (query: string) => {
  const response = await axiosInstance.get(`${GET_ALL_PRODUCTS}?${query}`);
  return response;
};
