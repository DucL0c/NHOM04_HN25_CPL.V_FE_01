import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import UserProfile from "../layouts/user-layout";
import OrderDetail from "../features/books/orderdetail";
const Home = lazy(() => import("../features/home"));
const BookDetail = lazy(() => import("../features/books/BookDetail"));

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
        path: "OrderDetail",
        element: <OrderDetail />,
      }
    ],
  },
];
