import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Pagination from "../pagination/Pagination";
import DataService from "../../services/axiosClient";
import type { Book } from "../../store/types/book.types";


const LIMIT = 12;
export interface BookListFilter {
  now?: boolean;
  topDeal?: boolean;
  freeshipXtra?: boolean;
  minRating?: number;
}

export type BookListSort = "popular" | "priceAsc" | "priceDesc";

interface BookListProps {
  filter?: BookListFilter;
  sort?: BookListSort;
}

const BookList: React.FC<BookListProps> = ({ filter, sort }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Build params for API
        const params: any = { _page: currentPage, _limit: LIMIT };
        if (filter?.minRating) params.rating_average_gte = filter.minRating;
        // Add more filter params if backend supports

        // Sorting
        if (sort === "priceAsc") params._sort = "current_seller.price";
        if (sort === "priceDesc") {
          params._sort = "current_seller.price";
          params._order = "desc";
        }

        // Lấy tổng số sách để tính tổng số trang
        const totalRes = await DataService.get<Book[]>("/books", { params: { rating_average_gte: filter?.minRating } });
        const total = Array.isArray(totalRes) ? totalRes.length : 0;
        setTotalPages(Math.max(1, Math.ceil(total / LIMIT)));

        // Lấy sách cho trang hiện tại
        const response = await DataService.get<Book[]>("/books", { params });
        if (Array.isArray(response)) {
          setBooks(response);
        } else {
          setBooks([]);
        }
      } catch {
        setBooks([]);
      }
    };
    fetchBooks();
  }, [currentPage, filter, sort]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {Array.isArray(books) && books.length > 0
          ? books.map((book) => <BookCard key={book.id} book={book} />)
          : <div className="col-span-4 text-center py-8">Không có dữ liệu sách.</div>}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
};

export default BookList;
