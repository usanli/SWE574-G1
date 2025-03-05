import { FeedProvider } from "@/context/feed-context";
import FeedFilters from "@/components/feed-filters";
import PostFeed from "@/components/post-feed";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 p-6">
        <FeedProvider>
          <FeedFilters />
          <PostFeed />
        </FeedProvider>
      </main>
    </div>
  );
}
