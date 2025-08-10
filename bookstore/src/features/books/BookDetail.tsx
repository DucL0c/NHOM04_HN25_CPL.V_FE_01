import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../../services/bookService";
import ToastService from "../../services/notificationService";
import { Star, ShoppingCart, Plus, Minus, Shield, RefreshCw, Clock, Eye, ChevronRight } from 'lucide-react';

interface Book {
  id: string;
  name: string;
  authors: Array<{ id: number; name: string; slug: string }>;
  images: Array<{
    base_url: string;
    large_url: string;
    medium_url: string;
    thumbnail_url: string;
  }>;
  description: string;
  short_description: string;
  list_price: number;
  original_price: number;
  current_seller: {
    id: number;
    name: string;
    logo: string;
    price: number;
    sku: string;
  };
  rating_average: number;
  quantity_sold: {
    text: string;
    value: number;
  };
  categories: {
    id: number;
    name: string;
  };
  specifications: Array<{
    name: string;
    attributes: Array<{
      name: string;
      value: string;
    }>;
  }>;
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!id) return;

    getBookById(id)
      .then((data) => {
        setBook(data);
      })
      .catch(() => {
        ToastService.error("Lỗi khi tải thông tin sách");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const calculateDiscount = () => {
    if (!book) return 0;
    return Math.round(((book.original_price - book.current_seller.price) / book.original_price) * 100);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    ToastService.success(`Đã thêm ${quantity} cuốn "${book?.name}" vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    ToastService.success("Chuyển đến trang thanh toán");
  };

  // Mock data for similar products (giữ nguyên để hiển thị giao diện)
  const similarProducts = [
    { id: 1, name: "Mục Tiêu", price: "141.980", image: "/placeholder.svg?height=120&width=90" },
    { id: 2, name: "AI - Công Cụ Nâng Cao Hiệu Suất...", price: "110.000", image: "/placeholder.svg?height=120&width=90" },
    { id: 3, name: "Combo 2 Cuốn Building A Second...", price: "213.400", image: "/placeholder.svg?height=120&width=90" },
    { id: 4, name: "Chat GPT - Ứng Dụng Trí Tuệ Nhân...", price: "113.162", image: "/placeholder.svg?height=120&width=90" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <div className="bg-gray-200 aspect-[3/4] rounded mb-4"></div>
              </div>
              <div className="col-span-6 space-y-4">
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
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Product Images */}
          {/* Lớp lg:sticky và lg:top-4 chỉ hoạt động trên màn hình lớn */}
          <div className="lg:col-span-3 lg:sticky lg:top-[30px] self-start">
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="mb-4">
                <img
                  src={book.images[selectedImageIndex]?.large_url || "/placeholder.svg?height=400&width=300"}
                  alt={book.name}
                  className="w-full rounded-lg"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex gap-2">
                {book.images.slice(0, 2).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-12 h-16 rounded overflow-hidden border ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image.thumbnail_url || "/placeholder.svg"}
                      alt={`${book.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* View More Link */}
              <div className="mt-4">
                <button className="flex items-center text-blue-600 text-sm hover:text-blue-800">
                  <Eye className="w-4 h-4 mr-2" />
                  Xem thêm Tóm tắt nội dung sách
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Purchase Section */}
          {/* Lớp lg:sticky và lg:top-4 chỉ hoạt động trên màn hình lớn */}
          <div className="lg:col-span-3 lg:sticky lg:top-[30px] order-2 lg:order-3 self-start">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {/* Seller Info */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold text-lg">Tiki</span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">OFFICIAL</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số Lượng
                </label>
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
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-2 py-1 hover:bg-gray-100 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Tạm tính</div>
                <div className="text-xl font-bold text-black">
                  {formatPrice(book.current_seller.price * quantity)}₫
                </div>
              </div>

              {/* Action Buttons */}
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

          {/* Column 2: Main Info, Description, Similar, Top Deals, Guarantees */}
          <div className="lg:col-span-6 order-3 lg:order-2">
            {/* Block 1: Tên sách, Tác giả, Rating, Giá */}
            <div className="bg-white rounded-lg p-6 mb-4">
              {/* Authors */}
              <div className="text-sm text-blue-600 mb-2">
                Tác giả: {book.authors.map(author => author.name).join(", ")}
              </div>

              {/* Title */}
              <h1 className="text-xl font-bold text-gray-900 mb-3">
                {book.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">{book.rating_average}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating_average)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({book.quantity_sold.text})
                </span>
              </div>

              {/* Price */}
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

            {/* Block 2: Thông tin chi tiết (Specifications) */}
            <div className="bg-white rounded-lg p-6 mb-4">
              <h3 className="font-medium text-gray-900 mb-3">Thông tin chi tiết</h3>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                  <span className="text-gray-600">Bookcare</span>
                  <span>Có</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                  <span className="text-gray-600">Công ty phát hành</span>
                  <span>1980 Books</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                  <span className="text-gray-600">Ngày xuất bản</span>
                  <span>2024-07-01 00:00:00</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                  <span className="text-gray-600">Kích thước</span>
                  <span>13 x 20.5 cm</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                  <span className="text-gray-600">Dịch Giả</span>
                  <span>Huyền Trang</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                  <span className="text-gray-600">Loại bìa</span>
                  <span>Bìa mềm</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100">
                  <span className="text-gray-600">Số trang</span>
                  <span>263</span>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2">
                  <span className="text-gray-600">Nhà xuất bản</span>
                  <span>Nhà Xuất Bản Dân Trí</span>
                </div>
              </div>
            </div>

            {/* Block 3: Mô tả sản phẩm (Product Description) */}
            <div className="bg-white rounded-lg p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Mô tả sản phẩm</h2>
              <div 
                className={`prose prose-sm max-w-none text-gray-700 ${showFullDescription ? '' : 'line-clamp-6'}`}
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
              {book.description.length > 500 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                  </button>
                </div>
              )}
            </div>

            {/* Block 4: Sản phẩm tương tự (Similar Products) */}
            <div className="bg-white rounded-lg p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Sản phẩm tương tự</h2>
              <div className="grid grid-cols-4 gap-4">
                {similarProducts.map((product) => (
                  <div key={product.id} className="text-center">
                    <div className="mb-2">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                    <h3 className="text-xs font-medium mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm font-bold text-red-600 mt-1">
                      {product.price}₫
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 5: Top Deals */}
            <div className="bg-white rounded-lg p-6 mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Top Deals</h2>
              <div className="grid grid-cols-4 gap-4">
                {similarProducts.map((product) => (
                  <div key={`deal-${product.id}`} className="text-center">
                    <div className="mb-2">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                    <h3 className="text-xs font-medium mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm font-bold text-red-600 mt-1">
                      {product.price}₫
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 6: An tâm mua sắm (Purchase Guarantees) */}
            <div className="bg-white rounded-lg p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
