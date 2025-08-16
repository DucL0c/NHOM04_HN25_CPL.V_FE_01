import React from "react";
import CartItem from "../../components/cart/CartItem";

const Cart: React.FC = () => {
  return (
    <main className="container mx-auto px-8 py-4">
      {/* Header */}
      <div>
        <h4 className="text-xl font-semibold mb-4">GIỎ HÀNG</h4>
      </div>

      <div className="flex gap-6">
        {/* Left side: Cart items */}
        <div className="flex-1 rounded-md">
          {/* Header row */}
          <div className="grid grid-cols-13 bg-white items-center text-[14px] px-4 py-2 mb-2 text-gray-500 font-medium">
            <label className="col-span-5 flex items-center gap-2">
              <input type="checkbox" />
              <span>Tất cả (2 sản phẩm)</span>
            </label>
            <span className="col-span-3 text-left ml-6">Đơn giá</span>
            <span className="col-span-2 text-center">Số lượng</span>
            <span className="col-span-2 text-center">Thành tiền</span>
            <span className="col-span-1 flex justify-end">
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                alt="delete"
                className="w-5 h-5 cursor-pointer"
              />
            </span>
          </div>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        {/* Right side: Summary */}
        <div className="w-1/4 h-fit">
          <div className="bg-white flex items-center justify-between p-4 mb-3">
            <span className="font-semibold">Tiki Khuyến Mãi</span>
            <span className="text-sm text-gray-500">Có thể chọn 2</span>
          </div>

          <ul className="bg-white space-y-2 p-4">
            <li className="flex justify-between">
              <span>Tạm tính</span>
              <span>390.000đ</span>
            </li>
            <li className="flex justify-between">
              <span>Giảm giá</span>
              <span className="text-red-500">-156.000đ</span>
            </li>
          </ul>

          <div className="bg-white p-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="font-semibold">Tổng tiền thanh toán</span>
              <div className="text-right">
                <div className="text-red-500 font-bold text-lg">234.000đ</div>
                <div className="text-xs text-gray-500">Tiết kiệm 156.000đ</div>
                <span className="text-xs text-gray-400">
                  (Đã bao gồm VAT nếu có)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white px-4">
            <button className="mt-4 w-full bg-red-500 text-white py-2 rounded font-semibold">
              Mua Hàng (1)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
