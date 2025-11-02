import type { ProductFormData } from "@/pages/admin-view/products";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // Single Product
  product: {
    data: null,
    loading: false,
    error: false,
  },
  // All Products
  products: {
    data: [] as ProductFormData[],
    loading: false,
    error: false,
  },
};
const productSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {
    //All Products
    setLoadingProducts: (state, action) => {
      state.products.loading = action.payload;
    },
    setProductsData: (state, action) => {
      state.products.data = action.payload;
      state.products.error = false;
    },
    setProductsError: (state, action) => {
      state.products.data = [];
      state.products.error = action.payload;
    },
    //Single Prouct
    setLoadingSingleProduct: (state, action) => {
      state.product.loading = action.payload;
    },
    setSingleProductData: (state, action) => {
      state.product.data = action.payload;
      state.product.error = false;
    },
    setSingleProductError: (state, action) => {
      state.product.data = null;
      state.product.error = action.payload;
    },
    //Add / Update Product
    setLoadingAddUpdateProduct: (state, action) => {
      state.products.loading = action.payload;
    },
    setAddUpdateProductsData: (state, action) => {
      const product: ProductFormData = action.payload;
      const existingIndex: number = state.products.data.findIndex(
        (x: ProductFormData) => x._id === product._id
      );

      if (existingIndex !== -1) {
        // Edit: replace the existing product
        state.products.data[existingIndex] = product;
      } else {
        // Add: prepend new product
        state.products.data.unshift(product);
      }

      state.products.error = false;
    },
    setAddUpdateProductsError: (state, action) => {
      // state.products.data = [...state.products.data];
      state.products.error = action.payload;
    },
  },
});
export const {
  setLoadingProducts,
  setLoadingSingleProduct,
  setProductsData,
  setProductsError,
  setSingleProductData,
  setSingleProductError,
  setAddUpdateProductsData,
  setAddUpdateProductsError,
  setLoadingAddUpdateProduct,
} = productSlice.actions;
export default productSlice.reducer;
