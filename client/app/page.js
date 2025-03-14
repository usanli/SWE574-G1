import { FeedProvider } from "@/context/feed-context";
import FeedFilters from "@/components/feed-filters";
import PostFeed from "@/components/post-feed";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="container mx-auto p-6">
        <FeedProvider>
          <FeedFilters />
          <PostFeed />
        </FeedProvider>
      </main>
    </div>
  );
}
