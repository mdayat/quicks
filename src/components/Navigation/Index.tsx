import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Message } from "../../icons/Message";
import { Task } from "../../icons/Task";
import { Shape } from "../../icons/Shape";
import { Inboxes } from "./Inboxes";
import { Tasks } from "./Tasks";

export function Navigation(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const { pathname } = useLocation();

  return (
    <footer className="flex justify-end items-center mt-4">
      {pathname === "/" ? (
        <div className="relative">
          <button
            type="button"
            className="bg-primary-1 w-[68px] h-[68px] rounded-full flex justify-center items-center"
            onClick={() => setIsOpened(!isOpened)}
          >
            <Shape className="fill-[#fff] w-4 h-8" />
          </button>

          <Link
            to="inboxes"
            className={`bg-[#F2F2F2] flex justify-center items-center w-[60px] h-[60px] rounded-full transition-all duration-300 ease-linear absolute top-1 right-0 ${
              isOpened
                ? "-translate-x-[calc(68px+24px)] opacity-100 z-10"
                : "opacity-0 -z-10"
            }`}
            onClick={() => setIsOpened(false)}
          >
            <Message className="fill-indicator-2 w-6 h-6" />
          </Link>

          <Link
            to="tasks"
            className={`bg-[#F2F2F2] flex justify-center items-center w-[60px] h-[60px] rounded-full transition-all duration-300 ease-linear absolute top-1 right-0 ${
              isOpened
                ? "-translate-x-[calc(68px+24px+60px+24px)] opacity-100 z-10"
                : "opacity-0 -z-10"
            }`}
            onClick={() => setIsOpened(false)}
          >
            <Task className="fill-indicator-1 w-6 h-6" />
          </Link>
        </div>
      ) : (
        <></>
      )}

      {pathname.includes("/inboxes") ? <Inboxes /> : <></>}
      {pathname.includes("/tasks") ? <Tasks /> : <></>}
    </footer>
  );
}
