"use client";

import { useState, useEffect } from "react";
import { useFeed } from "@/context/feed-context";
import { useSearch } from "@/context/search-context";
import { postService } from "@/lib/api-service";
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
  const [error, setError] = useState(null);
  const postsPerPage = 9; // Load 9 posts at a time

  // Fetch initial posts
  useEffect(() => {
    const fetchInitialPosts = async () => {
      setInitialLoading(true);
      setPosts([]);
      setPage(1);
      setHasMore(true);
      setError(null);

      try {
        const category = filter === "solved" || filter === "unsolved" ? filter : "all";

        console.log("Fetching posts with:", {
          page: 1,
          limit: postsPerPage,
          sortBy,
          category,
          searchQuery
        });

        const result = await postService.getPosts(
          1,
          postsPerPage,
          sortBy,
          category,
          searchQuery
        );
        
        console.log("Fetched posts:", result);
        setPosts(result.posts);
        setHasMore(result.hasMore);
        setTotalResults(result.total);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setInitialLoading(false);
        setLoading(false);
      }
    };

    // Always fetch posts when component mounts or dependencies change
    fetchInitialPosts();
    
    // Set up a refresh interval - optional, remove if not desired
    const refreshInterval = setInterval(fetchInitialPosts, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(refreshInterval);
  }, [sortBy, filter, searchQuery]);

  // Load more posts when requested
  const loadMorePosts = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);
    
    try {
      const nextPage = page + 1;
      const category = filter === "solved" || filter === "unsolved" ? filter : "all";
      
      const result = await postService.getPosts(
        nextPage,
        postsPerPage,
        sortBy,
        category,
        searchQuery
      );

      setPosts((prevPosts) => [...prevPosts, ...result.posts]);
      setHasMore(result.hasMore);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more posts:", error);
      setError("Failed to load more posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Display loading state
  if (initialLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Loading posts...</p>
      </div>
    );
  }

  // Display error state
  if (error && posts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    );
  }

  // Display no results
  if (posts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12">
        <Search className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">No posts found</h3>
        {searchQuery && (
          <p className="text-muted-foreground mt-2">
            No results for "{searchQuery}"
          </p>
        )}
        {!searchQuery && (
          <p className="text-muted-foreground mt-2">
            Try changing your filters
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Display the number of results */}
      <div className="mb-4 text-sm text-muted-foreground">
        {searchQuery ? (
          <p>
            Found {totalResults} result{totalResults !== 1 && "s"} for "
            {searchQuery}"
          </p>
        ) : (
          <p>Showing {totalResults} post{totalResults !== 1 && "s"}</p>
        )}
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load more button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={loadMorePosts}
            disabled={loading}
            className="w-full max-w-xs"
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

      {/* Error message when loading more */}
      {error && posts.length > 0 && (
        <div className="text-center mt-4">
          <p className="text-destructive mb-2">{error}</p>
          <Button variant="ghost" onClick={loadMorePosts} size="sm">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
