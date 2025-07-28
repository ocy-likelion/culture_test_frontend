import useUserStore from "@/zustand/useUserStore";
import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import ResultDetail from "@components/ResultDetail";
import useAnswersStore from "@zustand/useAnswersStore";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCapture } from "@/hooks/useCapture";
import convertToSvgPath from "@/hooks/useConvertPath";

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultType, result, imageUrl, resultTypeDetail } =
    location.state?.main;
  const { percentage } = location.state?.cluster;
  const { resetAnswer } = useAnswersStore();
  const { user } = useUserStore();

  const imageName = convertToSvgPath(imageUrl);

  const divRef = useRef<HTMLDivElement>(null);
  const { captureDiv } = useCapture();

  const handleCapture = () => {
    if (!user || !resultType) return;
    captureDiv(divRef, `${user.nickname}_${resultType}.png`);
  };

  return (
    <SurveyLayout
      containerCN="bg-grey-20"
      mainCN="px-[2rem] pt-[8rem] gap-[1.6rem] xl:gap-[2rem] pb-[1rem]"
      footerCN="bg-grey-20 static"
      leftSlot={
        <button>
          <img
            src={user?.profileImageUrl}
            className="w-[3.4rem] lg:w-[3.8rem] aspect-square rounded-full"
            onClick={() => navigate("/mypage")}
          />
        </button>
      }
      middleSlot={
        <button
          onClick={() => {
            navigate("/");
            resetAnswer();
          }}
        >
          <img src={`/logo-s.svg`} className="w-[5rem] lg:w-[6rem]" />
        </button>
      }
      rightSlot={
        <button onClick={() => handleCapture()}>
          <img
            src={`/download.svg`}
            className="w-[2.8rem] lg:w-[3rem] aspect-square"
          />
        </button>
      }
      primaryBtn={
        <Button primary rounded onClick={() => alert("개발 진행 전")}>
          나와 맞는 수강생 보러가기
        </Button>
      }
      secondaryBtn={
        <Button
          secondary
          rounded
          onClick={() => {
            resetAnswer();
            navigate("/intro");
          }}
          className="flex items-center gap-[0.8rem]"
        >
          <img src={`/rotate.svg`} className="w-[2rem] aspect-square" />
          <span>테스트 다시하기</span>
        </Button>
      }
    >
      <div
        ref={divRef}
        id="capture-area"
        className="flex flex-col space-y-[1.6rem] lg:space-y-[1.8rem]"
      >
        <ResultDetail
          description={resultTypeDetail}
          resultImage={imageName}
          chartResult={result}
          resultType={resultType}
          percentageBox={percentage}
          className="flex-col pt-[2rem] lg:pt-[3rem] gap-2 lg:gap-4"
        />
      </div>
    </SurveyLayout>
  );
}
