// src/services/bookService.ts
import dataService from "./dataService";

type BEBook = {
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
    reviewId: number;
    rating: number;
    comment: string;
    reviewDate: string;
    user: {
      userId: number;
      fullName: string;
      nickName?: string | null;
      email?: string | null;
    };
  }>;
  category?: { categoryId: number; name: string; isLeaf?: boolean };
};

export type FEBook = {
  id: string;
  name: string;
  authors: Array<{ id: number; name: string; slug: string }>;
  images: Array<{ base_url: string; large_url: string; medium_url: string; thumbnail_url: string }>;
  description: string;
  short_description: string;
  list_price: number;
  original_price: number;
  current_seller: { id: number; name: string; logo: string; price: number; sku: string };
  rating_average: number;
  quantity_sold: { text: string; value: number };
  categories: { id: number; name: string; is_leaf?: boolean };
  specifications: Array<{ name: string; value: string }>;
  // ✅ reviews từ backend
  reviews: Array<{
    id: number;
    rating: number;
    comment: string;
    date: string;
    user: { id: number; name: string; nickName?: string };
  }>;
};

const mapBEToFE = (b: BEBook): FEBook => {
  const best = b.bookSellers?.find((s) => s.isBestStore) || b.bookSellers?.[0];

  return {
    id: String(b.bookId),
    name: b.name,
    authors: (b.bookAuthors ?? []).map((a) => ({
      id: a.author.authorId, name: a.author.name, slug: a.author.slug || "",
    })),
    images: (b.bookImages ?? []).map((img) => ({
      base_url: img.baseUrl || "", large_url: img.largeUrl || "",
      medium_url: img.mediumUrl || "", thumbnail_url: img.thumbnailUrl || "",
    })),
    description: b.description || "",
    short_description: b.shortDescription || "",
    list_price: b.listPrice ?? 0,
    original_price: b.originalPrice ?? 0,
    current_seller: best
      ? {
          id: best.seller?.sellerId ?? best.id ?? 0,
          name: best.seller?.name || "Seller",
          logo: best.seller?.logo || "",
          price: best.price ?? 0,
          sku: best.sku || "",
        }
      : { id: 0, name: "Seller", logo: "", price: 0, sku: "" },
    rating_average: b.ratingAverage ?? 0,
    quantity_sold: { text: b.quantitySold?.text || "", value: b.quantitySold?.value ?? 0 },
    categories: b.category
      ? { id: b.category.categoryId, name: b.category.name, is_leaf: !!b.category.isLeaf }
      : { id: 0, name: "", is_leaf: false },
    specifications: (b.bookSpecifications ?? []).map((s) => ({ name: s.specName, value: s.specValue })),
    // ✅ map reviews
    reviews: (b.productReviews ?? []).map((r) => ({
      id: r.reviewId,
      rating: r.rating,
      comment: r.comment,
      date: r.reviewDate,
      user: { id: r.user.userId, name: r.user.fullName, nickName: r.user.nickName || undefined },
    })),
  };
};

export const getBookById = async (id: string): Promise<FEBook> => {
  const raw = await dataService.get<BEBook>(`/api/book/byId/${id}`);
  return mapBEToFE(raw);
};
