import { useEffect, useMemo, useState } from "react";

import { SearchInbox } from "../components/SearchInbox";
import { InboxItem } from "../components/InboxItem";
import { Loader } from "../components/Loader";
import { useDebounce } from "../hooks/useDebounce";
import { getInboxes, getMessages } from "../api/inbox";
import {
  sortInboxFromNewestToOldest,
  sortMsgFromOldestToNewest,
} from "../utils/inbox";
import type { Inbox as InboxType } from "../data/inbox";

export function Inbox(): JSX.Element {
  const [inboxes, setInboxes] = useState<InboxType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const searchedInboxes = useMemo(() => {
    const obtainedInboxes = inboxes.filter(({ name }) => {
      return name.toLowerCase().includes(debouncedSearchValue.toLowerCase());
    });
    return obtainedInboxes;
  }, [inboxes, debouncedSearchValue]);

  useEffect(() => {
    Promise.all([getInboxes(), getMessages()])
      .then(([inboxes, messages]) => {
        // Get the latest message of an inbox
        for (let i = 0; i < inboxes.length; i++) {
          const inboxMessages = messages.filter(({ inboxID }) => {
            return inboxID === inboxes[i].id;
          });

          sortMsgFromOldestToNewest(inboxMessages);
          inboxes[i].lastMessage = inboxMessages[inboxMessages.length - 1];
        }

        sortInboxFromNewestToOldest(inboxes);
        setIsLoading(false);
        setInboxes(inboxes);
      })
      .catch(() => {
        // Handle and log the error
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <SearchInbox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {isLoading ? <Loader text="Loading Chats..." /> : <></>}
      </>
    );
  }

  if (debouncedSearchValue !== "") {
    return (
      <>
        <SearchInbox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <div className="h-[calc(737px-48px-32px)] overflow-y-scroll flex flex-col">
          {searchedInboxes.length !== 0 ? (
            searchedInboxes.map((inbox) => {
              return <InboxItem key={inbox.id} {...inbox} />;
            })
          ) : (
            <div>There is no inbox</div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <SearchInbox searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="h-[calc(737px-48px-32px-22px)] overflow-y-scroll flex flex-col">
        {inboxes.length !== 0 ? (
          inboxes.map((inbox) => {
            return <InboxItem key={inbox.id} {...inbox} />;
          })
        ) : (
          <div>There is no inbox</div>
        )}
      </div>
    </>
  );
}
