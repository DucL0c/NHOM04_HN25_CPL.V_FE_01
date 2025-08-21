import { Link } from "react-router-dom";

// Custom class cho heading của Footer
const footerHeading = "text-base font-semibold leading-6 text-gray-800 mb-3";

export default function Footer() {
  return (
    <footer className="bg-white text-base-content/80 text-xs mt-10">
      {/* Top links */}
      <div className="container p-4 mx-auto max-w-[1270px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {/* Support */}
        <div>
          <h3 className={footerHeading}>Hỗ trợ khách hàng</h3>
          <ul className="space-y-2 text-gray-500">
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
          <h3 className={footerHeading}>Về Bookstore</h3>
          <ul className="space-y-2 text-gray-500">
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
            <h3 className={footerHeading}>Hợp tác & liên kết</h3>
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
            <h3 className={footerHeading + " mt-6"}>Chứng nhận bởi</h3>
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
          <h3 className={footerHeading}>Phương thức thanh toán</h3>
          {/* Payment images grid */}
          <div className="grid grid-cols-5">
            <img
              src="https://cdn2.fptshop.com.vn/svg/visa_icon_44fe6e15ed.svg"
              alt="VISA"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/mastercard_icon_c75f94f6a5.svg"
              alt="MasterCard"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/jcb_icon_214783937c.svg"
              alt="JCB"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/amex_icon_d6fb68108d.svg"
              alt="American Express"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/vnpay_icon_f42045057d.svg"
              alt="VNPAY"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/zalopay_icon_26d64ea93f.svg"
              alt="ZaloPay"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/napas_icon_94d5330e3c.svg"
              alt="ATM"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/kredivo_icon_04f72baf36.svg"
              alt="Kredivo"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/momo_icon_baef21b5f7.svg"
              alt="MoMo"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/foxpay_icon_063b36c1f8.svg"
              alt="FoxPay"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/alepay_icon_20d5310617.svg"
              alt="AlePay"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/muadee_icon_5e297d9e61.svg"
              alt="Muadee"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/homepaylater_icon_adef600842.svg"
              alt="Home PayLater"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/applepay_icon_cb6806a0d0.svg"
              alt="Apple Pay"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/samsungpay_icon_0292aa9876.svg"
              alt="Samsung Pay"
              className="h-8 w-8 object-contain"
            />
            <img
              src="https://cdn2.fptshop.com.vn/svg/googlepay_icon_afa293cc14.svg"
              alt="Google Pay"
              className="h-8 w-8 object-contain"
            />
          </div>
          <div>
            <h4 className={footerHeading + " mt-6"}>Dịch vụ giao hàng</h4>
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
            <h3 className={footerHeading}>Kết nối với chúng tôi</h3>
            <div className="flex items-center gap-3">
              <a
                className="btn btn-circle btn-ghost"
                aria-label="Facebook"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/Footer/Social/Facebook.png"
                  alt="Facebook"
                  className="h-8 w-8 object-contain"
                />
              </a>
              <a
                className="btn btn-circle btn-ghost"
                aria-label="YouTube"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/Footer/Social/Youtube.png"
                  alt="YouTube"
                  className="h-8 w-8 object-contain"
                />
              </a>
              <a
                className="btn btn-circle btn-ghost"
                aria-label="Zalo"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/Footer/Social/Zalo.png"
                  alt="Zalo"
                  className="h-8 w-8 object-contain"
                />
              </a>
            </div>
          </div>

          {/* Apps */}
          <div>
            <h3 className={footerHeading + " mt-6"}>
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

      {/* Company info */}
      <div className="container p-4 mx-auto max-w-[1270px] leading-4">
        <div className="border-t border-gray-500"></div>
        <p className="mt-3 leading-6 text-gray-500">
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

      {/* Brands */}
      <div className="container p-4 mx-auto max-w-[1270px]">
        <div className="border-t border-gray-500"></div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
          {"vascara / dior / estee lauder / barbie / skechers / kindle / wacom / olay / similac / comfort / bitas"
            .split(" ")
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
