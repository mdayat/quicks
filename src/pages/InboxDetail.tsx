import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ArrowBack } from "../icons/ArrowBack";
import { Close } from "../icons/Close";

export function InboxDetail(): JSX.Element {
  const [inboxDetail, setInboxDetail] = useState<object | undefined>();
  console.log(inboxDetail, setInboxDetail);
  const { inboxID } = useParams();

  useEffect(() => {}, [inboxID]);

  return (
    <>
      <div className="flex items-center justify-between pb-[22px] border-b border-b-primary-3">
        <div className="flex justify-start items-center">
          <Link to="/inboxes" className="py-[11px] pr-4">
            <ArrowBack className="w-4 h-4" />
          </Link>

          <div className="flex flex-col gap-y-2">
            <h1 className="text-primary-1 font-bold leading-none">
              inbox name
            </h1>
            <p className="leading-none text-sm">participants</p>
          </div>
        </div>

        <Link to="/inboxes" className="py-3 pr-4">
          <Close className="w-[14px] h-[14px]" />
        </Link>
      </div>
    </>
  );
}
