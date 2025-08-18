import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookList from "../../components/book/BookList";
import BookFilterSort from "../../components/book/BookFilterSort";
import type {
  BookListFilter,
  BookListSort,
} from "../../components/book/BookList";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [filter, setFilter] = useState<BookListFilter>({ keyword });
  const [sort, setSort] = useState<BookListSort>(0);

  // Cập nhật filter khi keyword trên URL thay đổi
  useEffect(() => {
    setFilter((f) => ({ ...f, keyword }));
  }, [keyword]);

  return (
    <>
      <div className="container mx-auto px-8 py-4 min-h-[60vh]">
        <BookFilterSort
          onChange={(f, s) => {
            setFilter({ ...f, keyword });
            setSort(s);
          }}
        />
        <BookList filter={filter} sortBy={sort} />
      </div>
    </>
  );
};

export default SearchPage;
