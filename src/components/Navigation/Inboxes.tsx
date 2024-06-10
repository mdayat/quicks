import { Link } from "react-router-dom";
import { Message } from "../../icons/Message";
import { Task } from "../../icons/Task";

export function Inboxes(): JSX.Element {
  return (
    <div className="relative">
      <div className="relative">
        <div className="bg-primary-2 w-[68px] h-[68px] rounded-full absolute -z-10 right-4"></div>
        <Link
          to="/"
          className="bg-indicator-2 w-[68px] h-[68px] rounded-full flex justify-center items-center"
        >
          <Message className="fill-[#fff] w-6 h-6" />
        </Link>
      </div>

      <Link
        to="inboxes"
        className="bg-[#F2F2F2] animate-inboxesIn flex justify-center items-center w-[60px] h-[60px] rounded-full absolute top-1 -z-10 invisible"
      >
        <Message className="fill-indicator-2 w-6 h-6" />
      </Link>

      <Link
        to="tasks"
        className="bg-[#F2F2F2] animate-tasksSlide flex justify-center items-center w-[60px] h-[60px] rounded-full absolute top-1 right-0 -translate-x-[calc(68px+24px)]"
      >
        <Task className="fill-indicator-1 w-6 h-6" />
      </Link>
    </div>
  );
}
