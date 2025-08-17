import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import UserProfile from "../pages/profile/Profile";
import Checkout from "../pages/order/Checkout";
import Confirm from "../pages/order/Comfirm";
import OrderDetail from "../pages/order/Orderdetail";
import Cart from "../pages/cart/Cart";
import AccountLayout from "../pages/lazylayout";

const Home = lazy(() => import("../pages/home"));
const BookDetail = lazy(() => import("../pages/books/BookDetail"));

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
        path: "userprofile",
        element: <UserProfile />,
      },
      { 
        path: "/checkout", 
        element: <Checkout /> 
      },
      {
        path: "/confirm",
        element: <Confirm />,
      },
      {
        path: "/orders",
        element: <OrderDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path:"/test",
        element: <AccountLayout />,
      }
    ],
  },
];
