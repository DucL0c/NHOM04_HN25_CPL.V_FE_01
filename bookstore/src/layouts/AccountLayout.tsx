import { User, Bell, Package } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AccountLayout() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg p-8 text-center text-gray-500">
        Vui lòng đăng nhập để xem thông tin tài khoản
        <a
          href="/login"
          className="block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Đăng nhập
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Tài khoản của</div>
                <div className="font-semibold text-gray-800">
                  {user?.name || "Người dùng"}
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              <NavLink
                to="/customer/account"
                className={({ isActive }) =>
                  `flex items-center space-x-3 w-full text-sm p-3 rounded ${
                    isActive
                      ? "bg-gray-100 font-medium text-gray-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <User className="w-4 h-4" />
                <span>Thông tin tài khoản</span>
              </NavLink>

              <NavLink
                to="/customer/notification"
                className={({ isActive }) =>
                  `flex items-center space-x-3 w-full text-sm p-3 rounded ${
                    isActive
                      ? "bg-gray-100 font-medium text-gray-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <Bell className="w-4 h-4" />
                <span>Thông báo của tôi</span>
              </NavLink>

              <NavLink
                to="/customer/orders"
                className={({ isActive }) =>
                  `flex items-center space-x-3 w-full text-sm p-3 rounded ${
                    isActive
                      ? "bg-gray-100 font-medium text-gray-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <Package className="w-4 h-4" />
                <span>Quản lý đơn hàng</span>
              </NavLink>
            </nav>
          </aside>

          {/* Nội dung tab */}
          <main className="lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
