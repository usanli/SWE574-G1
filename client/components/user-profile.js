"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Calendar,
  Award,
  MessageSquare,
  Eye,
  ArrowUp,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  getUserByUsername,
  getUserSubmissions,
  getUserComments,
} from "@/lib/user-api";
import PostCard from "@/components/post-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfile({ username }) {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("submissions");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await getUserByUsername(username);
        setUser(userData);

        const userSubmissions = await getUserSubmissions(userData.id);
        setSubmissions(userSubmissions);

        const userComments = await getUserComments(userData.id);
        setComments(userComments);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading || !user) {
    return <ProfileSkeleton />;
  }

  // Calculate stats
  const totalSubmissions = submissions.length;
  const solvedSubmissions = submissions.filter((sub) => sub.solved_by).length;
  const totalComments = comments.length;
  const upvotesReceived = submissions.reduce((total, sub) => {
    return (
      total + (sub.votes?.filter((vote) => vote.type === "upvote").length || 0)
    );
  }, 0);

  // Format submissions for PostCard component
  const formattedSubmissions = submissions.map((submission) => {
    // Calculate upvotes
    const upvotes =
      submission.votes?.filter((vote) => vote.type === "upvote").length || 0;

    // Generate random downvotes (between 0 and half the upvotes)
    const randomDownvotes = Math.floor(Math.random() * (upvotes / 2 + 1));

    return {
      id: submission.id,
      title: submission.title,
      description: submission.description,
      image: submission.images.main,
      tags: submission.tags,
      upvotes: upvotes,
      downvotes: randomDownvotes,
      commentCount: submission.comments?.length || 0,
      status: submission.solved_by ? "solved" : "unsolved",
      createdAt: submission.created_at,
      author: {
        name: submission.anonymous ? "Anonymous" : user.username,
        avatar: submission.anonymous
          ? "/placeholder.svg?height=40&width=40"
          : user.profile_picture_url,
      },
    };
  });

  return (
    <div className="space-y-8">
      {/* Profile header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <Avatar className="h-32 w-32 border-4 border-background shadow-md">
          <AvatarImage src={user.profile_picture_url} alt={user.username} />
          <AvatarFallback className="text-3xl">
            {user.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold">{user.username}</h1>
            {user.badges && user.badges.includes("expert") && (
              <Badge className="bg-primary text-primary-foreground">
                <Award className="mr-1 h-3 w-3" /> Expert
              </Badge>
            )}
          </div>

          <div className="mt-2 flex items-center text-muted-foreground">
            {user.country && (
              <div className="mr-4 flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{user.country}</span>
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>
                Member since {formatDate(user.created_at || "2023-01-01")}
              </span>
            </div>
          </div>

          {user.bio && <p className="mt-4 text-muted-foreground">{user.bio}</p>}

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-md bg-muted px-3 py-2">
              <div className="text-sm font-medium text-muted-foreground">
                Submissions
              </div>
              <div className="text-2xl font-bold">{totalSubmissions}</div>
            </div>
            <div className="rounded-md bg-muted px-3 py-2">
              <div className="text-sm font-medium text-muted-foreground">
                Solved
              </div>
              <div className="text-2xl font-bold">{solvedSubmissions}</div>
            </div>
            <div className="rounded-md bg-muted px-3 py-2">
              <div className="text-sm font-medium text-muted-foreground">
                Comments
              </div>
              <div className="text-2xl font-bold">{totalComments}</div>
            </div>
            <div className="rounded-md bg-muted px-3 py-2">
              <div className="text-sm font-medium text-muted-foreground">
                Upvotes
              </div>
              <div className="text-2xl font-bold">{upvotesReceived}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for different content */}
      <Tabs
        defaultValue="submissions"
        onValueChange={setActiveTab}
        value={activeTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="mt-6">
          {formattedSubmissions.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {formattedSubmissions.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No submissions yet"
              description={`${user.username} hasn't submitted any objects for identification.`}
            />
          )}
        </TabsContent>

        <TabsContent value="comments" className="mt-6">
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No comments yet"
              description={`${user.username} hasn't commented on any objects.`}
            />
          )}
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <BadgeCard
              title="Expert"
              description="Recognized for expertise in identifying objects"
              icon={Award}
              unlocked={user.badges && user.badges.includes("expert")}
            />
            <BadgeCard
              title="Problem Solver"
              description="Successfully identified 10+ objects"
              icon={Eye}
              unlocked={solvedSubmissions >= 10}
              progress={solvedSubmissions}
              total={10}
            />
            <BadgeCard
              title="Community Contributor"
              description="Posted 25+ helpful comments"
              icon={MessageSquare}
              unlocked={totalComments >= 25}
              progress={totalComments}
              total={25}
            />
            <BadgeCard
              title="Upvote Collector"
              description="Received 50+ upvotes on submissions"
              icon={ArrowUp}
              unlocked={upvotesReceived >= 50}
              progress={upvotesReceived}
              total={50}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-md" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <Skeleton className="h-10 w-full" />

      {/* Content skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function CommentCard({ comment }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <Link
            href={`/post/${comment.mystery_id}`}
            className="font-medium hover:text-primary"
          >
            {comment.mystery_title || "Mystery Object"}
          </Link>
          <span className="text-xs text-muted-foreground">
            {formatDate(comment.created_at)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm">{comment.content}</p>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 pt-2">
        <div className="flex w-full items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {comment.category || "Comment"}
          </Badge>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>
                {comment.votes?.filter((v) => v.type === "upvote").length || 0}
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function BadgeCard({
  title,
  description,
  icon: Icon,
  unlocked,
  progress,
  total,
}) {
  return (
    <Card className={`transition-all ${!unlocked ? "opacity-60" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div
            className={`rounded-full p-2 ${
              unlocked
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {typeof progress !== "undefined" && (
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>
                {progress} / {total}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min((progress / total) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-12 text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}
