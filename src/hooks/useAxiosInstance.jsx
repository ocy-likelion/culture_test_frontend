import axios from "axios";

export default function useAxiosInstance() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    // withCredentials: true, // 쿠키 자동 전송을 위한 코드
  });

  return instance;
}
