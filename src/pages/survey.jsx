import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import Question from "@components/Question";
import { useNavigate } from "react-router-dom";

export default function TestPage() {
  const navigate = useNavigate();

  // React Query(useQuery)를 이용한 GET 요청 코드
  const questionsDummy = [
    {
      id: 1,
      text: "때로는 지원자가 감정을 드러내며 갈등을 일으키더라도, 그 솔직함이 팀워크에 긍정적인 변화를 가져올 수 있다고 믿는다.",
    },
    {
      id: 2,
      text: "상사가 명확한 지침을 주지 않았을 때, 지원자가 직접 문제를 지적하고 개선책을 제안했다면, 그 행동이 옳다고 생각한다.",
    },
    // {
    //   id: 3,
    //   text: "팀워크보다 개인의 효율을 중시하는 태도가 더 중요하다고 본다.",
    // },
  ];

  return (
    <SurveyLayout
      leftSlot={
        <button onClick={() => navigate(-1)}>
          <img src={`/chevron-left.svg`} className="w-[3.6rem] aspect-square" />
        </button>
      }
      middleSlot={<p className="text-[1.8rem] text-grey-90">1/10</p>}
      rightSlot={
        <button>
          <img src={`/xbtn.svg`} className="w-[3.6rem] aspect-square" />
        </button>
      }
      primaryBtn={
        <Button primary rounded onClick={() => navigate("/my")}>
          다음으로
        </Button>
      }
      mainCN="px-[2rem]"
    >
      {/* Progress Bar */}
      <div className="w-full h-[0.6rem] bg-primary-10 rounded-full overflow-hidden mt-8">
        <div
          className="bg-primary-30 h-full transition-all duration-300 ease-in-out rounded-full"
          style={{ width: "50%" }}
          // style={{ width: `${(page / totalPages) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex flex-col gap-[12rem]">
        {questionsDummy.map((question, idx) => (
          <Question
            key={question.id}
            text={question.text}
            index={idx}
            questionId={question.id}
          />
        ))}
      </div>
    </SurveyLayout>
  );
}
