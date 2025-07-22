import useUserStore from "@/zustand/useUserStore";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    toast.error("로그인이 필요합니다.");
    // alert("로그인이 필요합니다.");
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
