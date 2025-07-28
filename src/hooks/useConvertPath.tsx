export default function convertToSvgPath(path: string): string {
  if (!path) return "";
  return path.replace(/\.\w+$/, ".svg");
}
