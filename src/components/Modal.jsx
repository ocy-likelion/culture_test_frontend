// components/ui/Modal.jsx
export default function Modal({ children }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      <div className={`bg-white rounded-xl min-w-[28rem] shadow-lg p-[3rem]`}>
        {children}
      </div>
    </div>
  );
}
