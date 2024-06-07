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
  isUnread: boolean;
}

export { inboxList };
export type { InboxItem, Message };
