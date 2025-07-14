import { useState } from "react";

export default function Question({
  questionId,
  displayOrder,
  content,
  choices,
}) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="w-full flex flex-col gap-2">
        <h1 className="font-medium text-primary-30 text-[2.2rem]">
          Q{displayOrder}
        </h1>
        <p className="text-grey-90 text-[2rem] font-medium leading-[135%]">
          {content}
        </p>

        <div className="relative flex items-center justify-between w-full mt-[4rem] mb-6 z-[0]">
          {choices.map((choice) => (
            <label key={choice.choiceId} className="choice type_radio">
              <input
                type="radio"
                name={`question-${questionId}`} // ✅ 여기를 고유하게 지정해야 브라우저가 한 그룹으로 인식하지 않고 각 라디오 버튼을 독립적으로 처리함.
                value={choice.choiceId}
                className={`inputUnset w-30 transition-all duration-200
                  ${
                    selected === choice.choiceId
                      ? "bg-primary-30 border-primary-30"
                      : "border-grey-30"
                  }
                `}
                onChange={() => setSelected(choice.choiceId)}
              />
              <span
                className={`text-[1.4rem] mt-2 text-center ${
                  selected === choice.choiceId
                    ? "text-primary-30 font-medium"
                    : "text-grey-60"
                }`}
              >
                {choice.content}
              </span>
            </label>
          ))}
          <div className="absolute top-[1rem] left-1/2 -translate-x-1/2 w-[88%] h-[0.16rem] bg-grey-50 z-[-1]" />
        </div>
      </div>
    </>
  );
}
