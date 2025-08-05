import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded shadow">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;
