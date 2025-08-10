interface FooterProps {
  className?: string
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`bg-white border-t mt-12 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Customer Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hỗ trợ khách hàng</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Hotline: 1900-6035</p>
              <p>(1000 đ/phút, 8-21h kể cả T7, CN)</p>
              <div className="space-y-1">
                <p>Các câu hỏi thường gặp</p>
                <p>Gửi yêu cầu hỗ trợ</p>
                <p>Hướng dẫn đặt hàng</p>
                <p>Phương thức vận chuyển</p>
                <p>Chính sách đổi trả</p>
                <p>Chính sách đổi trả</p>
                <p>Hướng dẫn trả góp</p>
                <p>Chính sách hàng nhập khẩu</p>
                <p>Hỗ trợ khách hàng: hotro@tiki.vn</p>
                <p>Báo lỗi bảo mật: security@tiki.vn</p>
              </div>
            </div>
          </div>

          {/* About Tiki */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Về Tiki</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Giới thiệu Tiki</p>
              <p>Tiki Blog</p>
              <p>Tuyển dụng</p>
              <p>Chính sách bảo mật thanh toán</p>
              <p>Chính sách bảo mật thông tin cá nhân</p>
              <p>Chính sách giải quyết khiếu nại</p>
              <p>Điều khoản sử dụng</p>
              <p>Giới thiệu Tiki Xu</p>
              <p>Tiếp thị liên kết cùng Tiki</p>
              <p>Bán hàng doanh nghiệp</p>
              <p>Điều kiện vận chuyển</p>
            </div>
          </div>

          {/* Cooperation & Partnership */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hợp tác và liên kết</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Quy chế hoạt động Sàn GDTMĐT</p>
              <p>Bán hàng cùng Tiki</p>
            </div>

            <h4 className="font-semibold text-gray-900 mt-6 mb-4">Chứng nhận bởi</h4>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs">CERT</span>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs">DMCA</span>
              </div>
            </div>
          </div>

          {/* Payment & Apps */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                VISA
              </div>
              <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs">MC</div>
              <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs">
                JCB
              </div>
              <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white text-xs">
                ATM
              </div>
              <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
                COD
              </div>
              <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center text-white text-xs">
                PAY
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-4">Kết nối với chúng tôi</h4>
            <div className="flex gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-8 bg-red-600 rounded-full"></div>
              <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            </div>

            <h4 className="font-semibold text-gray-900 mb-4">Tải ứng dụng trên điện thoại</h4>
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="w-24 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white text-xs">App Store</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-24 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Google Play</span>
                </div>
              </div>
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
