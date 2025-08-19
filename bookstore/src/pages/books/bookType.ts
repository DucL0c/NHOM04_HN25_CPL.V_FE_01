// FE types
export interface FEReviewUser {
  id: number;
  name: string;
  nickName?: string;
}
export interface FEReview {
  id: number;
  rating: number;
  comment: string;
  date: string;
  user: FEReviewUser;
}
export interface FESpecRow {
  name: string;
  value: string;
}
export interface FEImage {
  base_url: string;
  large_url: string;
  medium_url: string;
  thumbnail_url: string;
}
export interface FESeller {
  id: number;
  name: string;
  logo: string;
  price: number;
  sku: string;
}
export interface FEAuthor {
  id: number;
  name: string;
  slug: string;
}
export interface FECategory {
  id: number;
  name: string;
  is_leaf?: boolean;
}
export interface Book {
  id: string;
  name: string;
  authors: FEAuthor[];
  images: FEImage[];
  description: string;
  short_description: string;
  list_price: number;
  original_price: number;
  current_seller: FESeller;
  rating_average: number;
  quantity_sold: { text: string; value: number };
  categories: FECategory;
  specifications: FESpecRow[];
  reviews?: FEReview[];
}

// BE type
export type BEBook = {
  bookId: number;
  name: string;
  description: string;
  shortDescription: string;
  ratingAverage: number;
  originalPrice: number;
  listPrice: number;
  quantitySold?: { value: number; text: string };
  bookAuthors?: Array<{ author: { authorId: number; name: string; slug?: string | null } }>;
  bookImages?: Array<{
    baseUrl?: string | null; smallUrl?: string | null; mediumUrl?: string | null;
    largeUrl?: string | null; thumbnailUrl?: string | null;
  }>;
  bookSellers?: Array<{
    id?: number; sku?: string; price?: number; isBestStore?: boolean;
    seller?: { sellerId: number; name: string; logo?: string | null };
  }>;
  bookSpecifications?: Array<{ id: number; specName: string; specValue: string }>;
  productReviews?: Array<{
    reviewId: number; rating: number; comment: string; reviewDate: string;
    user: { userId: number; fullName: string; nickName?: string | null };
  }>;
  category?: { categoryId: number; name: string; isLeaf?: boolean };
};
