import { months } from "../utils/inbox";
import type { GroupedMessages, Message } from "../data/inbox";

function InboxContent(groupedMessages: GroupedMessages): JSX.Element[] {
  const MessageGroups: JSX.Element[] = [];

  for (const [monthIndex, groupedMsgInDate] of groupedMessages) {
    const month = months[Number(monthIndex)];
    for (const [date, messages] of groupedMsgInDate) {
      MessageGroups.push(MessageGroup(messages, month, Number(date)));
    }
  }

  return MessageGroups;
}

function MessageGroup(
  messages: Message[],
  month: string,
  date: number
): JSX.Element {
  return (
    <div key={`${date}-${month}`}>
      <p>{`${date} ${month}`}</p>
      {messages.map((message) => (
        <MessageContent key={message.id} {...message} />
      ))}
    </div>
  );
}

function MessageContent({ isoDate, content, userName }: Message): JSX.Element {
  const messageHours = String(new Date(isoDate).getHours()).padStart(2, "0");
  const messageMinutes = String(new Date(isoDate).getMinutes()).padStart(
    2,
    "0"
  );

  return (
    <div className="flex items-center gap-x-4">
      <h1>{content}</h1>
      <h1>{userName}</h1>
      <h1>
        {messageHours}:{messageMinutes}
      </h1>
    </div>
  );
}

export { InboxContent };
