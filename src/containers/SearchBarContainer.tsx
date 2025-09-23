import SearchBar from "@/components/SearchBar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";

const SearchBarContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const enableClear = useAppSelector((state) => state.searchBar.enableClear);
  const icon = useAppSelector((state) => state.searchBar.icon);
  const placeholder = useAppSelector((state) => state.searchBar.placeholder);
  const value = useAppSelector((state) => state.searchBar.value);
  const onSearch = (searchQuery: string) => {
    console.log('search result: ',searchQuery);
  };
  return (
    <SearchBar
      enableClear={enableClear}
      icon={icon}
      placeholder={placeholder}
      value={value}
      onSubmit={onSearch}
      onClear={()=>{}}
    />
  );
};

export default SearchBarContainer;
