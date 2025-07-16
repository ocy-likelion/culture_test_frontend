import Footer from "@components/layouts/Footer";
import Header from "@components/layouts/Header";

export default function SurveyLayout({
  children,
  leftSlot,
  middleSlot,
  rightSlot,
  primaryBtn,
  secondaryBtn,
  containerCN = "bg-white",
  mainCN = "",
  footerCN = "bg-white",
}) {
  return (
    <div
      className={`max-w-[640px] mx-auto flex flex-col min-h-screen ${containerCN}`}
    >
      {/* 상단 네비게이션 or 진행 표시 */}
      <Header
        leftSlot={leftSlot}
        middleSlot={middleSlot}
        rightSlot={rightSlot}
      />
      {/* 콘텐츠 영역 */}
      {/* Tailwind에서는 items-* 클래스는 서로 덮어쓰기 되지 않고 공존 => mainClassName으로 스타일링 조정 */}
      <main className={`flex flex-col flex-1 overflow-y-auto ${mainCN}`}>
        {children}
      </main>
      {/* 하단 버튼 영역 */}
      <Footer
        primaryBtn={primaryBtn}
        secondaryBtn={secondaryBtn}
        footerCN={footerCN}
      />
    </div>
  );
}
