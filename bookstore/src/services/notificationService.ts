import { toast } from "react-hot-toast";

const DEFAULT_DURATION = 3000;

const ToastService = {
  success: (message: string) => toast.success(message, { duration: DEFAULT_DURATION }),
  error: (message: string) => toast.error(message, { duration: DEFAULT_DURATION }),
  loading: (message: string, id = 'global-loading') =>
    toast.loading(message, { id, duration: Infinity }), // duration: Infinity → không tự đóng
  updateSuccess: (message: string, id = 'global-loading') =>
    toast.success(message, { id, duration: DEFAULT_DURATION }),
  dismiss: () => toast.dismiss(),
};

export default ToastService;
