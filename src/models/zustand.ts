export interface Answer {
  questionId: number;
  choiceId: number;
}

export interface AnswersStore {
  answers: Answer[];
  setAnswer: (newAnswer: Answer) => void;
  resetAnswer: () => void;
}

export interface User {
  nickname: string;
  profileImageUrl?: string;
  ssoProvider: "KAKAO" | "GOOGLE";
}

export interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}
