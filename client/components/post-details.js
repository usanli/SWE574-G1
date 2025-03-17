"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, MapPin, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import PostComments from "@/components/post-comments";

export default function PostDetails({ post }) {
  console.log("Post data in details component:", post);

  // Use placeholder values if any values are missing
  const {
    id,
    title = "Mystery Object",
    description = "",
    images = {},
    tags = [],
    location = "",
    author = { name: "Anonymous", username: "anonymous" },
    createdAt = new Date().toISOString(),
    status,
    solved_by = null,
    comments = [],
  } = post || {};

  // For backend compatibility
  const solved = status === "solved";

  // Calculate vote counts - adapt for backend format
  const upvotes = post?.upvotes || 0;
  const downvotes = post?.downvotes || 0;

  // Check if images is a string or object and normalize
  let mainImage = null;
  let additionalImages = [];

  if (typeof images === "string") {
    mainImage = images;
  } else if (images && typeof images === "object") {
    mainImage = images.main || null;
    additionalImages = Array.isArray(images.additional)
      ? images.additional
      : [];
  }

  // Local placeholder image
  const localPlaceholder = "/placeholder.svg";

  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-4">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          {solved ? (
            <Badge className="bg-green-500 px-3 py-1.5 text-lg font-medium text-white">
              Solved
            </Badge>
          ) : (
            <Badge variant="outline" className="px-3 py-1.5 text-lg">
              Unsolved
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {author?.username?.substring(0, 2).toUpperCase() || "AN"}
              </AvatarFallback>
            </Avatar>
            <div>
              <span>Posted by </span>
              <Link
                href={`/profile/${author.username}`}
                className="font-medium text-foreground hover:text-primary"
              >
                {author.username}
              </Link>
            </div>
          </div>

          <div>{formatDate(createdAt)}</div>

          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}

          {solved_by && (
            <div>
              <span>Solved by </span>
              <Link
                href={`/profile/${solved_by.username}`}
                className="font-medium text-foreground hover:text-primary"
              >
                {solved_by.name}
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <div className="space-y-6 rounded-lg border bg-card p-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="whitespace-pre-line text-muted-foreground">
                {description}
              </p>
            </div>

            {tags && tags.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowUp className="h-4 w-4" />
                <span>{upvotes}</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowDown className="h-4 w-4" />
                <span>{downvotes}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border">
              {/* Main image */}
              {mainImage ? (
                <div className="relative aspect-square w-full">
                  <Image
                    src={mainImage}
                    alt={title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = localPlaceholder;
                    }}
                  />
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-muted">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </div>

            {/* Additional images */}
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {additionalImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-md border"
                  >
                    <Image
                      src={image}
                      alt={`Additional view ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.target.src = localPlaceholder;
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Discussion{" "}
            <span className="ml-2 text-sm text-muted-foreground">
              {comments.length || 0} comments
            </span>
          </h2>
        </div>

        <PostComments postId={id} initialComments={comments || []} />
      </div>
    </div>
  );
}
