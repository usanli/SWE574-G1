"use client";

import { createContext, useContext, useState } from "react";

const FeedContext = createContext({
  sortBy: "recent",
  setSortBy: () => {},
  filter: "all",
  setFilter: () => {},
  hasMore: true,
  setHasMore: () => {},
});

export function FeedProvider({ children }) {
  const [sortBy, setSortBy] = useState("recent");
  const [filter, setFilter] = useState("all");
  const [hasMore, setHasMore] = useState(true);

  return (
    <FeedContext.Provider
      value={{
        sortBy,
        setSortBy,
        filter,
        setFilter,
        hasMore,
        setHasMore,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export const useFeed = () => useContext(FeedContext);
