import { setLoadingCheckAuth, setCheckAuthUser, setCheckAuthError } from "@/redux/auth-slice"
import { apiWrapper } from "@/services/apiWrapper"
import { checkAuth } from "@/services/auth/auth.services"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
const useCheckLoggedInUser = () => {
    const dispatch = useDispatch()
    const checkUserLoggedIn = async () => {
        try {
            dispatch(setLoadingCheckAuth(true))
            const resposne = await apiWrapper(() => checkAuth(), { skipToast: false })
            if (resposne?.data.success) {
                toast.success(resposne?.data?.message || "")
                dispatch(setCheckAuthUser(resposne.data.user))
            } else {
                dispatch(setCheckAuthError(true))
            }
        } catch (error) {
            console.log(error)
            dispatch(setCheckAuthError(true))
        }
        finally {
            dispatch(setLoadingCheckAuth(false))
        }
    }
    return checkUserLoggedIn
}
export default useCheckLoggedInUser