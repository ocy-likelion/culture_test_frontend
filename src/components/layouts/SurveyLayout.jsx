import Footer from "@components/layouts/Footer";
import Header from "@components/layouts/Header";

export default function SurveyLayout({
  children,
  leftSlot,
  middleSlot,
  rightSlot,
  primaryBtn,
  secondaryBtn,
}) {
  return (
    <div className="max-w-[640px] mx-auto flex flex-col min-h-screen">
      {/* 상단 네비게이션 or 진행 표시 */}
      <Header
        leftSlot={leftSlot}
        middleSlot={middleSlot}
        rightSlot={rightSlot}
      />

      {/* 콘텐츠 영역 */}
      <main className="flex flex-col flex-1 items-center overflow-y-auto px-[2rem] gap-[3rem] 2xl:gap-[10rem] pb-[10rem]">
        {children}
      </main>

      {/* 하단 버튼 영역 */}
      <Footer primaryBtn={primaryBtn} secondaryBtn={secondaryBtn} />
    </div>
  );
}
