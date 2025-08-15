import dataService from "./dataService";
import type { User } from "../store/types/auth.types"; // Đảm bảo bạn có User type

const authService = {
  login: (data: { Email: string; Password: string }) =>
    dataService.post<{ accessToken: string; user: User }>(
      "/api/Auth/login",
      data
    ),

  register: (data: {
    Email: string;
    PasswordHash: string;
    ConfirmPassword: string;
  }) =>
    dataService.post<{ accessToken: string; user: User }>(
      "/api/Auth/register",
      data
    ),

  forgotPassword: (Email: string) =>
    dataService.post<{ message: string }>("/api/Auth/forgot-password", {
      Email,
    }),
};

export default authService;
