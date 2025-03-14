"use client";

import { createContext, useContext, useState } from "react";

const SearchContext = createContext({
  searchQuery: "",
  setSearchQuery: () => {},
  isSearching: false,
  setIsSearching: () => {},
});

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
