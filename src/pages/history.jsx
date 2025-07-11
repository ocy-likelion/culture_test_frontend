import ChartCanvas from "@components/ChartCanvas";
import SurveyLayout from "@components/layouts/SurveyLayout";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const navigate = useNavigate();

  const colorPalette = [
    { hex: "#FF7E8F", text: "text-type-pink" },
    { hex: "#AD7EFF", text: "text-type-purple" },
    { hex: "#00C0EB", text: "text-type-blue" },
    { hex: "#35D12A", text: "text-type-green" },
  ];

  const rawData = [
    {
      label: "업무 능력",
      left: { type: "즉시전력형", score: 74 },
      right: { type: "성장가능형", score: 26 },
    },
    {
      label: "갈등 대응 방식",
      left: { type: "직면형", score: 62 },
      right: { type: "숙고형", score: 38 },
    },
    {
      label: "성향 및 인성",
      left: { type: "혁신적", score: 35 },
      right: { type: "전통적", score: 65 },
    },
    {
      label: "평가 기준",
      left: { type: "객관적 자료", score: 49 },
      right: { type: "주관적 인상", score: 51 },
    },
  ];

  return (
    <SurveyLayout
      containerCN="bg-grey-20"
      mainCN="px-[2rem] pt-[8rem] pb-[2rem] 2xl:gap-[2rem]"
      leftSlot={
        <button onClick={() => navigate(-1)}>
          <img src={`/chevron-left.svg`} className="w-[3.2rem] aspect-square" />
        </button>
      }
      middleSlot={<img src={`/logo.svg`} className="w-[16rem]" />}
      rightSlot={
        <button>
          <img
            src={`/share.svg`}
            className="w-[3.2rem] aspect-square"
            onClick={() => navigate("/mypage")}
          />
        </button>
      }
    >
      <div className="flex justify-between items-center bg-white rounded-[0.6rem] px-[2rem]">
        <div className="font-medium text-[2.4rem] leading-[135%]">
          <p>강민지 담당자님은</p>
          <p>
            <span className="text-primary-30">관계 조율자형</span>이시군요!
          </p>
        </div>

        <img src="/result-big.svg" className="w-[20rem] aspect-square" />
      </div>

      <ChartCanvas rawData={rawData} colorPalette={colorPalette} />

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
