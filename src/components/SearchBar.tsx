import { SearchBarState } from "@/redux/features/searchBar/searchBarSlice";
import React from "react";

interface SearchBarProps extends SearchBarState {
  onSearch: (searchQuery: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { enableClear, placeholder, value, icon, onSearch } = props;

  return (
    <header
      className="uk-background-muted uk-padding-small uk-flex-none"
      style={{ background: "lightyellow" }}
    >
      <div className="uk-container uk-text-center">
        <div>{"placeholder: " + placeholder}</div>
      </div>
    </header>
  );
};

export default SearchBar;
