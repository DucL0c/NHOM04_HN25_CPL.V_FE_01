"use client";

import { useState, Suspense, lazy } from "react";
import { User, Bell, Package } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

// Lazy load components
const UserProfile = lazy(() => import("./profile/Profile"));
const OrderDetail = lazy(() => import("./order/Orderdetail"));

type View = "profile" | "orders" | "notifications";

export default function AccountLayout() {
  const [currentView, setCurrentView] = useState<View>("profile");
  const { user, isAuthenticated } = useAuth();

  const renderView = () => {
    if (!isAuthenticated) {
      return (
        <div className="bg-white rounded-lg p-8 text-center text-gray-500">
          Vui lòng đăng nhập để xem thông tin tài khoản
          <a
            href="/login"
            className="block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đăng nhập
          </a>
        </div>
      );
    }

    switch (currentView) {
      case "profile":
        return <UserProfile />;
      case "orders":
        return <OrderDetail />;
      case "notifications":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-2">Thông báo của tôi</h2>
            <p className="text-gray-500">Hiện chưa có thông báo nào</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Tài khoản của</div>
                <div className="font-semibold text-gray-800">
                  {user?.name || "Người dùng"}
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setCurrentView("profile")}
                className={`flex items-center space-x-3 w-full text-sm p-3 rounded ${
                  currentView === "profile"
                    ? "bg-gray-100 font-medium text-gray-800"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Thông tin tài khoản</span>
              </button>
              <button
                onClick={() => setCurrentView("notifications")}
                className={`flex items-center space-x-3 w-full text-sm p-3 rounded ${
                  currentView === "notifications"
                    ? "bg-gray-100 font-medium text-gray-800"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Thông báo của tôi</span>
              </button>
              <button
                onClick={() => setCurrentView("orders")}
                className={`flex items-center space-x-3 w-full text-sm p-3 rounded ${
                  currentView === "orders"
                    ? "bg-gray-100 font-medium text-gray-800"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Quản lý đơn hàng</span>
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">⏳ Đang tải...</p>
                  </div>
                </div>
              }
            >
              {renderView()}
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}