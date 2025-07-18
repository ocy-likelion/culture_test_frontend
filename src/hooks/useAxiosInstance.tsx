import axios, { AxiosInstance } from "axios";

export default function useAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    withCredentials: true, // 브라우저가 해당 baseURL(도메인)의 쿠키를 요청에 자동으로 포함하도록 설정
  });
  // axios에서 CORS 환경에서 브라우저가 쿠키를 포함해 요청하도록 허용하는 설정입니다.
  // baseURL이 https://api.example.com이면, 내 브라우저가 "그 도메인에 대해 가지고 있는 쿠키"를 ✨자동으로✨ "요청 시 헤더에 포함"시킵니다.
  // 즉, Set-Cookie로 내려온 쿠키를 프론트에서 직접 꺼내거나 저장하지 않아도, 이후 요청부터 자동으로 포함됩니다

  return instance;
}
