import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginPageProps {
  onSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/";

  const handleLogin = async (formData: LoginFormData) => {
    try {
      await login({ email: formData.email, password: formData.password });
      navigate(redirectPath, { replace: true });
      onSuccess?.();
    } catch (error) {
      setLoginError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      console.error("Login failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex-1 p-8">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Đăng nhập bằng email</h2>
          <p className="text-gray-600 mb-6">
            Nhập email và mật khẩu tài khoản của bạn
          </p>

          {loginError && (
            <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded">
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit(handleLogin)}>
            <EmailInput
              register={register}
              error={errors.email}
            />
            
            <PasswordInput
              register={register}
              error={errors.password}
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
            />

            <SubmitButton isSubmitting={isSubmitting} />
          </form>

          <LoginLinks />
        </div>
      </div>

      <LoginBanner />
    </div>
  );
};

const EmailInput: React.FC<{
  register: any;
  error?: { message?: string };
}> = ({ register, error }) => (
  <div className="mb-4">
    <input
      type="email"
      placeholder="abc@email.com"
      className="w-full border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 bg-transparent"
      {...register("email", {
        required: "Vui lòng nhập email",
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: "Email không hợp lệ",
        },
      })}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const PasswordInput: React.FC<{
  register: any;
  error?: { message?: string };
  showPassword: boolean;
  onToggleVisibility: () => void;
}> = ({ register, error, showPassword, onToggleVisibility }) => (
  <div className="mb-4 relative">
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Mật khẩu"
      className="w-full border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 bg-transparent"
      autoComplete="current-password"
      {...register("password", {
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
      onClick={onToggleVisibility}
    >
      {showPassword ? "Ẩn" : "Hiện"}
    </button>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const SubmitButton: React.FC<{ isSubmitting: boolean }> = ({ isSubmitting }) => (
  <button
    type="submit"
    className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 mt-4"
    disabled={isSubmitting}
  >
    {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
  </button>
);

const LoginLinks: React.FC = () => (
  <div className="mt-4 space-y-8">
    <a
      href="/forgot-password"
      className="text-sm text-blue-600 hover:underline w-fit"
    >
      Quên mật khẩu?
    </a>
    <p className="text-xs text-gray-500">
      Chưa có tài khoản?{" "}
      <a
        href="/register"
        className="text-blue-600 hover:underline font-medium"
      >
        Tạo tài khoản
      </a>
    </p>
  </div>
);

const LoginBanner: React.FC = () => (
  <div className="hidden md:flex w-[280px] flex-col items-center justify-center bg-[#E8F1FF] p-6">
    <img
      src="/login-illustration.png"
      alt="login"
      className="w-36 h-36 object-contain mb-3"
    />
    <h4 className="font-semibold text-[#1A66FF] mb-1">Mua sắm tại Tiki</h4>
    <p className="text-xs text-gray-600">Siêu ưu đãi mỗi ngày</p>
  </div>
);

export default LoginPage;