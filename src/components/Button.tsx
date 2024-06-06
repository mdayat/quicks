import { ComponentPropsWithRef, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren<ComponentPropsWithRef<"button">> {
  className?: string;
}

export function Button({
  className,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      className={`bg-primary-1 text-[#fff] font-bold flex justify-between items-center py-2 px-4 rounded-[5px] min-w-11 max-h-10 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
