import { useEffect, useState } from "react";

import { SearchInbox } from "../components/SearchInbox";
import { Loader } from "../components/Loader";
import { getInboxes, searchInbox, useDebounce } from "../utils/inbox";
import type { Inbox } from "../data/inbox";

export function Inbox(): JSX.Element {
  const [inboxes, setInboxes] = useState<Inbox[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 750);

  useEffect(() => {
    setIsLoading(true);
    if (debouncedSearchValue === "") {
      getInboxes()
        .then((inboxes) => {
          setIsLoading(false);
          if (inboxes.length !== 0) {
            setInboxes(inboxes);
          }
        })
        .catch(() => {
          // Handle and log the error
        });
    } else {
      searchInbox()
        .then((inboxes) => {
          setIsLoading(false);
          if (inboxes.length !== 0) {
            setInboxes(inboxes);
          }
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
      <div className="h-[calc(737px-48px-32px)] overflow-y-scroll">
        {inboxes.length !== 0 ? (
          <div>List of inboxes</div>
        ) : (
          <div>Inboxes are empty</div>
        )}
      </div>
    </>
  );
}
