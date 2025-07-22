import classNames from "classnames";
import { ButtonProps } from "@/models/common";

function Button({
  children,
  primary,
  secondary,
  kakao,
  google,
  rounded,
  blocked,
  ...rest
}: ButtonProps) {
  if (Number(!!primary) + Number(!!secondary) + 0 > 1) {
    console.warn("Only one of primary, secondary, etc. should be true");
  }

  const classes = classNames(
    rest.className,
    "flex items-center justify-center w-full h-[4.4rem] xl:h-[4.8rem] 2xl:h-[6rem] transition-all duration-150 leading-[4.2rem] 2xl:leading-[6rem] tracking-[0%] border font-medium text-[1.4rem] xl:text-[1.6rem]",
    {
      "bg-grey-60 text-white cursor-not-allowed": blocked,
      "border-primary-30 bg-primary-30 text-white": primary,
      "border-grey-50 bg-white text-primary-30": secondary,
      "rounded-[0.6rem]": rounded,
      "border-none bg-kakao text-grey-90": kakao,
      "border-grey-50 bg-white text-grey-90": google,
    }
  );

  return (
    <button {...rest} disabled={blocked} className={classes}>
      {children}
    </button>
  );
}

export default Button;
