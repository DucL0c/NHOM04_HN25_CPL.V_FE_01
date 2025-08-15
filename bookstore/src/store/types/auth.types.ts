export interface User {
  userId: number;
  fullName?: string;
  email: string;
  role: "user" | "admin";
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
