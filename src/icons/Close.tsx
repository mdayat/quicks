import type { ComponentPropsWithRef } from "react";

export function Close({ ...rest }: ComponentPropsWithRef<"svg">): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" {...rest}>
      <path d="M21 2.115L18.885 0L10.5 8.385L2.115 0L0 2.115L8.385 10.5L0 18.885L2.115 21L10.5 12.615L18.885 21L21 18.885L12.615 10.5L21 2.115Z" />
    </svg>
  );
}
