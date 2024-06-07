import { useEffect, useState } from "react";

import { SearchInbox } from "../components/SearchInbox";
import { getInboxes, searchInbox, useDebounce } from "../utils/inbox";
import type { Inbox } from "../data/inbox";

export function Inbox(): JSX.Element {
  const [inboxes, setInboxes] = useState<Inbox[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 750);

  useEffect(() => {
    const loadingEl = document.getElementById("loading") as HTMLDivElement;
    if (loadingEl.classList.contains("hidden")) {
      loadingEl.classList.remove("hidden");
    }

    if (debouncedSearchValue === "") {
      getInboxes()
        .then((inboxes) => {
          loadingEl.classList.add("hidden");
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
          loadingEl.classList.add("hidden");
          if (inboxes.length !== 0) {
            setInboxes(inboxes);
          }
        })
        .catch(() => {
          // Handle and log the error
        });
    }
  }, [debouncedSearchValue]);

  return (
    <>
      <SearchInbox searchValue={searchValue} setSearchValue={setSearchValue} />

      <div>
        <div id="loading">LOADING</div>

        {inboxes.length !== 0 ? (
          <div>List of inboxes</div>
        ) : (
          <div>Inboxes are empty</div>
        )}
      </div>
    </>
  );
}
