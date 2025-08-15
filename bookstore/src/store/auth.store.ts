import { create } from 'zustand';
import type { AuthState, User } from './types/auth.types';

const getInitialUser = (): User | null => {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};

export const useAuthStore = create<AuthState>((set) => {
  const user = getInitialUser();
  return {
    user,
    isAuthenticated: !!user,
    login: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', user.token);
      set({ user, isAuthenticated: true });
    },
    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      set({ user: null, isAuthenticated: false });
    },
  };
});
