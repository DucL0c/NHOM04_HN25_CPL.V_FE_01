import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import Pagination from "./Pagination";
import dataService from "../../services/dataService";
import type { Book } from "../../store/types/book.types";

const LIMIT = 12;
const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Lấy tổng số sách để tính tổng số trang
        const totalRes = await dataService.get<Book[]>("/books");
        const total = Array.isArray(totalRes) ? totalRes.length : Array.isArray(totalRes?.data) ? totalRes.data.length : 0;
        setTotalPages(Math.max(1, Math.ceil(total / LIMIT)));

        // Lấy sách cho trang hiện tại
        const response = await dataService.get<Book[]>("/books", { _page: currentPage, _limit: LIMIT });
        if (Array.isArray(response)) {
          setBooks(response);
        } else if (Array.isArray(response?.data)) {
          setBooks(response.data);
        } else {
          setBooks([]);
        }
      } catch {
        setBooks([]);
      }
    };
    fetchBooks();
  }, [currentPage]);

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
