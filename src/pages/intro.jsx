import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <SurveyLayout
      leftSlot={
        <button>
          <img
            src={`/profile.svg`}
            className="w-[3.4rem] lg:w-[3.6rem] aspect-square"
            onClick={() => navigate("/mypage")}
          />
        </button>
      }
      // rightSlot={
      //   <button onClick={() => navigate(-1)}>
      //     <img src={`/chevron-left.svg`} className="w-[3.6rem] aspect-square" />
      //   </button>
      // }
      primaryBtn={
        <div className="w-full h-min bg-grey-20 rounded-[1rem] text-[1rem] lg:text-[1.4rem] leading-[200%] tracking-[-2.3%] p-[0.8rem] lg:p-[1rem] mb-[0.6rem]">
          <p>💡 16문항 / 약 5분 소요</p>
          <p>업무 스타일, 소통 방식, 판단 기준 등</p>
          <p>당신의 조직문화 성향을 정밀 분석합니다.</p>
        </div>
      }
      secondaryBtn={
        <Button primary rounded onClick={() => navigate("/survey")}>
          시작하기
        </Button>
      }
      mainCN="pt-[6rem] px-[2rem] items-center gap-[2rem] lg:gap-[6rem]"
      footerCN="static"
    >
      <div
        className="flex flex-col gap-[1rem] 2xl:gap-[2.8rem] mt-[4rem] lg:mt-[6rem]
      "
      >
        <p className="font-semibold text-[2.2rem] lg:text-[2.6rem] text-grey-100 text-center leading-[135%] tracking-[-2.3%]">
          AI가 분석한 당신의 컬쳐핏,
          <br /> 어떤 모습일까요?
        </p>
        <p className="text-[1.2rem] lg:text-[1.4rem] text-grey-70 text-center leading-[150%] tracking-[-2.3%]">
          당신과 맞는 수강생을 찾아보세요.
          <br />
          결과는 보기 쉽게 요약해드릴게요!
        </p>
      </div>

      <div className="">
        <img src={`/intro-main.svg`} className="w-[24rem] lg:w-[30rem]" />
      </div>
    </SurveyLayout>
  );
}
