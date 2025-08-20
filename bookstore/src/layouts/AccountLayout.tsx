import { User, Bell, Package } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import DataService from "../services/axiosClient";

export default function AccountLayout() {
  const { user, isAuthenticated } = useAuth();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await DataService.get("/Users/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
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
    <div className="bg-[#F5F5FA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
        <span className="font-inter font-light text-sm leading-[20px] text-[#808089]">
          Trang chủ
        </span>{" "}
        &gt;{" "}
        <span className="font-inter font-light text-sm leading-[20px] text-[#38383D]">
          Đơn hàng của tôi
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:w-[250px] w-full">
            <div className="flex items-center pl-[7px] mb-3 ">
              <div className="w-[45px] mr-3 rounded-full flex-shrink-0">
                <img
                  src="https://salt.tikicdn.com/desktop/img/avatar.png"
                  alt="User Avatar"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex-1 text-[13px] leading-[15px] text-[#333333] font-light">
                Tài khoản của
                <div className="text-base leading-snug font-normal block mt-1 truncate">
                  {user?.name || "User"}
                </div>
              </div>
            </div>

            <nav className="grid grid-cols-3 gap-1 lg:flex lg:flex-col lg:h-auto">
              <NavLink
                to="/customer/account"
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center space-y-1 text-center lg:flex-row lg:justify-start lg:text-left lg:space-y-0 lg:space-x-3 w-full text-sm p-3 rounded ${
                    isActive
                      ? "bg-gray-100 font-medium text-gray-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <User className="w-4 h-4" />

                <span className="text-xs sm:text-sm">Thông tin tài khoản</span>
              </NavLink>

              <NavLink
                to="/customer/notification"
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center space-y-1 text-center lg:flex-row lg:justify-start lg:text-left lg:space-y-0 lg:space-x-3 w-full text-sm p-3 rounded ${
                    isActive
                      ? "bg-gray-100 font-medium text-gray-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <Bell className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Thông báo của tôi</span>
              </NavLink>

              <NavLink
                to="/customer/orders"
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center space-y-1 text-center lg:flex-row lg:justify-start lg:text-left lg:space-y-0 lg:space-x-3 w-full text-sm p-3 rounded ${
                    isActive
                      ? "bg-gray-100 font-medium text-gray-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <Package className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Quản lý đơn hàng</span>
              </NavLink>
            </nav>
          </aside>

          <main className="lg:col-span-3 w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}