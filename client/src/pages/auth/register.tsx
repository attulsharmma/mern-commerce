import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { apiWrapper } from "@/services/apiWrapper";
import { registerUser } from "@/services/auth/auth.services";
import { type RootState } from "@/redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setError, setLoading, setUser } from "@/redux/auth-slice";
const initialState = {
  username: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLoading: isLoadingRegister, } = useSelector((state: RootState) => state.auth)
  const [formData, setFormData] = useState(initialState);
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      dispatch(setLoading(true))
      const response = await apiWrapper(() => registerUser(formData), { skipToast: false })
      if (response?.data?.success) {
        toast.success(response?.data.message ?? "User registered successfully")
        dispatch(setUser(null))
        navigate("/auth/login")
      }
      else {
        dispatch(setError(true))
        console.log(response)
      }
    }
    finally {
      dispatch(setLoading(false))
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
        isBtnDisabled={!!isLoadingRegister}
        isLoadingButton={!!isLoadingRegister}
      />
    </div>
  );
}
export default AuthRegister;