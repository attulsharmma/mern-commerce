import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/auth-slice";
import productReducer from "@/redux/admin/product-slice";
import shopProductSlice from "@/redux/shop/product-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    shopProducts: shopProductSlice,
  },
});

// Type for RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
