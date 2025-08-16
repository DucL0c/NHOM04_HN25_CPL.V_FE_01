"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, User, Bell, Package } from "lucide-react"
import { jwtDecode } from "jwt-decode"

interface BookAuthor {
  authorId: number
  name: string
}

interface Book {
  bookId: number
  name: string
  description: string
  shortDescription: string
  ratingAverage: number | null
  originalPrice: number
  listPrice: number
  quantitySold: number | null
  quantitySoldText: string | null
  categoryId: number
  bookImages: any[]
  bookAuthors: BookAuthor[]
}

interface OrderItem {
  orderItemId: number
  orderId: number
  bookId: number
  quantity: number
  price: number
  book: Book
}

interface UserData {
  userId: number
  name: string | null
  email: string | null
  password: string | null
  refreshToken: string | null
  expiryDate: string | null
  role: string | null
  phone: string | null
  address: string | null
  gender: string | null
  birthDay: string | null
  createdAt: string | null
}

interface Order {
  orderId: number
  userId: number
  orderDate: string
  totalAmount: number
  status: "Pending" | "Confirmed" | "Shipping" | "Delivered" | "Cancelled"
  shippingAddress: string
  paymentMethod: string
  orderItems: OrderItem[]
  user: UserData
}

interface JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string
}

const statusConfig = {
  Pending: {
    label: "Chờ xác nhận",
    color: "bg-yellow-100 text-yellow-800",
    canCancel: true,
  },
  Confirmed: {
    label: "Đã xác nhận",
    color: "bg-blue-100 text-blue-800",
    canCancel: true,
  },
  Shipping: {
    label: "Đang giao hàng",
    color: "bg-yellow-100 text-yellow-800",
    canCancel: false,
  },
  Delivered: {
    label: "Đã giao hàng",
    color: "bg-green-100 text-green-800",
    canCancel: false,
  },
  Cancelled: {
    label: "Đã hủy",
    color: "bg-red-100 text-red-800",
    canCancel: false,
  },
}

