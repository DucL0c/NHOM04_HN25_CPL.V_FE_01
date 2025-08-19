"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, X } from "lucide-react";
import axiosClient from "../../services/axiosClient";
import ToastService from "../../services/notificationService";
import { useAuth } from "../../hooks/useAuth";

type CheckoutItem = {
  id: string;
  name: string;
  price: number | string;
  image?: string;
  seller?: string;
};
type ItemWithQty = { item: CheckoutItem; quantity: number };

type CheckoutState =
  | { item: CheckoutItem; quantity: number }
  | { items: ItemWithQty[] }
  | (Partial<{ item: CheckoutItem; quantity: number; items: ItemWithQty[] }> & {
      shipId?: "express" | "economy";
      payId?: "cod" | "viettel";
      chosenPromo?: string | null;
      applyShipDiscount?: boolean;
    });

type ApiUser = {
  userId: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
};

type UiAddress = {
  name: string;   // người nhận
  phone: string;  // SĐT nhận hàng
  detail: string; // địa chỉ giao
};

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

// ===== helpers =====
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
  const s = (state || {}) as CheckoutState;
  const { user, accessToken } = useAuth();

  // ===== items =====
  const items: ItemWithQty[] = useMemo(() => {
    if (Array.isArray((s as any).items) && (s as any).items.length) {
      return (s as any).items as ItemWithQty[];
    }
    if ((s as any).item) {
      const qty = Math.max(1, (s as any).quantity ?? 1);
      return [{ item: (s as any).item as CheckoutItem, quantity: qty }];
    }
    return [];
  }, [s]);

  const [shipId, setShipId] = useState<string>((s as any).shipId ?? "express");
  const [payId, setPayId] = useState<string>((s as any).payId ?? "cod");
  const [applyShipDiscount, setApplyShipDiscount] = useState<boolean>(
    (s as any).applyShipDiscount ?? true
  );
  const [chosenPromo, setChosenPromo] = useState<string | null>(
    (s as any).chosenPromo ?? null
  );

  // ===== address state =====
  const [apiUser, setApiUser] = useState<ApiUser | null>(null);
  const [address, setAddress] = useState<UiAddress | null>(null);

  // modal
  const [openAddrModal, setOpenAddrModal] = useState(false);
  const [addrMode, setAddrMode] = useState<"default" | "custom">("default");
  const [draftAddr, setDraftAddr] = useState<UiAddress>({
    name: user?.name || "",
    phone: "",
    detail: "",
  });

  // fetch user to get default address
  useEffect(() => {
    if (!user?.userId) return;
    (async () => {
      try {
        const u = await axiosClient.get<ApiUser>(`/Users/getbyid/${user.userId}`);
        setApiUser(u);
        if (u.address) {
          setAddress({
            name: u.name || user.name || "Khách hàng",
            phone: u.phone || "",
            detail: u.address,
          });
        }
      } catch {
        /* ignore */
      }
    })();
  }, [user?.userId, user?.name]);

  // subtotal & totals
  const ship = useMemo(() => SHIPPING_METHODS.find((x) => x.id === shipId), [shipId]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (acc, it) => acc + toNumberVND(it.item.price) * Math.max(1, it.quantity),
        0
      ),
    [items]
  );

  const directDiscount = 59000;
  const baseShipFee = ship ? ship.fee : 0;
  const shipDiscount = shipId === "express" ? 25000 : 16000;

  const total = Math.max(
    0,
    subtotal + baseShipFee - directDiscount - (applyShipDiscount ? shipDiscount : 0)
  );

  const packageETA = shipId === "economy" ? etaTextEconomy(3) : "";

  if (!items.length) {
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

  // ====== save address from modal ======
  function saveAddressFromModal() {
    if (addrMode === "default") {
      if (!apiUser?.address) {
        ToastService.error("Tài khoản chưa có địa chỉ mặc định. Vui lòng nhập địa chỉ mới.");
        return;
      }
      setAddress({
        name: apiUser.name || user?.name || "Khách hàng",
        phone: apiUser.phone || "",
        detail: apiUser.address,
      });
      setOpenAddrModal(false);
      return;
    }
    // custom
    if (!draftAddr.detail.trim()) {
      ToastService.error("Bạn chưa nhập địa chỉ nhận hàng.");
      return;
    }
    setAddress({
      name: draftAddr.name || user?.name || "Khách hàng",
      phone: draftAddr.phone || "",
      detail: draftAddr.detail.trim(),
    });
    setOpenAddrModal(false);
  }

  // ====== API: Place Order ======
  async function handlePlaceOrder() {
    if (!user || !accessToken) {
      ToastService.error("Bạn cần đăng nhập để đặt hàng.");
      nav("/auth/login");
      return;
    }

    // Nếu chưa có địa chỉ → yêu cầu nhập
    if (!address?.detail?.trim()) {
      setAddrMode(apiUser?.address ? "default" : "custom");
      setOpenAddrModal(true);
      ToastService.error("Vui lòng chọn/nhập địa chỉ giao hàng.");
      return;
    }

    const paymentMethod = payId === "cod" ? "COD" : "ViettelMoney";

    const payload = {
      UserId: user.userId,
      shippingAddress: address.detail, // địa chỉ giao
      receiverName: address.name,      // tên người nhận
      receiverPhone: address.phone,    // SĐT (mới nếu user vừa sửa)
      paymentMethod,
      items: items.map((it) => ({
        bookId: Number.parseInt(String(it.item.id), 10),
        quantity: Math.max(1, it.quantity),
      })),
    };

    try {
      ToastService.loading("Đang tạo đơn hàng...");
      const resp = await axiosClient.post("/Order/create", payload);
      const code =
        (resp as any)?.orderCode ||
        (resp as any)?.orderId ||
        Math.floor(100000000 + Math.random() * 900000000).toString();

      ToastService.updateSuccess("Đặt hàng thành công!");

      nav("/confirm", {
        state: {
          items,
          shipId,
          payId,
          chosenPromo,
          applyShipDiscount,
          total,
          orderCode: String(code),
          etaText: packageETA,
          address, // để Confirm hiển thị nếu muốn
        },
        replace: true,
      });
    } catch (err: any) {
      console.error("Create order failed:", err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Đặt hàng thất bại. Vui lòng thử lại.";
      ToastService.error(msg);
    } finally {
      ToastService.dismiss();
    }
  }

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

              {/* Options */}
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
                        {selected && s.id === "economy" && (
                          <div className="pl-7 mt-1 text-xs text-gray-600">{etaTextEconomy(3)}</div>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Selected package + LIST SẢN PHẨM */}
              <div className="px-6 pb-6">
                <div className="border rounded-lg p-5 bg-white">
                  <div className="text-sm text-green-600 font-medium flex items-center gap-2 mb-3">
                    <span>📅</span>
                    <span>
                      Gói: {ship?.name}
                      {shipId === "economy" ? `, ${etaTextEconomy(3)}` : ""}
                    </span>
                  </div>

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

                  {/* === DANH SÁCH TẤT CẢ SẢN PHẨM === */}
                  <div className="mt-3 space-y-3">
                    {items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={it.item.image || "/placeholder.svg?height=44&width=44"}
                          className="w-11 h-11 rounded object-cover"
                          alt={it.item.name}
                        />
                        <div className="flex-1">
                          <div className="text-sm line-clamp-1">{it.item.name}</div>
                          <div className="text-gray-500 text-xs">SL: x{Math.max(1, it.quantity)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-red-600 font-semibold">
                            {formatVND(toNumberVND(it.item.price))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="flex items-center gap-2 text-blue-600 text-sm mt-4">
                  🎫 Thêm mã khuyến mãi của Shop
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Payment method + Ưu đãi thẻ */}
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

                {/* === Ưu đãi thanh toán thẻ === */}
                <div className="mt-8">
                  <div className="font-medium text-lg mb-4">Ưu đãi thanh toán thẻ</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                          {!c.available && (
                            <div className="text-xs text-orange-600 mt-1">Không giới hạn</div>
                          )}
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
                  {/* Tên | SĐT trên cùng một hàng */}
                  <div className="text-sm font-medium mt-1 flex items-center gap-2 flex-wrap">
                    <span>{address?.name || user?.name || "Khách hàng"}</span>
                    {(address?.phone || apiUser?.phone) && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span>{address?.phone || apiUser?.phone}</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {address?.detail || "Chưa có địa chỉ. Vui lòng thêm địa chỉ giao hàng."}
                  </div>
                </div>
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => {
                    setAddrMode(apiUser?.address ? "default" : "custom");
                    setDraftAddr({
                      name: address?.name || user?.name || apiUser?.name || "",
                      phone: address?.phone || apiUser?.phone || "",
                      detail: address?.detail || apiUser?.address || "",
                    });
                    setOpenAddrModal(true);
                  }}
                >
                  Thay đổi
                </button>
              </div>
            </div>

            {/* Tiki Khuyến Mãi (phí VC + giảm trực tiếp) */}
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
                    {applyShipDiscount ? "Bỏ chọn" : "Áp dụng"}
                  </button>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-blue-50 border-blue-200 mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs">💳</span>
                    </div>
                    <div className="text-sm font-medium">Giảm trực tiếp</div>
                  </div>
                  <div className="text-sm font-semibold text-red-600">
                    -{formatVND(59000)}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary & action */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Tạm tính</span>
                <span className="font-semibold">{formatVND(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Phí vận chuyển</span>
                <span className="font-semibold">
                  {applyShipDiscount ? (
                    <>
                      <span className="line-through mr-2 text-gray-400">{formatVND(baseShipFee)}</span>0₫
                    </>
                  ) : (
                    formatVND(baseShipFee)
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Khuyến mãi</span>
                <span className="font-semibold text-red-600">-{formatVND(59000)}</span>
              </div>
              <div className="h-px bg-gray-200 my-1" />
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold">Tổng tiền</span>
                <span className="text-red-600 font-bold text-lg">{formatVND(total)}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
              >
                Đặt hàng
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ===== Address Modal ===== */}
      {openAddrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenAddrModal(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">Địa chỉ giao hàng</div>
              <button className="p-2" onClick={() => setOpenAddrModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 p-3 border rounded-lg">
                <input
                  type="radio"
                  className="accent-blue-600 mt-1"
                  checked={addrMode === "default"}
                  onChange={() => setAddrMode("default")}
                  disabled={!apiUser?.address}
                />
                <div className="flex-1">
                  <div className="font-medium">Dùng địa chỉ mặc định</div>
                  <div className="text-sm text-gray-600">
                    {apiUser?.address ? apiUser.address : "Chưa có địa chỉ mặc định trong tài khoản"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    SĐT mặc định: {apiUser?.phone || "—"}
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 border rounded-lg">
                <input
                  type="radio"
                  className="accent-blue-600 mt-1"
                  checked={addrMode === "custom"}
                  onChange={() => setAddrMode("custom")}
                />
                <div className="flex-1">
                  <div className="font-medium">Nhập địa chỉ khác (không lưu vào hồ sơ)</div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Tên người nhận"
                      className="border rounded px-3 py-2 text-sm col-span-2"
                      value={draftAddr.name}
                      onChange={(e) => setDraftAddr((d) => ({ ...d, name: e.target.value }))}
                      disabled={addrMode !== "custom"}
                    />
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      className="border rounded px-3 py-2 text-sm col-span-2"
                      value={draftAddr.phone}
                      onChange={(e) => setDraftAddr((d) => ({ ...d, phone: e.target.value }))}
                      disabled={addrMode !== "custom"}
                    />
                    <textarea
                      placeholder="Địa chỉ chi tiết"
                      className="border rounded px-3 py-2 text-sm col-span-2 min-h-[80px]"
                      value={draftAddr.detail}
                      onChange={(e) => setDraftAddr((d) => ({ ...d, detail: e.target.value }))}
                      disabled={addrMode !== "custom"}
                    />
                  </div>
                </div>
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button className="px-4 py-2 rounded border" onClick={() => setOpenAddrModal(false)}>
                Hủy
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white"
                onClick={saveAddressFromModal}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
