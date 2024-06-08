import type { GroupedMessages, Inbox, Message } from "../data/inbox";

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
  countParticipants,
  groupMsgByDate,
  sortMsgFromOldestToNewest,
  sortInboxFromNewestToOldest,
};
