import Button from "@/components/Button";
import SurveyLayout from "@/components/layouts/SurveyLayout";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <SurveyLayout mainCN="items-center justify-center">
      <img
        src="/error.svg"
        className="object-contain w-[20rem] lg:w-[24rem]"
        alt="에러 이미지"
      />

      <div className="flex flex-col gap-3 text-center">
        <p className="text-[2.4rem] text-grey-90 font-medium">
          앗! 이 페이지는 사라졌어요.
        </p>

        <div className="text-[1.6rem] font-light text-grey-70">
          <p>찾으시는 페이지가 없거나, 주소가 잘못 입력된 것 같아요.</p>
          <p>주소를 다시 확인해주세요.</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          primary
          rounded
          className="max-w-fit px-[3.2rem] mt-8"
          onClick={() => navigate(-1)}
        >
          이전 페이지로 돌아가기
        </Button>
      </div>
    </SurveyLayout>
  );
}
