import { create, StateCreator } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { User, UserStore } from "@models/zustand";

const userStore: StateCreator<
  UserStore, // 생성되는 전체 상태 객체의 타입 (state 구조 정의) (State)
  [["zustand/devtools", never], ["zustand/persist", unknown]], // 사용할 미들웨어들
  [], // 슬라이스 미사용
  UserStore // storeCreator 함수가 반환하는 값의 타입 (리턴값 타입)
  // 대부분 같은 타입을 쓰기 때문에 결과적으로 앞뒤가 같지만, 상황에 따라 리턴 타입이 Partial이거나 추가 기능이 붙는다면 다르게 지정할 수도 있음
  // ex. Partial<AnswersStore> : 리턴 타입이 일부 필드만 포함될 경우
> = (set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  resetUser: () => set({ user: null, fromSession: true }),
  fromSession: false,
  clearFromSession: () => set({ fromSession: false }),
});

const useUserStore = create<UserStore>()(
  devtools(
    persist(userStore, {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    })
  )
);

export default useUserStore;

// /oauth2/authorization/kakao
