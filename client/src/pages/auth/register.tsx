import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { apiWrapper } from "@/services/apiWrapper";
import { registerUser } from "@/services/auth/auth.services";
import { type RootState } from "@/redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoadingRegister, setRegisterError, setRegisterUser } from "@/redux/auth-slice";

const initialState = {
  username: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLoadingRegister: isLoading, } = useSelector((state: RootState) => state.auth)
  const [formData, setFormData] = useState(initialState);
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      dispatch(setLoadingRegister(true))
      const response = await apiWrapper(() => registerUser(formData), { skipToast: false })
      if (response?.data?.success) {
        toast.success(response?.data.message ?? "User registered successfully")
        dispatch(setRegisterUser(null))
        navigate("/auth/login")
      }
      else {
        dispatch(setRegisterError(true))
        console.log(response)
      }
    }
    finally {
      dispatch(setLoadingRegister(false))
    }
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Register"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        isBtnDisabled={!!isLoading}
        isLoadingButton={!!isLoading}
      />
    </div>
  );
}
export default AuthRegister;