import { ChartData } from "@/models/common";
import useUserStore from "@/zustand/useUserStore";
import ChartCanvas from "@components/ChartCanvas";

export default function ResultDetail({
  description,
  resultImage,
  chartResult,
  resultType,
  className,
  history,
  percentageBox,
}: ChartData) {
  const { user } = useUserStore();

  return (
    <>
      <div
        className={`flex items-center justify-around bg-white rounded-[0.6rem] px-[1rem] lg:px-[1.4rem] py-[1rem] ${className}`}
      >
        <div className="text-center font-medium text-[1.7rem] lg:text-[2.4rem] leading-[135%]">
          <p>{user?.nickname} 담당자님은</p>
          <p>
            <span className="text-primary-30">{resultType}</span>을{" "}
            {history ? "선호하셨군요!" : "선호하시는군요!"}
          </p>
        </div>

        <img
          src={`/${resultImage}.svg`}
          className={`lg:mr-4 ${
            history ? "w-[14rem]" : "w-[16rem] lg:w-[24rem]"
          }`}
        />
      </div>

      {percentageBox && (
        <div className="flex items-center justify-center gap-2 bg-white h-[4.8rem] leading-[4.8rem] rounded-[0.6rem] text-center border-[0.08px] border-primary-30 px-[0.6rem] text-[1.4rem] lg:text-[1.7rem]">
          <p>
            총{" "}
            <span className="text-primary-30 font-semibold">
              {percentageBox}%
            </span>
            의 담당자들이 같은 유형을 선호하고 있어요!
          </p>

          <div className="relative group flex-shrink-0">
            <img
              src="/tooltip.svg"
              alt="군집화 AI 분석"
              className="w-[1.8rem] lg:w-[2.4rem] "
            />
            <div className="tooltip-box group-hover:opacity-100">
              이 결과는 사용자들의 응답 데이터를 기반으로 군집화된 결과입니다.
              MBTI처럼 고정된 분류가 아닌, 실제 유사 응답들을 바탕으로
              분석되었습니다.
            </div>
          </div>
        </div>
      )}

      <ChartCanvas chartData={chartResult} />

      <div className=" bg-white rounded-[0.6rem] leading-[200%] tracking-[-2.3%] py-[2rem] px-[1.6rem] flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <img
            src="/bulb.svg"
            alt="bulb"
            className="w-[1.8rem] lg:w-[2.6rem]"
          />
          <p className="text-[1.6rem] lg:text-[1.7rem]">
            이런 특징을 가지고 있어요
          </p>
        </div>

        <ul className="list-disc pl-[2rem] space-y-[0.6rem] text-grey-90 text-[1.2rem] lg:text-[1.4rem] leading-[160%]">
          {description
            .split(". ")
            .slice(0, -1)
            .map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
        </ul>
      </div>
    </>
  );
}
