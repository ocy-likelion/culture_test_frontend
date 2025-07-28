import convertToSvgPath from "@/hooks/useConvertPath";
import { ResultEntryProps } from "@/models/common";
import { useNavigate } from "react-router-dom";

export default function ResultEntry({
  resultId,
  type,
  date,
  image,
}: ResultEntryProps) {
  const navigate = useNavigate();
  const imageName = convertToSvgPath(image);

  return (
    <div className="flex w-full border-[0.05rem] lg:border border-grey-50 rounded-[0.8rem] pl-[1rem] pr-[1.4rem] lg:pl-[1.4rem] lg:pr-[2.8rem] py-[1rem] gap-[1rem]">
      <img
        src={imageName}
        className="w-[10rem] lg:w-[12rem]"
        alt="결과유형 이미지"
      />

      <div className="w-full flex gap-[2rem] items-center">
        <div className="flex flex-col grow gap-2 lg:gap-4">
          <span className="font-medium text-[1.4rem] lg:text-[1.8rem]">
            {type}
          </span>
          <span className="text-grey-70 text-[1.2rem] lg:text-[1.6rem]">
            {date}
          </span>
        </div>

        <button
          className="shirnk-0 whitespace-nowrap bg-primary-30 px-[1rem] lg:px-[1.2rem] text-white border text-[1.2rem] lg:text-[1.4rem] h-[3rem] leading-[3rem] font-medium rounded-lg border-grey-30"
          onClick={() => navigate(`/mypage/history/${resultId}`)}
        >
          결과 보기
        </button>
      </div>
    </div>
  );
}
