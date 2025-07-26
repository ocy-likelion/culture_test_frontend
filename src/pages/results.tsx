import useUserStore from "@/zustand/useUserStore";
import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import ResultDetail from "@components/ResultDetail";
import useAnswersStore from "@zustand/useAnswersStore";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultType, result, imageUrl, resultTypeDetail } = location.state;
  const { resetAnswer } = useAnswersStore();
  const { user } = useUserStore();

  function extractKoreanName(path: string): string {
    // 예: "/images/행동가형.png" → "행동가형"
    const match = path.match(/([\uAC00-\uD7A3]+)(?=\.\w+$)/);
    return match ? match[1] : "";
  }
  const imageName = extractKoreanName(imageUrl);

  const divRef = useRef<HTMLDivElement>(null);

  const handleCapture = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, `${user?.nickname}_${imageName}.png`);
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
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
        <button onClick={() => navigate("/")}>
          <img src={`/logo-s.svg`} className="w-[5rem] lg:w-[6rem]" />
        </button>
      }
      rightSlot={
        <button onClick={() => handleCapture()}>
          <img
            src={`/download.svg`}
            className="w-[3rem] lg:w-[3.2rem] aspect-square"
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
        className="flex flex-col space-y-[1.8rem]"
      >
        <ResultDetail
          description={resultTypeDetail}
          resultImage={imageName}
          chartResult={result}
          resultType={resultType}
          className="flex-col pt-[3rem]"
        />
      </div>
    </SurveyLayout>
  );
}
