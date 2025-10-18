import { type MenuItems } from "@/config";
import {
  BadgeCheck,
  ChartNoAxesCombined,
  CirclePlay,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
const adminSidebarMenuItesms: MenuItems[] = [
  {
    id: "dashboard",
    icon: <LayoutDashboard />,
    label: "Dashbaord",
    path: "/admin/dashboard",
  },
  {
    id: "products",
    icon: <ShoppingBasket />,
    label: "Products",
    path: "/admin/products",
  },
  {
    id: "orders",
    icon: <BadgeCheck />,
    label: "Orders",
    path: "/admin/orders",
  },
  {
    id: "features",
    icon: <CirclePlay />,
    label: "Features",
    path: "/admin/features",
  },
];
interface IMenuItemsProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IAdminSidebarProps extends IMenuItemsProps {
  open: boolean;
}
function MenuItems({ setOpen }: IMenuItemsProps) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItesms.map((menuItems: MenuItems) => {
        return (
          <div
            key={menuItems.id}
            onClick={() => {
              navigate(menuItems.path);
              setOpen?.(false);
            }}
            className="cursor-pointer flex items-center gap-2 rounded-md  px-3  py-2  text-muted-foreground hover:bg-muted hover:text-foreground text-xl"
          >
            {menuItems.icon}
            {menuItems.label}
          </div>
        );
      })}
    </nav>
  );
}
const AdminSideBar = ({ open, setOpen }: IAdminSidebarProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <SheetHeader className="border-b">
            <SheetTitle className="flex items-center gap-2 cursor-pointer mt-4">
              <ChartNoAxesCombined size={30} />
              <h1 className="text-xl font-extrabold">Admin Panel</h1>
            </SheetTitle>
          </SheetHeader>
          <MenuItems setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};
export default AdminSideBar;
