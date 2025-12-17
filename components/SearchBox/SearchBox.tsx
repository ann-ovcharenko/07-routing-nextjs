"use client";

import React from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isSearching: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchChange,
  isSearching,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className={css.searchWrapper}>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleChange}
      />
      {isSearching && <span className={css.loader}>Searching...</span>}
    </div>
  );
};

export default SearchBox;
