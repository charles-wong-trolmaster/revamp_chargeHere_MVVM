import { SearchBarState } from "@/redux/features/searchBar/searchBarSlice";
import React, { useEffect, useState } from "react";

interface SearchBarProps extends SearchBarState {
  onClear: () => void;
  onSubmit: (searchQuery: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const {
    enableClear = true,
    placeholder = "Search...",
    value = "",
    icon,
    onSubmit,
    onClear,
  } = props;

  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    if (onClear) {
      onClear();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <header
      className="uk-background-muted uk-padding-small uk-flex-none"
      style={{ background: "lightyellow" }}
    >
      <div className="uk-container uk-text-center">
        <form onSubmit={handleSubmit} className="uk-search uk-search-default">
          <div className="uk-inline uk-width-1-1">
            {/* {icon && (
              <span className="uk-form-icon">
                {icon}
              </span>
            )} */}
            <input
              className="uk-search-input"
              type="search"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
            />
            {enableClear && inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="uk-form-icon uk-form-icon-flip"
              >
                ×
              </button>
            )}
          </div>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
