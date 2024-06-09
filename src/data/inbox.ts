interface Inbox {
  id: string;
  name: string;
  type: "group" | "single";
  participants: number;
  lastMessage: Message;
}

const inboxes: Inbox[] = [
  {
    id: "91647f64-e715-4c38-8ab3-a7a723073c71",
    name: "Group Type Inbox",
    type: "group",
    participants: 0, // Act as a default value
    lastMessage: {
      id: "",
      inboxID: "",
      userID: "",
      userName: "",
      content: "",
      isoDate: "",
      isUnread: false,
    }, // Act as a default value
  },
  {
    id: "3ca3a288-a3b3-452a-a519-6fa326235360",
    name: "Non-Group (Single) Type Inbox",
    type: "single",
    participants: 0, // Act as a default value
    lastMessage: {
      id: "",
      inboxID: "",
      userID: "",
      userName: "",
      content: "",
      isoDate: "",
      isUnread: false,
    }, // Act as a default value
  },
];

interface Message {
  id: string;
  inboxID: string;
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
    inboxID: inboxes[0].id,
    userID: "4be83876-ac76-454c-9b89-bacb32e2d6aa",
    userName: "Anne",
    content: "World, Hello!",
    isoDate: "2024-06-01T05:00:38.000Z",
    isUnread: false,
  },
  {
    id: "b6387750-ce4b-47f6-9b90-0fe8c5854f12",
    inboxID: inboxes[0].id,
    userID: "4be83876-ac76-454c-9b89-bacb32e2d6aa",
    userName: "Anne",
    content: "World, Hello!",
    isoDate: "2024-06-01T05:00:38.000Z",
    isUnread: false,
  },
  // Today message, but unread (the newest)
  {
    id: "1fa84294-1135-47b3-93c9-9293884116a5",
    inboxID: inboxes[0].id,
    userID: "7aa5ff65-199b-4bb3-8056-3be9546d4786",
    userName: "Bob",
    content: "Try solidjs, it's great!",
    isoDate: new Date().toISOString(),
    isUnread: true,
  },
  // Today message
  {
    id: "e1be1b76-0d78-484c-8f51-7bfb4706d39e",
    inboxID: inboxes[0].id,
    userID: "970d9dee-addd-495f-93f9-3d9ebec69611",
    userName: "Drake",
    content: "Go is the greatest!",
    isoDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    ).toISOString(),
    isUnread: false,
  },
  {
    id: "84dd1869-34d2-4f4f-a638-67a546a69cbe",
    inboxID: inboxes[0].id,
    userID: "970d9dee-addd-495f-93f9-3d9ebec69611",
    userName: "Drake",
    content: "Go is the greatest!",
    isoDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    ).toISOString(),
    isUnread: false,
  },
  // Older month message
  {
    id: "65549186-e14b-43a5-b29b-94e847026e02",
    inboxID: inboxes[0].id,
    userID: "c99877a0-92ae-4177-a830-1c54d4092479",
    userName: "John Doe",
    content: "Hello World!",
    isoDate: "2024-05-31T05:00:38.000Z",
    isUnread: false,
  },
  {
    id: "1bde8c0e-84e8-4940-8736-1ae4602dceaa",
    inboxID: inboxes[0].id,
    userID: "c99877a0-92ae-4177-a830-1c54d4092479",
    userName: "John Doe",
    content: "Hello World!",
    isoDate: "2024-05-31T05:00:38.000Z",
    isUnread: false,
  },
  // Today message
  {
    id: "5da3907f-392e-4b21-b5cc-600af4272151",
    inboxID: inboxes[1].id,
    userID: "970d9dee-addd-495f-93f9-3d9ebec69611",
    userName: "Drake",
    content: "Hi Bob!",
    isoDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      3
    ).toISOString(),
    isUnread: false,
  },
  // Today message, but unread (the newest)
  {
    id: "9c24bd77-784f-4fa6-8ba6-79d5d501ee29",
    inboxID: inboxes[1].id,
    userID: "7aa5ff65-199b-4bb3-8056-3be9546d4786",
    userName: "Bob",
    content: "Hi Drake!",
    isoDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      2
    ).toISOString(),
    isUnread: false,
  },
];

interface ChatColorByUserID {
  userID: string;
  msgColor: string;
  userNameColor: string;
}

type GroupedMessages = Map<string, Map<string, Message[]>>;
interface InboxDetail extends Omit<Inbox, "type" | "lastMessage"> {
  groupedMessages: GroupedMessages;
  participantsChatColor: ChatColorByUserID[];
}

export { inboxes, messages };
export type { Inbox, InboxDetail, Message, GroupedMessages, ChatColorByUserID };
