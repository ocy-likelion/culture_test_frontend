import useUserStore from "@/zustand/useUserStore";
import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const REDIRECT_URI: string = `${import.meta.env.VITE_API_FRONT_URL}/auth`;

  const handleKakaoLogin = (): void => {
    const kakaoUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/oauth2/authorization/kakao?state=${REDIRECT_URI}`;
    // 카카오 로그인 페이지로 보내주는 주체는 "백엔드" => 8090

    // ✅ 현재 페이지를 히스토리에 남기지 않고 리다이렉트
    window.location.replace(kakaoUrl); // 💥redirect_uri 파라미터 이름은 "state"
  };

  const handleGoogleLogin = (): void => {
    const googleUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/oauth2/authorization/google?state=${REDIRECT_URI}`;

    window.location.replace(googleUrl); // 💥redirect_uri 파라미터 이름은 "state"
  };

  return (
    <>
      <SurveyLayout
        primaryBtn={
          !user ? (
            <Button
              kakao
              rounded
              onClick={handleKakaoLogin}
              className="text-[1.4rem] lg:text-[1.6rem]"
            >
              <img src="/kakao.svg" className="w-[2rem] aspect-square mr-2" />
              카카오로 시작하기
            </Button>
          ) : (
            <Button
              primary
              rounded
              className="text-[1.4rem] lg:text-[1.6rem] mb-2"
              onClick={() => navigate("/intro")}
            >
              설문 시작하기
            </Button>
          )
        }
        secondaryBtn={
          !user && (
            <Button
              google
              rounded
              // onClick={}
              className="text-[1.4rem] lg:text-[1.6rem] "
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
        mainCN="pt-[6rem] items-center gap-[2rem]"
      >
        <div className="flex flex-col justify-center items-center gap-[2rem] mt-[4rem] lg:mt-[8rem]">
          <img src="/logo.svg" className="w-[20rem] lg:w-[25rem]" />
          <p className="text-[1.6rem] lg:text-[2rem] font-regular">
            나와 잘 맞는 사람, AI가 찾아드립니다
          </p>
        </div>

        <div>
          <img src="/login-main.svg" className="w-[30rem] lg:w-[36rem]" />
        </div>
      </SurveyLayout>
    </>
  );
}
