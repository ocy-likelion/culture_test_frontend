import Login from "@pages/login";
import MyPage from "@/pages/mypage";
import ResultsPage from "@pages/results";
import IntroPage from "@/pages/intro";
import SurveyPage from "@/pages/survey";
import { createBrowserRouter } from "react-router-dom";
import HistoryPage from "@pages/history";
import NotFoundPage from "@/pages/NotFound";
import Auth from "@/pages/auth";
import ProtectedRoutes from "@/components/layouts/ProtectedRoutes";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },

    // ✅ 로그인해야 접근 가능한 페이지만 ProtectedRoute 적용
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/intro",
          element: <IntroPage />,
        },
        {
          path: "/survey",
          element: <SurveyPage />,
        },
        {
          path: "/results",
          element: <ResultsPage />,
        },
        {
          path: "/mypage",
          element: <MyPage />,
        },
        {
          path: "/mypage/history/:resultId",
          element: <HistoryPage />,
        },
      ],
    },
  ]
  // {
  //   future: {
  //     // 없으면 콘솔에 경고 표시
  //     v7_fetcherPersist: true,
  //     v7_normalizeFormMethod: true,
  //     v7_partialHydration: true,
  //     v7_relativeSplatPath: true,
  //     v7_skipActionErrorRevalidation: true,
  //   },
  // }
);

export default router;
