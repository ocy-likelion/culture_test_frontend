import { ModalProps } from "@/models/common";
import { ReactNode } from "react";

// components/ui/Modal.jsx
export default function Modal({ children, onClose }: ModalProps) {
  // 바깥쪽 배경 클릭 시 닫기
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 이벤트가 자식 div로 전파된 경우는 무시
    if (onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center px-[4rem]"
      onClick={handleBackgroundClick}
    >
      <div
        className={`flex flex-col gap-[1.8rem] bg-white rounded-xl min-w-[24rem] lg:min-w-[28rem] shadow-lg p-[2rem] pt-[3rem] max-w-[34rem]`}
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파(버블링: 자식 -> 부모) 방지
      >
        {children}
      </div>
    </div>
  );
}
