import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <SurveyLayout
      leftSlot={
        <button onClick={() => navigate(-1)}>
          <img src={`/chevron-left.svg`} className="w-[3.6rem] aspect-square" />
        </button>
      }
      rightSlot={
        <button>
          <img
            src={`/profile.svg`}
            className="w-[3.6rem] aspect-square"
            onClick={() => navigate("/my")}
          />
        </button>
      }
      primaryBtn={
        <Button primary rounded onClick={() => navigate("/survey")}>
          시작하기
        </Button>
      }
      mainCN="px-[2rem] items-center"
    >
      <div
        className="flex flex-col gap-[1.2rem] 2xl:gap-[2.8rem] mt-[6rem]
      "
      >
        <p className="font-semibold text-[2.6rem] text-grey-100 text-center leading-[135%] tracking-[-2.3%]">
          AI가 분석한 당신의 컬쳐핏,
          <br /> 어떤 모습일까요?
        </p>
        <p className="text-[1.4rem] text-grey-70 text-center leading-[150%] tracking-[-2.3%]">
          당신과 맞는 수강생을 찾아보세요.
          <br />
          결과는 보기 쉽게 요약해드릴게요!
        </p>
      </div>

      <div className="">
        <img src={`/start-main.svg`} className="w-[30rem]" />
      </div>

      <div className="w-full h-min bg-grey-20 rounded-[1rem] text-[1.4rem] leading-[200%] tracking-[-2.3%] p-[1rem]">
        <p>
          💡 20문항 / 약 5분 소요
          <br />
          업무 스타일, 소통 방식, 판단 기준 등 <br />
          당신의 조직문화 성향을 정밀 분석합니다.
        </p>
      </div>
    </SurveyLayout>
  );
}
