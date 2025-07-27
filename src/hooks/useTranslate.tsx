export default function extractKoreanName(path: string): string {
  const filename = path?.split("/").pop(); // "리더형.png"
  const match = filename?.match(/([\uAC00-\uD7A3]+)(?=\.\w+$)/);
  return match ? match[1] : "";
}
