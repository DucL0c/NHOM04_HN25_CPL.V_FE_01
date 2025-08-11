import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <-- Thêm import
import { getBooks } from "../../services/bookService";
import ToastService from "../../services/notificationService";

const BookList = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks()
      .then((data) => {
        setBooks(data);
        ToastService.success("Tải sách thành công!");
      })
      .catch(() => {
        ToastService.error("Lỗi khi tải sách");
      })
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  if (loading) return <div className="p-6">Đang tải...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Danh sách sách</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/books/${book.id}`} // <-- Thêm link đến trang chi tiết
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 block"
          >
            <div className="aspect-[3/4] mb-4 overflow-hidden rounded">
              <img
                src={book.images?.[0]?.medium_url || "/placeholder.svg?height=300&width=225"}
                alt={book.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
              {book.name}
            </h3>
            <div className="text-xs text-gray-600 mb-2">
              {book.authors?.map(author => author.name).join(", ")}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-600">
                {formatPrice(book.current_seller?.price || book.original_price)}₫
              </span>
              {book.original_price > (book.current_seller?.price || 0) && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(book.original_price)}₫
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;
