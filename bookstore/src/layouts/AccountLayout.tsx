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
    <div className="relative w-[1270px] left-0 top-0 bottom-[847.49px] bg-[#F5F5FA] mx-auto">
      <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
        <span className="font-inter font-light text-sm leading-[20px] text-[#808089]">
          Trang chủ
        </span>{" "}
        &gt;{" "}
        <span className="font-inter font-light text-sm leading-[20px] text-[#38383D]">
          Đơn hàng của tôi
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="relative w-[250px] left-0 top-10 bottom-0">
            <div className="flex items-center pl-[7px] mb-3 ">
              <div className="w-[45px] mr-3 rounded-full">
                {/* Image has been added here */}
                <img
                  src="https://salt.tikicdn.com/desktop/img/avatar.png"
                  alt="User Avatar"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex-1 text-[13px] leading-[15px] text-[#333333] font-light">
                Tài khoản của
                <div className="text-base leading-snug font-normal block mt-1">
                  {user?.name || "User"}
                </div>
              </div>
            </div>

            <nav className="h-[692.95px] left-0 right-0 top-[57px]">
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