"use client";

import React, { useState, useEffect } from "react";
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      
      {isMounted && isSearching && (
        <span className={css.loader}>Searching...</span>
      )}
    </div>
  );
};

export default SearchBox;