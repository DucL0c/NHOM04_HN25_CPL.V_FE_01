import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import type { BEBook } from "../../services/bookService";

interface BookCardProps {
  book: BEBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const discountPercent =
    book.bookSellers?.[0]?.price && book.originalPrice
      ? Math.round(100 - (book.bookSellers[0].price / book.originalPrice) * 100)
      : 0;

  return (
    <Link to={`/books/${book.bookId}`}>
      <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg max-w-xs w-full cursor-pointer">
        {/* Phần ảnh + AD */}
        <div className="relative w-full bg-gray-50 flex items-center justify-center">
          <img
            src={book.bookImages?.[0]?.thumbnailUrl ?? undefined}
            alt={book.name ?? ""}
            className="max-h-full max-w-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-[#F5F5FA] text-white text-[10px] font-bold px-1 py-0.5 rounded">
            <span className="text-[10px] font-bold text-[#27272A] leading-0">
              AD
            </span>
          </div>
        </div>

        {/* Nội dung */}
        <div className="relative h-[263px] px-3">
          {/* Giá và giảm giá */}
          <div className="flex items-center gap-2">
            <div>
              <span className="text-[#FF424E] text-lg font-semibold">
                {book.bookSellers?.[0]?.price?.toLocaleString()}
              </span>
              <span className="text-[#FF424E] text-[13.5px] font-semibold align-super">
                ₫
              </span>
            </div>
            {discountPercent > 0 && (
              <span className="bg-[#F5F5FA] text-[#27272A] text-sm font-medium rounded px-1">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Tác giả */}
          <div className="text-[#808089] text-sm mt-1">
            {book.bookAuthors
              ?.map((author) => author.author.name.toUpperCase())
              .join(", ") || null}
          </div>

          {/* Tiêu đề sách */}
          <div className="font-normal text-base text-[#27272A] leading-5 line-clamp-3">
            {book.name}
          </div>

          {/* Đánh giá + Đã bán */}
          <div className="flex items-center gap-2 text-[#808089] text-sm mt-1">
            {book.ratingAverage ? (
              <RatingStars rating={book.ratingAverage} />
            ) : null}
            {book.quantitySold && book.quantitySold?.value > 0 ? (
              <span>{book.quantitySold?.text}</span>
            ) : null}
          </div>

          {/* Ngày giao hàng */}
          <div className="absolute w-[252px] bottom-1 border-t border-[#EBEBF0]">
            <p className="text-[#808089] text-sm m-1">Giao thứ 3, 01/04</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
