import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";

const Home = lazy(() => import("../features/home"));

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true, element: <Home />
            },
        ]
    }
];