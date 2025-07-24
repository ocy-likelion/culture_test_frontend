import Modal from "@/components/Modal";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import useUserStore from "@/zustand/useUserStore";
import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FormData } from "@/models/survey";
import toast from "react-hot-toast";

export default function IntroPage() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const { user, setUser } = useUserStore();
  const [agreed, setAgreed] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      "personal-required": false,
      "survey-used": false,
    },
  });
  const watchAll = watch();
  console.log("watchALL: ", watchAll);

  const allChecked = Object.values(watchAll).every(Boolean); // watch 객체의 value값들이 모두 true값을 갖고 있다면 true 반환..

  const isOkayToNext = watchAll["personal-required"] && watchAll["survey-used"];

  const agreeTermsMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.patch("/api/v1/auth/agree-terms");
      setUser(res.data); // ✅ 프론트 상태 반영
      return res.data;
    },
    onSuccess: () => {
      setAgreed(true); // ✅ UI 즉시 반영
      // 단순 ['user']가 아닌, TS에선 { queryKey: [...] } 객체 형태로 넘겨야, InvalidateQueryFilters 타입과 정확히 일치.
      queryClient.invalidateQueries({ queryKey: ["user"] }); // ✅ 서버 데이터 반영
      toast.success("약관 동의가 완료되었습니다.");
    },
    onError: (err) => {
      console.error("약관 동의 업데이트 실패", err);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("이용약관 체크 상태: ", data);
    agreeTermsMutation.mutate(); // ⬅️ 동의 API 요청 보내기
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    (Object.keys(watchAll) as (keyof FormData)[]).forEach((key) => {
      setValue(key, isChecked); // setValue를 사용해 각 체크박스의 값을 업데이트 - 매개변수 2개: (필드 이름, 설정할 값)
    });
  };

  return (
    <SurveyLayout
      leftSlot={
        <button className="relative aspect-square w-[3.4rem] lg:w-[3.6rem]">
          <img
            src={user?.profileImageUrl ? user?.profileImageUrl : "/profile.svg"}
            className="absolute top-0 left-0 w-full h-full rounded-full"
            onClick={() => navigate(`/mypage/${user?.id}`)}
          />
        </button>
      }
      primaryBtn={
        <div className="w-full h-min bg-grey-20 rounded-[1rem] text-[1rem] lg:text-[1.4rem] leading-[200%] tracking-[-2.3%] p-[0.8rem] lg:p-[1rem] mb-[0.6rem]">
          <p>💡 16문항 / 약 5분 소요</p>
          <p>업무 스타일, 소통 방식, 판단 기준 등</p>
          <p>당신의 조직문화 성향을 정밀 분석합니다.</p>
        </div>
      }
      secondaryBtn={
        <Button primary rounded onClick={() => navigate("/survey")}>
          시작하기
        </Button>
      }
      mainCN="pt-[6rem] px-[2rem] items-center gap-[2rem]"
      footerCN="static"
    >
      <div
        className="flex flex-col gap-[1rem] 2xl:gap-[2.8rem] mt-[4rem] lg:mt-[6rem]
      "
      >
        <p className="font-semibold text-[2.2rem] lg:text-[2.6rem] text-grey-100 text-center leading-[135%] tracking-[-2.3%]">
          AI가 분석한 당신의 컬쳐핏,
          <br /> 어떤 모습일까요?
        </p>
        <p className="text-[1.2rem] lg:text-[1.4rem] text-grey-70 text-center leading-[150%] tracking-[-2.3%]">
          당신과 맞는 수강생을 찾아보세요.
          <br />
          결과는 보기 쉽게 요약해드릴게요!
        </p>
      </div>

      <div className="">
        <img src={`/intro-main.svg`} className="w-[24rem] lg:w-[30rem]" />
      </div>

      {!user?.hasAgreedTerms && !agreed && (
        <Modal>
          <div className="flex flex-col gap-3 items-center">
            <p className="text-grey-90 font-medium text-[1.8rem] lg:text-[1.8rem] text-center">
              아래 약관에 동의하시면
              <br /> 테스트를 시작합니다.
            </p>
          </div>

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col font-light">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="terms-1"
                  className="peer inputUnset checkboxCustom"
                  onChange={handleCheckAll}
                  checked={allChecked}
                />
                <label
                  className="flex gap-2 items-center cursor-pointer before:w-[3rem] before:h-[3rem] before:inline-block before:content-[''] before:bg-[url('/check-circle.svg')] peer-checked:before:bg-[url('/checked-circle.svg')] font-gowunBold text-[1.6rem]"
                  htmlFor="terms-1"
                >
                  전체 동의합니다.
                </label>
              </div>

              <div className="flex flex-col gap-2 before:content-[''] before:w-full before:h-[0.1rem] before:bg-grey-40 before:mb-2 mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms-2"
                    className="peer inputUnset checkboxCustom"
                    {...register("personal-required", { required: true })}
                  />
                  <label
                    className="flex gap-2 items-center cursor-pointer before:w-[3rem] before:h-[3rem] before:inline-block before:content-[''] before:bg-[url('/check-circle.svg')] peer-checked:before:bg-[url('/checked-circle.svg')] font-gowunBold text-[1.6rem]"
                    htmlFor="terms-2"
                  >
                    개인정보 수집 및 이용 동의
                    <span
                      className={`font-normal inline-block font-gowunBold text-primary-30`}
                    >
                      (필수)
                    </span>
                  </label>
                </div>

                <div className="bg-grey-20 border border-grey-40 rounded-xl max-h-[100px] overflow-auto box-border text-[1.4rem] text-grey-70 font-light flex flex-col gap-3 py-[1.6rem] px-[1.8rem] leading-[135%] custom-scrollbar">
                  <p>
                    서비스 이용을 위해 아래와 같이 개인정보를 수집 및
                    이용합니다.
                  </p>
                  <p>
                    1. 수집 항목
                    <br /> - 이름, 연락처, 이메일
                  </p>
                  <p>
                    2. 이용 목적
                    <br /> - 서비스 제공 및 본인 확인
                  </p>
                  <p>
                    3. 보유 및 이용 기간
                    <br /> - 회원 탈퇴 시까지
                  </p>
                  <p>
                    ※ 귀하는 개인정보 수집 및 이용에 동의하지 않을 권리가
                    있으며, 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms-3"
                    className="peer inputUnset checkboxCustom"
                    {...register("survey-used", { required: true })}
                  />
                  <label
                    className="flex gap-2 items-center cursor-pointer before:w-[3rem] before:h-[3rem] before:inline-block before:content-[''] before:bg-[url('/check-circle.svg')] peer-checked:before:bg-[url('/checked-circle.svg')] font-gowunBold text-[1.6rem]"
                    htmlFor="terms-3"
                  >
                    설문 데이터 활용 동의
                    <span
                      className={`font-normal inline-block font-gowunBold text-primary-30`}
                    >
                      (필수)
                    </span>
                  </label>
                </div>

                <div className="bg-grey-20 border border-grey-40 rounded-xl max-h-[100px] overflow-auto box-border text-[1.4rem] text-grey-70 font-light flex flex-col gap-3 py-[1.6rem] px-[1.8rem] custom-scrollbar">
                  <p> [설문 데이터 활용 동의 안내]</p>
                  <p className="leading-[135%]">
                    본 설문 결과는 기업의 채용 및 인재 매칭 목적에 활용되며,
                    통계적 분석을 위해 익명화되어 사용될 수 있습니다. 수집된
                    설문 응답은 연구 및 서비스 개선의 목적으로만 활용되며,
                    외부에 공개되지 않습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-[2.4rem]">
              <Button
                primary={isOkayToNext}
                blocked={!isOkayToNext}
                rounded
                className="h-[3.6rem] lg:h-[4rem] leading-[4rem] text-[1.4rem] lg:text-[1.6rem]"
              >
                동의하고 계속하기
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </SurveyLayout>
  );
}
