const bannerData = [
  {
    logo: "/images/banner.png", // Đặt đúng đường dẫn logo
    title: "Top Sách Bán Chạy",
    sponsor: "1980 Books Tại Tiki Trading",
    rating: 5,
    books: [
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg", discount: 23 },
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg", discount: 0 },
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/45/3b/fc/aa81d0a534b45706ae1eee1e344e80d9.jpg", discount: 35 },
    ],
  },
  {
    logo: "/images/banner.png",
    title: "Bộ Sưu Tập Sách Mới Giảm Đến",
    sponsor: "1980 Books Tại Tiki Trading",
    rating: 5,
    books: [
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/57/44/86/19de0644beef19b9b885d0942f7d6f25.jpg", discount: 23 },
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/22/cb/a9/524a27dcd45e8a13ae6eecb3dfacba7c.jpg", discount: 40 },
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/0b/cd/50/9c219e191737b2757911b962eeb54c2c.jpg", discount: 30 },
    ],
  },
  {
    logo: "/images/banner.png",
    title: "Sách Hay Mỗi Ngày",
    sponsor: "1980 Books Tại Tiki Trading",
    rating: 5,
    books: [
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg", discount: 20 },
      { img: "https://salt.tikicdn.com/cache/200x280/media/catalog/product/5/1/51yxa3joyxl-_sx340_bo1-204-203-200_.u547.d20161128.t081505.698314.jpg", discount: 5 },
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/e5/44/50/f2f7b7f873c54fed2ee677a283f6cbcb.jpg", discount: 35 },
    ],
  },
  {
    logo: "/images/banner.png",
    title: "Sách Tiếng Anh Hot Nhất",
    sponsor: "1980 Books Tại Tiki Trading",
    rating: 5,
    books: [
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/19/50/3b/18543018924618fbf07bf56433e8b1cd.jpg", discount: 5 },
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/52/68/61/b7d70fca1c94264fb534d639f338962f.jpg", discount: 5 },
      { img: "https://salt.tikicdn.com/cache/200x280/ts/product/9c/43/04/0fb2bfef1d5fc8861d50d8ebae279027.jpg", discount: 5 },
    ],
  }
];

import { useState } from "react";
import BannerCard from "./BannerCard";

const Banner: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const bannersPerSlide = 2;
  const totalSlides = Math.ceil(bannerData.length / bannersPerSlide);
  const startIdx = slide * bannersPerSlide;
  const visibleBanners = bannerData.slice(startIdx, startIdx + bannersPerSlide);

  return (
    <div className="relative w-full">
      {/* Nút trái */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black py-3 shadow hover:opacity-50 opacity-20 cursor-pointer"
        onClick={() => setSlide((slide - 1 + totalSlides) % totalSlides)}
        aria-label="Prev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Banner hiển thị */}
      <div className="flex gap-4 w-full justify-center">
        {visibleBanners.map((data, i) => (
          <BannerCard key={startIdx + i} {...data} />
        ))}
      </div>

      {/* Nút phải */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black py-3 shadow hover:opacity-50 opacity-20 cursor-pointer"
        onClick={() => setSlide((slide + 1) % totalSlides)}
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots navigation */}
      <div className="flex justify-center mt-3">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            className={`w-6 h-0.5 rounded-full mx-1 transition-colors ${
              i === slide ? "bg-gray-800" : "bg-gray-300"
            }`}
            onClick={() => setSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
