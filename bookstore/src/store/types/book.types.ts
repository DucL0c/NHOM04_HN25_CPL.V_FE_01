export interface Book {
  id: string;
  name: string;
  authors?: { id: number; name: string; slug: string }[];
  book_cover?: string | null;
  categories?: { id: number; name: string; is_leaf: boolean };
  current_seller?: {
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
  };
  description?: string;
  images?: {
    base_url: string;
    is_gallery: boolean;
    label: string | null;
    large_url: string;
    medium_url: string;
    position: number | null;
    small_url: string;
    thumbnail_url: string;
  }[];
  list_price?: number;
  original_price?: number;
  quantity_sold?: { text: string; value: number };
  rating_average?: number;
  short_description?: string;
  specifications?: {
    name: string;
    attributes: {
      code: string;
      name: string;
      value: string;
    }[];
  }[];
}
