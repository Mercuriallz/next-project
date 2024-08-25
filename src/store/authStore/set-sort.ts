import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { create } from "zustand";

export const sortStore = create(() => ({
insertLink: async(longUrl: string, domain?: string, groupGuid?: string) => {
    const token = "d0d09d59c59805e93b10629a1dbede967d32c831"
    try {
        const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
            long_url: longUrl,
            domain: domain,
            group_guid: groupGuid
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
    );
        
         return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.code === "ECONNABORTED") {
            //   toast.error("Permintaan timeout. Silakan coba lagi.");
            } else if (axiosError.response) {
              console.error("Response data:", axiosError.response.data);
              console.error("Response status:", axiosError.response.status);
            //   toast.error(
            //     Error: ${axiosError.response.status} - ${axiosError.response.statusText},
            //   );
            } else if (axiosError.request) {
              console.error("No response received:", axiosError.request);
            //   toast.error("Tidak ada respons dari server. Periksa koneksi Anda.");
              // toast.error(axiosError.request);
            } else {
              console.error("Error:", axiosError.message);
            //   toast.error("Terjadi kesalahan. Silakan coba lagi.");
            }
          } else {
            console.error("Unexpected error:", error);
            // toast.error("Terjadi kesalahan yang tidak terduga. Silakan coba lagi.");
          }
    throw error;
    }
}
}))