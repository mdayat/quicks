import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { InboxContent } from "../components/InboxDetailContent";
import { ArrowBack } from "../icons/ArrowBack";
import { Close } from "../icons/Close";
import { getInbox, getMessages } from "../api/inbox";
import { groupMsgByDate, sortMsgFromOldestToNewest } from "../utils/inbox";
import type { InboxDetail as InboxDetailType } from "../data/inbox";

export function InboxDetail(): JSX.Element {
  const [inboxDetail, setInboxDetail] = useState<InboxDetailType>();
  const [isLoading, setIsLoading] = useState(true);
  const { inboxID } = useParams();

  useEffect(() => {
    Promise.all([getInbox(inboxID as string), getMessages()])
      .then(([inbox, messages]) => {
        if (inbox === undefined) {
          setIsLoading(false);
          return;
        }

        const inboxMessages = messages.filter(
          ({ inboxID }) => inboxID === inbox.id
        );

        sortMsgFromOldestToNewest(inboxMessages);
        const groupedMessages = groupMsgByDate(inboxMessages);

        const inboxDetail: InboxDetailType = {
          id: inbox.id,
          name: inbox.name,
          participants: inbox.participants,
          groupedMessages,
        };

        setInboxDetail(inboxDetail);
        setIsLoading(false);
      })
      .catch(() => {
        // Handle and log the error
      });
  }, [inboxID]);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (inboxDetail === undefined) {
    return <div>404 page</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between pb-[22px] border-b border-b-primary-3">
        <div className="flex justify-start items-center">
          <Link to="/inboxes" className="py-[11px] pr-4">
            <ArrowBack className="w-4 h-4" />
          </Link>

          <div className="flex flex-col gap-y-2">
            <h1 className="text-primary-1 font-bold leading-none">
              {inboxDetail.name}
            </h1>
            <p className="leading-none text-sm">
              Participants: {inboxDetail.participants}
            </p>
          </div>
        </div>

        <Link to="/inboxes" className="py-3 pr-4">
          <Close className="w-[14px] h-[14px]" />
        </Link>
      </div>

      {InboxContent(inboxDetail.groupedMessages).map(
        (MessageGroup) => MessageGroup
      )}
    </>
  );
}
