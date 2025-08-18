import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Popup from "../components/popup/Popup";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [keyword, setKeyword] = useState("");
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

  // Hàm xử lý search
  const handleSearch = async () => {
    try {
      const res = await axios.get("/api/Book/getallbypaging", {
        params: {
          page: 0,
          pageSize: 100,
          keyword: keyword,
        },
      });
      // TODO: Chuyển hướng sang trang kết quả hoặc hiển thị popup, tuỳ ý bạn
      // Hiện tại chỉ log ra console
      console.log("Kết quả search:", res.data);
    } catch (err) {
      console.error("Lỗi khi search:", err);
    }
  };

  // Xử lý Enter trong input
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="w-full bg-white shadow py-2 leading-[16.1px]">
      <div
        className="container flex items-start gap-x-12"
        style={{
          width: 1440,
          height: 72,
          margin: "0px 220px",
          padding: "0px 24px",
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
              className="font-normal mt-2 w-full block text-center cursor-pointer"
              style={{ color: "rgb(0,62,161)" }}
            >
              Tốt & Nhanh
            </span>
          </a>
        </div>

        {/* Wrapper */}
        <div className="flex-1 flex flex-col gap-x-2 gap-y-2 text-[14px] ml-12">
          <div className="flex items-center justify-between h-[40px] p-0 relative z-2">
            {/* Searchbar */}
            <div className="flex items-center bg-white border border-gray-300 rounded overflow-hidden h-10 font-inter text-[14px] leading-[16.1px] flex-grow box-border">
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
            <div className="ml-6 flex items-center text-gray-700">
              {/* Home */}
              <button
                className="flex items-center gap-1 px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src="/Header/Wrapper/Home.png"
                  alt="home"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-sm">Trang chủ</span>
              </button>

              {/* User */}
              <div className="relative">
                <button
                  ref={accountBtnRef}
                  onClick={handleAccountClick}
                  className="flex items-center gap-1 px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                >
                  <img
                    src="/Header/Wrapper/Account.png"
                    alt="account"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span className="text-sm">
                    {"Tài khoản"}
                  </span>
                </button>

                {user && openDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  >
                    <button
                      onClick={() => {
                        navigate("customer/account");
                        setOpenDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Thông tin tài khoản
                    </button>
                    <button
                      onClick={() => {
                        navigate("customer/orders");
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
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center gap-1 p-0 rounded hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
              >
                <div className="relative w-10 h-10 ml-6 flex items-center justify-center ">
                  <img
                    src="/Header/Wrapper/Cart.png"
                    alt="cart"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    0
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
    </header>
  );
};

export default Header;
