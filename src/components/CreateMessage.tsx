import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Dispatch, FormEvent } from "react";

import { Button } from "./Button";
import { messages } from "../data/inbox";
import { groupMsgByDate, sortMsgFromOldestToNewest } from "../utils/inbox";
import type { InboxDetail, Message } from "../data/inbox";

interface CreateMessageProps {
  inboxID: string;
  inboxDetail: InboxDetail;
  setInboxDetail: Dispatch<InboxDetail>;
}

export function CreateMessage({
  inboxID,
  inboxDetail,
  setInboxDetail,
}: CreateMessageProps): JSX.Element {
  const [messageContent, setMessageContent] = useState("");
  const drakeMessage = useMemo(() => {
    // User with the name of "Drake" is identified as the current user
    return messages.find(({ userName }) => userName === "Drake");
  }, []);

  function createMsgOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newMessage: Message = {
      id: uuidv4(),
      inboxID,
      userID: drakeMessage?.userID ?? uuidv4(),
      userName: "",
      content: messageContent,
      isoDate: new Date().toISOString(),
      isUnread: true,
    };

    newMessage.userName = drakeMessage?.userName ?? `Name-${newMessage.id}`;
    messages.push(newMessage);

    const inboxMessages = messages.filter(
      ({ inboxID }) => inboxID === inboxDetail.id
    );

    sortMsgFromOldestToNewest(inboxMessages);
    inboxDetail.groupedMessages = groupMsgByDate(inboxMessages);
    setInboxDetail({ ...inboxDetail });
    setMessageContent("");

    setTimeout(() => {
      const divEl = document.getElementById(
        "inbox_content_container"
      ) as HTMLDivElement;
      divEl.scrollTo(0, divEl.scrollHeight);
    }, 0);
  }

  return (
    <form
      action=""
      className="flex justify-between items-center gap-x-4 h-10 mt-[22px]"
      onSubmit={createMsgOnSubmit}
    >
      <input
        type="text"
        id="create_message"
        name="create_message"
        placeholder="Type a new message"
        autoComplete="off"
        className="placeholder:text-primary-2 resize-none leading-none outline-none border border-[#828282] rounded-[5px] w-full h-full px-4"
        value={messageContent}
        onChange={(event) => setMessageContent(event.currentTarget.value)}
      />

      <Button type="submit">Send</Button>
    </form>
  );
}
