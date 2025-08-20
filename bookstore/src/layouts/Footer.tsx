import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white text-base-content/80 text-sm mt-10">
      {/* Top links */}
      <div className="container px-[15px] mx-auto py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Support */}
        <div>
          <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">
            Hỗ trợ khách hàng
          </h3>
          <h3 className="text-base font-semibold leading-6 text-gray-800 mb-3">
            Hỗ trợ khách hàng
          </h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>
              Hotline:{" "}
              <a className="font-semibold text-black" href="tel:19006035">
                1900-6035
              </a>
            </li>
            <li className="text-xs">(1000 đ/phút, 8-21h kể cả T7, CN)</li>
            <li>
              <Link className="link link-hover" to="#">
                Các câu hỏi thường gặp
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Gửi yêu cầu hỗ trợ
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Hướng dẫn đặt hàng
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Phương thức vận chuyển
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Chính sách kiểm hàng
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Chính sách đổi trả
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Hướng dẫn trả góp
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Chính sách hàng nhập khẩu
              </Link>
            </li>
            <li>
              Hỗ trợ khách hàng:{" "}
              <a className="link" href="mailto:hotro@tiki.vn">
                hotro@tiki.vn
              </a>
            </li>
            <li>
              Báo lỗi bảo mật:{" "}
              <a className="link" href="mailto:security@tiki.vn">
                security@tiki.vn
              </a>
            </li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">
            Về Bookstore
          </h3>
          <h3 className="text-base font-semibold leading-6 text-gray-800 mb-3">
            Về Bookstore
          </h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>
              <Link className="link link-hover" to="#">
                Giới thiệu Bookstore
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Blog Bookstore
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Tuyển dụng
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Chính sách bảo mật thanh toán
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Chính sách bảo mật thông tin cá nhân
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Chính sách giải quyết khiếu nại
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Điều khoản sử dụng
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Giới thiệu Bookstore Xu
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Tiếp thị liên kết cùng Bookstore
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Bán hàng doanh nghiệp
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="#">
                Điều kiện vận chuyển
              </Link>
            </li>
          </ul>
        </div>

        <div>
          {/* Partnership */}
          <div>
            <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">
              Hợp tác & liên kết
            </h3>
            <h3 className="text-base font-semibold leading-6 text-gray-800 mb-3">
              Hợp tác & liên kết
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li>
                <Link className="link link-hover" to="#">
                  Quy chế hoạt động Sàn GDTMĐT
                </Link>
              </li>
              <li>
                <Link className="link link-hover" to="#">
                  Bán hàng cùng Tiki
                </Link>
              </li>
            </ul>
          </div>
          {/* Certification */}
          <div>
            <h3 className="text-base font-medium leading-6 text-gray-800 mt-6 mb-3">
              Chứng nhận bởi
            </h3>
            <h3 className="text-base font-semibold leading-6 text-gray-800 mt-6 mb-3">
              Chứng nhận bởi
            </h3>
            <div className="flex gap-2 items-center">
              <img
                src="/Footer/Certification/bo-cong-thuong-2.png"
                alt="bct2"
                className="h-8 w-auto"
              />
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                alt="bct"
                className="h-8 w-auto"
              />
              <img
                src="/Footer/Certification/dmca_protected_sml_120y.png"
                alt="dmca"
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">
            Phương thức thanh toán
          </h3>
          <h3 className="text-base font-semibold leading-6 text-gray-800 mb-3">
            Phương thức thanh toán
          </h3>
          {/* Payment images grid */}
          <div className="grid grid-cols-5 gap-2 mt-3">
            <img
              src="/payments/visa.png"
              alt="visa"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/payments/master.png"
              alt="master"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/payments/jcb.png"
              alt="jcb"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/payments/atm.png"
              alt="atm"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/payments/momo.png"
              alt="momo"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/payments/zalopay.png"
              alt="zalopay"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/payments/vnpay.png"
              alt="vnpay"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/payments/cod.png"
              alt="cod"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/payments/shopeepay.png"
              alt="shopeepay"
              className="h-8 w-8 object-contain"
            />
            <img
              src="/payments/applepay.png"
              alt="applepay"
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h4 className="text-base font-medium leading-6 text-gray-800 mt-6 mb-3">
              Dịch vụ giao hàng
            </h4>
            <h4 className="text-base font-semibold leading-6 text-gray-800 mt-6 mb-3">
              Dịch vụ giao hàng
            </h4>
            <div className="flex items-center">
              <img
                src="/Footer/TIKINOW.png"
                alt="TikiNow"
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <div>
            <h3 className="text-base font-medium leading-6 text-gray-800 mb-3">
              Kết nối với chúng tôi
            </h3>
            <h3 className="text-base font-semibold leading-6 text-gray-800 mb-3">
              Kết nối với chúng tôi
            </h3>
            <div className="flex items-center gap-3">
              <a className="btn btn-circle btn-ghost" aria-label="Facebook">
                📘
              </a>
              <a className="btn btn-circle btn-ghost" aria-label="YouTube">
                ▶️
              </a>
              <a className="btn btn-circle btn-ghost" aria-label="Zalo">
                💬
              </a>
            </div>
          </div>

          {/* Apps */}
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-800 mt-6 mb-3">
              Tải ứng dụng trên điện thoại
            </h3>
            <div className="flex items-center gap-4">
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
                alt="qr-app"
                className="h-20 w-20 object-contain"
              />
              <div className="flex flex-col gap-2">
                <a
                  href="https://apps.apple.com/vn/app/tiki-shopping-fast-shipping/id958100553"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
                    alt="App Store"
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
                    alt="Google Play"
                    className="h-10 w-auto object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container h-px bg-gray-800 mx-auto"></div>

      {/* Company info */}
      <div className="container px-[15px] mx-auto pt-4 pb-4 leading-4 text-xs">
        <h4 className="text-base font-medium leading-6 text-gray-800 mb-3">
          Công ty TNHH TI KI
        </h4>
        <p className="mt-1 leading-6 text-gray-500">
          Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí
          Minh
        </p>
        <p className="mt-1 leading-6 text-gray-500">
          Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và
          Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.
        </p>
        <p>
          Hotline:{" "}
          <a href="tel:19006035" className="link">
            1900 6035
          </a>
        </p>
      </div>

      <div className="container h-px bg-gray-800 mx-auto"></div>

      {/* Brands */}
      <div className="container px-[15px] mx-auto py-6 text-xs">
        <h4 className="text-base font-medium leading-6 text-gray-800 mb-3">
          Thương hiệu nổi bật
        </h4>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {"vascara / dior / estee lauder / barbie / skechers / kindle / wacom / olay / similac / comfort / bitas"
            .split("/")
            .map((s, i) => (
              <span key={i} className="text-gray-500">
                {s.trim()}
              </span>
            ))}
        </div>
      </div>
    </footer>
  );
}
