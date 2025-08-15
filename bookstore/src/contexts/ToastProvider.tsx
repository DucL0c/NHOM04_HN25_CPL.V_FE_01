import { createContext } from 'react';
import type { ReactNode } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextType {
  toast: typeof toast;
}
export const ToastContext = createContext<ToastContextType>({ toast } as ToastContextType);

interface ToastProviderProps {
  children: ReactNode;
}
export const ToastProvider = ({ children }: ToastProviderProps) => {
  const value = { toast };
  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
