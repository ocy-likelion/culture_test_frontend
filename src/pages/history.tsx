import useAxiosInstance from "@/hooks/useAxiosInstance";
import SurveyLayout from "@components/layouts/SurveyLayout";
import ResultDetail from "@components/ResultDetail";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function HistoryPage() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { resultId } = useParams(); // path parameter 추출 (경로에 포함된 값)
  // cf) useSearchParams(): 쿼리스트링 추출

  const { data: detail } = useQuery({
    queryKey: ["result", resultId],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/result/analysis/${resultId}`);
      console.log("결과 디테일: ", res.data);
      return res.data;
    },
  });

  return (
    <SurveyLayout
      containerCN="bg-grey-20"
      leftSlot={
        <button onClick={() => navigate(-1)}>
          <img
            src={`/chevron-left.svg`}
            className="w-[2.4rem] lg:w-[3.2rem] aspect-square"
          />
        </button>
      }
      middleSlot={<img src={`/logo.svg`} className="w-[16rem]" />}
      rightSlot={
        <button>
          <img
            src={`/share.svg`}
            className="w-[2.4rem] lg:w-[3.2rem] aspect-square"
            onClick={() => navigate("/mypage")}
          />
        </button>
      }
      mainCN="px-[2rem] pt-[8rem] gap-[1.6rem] xl:gap-[2rem] pb-[2rem]"
    >
      <ResultDetail
        chartResult={detail?.result}
        resultType={detail?.resultType}
        history
      />
    </SurveyLayout>
  );
}
