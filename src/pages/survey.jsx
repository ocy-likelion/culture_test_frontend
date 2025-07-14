import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import Modal from "@components/Modal";
import Question from "@components/Question";
import Spinner from "@components/Spinner";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const PAGE_SIZE = 2;

export default function SurveyPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const isAnalysis = false; // 유형 분석 요청(POST) 시 세팅되는 isLoading: true로 변경 예정

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
  console.log("api 결과: ", questions);

  // if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>문제가 발생했습니다.</p>;

  const handleNext = () => {
    if (currentPage < questions?.totalPages - 1)
      setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <SurveyLayout
      leftSlot={
        <button onClick={handlePrev}>
          <img src={`/chevron-left.svg`} className="w-[3.6rem] aspect-square" />
        </button>
      }
      middleSlot={
        <p className="text-[1.8rem] text-grey-90">
          {currentPage + 1}/{questions?.totalPages}
        </p>
      }
      rightSlot={
        <button onClick={() => navigate("/intro")}>
          <img src={`/xbtn.svg`} className="w-[3.6rem] aspect-square" />
        </button>
      }
      primaryBtn={
        currentPage + 1 === questions?.totalPages ? (
          <Button primary rounded>
            결과 제출
          </Button>
        ) : (
          <Button primary rounded onClick={handleNext}>
            다음으로
          </Button>
        )
      }
      mainCN="px-[2rem]"
    >
      {isLoading && !questions ? (
        // <div className="flex w-full justify-center items-center min-h-[90vh]">
        //   <BeatLoader color="#FF770F" size={14} />
        // </div>
        ""
      ) : (
        <>
          {/* Progress Bar */}
          <div className="w-full h-[0.6rem] bg-primary-10 rounded-full overflow-hidden mt-8">
            <div
              className="bg-primary-30 h-full transition-all duration-300 ease-in-out rounded-full"
              style={{
                width: `${((currentPage + 1) / questions?.totalPages) * 100}%`,
              }}
              // style={{ width: `${(page / totalPages) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="flex flex-col gap-[12rem]">
            {questions?.content?.map((question) => (
              <Question
                key={question.questionId}
                questionId={question.questionId}
                displayOrder={question.displayOrder}
                content={question.content}
                choices={question.choices}
              />
            ))}
          </div>
        </>
      )}

      {isAnalysis && (
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
