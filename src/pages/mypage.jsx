import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import Modal from "@components/Modal";
import ResultEntry from "@components/ResultEntry";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logout, setLogout] = useState(false);

  const testResults = [
    {
      id: 1,
      type: "관계 조율자형",
      date: "2025.07.03",
      image: "/result-exam.svg",
    },
    {
      id: 2,
      type: "창의적 혁신가형",
      date: "2025.06.29",
      image: "/result-exam.svg",
    },
    {
      id: 3,
      type: "논리적 분석가형",
      date: "2025.06.20",
      image: "/result-exam.svg",
    },
    {
      id: 4,
      type: "조직 관리자형",
      date: "2025.06.11",
      image: "/result-exam.svg",
    },
    {
      id: 5,
      type: "직관적 실행가형",
      date: "2025.05.30",
      image: "/result-exam.svg",
    },
  ];

  return (
    <SurveyLayout
      leftSlot={
        <button onClick={() => navigate(-1)}>
          <img
            src={`/chevron-left.svg`}
            className="w-[2.4rem] lg:w-[3.6rem] aspect-square"
          />
        </button>
      }
      middleSlot={
        <h1 className="text-[1.5rem] lg:text-[1.8rem] font-semibold">MY</h1>
      }
      containerCN="bg-grey-20"
      mainCN="pt-[5rem] gap-[1.2rem] lg:gap-[2rem]" // myPage에서만 간격 좁게
      footerCN="bg-white static"
      primaryBtn={
        <button
          className={`underline text-[1rem] lg:text-[1.2rem] text-grey-60`}
          onClick={() => setIsModalOpen(true)}
        >
          회원탈퇴
        </button>
      }
    >
      <div className="bg-white flex gap-7 items-center p-[2rem]">
        <div>
          <img src="/profile.svg" className="w-[6rem] lg:w-[8rem]" />
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-2 lg:gap-4">
            <span className="font-medium text-[1.6rem] lg:text-[2rem]">
              홍길동
            </span>
            <span className="text-grey-70  text-[1.4rem] lg:text-[1.6rem]">
              kakao 로그인
            </span>
          </div>

          <button
            className="px-[1rem] lg:px-[1.4rem] py-[0.5rem] lg:py-[0.6rem] text-grey-70 border text-[1rem] lg:text-[1.4rem] font-medium rounded-md border-grey-30"
            onClick={() => setLogout(true)}
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="bg-white flex flex-col flex-1 gap-5 lg:gap-7 p-[2rem]">
        <h2 className="font-semibold text-[1.8rem] lg:text-[2.2rem]">
          최근 테스트 내역
        </h2>

        {/* 공통 컴포넌트화 */}
        {testResults.length > 0 ? (
          testResults.map((result) => (
            <ResultEntry
              key={result.id}
              type={result.type}
              date={result.date}
              image={result.image}
            />
          ))
        ) : (
          <div className="flex flex-col flex-1 items-center justify-center gap-[2rem] p-[2rem]">
            <img src="/memo.svg" className="w-[6rem]" />
            <p className="text-center text-[1.5rem] text-grey-70">
              아직 진행한 테스트가 없어요.
              <br />
              지금 바로 첫 테스트를 진행해보세요.
            </p>
            <Button
              primary
              rounded
              className="max-w-fit px-[2.4rem] text-[1.8rem]"
              onClick={() => navigate("/intro")}
            >
              테스트 하러 가기
            </Button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal>
          <div className="flex flex-col gap-3 items-center">
            <p className="text-grey-90 font-medium text-[1.6rem] lg:text-[1.8rem]">
              정말 탈퇴하시겠어요?
            </p>
            <p className="text-grey-80 text-[1rem] lg:text-[1.2rem] leading-[150%] text-center">
              지금 탈퇴하시면 테스트 결과 및 기록이
              <br />
              모두 삭제되고 복구가 불가능합니다.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              rounded
              onClick={() => setIsModalOpen(false)}
              className="bg-grey-30 text-grey-70 h-[3.6rem] lg:h-[4rem] leading-[4rem] text-[1.4rem] lg:text-[1.6rem]"
            >
              머무르기
            </Button>
            <Button
              primary
              rounded
              className="h-[3.6rem] lg:h-[4rem] leading-[4rem] text-[1.4rem] lg:text-[1.6rem]"
            >
              떠나기
            </Button>
          </div>
        </Modal>
      )}

      {logout && (
        <Modal>
          <div className="flex flex-col gap-3 items-center">
            <p className="text-grey-90 font-medium text-[1.6rem] lg:text-[1.8rem]">
              로그아웃
            </p>
            <p className="text-grey-80 text-[1rem] lg:text-[1.2rem] leading-[150%] text-center">
              정말 로그아웃 하시겠습니까?
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              rounded
              onClick={() => setLogout(false)}
              className="bg-grey-30 text-grey-70 h-[3.6rem] lg:h-[4rem] leading-[4rem] text-[1.4rem] lg:text-[1.6rem]"
            >
              취소
            </Button>
            <Button
              primary
              rounded
              className="h-[3.6rem] lg:h-[4rem] leading-[4rem] text-[1.4rem] lg:text-[1.6rem]"
            >
              로그아웃
            </Button>
          </div>
        </Modal>
      )}
    </SurveyLayout>
  );
}
