import { useState, useEffect } from "react";
import DataService from "../../services/axiosClient";
import { useAuth } from "../../hooks/useAuth";

interface UserDto {
  userId: number
  name: string
  phone: string
  address: string
}

interface BookImages {
  imageId: number,
  baseUrl: string,
  smallUrl: string,
  mediumUrl: string,
  largeUrl: string,
  thumbnailUrl: string
  isGallery: string
}

interface Book {
  bookId: number
  name: string
  price: number
  bookImages: BookImages[]
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

const OrderList = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Tất cả đơn");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    "Tất cả đơn",
    "Chờ thanh toán",
    "Đang xử lý",
    "Đang vận chuyển",
    "Đã giao",
    "Đã huỷ",
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await DataService.get<Order[], any>(`/Order/byUserId/${user?.userId}`);
        setOrders(response.items);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === "Tất cả đơn") return true;
    if (activeTab === "Đã giao" && order.status === "Hoàn thành") return true;
    if (activeTab === "Đã huỷ" && order.status === "Đã hủy") return true;
    
    return false;
  }).filter(order => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      order.orderId.toString().includes(searchLower) ||
      order.orderItems.some(item => 
        item.book.name.toLowerCase().includes(searchLower)
      )
    );
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case "Hoàn thành": return "Đã giao";
      case "Đã hủy": return "Đã huỷ";
      default: return status;
    }
  };

  if (loading) {
    return (
      <main className="flex-1 p-6">
        <div className="text-center">Đang tải đơn hàng...</div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6">
      <h2 className="text-xl font-semibold mb-4">Đơn hàng của tôi</h2>

      {/* Tabs */}
      <div className="flex border-b mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm whitespace-nowrap ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
          className="flex-1 border rounded-l px-3 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 rounded-r">
          Tìm đơn hàng
        </button>
      </div>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          Chưa có đơn hàng
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Mã đơn: {order.orderId}</span>
                <span>{formatDate(order.orderDate)}</span>
              </div>

              {order.orderItems.map((item, i) => (
                <div key={i} className="flex items-center mb-2">
                  <div className="w-16 h-16 bg-gray-200 rounded mr-3 flex items-center justify-center">
                    <img
                      src={item.book.bookImages[0]?.thumbnailUrl}
                      alt={item.book.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.book.name}</p>
                    <p className="text-sm text-gray-500">
                      Số lượng: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">{formatPrice(item.price)}đ</p>
                </div>
              ))}

              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="text-lg font-bold text-red-600">
                  {formatPrice(order.totalAmount)}đ
                </span>
              </div>

              <div className="flex justify-between mt-4">
                <span className={`text-sm ${
                  order.status === "Hoàn thành" ? "text-green-600" :
                  order.status === "Đã hủy" ? "text-red-600" : "text-blue-600"
                }`}>
                  Trạng thái: {getStatusDisplay(order.status)}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default OrderList;