export interface IProductPayload {
  username: string;
  email: string;
  password: string;
}
// export interface IUserLoginPayload {
//   email: string;
//   password: string;
// }
//URLS
export const GET_ALL_PRODUCTS = "/admin/products";
export const CREATE_PRODUCT = GET_ALL_PRODUCTS;
export const DELETE_PRODUCT = GET_ALL_PRODUCTS;

export const LOGIN_USER_URL = "/auth/login";
export const LOGOUT_USER_URL = "/auth/logout";
export const CHECK_AUTH_URL = "/auth/check-auth";
