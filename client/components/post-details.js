"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ArrowRight,
  Tag,
  MapPin,
  Calendar,
  User,
  Eye,
  Share2,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPostById, getSimilarPosts } from "@/lib/post-api";
import { formatDate } from "@/lib/utils";
import SimilarPostCard from "@/components/similar-post-card";
import PostComments from "@/components/post-comments";
import PostSkeleton from "@/components/post-skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PostDetails({ postId }) {
  const [post, setPost] = useState(null);
  const [similarPosts, setSimilarPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const postData = await getPostById(postId);
        setPost(postData);
        setVoteCount(postData.votes.length);

        const similar = await getSimilarPosts(postId, postData.tags);
        setSimilarPosts(similar);
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleVote = () => {
    if (!voted) {
      setVoteCount(voteCount + 1);
      setVoted(true);
    } else {
      setVoteCount(voteCount - 1);
      setVoted(false);
    }
    // In a real app, you would send a POST request to your API to record the vote
  };

  if (loading) {
    return <PostSkeleton />;
  }

  if (!post) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-12 text-center">
          <h1 className="text-2xl font-bold">Mystery Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            The mystery you're looking for does not exist or has been removed.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4 flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div>
          <Link
            href="/"
            className="mb-2 flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowRight className="mr-1 h-4 w-4 rotate-180" /> Back to
            Discoveries
          </Link>
          <h1 className="text-2xl font-bold md:text-3xl">{post.title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button
            variant={voted ? "default" : "outline"}
            size="sm"
            className="flex items-center gap-1"
            onClick={handleVote}
          >
            <ArrowUp className="h-4 w-4" />
            <span>{voteCount}</span>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Main content */}
        <Card>
          <CardContent className="p-0">
            <div className="relative aspect-video w-full">
              <Image
                src={
                  post.images.main || "/placeholder.svg?height=600&width=800"
                }
                alt={post.title}
                fill
                className="rounded-t-lg object-cover"
              />
              {post.solved_by && (
                <div className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
                  Solved
                </div>
              )}
            </div>
            <div className="space-y-4 p-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-muted/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <Link href={`/profile/${post.author.username}`}>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={post.author.profile_picture_url}
                      alt={post.author.username}
                    />
                    <AvatarFallback>
                      {post.author.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {post.anonymous ? "Anonymous" : post.author.username}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.created_at)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="prose max-w-none dark:prose-invert">
                {post.description.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Object Parts Section */}
              {post.parts && post.parts.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-medium">
                    <Layers className="h-5 w-5" />
                    Object Parts
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {post.parts.map((part, index) => (
                      <AccordionItem key={part.id} value={part.id}>
                        <AccordionTrigger className="text-base font-medium">
                          {part.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            {/* Attributes */}
                            {Object.keys(part.attributes).length > 0 && (
                              <div>
                                <h4 className="mb-2 text-sm font-medium">
                                  Attributes
                                </h4>
                                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                                  {Object.entries(part.attributes).map(
                                    ([key, value]) => (
                                      <div
                                        key={key}
                                        className="flex items-start gap-2 rounded-md border p-2"
                                      >
                                        <span className="font-medium capitalize">
                                          {key}:
                                        </span>
                                        <span className="text-muted-foreground">
                                          {value}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Measurements */}
                            {part.measurements &&
                              Object.keys(part.measurements).length > 0 && (
                                <div>
                                  <h4 className="mb-2 text-sm font-medium">
                                    Measurements
                                  </h4>
                                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                                    {Object.entries(part.measurements).map(
                                      ([key, value]) => (
                                        <div
                                          key={key}
                                          className="flex items-start gap-2 rounded-md border p-2"
                                        >
                                          <span className="font-medium capitalize">
                                            {key}:
                                          </span>
                                          <span className="text-muted-foreground">
                                            {value.isRange
                                              ? `${value.min} - ${value.max} ${value.unit}`
                                              : `${value.value} ${value.unit}`}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {post.images.additional && post.images.additional.length > 0 && (
                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-medium">
                    Additional Images
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {post.images.additional.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-md"
                      >
                        <Image
                          src={image || "/placeholder.svg?height=300&width=300"}
                          alt={`Additional image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Similar Objects Section */}
        {similarPosts.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">Similar Objects</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {similarPosts.map((similarPost) => (
                <SimilarPostCard key={similarPost.id} post={similarPost} />
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div>
          <Tabs defaultValue="discussion">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="discussion">
                Discussion ({post.comments.length})
              </TabsTrigger>
              <TabsTrigger value="attributes">Attributes</TabsTrigger>
            </TabsList>

            <TabsContent value="discussion" className="mt-4">
              <PostComments comments={post.comments} mysteryId={post.id} />
            </TabsContent>

            <TabsContent value="attributes" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {post.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">Location</h4>
                          <p className="text-sm text-muted-foreground">
                            {post.location}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <Calendar className="mt-1 h-4 w-4 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Posted</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(post.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <User className="mt-1 h-4 w-4 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Author</h4>
                        <p className="text-sm text-muted-foreground">
                          {post.anonymous ? "Anonymous" : post.author.username}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Eye className="mt-1 h-4 w-4 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Views</h4>
                        <p className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 1000) + 100}
                        </p>
                      </div>
                    </div>

                    {Object.entries(post.attributes || {}).map(
                      ([key, value]) => (
                        <div key={key} className="flex items-start gap-2">
                          <Tag className="mt-1 h-4 w-4 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {value}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
