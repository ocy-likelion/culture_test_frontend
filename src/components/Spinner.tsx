// components/LoadingSpinnerImg.jsx
import spinner from "/spinner.svg";

// const images = [img1, img2, img3, img4];

export default function Spinner() {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <img
        src={spinner}
        alt="로딩 중"
        className="w-16 h-16 animate-spinner-rotate"
      />
    </div>
  );
}
