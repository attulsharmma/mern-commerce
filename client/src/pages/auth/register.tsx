import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { apiWrapper } from "@/services/apiWrapper";
import { registerUser } from "@/services/auth/auth.services";
import { useStore } from "@/zustand";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"
const initialState = {
  username: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const navigate = useNavigate()
  const { register } = useStore(state => state.auth)
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false)
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      setIsLoading(true)
      const response = await apiWrapper(() => registerUser(formData),{skipToast:false})
      if (response?.data.success) {
        toast.success(response?.data.message ?? "User registered successfully")
        register()
        navigate("/auth/login")
      }
    }
    finally {
      setIsLoading(false)
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