import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

type CheckoutItem = {
  id: string;
  name: string;
  price: number | string;
  image?: string;
  seller?: string;
};
type ItemWithQty = { item: CheckoutItem; quantity: number };

type ConfirmState = {
  item?: CheckoutItem;
  quantity?: number;
  items?: ItemWithQty[];
  shipId?: "express" | "economy";
  payId?: "cod" | "viettel";
  chosenPromo?: string | null;
  total?: number;
  orderCode?: string;
  etaText?: string;
  address?: { label: string; phone: string; detail: string };
};

const SHIPPING_METHODS = [
  { id: "express", name: "Giao siêu tốc 2h", fee: 25000 },
  { id: "economy", name: "Giao tiết kiệm", fee: 16000 },
] as const;

const PAYMENT_METHODS: Record<"cod" | "viettel", string> = {
  cod: "Thanh toán tiền mặt",
  viettel: "Viettel Money",
};

function toNumberVND(p: unknown): number {
  if (typeof p === "number" && !Number.isNaN(p)) return p;
  if (typeof p === "string") {
    const digits = p.replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  }
  return 0;
}
function formatVND(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n) + " ₫";
}
function weekdayVN(d: Date) {
  return ["CN", "thứ 2", "thứ 3", "thứ 4", "thứ 5", "thứ 6", "thứ 7"][d.getDay()];
}

export default function Confirm() {
  const nav = useNavigate();
  const { state } = useLocation();
  const s = (state || {}) as ConfirmState;

  // Chuẩn hóa danh sách sản phẩm
  const items: ItemWithQty[] = useMemo(() => {
    if (s.items?.length) return s.items;
    if (s.item) return [{ item: s.item, quantity: Math.max(1, s.quantity ?? 1) }];
    return [];
  }, [s.items, s.item, s.quantity]);

  if (!items.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-sm rounded-lg p-6 text-center">
          <div className="text-lg font-semibold mb-2">Không tìm thấy đơn hàng</div>
          <button
            onClick={() => nav("/")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const shipId = (s.shipId ?? "express") as "express" | "economy";
  const payId = (s.payId ?? "cod") as "cod" | "viettel";
  const ship = SHIPPING_METHODS.find((m) => m.id === shipId);

  // Tính tiền (nếu Checkout không truyền total thì tự tính lại)
  const subtotal = items.reduce(
    (acc, it) => acc + toNumberVND(it.item.price) * Math.max(1, it.quantity),
    0
  );
  const directDiscount = 59000;
  const shipDiscount = shipId === "express" ? 25000 : 16000;
  const baseShipFee = ship ? ship.fee : 0;
  const shippingFee = Math.max(0, baseShipFee - shipDiscount);
  const total =
    typeof s.total === "number"
      ? s.total
      : Math.max(0, subtotal + shippingFee - directDiscount);

  const code =
    s.orderCode ?? Math.floor(100000000 + Math.random() * 900000000).toString();

  const eta =
    s.etaText ??
    (() => {
      const d = new Date();
      d.setDate(d.getDate() + 2);
      const dd = String(d.getDate()).padStart(2, "0");
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      return `Giao ${weekdayVN(d)}, trước 13h, ${dd}/${mm}`;
    })();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT – thông điệp thành công */}
        <section className="lg:col-span-8 bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Banner: gradient + (tùy chọn) confetti tile */}
          <div
            className="relative text-white px-6 py-7 md:py-8"
            style={{
              backgroundImage:
                // nếu có tile confetti thì để 2 lớp, còn không thì chỉ để linear-gradient
                "linear-gradient(90deg, #08C8F6 0%, #2D60FF 100%), url('/images/confetti-tile.png')",
              backgroundSize: "cover, 512px 173px",
              backgroundRepeat: "no-repeat, repeat-x",
              backgroundPosition: "center, top",
              minHeight: "112px",
            }}
          >
            {/* Mascot: nửa trên banner, nửa tràn xuống phần trắng */}
            <img
              src="/images/iconTiki.png"
              alt="Tiki Mascot"
              className="
                w-24 h-24 md:w-28 md:h-28
                absolute left-6 -bottom-6
                select-none pointer-events-none
                drop-shadow-[0_6px_12px_rgba(0,0,0,0.15)]
              "
            />

            {/* Text dịch sang phải để tránh mascot */}
            <div className="pl-28 md:pl-32">
              <div className="text-2xl md:text-3xl font-semibold">Yay, đặt hàng thành công!</div>
              <div className="opacity-90">
                Chuẩn bị tiền mặt <span className="font-semibold">{formatVND(total)}</span>
              </div>
            </div>
          </div>

          {/* Nội dung bên dưới: thêm pt-10 để chừa chỗ cho phần mascot tràn xuống */}
          <div className="p-6 pt-10">
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-4 border-b">
                <div className="text-gray-600">Phương thức thanh toán</div>
                <div className="text-right font-medium">{PAYMENT_METHODS[payId]}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 p-4">
                <div className="text-gray-600">Tổng cộng</div>
                <div className="text-right">
                  <div className="font-semibold">{formatVND(total)}</div>
                  <div className="text-xs text-gray-500">(Đã bao gồm VAT nếu có)</div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                onClick={() => nav("/")}
                className="px-5 py-2.5 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
              >
                Quay về trang chủ
              </button>
            </div>
          </div>
        </section>


        {/* RIGHT – thông tin đơn & DANH SÁCH SẢN PHẨM */}
        <aside className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="text-sm text-gray-600">
                Mã đơn hàng: <span className="font-semibold text-gray-900">{code}</span>
              </div>
              <button
                onClick={() => nav(`/customer/order-detail/${code}`, { replace: false })}
                className="text-blue-600 text-sm hover:underline"
              >
                Xem đơn hàng
              </button>
            </div>

            {/* ETA */}
            <div className="mt-3 text-sm text-gray-700">{eta}</div>

            {/* LIST sản phẩm */}
            <div className="mt-4">
              <div className="text-sm font-semibold mb-2">
                Sản phẩm ({items.length})
              </div>
              <div className="max-h-72 overflow-auto divide-y">
                {items.map((it, idx) => (
                  <div key={idx} className="py-3 flex items-start gap-3">
                    <img
                      src={it.item.image || "/placeholder.svg?height=56&width=56"}
                      className="w-12 h-12 rounded object-cover"
                      alt={it.item.name}
                    />
                    <div className="flex-1">
                      <div className="text-sm line-clamp-2">{it.item.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        SL: x{Math.max(1, it.quantity)}
                      </div>
                    </div>
                    <div className="text-right text-sm font-semibold text-red-600">
                      {formatVND(toNumberVND(it.item.price) * Math.max(1, it.quantity))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tóm tắt tiền */}
              <div className="mt-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatVND(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Giảm giá</span>
                  <span>-{formatVND(directDiscount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển (đã áp dụng KM)</span>
                  <span>{formatVND(shippingFee)}</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between font-semibold">
                  <span>Thành tiền</span>
                  <span className="text-red-600">{formatVND(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
