import Button from "@components/Button";
import SurveyLayout from "@components/layouts/SurveyLayout";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <>
      <SurveyLayout
        primaryBtn={
          <Button kakao rounded onClick={() => navigate("/start")}>
            <img src="/kakao.svg" className="w-[2rem] aspect-square mr-2" />
            카카오로 시작하기
          </Button>
        }
        secondaryBtn={
          <Button google rounded onClick={() => console.log("GOOGLE!")}>
            <img src="/google.svg" className="w-[2rem] aspect-square mr-2" />
            구글로 시작하기
          </Button>
        }
        mainClassName="items-center"
      >
        <div className="flex flex-col justify-center items-center gap-[2rem] mt-[14rem]">
          <img src="/logo.svg" className="w-[25rem]" />
          <p className="text-[2rem] font-regular">
            나와 잘 맞는 사람, AI가 찾아드립니다
          </p>
        </div>

        <div>
          <img src="/login-main.svg" className="w-[40rem]" />
        </div>
      </SurveyLayout>
    </>
  );
}
