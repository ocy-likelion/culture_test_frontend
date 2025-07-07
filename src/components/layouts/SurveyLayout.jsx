// layouts/SurveyLayout.tsx

export default function SurveyLayout({ children }) {
  return (
    <div className="bg-slate-400 max-w-[640px] mx-auto flex flex-col min-h-screen px-4 py-6">
      {/* 상단 네비게이션 or 진행 표시 */}
      <header className="grid grid-cols-3 items-center justify-center bg-slate-200">
        <div className="mr-auto">grid 1</div>
        <div className="text-center">grid 2</div>
        <div className="ml-auto">grid 3</div>
      </header>

      {/* 콘텐츠 영역 */}
      <main className="flex-1">{children}</main>

      <footer>FOOTER</footer>
    </div>
  );
}
