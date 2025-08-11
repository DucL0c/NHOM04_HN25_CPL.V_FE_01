import axiosClient from "./axiosClient";

const dataService = {
  async get<T = any>(url: string, params?: any): Promise<T> {
    const res = await axiosClient.get(url, { params });
    return res.data; // ✅ LẤY DATA
  },
  async post<T = any>(url: string, data?: any): Promise<T> {
    const res = await axiosClient.post(url, data);
    return res.data; // ✅
  },
  async put<T = any>(url: string, data?: any): Promise<T> {
    const res = await axiosClient.put(url, data);
    return res.data; // ✅
  },
  async delete<T = any>(url: string): Promise<T> {
    const res = await axiosClient.delete(url);
    return res.data; // ✅
  },
};

export default dataService;
