import { MoreHoriz } from "../icons/MoreHoriz";
import { months } from "../utils/inbox";
import type {
  ChatColorByUserID,
  GroupedMessages,
  Message,
} from "../data/inbox";

function GenerateInboxContent(
  groupedMessages: GroupedMessages,
  participantsChatColor: ChatColorByUserID[]
): JSX.Element[] {
  const MessageGroupsJSX: JSX.Element[] = [];

  for (const [monthIndex, groupedMsgInDate] of groupedMessages) {
    for (const [date, messages] of groupedMsgInDate) {
      MessageGroupsJSX.push(
        <MessageGroup
          key={`${monthIndex}-${date}`}
          messages={messages}
          monthIndex={Number(monthIndex)}
          date={Number(date)}
          participantsChatColor={participantsChatColor}
        />
      );
    }
  }

  return MessageGroupsJSX;
}

interface MessageGroupProps {
  messages: Message[];
  monthIndex: number;
  date: number;
  participantsChatColor: ChatColorByUserID[];
}

function MessageGroup({
  messages,
  monthIndex,
  date,
  participantsChatColor,
}: MessageGroupProps): JSX.Element {
  const year = new Date().getFullYear();
  const month = months[Number(monthIndex)];
  const isToday = new Date().getDate() === date;

  return (
    <>
      <div className="flex justify-between items-center gap-x-8 my-[22px]">
        <hr className="bg-primary-3 border-none h-[1px] flex-grow" />
        <time
          className="text-primary-2 font-bold text-sm leading-none"
          dateTime={`${year}-${month}-${date}`}
        >
          {`${isToday ? "Today" : ""} ${month} ${date}, ${year}`}
        </time>
        <hr className="bg-primary-3 border-none h-[1px] flex-grow" />
      </div>

      {messages.map((message) => {
        const { msgColor, userNameColor } = participantsChatColor.find(
          ({ userID }) => userID === message.userID
        ) as ChatColorByUserID;

        return (
          <MessageContent
            key={message.id}
            msgColor={msgColor}
            userNameColor={userNameColor}
            {...message}
          />
        );
      })}
    </>
  );
}

function MessageContent({
  isoDate,
  content,
  userName,
  msgColor,
  userNameColor,
}: Message & Omit<ChatColorByUserID, "userID">): JSX.Element {
  const isCurrentUser = userName === "Drake"; // User with the name of "Drake" is identified as the current user
  const messageHours = String(new Date(isoDate).getHours()).padStart(2, "0");
  const messageMinutes = String(new Date(isoDate).getMinutes()).padStart(
    2,
    "0"
  );

  return (
    <div className={`w-fit mb-2.5 ${isCurrentUser ? "ml-auto" : "mr-auto"}`}>
      <h3
        className={`font-bold text-sm mb-1 ${
          isCurrentUser ? "text-right" : "text-left"
        }`}
        style={{ color: userNameColor }}
      >
        {isCurrentUser ? "You" : userName}
      </h3>

      <div
        className={`flex justify-between ${
          isCurrentUser ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`p-2.5 rounded-[5px]`}
          style={{ backgroundColor: msgColor }}
        >
          <p className="text-primary-2 text-sm">{content}</p>
          <time
            className="text-primary-2 text-xs"
            dateTime={`${messageHours}:${messageMinutes}`}
          >
            {messageHours}:{messageMinutes}
          </time>
        </div>

        <button type="button" className="w-fit h-fit px-4 pb-4">
          <MoreHoriz className="fill-primary-2 w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export { GenerateInboxContent };
