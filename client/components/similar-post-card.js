import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export default function SimilarPostCard({ post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="flex gap-3 hover:bg-muted/40 p-2 rounded-md transition-colors"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
        <Image
          src={post.images.main || "/placeholder.svg?height=64&width=64"}
          alt={post.title}
          fill
          className="object-cover"
        />
        {post.solved_by && (
          <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-green-500" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium">{post.title}</h3>
        <p className="text-xs text-muted-foreground">
          {formatDate(post.created_at)}
        </p>
      </div>
    </Link>
  );
}
