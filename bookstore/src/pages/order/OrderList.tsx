import { useState, useEffect } from "react";
import DataService from "../../services/axiosClient";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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

// const ORDERSTATUS = {
//   "pending": "Chờ xác nhận",
//   "confirmed": "Đã xác nhận",
//   "shipping": "Đang giao hàng",
//   "delivered": "Đã giao hàng",
//   "cancelled": "Đã huỷ"
// }

const OrderList = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState("Tất cả đơn");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    "Tất cả đơn",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang giao hàng",
    "Đã giao hàng",
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
    if (activeTab === "Chờ xác nhận" && order.status === "pending") return true;
    if (activeTab === "Đã xác nhận" && order.status === "confirmed") return true;
    if (activeTab === "Đang giao hàng" && order.status === "shipping") return true;
    if (activeTab === "Đã giao hàng" && order.status === "delivered") return true;
    if (activeTab === "Đã huỷ" && order.status === "cancelled") return true;
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case "pending": return "Chờ xác nhận";
      case "confirmed": return "Đã xác nhận";
      case "shipping": return "Đang giao hàng";
      case "delivered": return "Đã giao hàng";
      case "cancelled": return "Đã huỷ";
      default: return status;
    }
  };
  const handleViewDetail = (orderId: number) => {
    navigate(`/customer/order-detail/${orderId}`);
  };

  if (loading) {
    return (
      <main className="flex-1 overflow-hidden max-w-[950px]">
        <div className="text-center">Đang tải đơn hàng...</div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-hidden max-w-[950px]">
      <h2 className="text-[19px] leading-[21px] font-light my-[20px] mx-0 mb-[15px]">Đơn hàng của tôi</h2>

      {/* Tabs */}
      <div className="cursor-pointer bg-white w-full flex flex-row overflow-hidden sticky top-0 z-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`w-1/6 py-3 mx-4 text-center text-[#0D5CB6] hover:border-b-2 hover:border-[#0D5CB6] ${
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
      <div className="w-full relative my-3">
        <input
          type="text"
          placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
          className="transition-[border-color,box-shadow] duration-150 ease-in-out h-9 w-full rounded-md px-3 py-2.5 leading-5 outline-none flex-1 border border-[#C4C4CF]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#0B74E5] py-0 px-[6px] pl-4 border-l-2 border-[#DDDDE3] cursor-pointer">
          Tìm đơn hàng
        </button>
      </div>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          Chưa có đơn hàng
        </div>
      ) : (
<div className="bg-white rounded-md text-[13px] mb-5 p-4">
  {filteredOrders.map((order) => (
    <div
      key={order.orderId}
      className="py-4 border-b border-[#EBEBF0] last:border-b-0"
    >
      {/* Danh sách sản phẩm trong đơn hàng */}
      <div className="border-b border-[#EBEBF0] pb-3 text-[#808089] text-sm font-medium leading-5">
          <span className="text-sm text-gray-600">Trạng thái:</span>
          <span className={`text-sm font-medium ml-2 ${
            order.status === "pending" ? "text-yellow-500" :
            order.status === "confirmed" ? "text-blue-500" :
            order.status === "shipping" ? "text-orange-500" :
            order.status === "delivered" ? "text-green-500" :
            order.status === "cancelled" ? "text-red-500" : "text-orange-600"
          }`}>
            {getStatusDisplay(order.status)}
          </span>
        </div>
      <div className="space-y-3 mb-4">
        {order.orderItems.map((item, i) => (
          <div key={i} className="flex flex-row py-4 border-b border-[#EBEBF0] justify-between">
            {/* Hình ảnh sản phẩm */}
            <div className="w-14 h-14 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
              <img
                src={item.book.bookImages[0]?.thumbnailUrl}
                alt={item.book.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thông tin sản phẩm */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 mb-1 leading-tight">
                {item.book.name}
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">
                  Số lượng: {item.quantity}
                </span>
              </div>
              <div className="inline-block mt-1">
                <img 
                  src="https://salt.tikicdn.com/ts/ta/b1/3f/4e/cc3d0a2dd751a7b06dd97d868d6afa56.png"
                  alt="30 ngày đổi trả"
                  className="h-4 object-contain"
                />
              </div>
            </div>
            
            {/* Giá sản phẩm */}
            <div className="text-right flex-shrink-0">
              <span className="font-medium text-gray-900">
                {formatPrice(item.price)}đ
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer: Trạng thái và Tổng tiền trên cùng một dòng */}


        <div className="flex flex-col items-end mt-3 w-full">
          <div className="text-[17px] flex mb-3">
            <span className="font-light text-[#808089] mr-2">Tổng tiền:</span>
            <span className="font-normal text-[#38383D]">
              {formatPrice(order.totalAmount)}đ
            </span>
          </div>
          
          <div className="flex">
            <button onClick={() => handleViewDetail(order.orderId)} className="py-3 px-2 h-9 rounded-md border border-[#0B74E5] text-sm font-normal leading-normal text-[#0B74E5] flex justify-center items-center cursor-pointer ml-2">
              Xem chi tiết
            </button>
          </div>
        </div>

    </div>
  ))}
</div>
      )}
    </main>
  );
};

export default OrderList;