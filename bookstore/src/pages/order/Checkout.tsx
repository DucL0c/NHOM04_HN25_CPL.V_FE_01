"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";

type CheckoutItem = {
  id: string;
  name: string;
  price: number | string;
  image?: string;
  seller?: string;
};
type CheckoutState = { item: CheckoutItem; quantity: number };

const SHIPPING_METHODS = [
  { id: "express", name: "Giao siêu tốc 2h", fee: 25000, note: "-25K", badge: "NOW" },
  { id: "economy", name: "Giao tiết kiệm", fee: 16000, note: "-16K" },
] as const;

const PAYMENT_METHODS = [
  { id: "cod", name: "Thanh toán tiền mặt" },
  { id: "viettel", name: "Viettel Money" },
] as const;

const CARD_PROMOS = [
  { id: "shin-plat", title: "Freeship", sub: "Thẻ Shinhan Platinum", bank: "Shinhan Bank", available: true },
  { id: "shin-classic", title: "Freeship", sub: "Thẻ Shinhan Classic", bank: "Shinhan Bank", available: true },
  { id: "giam30", title: "Giảm 30k", sub: "Đơn từ 200k", bank: "Shinhan Bank", available: false },
  { id: "giam50-1", title: "Giảm 50k", sub: "Đơn từ 300k", bank: "Shinhan Bank", available: false },
  { id: "giam50-2", title: "Giảm 50k", sub: "Đơn từ 300k", bank: "Shinhan Bank", available: false },
  { id: "giam70-1", title: "Giảm 70k", sub: "Đơn từ 500k", bank: "Shinhan Bank", available: false },
  { id: "giam70-2", title: "Giảm 70k", sub: "Đơn từ 500k", bank: "Shinhan Bank", available: false },
  { id: "giam100", title: "Giảm 100k", sub: "Đơn từ 700k", bank: "Shinhan Bank", available: false },
  { id: "giam150", title: "Giảm 150k", sub: "Đơn từ 1 triệu", bank: "Shinhan Bank", available: false },
  { id: "giam30-tiki", title: "Giảm 30k", sub: "Đơn từ 200k", bank: "Shinhan Bank", available: false },
  { id: "giam50-tiki", title: "Giảm 50k", sub: "Đơn từ 300k", bank: "Shinhan Bank", available: false },
  { id: "freeship-tiki", title: "Freeship", sub: "TikiCARD", bank: "TikiCARD", available: false, special: true },
] as const;

function toNumberVND(p: unknown): number {
  if (typeof p === "number" && !Number.isNaN(p)) return p;
  if (typeof p === "string") {
    const digits = p.replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  }
  return 0;
}
function formatVND(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n) + "₫";
}
function weekdayVi(d: Date) {
  return ["CN", "thứ 2", "thứ 3", "thứ 4", "thứ 5", "thứ 6", "thứ 7"][d.getDay()];
}
function etaTextEconomy(days = 3) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `Dự kiến giao ${weekdayVi(d)}, trước 13h, ${dd}/${mm}`;
}


