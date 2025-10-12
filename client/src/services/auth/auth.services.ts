import type { ApiWrapperOptions } from "../apiWrapper"
import axiosInstance from "../axiosInstanceProvider"
import { LOGIN_USER_URL, REGISTER_USER_URL, type IUserLoginPayload, type IUserRegisterPayload } from "./auth.constants"
    


export const registerUser = async(payload:IUserRegisterPayload)=>{
        const response  = await axiosInstance.post(REGISTER_USER_URL,payload)
       return response
}
export const loginUser = async(payload:IUserLoginPayload)=>{
       const response  = await axiosInstance.post(LOGIN_USER_URL,payload)
       return response
}