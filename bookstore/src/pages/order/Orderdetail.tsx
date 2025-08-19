import { useState, useEffect } from "react"
import { ChevronLeft, User, Bell, Package } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import DataService from "../../services/axiosClient"
import { useParams, useNavigate } from "react-router-dom" 


interface UserDto {
  userId: number
  name: string
  phone: string
  address: string
}

interface Book {
  bookId: number
  name: string
  price: number
}

interface OrderItem {
  orderItemId: number
  quantity: number
  price: number
  book: Book
}

interface Order {
  orderId: number
  orderDate: string
  totalAmount: number
  status: string
  shippingAddress: string
  paymentMethod: string
  user: UserDto
  orderItems: OrderItem[]
}

const ORDER_STATUSES = [
  { value: "Chờ xử lý", label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-800", canCancel: true },
  { value: "Đang xử lý", label: "Đang xử lý", color: "bg-blue-100 text-blue-800", canCancel: true },
  { value: "Đang vận chuyển", label: "Đang vận chuyển", color: "bg-yellow-200 text-yellow-900", canCancel: false },
  { value: "Hoàn thành", label: "Hoàn thành", color: "bg-green-100 text-green-800", canCancel: false },
  { value: "Đã hủy", label: "Đã hủy", color: "bg-red-100 text-red-800", canCancel: false },
]


const getStatusConfig = (status: string) =>
  ORDER_STATUSES.find((s) => s.value === status) || ORDER_STATUSES[0]

const formatDate = (date: string) =>
  new Date(date).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

const formatPrice = (price: number) => `${price.toLocaleString("vi-VN")} ₫`

const CustomerInfo = ({ order }: { order: Order }) => (
  <div>
    <h3 className="font-semibold text-gray-800 mb-4">ĐỊA CHỈ NGƯỜI NHẬN</h3>
    <div className="space-y-2 text-sm">
      <div className="font-medium">{order.user?.name}</div>
      <div className="text-gray-600">Địa chỉ: {order.shippingAddress || order.user?.address}</div>
      <div className="text-gray-600">Điện thoại: {order.user?.phone}</div>
    </div>
  </div>
)

const DeliveryInfo = () => (
  <div>
    <h3 className="font-semibold text-gray-800 mb-4">HÌNH THỨC GIAO HÀNG</h3>
    <div className="space-y-2 text-sm">
      <div className="flex items-center space-x-2">
        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">NOW</span>
        <span>Giao Siêu Tốc</span>
      </div>
      <div className="text-gray-600">Miễn phí vận chuyển</div>
    </div>
  </div>
)

const PaymentInfo = () => (
  <div>
    <h3 className="font-semibold text-gray-800 mb-4">HÌNH THỨC THANH TOÁN</h3>
    <div className="text-sm text-gray-600">Thanh toán tiền mặt khi nhận hàng</div>
  </div>
)

const OrderItemRow = ({ item }: { item: OrderItem }) => (
  <tr key={item.orderItemId} className="border-b border-gray-100">
    <td className="py-4">
      <div className="flex items-center space-x-3">
        <div className="w-16 h-20 bg-gray-900 rounded flex items-center justify-center text-white text-xs font-bold text-center">
          {item.book.name}
        </div>
        <div>
          <div className="font-medium text-gray-800">{item.book.name}</div>
          <div className="text-sm text-gray-600">Sku: {item.book.bookId}</div>
        </div>
      </div>
    </td>
    <td className="text-center py-4">{formatPrice(item.book.price)}</td>
    <td className="text-center py-4">{item.quantity}</td>
    <td className="text-center py-4">{formatPrice(0)}</td>
    <td className="text-right py-4">{formatPrice(item.book.price * item.quantity)}</td>
  </tr>
)

const OrderSummary = ({ order, onCancel }: { order: Order; onCancel: (id: number) => void }) => (
  <div className="flex justify-end">
    <div className="w-80 space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Tạm tính</span>
        <span>{formatPrice(order.totalAmount)}</span>
      </div>
      <div className="border-t pt-2 flex justify-between text-lg font-semibold">
        <span>Tổng cộng</span>
        <span className="text-red-600">{formatPrice(order.totalAmount)}</span>
      </div>
      <button
        onClick={() => onCancel(order.orderId)}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded mt-4"
      >
        Hủy đơn hàng
      </button>
    </div>
  </div>
)

const SingleOrderDetailView = ({ order, onCancel }: { order: Order; onCancel: (id: number) => void }) => (
  <div className="bg-white">
    {/* Header */}
    <div className="px-6 py-4 border-b flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        Chi tiết đơn hàng #{order.orderId} - {order.status}
      </h1>
      <div className="text-sm text-gray-600">Ngày đặt hàng: {formatDate(order.orderDate)}</div>
    </div>

    {/* Info */}
    <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <CustomerInfo order={order} />
      <DeliveryInfo />
      <PaymentInfo />
    </div>

    {/* Items */}
    <div className="mb-6 px-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 text-sm font-medium text-gray-600">Sản phẩm</th>
            <th className="text-center py-3 text-sm font-medium text-gray-600">Giá</th>
            <th className="text-center py-3 text-sm font-medium text-gray-600">Số lượng</th>
            <th className="text-center py-3 text-sm font-medium text-gray-600">Giảm giá</th>
            <th className="text-right py-3 text-sm font-medium text-gray-600">Tạm tính</th>
          </tr>
        </thead>
        <tbody>{order.orderItems.map((item) => <OrderItemRow key={item.orderItemId} item={item} />)}</tbody>
      </table>
    </div>

    <div className="px-6 pb-6">
      <OrderSummary order={order} onCancel={onCancel} />
    </div>
  </div>
)

function OrderDetail() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const navigate = useNavigate() 
  const { orderItemId } = useParams<{ orderItemId: string }>();
useEffect(() => {
  if (orderItemId) {
    fetchOrderDetail(orderItemId);
  } else {
    setError("Không tìm thấy mã đơn hàng.");
    setLoading(false);
  }
}, [orderItemId]);

const fetchOrderDetail = async (id: string) => {
  setLoading(true);
  try {
    const res = await DataService.get<any>(`/Order/orderItem/${id}`);

    const foundOrder = res.data.items.find((o: Order) =>
      o.orderItems.some((item: any) => item.orderItemId === Number(id))
    );

    if (!foundOrder) {
      setError("Không tìm thấy đơn hàng.");
    } else {
      // Lưu toàn bộ đối tượng đơn hàng đã tìm thấy vào state
      setOrder(foundOrder);
    }
  } catch {
    setError("Không tải được chi tiết đơn hàng");
  } finally {
    setLoading(false);
  }
};
  const handleCancelOrder = async (id: number) => {
    try {
      await DataService.post(`/orders/${id}/cancel`, {});
      // Cập nhật lại state của đơn hàng hiện tại
      if (order) {
        setOrder({ ...order, status: "Đã hủy" });
      }
    } catch {
      console.error("Không thể hủy đơn hàng");
    }
  };

  if (loading) return <div className="p-6">Đang tải...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <main className="lg:col-span-3">
            {order ? (
              <SingleOrderDetailView order={order} onCancel={handleCancelOrder} />
            ) : (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                Không tìm thấy thông tin đơn hàng.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
