import axiosInstance from "../axiosInstanceProvider"
import { CHECK_AUTH_URL, LOGIN_USER_URL, REGISTER_USER_URL, type IUserLoginPayload, type IUserRegisterPayload } from "./auth.constants"
export const registerUser = async (payload: IUserRegisterPayload) => {
       const response = await axiosInstance.post(REGISTER_USER_URL, payload)
       return response
}
export const loginUser = async (payload: IUserLoginPayload) => {
       const response = await axiosInstance.post(LOGIN_USER_URL, payload)
       return response
}
export const checkAuth = async () => {
       const response = await axiosInstance.get(CHECK_AUTH_URL, {
              headers: {
                     "Cache-Control":
                     "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
       })
       return response
}