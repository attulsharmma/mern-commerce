import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/auth-slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Type for RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
