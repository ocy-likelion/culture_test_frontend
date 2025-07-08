import Login from "@pages/login";
import MyPage from "@pages/my";
import ResultPage from "@pages/result";
import StartPage from "@pages/start";
import SurveyPage from "@pages/survey";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/start",
      element: <StartPage />,
    },
    {
      path: "/survey",
      element: <SurveyPage />,
    },
    {
      path: "/result",
      element: <ResultPage />,
    },
    {
      path: "/my",
      element: <MyPage />,
    },
  ],
  {
    future: {
      // 없으면 콘솔에 경고 표시
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
