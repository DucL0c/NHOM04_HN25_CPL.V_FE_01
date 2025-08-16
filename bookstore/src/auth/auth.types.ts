export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  userId: number;
  email: string;
  name: string;
  role: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};
