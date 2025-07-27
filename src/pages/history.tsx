import Spinner from "@/components/Spinner";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useCapture } from "@/hooks/useCapture";
import useUserStore from "@/zustand/useUserStore";
import SurveyLayout from "@components/layouts/SurveyLayout";
import ResultDetail from "@components/ResultDetail";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function HistoryPage() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { user } = useUserStore();
  const { resultId } = useParams(); // path parameter 추출 (경로에 포함된 값)
  // cf) useSearchParams(): 쿼리스트링 추출
  console.log(resultId);

  const { captureDiv } = useCapture();
  const divRef = useRef<HTMLDivElement>(null);

  const handleCapture = () => {
    if (!user || !imageName) return;
    captureDiv(divRef, `${user.nickname}_${imageName}.png`);
  };

  const {
    data: detail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["result"],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/result/analysis/${resultId}`);
      console.log("결과 디테일: ", res.data);
      return res.data;
    },
  });

  function extractKoreanName(path: string): string {
    // 예: "/images/행동가형.png" → "행동가형"
    const filename = path?.split("/").pop(); // "리더형.png"
    const match = filename?.match(/([\uAC00-\uD7A3]+)(?=\.\w+$)/);
    return match ? match[1] : "";
  }
  const imageName = extractKoreanName(detail?.analysisResponseDto.imageUrl);

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
      middleSlot={<img src={`/logo-s.svg`} className="w-[5rem] lg:w-[6rem]" />}
      rightSlot={
        <button>
          <img
            src={`/download.svg`}
            className="w-[2.4rem] lg:w-[3.2rem] aspect-square"
            onClick={() => handleCapture()}
          />
        </button>
      }
      mainCN="px-[2rem] pt-[7rem] lg:pt-[8rem] gap-[1.6rem] xl:gap-[2rem] pb-[2rem]"
    >
      {isLoading && <Spinner />}

      {isError && (
        <div className="text-center text-red-500 text-[1.4rem]">
          데이터를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </div>
      )}

      {!isLoading && !isError && (
        <div
          ref={divRef}
          id="capture-area"
          className="flex flex-col space-y-[1.8rem]"
        >
          <ResultDetail
            chartResult={detail?.analysisResponseDto.result}
            resultType={detail?.analysisResponseDto.resultType}
            description={detail?.analysisResponseDto.resultTypeDetail}
            resultImage={imageName}
            className="gap-2"
            history
          />
        </div>
      )}
    </SurveyLayout>
  );
}
