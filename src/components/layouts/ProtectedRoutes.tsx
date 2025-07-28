import useUserStore from "@/zustand/useUserStore";
import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  console.log("pathname: ", location.pathname);
  const { user, fromSession } = useUserStore();

  // 유저가 마이페이지에서 로그아웃/회원탈퇴 버튼을 누르면 중복알림이 뜨는 것을 방지하기 위해 전역상태 fromLogout 이용한 조건 분기
  if (!user) {
    if (!fromSession) {
      toast.error("로그인이 필요합니다.", { id: "auth-error" });
    }
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
