import { FaSearch, FaHome, FaUser, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full bg-white shadow">
      <div className="container mx-auto flex items-start px-4 py-3 gap-x-12">
        
        {/* Logo */}
        <div className="w-[120px] flex flex-col items-center">
          <img
            src="/logo.png" // đổi link logo
            alt="Tiki Logo"
            className="h-8 mb-1"
          />
          <span className="text-xs font-semibold text-blue-700">
            Tốt & Nhanh
          </span>
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
            <div className="flex items-center gap-6 text-gray-700 ml-6">
              {/* Home */}
              <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 hover:text-blue-500">
                <span className="w-6 h-6 rounded-full flex items-center justify-center">
                  <FaHome size={14} />
                </span>
                <span className="text-sm">Trang chủ</span>
              </button>

              {/* User */}
              <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 hover:text-blue-500">
                <span className="w-6 h-6 rounded-full flex items-center justify-center">
                  <FaUser size={14} />
                </span>
                <span className="text-sm">Tài khoản</span>
              </button>

              {/* Cart */}
              <button className="relative flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 hover:text-blue-500">
                <span className="w-6 h-6 rounded-full flex items-center justify-center">
                  <FaShoppingCart size={14} />
                </span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Row 2: Categories */}
          <div className="flex gap-4 text-sm text-gray-600 border-t border-gray-200 pt-2">
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
}
