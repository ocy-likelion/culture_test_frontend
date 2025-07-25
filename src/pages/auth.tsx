import useAxiosInstance from "@/hooks/useAxiosInstance";
import useUserStore from "@/zustand/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const axios = useAxiosInstance();

  const {
    data: loginUser,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/auth/me");
      console.log(res.data);
      setUser(res.data);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지 (선택)
    retry: false, // ❗ 인증 실패(401)는 재시도하지 않도록
  });

  // ✅ 에러 발생 시 메시지 분기 처리
  // isError: 에러가 발생했는지 여부 (boolean)
  // error: 실제 에러 객체
  if (isError) {
    const err = error as AxiosError<{ message?: string }>;
    console.log("err 객체: ", err);
    const serverMessage = err.response?.data?.message;
    const status = err.response?.status;

    let message = serverMessage || "로그인 중 문제가 발생했습니다.";

    if (!err.response) {
      message = "네트워크 오류입니다. 인터넷 연결을 확인해주세요.";
    } else {
      message = "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-red-500">{message}</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-4 py-2 bg-primary-50 text-white rounded"
        >
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  // ✅ 유저 데이터가 세팅되면 intro로 이동
  useEffect(() => {
    if (loginUser) {
      navigate("/intro", { replace: true });
    }
  }, [loginUser]);

  return null; // navigate 이후라 아무것도 렌더링하지 않음
}
