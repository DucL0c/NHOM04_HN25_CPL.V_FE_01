import { useEffect, useState } from "react";
import type { Book } from "../../store/types/book.types";
import DataService from "../../services/axiosClient";


const BestSellingProducts = () => {
  const [products, setProducts] = useState<Book[]>([]);

  useEffect(() => {
    // Fetch or update products here
    const fetchProducts = async () => {
      const res = await DataService.get<Book[]>("/books", {
        params: {
          _sort: "quantity_sold.value",
          _order: "desc",
          _limit: 10,
        },
      });
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h2 className="text-xl mb-3">
        Top Bán Chạy Sản Phẩm Nhà Sách Tiki
      </h2>
      <ul className="space-y-2 px-2">
        {products.map((product, index) => (
          <li
            key={index}
            className="flex justify-between items-center text-sm border-b border-gray-100 pb-1 last:border-none"
          >
            <div className="flex items-start gap-2">
              <span className="text-gray-600">{index + 1}.</span>
              {product.id ? (
                <a
                  href="#"
                  className="text-blue-700 hover:underline"
                  target="_blank"
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
                {product.current_seller?.price?.toLocaleString()}
              </span>
              <span className="text-black text-sm align-super">
                ₫
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestSellingProducts;
