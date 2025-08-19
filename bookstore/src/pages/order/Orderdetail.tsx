import { useState, useEffect } from "react";
import { ChevronLeft, User, Bell, Package } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import DataService from "../../services/axiosClient";
import { useParams, useNavigate } from "react-router-dom";

interface UserDto {
  userId: number
  name: string
  phone: string | null
  address: string | null
}

interface BookImages {
  imageId: number;
  baseUrl: string;
  smallUrl: string;
  mediumUrl: string;
  largeUrl: string;
  thumbnailUrl: string;
  isGallery: string | null;
}

interface Book {
  bookId: number;
  name: string;
  price: number;
  bookImages: BookImages[];
}

interface OrderItem {
  orderItemId: number;
  quantity: number;
  price: number;
  book: Book;
}

interface Order {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  user: UserDto;
  orderItems: OrderItem[];
}

const ORDER_STATUSES = [
  {
    value: "Pending",
    label: "Chờ xử lý",
    color: "bg-yellow-100 text-yellow-800",
    canCancel: true,
  },
  {
    value: "Processing",
    label: "Đang xử lý",
    color: "bg-blue-100 text-blue-800",
    canCancel: true,
  },
  {
    value: "Shipping",
    label: "Đang vận chuyển",
    color: "bg-yellow-200 text-yellow-900",
    canCancel: false,
  },
  {
    value: "Delivered",
    label: "Hoàn thành",
    color: "bg-green-100 text-green-800",
    canCancel: false,
  },
  {
    value: "Cancelled",
    label: "Đã hủy",
    color: "bg-red-100 text-red-800",
    canCancel: false,
  },
];

const getStatusConfig = (status: string) =>
  ORDER_STATUSES.find((s) => s.value === status) || ORDER_STATUSES[0];

const formatDate = (date: string) =>
  new Date(date).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const formatPrice = (price: number) => `${price.toLocaleString("vi-VN")} ₫`;


const CustomerInfo = ({
  order,
  className, // Thêm className vào destructuring
}: {
  order: Order;
  className?: string; // Thêm className vào kiểu props
}) => (
  <div className={className}>
    <h3 className="text-[13px] uppercase mb-[15px] text-[#242424]">ĐỊA CHỈ NGƯỜI NHẬN</h3>
    <div className="flex flex-col bg-white p-2.5 rounded-md h-full">
      <div className="uppercase text-[#242424] font-bold mt-[5px]">{order.user?.name}</div>
      <div className="mt-[5px]">
        Địa chỉ: {order.shippingAddress || order.user?.address}
      </div>
      <div className="mt-[5px]">Điện thoại: {order.user?.phone}</div>
    </div>
  </div>
);

const DeliveryInfo = ({className}: {className?: string}) => (
  <div className={className}>
    <h3 className="text-[13px] uppercase mb-[15px] text-[#242424]">HÌNH THỨC GIAO HÀNG</h3>
    <div className="flex flex-col bg-white p-2.5 rounded-md h-full">
      <div className="flex items-center space-x-2">
        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
          NOW
        </span>
        <span>Giao Siêu Tốc</span>
      </div>
      <div className="mt-[5px]">Miễn phí vận chuyển</div>
    </div>
  </div>
);

const PaymentInfo = ({ paymentMethod, className }: { paymentMethod: string; className?: string }) => (
  <div className={className}>
    <h3 className="text-[13px] uppercase mb-[15px] text-[#242424]">HÌNH THỨC THANH TOÁN</h3>
    <div className="flex flex-col bg-white p-2.5 rounded-md h-full">
      {paymentMethod || "Thanh toán tiền mặt khi nhận hàng"}
    </div>
  </div>
);

