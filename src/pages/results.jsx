import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import ResultDetail from "@components/ResultDetail";
import useAnswersStore from "@zustand/useAnswersStore";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultType, result } = location.state;
  const { resetAnswer } = useAnswersStore();

  return (
    <SurveyLayout
      containerCN="bg-grey-20"
      mainCN="px-[2rem] pt-[8rem] gap-[1.6rem] xl:gap-[2rem] pb-[1rem]"
      footerCN="bg-grey-20 static"
      leftSlot={
        <button>
          <img
            src={`/profile.svg`}
            className="w-[2.8rem] lg:w-[3.6rem] aspect-square"
            onClick={() => navigate("/mypage")}
          />
        </button>
      }
      middleSlot={
        <button onClick={() => navigate("/")}>
          <img src={`/logo.svg`} />
        </button>
      }
      rightSlot={
        <button onClick={() => navigate(-1)}>
          <img
            src={`/share.svg`}
            className="w-[2.8rem] lg:w-[3.6rem] aspect-square"
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
      <ResultDetail result={result} resultType={resultType} />
    </SurveyLayout>
  );
}
