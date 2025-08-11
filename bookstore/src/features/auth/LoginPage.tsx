import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { useAuthStore } from '../../store/auth.store';
import ToastService from '../../services/notificationService';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginPageProps {
  onSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    ToastService.loading('Đang đăng nhập...');
    try {
      const response = await authService.login(data);
      const accessToken = response.data?.accessToken;
      const user = {
        id: '1',
        name: data.email.split('@')[0],
        email: data.email,
        token: accessToken,
        role: 'user' as const,
      };
      login(user);
      localStorage.setItem('accessToken', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Đăng nhập thành công:', user);
      ToastService.success('Đăng nhập thành công!');
      if (onSuccess) onSuccess();
      else navigate(-1);
    } catch (error: any) {
      ToastService.error('Đăng nhập thất bại!');
    } finally {
      ToastService.dismiss();
    }
  };

  return (
    <div className="flex w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Left: Form */}
      <div className="flex-1 p-8">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Đăng nhập bằng email</h2>
          <p className="text-gray-600 mb-6">Nhập email và mật khẩu tài khoản Tiki</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="acb@email.com"
                className="w-full border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 bg-transparent"
                {...register('email', {
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: /\S+@\S+\.\S+/, 
                    message: 'Email không hợp lệ',
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            {/* Password */}
            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full border-b border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 bg-transparent"
                {...register('password', {
                  required: 'Vui lòng nhập mật khẩu',
                  minLength: { value: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>
          {/* Links */}
          <div className="mt-4 space-y-8">
            {/* Dòng 1: Quên mật khẩu */}
            <a href="#" className="text-sm text-blue-600 hover:underline w-fit">
              Quên mật khẩu?
            </a>

            {/* Dòng 2: Chưa có tài khoản + link tạo tài khoản */}
            <p className="text-xs text-gray-500">
              Chưa có tài khoản?{' '}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Tạo tài khoản
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Right: Banner */}
      <div className="hidden md:flex w-[280px] flex-col items-center justify-center bg-[#E8F1FF] p-6">
        <img src="/login-illustration.png" alt="" className="w-36 h-36 object-contain mb-3" />
        <h4 className="font-semibold text-[#1A66FF] mb-1">Mua sắm tại Tiki</h4>
        <p className="text-xs text-gray-600">Siêu ưu đãi mỗi ngày</p>
      </div>
    </div>
  );
};

export default LoginPage;
