import Button from "@components/Button";
import Chart from "@components/Chart";
import SurveyLayout from "@components/layouts/SurveyLayout";
import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const navigate = useNavigate();
  return (
    <SurveyLayout
      containerCN="bg-grey-20"
      mainCN="px-[2rem] pt-[8rem] pb-0"
      footerCN="bg-grey-20 static"
      leftSlot={
        <button onClick={() => navigate(-1)}>
          <img src={`/share.svg`} className="w-[3.6rem] aspect-square" />
        </button>
      }
      middleSlot={<img src={`/logo.svg`} className="w-[16rem]" />}
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
        <Button primary rounded onClick={() => navigate("/")}>
          나와 맞는 수강생 보러가기
        </Button>
      }
      secondaryBtn={
        <Button
          secondary
          rounded
          onClick={() => navigate("/survey")}
          className="flex items-center gap-[0.8rem]"
        >
          <img
            src={`/rotate.svg`}
            className="w-[2rem] aspect-square"
            onClick={() => navigate("/survey")}
          />
          <span>테스트 다시하기</span>
        </Button>
      }
    >
      <div className="flex flex-col justify-between items-center bg-white pt-[3.4rem] rounded-[0.6rem]">
        <div className="text-center font-medium text-[2.2rem] leading-[135%]">
          <p>강민지 담당자님은</p>
          <p>
            <span className="text-primary-30">관계 조율자형</span>이시군요!
          </p>
        </div>

        <img src="/result-big.svg" className="w-[28rem] aspect-square" />
      </div>

      <div className="rounded-[0.6rem] flex flex-col justify-between items-center bg-white pt-[3.4rem]">
        <Chart />
      </div>

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
