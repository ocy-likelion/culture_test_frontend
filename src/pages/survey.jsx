import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import Modal from "@components/Modal";
import Question from "@components/Question";
import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAnswersStore from "@zustand/useAnswersStore";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 2;

export default function SurveyPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { answers, setAnswer, resetAnswer } = useAnswersStore();

  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const intervalRef = useRef(null); // 🔁 polling을 위한 ref
  const userId = 10;
  const surveyId = 1;

  // React Query(useQuery)를 이용한 GET 요청 코드
  const {
    data: questions,
    isLoading,
    // isFetching,
    isError,
  } = useQuery({
    queryKey: ["surveys", currentPage],
    queryFn: () =>
      axios.get("/api/v1/surveys/main", {
        params: { page: currentPage, size: PAGE_SIZE },
      }),
    select: (res) => res.data.data,
    staleTime: 1000 * 10,
    keepPreviousData: true,
  });
  // console.log("api 결과: ", questions);

  // if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>문제가 발생했습니다.</p>;

  const checkUnanswered = () => {
    const currentQuestionIds =
      questions?.content.map((q) => q.questionId) || [];

    const unanswered = currentQuestionIds.filter(
      (id) => !answers.some((ans) => ans.questionId === id)
    );

    if (unanswered.length > 0) {
      toast.error("모든 문항에 응답해주세요!", {
        icon: "⚠️",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          fontWeight: "500",
          fontSize: "1.6rem",
          border: "2px solid #fca5a5",
        },
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!checkUnanswered()) return;

    if (currentPage < questions?.totalPages - 1)
      setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    } else if (currentPage === 0) {
      navigate("/intro");
      resetAnswer();
      console.log("답변 리셋");
    } else {
      navigate(-1);
    }
  };

  const handleSelect = (questionId, choiceId) => {
    setAnswer({ questionId, choiceId });
  };

  // POST 제출 mutation
  const submitMutation = useMutation({
    mutationFn: async (answers) => {
      console.log("Answers: ", answers);

      const sortedAnswers = answers.sort((a, b) => a.questionId - b.questionId);

      console.log("sortedAnswers: ", sortedAnswers);
      const payload = {
        userId,
        surveyId: 1,
        answers: sortedAnswers,
      };
      return await axios.post("/api/v1/result/submit", payload);
    },
    onSuccess: () => {
      setIsAnalyzing(true); // 로딩 UI 띄우기

      // ✅ POST 성공 후 polling 시작
      intervalRef.current = setInterval(async () => {
        try {
          const res = await axios.get(
            `/api/v1/result/latest/scoresAndPercentages/${userId}/survey/${surveyId}`
          );
          console.log("📦 polling 요청 응답:", res.data);

          if (res.data.status === "done") {
            console.log("✅ 분석 완료: polling 종료");
            clearInterval(intervalRef.current);
            setIsAnalyzing(false); // 로딩 종료
            navigate("/results", { state: res.data });
          }
        } catch (err) {
          console.error("❌ [GET] Polling 중 오류", err);
          clearInterval(intervalRef.current);
        }
      }, 3000);

      // polling 시작 로그 확인용 코드
      console.log("⏱️ polling 시작됨 (3초 간격)");
    },
    onError: (err) => {
      console.error(err);
      alert("❌ [POST] 설문결과 제출 중 오류 발생", err);
    },
  });

  return (
    <SurveyLayout
      leftSlot={
        currentPage === 0 ? (
          " "
        ) : (
          <button onClick={handlePrev}>
            <img
              src={`/chevron-left.svg`}
              className="w-[2.4rem] lg:w-[3.6rem] aspect-square"
            />
          </button>
        )
      }
      middleSlot={
        <p className="text-[1.5rem] lg:text-[1.8rem] text-grey-90">
          {currentPage + 1}/{questions?.totalPages}
        </p>
      }
      rightSlot={
        <button
          onClick={() => {
            navigate("/intro");
            resetAnswer();
          }}
        >
          <img
            src={`/xbtn.svg`}
            className="w-[2.4rem] lg:w-[3.6rem] aspect-square"
          />
        </button>
      }
      primaryBtn={
        currentPage + 1 === questions?.totalPages ? (
          <Button
            primary
            rounded
            onClick={() => {
              if (!checkUnanswered()) return;
              submitMutation.mutate(answers);
              resetAnswer();
            }}
          >
            결과 제출
          </Button>
        ) : (
          <Button primary rounded onClick={handleNext}>
            다음으로
          </Button>
        )
      }
      mainCN="pt-[6rem] px-[2rem] pb-[10rem] gap-[1.6rem] lg:gap-[2rem]"
    >
      {isLoading && !questions ? (
        // <div className="flex w-full justify-center items-center min-h-[90vh]">
        //   <BeatLoader color="#FF770F" size={14} />
        // </div>
        ""
      ) : (
        <>
          {/* Progress Bar */}
          <div className="w-full h-[0.6rem] bg-primary-10 rounded-full overflow-hidden mt-3 lg:mt-8">
            <div
              className="bg-primary-30 h-full transition-all duration-300 ease-in-out rounded-full"
              style={{
                width: `${((currentPage + 1) / questions?.totalPages) * 100}%`,
              }}
              // style={{ width: `${(page / totalPages) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="flex flex-col gap-[6rem] md:gap-[14rem] lg:gap-[8rem]">
            {questions?.content?.map((question) => (
              <Question
                key={question.questionId}
                questionId={question.questionId}
                displayOrder={question.displayOrder}
                content={question.content}
                choices={question.choices}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </>
      )}

      {isAnalyzing && (
        <Modal>
          <div className="flex flex-col items-center gap-4">
            <Spinner />
            <div className="text-center text-[1.6rem]">
              <p className="font-medium text-grey-90 text-[1.4rem] lg:text-[1.6rem] mb-2">
                결과 분석 중...
              </p>
              <p className="font-light text-grey-80 text-[1rem] lg:text-[1.2rem]">
                잠시만 기다려주세요.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </SurveyLayout>
  );
}
