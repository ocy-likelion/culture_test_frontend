import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const answersStore = (set) => ({
  answers: [],
  setAnswer: (newAnswer) =>
    set((state) => {
      const filtered = state.answers.filter(
        (a) => a.questionId !== newAnswer.questionId
      );
      return { answers: [...filtered, newAnswer] };
    }),
  resetAnswer: () => set({ answers: [] }),
});

const useAnswersStore = create(
  persist(answersStore, {
    name: "survey-answers",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export default useAnswersStore;
