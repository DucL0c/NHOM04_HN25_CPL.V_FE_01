import { memo } from "react";

interface FooterProps {
  className?: string
}

function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-white border-t mt-12 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Customer Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hỗ trợ khách hàng</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Hotline: 1900-6035</p>
              <p>(1000 đ/phút, 8-21h kể cả T7, CN)</p>
              <div className="space-y-1 mt-2">
                <p><a href="#" className="hover:underline">Các câu hỏi thường gặp</a></p>
                <p><a href="#" className="hover:underline">Gửi yêu cầu hỗ trợ</a></p>
                <p><a href="#" className="hover:underline">Hướng dẫn đặt hàng</a></p>
                <p><a href="#" className="hover:underline">Phương thức vận chuyển</a></p>
                <p><a href="#" className="hover:underline">Chính sách đổi trả</a></p>
                <p><a href="#" className="hover:underline">Hướng dẫn trả góp</a></p>
                <p><a href="#" className="hover:underline">Chính sách hàng nhập khẩu</a></p>
                <p>Hỗ trợ khách hàng: <a href="mailto:hotro@tiki.vn" className="text-blue-600">hotro@tiki.vn</a></p>
                <p>Báo lỗi bảo mật: <a href="mailto:security@tiki.vn" className="text-blue-600">security@tiki.vn</a></p>
              </div>
            </div>
          </div>

          {/* About Tiki */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Về Tiki</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><a href="#" className="hover:underline">Giới thiệu Tiki</a></p>
              <p><a href="#" className="hover:underline">Tiki Blog</a></p>
              <p><a href="#" className="hover:underline">Tuyển dụng</a></p>
              <p><a href="#" className="hover:underline">Chính sách bảo mật thanh toán</a></p>
              <p><a href="#" className="hover:underline">Chính sách bảo mật thông tin cá nhân</a></p>
              <p><a href="#" className="hover:underline">Chính sách giải quyết khiếu nại</a></p>
              <p><a href="#" className="hover:underline">Điều khoản sử dụng</a></p>
              <p><a href="#" className="hover:underline">Giới thiệu Tiki Xu</a></p>
              <p><a href="#" className="hover:underline">Tiếp thị liên kết cùng Tiki</a></p>
              <p><a href="#" className="hover:underline">Bán hàng doanh nghiệp</a></p>
              <p><a href="#" className="hover:underline">Điều kiện vận chuyển</a></p>
            </div>
          </div>

          {/* Cooperation & Partnership */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hợp tác và liên kết</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><a href="#" className="hover:underline">Quy chế hoạt động Sàn GDTMĐT</a></p>
              <p><a href="#" className="hover:underline">Bán hàng cùng Tiki</a></p>
            </div>

            <h4 className="font-semibold text-gray-900 mt-6 mb-4">Chứng nhận bởi</h4>
            <div className="flex gap-2">
              <a href="#" className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200">
                <span className="text-xs">CERT</span>
              </a>
              <a href="#" className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center hover:bg-gray-200">
                <span className="text-xs">DMCA</span>
              </a>
            </div>
          </div>

          {/* Payment & Apps */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                VISA
              </div>
              <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
              <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                JCB
              </div>
              <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">
                ATM
              </div>
              <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                COD
              </div>
              <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
                PAY
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-4">Kết nối với chúng tôi</h4>
            <div className="flex gap-2 mb-6">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500">
                <i className="fab fa-twitter"></i>
              </a>
            </div>

            <h4 className="font-semibold text-gray-900 mb-4">Tải ứng dụng trên điện thoại</h4>
            <div className="flex gap-2 mb-6">
              <a href="#" className="w-24 h-8 bg-black rounded flex items-center justify-center hover:bg-gray-800">
                <span className="text-white text-xs">App Store</span>
              </a>
              <a href="#" className="w-24 h-8 bg-green-600 rounded flex items-center justify-center hover:bg-green-700">
                <span className="text-white text-xs">Google Play</span>
              </a>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold">Dịch vụ giao hàng</p>
              <p className="text-lg font-bold text-blue-600">TIKINOW</p>
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div className="border-t pt-6 mt-8">
          <h3 className="font-semibold text-gray-900 mb-2">Công ty TNHH TIKI</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Tòa nhà số 52 Đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh</p>
            <p>
              Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh cấp lần
              đầu vào ngày 06/01/2010.
            </p>
            <p>Hotline: 1900 6035</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer);