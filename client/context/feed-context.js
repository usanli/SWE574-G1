"use client";

import { createContext, useContext, useState } from "react";

const FeedContext = createContext({
  sortBy: "recent",
  setSortBy: () => {},
  category: "all",
  setCategory: () => {},
  hasMore: true,
  setHasMore: () => {},
});

export function FeedProvider({ children }) {
  const [sortBy, setSortBy] = useState("recent");
  const [category, setCategory] = useState("all");
  const [hasMore, setHasMore] = useState(true);

  return (
    <FeedContext.Provider
      value={{
        sortBy,
        setSortBy,
        category,
        setCategory,
        hasMore,
        setHasMore,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export const useFeed = () => useContext(FeedContext);
