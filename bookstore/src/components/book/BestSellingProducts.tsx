import { useState, useEffect } from "react";
//import type { Book } from "../../store/types/book.types";
import axiosClient from "../../services/axiosClient";
import type { BEBook } from "../../services/bookService";

const BestSellingProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch or update products here
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get<BEBook[], any>(
          "/Book/getallbypaging",
          {
            params: {
              page: 0,
              pageSize: 10,
              sortBy: 1,
            },
          }
        );
        const items = res.items;
        setProducts(items);
      } catch (error) {
        console.error("Failed to fetch best selling products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="col-span-4 text-center py-8">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 border-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="text-gray-600">Đang tải dữ liệu...</span>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-md">
          <h2 className="text-xl mb-3">Top Bán Chạy Sản Phẩm Nhà Sách Tiki</h2>
          <ul className="space-y-2 px-2">
            {products.map((product: BEBook, index: number) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm border-b border-gray-100 pb-1 last:border-none"
              >
                <div className="flex items-start gap-2">
                  <span className="text-gray-600">{index + 1}.</span>
                  {product.bookId ? (
                    <a
                      href={`books/${product.bookId}`}
                      className="text-blue-700 hover:underline"
                      // target="_blank"
                      rel="noopener noreferrer"
                    >
                      {product.name}
                    </a>
                  ) : (
                    <span>{product.name}</span>
                  )}
                </div>
                <div>
                  <span className="text-black text-sm">
                    {product.bookSellers?.[0]?.price?.toLocaleString()}
                  </span>
                  <span className="text-black text-sm align-super">₫</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BestSellingProducts;
