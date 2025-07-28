import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";

export function useCapture() {
  const captureDiv = async (
    ref: React.RefObject<HTMLDivElement | null>,
    filename: string
  ) => {
    if (!ref.current) return;

    try {
      const canvas = await html2canvas(ref.current, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, filename);
      });
      toast.success("이미지를 성공적으로 저장했어요!");
    } catch (error) {
      console.error("Error capturing div:", error);
    }
  };

  return { captureDiv };
}
