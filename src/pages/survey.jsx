import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import Modal from "@components/Modal";
import Question from "@components/Question";
import Spinner from "@components/Spinner";
import { useNavigate } from "react-router-dom";

export default function TestPage() {
  const navigate = useNavigate();
  const isLoading = false; // 유형 분석 요청(POST) 시 세팅되는 isLoading: true로 변경 예정

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
        <button onClick={() => navigate("/intro")}>
          <img src={`/xbtn.svg`} className="w-[3.6rem] aspect-square" />
        </button>
      }
      primaryBtn={
        <Button primary rounded onClick={() => navigate("/mypage")}>
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

      {isLoading && (
        <Modal>
          <div className="flex flex-col items-center gap-4">
            <Spinner />
            <div className="text-center text-[1.6rem]">
              <p className="font-medium text-grey-90 text-[1.6rem] mb-2">
                결과 분석 중...
              </p>
              <p className="font-light text-grey-80 text-[1.2rem]">
                잠시만 기다려주세요.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </SurveyLayout>
  );
}
