import { Answer, AnswersStore } from "@/models/zustand";
import { create, StateCreator } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

const answersStore: StateCreator<
  AnswersStore, // 생성되는 전체 상태 객체의 타입 (state 구조 정의) (State)
  [["zustand/devtools", never], ["zustand/persist", unknown]], // 사용할 미들웨어들
  [], // 슬라이스 미사용
  AnswersStore // storeCreator 함수가 반환하는 값의 타입 (리턴값 타입)
  // 대부분 같은 타입을 쓰기 때문에 결과적으로 앞뒤가 같지만, 상황에 따라 리턴 타입이 Partial이거나 추가 기능이 붙는다면 다르게 지정할 수도 있음
  // ex. Partial<AnswersStore> : 리턴 타입이 일부 필드만 포함될 경우
> = (set) => ({
  answers: [],
  setAnswer: (newAnswer: Answer) =>
    set(
      (state) => {
        const filtered = state.answers.filter(
          (a) => a.questionId !== newAnswer.questionId
        );
        return { answers: [...filtered, newAnswer] };
      },
      false, // 기존 상태 유지하면서 일부만 업데이트
      "setAnswer" // devtools에 표시될 액션 이름
    ),
  resetAnswer: () => set({ answers: [] }, false, "resetAnswer"),
});

// devtools(storeCreatorFn, { name: "AnswersStore" });
// 🔹 storeCreatorFn: Zustand의 상태 생성 함수 ((set) => {...})
// 🔹 name: Redux DevTools 패널에 표시될 상태 이름 (디버깅용 라벨)
const useAnswersStore = create<AnswersStore>()(
  devtools(
    persist(answersStore, {
      name: "survey-answers", // persist 저장 이름 (Storage 키)
      storage: createJSONStorage(() => sessionStorage),
    }),
    {
      name: "AnswersStore", // Devtools에서 보이는 Store 이름 (디버깅용)
    }
  )
);

export default useAnswersStore;
