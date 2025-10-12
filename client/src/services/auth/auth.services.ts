import axiosInstance from "../axiosInstanceProvider"
import { REGISTER_USER_URL, type IUserRegisterPayload } from "./auth.constants"


export const registerUser = async(payload:IUserRegisterPayload)=>{
    try {
        const response  = await axiosInstance.post(REGISTER_USER_URL,payload)
       return response
    } catch (error) {
        console.log(error)
    }
}