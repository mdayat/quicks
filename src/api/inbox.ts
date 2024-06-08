// The purpose of this file is to create API request simulation to the server

import { inboxes, messages } from "../data/inbox";
import type { Inbox, Message } from "../data/inbox";

function getInboxes(): Promise<Inbox[]> {
  const promise = new Promise<Inbox[]>((resolve) => {
    setTimeout(() => {
      resolve(inboxes);
    }, 500);
  });
  return promise;
}

function getInbox(inboxID: string): Promise<Inbox | undefined> {
  const promise = new Promise<Inbox | undefined>((resolve) => {
    setTimeout(() => {
      resolve(inboxes.find(({ id }) => id === inboxID));
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

export { getInboxes, getInbox, getMessages };
