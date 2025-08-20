import React, { useState, useEffect } from "react";
import axiosClient from "../../services/axiosClient";
import CartItem from "../../components/cart/CartItem";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useCartCount } from "../../contexts/CartCountContext";

export interface CartItemProps {
  cartItemId: number;
  bookId: number;
  quantity: number;
  price: number;
  book: {
    bookId: number;
    name: string;
    price: number;
    bookSellers: [
      {
        id: number;
        sku: string | null;
        price: number;
        productId: number;
        storeId: null;
        isBestStore: true;
        seller: {
          sellerId: number;
          name: string;
          link: string;
          logo: string;
        };
      }
    ];
    bookImages: [
      {
        imageId: number;
        baseUrl: string;
        smallUrl: string;
        mediumUrl: string;
        largeUrl: string;
        thumbnailUrl: string;
        isGallery: boolean;
      }
    ];
  };
}

export interface CartProps {
  cartId: number;
  userId: number;
  cartItems: Array<CartItemProps>;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartProps | null>(null);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { refreshCartCount } = useCartCount();
  const navigate = useNavigate();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const data = await axiosClient.get<CartProps[], any>(
        `/Cart/ByUserId/${user?.userId}`
      );
      console.log("Fetched cart:", data[0]);
      setCart(data[0]);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tính toán dựa trên các sản phẩm được chọn
  const selectedItems = cart
    ? cart.cartItems.filter((item) => checkedItems.includes(item.cartItemId))
    : [];
  const selectedTotalOriginal = selectedItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );
  const selectedTotal = selectedItems.reduce(
    (sum, item) => sum + item.book.bookSellers[0].price * item.quantity,
    0
  );
  const selectedPriceDiscount = selectedItems.reduce(
    (sum, item) =>
      sum + (item.book.price - item.book.bookSellers[0].price) * item.quantity,
    0
  );
  const selectedCount = selectedItems.length;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Xử lý xóa nhiều sản phẩm đã chọn
  const handleDeleteSelected = async () => {
    if (checkedItems.length === 0) return;
    try {
      await Promise.all(
        checkedItems.map((id) => axiosClient.delete(`/CartItem/delete/${id}`))
      );
      setCheckedItems([]);
      fetchCart();
      refreshCartCount();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting selected cart items", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Xử lý chọn tất cả
  const allChecked =
    cart &&
    cart.cartItems.length > 0 &&
    checkedItems.length === cart.cartItems.length;
  const handleCheckAll = (checked: boolean) => {
    if (!cart) return;
    if (checked) {
      setCheckedItems(cart.cartItems.map((i) => i.cartItemId));
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckedChange = (checked: boolean, cartItemId: number) => {
    setCheckedItems((prev) =>
      checked ? [...prev, cartItemId] : prev.filter((id) => id !== cartItemId)
    );
  };

    //  gửi danh sách đã chọn sang Checkout
  const handleCheckoutSelected = () => {
    if (!selectedItems.length) return;

    const items = selectedItems.map((ci) => ({
      item: {
        id: String(ci.bookId),
        name: ci.book.name,
        // ưu tiên giá của cửa hàng tốt nhất, fallback về book.price
        price: ci.book.bookSellers?.[0]?.price ?? ci.book.price,
        image:
          ci.book.bookImages?.[0]?.thumbnailUrl ||
          ci.book.bookImages?.[0]?.smallUrl ||
          ci.book.bookImages?.[0]?.baseUrl ||
          "",
        seller: ci.book.bookSellers?.[0]?.seller?.name || "Tiki",
      },
      quantity: ci.quantity,
    }));

    navigate("/checkout", {
      state: {
        items, // <-- danh sách gửi sang Checkout
        // có thể set sẵn các mặc định, optional:
        shipId: "express",
        payId: "cod",
        typess: "cart",
      },
    });
  };

  if ((!cart || cart.cartItems.length === 0) && loading == false) {
    return (
      <main className="container mx-auto px-8 py-4">
        <div className="flex flex-col items-center justify-center min-h-[300px] bg-white rounded-lg">
          <img
            src="https://salt.tikicdn.com/ts/upload/43/fd/59/6c0f335100e0d9fab8e8736d6d2fbcad.png"
            alt="empty-cart"
            className="w-32 h-32 mb-4"
          />
          <div className="font-semibold text-lg mb-2">Giỏ hàng trống</div>
          <div className="text-gray-500">
            Bạn tham khảo thêm các sản phẩm được Tiki gợi ý bên dưới nhé!
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {loading ? (
        <div className="col-span-4 text-center py-8">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 border-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <span className="text-gray-600">Đang tải dữ liệu...</span>
          </div>
        </div>
      ) : (
        <main className="container mx-auto px-8 py-4">
          {/* Header */}
          <div>
            <h4 className="text-xl font-semibold mb-4">GIỎ HÀNG</h4>
          </div>

          <div className="flex gap-6">
            {/* Left side: Cart items */}
            <div className="flex-1 rounded-md">
              {/* Header row */}
              <div className="grid grid-cols-13 bg-white items-center rounded text-[14px] px-4 py-2 mb-2 text-gray-500 font-medium">
                <label className="col-span-5 flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!allChecked}
                    className="cursor-pointer"
                    onChange={(e) => handleCheckAll(e.target.checked)}
                  />
                  <span>
                    Tất cả ({cart ? cart.cartItems.length : 0} sản phẩm)
                  </span>
                </label>
                <span className="col-span-3 text-left ml-6">Đơn giá</span>
                <span className="col-span-2 text-center">Số lượng</span>
                <span className="col-span-2 text-center">Thành tiền</span>
                <span className="col-span-1 flex justify-end">
                  <img
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                    alt="delete"
                    className={`w-5 h-5 cursor-pointer ${
                      checkedItems.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => {
                      if (checkedItems.length === 0) return;
                      setShowDeleteModal(true);
                    }}
                  />
                  {/* Modal xác nhận xóa */}
                  {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                      <div className="bg-white rounded shadow-lg p-6 min-w-[320px]">
                        <div className="flex items-center mb-3">
                          <span className="text-yellow-500 mr-2">
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm0-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                          <span className="font-semibold text-lg">
                            Xóa sản phẩm
                          </span>
                        </div>
                        <div className="mb-4">
                          Bạn có muốn xóa sản phẩm đang chọn?
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold cursor-pointer"
                            onClick={handleDeleteSelected}
                          >
                            Xác Nhận
                          </button>
                          <button
                            className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                            onClick={() => setShowDeleteModal(false)}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </span>
              </div>
              {cart &&
                cart.cartItems.map((item) => (
                  <CartItem
                    key={item.cartItemId}
                    {...item}
                    cartId={cart.cartId}
                    checked={checkedItems.includes(item.cartItemId)}
                    onCheckedChange={handleCheckedChange}
                    onUpdate={fetchCart}
                    onDelete={fetchCart}
                  />
                ))}
            </div>

            {/* Right side: Summary */}
            <div className="w-1/4 h-fit">
              <div className="bg-white flex items-center justify-between rounded p-4 mb-3">
                <span className="font-semibold">Tiki Khuyến Mãi</span>
                <span className="text-sm text-gray-500">Có thể chọn 2</span>
              </div>

              <ul className="bg-white space-y-2 p-4 rounded">
                <li className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{selectedTotalOriginal.toLocaleString("vi-VN")}đ</span>
                </li>
                {/* Nếu có logic giảm giá, tính ở đây */}
                <li className="flex justify-between">
                  <span>Giảm giá</span>
                  <span className="text-red-500">
                    -{selectedPriceDiscount.toLocaleString("vi-VN")}đ
                  </span>
                </li>
              </ul>

              <div className="bg-white p-4 border-t border-gray-200 rounded">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold">Tổng tiền thanh toán</span>
                  <div className="text-right">
                    {selectedCount === 0 ? (
                      <div className="text-red-500 font-semibold text-lg">
                        Vui lòng chọn sản phẩm
                      </div>
                    ) : (
                      <>
                        <div className="text-lg font-bold">
                          {selectedTotal.toLocaleString("vi-VN")}đ
                        </div>
                        <div className="text-sm text-gray-500">
                          ({selectedCount} sản phẩm)
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleCheckoutSelected}
                  disabled={selectedCount === 0}
                  className={`w-full py-2 rounded text-white font-semibold ${
                    selectedCount === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Mua hàng
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Cart;
