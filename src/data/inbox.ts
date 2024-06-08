type InboxType = "group" | "single";
interface InboxItem {
  id: string;
  name: string;
  type: InboxType;
  participants?: number;
}

const inboxList: InboxItem[] = [
  {
    id: "91647f64-e715-4c38-8ab3-a7a723073c71",
    name: "Group Type Inbox",
    type: "group",
  },

  {
    id: "3ca3a288-a3b3-452a-a519-6fa326235360",
    name: "Non-Group (Single) Type Inbox",
    type: "single",
  },
];

interface Message {
  id: string;
  userID: string;
  userName: string;
  content: string;
  isoDate: string;
  isUnread: boolean;
}

const messages: Message[] = [
  // Newer month message
  {
    id: "4303fd34-572a-4b32-a60f-8685a8a5273e",
    userID: "4be83876-ac76-454c-9b89-bacb32e2d6aa",
    userName: "Anne",
    content: "World, Hello!",
    isoDate: "2024-06-01T05:00:38.000Z",
    isUnread: false,
  },
  // Today message, but unread (the newest)
  {
    id: "1fa84294-1135-47b3-93c9-9293884116a5",
    userID: "7aa5ff65-199b-4bb3-8056-3be9546d4786",
    userName: "Bob",
    content: "Try solidjs, it's great!",
    isoDate: new Date().toISOString(),
    isUnread: true,
  },
  // Today message
  {
    id: "e1be1b76-0d78-484c-8f51-7bfb4706d39e",
    userID: "970d9dee-addd-495f-93f9-3d9ebec69611",
    userName: "Drake",
    content: "Go is the greatest!",
    isoDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      1
    ).toISOString(),
    isUnread: false,
  },
  // Older month message
  {
    id: "65549186-e14b-43a5-b29b-94e847026e02",
    userID: "c99877a0-92ae-4177-a830-1c54d4092479",
    userName: "John Doe",
    content: "Hello World!",
    isoDate: "2024-05-31T05:00:38.000Z",
    isUnread: false,
  },
];

type GroupedMessages = Map<string, Map<string, Message[]>>;
interface InboxDetail extends Omit<InboxItem, "type"> {
  groupedMessages: GroupedMessages;
}

export { inboxList, messages };
export type { InboxItem, InboxDetail, Message, GroupedMessages };
