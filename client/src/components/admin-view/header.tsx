import { LogOut, TextAlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/auth-slice";
import { logoutUser } from "@/services/auth/auth.services";
interface IAdminHeaderProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AdminHeader = ({ setOpen }: IAdminHeaderProps) => {
  const dispatch = useDispatch();
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        className="lg:hidden sm:block cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <TextAlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={async () => {
            await logoutUser();
            dispatch(logOut());
          }}
          className="inline-flex gap-2 itesm-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
