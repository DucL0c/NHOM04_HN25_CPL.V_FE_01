import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 py-4">
      {/* Nút Previous */}
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition disabled:opacity-50 disabled:hover:bg-gray-100"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FaChevronLeft size={14} />
      </button>

      {/* Các trang */}
      {pages.map((page) => (
        <button
          key={page}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition 
            ${
              page === currentPage
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 hover:bg-blue-400 hover:text-white"
            }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Nút Next */}
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition disabled:opacity-50 disabled:hover:bg-gray-100"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
};

export default Pagination;
