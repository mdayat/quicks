import { useEffect, useState } from "react";

import { inboxList, messages } from "../data/inbox";
import type {
  GroupedMessages,
  InboxDetail,
  InboxItem,
  Message,
} from "../data/inbox";

// Simulating API request to the server with timeout
function getInboxes(): Promise<InboxItem[]> {
  const promise = new Promise<InboxItem[]>((resolve) => {
    setTimeout(() => {
      resolve(inboxList);
    }, 500);
  });
  return promise;
}

function getMessages(): Promise<Message[]> {
  const promise = new Promise<Message[]>((resolve) => {
    setTimeout(() => {
      resolve(messages);
    }, 500);
  });
  return promise;
}

function getInboxDetail(inboxID: string): Promise<unknown> {
  const promise = new Promise<unknown>((resolve) => {
    Promise.all([getInboxes(), getMessages()])
      .then(([inboxes, messages]) => {
        const inbox = inboxes.find(({ id }) => id === inboxID);
        if (inbox === undefined) {
          resolve(inbox);
          return;
        }

        const inboxDetail: InboxDetail = {
          id: inbox.id,
          name: inbox.name,
          participants: getParticipants(messages),
          groupedMessages: new Map(),
        };

        sortMessageFromOldestToNewest(messages);
        const groupedMessages = groupMessagesByDate(messages);
        inboxDetail.groupedMessages = groupedMessages;
        resolve(inboxDetail);
      })
      .catch(() => {
        // Handle and log the error
      });
  });
  return promise;
}

// Sort messages from oldest to newest using bubble sort by modifying it directly
function sortMessageFromOldestToNewest(messages: Message[]): Message[] {
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

function groupMessagesByDate(sortedMessages: Message[]): GroupedMessages {
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

// Simulating API request to the server with timeout
function searchInbox(searchValue: string): Promise<InboxItem[]> {
  const promise = new Promise<InboxItem[]>((resolve) => {
    setTimeout(() => {
      const obtainedInboxes: InboxItem[] = new Array(inboxList.length);
      for (let i = 0; i < inboxList.length; i++) {
        const inbox = inboxList[i];
        if (inbox.name.toLowerCase().includes(searchValue.toLowerCase())) {
          console.log("SINI");
          obtainedInboxes.push(inbox);
        }
      }

      resolve(obtainedInboxes);
    }, 500);
  });
  return promise;
}

// Count the participants by looping through all messages, and
// identify each participant by "userID".
// This to ensure data integrity since we are not leveraging Relational Database.
function getParticipants(inboxMessages: Message[]): number {
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

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export { getInboxes, getInboxDetail, searchInbox, useDebounce };
