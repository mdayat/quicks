import type {
  ChatColorByUserID,
  GroupedMessages,
  Inbox,
  Message,
} from "../data/inbox";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const chatColor = [
  {
    message: "#FCEED3",
    userName: "#E5A443",
  },
  {
    message: "#EEDCFF",
    userName: "#9B51E0",
  },
  {
    message: "#D2F2EA",
    userName: "#43B78D",
  },
];

// Count the participants by looping through all messages, and
// identify each participant by "userID".
// This to ensure data integrity since we are not leveraging Relational Database.
function countParticipants(inboxMessages: Message[]): number {
  let participants = 0;
  const recordedUserID: string[] = [];

  for (let i = 0; i < inboxMessages.length; i++) {
    const message = inboxMessages[i];
    if (!recordedUserID.includes(message.userID)) {
      recordedUserID.push(message.userID);
      participants++;
    }
  }

  return participants;
}

// Determine each participants chat color by looping through all messages, and
// identify each participant by "userID".
// This is primarily used in "group" type inbox.
function determineChatColorByUserID(
  inboxMessages: Message[]
): ChatColorByUserID[] {
  const chatColorsByUserID: ChatColorByUserID[] = [];
  let chatColorIndexTracker = 0;

  for (let i = 0; i < inboxMessages.length; i++) {
    const message = inboxMessages[i];
    const isUserIDExisted = chatColorsByUserID.find(
      ({ userID }) => userID === message.userID
    );

    if (!isUserIDExisted) {
      chatColorsByUserID.push({
        userID: message.userID,
        msgColor: chatColor[chatColorIndexTracker].message,
        userNameColor: chatColor[chatColorIndexTracker].userName,
      });

      chatColorIndexTracker++;
      if (chatColorIndexTracker > chatColor.length - 1) {
        chatColorIndexTracker = 0;
      }
    }
  }

  return chatColorsByUserID;
}

// Sort messages from oldest to newest using bubble sort by modifying it directly
function sortMsgFromOldestToNewest(messages: Message[]): Message[] {
  let swapping = true;
  let end = messages.length - 1;

  while (swapping) {
    swapping = false;
    for (let i = 0; i < end; i++) {
      const currentMsgUnixTime = new Date(messages[i].isoDate).getTime();
      const nextMsgUnixTime = new Date(messages[i + 1].isoDate).getTime();

      if (currentMsgUnixTime > nextMsgUnixTime) {
        const temp = messages[i];
        messages[i] = messages[i + 1];
        messages[i + 1] = temp;
        swapping = true;
      }
    }
    end--;
  }

  return messages;
}

// Group the sorted messages by its date (month and date)
function groupMsgByDate(sortedMessages: Message[]): GroupedMessages {
  const groupedMessages: GroupedMessages = new Map();
  for (let i = 0; i < sortedMessages.length; i++) {
    const message = sortedMessages[i];
    const messageMonth = new Date(message.isoDate).getMonth();
    const messageDate = new Date(message.isoDate).getDate();

    if (!groupedMessages.has(String(messageMonth))) {
      const groupedMsgInDate = new Map<string, Message[]>().set(
        String(messageDate),
        new Array(message)
      );

      groupedMessages.set(String(messageMonth), groupedMsgInDate);
      continue;
    }

    const groupedMsgInMonth = groupedMessages.get(String(messageMonth)) as Map<
      string,
      Message[]
    >;

    if (!groupedMsgInMonth.has(String(messageDate))) {
      groupedMsgInMonth.set(String(messageDate), new Array(message));
      continue;
    }

    const messagesInDate = groupedMsgInMonth.get(
      String(messageDate)
    ) as Message[];

    messagesInDate.push(message);
  }

  return groupedMessages;
}

// Sort inboxes from newest to oldest using bubble sort by modifying it directly
function sortInboxFromNewestToOldest(inboxes: Inbox[]): Inbox[] {
  let swapping = true;
  let end = inboxes.length - 1;

  while (swapping) {
    swapping = false;
    for (let i = 0; i < end; i++) {
      const currentMsgUnixTime = new Date(
        inboxes[i].lastMessage.isoDate
      ).getTime();

      const nextMsgUnixTime = new Date(
        inboxes[i + 1].lastMessage.isoDate
      ).getTime();

      if (currentMsgUnixTime < nextMsgUnixTime) {
        const temp = inboxes[i];
        inboxes[i] = inboxes[i + 1];
        inboxes[i + 1] = temp;
        swapping = true;
      }
    }
    end--;
  }

  return inboxes;
}

export {
  months,
  countParticipants,
  determineChatColorByUserID,
  sortMsgFromOldestToNewest,
  groupMsgByDate,
  sortInboxFromNewestToOldest,
};
