import { create } from "zustand";
import { LoginFormData, ResponseLoginData } from "./type";
import axios, { AxiosError } from "axios";
import { DOMAIN_API } from "@/lib/constant/env";
import { toast } from "react-toastify";

export const authStore = create((set: any, get: any) => ({
  signIn: async (body: LoginFormData) => {
    try {
      const response = await axios.post(`https://dummyjson.com/auth/login`, {
        username: body.username,
        password: body.password,
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.code === "ECONNABORTED") {
          toast.error("Permintaan timeout. Silakan coba lagi.");
        } else if (axiosError.response) {
          console.error("Response data:", axiosError.response.data);
          console.error("Response status:", axiosError.response.status);
          toast.error(
            `Error: ${axiosError.response.status} - ${axiosError.response.statusText}`,
          );
        } else if (axiosError.request) {
          console.error("No response received:", axiosError.request);
          toast.error("Tidak ada respons dari server. Periksa koneksi Anda.");
          // toast.error(axiosError.request);
        } else {
          console.error("Error:", axiosError.message);
          toast.error("Terjadi kesalahan. Silakan coba lagi.");
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("Terjadi kesalahan yang tidak terduga. Silakan coba lagi.");
      }
      throw error;
    }
  },
}));
