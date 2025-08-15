import type { FC } from "react";
import { useState } from "react";
import RatingStars from "./RatingStars";
import type {
  BookListFilter,
  BookListSort,
} from "./BookList";

const BookFilterSort: FC<{
  onChange?: (filter: BookListFilter, sort: BookListSort) => void;
}> = ({ onChange }) => {
  const [filter, setFilter] = useState<BookListFilter>({});
  const [sort, setSort] = useState<BookListSort>("popular");

  const handleCheckbox =
    (key: keyof BookListFilter) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFilter = { ...filter, [key]: e.target.checked };
      setFilter(newFilter);
      onChange?.(newFilter, sort);
    };

  const handleRating = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minRating = e.target.checked ? 4 : undefined;
    const newFilter = { ...filter, minRating };
    setFilter(newFilter);
    onChange?.(newFilter, sort);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value: BookListSort = "popular";
    if (e.target.value === "Giá thấp → cao") value = "priceAsc";
    if (e.target.value === "Giá cao → thấp") value = "priceDesc";
    setSort(value);
    onChange?.(filter, value);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <p className="text-base font-semibold mb-5">Tất cả sản phẩm</p>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        {/* Giao siêu tốc */}
        <label className="flex items-center gap-1 cursor-pointer border-r border-gray-200 pr-4">
          <input
            type="checkbox"
            className="w-4 h-4 accent-red-500"
            checked={!!filter.now}
            onChange={handleCheckbox("now")}
          />
          <span className="text-red-500 font-bold">NOW</span>
          <span>Giao siêu tốc 2H</span>
        </label>

        {/* Top deal */}
        <label className="flex items-center gap-1 cursor-pointer border-r border-gray-200 pr-4">
          <input
            type="checkbox"
            className="w-4 h-4 accent-red-500"
            checked={!!filter.topDeal}
            onChange={handleCheckbox("topDeal")}
          />
          <span className="text-red-500 font-bold flex items-center gap-1">
            👍 TOP DEAL
          </span>
          <span>Siêu rẻ</span>
        </label>

        {/* Freeship Xtra */}
        <label className="flex items-center gap-1 cursor-pointer border-r border-gray-200 pr-4">
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-500"
            checked={!!filter.freeshipXtra}
            onChange={handleCheckbox("freeshipXtra")}
          />
          <span className="font-bold text-blue-500">
            FREESHIP <span className="text-green-500">XTRA</span>
          </span>
        </label>

        {/* Từ 4 sao */}
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 accent-yellow-400"
            checked={!!filter.minRating}
            onChange={handleRating}
          />
          <RatingStars rating={4} />
          <span>từ 4 sao</span>
        </label>
      </div>

      {/* Sắp xếp */}
      <div className="mt-8 mb-6 flex items-center gap-2">
        <span className="text-sm text-gray-600">Sắp xếp</span>
        <select
          className="border rounded-full px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
          value={
            sort === "popular"
              ? "Phổ biến"
              : sort === "priceAsc"
              ? "Giá thấp → cao"
              : "Giá cao → thấp"
          }
          onChange={handleSort}
        >
          <option>Phổ biến</option>
          <option>Giá thấp → cao</option>
          <option>Giá cao → thấp</option>
        </select>
      </div>
    </div>
  );
};

export default BookFilterSort;
