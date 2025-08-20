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
      <div className="flex items-center justify-center relative cursor-pointer bg-[#EFFFF4] text-sm px-4 py-3 gap-1">
        <div className="align-middle text-[#00AB56] font-semibold leading-4">
          Freeship đơn từ 45k, giảm nhiều hơn cùng
        </div>
        <img
          src="/Header/FreeShipImg.png"
          alt="Freeship"
          width={79}
          height={16}
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
            <div className="flex items-center bg-white border border-gray-200 rounded overflow-hidden h-10 font-inter text-[14px] leading-[16.1px] flex-grow box-border">
              <img
                className="icon-search ml-3 mr-2 w-5 h-5"
                src="/Header/IconSearch.png"
                alt="icon-search"
                width={20}
                height={20}
              />
              <input
                data-view-id="main_search_form_input"
                type="text"
                placeholder="Freeship đơn từ 45k"
                className="flex-1 py-2 bg-transparent outline-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <button
                data-view-id="main_search_form_button"
                className="h-full px-4 flex items-center font-medium text-[#1A73E8] border-0 outline-none bg-transparent border-l border-[#E3E3E3] hover:bg-gray-50"
                style={{ minWidth: 80 }}
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
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Thông tin tài khoản
                    </button>
                    <button
                      onClick={() => {
                        navigate("customer/orders");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Đơn hàng của tôi
                    </button>
                    <button
                      onClick={() => {
                        navigate("/support");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
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
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
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
                className="relative flex items-center gap-1 p-0 rounded"
              >
                <div className="relative w-10 h-10 ml-6 flex items-center justify-center hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
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
      {pathname === "/" && (
        <div className="w-full flex items-center py-2 box-border border-t border-gray-200">
          <div
            className="container flex items-center bg-transparent text-blue-600 cursor-pointer text-sm leading-4 no-underline decoration-blue-600"
            style={{
              width: 1440,
              margin: "0px 220px",
              padding: "0px 24px",
            }}
          >
            <span className=" block box-border text-sm font-semibold text-blue-900 whitespace-nowrap leading-5">
              Cam Kết
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
