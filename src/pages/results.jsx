import Button from "@components/Button";
import ChartCanvas from "@components/ChartCanvas";
import SurveyLayout from "@components/layouts/SurveyLayout";
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
      mainCN="px-[2rem] pt-[8rem] 2xl:gap-[2rem]"
      footerCN="bg-grey-20 static"
      leftSlot={
        <button onClick={() => navigate(-1)}>
          <img src={`/share.svg`} className="w-[3.2rem] aspect-square" />
        </button>
      }
      middleSlot={
        <button onClick={() => navigate("/")}>
          <img src={`/logo.svg`} className="w-[16rem]" />
        </button>
      }
      rightSlot={
        <button>
          <img
            src={`/profile.svg`}
            className="w-[3.6rem] aspect-square"
            onClick={() => navigate("/mypage")}
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
      <div className="flex flex-col items-center bg-white pt-[3rem] rounded-[0.6rem]">
        <div className="text-center font-medium text-[2.4rem] leading-[135%]">
          <p>홍길동 담당자님은</p>
          <p>
            <span className="text-primary-30">{resultType}</span>
            형을 선호하시는군요!
          </p>
        </div>

        <div className="aspect-square w-[24rem] relative leading-none">
          <img
            src="/temp-pic.svg"
            className="absolute top-0 left-0 w-full h-full object-contain"
            alt="결과유형 이미지"
          />
        </div>
      </div>

      <ChartCanvas chartData={result} />

      <div className=" bg-white rounded-[0.6rem] leading-[200%] tracking-[-2.3%] py-[2rem] px-[1.6rem]">
        <ul className="list-disc pl-[2rem] space-y-[0.6rem] text-grey-90 text-[1.4rem] leading-[160%]">
          <li>갈등을 부드럽게 푸는 데 능숙</li>
          <li>구성원 간 분위기와 감정선을 중요하게 여김</li>
          <li>말투/문맥의 뉘앙스를 민감하게 감지함</li>
        </ul>
      </div>
    </SurveyLayout>
  );
}
