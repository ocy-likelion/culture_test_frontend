import Footer from "@components/layouts/Footer";
import Header from "@components/layouts/Header";

export default function SurveyLayout({
  children,
  leftSlot,
  middleSlot,
  rightSlot,
  primaryBtn,
  secondaryBtn,
  mainClassName = "",
}) {
  return (
    <div className="max-w-[640px] mx-auto flex flex-col min-h-screen bg-white">
      {/* 상단 네비게이션 or 진행 표시 */}
      <Header
        leftSlot={leftSlot}
        middleSlot={middleSlot}
        rightSlot={rightSlot}
      />
      {/* 콘텐츠 영역 */}
      {/* Tailwind에서는 items-* 클래스는 서로 덮어쓰기 되지 않고 공존 => mainClassName으로 스타일링 조정 */}
      <main
        className={`flex flex-col flex-1 overflow-y-auto px-[2rem] gap-[1.6rem] 2xl:gap-[10rem] pb-[10rem] pt-[6rem] ${mainClassName}`}
      >
        {children}
      </main>
      {/* 하단 버튼 영역 */}
      <Footer primaryBtn={primaryBtn} secondaryBtn={secondaryBtn} />
    </div>
  );
}
