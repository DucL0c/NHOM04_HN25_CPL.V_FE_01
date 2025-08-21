import type { CartItemProps } from "../../pages/cart/Cart";
import axiosClient from "../../services/axiosClient";
import React, { useState } from "react";
import { useCartCount } from "../../contexts/CartCountContext";

interface CartItemComponentProps extends CartItemProps {
  cartId: number;
  checked?: boolean;
  onCheckedChange?: (checked: boolean, cartItemId: number) => void;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const CartItem: React.FC<CartItemComponentProps> = (item) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { refreshCartCount } = useCartCount();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN").format(price);

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) {
      setShowDeleteModal(true);
      return;
    }
    try {
      await axiosClient.put(`/CartItem/Update`, {
        CartItemId: item.cartItemId,
        CartId: item.cartId,
        BookId: item.bookId,
        Quantity: newQuantity,
        Price: item.price,
      });
      setQuantity(newQuantity);
      item.onUpdate && item.onUpdate();
      refreshCartCount();
    } catch (error) {
      console.error("Update quantity failed", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/CartItem/delete/${item.cartItemId}`);
      item.onDelete && item.onDelete();
      setShowDeleteModal(false);
      refreshCartCount();
    } catch (error) {
      console.error("Delete item failed", error);
    }
  };

  return (
    <>
      {/* Desktop/Tablet View */}
      <div className="hidden md:grid md:grid-cols-13 bg-white items-center px-4 py-4 mb-2 rounded">
        {/* Checkbox + Info */}
        <div className="col-span-5 flex gap-3 items-center">
          <input
            type="checkbox"
            checked={item.checked ?? false}
            className="cursor-pointer"
            onChange={e => {
              item.onCheckedChange && item.onCheckedChange(e.target.checked, item.cartItemId);
            }}
          />
          <img
            src={item.book.bookImages[0].thumbnailUrl}
            alt="book"
            className="w-24 h-24 object-contain"
          />
          <div>
            <a href={`/books/${item.book.bookId}`} className="text-sm font-medium hover:text-blue-500">
              {item.book.name}
            </a>
            <p className="text-xs text-gray-500">Có thể bọc bằng Bookcare</p>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-3 text-left ml-6">
          <div className="flex gap-1 text-sm">
            <div className="text-red-500 font-semibold">
              {formatPrice(item.book.bookSellers[0].price)}đ
            </div>
            {item.book.bookSellers[0].price != item.book.price && (
              <div className="text-gray-400 line-through">
                {formatPrice(item.book.price)}đ
              </div>
            )}
          </div>

          <span className="text-[14px] text-gray-500">
            Giá chưa áp dụng khuyến mãi
          </span>
        </div>

        {/* Quantity */}
        <div className="col-span-2 flex items-center justify-center">
          <button
            className="px-2 border rounded-l border-gray-300 cursor-pointer"
            onClick={() => handleUpdateQuantity(quantity - 1)}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-10 text-center border-t border-b border-gray-300 focus:border-0"
          />
          <button
            className="px-2 border rounded-r border-gray-300 cursor-pointer"
            onClick={() => handleUpdateQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Total */}
        <div className="col-span-2 text-center font-semibold text-red-500">
          {formatPrice(item.book.bookSellers[0].price * quantity)}đ
        </div>

        {/* Delete */}
        <div className="col-span-1 flex justify-end">
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
            alt="delete"
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShowDeleteModal(true)}
          />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-white p-4 mb-3 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.checked ?? false}
              className="cursor-pointer"
              onChange={e => {
                item.onCheckedChange && item.onCheckedChange(e.target.checked, item.cartItemId);
              }}
            />
            <img
              src={item.book.bookImages[0].thumbnailUrl}
              alt="book"
              className="w-16 h-16 object-contain"
            />
          </div>
          <img
            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
            alt="delete"
            className="w-5 h-5 cursor-pointer mt-1"
            onClick={() => setShowDeleteModal(true)}
          />
        </div>

        <div className="mb-3">
          <a href={`/books/${item.book.bookId}`} className="text-sm font-medium hover:text-blue-500">
            {item.book.name}
          </a>
          <p className="text-xs text-gray-500 mt-1">Có thể bọc bằng Bookcare</p>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="flex gap-1 items-baseline">
              <div className="text-red-500 font-semibold text-sm">
                {formatPrice(item.book.bookSellers[0].price)}đ
              </div>
              {item.book.bookSellers[0].price != item.book.price && (
                <div className="text-gray-400 line-through text-xs">
                  {formatPrice(item.book.price)}đ
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">
              Giá chưa áp dụng khuyến mãi
            </span>
          </div>

          <div className="flex items-center">
            <button
              className="px-2 border rounded-l border-gray-300 cursor-pointer"
              onClick={() => handleUpdateQuantity(quantity - 1)}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-8 text-center border-t border-b border-gray-300 focus:border-0 text-sm"
            />
            <button
              className="px-2 border rounded-r border-gray-300 cursor-pointer"
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-2">
          <span className="text-sm text-gray-600">Thành tiền:</span>
          <div className="font-semibold text-red-500 text-sm">
            {formatPrice(item.book.bookSellers[0].price * quantity)}đ
          </div>
        </div>
      </div>

      {/* Modal xác nhận xóa (chung cho cả desktop và mobile) */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-lg p-6 min-w-[320px] max-w-[90vw] mx-4">
            <div className="flex items-center mb-3">
              <span className="text-yellow-500 mr-2">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm0-8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" fill="currentColor"/></svg>
              </span>
              <span className="font-semibold text-lg">Xóa sản phẩm</span>
            </div>
            <div className="mb-4">Bạn có muốn xóa sản phẩm này?</div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold cursor-pointer"
                onClick={handleDelete}
              >Xác Nhận</button>
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                onClick={() => setShowDeleteModal(false)}
              >Hủy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;