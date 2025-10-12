import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/toaster";
import { loginFormControls } from "@/config";
import { apiWrapper } from "@/services/apiWrapper";
import { loginUser } from "@/services/auth/auth.services";
import { useStore } from "@/zustand";
// import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner"
const initialState = {
  email: "",
  password: "",
};
function AuthLogin() {
 
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useStore(state => state.auth)
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
     setIsLoading(true)
      const resposne = await apiWrapper(() => loginUser(formData),{skipToast:false})
      if (resposne?.data.success) {
        toast.success(resposne?.data?.message || "")
        login(resposne.data.user,"")
        
      }
    } catch (error) {
      console.log(error)
    }
    finally{
        setIsLoading(false)
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