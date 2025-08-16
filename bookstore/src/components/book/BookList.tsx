import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Pagination from "../pagination/Pagination";
import axiosClient from "../../services/axiosClient";
import type { BEBook } from "../../services/bookService";

const LIMIT = 12;
export interface BookListFilter {
  now?: boolean;
  topDeal?: boolean;
  freeshipXtra?: boolean;
  minRating?: number;
}

export type BookListSort = 0| 3 | 4;

interface BookListProps {
  filter?: BookListFilter;
  sortBy?: BookListSort;
}

interface BookListState {
  page: number;
  count: number;
  totalPages: number;
  totalCount: number;
  maxPage: number;
  items: BEBook[];
}

const BookList: React.FC<BookListProps> = ({ filter, sortBy }) => {
  const [books, setBooks] = useState<BEBook[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Build params for API
        const params: any = { page: currentPage, pageSize: LIMIT, sortBy: sortBy };

        const response = await axiosClient.get<BookListState, any>("/Book/getallbypaging", { params });
        setBooks(response.items);
        setTotalPages(response.totalPages);
        console.log("Fetched books:", response.items);
      } catch {
        setBooks([]);
        console.error("Failed to fetch books");
      }
    };
    fetchBooks();
  }, [currentPage, filter, sortBy]);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {Array.isArray(books) && books.length > 0
          ? books.map((book) => <BookCard key={book.bookId} book={book} />)
          : <div className="col-span-4 text-center py-8">Không có dữ liệu sách.</div>}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
};

export default BookList;
