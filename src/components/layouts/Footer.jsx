import PropTypes from "prop-types";

export default function Footer({ primaryBtn, secondaryBtn, footerCN }) {
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

Footer.propTypes = {
  primaryBtn: PropTypes.node.isRequired, // JSX 포함, string, number 등 모두 가능
  secondaryBtn: PropTypes.node, // 선택적
};
