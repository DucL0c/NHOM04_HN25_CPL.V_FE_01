import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div className="flex">
    {/* <AdminSidebar /> */}
    <div className="flex-1 p-4">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
