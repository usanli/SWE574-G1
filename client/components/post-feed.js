"use client";

import { useState, useEffect } from "react";
import { useFeed } from "@/context/feed-context";
import { useSearch } from "@/context/search-context";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/post-card";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PostFeed() {
  const { sortBy, filter } = useFeed();
  const { searchQuery, isSearching } = useSearch();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const postsPerPage = 9; // Load 9 posts at a time

  // Fetch initial posts
  useEffect(() => {
    const fetchInitialPosts = async () => {
      setInitialLoading(true);
      setPosts([]);
      setPage(1);
      setHasMore(true);

      try {
        // Convert filter to category for API
        let category = "all";
        if (filter === "solved" || filter === "unsolved") {
          category = filter;
        }

        const result = await getPosts(
          1,
          postsPerPage,
          sortBy,
          category,
          searchQuery
        );
        setPosts(result.posts);
        setHasMore(result.hasMore);
        setTotalResults(result.total);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setInitialLoading(false);
        setLoading(false);
      }
    };

    fetchInitialPosts();
  }, [sortBy, filter, searchQuery]);

  // Load more posts
  const loadMorePosts = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const nextPage = page + 1;

      // Convert filter to category for API
      let category = "all";
      if (filter === "solved" || filter === "unsolved") {
        category = filter;
      }

      const result = await getPosts(
        nextPage,
        postsPerPage,
        sortBy,
        category,
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

  if (initialLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex h-60 flex-col items-center justify-center rounded-lg border bg-muted/20 p-8 text-center">
        {isSearching ? (
          <>
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">No results found</h3>
            <p className="text-muted-foreground">
              No objects match your search for "{searchQuery}". Try different
              keywords or browse all objects.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold">No objects found</h3>
            <p className="text-muted-foreground">
              Try changing your filters or be the first to submit an object in
              this category!
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isSearching && (
        <p className="text-sm text-muted-foreground">
          Found {totalResults} {totalResults === 1 ? "result" : "results"} for "
          {searchQuery}"
        </p>
      )}

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
  );
}
