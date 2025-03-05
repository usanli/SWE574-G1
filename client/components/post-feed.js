"use client";

import { useState, useEffect } from "react";
import { useFeed } from "@/context/feed-context";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/post-card";
import { Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function PostFeed() {
  const { sortBy, category, hasMore, setHasMore } = useFeed();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch initial posts
  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoading(true);
      setPosts([]);
      setPage(1);

      try {
        const result = await getPosts(1, 6, sortBy, category);
        setPosts(result.posts);
        setHasMore(result.hasMore);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPosts();
  }, [sortBy, category, setHasMore]);

  // Load more posts
  const loadMorePosts = async () => {
    try {
      const nextPage = page + 1;
      const result = await getPosts(nextPage, 6, sortBy, category);

      setPosts((prevPosts) => [...prevPosts, ...result.posts]);
      setPage(nextPage);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex h-60 flex-col items-center justify-center rounded-lg border bg-muted/20 p-8 text-center">
        <h3 className="text-xl font-semibold">No objects found</h3>
        <p className="text-muted-foreground">
          Try changing your filters or be the first to submit an object in this
          category!
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMorePosts}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      }
      endMessage={
        <p className="py-4 text-center text-sm text-muted-foreground">
          You've seen all the objects!
        </p>
      }
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="animate-fadeIn">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}
