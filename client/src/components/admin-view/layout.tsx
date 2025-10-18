import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";
const AdminLayout = () => {
  const [openSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setIsOpenSidebar} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setIsOpenSidebar} />
        {/* admin header */}
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
