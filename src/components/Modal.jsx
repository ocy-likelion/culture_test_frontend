// components/ui/Modal.jsx
export default function Modal({ children }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      <div
        className={`flex flex-col gap-[1.8rem] bg-white rounded-xl min-w-[24rem] lg:min-w-[28rem] shadow-lg p-[2rem] pt-[3rem] `}
      >
        {children}
      </div>
    </div>
  );
}
