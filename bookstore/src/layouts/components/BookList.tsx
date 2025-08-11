import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import dataService from "../../services/dataService";
import type { Book } from "../../store/types/book.types";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await dataService.get<Book[]>("/books", {_page: 0, _limit: 12});
        // Nếu response là mảng, set luôn, nếu có .data thì lấy .data, nếu không thì set []
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
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {Array.isArray(books) && books.length > 0
        ? books.map((book) => <BookCard key={book.id} book={book} />)
        : <div className="col-span-4 text-center py-8">Không có dữ liệu sách.</div>}
    </div>
  );
};

export default BookList;
