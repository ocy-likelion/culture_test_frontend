export interface Answer {
  questionId: number;
  choiceId: number;
}

export interface AnswersStore {
  answers: Answer[];
  setAnswer: (newAnswer: Answer) => void;
  resetAnswer: () => void;
}
