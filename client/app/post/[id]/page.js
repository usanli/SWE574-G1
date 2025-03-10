import { Suspense } from "react";
import PostDetails from "@/components/post-details";
import PostSkeleton from "@/components/post-skeleton";

export default function PostPage({ params }) {
  const { id } = params;

  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">
        <Suspense fallback={<PostSkeleton />}>
          <PostDetails postId={id} />
        </Suspense>
      </main>
    </div>
  );
}
