import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

export default function EmptyMessage() {
  const navigate = useNavigate();
  return (
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
  );
}
