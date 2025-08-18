"use client"

import { useState, useEffect } from "react"
import DataService from "../../services/axiosClient"

interface Order {
  id: string
  orderNumber: string
  date: string
  status: string
  total: number
  items: Array<{
    id: string
    name: string
    image: string
    price: number
    quantity: number
  }>
}

const orderTabs = [
  { key: "all", label: "Tất cả đơn" },
  { key: "pending", label: "Chờ thanh toán" },
  { key: "processing", label: "Đang xử lý" },
  { key: "shipping", label: "Đang vận chuyển" },
  { key: "delivered", label: "Đã giao" },
  { key: "cancelled", label: "Đã hủy" },
]

export function OrderList() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const user = { id: "1", name: "Vũ Anh Tú", email: "user@example.com" }
  const isAuthenticated = true

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await DataService.get("/api/Order/getall")
      setOrders(response.data || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    return matchesSearch && order.status === activeTab
  })

  if (loading) {
    return <div className="text-center py-8">Đang tải đơn hàng...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          {orderTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <input
            placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-24 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
            Tìm đơn hàng
          </button>
        </div>
      </div>

      {/* Orders */}
      <div className="p-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">📄</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có đơn hàng</h3>
            <p className="text-gray-500">Bạn chưa có đơn hàng nào trong danh mục này</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Đơn hàng #{order.orderNumber}</h3>
                    <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">{order.status}</span>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => (
                    <a
                      key={item.id}
                      href={`/orders/${order.id}`}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer block"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{item.price.toLocaleString("vi-VN")} đ</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Tổng cộng:{" "}
                    <span className="font-semibold text-gray-900">{order.total.toLocaleString("vi-VN")} đ</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                      Chat với nhà bán
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
