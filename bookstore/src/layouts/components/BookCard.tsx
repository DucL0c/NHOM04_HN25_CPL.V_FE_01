import React from "react";
import type { Book } from "../../store/types/book.types";
import RatingStars from "./RatingStars";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const discountPercent =
    book.current_seller?.price && book.original_price
      ? Math.round(
          100 - (book.current_seller.price / book.original_price) * 100
        )
      : 0;

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg max-w-xs w-full">
      {/* Phần ảnh + AD */}
      <div className="relative w-full bg-gray-50 flex items-center justify-center">
        <img
          src={book.images?.at(0)?.thumbnail_url}
          alt={book.name}
          className="max-h-full max-w-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-[#F5F5FA] text-white text-[10px] font-bold px-1 py-0.5 rounded">
          <span className="text-[10px] font-bold text-[#27272A] leading-0">AD</span>
        </div>
      </div>

      {/* Nội dung */}
      <div className="relative h-[263px] px-3">
        {/* Giá và giảm giá */}
        <div className="flex items-center gap-2">
          <div>
            <span className="text-[#FF424E] text-lg font-semibold">
              {book.current_seller?.price?.toLocaleString()}
            </span>
            <span className="text-[#FF424E] text-[13px] font-semibold align-super">
              ₫
            </span>
          </div>
          {discountPercent > 0 && (
            <span className="bg-[#F5F5FA] text-[#27272A] text-xs font-medium rounded px-1">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Tác giả */}
        <div className="text-[#808089] text-xs mt-1">
          {book.authors
            ?.map((author) => author.name.toUpperCase())
            .join(", ") || null}
        </div>

        {/* Tiêu đề sách */}
        <div className="font-normal text-sm text-[#27272A] leading-5 line-clamp-2">
          {book.name}
        </div>

        {/* Đánh giá + Đã bán */}
        <div className="flex items-center gap-1 text-[#808089] text-xs mt-1">
          {book.rating_average ? (
            <RatingStars rating={book.rating_average} />
          ) : null}
          {book.quantity_sold?.value && (
            <span>Đã bán {book.quantity_sold?.value}</span>
          )}
        </div>

        {/* Ngày giao hàng */}
        <div className="absolute w-[252px] bottom-1 border-t border-[#EBEBF0]">
          <p className="text-[#808089] text-xs m-1">Giao thứ 3, 01/04</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
