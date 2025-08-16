import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Popup from "../components/popup/Popup";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountBtnRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      setOpenLogin(false);
      setOpenDropdown(false); 
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Close dropdown if clicked outside
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !accountBtnRef.current?.contains(e.target as Node)
      ) {
        setOpenDropdown(false);
      }

      if (
        openLogin &&
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        !accountBtnRef.current?.contains(e.target as Node)
      ) {
        setOpenLogin(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openLogin]);

  const handleAccountClick = () => {
    if (user) {
      setOpenDropdown((v) => !v);
    } else {
      setOpenLogin(true);
    }
  };

  return (
    <header className="w-full bg-white shadow">
      <div className="container mx-auto flex items-start px-4 py-3 gap-x-12">
        {/* Logo */}
        <div className="w-[120px] flex flex-col items-center">
          <img src="/logo.png" alt="Tiki Logo" className="h-8 mb-1" />
          <span className="text-xs font-semibold text-blue-700">
            Tốt & Nhanh
          </span>
        </div>

        {/* Wrapper */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            {/* Searchbar */}
            <div className="flex flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Freeship đơn từ 45k"
                className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-gray-100 px-4 rounded-r border border-l-0 border-gray-300 text-blue-600 hover:bg-gray-200">
                Tìm kiếm
              </button>
            </div>

            {/* Icons */}
            <div className="ml-6 flex items-center gap-6 text-gray-700">
              {/* Home */}
              <button
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 hover:text-blue-500"
                onClick={() => navigate("/")}
              >
                <FaHome size={14} />
                <span className="text-sm">Trang chủ</span>
              </button>

              {/* User */}
              <div className="relative">
                <button
                  ref={accountBtnRef}
                  onClick={handleAccountClick}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 hover:text-blue-500"
                >
                  <FaUser size={14} />
                  <span className="text-sm">
                    {user ? user.email : "Tài khoản"}
                  </span>
                </button>

                {user && openDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    <button
                      onClick={() => {
                        navigate("/userprofile");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Thông tin tài khoản
                    </button>
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Đơn hàng của tôi
                    </button>
                    <button
                      onClick={() => {
                        navigate("/support");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Trung tâm hỗ trợ
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>

              {/* Popup login */}
              <Popup
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                width={768}
                className="rounded-2xl overflow-hidden bg-white shadow-2xl"
              >
                <LoginPage onSuccess={() => setOpenLogin(false)} />
              </Popup>

              {/* Cart */}
              <button onClick={() => navigate("/cart")} className="relative flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 hover:text-blue-500">
                <FaShoppingCart size={14} />
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex gap-4 border-t border-gray-200 pt-2 text-sm text-gray-600">
            <span>Điện gia dụng</span>
            <span>Xe cộ</span>
            <span>Mẹ & bé</span>
            <span>Khỏe đẹp</span>
            <span>Nhà cửa</span>
            <span>Sách</span>
            <span>Thể thao</span>
            <span>Muôn kiếp nhân sinh</span>
            <span>MBA bằng hình</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;