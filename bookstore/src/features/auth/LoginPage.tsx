import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/authService";
import { useAuthStore } from "../../store/auth.store";
import { useContext } from "react";
import { ToastContext } from "../../contexts/ToastProvider";
import { jwtDecode } from "jwt-decode";
import type { User } from "../../store/types/auth.types";

interface LoginForm {
  Email: string;
  Password: string;
}

interface TokenPayload {
  sub: string;
  email: string;
  role: "user" | "admin";
  fullName?: string;
}

interface LoginPageProps {
  onSuccess?: () => void;
  onSwitch?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onSwitch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { toast } = useContext(ToastContext);
  const onSubmit = async (data: LoginForm) => {
    const loadingId = toast.loading("Đang đăng nhập...");
    try {
      const response = await authService.login(data);
      if (response && typeof response === "object") {
        Object.entries(response).forEach(([key, value]) => {
          console.log(`[LOGIN] response.${key}:`, value);
        });
      } else {
        console.log("[LOGIN] response:", response);
      }
      const { accessToken, user } = response || {};
      if (!accessToken || !user) {
        throw new Error("Thiếu accessToken hoặc user trong response");
      }
      const decoded = jwtDecode<TokenPayload>(accessToken);
      const fullUser: User = {
        ...user,
        role: decoded.role,
        token: accessToken,
      };
      // Cập nhật store và localStorage
      login(fullUser);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(fullUser));
      toast.success("Đăng nhập thành công!");
      navigate(from, { replace: true });
      onSuccess?.();
    } catch (err: any) {
      const message = err?.response?.data?.message || "Đăng nhập thất bại!";
      toast.error(message);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  return (
    <div className="flex w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 p-8">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Đăng nhập bằng email</h2>
          <p className="text-gray-600 mb-6">
            Nhập email và mật khẩu tài khoản của bạn
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="abc@email.com"
                className="w-full border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 bg-transparent"
                {...register("Email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors.Email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className="w-full border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 bg-transparent"
                autoComplete="current-password"
                {...register("Password", {
                  required: "Vui lòng nhập mật khẩu",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu tối thiểu 6 ký tự",
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm text-blue-500 hover:underline"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
              {errors.Password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>

          {/* Links */}
          <div className="mt-4 space-y-8">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline w-fit"
            >
              Quên mật khẩu?
            </a>
            <p className="text-xs text-gray-500">
              Chưa có tài khoản?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline font-medium bg-transparent border-0 outline-none p-0 ml-1"
                onClick={onSwitch}
              >
                Tạo tài khoản
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="hidden md:flex w-[280px] flex-col items-center justify-center bg-[#E8F1FF] p-6">
        <img
          src="/login-illustration.png"
          alt="login"
          className="w-36 h-36 object-contain mb-3"
        />
        <h4 className="font-semibold text-[#1A66FF] mb-1">Mua sắm tại Tiki</h4>
        <p className="text-xs text-gray-600">Siêu ưu đãi mỗi ngày</p>
      </div>
    </div>
  );
};

export default LoginPage;
