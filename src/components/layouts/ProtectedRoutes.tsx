import useUserStore from "@/zustand/useUserStore";
import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    // ✅ 마이페이지에서 로그아웃/회원탈퇴 후, 로그인 페이지로 이동하려는 경우엔 toast를 띄우지 않음
    if (location.pathname !== "/mypage") {
      toast.error("로그인이 필요합니다.", { id: "auth-error" });
    }
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
