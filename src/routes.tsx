import Login from "@pages/login";
import MyPage from "@/pages/mypage";
import ResultsPage from "@pages/results";
import IntroPage from "@/pages/intro";
import SurveyPage from "@/pages/survey";
import { createBrowserRouter } from "react-router-dom";
import HistoryPage from "@pages/history";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
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
      path: "/mypage/history",
      element: <HistoryPage />,
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
