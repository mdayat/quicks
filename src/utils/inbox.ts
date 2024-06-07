import type { Inbox, Message } from "../data/inbox";
import { useEffect, useState } from "react";

// Simulating API request to the server with timeout
function getInboxes(): Promise<Inbox[]> {
  const promise = new Promise<Inbox[]>((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 500);
  });
  return promise;
}

// Simulating API request to the server with timeout
function searchInbox(): Promise<Inbox[]> {
  const promise = new Promise<Inbox[]>((resolve) => {
    setTimeout(() => {
      resolve([]);
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
    if (recordedUserID.includes(message.userID)) {
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

export { getInboxes, searchInbox, getParticipants, useDebounce };
