import type { ChangeEvent, Dispatch } from "react";
import { Search } from "../icons/Search";

interface SearchInboxProps {
  searchValue: string;
  setSearchValue: Dispatch<string>;
}

export function SearchInbox({
  searchValue,
  setSearchValue,
}: SearchInboxProps): JSX.Element {
  function updateSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.currentTarget.value);
  }

  function searchOnFocus() {
    const inputEl = document.getElementById("search_inbox") as HTMLInputElement;
    inputEl.setAttribute("placeholder", "Type a new message");

    const formEl = inputEl.parentElement as HTMLFormElement;
    formEl.classList.remove("px-14");
    formEl.classList.add("px-4");

    const labelEl = inputEl.nextElementSibling as HTMLLabelElement;
    labelEl.classList.add("opacity-0");
  }

  function searchOnBlur() {
    const inputEl = document.getElementById("search_inbox") as HTMLInputElement;
    inputEl.setAttribute("placeholder", "Search");

    const formEl = inputEl.parentElement as HTMLFormElement;
    formEl.classList.remove("px-4");
    formEl.classList.add("px-14");

    const labelEl = inputEl.nextElementSibling as HTMLLabelElement;
    labelEl.classList.remove("opacity-0");
  }

  return (
    <form
      action=""
      className="flex justify-between items-center border border-[#828282] rounded-[5px] px-14 h-8 transition-all duration-300"
    >
      <input
        type="text"
        id="search_inbox"
        name="search_inbox"
        placeholder="Search"
        className="leading-none text-sm outline-none w-full"
        value={searchValue}
        onChange={updateSearchValue}
        onFocus={searchOnFocus}
        onBlur={searchOnBlur}
      />

      <label
        htmlFor="search_inbox"
        className="text-sm leading-none cursor-pointer transition-all duration-300"
      >
        <Search className="w-3.5 h-3.5" />
      </label>
    </form>
  );
}