const OrderItemRow = ({ item }: { item: OrderItem }) => (
  <tr key={item.orderItemId} className="border-t-0 border-b border-[#F4F4F4] table-row">
    <td className="border-0 relative table-cell p-5 px-[15px] text-[#242424] align-top min-w-[100px] border-t-0 border-l-0">
      <div className="flex items-center space-x-3">
        <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
          {item.book.bookImages && item.book.bookImages.length > 0 ? (
            <img
              src={item.book.bookImages[0].thumbnailUrl}
              alt={item.book.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-xs font-bold text-center text-gray-500">
              {item.book.name.substring(0, 10)}...
            </div>
          )}
        </div>
        <div>
          <div className="font-medium text-gray-800">{item.book.name}</div>
          <div className="mt-3 text-[11px]">
            Cung cấp bởi{" "}
            <a href="#" className="text-[#0B74E5] no-underline bg-transparent">
              Tiki Trading
            </a>
          </div>
          <div className="p-2 mt-2 w-[114px] h-5 left-[75px] top-[61.5px] bg-[url(https://salt.tikicdn.com/ts/ta/b1/3f/4e/cc3d0a2dd751a7b06dd97d868d6afa56.png)] bg-cover">
          </div>
          <div className="my-3">Sku: {item.book.bookId}</div>
          <button className="inline-block mr-2.5 bg-white border border-[#189EFF] text-[12px] text-[#189EFF] py-[5px] px-[15px] rounded-md cursor-pointer">
            Chat với nhà bán
          </button>
          
        </div>
      </div>
    </td>
    <td className="border-0 relative table-cell p-5 px-[15px] text-[#242424] align-top min-w-[100px] whitespace-nowrap">{formatPrice(item.book.price)}</td>
    <td className="border-0 relative table-cell p-5 px-[15px] text-[#242424] align-top min-w-[100px]">{item.quantity}</td>
    <td className="border-0 relative table-cell p-5 px-[15px] text-[#242424] align-top min-w-[100px]">{formatPrice(0)}</td>
    <td className="border-0 relative table-cell p-5 px-[15px] text-[#242424] align-top min-w-[160px] text-right">{formatPrice(item.price * item.quantity)}</td>
  </tr>
);

const OrderSummary = ({
  order,
  onCancel,
}: {
  order: Order;
  onCancel: (id: number) => void;
}) => {
  const statusConfig = getStatusConfig(order.status);

  return (
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
        {statusConfig.canCancel && (
          <button
            onClick={() => onCancel(order.orderId)}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded mt-4"
          >
            Hủy đơn hàng
          </button>
        )}
      </div>
    </div>
  );
};

const SingleOrderDetailView = ({
  order,
  onCancel,
}: {
  order: Order;
  onCancel: (id: number) => void;
}) => {
  const statusConfig = getStatusConfig(order.status);

  return (
    <div className="text-[13px] text-[#242424] leading-relaxed">
      {/* Header */}
      <div className="text-[19px] font-light mt-5 flex items-center">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          Chi tiết đơn hàng #{order.orderId} -
          <span className={`px-2 py-1 rounded text-sm ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </h1>
        
      </div>
        <div className="flex items-end flex-col">
          Ngày đặt hàng: {formatDate(order.orderDate)}
        </div>
      {/* Info */}
      <div className="flex my-2.5 mb-5">
        <CustomerInfo order={order} className="flex flex-col text-black/65 ml-0 w-1/3 mx-1.5"/>
        <DeliveryInfo className="flex flex-col text-black/65 w-1/3 mx-1.5"/>
        <PaymentInfo paymentMethod={order.paymentMethod} className="flex flex-col text-black/65 mr-0 w-1/3 mx-1.5"/>
      </div>

      {/* Items */}
        <table className="w-full text-[#424242] table text-[13px] bg-white rounded-md border-separate border-spacing-0 leading-relaxed break-words">
          <thead>
            <tr className="table-row">
              <th className="table-cell p-5 px-[15px] pt-5 border-t-0 min-w-[100px] relative bg-transparent text-[#787878] text-[15px] font-normal border-b border-[#F4F4F4] text-left border-l-0">
                Sản phẩm
              </th>
              <th className="table-cell p-5 px-[15px] pt-5 border-t-0 min-w-[100px] relative bg-transparent text-[#787878] text-[15px] font-normal border-b border-[#F4F4F4] text-left">
                Giá
              </th>
              <th className="table-cell p-5 px-[15px] pt-5 border-t-0 min-w-[100px] relative bg-transparent text-[#787878] text-[15px] font-normal border-b border-[#F4F4F4] text-left">
                Số lượng
              </th>
              <th className="table-cell p-5 px-[15px] pt-5 border-t-0 min-w-[100px] relative bg-transparent text-[#787878] text-[15px] font-normal border-b border-[#F4F4F4] text-left">
                Giảm giá
              </th>
              <th className="table-cell p-5 px-[15px] pt-5 border-t-0 min-w-[100px] relative bg-transparent text-[#787878] text-[15px] font-normal border-b border-[#F4F4F4] text-right">
                Tạm tính
              </th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item) => (
              <OrderItemRow key={item.orderItemId} item={item} />
            ))}
          </tbody>
        </table>


      <div className="p-6 pb-6 my-0.5 mb-5 bg-white">
        <OrderSummary order={order} onCancel={onCancel} />
      </div>
    </div>
  );
};

const OrderActions = ({ handleGoBack }: { handleGoBack: () => void }) => (
  <div className="flex justify-start mt-4 mb-4 gap-4">
    <button
      onClick={handleGoBack}
      className="flex items-center text-blue-600 hover:text-blue-800"
    >
      <ChevronLeft className="w-4 h-4 mr-1" />
      <span className="w-[176.64px] h-[15.5px] left-[1px] top-[3px] font-sans font-normal text-[13px] leading-5 flex items-center text-[#0B74E5] cursor-pointer ">
        Quay lại đơn hàng của tôi
      </span>
    </button>
    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded">
      Theo dõi đơn hàng
    </button>
  </div>
);

function OrderDetail() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail(orderId);
    } else {
      setError("Không tìm thấy mã đơn hàng.");
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetail = async (orderId: string) => {
    setLoading(true);
    try {
      const response = await DataService.get<any>(`/OrderItem/byOrderId/${orderId}`);

      console.log("API Response:", response);
      const orderItemsData = response.data || response;

      if (!orderItemsData || orderItemsData.length === 0) {
        setError("Không tìm thấy thông tin đơn hàng.");
        return;
      }

      const firstOrderItem = orderItemsData[0];

      if (!firstOrderItem || !firstOrderItem.order) {
        setError("Dữ liệu đơn hàng không hợp lệ.");
        return;
      }

      const orderData = firstOrderItem.order;

      const userInfo: UserDto = {
        userId: orderData.userId,
        name: user?.name || "Không có thông tin",
        phone: user?.phone || "08666454515",
        address: orderData.shippingAddress,
      };

      const completeOrder: Order = {
        orderId: orderData.orderId,
        orderDate: orderData.orderDate,
        totalAmount: orderData.totalAmount,
        status: orderData.status,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        user: userInfo,
        orderItems: orderItemsData.map((orderItem: any) => ({
          orderItemId: orderItem.orderItemId,
          quantity: orderItem.quantity,
          price: orderItem.price,
          book: {
            bookId: orderItem.book.bookId,
            name: orderItem.book.name,
            price:
              orderItem.book.originalPrice ||
              orderItem.book.listPrice ||
              orderItem.book.price ||
              orderItem.price,
            bookImages: orderItem.book.bookImages || [],
          },
        })),
      };

      setOrder(completeOrder);
    } catch (error) {
      console.error("Error fetching order detail:", error);
      setError("Không thể tải chi tiết đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (id: number) => {
    try {
      await DataService.post(`/orders/${id}/cancel`, {});

      if (order) {
        setOrder({ ...order, status: "Cancelled" });
      }
    } catch (error) {
      console.error("Không thể hủy đơn hàng:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/customer/orders");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="p-6">Đang tải...</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="p-6 text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Quay lại danh sách đơn hàng
          </button>
        </div>
      </div>
    );

  return (
      <div className="flex-1 overflow-hidden">
        {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> */}
          {/* <main className="lg:col-span-4"> */}
            {order ? (
              <>
                <SingleOrderDetailView order={order} onCancel={handleCancelOrder} />
                <OrderActions handleGoBack={handleGoBack} />
              </>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                Không tìm thấy thông tin đơn hàng.
              </div>
            )}
          {/* </main> */}
        </div>
      // </div>
  );
}

export default OrderDetail;