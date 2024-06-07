import { v4 as uuidv4 } from "uuid";

type InboxType = "group" | "single";
interface Inbox {
  id: string;
  name: string;
  type: InboxType;
  participants?: number;
}

const inboxes: Inbox[] = [
  {
    id: uuidv4(),
    name: "Group Type Inbox",
    type: "group",
  },

  {
    id: uuidv4(),
    name: "Non-Group (Single) Type Inbox",
    type: "single",
  },
];

interface Message {
  id: string;
  userID: string;
  userName: string;
  content: string;
  isUnread: boolean;
}

export { inboxes };
export type { Inbox, Message };
