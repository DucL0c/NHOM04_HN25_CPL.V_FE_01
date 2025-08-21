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
  // --- RESPONSIVE STATE ---
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cartCount } = useCartCount();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountBtnRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      setOpenLogin(false);
      setOpenDropdown(false);
    }
  }, [user]);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
      // Close login popup
      if (
        openLogin &&
        popupRef.current &&
        !popupRef.current.contains(e.target as Node)
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

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  // --- MOBILE MENU NAVIGATION ---
  const handleMobileNav = (path: string) => {
      navigate(path);
      setIsMenuOpen(false);
  }

  return (
    <header className="w-full bg-white shadow leading-4">
      {/* Top Banner - Unchanged */}
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

      {/* --- RESPONSIVE: Replaced inline style with Tailwind classes for responsiveness --- */}
      <div className="container mx-auto px-4 lg:px-6 py-2 lg:w-[1440px]">
        <div className="flex flex-wrap items-center justify-between lg:flex-nowrap lg:gap-x-12">
          {/* --- RESPONSIVE: Hamburger Menu Icon (Mobile Only) --- */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-4 6h4" />
              </svg>
            </button>
          </div>
          
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="w-[96px] flex flex-col items-center tiki-logo"
              aria-label="Về trang chủ"
            >
              <img
                src="/Header/TikiImage.png"
                alt="tiki-logo"
                width={96}
                height={40}
              />
              <span
                className="font-semibold mt-2 w-full block text-center cursor-pointer text-[rgb(0,62,161)]"
              >
                Tốt & Nhanh
              </span>
            </a>
          </div>

          {/* --- RESPONSIVE: Mobile Cart and Spacer --- */}
          {/* This cart icon is only for mobile view to keep it on the top right */}
          <div className="lg:hidden flex items-center">
             <button
                onClick={() => navigate("/cart")}
                className="relative p-2"
              >
                <img src="/Header/Wrapper/Cart.png" alt="cart" width={24} height={24} />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {cartCount}
                </span>
              </button>
          </div>

          {/* Wrapper for search and icons */}
          {/* --- RESPONSIVE: Full width on mobile, auto width on desktop --- */}
          <div className="w-full lg:flex-1 flex flex-col gap-y-2 text-[14px] order-3 lg:order-2 mt-2 lg:mt-0">
            <div className="flex items-center justify-between h-[40px] relative">
              {/* Searchbar */}
              <div className="flex items-center bg-white border border-gray-200 rounded overflow-hidden h-10 flex-grow">
                <img
                  className="icon-search ml-3 mr-2 w-5 h-5"
                  src="/Header/IconSearch.png"
                  alt="icon-search"
                />
                <input
                  type="text"
                  placeholder="Freeship đơn từ 45k"
                  className="flex-1 py-2 bg-transparent outline-none"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
                <button
                  className="h-full px-4 flex items-center font-medium text-[#1A73E8] border-l border-[#E3E3E3] hover:bg-gray-50"
                  onClick={handleSearch}
                >
                  Tìm kiếm
                </button>
              </div>

              {/* --- RESPONSIVE: Desktop Icons (Hidden on Mobile) --- */}
              <div className="hidden lg:flex ml-6 items-center text-gray-700 justify-end">
                {/* Home */}
                <button
                  className={`flex items-center gap-1 px-4 py-2 rounded ${
                    pathname === "/" ? "hover:bg-blue-300 text-blue-600" : "hover:bg-gray-200 text-gray-500"
                  }`}
                  onClick={() => navigate("/")}
                >
                  <img
                    src={pathname === "/" ? "/Header/Wrapper/HomeBlue.png" : "/Header/Wrapper/Home.png"}
                    alt="home"
                    width={24}
                    height={24}
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
                      pathname === "/customer/account" ? "hover:bg-blue-300 text-blue-600" : "hover:bg-gray-200 text-gray-500"
                    }`}
                  >
                    <img
                      src={pathname === "/customer/account" ? "/Header/Wrapper/AccountBlue.png" : "/Header/Wrapper/Account.png"}
                      alt="account"
                      width={24}
                      height={24}
                    />
                    <span className="text-sm">{"Tài khoản"}</span>
                  </button>

                  {user && openDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg py-2 z-50 cursor-pointer border border-[#EFEFEF]"
                    >
                      <button onClick={() => navigate("customer/account")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Thông tin tài khoản</button>
                      <button onClick={() => navigate("customer/orders")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Đơn hàng của tôi</button>
                      <button onClick={() => navigate("/support")} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Trung tâm hỗ trợ</button>
                      <button onClick={() => { logout(); navigate("/"); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Đăng xuất</button>
                    </div>
                  )}
                </div>

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
                    />
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                      {cartCount}
                    </span>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Row 2 - Categories */}
            {/* --- RESPONSIVE: Hidden on mobile --- */}
            <div className="hidden lg:flex flex-wrap gap-x-3 gap-y-3 text-gray-500">
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
      </div>
      
      {/* --- RESPONSIVE: Mobile Menu (Off-canvas) --- */}
      {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
              {/* Backdrop */}
              <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsMenuOpen(false)}></div>
              
              {/* Menu Content */}
              <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 z-60">
                  <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-gray-500">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                       </svg>
                  </button>

                  <h2 className="text-lg font-bold mb-4">Menu</h2>
                  
                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-2">
                     <button onClick={() => handleMobileNav("/")} className="text-left p-2 hover:bg-gray-100 rounded">Trang chủ</button>
                     {user ? (
                        <>
                           <button onClick={() => handleMobileNav("/customer/account")} className="text-left p-2 hover:bg-gray-100 rounded">Tài khoản của tôi</button>
                           <button onClick={() => handleMobileNav("/customer/orders")} className="text-left p-2 hover:bg-gray-100 rounded">Đơn hàng</button>
                           <button onClick={() => { logout(); setIsMenuOpen(false); navigate("/"); }} className="text-left p-2 hover:bg-gray-100 rounded">Đăng xuất</button>
                        </>
                     ) : (
                        <button onClick={() => { setOpenLogin(true); setIsMenuOpen(false); }} className="text-left p-2 hover:bg-gray-100 rounded">Đăng nhập</button>
                     )}
                     <hr className="my-2"/>
                     <h3 className="text-md font-semibold mt-2 mb-2 px-2">Danh mục</h3>
                      <button onClick={() => handleMobileNav("/category/dien-gia-dung")} className="text-left p-2 hover:bg-gray-100 rounded text-gray-600">Điện gia dụng</button>
                      <button onClick={() => handleMobileNav("/category/xe-co")} className="text-left p-2 hover:bg-gray-100 rounded text-gray-600">Xe cộ</button>
                      <button onClick={() => handleMobileNav("/category/me-be")} className="text-left p-2 hover:bg-gray-100 rounded text-gray-600">Mẹ & bé</button>
                      {/* ... Add other categories as needed ... */}
                  </nav>
              </div>
          </div>
      )}

      {/* Login Popup - Unchanged */}
      <Popup
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        width={768}
        className="rounded-2xl overflow-hidden bg-white shadow-2xl"
      >
        <LoginPage onSuccess={() => setOpenLogin(false)} />
      </Popup>
      
      {/* Bottom bar - Container is now responsive */}
      {pathname === "/" && (
        <div className="w-full flex items-center py-2 box-border border-t border-gray-200">
          <div className="container mx-auto px-4 lg:px-6 lg:w-[1440px] flex items-center text-blue-600 cursor-pointer text-sm">
            <span className="block box-border text-sm font-semibold text-blue-900 whitespace-nowrap">
              Cam Kết
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;