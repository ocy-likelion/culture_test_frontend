import SurveyLayout from "@components/layouts/SurveyLayout";
import ResultDetail from "@components/ResultDetail";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const navigate = useNavigate();
  const resultType = "abcD";

  const result = [
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
      leftSlot={
        <button onClick={() => navigate(-1)}>
          <img
            src={`/chevron-left.svg`}
            className="w-[2.4rem] lg:w-[3.2rem] aspect-square"
          />
        </button>
      }
      middleSlot={<img src={`/logo.svg`} className="w-[16rem]" />}
      rightSlot={
        <button>
          <img
            src={`/share.svg`}
            className="w-[2.4rem] lg:w-[3.2rem] aspect-square"
            onClick={() => navigate("/mypage")}
          />
        </button>
      }
      mainCN="px-[2rem] pt-[8rem] gap-[1.6rem] xl:gap-[2rem] pb-[2rem]"
    >
      <ResultDetail result={result} resultType={resultType} history />
    </SurveyLayout>
  );
}
