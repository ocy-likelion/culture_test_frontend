import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

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
    } catch (error) {
      console.error("Error capturing div:", error);
    }
  };

  return { captureDiv };
}