function OrderDetail({ orderId }: { orderId?: string }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<string>("all")

  useEffect(() => {
    fetchUserDataAndOrders()
  }, [])

  const fetchUserDataAndOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      // Sử dụng token cứng giống như user-layout.tsx để đảm bảo nhất quán
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsZXR1YW4wM0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiZXhwIjoxNzU1ODMyOTE5LCJpc3MiOiJzaG9wYm9vay5hcGkiLCJhdWQiOiJzaG9wYm9vay5hcGkudXNlcnMifQ.HJwyXmNT0gBmYngw2vskQSHcwiElHSWOTNOQQW3kXUM"

      // Giải mã token để lấy thông tin user
      const decodedToken = jwtDecode<JwtPayload>(token)
      const userEmail = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
      const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

      // Lấy thông tin user từ API (giống user-layout.tsx)
      const userResponse = await fetch("https://localhost:7061/api/Users/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (userResponse.ok) {
        const users: UserData[] = await userResponse.json()
        // Tìm user theo email như trong user-layout.tsx
        const user = users.find((u: UserData) => u.email === userEmail)
        if (user) {
          setCurrentUser(user)
        }
      } else {
        throw new Error('Failed to fetch user data')
      }

      // Lấy danh sách đơn hàng
      const orderResponse = await fetch(`https://localhost:7061/api/Order/getall`, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (orderResponse.ok) {
        const allOrders: Order[] = await orderResponse.json()
        // Lọc đơn hàng theo userId
        const userOrders = allOrders.filter((order) => order.userId.toString() === userId)
        setOrders(userOrders)
      } else {
        throw new Error('Failed to fetch orders')
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Có lỗi xảy ra khi tải dữ liệu")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderIdToCancel: number) => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsZXR1YW4wM0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiZXhwIjoxNzU1ODMyOTE5LCJpc3MiOiJzaG9wYm9vay5hcGkiLCJhdWQiOiJzaG9wYm9vay5hcGkudXNlcnMifQ.HJwyXmNT0gBmYngw2vskQSHcwiElHSWOTNOQQW3kXUM"

      const response = await fetch(`https://localhost:7061/api/orders/${orderIdToCancel}/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setOrders((prev) =>
          prev.map((order) => (order.orderId === orderIdToCancel ? { ...order, status: "Cancelled" as const } : order)),
        )
        console.log("Đơn hàng đã được hủy thành công")
      } else {
        console.error("Không thể hủy đơn hàng")
      }
    } catch (error) {
      console.error("Error cancelling order:", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + " ₫"
  }

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return order.status === "Pending"
    if (activeTab === "confirmed") return order.status === "Confirmed"
    if (activeTab === "shipping") return order.status === "Shipping"
    if (activeTab === "delivered") return order.status === "Delivered"
    if (activeTab === "cancelled") return order.status === "Cancelled"
    return true
  })

  // Filter orders based on search query
  const searchedOrders = filteredOrders.filter((order) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      order.orderId.toString().includes(query) ||
      order.orderItems.some((item) => item.book.name.toLowerCase().includes(query))
    )
  })

  // Single Order Detail View Component
  const SingleOrderDetailView = ({ order }: { order: Order }) => (
    <div className="bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold">Chi tiết đơn hàng #{order.orderId} - Đang xử lý</h1>
          </div>
          <div className="text-sm text-gray-600">Ngày đặt hàng: {formatDate(order.orderDate)}</div>
        </div>
      </div>

      {/* Three column info section */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Customer Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">ĐỊA CHỈ NGƯỜI NHẬN</h3>
            <div className="space-y-2 text-sm">
              <div className="font-medium">{currentUser?.name || order.user.name || "Vũ Anh Tú"}</div>
              <div className="text-gray-600">
                Địa chỉ: {order.shippingAddress || currentUser?.address || "số 17 Duy Tân, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội, Việt Nam"}
              </div>
              <div className="text-gray-600">Điện thoại: {currentUser?.phone || order.user.phone || "0942438693"}</div>
            </div>
          </div>

          {/* Delivery Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">HÌNH THỨC GIAO HÀNG</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">NOW</span>
                <span>Giao Siêu Tốc</span>
              </div>
              <div className="text-gray-600">Giao thứ 6, trước 13h, 28/03</div>
              <div className="text-gray-600">Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)</div>
              <div className="text-gray-600">Miễn phí vận chuyển</div>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">HÌNH THỨC THANH TOÁN</h3>
            <div className="text-sm text-gray-600">Thanh toán tiền mặt khi nhận hàng</div>
          </div>
        </div>

        {/* Product Table */}
        <div className="mb-6">
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
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item.orderItemId} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-20 bg-gray-900 rounded flex items-center justify-center">
                        <div className="text-white text-xs font-bold text-center leading-tight">
                          ChatGPT
                          <br />
                          <div className="text-yellow-400">★★★★★</div>
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{item.book.name}</div>
                        <div className="text-sm text-gray-600">
                          Cung cấp bởi <span className="text-blue-600">Tiki Trading</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                            📅 30 NGÀY ĐỔI TRẢ
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Sku: {item.bookId}</div>
                        <button className="text-blue-600 text-sm mt-1 border border-blue-600 px-2 py-1 rounded">
                          Chat với nhà bán
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-4">
                    <div className="font-medium">{formatPrice(item.book.listPrice)}</div>
                  </td>
                  <td className="text-center py-4">
                    <div>{item.quantity}</div>
                  </td>
                  <td className="text-center py-4">
                    <div>{formatPrice(0)}</div>
                  </td>
                  <td className="text-right py-4">
                    <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="flex justify-end">
          <div className="w-80">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(25000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Giảm giá vận chuyển</span>
                <span>-{formatPrice(25000)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                <span>Tổng cộng</span>
                <span className="text-red-600">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => handleCancelOrder(order.orderId)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded"
              >
                Hủy đơn hàng
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại đơn hàng của tôi</span>
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded">
            Theo dõi đơn hàng
          </button>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-gray-800">{error}</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <span className="text-blue-600 hover:underline cursor-pointer">Trang chủ</span>
          <span>›</span>
          <span>Thông tin tài khoản</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Tài khoản của</div>
                  <div className="font-semibold text-gray-800">{currentUser?.name || "Người dùng"}</div>
                </div>
              </div>

              <nav className="space-y-1">
                <div className="flex items-center space-x-3 text-sm text-gray-600 p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <User className="w-4 h-4" />
                  <span>Thông tin tài khoản</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 p-3 hover:bg-gray-50 rounded cursor-pointer">
                  <Bell className="w-4 h-4" />
                  <span>Thông báo của tôi</span>
                </div>
                <div className="flex items-center space-x-3 text-sm font-medium text-gray-800 p-3 bg-gray-100 rounded">
                  <Package className="w-4 h-4" />
                  <span>Quản lý đơn hàng</span>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {orders.length > 0 && <SingleOrderDetailView order={orders[0]} />}

            {orders.length === 0 && !loading && !error && (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-500">Không có đơn hàng nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail