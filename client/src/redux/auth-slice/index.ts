import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // General auth
  isAuthenticated: false,
  user: null,
  // Loading states
  isLoadingLogin: false,
  isLoadingRegister: false,
  isLoadingCheckAuth: false,
  // Error states
  errorLogin: null,
  errorRegister: null,
  errorCheckAuth: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Register
    setLoadingRegister: (state, action) => {
      state.isLoadingRegister = action.payload;
    },
    setRegisterUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.errorRegister = null;
    },
    setRegisterError: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.errorRegister = action.payload;
    },
    //Login
    setLoadingLogin: (state, action) => {
      state.isLoadingLogin = action.payload;
    },
    setLoginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.errorLogin = null;
    },
    setLoginError: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.errorLogin = action.payload;
    },
    //Check Auth
    setLoadingCheckAuth: (state, action) => {
      state.isLoadingCheckAuth = action.payload;
    },
    setCheckAuthUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.errorCheckAuth = null;
    },
    setCheckAuthError: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.errorCheckAuth = action.payload;
    },
    //Logout
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoadingLogin = false;
      state.isLoadingRegister = false;
      state.isLoadingCheckAuth = false;
      state.errorLogin = null;
      state.errorRegister = null;
      state.errorCheckAuth = null;
    },
  },
});
export const {
  setLoadingRegister,
  setLoadingLogin,
  setLoadingCheckAuth,
  setLoginError,
  setRegisterError,
  setCheckAuthError,
  setLoginUser,
  setRegisterUser,
  setCheckAuthUser,
  logOut
} = authSlice.actions;
export default authSlice.reducer;
