import { FooterProps } from "@/models/survey";

export default function Footer({
  primaryBtn,
  secondaryBtn,
  footerCN = "",
}: FooterProps) {
  if (!primaryBtn && !secondaryBtn) {
    return null;
  }

  const isFixed = !footerCN.includes("static");

  return (
    <footer
      className={`${
        isFixed ? "fixed bottom-0 left-1/2 -translate-x-1/2" : ""
      } max-w-[640px] w-full p-[2rem] flex flex-col gap-[1rem] ${footerCN}`}
    >
      {primaryBtn}
      {secondaryBtn}
    </footer>
  );
}
