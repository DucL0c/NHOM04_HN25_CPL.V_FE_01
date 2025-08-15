import React from "react";

interface Book {
  img: string;
  discount: number;
}

export interface BannerCardProps {
  logo: string;
  title: string;
  sponsor: string;
  rating: number;
  books: Book[];
}

const BannerCard: React.FC<BannerCardProps> = ({
  logo,
  title,
  sponsor,
  rating,
  books,
}) => {
  return (
    <div className="bg-white rounded-lg shadow flex h-[186px] w-full overflow-hidden">
      {/* Logo */}
      <div
        className="flex items-center justify-center w-[186px] h-full"
        style={{
          background: "radial-gradient(circle,#fff 0%,#3f7250 40%,#a8d5bf 100%)",
          boxShadow: "0 0 24px rgba(0,0,0,0.15)",
        }}
      >
        <img
          src={logo}
          alt="logo"
          className="w-[110px] h-[110px] object-contain"
          style={{
            boxShadow: "0 0 16px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center flex-1 h-full px-2.5">
        <div className="font-semibold text-lg mb-1 text-gray-900 leading-tight">
          {title}
        </div>
        <div className="text-sm text-gray-600 mb-3 flex items-center">
          Tài trợ bởi <span className="font-bold ml-1">{sponsor}</span>
          <span className="ml-2 flex items-center text-yellow-500 font-semibold">
            {rating}/5
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-4 h-4 ml-1"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
            </svg>
          </span>
        </div>

        {/* Book list */}
        <div className="flex gap-3">
          {books.map((book, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={book.img}
                  alt="book"
                  className="w-14 h-20 object-cover rounded"
                />
                {book.discount > 0 && (
                  <span className="absolute bottom-1 right-1 bg-red-500 text-white text-[10px] px-1 rounded">
                    -{book.discount}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
