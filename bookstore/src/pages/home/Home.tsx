import { type FC, useState } from "react";
import BookList from "../../components/book/BookList";
import ProductCategories from "../../components/book/ProductCategories";
import Banner from "../../components/banner/Banner";
import BookFilterSort from "../../components/book/BookFilterSort";
import type { BookListFilter, BookListSort } from "../../components/book/BookList";
import BestSellingProducts from "../../components/book/BestSellingProducts";

const Home: FC = () => {
  const [filter, setFilter] = useState<BookListFilter>({});
  const [sort, setSort] = useState<BookListSort>(0);
  return (
    <div className="container mx-auto px-8 py-4">
      {/* <h1 className="text-3xl font-bold text-gray-800">Chào mừng đến với Bookstore!</h1>
            <p className="mt-2 mb-2 text-gray-600">Tìm kiếm và mua sách yêu thích của bạn ngay hôm nay.</p> */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-0">
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
          <div className="h-52">
            <Banner />
          </div>
          {/* Danh mục nhỏ */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold mb-3">
              Khám phá theo danh mục
            </h3>
            <div className="flex flex-wrap gap-20 p-3">
              <div className="flex flex-col items-center text-center">
                <img
                  src="\images\english_book.png"
                  alt="English Books"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <span className="text-sm mt-1">English Books</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="\images\sach_tv.png"
                  alt="Sách tiếng Việt"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <span className="text-sm mt-1">Sách tiếng Việt</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="\images\van_phong_pham.png"
                  alt="Văn phòng phẩm"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <span className="text-sm mt-1">Văn phòng phẩm</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="\images\qua_luu_niem.png"
                  alt="Quà lưu niệm"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <span className="text-sm mt-1">Quà lưu niệm</span>
              </div>
            </div>
          </div>
          <BookFilterSort onChange={(f, s) => { setFilter(f); setSort(s); }} />
          {/* BookList component will be rendered here */}
          <BookList filter={filter} sortBy={sort} />
        </div>
      </main>
      <BestSellingProducts />
    </div>
  );
};

export default Home;
