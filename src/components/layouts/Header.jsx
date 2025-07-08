export default function Header({ leftSlot, middleSlot, rightSlot }) {
  if (!leftSlot && !middleSlot && !rightSlot) return null;

  return (
    <header className="grid grid-cols-3 items-center justify-center px-[1.8rem] py-[1.2rem] border-b border-grey-20">
      <div className="mr-auto">{leftSlot}</div>
      <div className="text-center">{middleSlot}</div>
      <div className="ml-auto">{rightSlot}</div>
    </header>
  );
}
