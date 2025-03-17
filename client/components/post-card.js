import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowDown, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }) {
  const {
    id,
    title,
    image,
    tags,
    upvotes,
    downvotes,
    commentCount,
    status,
    author,
    createdAt,
  } = post;

  // Calculate description snippet (first 100 characters)
  const description = post.description || "";
  const descriptionSnippet =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description;

  // Use a local placeholder instead of external URL
  const localPlaceholder = "/placeholder.svg";

  // Check if image is from an external domain
  const isExternalImage =
    image && (image.startsWith("http://") || image.startsWith("https://"));

  return (
    <Link href={`/post/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={localPlaceholder}
            alt={title}
            fill
            className="object-cover"
          />

          {status === "solved" && (
            <div className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
              Solved
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold hover:text-primary">
            {title}
          </h3>

          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {descriptionSnippet}
          </p>

          <div className="mb-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-muted/50">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="bg-muted/50">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarFallback>
                  {author.username?.substring(0, 2).toUpperCase() || "AN"}
                </AvatarFallback>
              </Avatar>
              <span>{author.name}</span>
            </div>
            <div>{formatDate(createdAt)}</div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t bg-muted/20 px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-green-600 dark:text-green-500">
              <ArrowUp className="h-4 w-4" />
              <span>{upvotes}</span>
            </div>
            <div className="flex items-center gap-1 text-red-600 dark:text-red-500">
              <ArrowDown className="h-4 w-4" />
              <span>{downvotes}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{commentCount}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
