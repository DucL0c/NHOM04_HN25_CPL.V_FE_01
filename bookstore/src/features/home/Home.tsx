import { type FC } from "react";
// import { Button } from "../../components/Button";
// import { Spinner } from "../../components/Spinner";
// import ToastService from "../../services/notificationService";
import BookList from "../../layouts/components/BookList";
import ProductCategories from "../../layouts/components/ProductCategories";
import RatingStars from "../../layouts/components/RatingStars";

const Home: FC = () => {
  return (
    <div className="container mx-auto px-16 py-4">
      {/* <h1 className="text-3xl font-bold text-gray-800">Chào mừng đến với Bookstore!</h1>
            <p className="mt-2 mb-2 text-gray-600">Tìm kiếm và mua sách yêu thích của bạn ngay hôm nay.</p> */}

      {/* <Button variant="primary" onClick={() => ToastService.success("Success message!")}>
                Show Success Toast
            </Button>
            <Button variant="danger" onClick={() => ToastService.error("Error message!")}>
                Show Error Toast
            </Button>

            <div className="flex justify-center items-center h-screen">
                <Spinner size={48} />
            </div> */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <ProductCategories />
        </aside>
        {/* Main content */}
        <div className="lg:col-span-9 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-black font-semibold text-3xl">Nhà Sách Tiki</h2>
          </div>
          {/* Banner */}
          <div className="bg-white rounded-lg shadow p-4 h-48 flex items-center justify-center">
            <span className="text-gray-500">[Banner slider ở đây]</span>
          </div>
          {/* Danh mục nhỏ */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold mb-3">
              Khám phá theo danh mục
            </h3>
            <div className="flex flex-wrap gap-16 p-3">
              <div className="flex flex-col items-center text-center">
                <img
                  src="\images\english_book.png"
                  alt="English Books"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span className="text-sm mt-1">English Books</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="\images\sach_tv.png"
                  alt="Sách tiếng Việt"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span className="text-sm mt-1">Sách tiếng Việt</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="\images\van_phong_pham.png"
                  alt="Văn phòng phẩm"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span className="text-sm mt-1">Văn phòng phẩm</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="\images\qua_luu_niem.png"
                  alt="Quà lưu niệm"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span className="text-sm mt-1">Quà lưu niệm</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-3">
            <p className="font-semibold mb-2">Tất cả sản phẩm</p>

            <div className="flex flex-wrap items-center gap-4">
              {/* Giao siêu tốc */}
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-red-500 font-bold flex items-center">
                  NOW
                </span>
                <span>Giao siêu tốc 2H</span>
              </label>

              {/* Top deal */}
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-red-500 font-bold flex items-center">
                  👍 TOP DEAL
                </span>
                <span>Siêu rẻ</span>
              </label>

              {/* Freeship Xtra */}
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="font-bold text-blue-500">
                  FREESHIP <span className="text-green-500">XTRA</span>
                </span>
              </label>

              {/* Từ 4 sao */}
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <RatingStars rating={4} />
                <span>từ 4 sao</span>
              </label>
            </div>

            {/* Sắp xếp */}
            <div className="mt-3 flex items-center gap-2">
              <span>Sắp xếp</span>
              <select className="border rounded px-2 py-1 text-sm">
                <option>Phổ biến</option>
                <option>Giá thấp → cao</option>
                <option>Giá cao → thấp</option>
              </select>
            </div>
          </div>
          {/* BookList component will be rendered here */}
          <BookList />
        </div>
      </main>
    </div>
  );
};

export default Home;
