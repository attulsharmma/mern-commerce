import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { apiWrapper } from "@/services/apiWrapper";
import { loginUser } from "@/services/auth/auth.services";
import { setLoadingLogin, setLoginError, setLoginUser } from "@/redux/auth-slice";
const initialState = {
  email: "",
  password: "",
};
function AuthLogin() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialState);
  const { isLoadingLogin: isLoading } = useSelector((state: RootState) => state.auth)
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      dispatch(setLoadingLogin(true))
      const resposne = await apiWrapper(() => loginUser(formData), { skipToast: false })
      if (resposne?.data.success) {
        toast.success(resposne?.data?.message || "")
        dispatch(setLoginUser(resposne.data.user))
      }else{
        dispatch(setLoginError(true))
      }
    } catch (error) {
      console.log(error)
      dispatch(setLoginError(true))
    }
    finally {
      dispatch(setLoadingLogin(false))
    }
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={!!isLoading}
        isLoadingButton={!!isLoading}
      />
    </div>
  );
}
export default AuthLogin;