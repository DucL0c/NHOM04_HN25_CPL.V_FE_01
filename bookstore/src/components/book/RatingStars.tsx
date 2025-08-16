// 
import React from "react";

interface RatingStarsProps {
  rating: number; // ví dụ 4.8
}

const StarIcon: React.FC<{ fillPercent: number }> = ({ fillPercent }) => {
  const gold = "#f5a623";
  const gray = "#e0e0e0";

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`grad-${fillPercent}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${fillPercent}%`} stopColor={gold} />
          <stop offset={`${fillPercent}%`} stopColor={gray} />
        </linearGradient>
      </defs>
      <path
        fill={`url(#grad-${fillPercent})`}
        d="M12 2.5 
           c0.3 0 0.6 0.15 0.75 0.45 
           l2.28 4.62 5.1 0.74 
           c0.66 0.1 0.92 0.9 0.44 1.36 
           l-3.7 3.6 0.87 5.08 
           c0.11 0.65 -0.57 1.15 -1.15 0.84 
           L12 17.77 7.41 19.75 
           c-0.58 0.31 -1.26 -0.19 -1.15 -0.84 
           l0.87-5.08 -3.7-3.6 
           c-0.48-0.46 -0.22-1.26 0.44-1.36 
           l5.1-0.74 2.28-4.62 
           C11.4 2.65 11.7 2.5 12 2.5z"
      />
    </svg>
  );
};

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const fraction = rating - fullStars;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        if (index < fullStars) {
          return <StarIcon key={index} fillPercent={100} />;
        } else if (index === fullStars && fraction > 0) {
          return <StarIcon key={index} fillPercent={fraction * 100} />;
        } else {
          return <StarIcon key={index} fillPercent={0} />;
        }
      })}
    </div>
  );
};

export default RatingStars;
