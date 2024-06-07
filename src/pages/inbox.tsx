import { useEffect, useState } from "react";
import { SearchInbox } from "../components/SearchInbox";
import { useDebounce } from "../utils/inbox";

export function Inbox(): JSX.Element {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 750);

  useEffect(() => {
    // Fetch some data
  }, [debouncedSearchValue]);

  return (
    <>
      <SearchInbox searchValue={searchValue} setSearchValue={setSearchValue} />
    </>
  );
}