export default function Checkout() {
  const nav = useNavigate();
  const { state } = useLocation();
  const data = state as CheckoutState | null;

  const [item] = useState<CheckoutItem | null>(data?.item ?? null);
  const [qty] = useState<number>(Math.max(1, data?.quantity ?? 1));

  const [shipId, setShipId] = useState<string>("express");
  const [payId, setPayId] = useState<string>("cod");
  const [applyShipDiscount, setApplyShipDiscount] = useState<boolean>(true);
  const [chosenPromo, setChosenPromo] = useState<string | null>(null);

  const ship = useMemo(() => SHIPPING_METHODS.find((s) => s.id === shipId), [shipId]);
  const price = useMemo(() => toNumberVND(item?.price as any), [item]);
  const subtotal = price * qty;

  const directDiscount = 59000;
  const baseShipFee = ship ? ship.fee : 0;
  const shipDiscount = shipId === "express" ? 25000 : 16000;

  const total = Math.max(
    0,
    subtotal + baseShipFee - directDiscount - (applyShipDiscount ? shipDiscount : 0)
  );

  // ETA cho header "Gói: ..."
  const packageETA = shipId === "economy" ? etaTextEconomy(3) : "";

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded shadow-sm text-center">
          <div className="text-lg font-semibold mb-2">Không có sản phẩm</div>
          <button onClick={() => nav("/")} className="px-4 py-2 bg-blue-600 text-white rounded">
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    const orderCode = Math.floor(100000000 + Math.random() * 900000000).toString();
    const etaForConfirm = packageETA; // gửi sang confirm
    nav("/confirm", {
      state: {
        items: [{ item, quantity: qty }],
        shipId,
        payId,
        chosenPromo,
        applyShipDiscount,
        total,
        orderCode,
        etaText: etaForConfirm,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-6">
            {/* Shipping method */}
            <section className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="font-semibold text-lg">Chọn hình thức giao hàng</div>
              </div>

              {/* Box 1: Options */}
              <div className="p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 space-y-4">
                  {SHIPPING_METHODS.map((s) => {
                    const selected = shipId === s.id;
                    return (
                      <label
                        key={s.id}
                        className={`block cursor-pointer ${selected ? "text-blue-600" : "text-gray-700"}`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="ship"
                            className="accent-blue-600"
                            checked={selected}
                            onChange={() => setShipId(s.id)}
                          />
                          <div className="flex items-center gap-2">
                            {s.badge && (
                              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">NOW</span>
                            )}
                            <span className="font-medium">{s.name}</span>
                            <span className="text-green-600 font-medium">{s.note}</span>
                          </div>
                        </div>
                        {/* ETA hint ngay dưới option khi chọn tiết kiệm */}
                        {selected && s.id === "economy" && (
                          <div className="pl-7 mt-1 text-xs text-gray-600">{etaTextEconomy(3)}</div>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Box 2: Selected package like screenshot */}
              <div className="px-6 pb-6">
                <div className="border rounded-lg p-5 bg-white">
                  {/* Header dòng xanh: Gói: <tên>, <ETA> */}
                  <div className="text-sm text-green-600 font-medium flex items-center gap-2 mb-3">
                    <span>📅</span>
                    <span>
                      Gói: {ship?.name}
                      {packageETA && `, ${packageETA}`}
                    </span>
                  </div>

                  {/* Line with NOW / name / price strike / FREE or fee */}
                  <div className="flex items-center gap-2 mb-3">
                    {shipId === "express" && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">NOW</span>
                    )}
                    <span className="font-medium uppercase">{ship?.name}</span>

                    {applyShipDiscount ? (
                      <>
                        <span className="flex-1 border-t border-gray-200 mx-2" />
                        <span className="line-through text-gray-400">{formatVND(baseShipFee)}</span>
                        <span className="text-green-600 font-medium">MIỄN PHÍ</span>
                      </>
                    ) : (
                      <span className="text-gray-700 font-medium ml-2">{formatVND(baseShipFee)}</span>
                    )}
                  </div>

                  {/* Product row */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg?height=44&width=44"}
                      className="w-11 h-11 rounded object-cover"
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <div className="text-sm line-clamp-1">{item.name}</div>
                      <div className="text-gray-500 text-sm">SL: x{qty}</div>
                    </div>
                    <div className="text-right">
                      <div className="line-through text-gray-400 text-sm">
                        {formatVND(Math.max(0, price + 59000))}
                      </div>
                      <div className="text-red-600 font-semibold">{formatVND(price)}</div>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-blue-600 text-sm mt-4">
                  🎫 Thêm mã khuyến mãi của Shop
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Payment method */}
            <section className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="font-semibold text-lg">Chọn hình thức thanh toán</div>
              </div>
              <div className="p-6 space-y-4">
                {PAYMENT_METHODS.map((p) => (
                  <label
                    key={p.id}
                    className={`flex items-center gap-3 p-5 border rounded-lg cursor-pointer ${
                      payId === p.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="accent-blue-600"
                      checked={payId === p.id}
                      onChange={() => setPayId(p.id)}
                    />
                    <div className="w-8 h-8 rounded border flex items-center justify-center">
                      {p.id === "cod" ? "💵" : "📱"}
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </label>
                ))}

                {/* Card promotions */}
                <div className="mt-8">
                  <div className="font-medium text-lg mb-4">Ưu đãi thanh toán thẻ</div>
                  <div className="grid grid-cols-3 gap-4">
                    {CARD_PROMOS.map((c) => {
                      const active = chosenPromo === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setChosenPromo(active ? null : c.id)}
                          className={`text-left border rounded-lg p-4 hover:bg-gray-50 relative ${
                            active ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"
                          } ${!c.available ? "opacity-50" : ""}`}
                          disabled={!c.available}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-semibold text-sm">{c.title}</div>
                            {c.special ? (
                              <span className="bg-blue-600 text-white text-xs px-1 py-0.5 rounded">TM</span>
                            ) : (
                              <div className="text-xs text-blue-600 font-medium">🏦</div>
                            )}
                          </div>
                          <div className="text-xs text-gray-600">{c.sub}</div>
                          {!c.available && <div className="text-xs text-orange-600 mt-1">Không giới hạn</div>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: order summary */}
          <aside className="lg:col-span-4 lg:sticky lg:top-6 self-start space-y-6">
            {/* Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-lg">Giao tới</div>
                  <div className="text-sm font-medium mt-1">Vũ Anh Tú • 0942438693</div>
                  <div className="text-sm text-orange-600">Văn phòng</div>
                  <div className="text-sm text-gray-600 mt-1">
                    số 17 Duy Tân, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội
                  </div>
                </div>
                <button className="text-blue-600 text-sm">Thay đổi</button>
              </div>
            </div>

            {/* Tiki Khuyến Mãi */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg">Tiki Khuyến Mãi</div>
                <div className="text-sm text-gray-600">Có thể chọn 2 🔄</div>
              </div>

              <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs">🎫</span>
                    </div>
                    <div className="text-sm font-medium">
                      Giảm {formatVND(shipDiscount)} phí vận chuyển
                    </div>
                  </div>
                  <button
                    className="text-blue-600 text-sm bg-blue-100 px-3 py-1 rounded"
                    onClick={() => setApplyShipDiscount((v) => !v)}
                  >
                    {applyShipDiscount ? "Bỏ Chọn" : "Chọn"}
                  </button>
                </div>
              </div>

              <button className="text-blue-600 text-sm mt-4 flex items-center gap-1">
                🎯 Chọn hoặc nhập mã khác
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="font-semibold text-lg mb-4">Đơn hàng</div>
              <div className="text-sm text-gray-600 mb-4">
                1 sản phẩm. <button className="text-blue-600">Xem thông tin</button>
              </div>

              <div className="flex gap-3 mb-4">
                <img
                  src={item.image || "/placeholder.svg?height=56&width=56"}
                  className="w-14 h-14 rounded object-cover"
                  alt={item.name}
                />
                <div className="flex-1">
                  <div className="text-sm line-clamp-2">{item.name}</div>
                  <div className="text-xs text-gray-500">x{qty}</div>
                </div>
                <div className="text-sm font-medium">{formatVND(price)}</div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tổng tiền hàng</span>
                  <span>{formatVND(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatVND(baseShipFee)}</span>
                </div>

                <div className="flex justify-between text-green-600">
                  <span>Giảm giá trực tiếp</span>
                  <span>-{formatVND(directDiscount)}</span>
                </div>

                {applyShipDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá vận chuyển</span>
                    <span>-{formatVND(shipDiscount)}</span>
                  </div>
                )}

                <div className="pt-3 mt-3 border-t">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-gray-600">Tổng tiền thanh toán</div>
                      <div className="text-xs text-green-600">
                        Tiết kiệm {formatVND(directDiscount + (applyShipDiscount ? shipDiscount : 0))}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-red-600">{formatVND(total)}</div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium"
              >
                Đặt hàng
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
