export interface IUserRegisterPayload {
  username: string;
  email: string;
  password: string;
}
export interface IUserLoginPayload {
  email: string;
  password: string;
}
//URLS
export const REGISTER_USER_URL = "/auth/register";
export const LOGIN_USER_URL = "/auth/login";
export const LOGOUT_USER_URL = "/auth/logout";
export const CHECK_AUTH_URL = "/auth/check-auth";
