import type { ComponentPropsWithRef } from "react";

interface ErrorProps extends ComponentPropsWithRef<"div"> {
  message?: string;
}

export function Error({
  message = "Page Not Found",
  className,
  ...rest
}: ErrorProps): JSX.Element {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-y-6 h-[calc(737px-48px)] ${className}`}
      {...rest}
    >
      <h1 className="font-bold text-2xl">Oops!</h1>
      <p className="">Sorry, an unexpected error has occurred.</p>
      <p className="text-primary-2 italic">{message}</p>
    </div>
  );
}
