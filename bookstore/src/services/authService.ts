import type { User } from "../store/types/auth.types"; // Đảm bảo bạn có User type
import DataService from "../services/axiosClient";

const authService = {
  login: (data: { Email: string; Password: string }) =>
    DataService.post<{ accessToken: string; user: User }>(
      "/Auth/login",
      data
    ),

  register: (data: {
    Email: string;
    PasswordHash: string;
    ConfirmPassword: string;
  }) =>
    DataService.post<{ accessToken: string; user: User }>(
      "/Auth/register",
      data
    ),

  forgotPassword: (Email: string) =>
    DataService.post<{ message: string }>("/Auth/forgot-password", {
      Email,
    }),
};

export default authService;
