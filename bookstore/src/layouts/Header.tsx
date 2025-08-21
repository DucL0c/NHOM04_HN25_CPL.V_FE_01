import { useState, useEffect, useRef } from "react";
import { useCartCount } from "../contexts/CartCountContext";

import { useNavigate, useLocation } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Popup from "../components/popup/Popup";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cartCount } = useCartCount(); // Ensure this is declared only once

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
    if (!user) {
      setOpenLogin(true);
    }
  };

  // Hover mở dropdown nếu đã đăng nhập, fix nháy bằng timeout và onMouseOver/onMouseOut
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const closeDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const handleAccountMouseOver = () => {
    if (user) {
      if (closeDropdownTimeout.current)
        clearTimeout(closeDropdownTimeout.current);
      setOpenDropdown(true);
    }
  };
  const handleAccountMouseOut = (e: React.MouseEvent) => {
    if (
      user &&
      hoverAreaRef.current &&
      !hoverAreaRef.current.contains(e.relatedTarget as Node)
    ) {
      closeDropdownTimeout.current = setTimeout(
        () => setOpenDropdown(false),
        80
      );
    }
  };

  // Hàm xử lý search: chuyển hướng sang trang search với query keyword
  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  // Xử lý Enter trong input
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="w-full bg-white shadow leading-4">
      <div
        className="flex flex-col sm:flex-row items-center justify-center
         gap-2 sm:gap-3
         px-3 py-2 sm:px-4 sm:py-3
         bg-[#EFFFF4] text-xs sm:text-sm"
      >
        <div className="text-center sm:text-left text-[#00AB56] font-semibold leading-4">
          Freeship đơn từ 45k, giảm nhiều hơn cùng
        </div>

        {/* ảnh tự co theo chiều cao, giữ tỉ lệ */}
        <img
          src="/Header/FreeShipImg.png"
          alt="Freeship"
          className="h-4 sm:h-5 w-auto object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div
        className="container flex items-start gap-x-12"
        style={{
          width: 1440,
          margin: "0px 220px",
          padding: "8px 24px",
        }}
      >
        {/* Logo */}
        <div className="flex items-center h-full">
          <a
            href="/"
            className="w-[96px] flex flex-col items-center tiki-logo"
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
              className="font-semibold mt-2 w-full block text-center cursor-pointer"
              style={{ color: "rgb(0,62,161)" }}
            >
              Tốt & Nhanh
            </span>
          </a>
        </div>

        {/* Wrapper */}
        <div className="flex-1 flex flex-col gap-x-2 gap-y-2 text-[14px]">
          <div className="flex items-center justify-between h-[40px] relative z-2">
            {/* Searchbar */}
            <div className="flex items-center bg-white border border-gray-300 rounded-[10px] overflow-hidden h-10 font-inter text-[14px] leading-[16.1px] flex-grow box-border relative shadow-sm">
              <span className="pl-3 flex items-center">
                <img
                  className="w-5 h-5 opacity-60"
                  src="/Header/IconSearch.png"
                  alt="icon-search"
                  width={20}
                  height={20}
                />
              </span>
              <input
                data-view-id="main_search_form_input"
                type="text"
                placeholder="Túi rác Inochi 79k/8 cuộn"
                className="flex-1 px-2 bg-transparent outline-none placeholder:text-gray-400 text-gray-900"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <button
                data-view-id="main_search_form_button"
                className="h-[70%] px-4 flex items-center font-medium text-[#1A73E8] border-0 outline-none bg-transparent border-l border-gray-300 hover:bg-blue-50 transition-colors duration-150 cursor-pointer text-sm"
                onClick={handleSearch}
              >
                Tìm kiếm
              </button>
            </div>

            {/* Icons */}
            <div className="ml-6 flex items-center text-gray-700 justify-end box-border">
              {/* Home */}
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded ${
                  pathname === "/" ? "hover:bg-blue-300" : "hover:bg-gray-200"
                } cursor-pointer ${
                  pathname === "/" ? "text-blue-600" : "text-gray-500"
                }`}
                onClick={() => navigate("/")}
                type="button"
              >
                <img
                  src={
                    pathname === "/"
                      ? "/Header/Wrapper/HomeBlue.png"
                      : "/Header/Wrapper/Home.png"
                  }
                  alt="home"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-sm">Trang chủ</span>
              </button>

              {/* User */}
              <div
                className="relative"
                ref={hoverAreaRef}
                onMouseOver={handleAccountMouseOver}
                onMouseOut={handleAccountMouseOut}
              >
                <button
                  ref={accountBtnRef}
                  onClick={handleAccountClick}
                  className={`flex items-center gap-1 px-4 py-2 rounded ${
                    pathname === "/customer/account"
                      ? "hover:bg-blue-300"
                      : "hover:bg-gray-200"
                  } cursor-pointer ${
                    pathname === "/customer/account"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                  type="button"
                >
                  <img
                    src={
                      pathname === "/customer/account"
                        ? "/Header/Wrapper/AccountBlue.png"
                        : "/Header/Wrapper/Account.png"
                    }
                    alt="account"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span className="text-sm">{"Tài khoản"}</span>
                </button>

                {user && openDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-2 z-50 cursor-pointer box-border border border-[#EFEFEF]"
                  >
                    <button
                      onClick={() => {
                        navigate("customer/account");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                      type="button"
                    >
                      Thông tin tài khoản
                    </button>
                    <button
                      onClick={() => {
                        navigate("customer/orders");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                      type="button"
                    >
                      Đơn hàng của tôi
                    </button>
                    <button
                      onClick={() => {
                        navigate("/support");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                      type="button"
                    >
                      Trung tâm hỗ trợ
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                        setOpenDropdown(false);
                        // setTimeout(() => window.location.reload(), 0);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
                      type="button"
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
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center gap-1 p-0 rounded cursor-pointer"
                type="button"
              >
                <div className="h-6 border-l border-gray-300"></div>
                <div className="w-10 h-[80%] flex items-center justify-center hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                  <img
                    src="/Header/Wrapper/Cart.png"
                    alt="cart"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {cartCount}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap gap-x-3 gap-y-3 text-gray-500">
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

      {/* Sub Banner */}
      {pathname === "/" && (
        <div className="hidden md:block w-full border-t border-gray-200">
          <div className="w-full max-w-[1440px] mx-auto px-4">
            <div className="flex items-center py-2 text-gray-700 text-sm font-medium gap-2">
              <span className="px-2 py-1 font-semibold text-blue-900 whitespace-nowrap mr-2 shrink-0">
                Cam kết
              </span>

              <span className="h-4 w-px bg-gray-200 mx-1 shrink-0" />

              {[
                {
                  icon: "/Header/Subheading/icon-0.png",
                  text: "100% hàng thật",
                },
                {
                  icon: "/Header/Subheading/icon-1.png",
                  text: "Freeship mọi đơn",
                },
                {
                  icon: "/Header/Subheading/icon-2.png",
                  text: "Hoàn 200% nếu hàng giả",
                },
                {
                  icon: "/Header/Subheading/icon-3.png",
                  text: "30 ngày đổi trả",
                },
                {
                  icon: "/Header/Subheading/icon-4.png",
                  text: "Giao nhanh 2h",
                },
                { icon: "/Header/Subheading/icon-5.png", text: "Giá siêu rẻ" },
              ].map((item, idx, arr) => (
                <div key={item.text} className="flex items-center">
                  <div className="flex items-center gap-1 px-2 py-1 whitespace-nowrap shrink-0">
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt="icon"
                        className="w-4 h-4 object-contain"
                        loading="lazy"
                      />
                    )}
                    <span>{item.text}</span>
                  </div>

                  {/* Separator */}
                  {idx !== arr.length - 1 && (
                    <span className="h-4 w-px bg-gray-200 mx-1 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
