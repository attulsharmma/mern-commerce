export interface IUserRegisterPayload {
    username:string
    email:string
    password:string
}
//URLS
export const REGISTER_USER_URL = "/auth/register"