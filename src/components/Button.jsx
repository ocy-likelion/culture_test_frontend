// components/shared/Button.tsx
import classNames from "classnames";
import { GoSync } from "react-icons/go";

function Button({
  children,
  primary,
  secondary,
  kakao,
  google,
  // success,
  // warning,
  // danger,
  // outline,
  rounded,
  loading,
  ...rest
}) {
  const classes = classNames(
    "flex items-center justify-center w-full h-[4.8rem] 2xl:h-[6rem] transition-all duration-150 font-semibold text-[1.8rem] leading-[4.2rem] 2xl:leading-[6rem] tracking-[0%] border",
    rest.className,
    {
      "opacity-80 cursor-not-allowed": loading,
      "border-primary-30 bg-primary-30 text-white": primary,
      "border-grey-50 bg-white text-primary-30": secondary,
      // "border-green-500 bg-green-500 text-white": success,
      // "border-yellow-400 bg-yellow-400 text-white": warning,
      // "border-red-500 bg-red-500 text-white": danger,
      "rounded-[0.6rem]": rounded,
      "border-none bg-kakao text-grey-90": kakao,
      "border-grey-50 bg-white text-grey-90": google,
      // "bg-white": outline,
      // "text-primary-30": outline && primary,
      // "text-grey-90": outline && secondary,
      // "text-green-500": outline && success,
      // "text-yellow-400": outline && warning,
      // "text-red-500": outline && danger,
    }
  );

  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? <GoSync className="animate-spin" /> : children}
    </button>
  );
}

Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);
    if (count > 1) {
      return new Error(
        "Only one of primary, secondary, success, warning, danger can be true"
      );
    }
  },
};

export default Button;
