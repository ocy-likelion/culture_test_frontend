import EmptyMessage from "@/components/EmptyMessage";
import Spinner from "@/components/Spinner";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { ResultData } from "@/models/common";
import useUserStore from "@/zustand/useUserStore";
import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import Modal from "@components/Modal";
import ResultEntry from "@components/ResultEntry";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MyPage() {
  const navigate = useNavigate();
  const [withdraw, setWithdraw] = useState(false);
  const [logout, setLogout] = useState(false);
  const { user, resetUser } = useUserStore();
  const axios = useAxiosInstance();

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["results", "history"],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/result/history/${user?.id}`);
      console.log("내 결과 내역: ", res.data);
      return res.data;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/v1/auth/logout");
      console.log("로그아웃 요청: ", res.data);
      return res.data;
    },
    onSuccess: () => {
      setLogout(false); // 모달 창 닫기 (UI)
      resetUser(); // 전역상태 초기화
      toast.success("성공적으로 로그아웃 되었습니다.");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.error("로그아웃 실패", err);
      toast.error("로그아웃에 실패했습니다.", {
        icon: "⚠️",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          fontWeight: "500",
          fontSize: "1.6rem",
          border: "2px solid #fca5a5",
        },
      });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.delete("/api/v1/auth/withdraw");
      console.log("회원탈퇴요청: ", res.data);
      return res.data;
    },
    onSuccess: (data) => {
      setWithdraw(false); // 모달 창 닫기 (UI)
      resetUser(); // 전역상태 초기화
      toast.success("정상적으로 탈퇴 처리되었습니다.");
      navigate("/"); // 홈(로그인 페이지)으로 이동
    },
    onError: (err) => {
      console.error("회원탈퇴 실패", err);
      toast.error("회원탈퇴 실패했습니다.", {
        icon: "⚠️",
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          fontWeight: "500",
          fontSize: "1.6rem",
          border: "2px solid #fca5a5",
        },
      });
    },
  });

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
          onClick={() => setWithdraw(true)}
        >
          회원탈퇴
        </button>
      }
    >
      <div className="bg-white flex gap-7 items-center p-[2rem]">
        <div>
          <img
            src={user?.profileImageUrl ? user?.profileImageUrl : "/profile.svg"}
            className="rounded-full aspect-square w-[6rem] lg:w-[8rem]"
          />
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-2 lg:gap-4">
            <span className="font-medium text-[1.6rem] lg:text-[2rem]">
              {user?.nickname}
            </span>
            <span className="text-grey-70  text-[1.4rem] lg:text-[1.6rem]">
              {user?.ssoProvider === "KAKAO" ? "kakao" : "google"} 로그인
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

        {/* 로딩 상태 */}
        {isLoading && <Spinner />}

        {/* 에러 상태 -> 백엔드에서 받아온 에러메시지 출력하는 게 better */}
        {isError && (
          <div className="text-center text-red-500 text-[1.4rem]">
            데이터를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
          </div>
        )}

        {/* 로딩 끝 & 에러 X -> 결과 없음 */}
        {!isLoading && !isError && results?.length === 0 && <EmptyMessage />}

        {/* 결과 있음 */}
        {!isLoading &&
          !isError &&
          results?.length > 0 &&
          results.map((result: ResultData) => (
            <ResultEntry
              key={result.id}
              resultId={result.id}
              type={result.resultType}
              date={result.localDate}
              image={result.imageUrl}
            />
          ))}
      </div>

      {withdraw && (
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
              onClick={() => setWithdraw(false)}
              className="bg-grey-30 text-grey-70 h-[3.6rem] lg:h-[4rem] leading-[4rem] text-[1.4rem] lg:text-[1.6rem]"
            >
              머무르기
            </Button>
            <Button
              primary
              rounded
              className="h-[3.6rem] lg:h-[4rem] leading-[4rem] text-[1.4rem] lg:text-[1.6rem]"
              onClick={() => withdrawMutation.mutate()}
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
              onClick={() => logoutMutation.mutate()}
            >
              로그아웃
            </Button>
          </div>
        </Modal>
      )}
    </SurveyLayout>
  );
}
