import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DataService from "../../services/axiosClient";
import ToastService from "../../services/notificationService";
import type { BEBook, Book } from "./bookType";
import {
  Star,
  ShoppingCart,
  Plus,
  Minus,
  Shield,
  RefreshCw,
  Clock,
  Eye,
  ChevronRight,
} from "lucide-react";

const mapBEToFE = (b: BEBook): Book => {
  const best = b.bookSellers?.find((s) => s.isBestStore) || b.bookSellers?.[0];
  return {
    id: String(b.bookId),
    name: b.name,
    authors: (b.bookAuthors ?? []).map((a) => ({
      id: a.author.authorId,
      name: a.author.name,
      slug: a.author.slug || "",
    })),
    images: (b.bookImages ?? []).map((img) => ({
      base_url: img.baseUrl || "",
      large_url: img.largeUrl || "",
      medium_url: img.mediumUrl || "",
      thumbnail_url: img.thumbnailUrl || "",
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
    reviews: (b.productReviews ?? []).map((r) => ({
      id: r.reviewId,
      rating: r.rating,
      comment: r.comment,
      date: r.reviewDate,
      user: { id: r.user.userId, name: r.user.fullName, nickName: r.user.nickName || undefined },
    })),
  };
};

/** ===== Skeleton (list) ===== */
const GridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-2">
        <div className="w-full h-32 bg-gray-200 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-1" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    ))}
  </div>
);

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // lists
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loadingLists, setLoadingLists] = useState(false);

  // phân trang hiển thị
  const [topPage, setTopPage] = useState(0);
  const [simPage, setSimPage] = useState(0);
  const TOP_PAGE_SIZE = 4; // 1 hàng x 4 cột
  const SIM_PAGE_SIZE = 8; // 2 hàng x 4 cột

  // Reset UI khi đổi route /books/:id
  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setShowFullDescription(false);
    // reset trang của list
    setTopPage(0);
    setSimPage(0);
  }, [id]);

  // Load chi tiết sách
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    DataService.get<BEBook, any>(`/Book/byId/${id}`)
      .then((raw) => setBook(mapBEToFE(raw)))
      .catch(() => ToastService.error("Lỗi khi tải thông tin sách"))
      .finally(() => setLoading(false));
  }, [id]);


  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoadingLists(true);
      try {
        const raw = await DataService.get<BEBook[], any>("/Book/getall");
        const mapped = (raw ?? []).map(mapBEToFE);
        console.log("[BookDetail] Loaded all books:", mapped);
        setAllBooks(mapped);
      } catch (e) {
        setAllBooks([]);
      } finally {
        setLoadingLists(false);
      }
    };
    fetchAllBooks();
  }, []);

  /** ===== Helpers ===== */
  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price);

  const calculateDiscount = () => {
    if (!book) return 0;
    if (!book.original_price || book.original_price <= 0) return 0;
    return Math.max(
      0,
      Math.round(((book.original_price - book.current_seller.price) / book.original_price) * 100)
    );
  };

  const handleQuantityChange = (delta: number) => setQuantity((prev) => Math.max(1, prev + delta));

  const handleAddToCart = () => {
    if (!book) return;
    ToastService.success(`Đã thêm ${quantity} cuốn "${book.name}" vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    if (!book) return;
    navigate("/checkout", {
      state: {
        item: {
          id: book.id,
          name: book.name,
          price: book.current_seller.price,
          image: book.images?.[0]?.thumbnail_url,
          seller: book.current_seller?.name || "Tiki",
        },
        quantity,
      },
    });
  };

  const handleOpenBook = (bookId: string | number) => {
    navigate(`/books/${bookId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** ===== Tính Top Deals & Similar ===== */
  const topDeals = useMemo(() => {
    if (!allBooks?.length) return [];
    return allBooks
      .filter((b) => b.id !== id)
      .sort((a, b) => (b.quantity_sold?.value ?? 0) - (a.quantity_sold?.value ?? 0));
  }, [allBooks, id]);

  const similarProducts = useMemo(() => {
    if (!book || !allBooks?.length) return [];
    const curSpecs = new Set(
      (book.specifications ?? []).map((s) => s.name.trim().toLowerCase())
    );
    return allBooks
      .filter((b) => b.id !== id)
      .map((b) => {
        const otherSpecs = new Set(
          (b.specifications ?? []).map((s) => s.name.trim().toLowerCase())
        );
        let score = 0;
        otherSpecs.forEach((nm) => {
          if (curSpecs.has(nm)) score += 1;
        });
        return { b, score };
      })
      .filter((x) => x.score > 0)
      .sort((x, y) => {
        if (y.score !== x.score) return y.score - x.score;
        const ys = y.b.quantity_sold?.value ?? 0;
        const xs = x.b.quantity_sold?.value ?? 0;
        return ys - xs;
      })
      .map((x) => x.b);
  }, [book, allBooks, id]);

  // phân trang cục bộ
  const topTotalPages = Math.max(1, Math.ceil(topDeals.length / TOP_PAGE_SIZE));
  const simTotalPages = Math.max(1, Math.ceil(similarProducts.length / SIM_PAGE_SIZE));

  const topVisible = useMemo(
    () => topDeals.slice(topPage * TOP_PAGE_SIZE, topPage * TOP_PAGE_SIZE + TOP_PAGE_SIZE),
    [topDeals, topPage]
  );
  const simVisible = useMemo(
    () => similarProducts.slice(simPage * SIM_PAGE_SIZE, simPage * SIM_PAGE_SIZE + SIM_PAGE_SIZE),
    [similarProducts, simPage]
  );

  const goTopPrev = () => setTopPage((p) => (p > 0 ? p - 1 : p));
  const goTopNext = () => setTopPage((p) => (p < topTotalPages - 1 ? p + 1 : p));

  const goSimPrev = () => setSimPage((p) => (p > 0 ? p - 1 : p));
  const goSimNext = () => setSimPage((p) => (p < simTotalPages - 1 ? p + 1 : p));

  /** ===== Loading skeleton main ===== */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-4">
                <div className="bg-gray-200 aspect-[3/4] rounded mb-4"></div>
              </div>
              <div className="col-span-5 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="col-span-3">
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Không tìm thấy sách</h2>
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  /** ===== UI ===== */
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1500px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Col 1: Images */}
          <div className="lg:col-span-4 lg:sticky lg:top-[30px] self-start">
            <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
              <img
                src={book.images[selectedImageIndex]?.large_url || "/placeholder.svg?height=400&width=300"}
                alt={book.name}
                className="w-full h-[400px] object-contain rounded-lg bg-white mb-4"
              />

              <div className="flex gap-2 mb-4">
                {book.images.slice(0, 2).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-20 rounded overflow-hidden border ${
                      selectedImageIndex === idx ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={img.thumbnail_url || "/placeholder.svg"} alt="" className="w-full h-full object-contain bg-white" />
                  </button>
                ))}
              </div>

              <button className="flex items-center text-blue-600 text-sm hover:text-blue-800">
                <Eye className="w-4 h-4 mr-2" /> Xem thêm Tóm tắt nội dung sách
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Col 3: Purchase */}
          <div className="lg:col-span-3 lg:sticky lg:top-[30px] order-2 lg:order-3 self-start">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              {/* Header: logo Tiki + OFFICIAL */}
              <div className="mb-4">
                <div className="flex items-start gap-2">
                  <img
                    src="/images/tiki.png"
                    alt="Tiki"
                    className="h-5 w-auto object-contain mt-[2px]"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900 leading-none">
                      Tiki Trading
                    </span>
                    <img
                      src="/images/logo_official.png"
                      alt="Official"
                      className="h-4 w-auto object-contain mt-1"
                    />
                  </div>
                </div>
                <div className="mt-3 h-px bg-gray-200" />
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Số Lượng</label>
                <div className="flex items-center border rounded w-24">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-2 py-1 hover:bg-gray-100 text-sm"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-8 text-center py-1 border-0 focus:ring-0 focus:outline-none text-sm"
                    min="1"
                  />
                  <button onClick={() => handleQuantityChange(1)} className="px-2 py-1 hover:bg-gray-100 text-sm">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Tạm tính</div>
                <div className="text-xl font-bold text-black">
                  {formatPrice(book.current_seller.price * quantity)}₫
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm font-medium"
                >
                  Mua ngay
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 rounded text-sm font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Thêm vào giỏ
                </button>
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded text-sm font-medium">
                  Mua trước trả sau
                </button>
              </div>
            </div>
          </div>


          {/* Col 2: Main info + lists */}
          <div className="lg:col-span-5 order-3 lg:order-2">
            {/* Info */}
            <div className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
              <div className="text-sm text-blue-600 mb-2">
                Tác giả: {book.authors.map((author) => author.name).join(", ")}
              </div>

              <h1 className="text-xl font-bold text-gray-900 mb-3">{book.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">{book.rating_average}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating_average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({book.quantity_sold.text})</span>
              </div>

              <div className="mb-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl font-bold text-red-600">
                    {formatPrice(book.current_seller.price)}₫
                  </span>
                  {calculateDiscount() > 0 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
                      -{calculateDiscount()}%
                    </span>
                  )}
                  {book.original_price > book.current_seller.price && (
                    <span className="text-gray-500 line-through text-sm">
                      {formatPrice(book.original_price)}₫
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
              <h3 className="font-medium text-gray-900 mb-3">Thông tin chi tiết</h3>
              {(() => {
                const getSpec = (label: string) =>
                  book.specifications?.find(
                    (s) => s.name.trim().toLowerCase() === label.trim().toLowerCase()
                  )?.value || "";

                const rows = [
                  { label: "Công ty phát hành", value: getSpec("Công ty phát hành") },
                  { label: "Ngày xuất bản", value: getSpec("Ngày xuất bản") },
                  { label: "Kích thước", value: getSpec("Kích thước") },
                  { label: "Dịch giả", value: getSpec("Dịch giả"), optional: true },
                  { label: "Loại bìa", value: getSpec("Loại bìa") },
                  { label: "Số trang", value: getSpec("Số trang") },
                  { label: "Nhà xuất bản", value: getSpec("Nhà xuất bản"), optional: true },
                ].filter((r) => r.value && r.value !== "");

                if (rows.length === 0) {
                  return <div className="text-sm text-gray-500">Chưa có thông tin chi tiết.</div>;
                }

                return (
                  <div className="space-y-2 text-sm">
                    {rows.map((row, idx) => (
                      <div
                        key={row.label}
                        className={`grid grid-cols-2 gap-4 py-2 ${idx < rows.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        <span className="text-gray-600">{row.label}</span>
                        <span>{row.value}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
              {(() => {
                const raw = book?.description ?? "";
                const cleaned = raw
                  .replace(/\r?\n/g, "<br/>")
                  .replace(/\\r\\n/g, "<br/>")
                  .replace(/\\n/g, "<br/>")
                  .replace(/\\r/g, "<br/>");

                return (
                  <>
                    <div
                      className={`prose prose-sm max-w-none text-gray-700 ${showFullDescription ? "" : "line-clamp-6"}`}
                      dangerouslySetInnerHTML={{ __html: cleaned }}
                    />
                    {raw.length > 500 && (
                      <div className="text-center mt-4">
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {showFullDescription ? "Thu gọn" : "Xem thêm"}
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Similar products (2 hàng, có nút sang) */}
            <div className="bg-white rounded-xl p-6 mb-4 border border-gray-200 relative">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Sản phẩm tương tự</h2>
                <div className="flex gap-2">
                  <button
                    onClick={goSimPrev}
                    disabled={simPage === 0 || loadingLists || simTotalPages <= 1}
                    className="w-9 h-9 rounded-full border border-gray-300 bg-white disabled:opacity-40 flex items-center justify-center"
                    aria-label="Trang trước"
                  >
                    <ChevronRight className="w-5 h-5 -scale-x-100" />
                  </button>
                  <button
                    onClick={goSimNext}
                    disabled={simPage >= simTotalPages - 1 || loadingLists || simTotalPages <= 1}
                    className="w-9 h-9 rounded-full border border-gray-300 bg-white disabled:opacity-40 flex items-center justify-center"
                    aria-label="Trang sau"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {loadingLists ? (
                <GridSkeleton count={8} />
              ) : simVisible.length === 0 ? (
                <div className="text-sm text-gray-500 mt-2">Chưa tìm thấy sản phẩm tương tự.</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {simVisible.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleOpenBook(p.id)}
                      role="button"
                      className="text-center cursor-pointer hover:shadow-xs transition rounded-lg p-2 border border-gray-200"
                    >
                      <div className="mb-2">
                        <img
                          src={p.images?.[0]?.thumbnail_url || "/placeholder.svg"}
                          alt={p.name}
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                      <h3 className="text-xs font-medium mb-1 line-clamp-2">{p.name}</h3>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(p.rating_average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm font-bold text-red-600 mt-1">
                        {formatPrice(p.current_seller?.price ?? 0)}₫
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {simTotalPages > 1 && (
                <div className="flex justify-center gap-1 mt-3">
                  {Array.from({ length: simTotalPages }).map((_, i) => (
                    <span key={i} className={`w-2 h-2 rounded-full ${i === simPage ? "bg-blue-600" : "bg-gray-300"}`} />
                  ))}
                </div>
              )}
            </div>

            {/* Top Deals (1 hàng, có nút sang, không hiển thị "đã bán") */}
            <div className="bg-white rounded-xl p-6 mb-4 border border-gray-200 relative">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Top Deals</h2>
                <div className="flex gap-2">
                  <button
                    onClick={goTopPrev}
                    disabled={topPage === 0 || loadingLists || topTotalPages <= 1}
                    className="w-9 h-9 rounded-full border border-gray-300 bg-white disabled:opacity-40 flex items-center justify-center"
                    aria-label="Trang trước"
                  >
                    <ChevronRight className="w-5 h-5 -scale-x-100" />
                  </button>
                  <button
                    onClick={goTopNext}
                    disabled={topPage >= topTotalPages - 1 || loadingLists || topTotalPages <= 1}
                    className="w-9 h-9 rounded-full border border-gray-300 bg-white disabled:opacity-40 flex items-center justify-center"
                    aria-label="Trang sau"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {loadingLists ? (
                <GridSkeleton count={4} />
              ) : topVisible.length === 0 ? (
                <div className="text-sm text-gray-500 mt-2">Chưa có dữ liệu Top Deals.</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {topVisible.map((p) => (
                    <div
                      key={`deal-${p.id}`}
                      onClick={() => handleOpenBook(p.id)}
                      role="button"
                      className="text-center cursor-pointer hover:shadow-xs transition rounded-lg p-2 border border-gray-200"
                    >
                      <div className="mb-2">
                        <img
                          src={p.images?.[0]?.thumbnail_url || "/placeholder.svg"}
                          alt={p.name}
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                      <h3 className="text-xs font-medium mb-1 line-clamp-2">{p.name}</h3>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(p.rating_average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm font-bold text-red-600 mt-1">
                        {formatPrice(p.current_seller?.price ?? 0)}₫
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {topTotalPages > 1 && (
                <div className="flex justify-center gap-1 mt-3">
                  {Array.from({ length: topTotalPages }).map((_, i) => (
                    <span key={i} className={`w-2 h-2 rounded-full ${i === topPage ? "bg-blue-600" : "bg-gray-300"}`} />
                  ))}
                </div>
              )}
            </div>

            {/* Guarantees */}
            <div className="bg-white rounded-lg p-6 mb-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">An tâm mua sắm</h2>
                <ChevronRight className="w-5 h-5 text-blue-600" />
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Được đồng kiểm khi nhận hàng</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-blue-500" />
                  <span>Được hoàn tiền 200% nếu là hàng giả</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Đổi trả miễn phí trong 30 ngày. Được đổi ý. Chi tiết</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Đánh giá sản phẩm</h2>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl font-extrabold text-yellow-500">{book.rating_average.toFixed(1)}</div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(book.rating_average) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">• {book.reviews?.length ?? 0} đánh giá</div>
              </div>

              {book.reviews && book.reviews.length > 0 ? (
                <div className="space-y-6">
                  {book.reviews.map((rv) => (
                    <div key={rv.id} className="border-t pt-6 first:border-t-0 first:pt-0">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                          {getInitials(rv.user.name)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-gray-900">{rv.user.name}</div>
                            {rv.user.nickName && <div className="text-xs text-gray-500">({rv.user.nickName})</div>}
                            <div className="text-xs text-gray-400">· {formatDate(rv.date)}</div>
                          </div>
                          <div className="mt-1 flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < rv.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <div className="mt-2 text-sm text-gray-800 whitespace-pre-line">{rv.comment}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Chưa có đánh giá nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

/** ===== Helpers ===== */
function formatDate(s: string) {
  const d = new Date(s);
  return isNaN(d.getTime()) ? s : d.toLocaleString("vi-VN");
}
function getInitials(name: string) {
  if (!name) return "U";
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
