import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import LoginPage from "../../features/auth/LoginPage";
import RegisterPage from "../../features/auth/RegisterPage";
import Popup from "../../components/Popup";

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const accountBtnRef = useRef<HTMLButtonElement>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"login" | "register">("login");

  useEffect(() => {
    if (user) setPopupOpen(false);
  }, [user]);

  const handleSwitch = (type: "login" | "register") => {
    setPopupType(type);
  };

  return (
    <header className="w-full bg-white shadow p-2">
      <div
        className="w-[1440px] h-[72px] px-6 flex items-start gap-x-12 text-[14px]"
        style={{ marginLeft: 220, marginRight: 220 }}
      >
        {/* Logo */}
        <div className="flex items-center h-full">
          <a
            href="/"
            className="w-[96px] flex flex-col items-center tiki-logo text-[14px]"
            style={{ lineHeight: "16.1px" }}
            aria-label="Về trang chủ"
            data-view-id="header_main_logo"
          >
            <img
              src="/Header/TikiImage.png"
              alt="tiki-logo"
              width={96}
              height={40}
            />
            <span
              className="font-semibold text-[14px] mt-2 w-full block text-center cursor-pointer"
              style={{ color: "rgb(0,62,161)", lineHeight: "16.1px" }}
            >
              Tốt & Nhanh
            </span>
          </a>
        </div>
        {/* Wrapper: searchbar + icons + categories */}
        <div className="flex-1 flex flex-col">
          {/* Row 1: Searchbar + icons */}
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
                <span className="w-6 h-6 rounded-full flex items-center justify-center">
                  <FaHome size={14} />
                </span>
                <span className="text-sm">Trang chủ</span>
              </button>
              {/* User */}
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-600">
                    {user.fullName}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <>
                  {/* Nút tài khoản (trigger popup) */}
                  <button
                    ref={accountBtnRef}
                    onClick={() => setPopupOpen((v) => !v)}
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 hover:text-blue-500"
                  >
                    <span className="w-6 h-6 rounded-full flex items-center justify-center">
                      <FaUser size={14} />
                    </span>
                    <span className="text-sm">Tài khoản</span>
                  </button>
                  {/* Popup thuần TS, không dùng Flowbite */}
                  <Popup
                    open={popupOpen}
                    onClose={() => setPopupOpen(false)}
                    width={768}
                    className="rounded-2xl overflow-hidden bg-white shadow-2xl dark:bg-gray-800"
                  >
                    {popupType === "login" ? (
                      <LoginPage
                        onSuccess={() => setPopupOpen(false)}
                        onSwitch={() => handleSwitch("register")}
                      />
                    ) : (
                      <RegisterPage
                        onSuccess={() => setPopupOpen(false)}
                        onSwitch={() => handleSwitch("login")}
                      />
                    )}
                  </Popup>
                </>
              )}
              {/* Cart */}
              <button className="relative flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 hover:text-blue-500">
                <span className="w-6 h-6 rounded-full flex items-center justify-center">
                  <FaShoppingCart size={14} />
                </span>
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  0
                </span>
              </button>
            </div>
          </div>
          {/* Row 2: Categories */}
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
