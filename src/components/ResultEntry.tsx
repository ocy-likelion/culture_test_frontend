import { ResultEntryProps } from "@/models/common";
import { useNavigate } from "react-router-dom";

export default function ResultEntry({
  resultId,
  type,
  date,
  image = "/temp-pic.svg",
}: ResultEntryProps) {
  const navigate = useNavigate();

  return (
    <div className="flex w-full border-[0.05rem] lg:border border-grey-50 rounded-[0.8rem] pl-[1.4rem] pr-[2.8rem] py-[1rem] gap-[1rem]">
      <img
        src={image}
        className="w-[10rem] lg:w-[12rem]"
        alt="결과유형 이미지"
      />

      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-2 lg:gap-4">
          <span className="font-medium text-[1.4rem] lg:text-[1.8rem]">
            {type}
          </span>
          <span className="text-grey-70 text-[1.2rem] lg:text-[1.6rem]">
            {date}
          </span>
        </div>

        <button
          className="bg-primary-30 px-[1rem] lg:px-[1.2rem] py-[0.6rem] lg:py-[0.8rem] text-white border text-[1.2rem] lg:text-[1.4rem] font-medium rounded-lg border-grey-30"
          onClick={() => navigate(`/mypage/history/${resultId}`)}
        >
          결과 보기
        </button>
      </div>
    </div>
  );
}
