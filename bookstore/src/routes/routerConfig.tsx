import { lazy } from "react";

const Home = lazy(() => import("../pages/home"));
const BookDetail = lazy(() => import("../pages/books/BookDetail"));
const OrderList = lazy(() => import("../pages/order/OrderList"));
const Cart = lazy(() => import("../pages/cart/Cart"));
const AccountLayout = lazy(() => import("../layouts/AccountLayout"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const UserProfile = lazy(() => import("../pages/profile/Profile"));
const Checkout = lazy(() => import("../pages/order/Checkout"));

const Confirm = lazy(() => import("../pages/order/Comfirm"));
const SearchPage = lazy(() => import("../pages/search/SearchPage"));

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "books/:id",
        element: <BookDetail />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/confirm",
        element: <Confirm />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/customer",
        element: <AccountLayout />,
        children: [
          {
            path: "account",
            element: <UserProfile />,
          },
          {
            path: "notification",
            element: (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Thông báo của tôi
                </h2>
                <p className="text-gray-500">Hiện chưa có thông báo nào</p>
              </div>
            ),
          },
          {
            path: "orders",
            element: <OrderList />,
          },
        ],
      },

      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
];
