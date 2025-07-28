import html2canvas from "html2canvas";
import toast from "react-hot-toast";

export function useCapture() {
  const captureDiv = async (
    ref: React.RefObject<HTMLDivElement | null>,
    filename: string
  ) => {
    if (!ref.current) return;

    try {
      const canvas = await html2canvas(ref.current, { scale: 2 });

      // canvas를 blob으로 변환
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);

        // a 태그를 동적으로 생성하여 다운로드 유도
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // 정리
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        toast.success("이미지를 성공적으로 저장했어요!");
      });
    } catch (error) {
      console.error("Error capturing div:", error);
      toast.error("이미지 저장에 실패했어요. 다시 시도해주세요.");
    }
  };

  return { captureDiv };
}
