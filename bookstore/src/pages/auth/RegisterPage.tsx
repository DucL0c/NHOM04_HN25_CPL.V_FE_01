import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ToastContext } from "../../contexts/ToastProvider";
import DataService from "../../services/axiosClient";

interface RegisterForm {
  Email: string;
  PasswordHash: string;
  ConfirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterForm>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useContext(ToastContext);

  const onSubmit = async (data: RegisterForm) => {
    const loadingId = toast.loading("Đang đăng ký...");
    try {
      await DataService.post("/Auth/register", data);
      toast.success("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Đăng ký thất bại!";
      toast.error(message);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  return (
    <div className="flex w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 p-8">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Đăng ký tài khoản</h2>
          <p className="text-gray-600 mb-6">Nhập thông tin để tạo tài khoản mới</p>

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
                    value: /\S+@\S+\.\S+/, // Email regex
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors.Email && (
                <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                className="w-full border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 bg-transparent"
                autoComplete="new-password"
                {...register("PasswordHash", {
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
              {errors.PasswordHash && (
                <p className="text-red-500 text-sm mt-1">{errors.PasswordHash.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                className="w-full border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 bg-transparent"
                autoComplete="new-password"
                {...register("ConfirmPassword", {
                  required: "Vui lòng nhập lại mật khẩu",
                  validate: (value) =>
                    value === watch("PasswordHash") || "Mật khẩu không khớp",
                })}
              />
              {errors.ConfirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.ConfirmPassword.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded font-semibold hover:bg-blue-600 mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>

          {/* Links */}
          <div className="mt-4 space-y-8">
            <a
              href="/login"
              className="text-sm text-blue-600 hover:underline w-fit"
            >
              Đã có tài khoản? Đăng nhập
            </a>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="hidden md:flex w-[280px] flex-col items-center justify-center bg-[#E8F1FF] p-6">
        <img
          src="/login-illustration.png"
          alt="register"
          className="w-36 h-36 object-contain mb-3"
        />
        <h4 className="font-semibold text-[#1A66FF] mb-1">Mua sắm tại Tiki</h4>
        <p className="text-xs text-gray-600">Siêu ưu đãi mỗi ngày</p>
      </div>
    </div>
  );
};

export default RegisterPage;
