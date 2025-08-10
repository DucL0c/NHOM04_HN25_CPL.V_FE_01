import { MapPin, ShoppingCart, User } from "lucide-react"

interface HeaderProps {
  className?: string
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header className={`bg-white shadow-sm border-b ${className}`}>
      {/* Top banner */}
      <div className="bg-blue-50 text-center py-2 text-sm text-blue-600">
        Freeship đơn từ 45k, giảm thêu hơn cùng <span className="font-semibold">FREESHIP XTRA</span>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-blue-500 text-white px-3 py-2 rounded font-bold text-xl">TIKI</div>
            <span className="ml-2 text-sm text-gray-600">Tốt & Nhanh</span>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Freeship đơn từ 45k"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded text-sm">
                Tìm kiếm
              </button>
            </div>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <span>điện gia dụng</span>
              <span>xe cộ</span>
              <span>mẹ & bé</span>
              <span>khỏe đẹp</span>
              <span>nhà cửa</span>
              <span>sách</span>
              <span>thể thao</span>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-sm">Trang chủ</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">VIP</span>
              </div>
              <span className="text-sm">Tiki VIP</span>
            </div>

            <div className="flex items-center gap-2 text-blue-600">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-sm font-medium">Tài khoản</span>
            </div>

            <div className="relative">
              <ShoppingCart className="text-gray-600" size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <MapPin size={16} />
          <span>Giao đến:</span>
          <span className="text-gray-900">Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</span>
        </div>

        {/* Features bar */}
        <div className="flex gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <span>100% hàng thật</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Freeship mọi đơn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Hoàn 200% nếu hàng giả</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>30 ngày đổi trả</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Giao nhanh 2h</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Giá siêu rẻ</span>
          </div>
        </div>
      </div>
    </header>
  )
}
