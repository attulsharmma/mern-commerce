import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {
    data: [],
    error: false,
    loading: false,
  },
};

const shopProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {
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
  },
});
export const { setLoadingProducts, setProductsData, setProductsError } =
  shopProductSlice.actions;
export default shopProductSlice.reducer;
