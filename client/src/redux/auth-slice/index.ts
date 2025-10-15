import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null
    },
  },
});

export const { setLoading, setUser, setError, logOut } = authSlice.actions;
export default authSlice.reducer;
