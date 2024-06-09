import type { ComponentPropsWithRef } from "react";

export function ArrowBack({
  ...rest
}: ComponentPropsWithRef<"svg">): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" {...rest}>
      <path d="M20.9883 8.83041H5.68683L12.7152 1.80204L10.9298 0.0292358L0.871338 10.0877L10.9298 20.1462L12.7026 18.3734L5.68683 11.345H20.9883V8.83041Z" />
    </svg>
  );
}
