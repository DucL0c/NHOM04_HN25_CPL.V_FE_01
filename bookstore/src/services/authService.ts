import dataService from './dataService';

// Service cho các API xác thực: đăng nhập, đăng ký, quên mật khẩu, đổi mật khẩu
const authService = {
  login: (data: { email: string; password: string }) =>
    dataService.post<{ accessToken: string }>('/login', data),

  register: (data: { name: string; email: string; password: string }) =>
    dataService.post<{ accessToken: string }>('/register', data),

  forgotPassword: (email: string) =>
    dataService.post<{ message: string }>('/forgot-password', { email }),

  resetPassword: (data: { token: string; newPassword: string }) =>
    dataService.post<{ message: string }>('/reset-password', data),
};

export default authService;
