import { useState } from "react";

export default function Question({ index, text, questionId }) {
  const [selected, setSelected] = useState(null);
  const options = [
    "매우 그렇다",
    "그렇다",
    "보통이다",
    "그렇지 않다",
    "전혀 아니다",
  ];

  return (
    <>
      {/* ⭐️⭐️ Quesetion 1 => 공통 컴포넌트화 예정 ⭐️⭐️ */}
      <div className="w-full flex flex-col gap-2">
        <h1 className="font-medium text-primary-30 text-[2.2rem]">
          Q{index + 1}
        </h1>
        <p className="text-grey-90 text-[2rem] font-medium leading-[135%]">
          {text}
        </p>

        <div className="relative flex items-center justify-between w-full mt-10 mb-6 z-[0]">
          {options.map((option, idx) => (
            <label key={idx} className="choice type_radio">
              <input
                type="radio"
                name={`question-${questionId}`} // ✅ 여기를 고유하게 지정해야 브라우저가 한 그룹으로 인식하지 않고 각 라디오 버튼을 독립적으로 처리함.
                value={option}
                className={`inputUnset w-30 transition-all duration-200
                  ${
                    selected === option
                      ? "bg-primary-30 border-primary-30"
                      : "border-grey-30"
                  }
                `}
                onChange={() => setSelected(option)}
              />
              <span
                className={`text-[1.4rem] mt-2 text-center ${
                  selected === option
                    ? "text-primary-30 font-semibold"
                    : "text-grey-60"
                }`}
              >
                {option}
              </span>
            </label>
          ))}
          <div className="absolute top-[1rem] left-1/2 -translate-x-1/2 w-[90%] h-[0.2rem] bg-grey-30 z-[-1]" />
        </div>
      </div>
    </>
  );
}
