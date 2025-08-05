import axiosClient from "./axiosClient";

class DataService {
  get<T>(url: string, params?: any) {
    return axiosClient.get<T>(url, { params });
  }

  post<T>(url: string, data: any) {
    return axiosClient.post<T>(url, data);
  }

  put<T>(url: string, data: any) {
    return axiosClient.put<T>(url, data);
  }

  delete<T>(url: string) {
    return axiosClient.delete<T>(url);
  }
}

export default new DataService();
