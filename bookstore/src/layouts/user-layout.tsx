"use client"

import { useState } from "react"
import { User, Phone, Mail, Shield, Eye, Facebook } from "lucide-react"

interface UserProfileProps {
  className?: string
}

export default function UserProfile({ className = "" }: UserProfileProps) {
  const [formData, setFormData] = useState({
    fullName: "ho & ten",
    nickname: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    nationality: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <span>Trang chủ</span> &gt; <span className="text-blue-600">Thông tin tài khoản</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              {/* User Avatar */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tài khoản của</p>
                  <p className="font-semibold">họ & tên</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-blue-50 text-blue-600 rounded">
                  <User size={16} />
                  <span className="text-sm font-medium">Thông tin tài khoản</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span className="text-sm">Thông báo của tôi</span>
                </div>
                <div className="flex items-center gap-3 p-2 text-gray-600 hover:bg-gray-50 rounded">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span className="text-sm">Quản lý đơn hàng</span>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-xl font-semibold text-orange-600 mb-6">Thông tin tài khoản</h1>

              <div className="space-y-6">
                <h2 className="font-medium text-gray-900">Thông tin cá nhân</h2>

                {/* Avatar Section */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="text-blue-600" size={32} />
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>Họ & Tên</span>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Nickname</label>
                    <input
                      type="text"
                      placeholder="Thêm nickname"
                      value={formData.nickname}
                      onChange={(e) => handleInputChange("nickname", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div></div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Ngày sinh</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={formData.birthDay}
                      onChange={(e) => handleInputChange("birthDay", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Ngày</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      value={formData.birthMonth}
                      onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Tháng</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Tháng {i + 1}
                        </option>
                      ))}
                    </select>
                    <select
                      value={formData.birthYear}
                      onChange={(e) => handleInputChange("birthYear", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Năm</option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Giới tính</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Nam"
                        checked={formData.gender === "Nam"}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className="mr-2"
                      />
                      Nam
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Nữ"
                        checked={formData.gender === "Nữ"}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className="mr-2"
                      />
                      Nữ
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Khác"
                        checked={formData.gender === "Khác"}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className="mr-2"
                      />
                      Khác
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Quốc tịch</label>
                  <select
                    value={formData.nationality}
                    onChange={(e) => handleInputChange("nationality", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Chọn quốc tịch</option>
                    <option value="VN">Việt Nam</option>
                    <option value="US">Hoa Kỳ</option>
                    <option value="JP">Nhật Bản</option>
                  </select>
                </div>

                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium text-gray-900 mb-4">Số điện thoại và Email</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Số điện thoại</p>
                        <p className="text-sm">0853202610</p>
                      </div>
                    </div>
                    <button className="text-blue-500 text-sm border border-blue-500 px-3 py-1 rounded">Cập nhật</button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Địa chỉ email</p>
                        <p className="text-sm">test1233@gmail.com</p>
                      </div>
                    </div>
                    <button className="text-blue-500 text-sm border border-blue-500 px-3 py-1 rounded">Cập nhật</button>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium text-gray-900 mb-4">Bảo mật</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className="text-gray-400" />
                      <span className="text-sm">Thiết lập mật khẩu</span>
                    </div>
                    <button className="text-blue-500 text-sm border border-blue-500 px-3 py-1 rounded">Cập nhật</button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-400 rounded"></div>
                      <span className="text-sm">Thiết lập mã PIN</span>
                    </div>
                    <button className="text-blue-500 text-sm border border-blue-500 px-3 py-1 rounded">
                      Thiết lập
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-400 rounded"></div>
                      <span className="text-sm">Yêu cầu xóa tài khoản</span>
                    </div>
                    <button className="text-blue-500 text-sm border border-blue-500 px-3 py-1 rounded">Yêu cầu</button>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium text-gray-900 mb-4">Liên kết mạng xã hội</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Facebook size={16} className="text-blue-600" />
                      <span className="text-sm">Facebook</span>
                    </div>
                    <button className="text-blue-500 text-sm border border-blue-500 px-3 py-1 rounded">Liên kết</button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Google</span>
                    </div>
                    <button className="text-blue-500 text-sm border border-blue-500 px-3 py-1 rounded">
                      Đã liên kết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
