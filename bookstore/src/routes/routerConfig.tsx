import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout"; 

const Home = lazy(() => import("../features/home"));
const BookDetail = lazy(() => import("../features/books/BookDetail")); 

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true, element: <Home />
            },
            {
              path: "books/:id", // -> /books/:id
              element: <BookDetail />,
            },
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true, element: <div>Admin Dashboard</div>
            },
        ]
    },
    {
        path: "/login",
        element: <AuthLayout />,
        children: [
            {
                index: true, element: <div>Login Page</div>
            },
        ]
    }
];