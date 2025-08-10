export interface Author {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  is_leaf: boolean;
}

export interface Seller {
  id: number;
  sku: string;
  name: string;
  link: string;
  logo: string;
  price: number;
  product_id: string;
  store_id: number;
  is_best_store: boolean;
  is_offline_installment_supported: boolean | null;
}

export interface BookImage {
  base_url: string;
  is_gallery: boolean;
  label: string | null;
  large_url: string;
  medium_url: string;
  position: number | null;
  small_url: string;
  thumbnail_url: string;
}

export interface Specification {
  name: string;
  attributes: {
    code: string;
    name: string;
    value: string;
  }[];
}

export interface Book {
  id: string;
  authors: Author[];
  book_cover: string | null;
  categories: Category;
  current_seller: Seller;
  description: string;
  images: BookImage[];
  list_price: number;
  name: string;
  original_price: number;
  quantity_sold: {
    text: string;
    value: number;
  };
  rating_average: number;
  short_description: string;
  specifications: Specification[];
}

export interface BooksResponse {
  books: Book[];
}
