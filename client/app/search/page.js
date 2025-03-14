"use client";

import { useState, useEffect } from "react";
import { useSearch } from "@/context/search-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/post-card";
import { Loader2 } from "lucide-react";

export default function SearchPage() {
  const { searchQuery, setSearchQuery, isSearching, setIsSearching } =
    useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const postsPerPage = 9;

  useEffect(() => {
    setLocalSearchQuery(searchQuery);

    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = async (query) => {
    setLoading(true);
    setPosts([]);
    setPage(1);

    try {
      const result = await getPosts(1, postsPerPage, "recent", "all", query);
      setPosts(result.posts);
      setHasMore(result.hasMore);
      setTotalResults(result.total);
    } catch (error) {
      console.error("Error searching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    setIsSearching(!!localSearchQuery);

    if (localSearchQuery) {
      performSearch(localSearchQuery);
    }
  };

  const clearSearch = () => {
    setLocalSearchQuery("");
    setSearchQuery("");
    setIsSearching(false);
    setPosts([]);
  };

  const loadMorePosts = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const result = await getPosts(
        nextPage,
        postsPerPage,
        "recent",
        "all",
        searchQuery
      );

      setPosts((prevPosts) => [...prevPosts, ...result.posts]);
      setPage(nextPage);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl font-bold">Search Objects</h1>

        <form onSubmit={handleSearch} className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, description, or tags..."
            className="pl-10 pr-10"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
          {localSearchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </form>
      </div>

      {loading && posts.length === 0 ? (
        <div className="flex h-60 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isSearching ? (
        <>
          {posts.length > 0 ? (
            <div className="space-y-8">
              <p className="text-sm text-muted-foreground">
                Found {totalResults} {totalResults === 1 ? "result" : "results"}{" "}
                for "{searchQuery}"
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <div key={post.id} className="animate-fadeIn">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center">
                  <Button
                    onClick={loadMorePosts}
                    disabled={loading}
                    className="min-w-[200px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border bg-muted/20 p-8 text-center">
              <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">No results found</h3>
              <p className="text-muted-foreground">
                No objects match your search for "{searchQuery}". Try different
                keywords or browse all objects.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-60 flex-col items-center justify-center rounded-lg border bg-muted/20 p-8 text-center">
          <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">
            Search for mysterious objects
          </h3>
          <p className="text-muted-foreground">
            Enter keywords to find objects by title, description, or tags
          </p>
        </div>
      )}
    </div>
  );
}
