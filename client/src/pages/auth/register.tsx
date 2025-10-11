import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/toaster";
import { loginFormControls, registerFormControls } from "@/config";
// import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner"

const initialState = {
  userName:"",
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
 

  function onSubmit(event) {
    event.preventDefault();

    // dispatch(loginUser(formData)).then((data) => {
    //   if (data?.payload?.success) {
    //     toast.success(
    //       data?.payload?.message,

    //     );
    //   } else {
    //     toast.error( data?.payload?.message)
    //   }
    // });
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
      />
    </div>
  );
}

export default AuthLogin;