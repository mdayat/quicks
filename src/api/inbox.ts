// The purpose of this file is to create API request simulation to the server

import { inboxList, messages } from "../data/inbox";
import type { InboxItem, Message } from "../data/inbox";

function getInboxes(): Promise<InboxItem[]> {
  const promise = new Promise<InboxItem[]>((resolve) => {
    setTimeout(() => {
      resolve(inboxList);
    }, 500);
  });
  return promise;
}

function getInbox(inboxID: string): Promise<InboxItem | undefined> {
  const promise = new Promise<InboxItem | undefined>((resolve) => {
    setTimeout(() => {
      resolve(inboxList.find(({ id }) => id === inboxID));
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

function searchInbox(searchValue: string): Promise<InboxItem[]> {
  const promise = new Promise<InboxItem[]>((resolve) => {
    getInboxes()
      .then((inboxes) => {
        const obtainedInboxes: InboxItem[] = inboxes.filter(({ name }) => {
          return name.toLowerCase().includes(searchValue.toLowerCase());
        });

        resolve(obtainedInboxes);
      })
      .catch(() => {
        // Handle and log the error
      });
  });
  return promise;
}

export { getInboxes, getInbox, getMessages, searchInbox };
