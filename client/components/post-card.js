import Image from "next/image";
import Link from "next/link";
import { ArrowUp, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PostCard({ post }) {
  const { id, title, image, tags, upvotes, commentCount, status, author } =
    post;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link href={`/post/${id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {status === "solved" && (
            <div className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white">
              Solved
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/post/${id}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold hover:text-primary">
            {title}
          </h3>
        </Link>

        <div className="mb-3 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-muted/50">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              width={24}
              height={24}
              className="mr-2 rounded-full"
            />
            <span>{author.name}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t bg-muted/20 px-4 py-2">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-muted-foreground hover:text-primary"
        >
          <ArrowUp className="h-4 w-4" />
          <span>{upvotes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-muted-foreground hover:text-primary"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{commentCount}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
