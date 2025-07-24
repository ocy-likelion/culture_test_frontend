import { ChartData } from "@/models/common";
import useUserStore from "@/zustand/useUserStore";
import ChartCanvas from "@components/ChartCanvas";

export default function ResultDetail({
  chartResult,
  resultType,
  className,
  history,
}: ChartData) {
  const { user } = useUserStore();

  return (
    <>
      <div
        className={`flex items-center justify-around bg-white rounded-[0.6rem] px-[1.4rem] ${className}`}
      >
        <div className="text-center font-medium text-[1.7rem] lg:text-[2.4rem] leading-[135%]">
          <p>{user?.nickname} 담당자님은</p>
          <p>
            <span className="text-primary-30">{resultType}</span>
            {history ? "을 선호하셨군요!" : "을 선호하시는군요!"}
          </p>
        </div>

        <div className="aspect-square w-[14rem] lg:w-[24rem] relative leading-none">
          <img
            src="/temp-pic.svg"
            className="absolute top-0 left-0 w-full h-full object-contain"
            alt="결과유형 이미지"
          />
        </div>
      </div>

      <ChartCanvas chartData={chartResult} />

      <div className=" bg-white rounded-[0.6rem] leading-[200%] tracking-[-2.3%] py-[2rem] px-[1.6rem]">
        <ul className="list-disc pl-[2rem] space-y-[0.6rem] text-grey-90 text-[1.2rem] lg:text-[1.4rem] leading-[160%]">
          <li>갈등을 부드럽게 푸는 데 능숙</li>
          <li>구성원 간 분위기와 감정선을 중요하게 여김</li>
          <li>말투/문맥의 뉘앙스를 민감하게 감지함</li>
        </ul>
      </div>
    </>
  );
}
