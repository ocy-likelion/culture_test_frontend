import { HeaderProps } from "@/models/survey";

export default function Header({
  leftSlot,
  middleSlot,
  rightSlot,
}: HeaderProps) {
  if (!leftSlot && !middleSlot && !rightSlot) return null;

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[640px] grid grid-cols-3 items-center justify-center px-[1.8rem] py-[1.2rem] border-b border-grey-20 bg-white z-10">
      <div className="mr-auto flex justify-center">{leftSlot}</div>
      <div className="mx-auto">{middleSlot}</div>
      <div className="ml-auto flex justify-center">{rightSlot}</div>
    </header>
  );
}
