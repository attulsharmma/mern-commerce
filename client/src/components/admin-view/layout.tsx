import { Outlet } from "react-router-dom"
import AdminSideBar from "./sidebar"
import AdminHeader from "./header"
const AdminLayout = () => {
  return (
    <div className="fkex min-h-screen w-full">
        {/* admin sidebar */}
        <AdminSideBar />
        <div className="flex flex-1 flex-col">
            <AdminHeader/>
            {/* admin header */}
                <main className="flex flex-1 bg-muted/40 p-4 md:p-6" />
                <Outlet/>
        </div>
    </div>
  )
}
export default AdminLayout