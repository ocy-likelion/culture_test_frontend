import SurveyLayout from "@components/layouts/SurveyLayout";
import TestEntry from "@components/TestEntry";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <SurveyLayout
      leftSlot={
        <button onClick={() => navigate(-1)}>
          <img src={`/chevron-left.svg`} className="w-[3.6rem] aspect-square" />
        </button>
      }
      middleSlot={<h1 className="text-[1.8rem] font-semibold">MY</h1>}
      containerCN="bg-grey-20"
      mainCN="gap-[1rem] pb-[1rem]" // myPage에서만 간격 좁게
      footerCN="bg-grey-20 static"
      primaryBtn={
        <button className={`underline text-[1.2rem] text-grey-60`}>
          회원탈퇴
        </button>
      }
    >
      <div className="bg-white flex gap-7 items-center p-[2rem]">
        <div>
          <img src="/profile.svg" className="w-[8rem]" />
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-4">
            <span className="font-medium text-[2rem]">홍길동</span>
            <span className="text-grey-70 text-[1.6rem]">kakao 로그인</span>
          </div>

          <button className="px-[1.4rem] py-[0.6rem] text-grey-70 border text-[1.4rem] font-medium rounded-md border-grey-30">
            로그아웃
          </button>
        </div>
      </div>

      <div className="bg-white flex flex-col flex-1 gap-7 items-start p-[2rem]">
        <h2 className="font-semibold text-[2.2rem]">최근 테스트 내역</h2>

        {/* 공통 컴포넌트화 */}
        <TestEntry />
        <TestEntry />
        <TestEntry />
        <TestEntry />
        <TestEntry />
        <TestEntry />
        <TestEntry />
      </div>
    </SurveyLayout>
  );
}
