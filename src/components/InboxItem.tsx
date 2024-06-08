import { Link } from "react-router-dom";
import type { MouseEvent } from "react";

import { Person } from "../icons/Person";
import type { Inbox } from "../data/inbox";

export function InboxItem({ id, name }: Inbox): JSX.Element {
  function focusToAnchor(event: MouseEvent<HTMLDivElement>) {
    const anchorEl = document.getElementById(id) as HTMLAnchorElement;
    anchorEl.focus();

    event.currentTarget.addEventListener(
      "click",
      () => {
        anchorEl.click();
      },
      { once: true }
    );
  }

  return (
    <>
      <div
        className="cursor-pointer flex items-center gap-x-4 [&:first-child]:mt-[22px]"
        onMouseEnter={focusToAnchor}
      >
        <div className="self-start relative w-14">
          <div className="bg-primary-1 absolute top-0 right-0 z-10 p-[11px] rounded-full">
            <Person className="fill-[#fff] w-3 h-3" />
          </div>

          <div className="bg-primary-4 absolute top-0 left-0 p-[11px] rounded-full">
            <Person className="fill-primary-2 w-3 h-3" />
          </div>
        </div>

        <div className="w-full flex flex-col justify-between gap-y-1">
          <div className="flex items-center gap-x-4 mb-1">
            <h2 className="text-primary-1 font-bold leading-none max-w-sm">
              <Link id={id} to={`${id}`} className="focus:outline-none">
                {name}
              </Link>
            </h2>

            <p className="text-primary-2 leading-none text-sm">
              January 1,2021 19:10
            </p>
          </div>

          <p className="text-primary-2 font-bold leading-none text-sm">
            Last user name :
          </p>
          <div className="flex justify-between items-center">
            <p className="text-primary-2 leading-none text-sm">The message</p>
            <span className="bg-indicator-3 w-2.5 h-2.5 rounded-full"></span>
          </div>
        </div>
      </div>

      <hr className="bg-primary-3 border-none [&:last-child]:hidden my-[22px] [&:last-child]:mb-0 h-[1px]" />
    </>
  );
}
