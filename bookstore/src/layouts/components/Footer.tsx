import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content/80 text-sm mt-10 border-t">
      {/* Top links */}
      <div className="container px-[15px] mx-auto py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Support */}
        <div>
          <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">Hỗ trợ khách hàng</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>
              Hotline: <a className="font-semibold text-black" href="tel:19006035">1900-6035</a>
            </li>
            <li className="text-xs">(1000 đ/phút, 8-21h kể cả T7, CN)</li>
            <li><Link className="link link-hover" to="#">Các câu hỏi thường gặp</Link></li>
            <li><Link className="link link-hover" to="#">Gửi yêu cầu hỗ trợ</Link></li>
            <li><Link className="link link-hover" to="#">Hướng dẫn đặt hàng</Link></li>
            <li><Link className="link link-hover" to="#">Phương thức vận chuyển</Link></li>
            <li><Link className="link link-hover" to="#">Chính sách kiểm hàng</Link></li>
            <li><Link className="link link-hover" to="#">Chính sách đổi trả</Link></li>
            <li><Link className="link link-hover" to="#">Hướng dẫn trả góp</Link></li>
            <li><Link className="link link-hover" to="#">Chính sách hàng nhập khẩu</Link></li>
            <li>Hỗ trợ khách hàng: <a className="link" href="mailto:hotro@tiki.vn">hotro@tiki.vn</a></li>
            <li>Báo lỗi bảo mật: <a className="link" href="mailto:security@tiki.vn">security@tiki.vn</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">Về Bookstore</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li><Link className="link link-hover" to="#">Giới thiệu Bookstore</Link></li>
            <li><Link className="link link-hover" to="#">Blog Bookstore</Link></li>
            <li><Link className="link link-hover" to="#">Tuyển dụng</Link></li>
            <li><Link className="link link-hover" to="#">Chính sách bảo mật thanh toán</Link></li>
            <li><Link className="link link-hover" to="#">Chính sách bảo mật thông tin cá nhân</Link></li>
            <li><Link className="link link-hover" to="#">Chính sách giải quyết khiếu nại</Link></li>
            <li><Link className="link link-hover" to="#">Điều khoản sử dụng</Link></li>
            <li><Link className="link link-hover" to="#">Giới thiệu Bookstore Xu</Link></li>
            <li><Link className="link link-hover" to="#">Tiếp thị liên kết cùng Bookstore</Link></li>
            <li><Link className="link link-hover" to="#">Bán hàng doanh nghiệp</Link></li>
            <li><Link className="link link-hover" to="#">Điều kiện vận chuyển</Link></li>
          </ul>
        </div>

        <div>
          {/* Partnership */}
          <div>
            <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">Hợp tác & liên kết</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link className="link link-hover" to="#">Quy chế hoạt động Sàn GDTMĐT</Link></li>
              <li><Link className="link link-hover" to="#">Bán hàng cùng Tiki</Link></li>
            </ul>
          </div>
          {/* Certification */}
          <div>
            <h3 className="text-base font-medium leading-6 text-gray-800 mt-6 mb-3">Chứng nhận bởi</h3>
            
          </div>
        </div>

        {/* Payment */}
        <div>
          <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">Phương thức thanh toán</h3>
          <div className="flex flex-wrap gap-2 text-gray-500">
            {['VISA','Master','JCB','ATM','MoMo','ZaloPay','VNPay'].map((t)=> (
              <span key={t} className="badge border-base-300">{t}</span>
            ))}
          </div>
          <h4 className="text-base font-medium leading-6 text-gray-800 mt-6 mb-3">Dịch vụ giao hàng</h4>
          <div className="badge text-gray-500">FAST</div>
        </div>

        {/* Social */}
        <div>
          <div>
            <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">Kết nối với chúng tôi</h3>
            <div className="flex items-center gap-3">
              <a className="btn btn-circle btn-ghost" aria-label="Facebook">📘</a>
              <a className="btn btn-circle btn-ghost" aria-label="YouTube">▶️</a>
              <a className="btn btn-circle btn-ghost" aria-label="Zalo">💬</a>
            </div>
          </div>

          {/* Apps */}
          <div>
            <h3 className="text-base font-medium leading-6 text-gray-800 mt-6 mb-3">Tải ứng dụng</h3>
            <div className="grid grid-cols-2 gap-3 items-center">
              <div className="aspect-square bg-base-300 rounded flex items-center justify-center">QR</div>
              <div className="space-y-2">
                <a className="btn btn-sm btn-outline w-full">App Store</a>
                <a className="btn btn-sm btn-outline w-full">Google Play</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container h-px bg-gray-800 mx-auto"></div>

      {/* Company info */}
      <div className="container px-[15px] mx-auto pt-4 pb-4 leading-4 text-xs">
        <h4 className="text-base font-medium leading-6 text-gray-800 mb-3">Công ty TNHH TI KI</h4>
        <p className="mt-1 leading-6 text-gray-500">
          Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh
        </p>
        <p className="mt-1 leading-6 text-gray-500">
          Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.
        </p>
        <p>Hotline: <a href="tel:19006035" className="link">1900 6035</a></p>
      </div>

      <div className="container h-px bg-gray-800 mx-auto"></div>

      {/* Brands */}
      <div className="container px-[15px] mx-auto py-6 text-xs">
        <h4 className="text-base font-medium leading-6 text-gray-800 mb-3">Thương hiệu nổi bật</h4>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {"vascara / dior / estee lauder / barbie / skechers / kindle / wacom / olay / similac / comfort / bitas".split("/").map((s, i)=> (
            <span key={i} className="text-gray-500">{s.trim()}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
