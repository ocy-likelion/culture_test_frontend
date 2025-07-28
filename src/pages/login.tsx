import useUserStore from "@/zustand/useUserStore";
import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const REDIRECT_URI: string = `${import.meta.env.VITE_API_FRONT_URL}/auth`;
  const [isExpanded, setIsExpanded] = useState(false);

  // 로그인된 상태에서 로그인 페이지('/') 접근 불가
  useEffect(() => {
    if (user) {
      navigate("/intro");
    }
  }, [user]);

  const handleKakaoLogin = (): void => {
    const kakaoUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/oauth2/authorization/kakao?state=${REDIRECT_URI}`;
    // 카카오 로그인 페이지로 보내주는 주체는 "백엔드" => 8090

    // ✅ 현재 페이지를 히스토리에 남기지 않고 리다이렉트
    window.location.href = kakaoUrl; // 💥redirect_uri 파라미터 이름은 "state"
  };

  const handleGoogleLogin = (): void => {
    const googleUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/oauth2/authorization/google?state=${REDIRECT_URI}`;

    window.location.href = googleUrl; // 💥redirect_uri 파라미터 이름은 "state"
  };

  useEffect(() => {
    // 1초 뒤 오른쪽 화면으로 전환
    const timer = setTimeout(() => setIsExpanded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SurveyLayout
        primaryBtn={
          isExpanded && (
            <Button
              kakao
              rounded
              onClick={handleKakaoLogin}
              className="transition-all duration-1000 text-[1.4rem] lg:text-[1.6rem]"
            >
              <img src="/kakao.svg" className="w-[2rem] aspect-square mr-2" />
              카카오로 시작하기
            </Button>
          )
        }
        secondaryBtn={
          isExpanded && (
            <Button
              google
              rounded
              // onClick={}
              className="transition-all duration-1000 text-[1.4rem] lg:text-[1.6rem] "
              onClick={handleGoogleLogin}
            >
              <img
                src="/google.svg"
                className="w-[1.8rem] aspect-square mr-2"
              />
              구글로 시작하기
            </Button>
          )
        }
        mainCN={`pt-[12rem] lg:pt-[16rem] items-center gap-[2rem] transition-all duration-1000 ease-in-out ${
          isExpanded ? "bg-white" : "bg-primary-30"
        }`}
        // footerCN="mb-[14rem] lg:mb-[18rem]"
      >
        <div
          className={`flex flex-col gap-[1rem] transition-all duration-1000 ease-in-out ${
            isExpanded
              ? "mt-[8rem] items-start px-[3rem] w-full "
              : "justify-center items-center mt-[14rem] lg:mt-[18rem]"
          }`}
        >
          <p
            className={`text-[1.6rem] lg:text-[2rem] ${
              isExpanded ? "hidden" : "text-white"
            }`}
          >
            컬쳐핏 <span className="font-semibold">채용의 시작,</span>
          </p>

          <img
            src={`${isExpanded ? "logo-color.svg" : "/logo.svg"}`}
            className={`transition-all duration-1000 ${
              isExpanded ? "w-[8rem] lg:w-[10rem]" : "w-[12rem] lg:w-[16rem]"
            }`}
          />

          {isExpanded ? (
            <div className="mt-[0.4rem] text-[1.5rem] lg:text-[2rem] font-medium leading-[150%]">
              <p>우리 팀과 딱 맞는 사람,</p>
              <p>
                <span className="text-primary-30 font-semibold animate-blink">
                  피틴
                </span>
                에서 함께 찾아요.
              </p>
            </div>
          ) : (
            " "
          )}
        </div>
      </SurveyLayout>
    </>
  );
}
