const CartItem = () => {
  return (
    <div className="grid grid-cols-13 bg-white items-center px-4 py-4">
      {/* Checkbox + Info */}
      <div className="col-span-5 flex gap-3 items-center">
        <input type="checkbox" />
        <img
          src="https://salt.tikicdn.com/cache/200x200/ts/product/95/d4/82/3797a62f71a45e935d9a.jpg"
          alt="book"
          className="w-16 h-20 object-cover"
        />
        <div>
          <a href="#" className="text-sm font-medium">
            Dẫn Dắt Một Bầy Sói Hay Chăn Một Đàn Cừu
          </a>
          <p className="text-xs text-gray-500">Có thể bọc bằng Bookcare</p>
        </div>
      </div>

      {/* Price */}
      <div className="col-span-3 text-left ml-6">
        <div className="text-red-500 font-semibold">117.000đ</div>
        <div className="text-gray-400 line-through text-sm">195.000đ</div>
        <span className="text-[14px] text-gray-500">
          Giá chưa áp dụng khuyến mãi
        </span>
      </div>

      {/* Quantity */}
      <div className="col-span-2 flex items-center justify-center">
        <button className="px-2 border rounded-l">-</button>
        <input
          type="text"
          defaultValue={2}
          className="w-10 text-center border-t border-b"
        />
        <button className="px-2 border rounded-r">+</button>
      </div>

      {/* Total */}
      <div className="col-span-2 text-center font-semibold text-red-500">
        234.000đ
      </div>

      {/* Delete */}
      <div className="col-span-1 flex justify-end">
        <img
          src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
          alt="delete"
          className="w-5 h-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CartItem;
