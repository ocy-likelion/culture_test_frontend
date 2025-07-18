import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const REDIRECT_URI = `${import.meta.env.VITE_API_FRONT_URL}/intro`;

  const handleKakaoLogin = () => {
    // 카카오 로그인 페이지로 보내주는 주체는 "백엔드" => 8090
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/oauth2/authorization/kakao?state=${REDIRECT_URI}`;
  };

  return (
    <>
      <SurveyLayout
        primaryBtn={
          <Button
            kakao
            rounded
            onClick={handleKakaoLogin}
            className="text-[1.4rem] lg:text-[1.6rem]"
          >
            <img src="/kakao.svg" className="w-[2rem] aspect-square mr-2" />
            카카오로 시작하기
          </Button>
        }
        secondaryBtn={
          <Button
            google
            rounded
            onClick={() => navigate("/intro")}
            className="text-[1.4rem] lg:text-[1.6rem] "
          >
            <img src="/google.svg" className="w-[1.8rem] aspect-square mr-2" />
            구글로 시작하기
          </Button>
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
