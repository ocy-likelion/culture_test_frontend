export default function TestEntry() {
  return (
    <div className="flex w-full border border-grey-50 rounded-[0.8rem] pl-[1.4rem] pr-[2.8rem] py-[1rem] gap-[1rem]">
      <div>
        <img src="/result-exam.svg" className="w-[12rem]" />
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <span className="font-medium text-[1.8rem]">관계 조율자형</span>
          <span className="text-grey-70 text-[1.6rem]">2025.07.03</span>
        </div>

        <button className="bg-primary-30 px-[1.2rem] py-[0.8rem] text-white border text-[1.4rem] font-medium rounded-lg border-grey-30">
          결과 보기
        </button>
      </div>
    </div>
  );
}
