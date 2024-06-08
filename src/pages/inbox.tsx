import { useEffect, useState } from "react";

import { SearchInbox } from "../components/SearchInbox";
import { InboxItem } from "../components/InboxItem";
import { Loader } from "../components/Loader";
import { useDebounce } from "../hooks/useDebounce";
import { getInboxes, searchInbox } from "../api/inbox";
import type { InboxItem as InboxItemType } from "../data/inbox";

export function Inbox(): JSX.Element {
  const [inboxList, setInboxList] = useState<InboxItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 750);

  useEffect(() => {
    setIsLoading(true);
    if (debouncedSearchValue === "") {
      getInboxes()
        .then((inboxList) => {
          setIsLoading(false);
          setInboxList(inboxList);
        })
        .catch(() => {
          // Handle and log the error
        });
    } else {
      searchInbox(debouncedSearchValue)
        .then((inboxList) => {
          setIsLoading(false);
          setInboxList(inboxList);
        })
        .catch(() => {
          // Handle and log the error
        });
    }
  }, [debouncedSearchValue]);

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

  return (
    <>
      <SearchInbox searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="h-[calc(737px-48px-32px)] overflow-y-scroll flex flex-col">
        {inboxList.length !== 0 ? (
          inboxList.map((inbox) => {
            return <InboxItem key={inbox.id} {...inbox} />;
          })
        ) : (
          <div>There is no inbox</div>
        )}
      </div>
    </>
  );
}
