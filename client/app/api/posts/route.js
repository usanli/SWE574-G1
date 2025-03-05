import { NextResponse } from "next/server";
import { MOCK_POSTS } from "@/lib/api";

export async function GET(request) {
  // Get query parameters
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1");
  const limit = Number.parseInt(searchParams.get("limit") || "6");
  const sortBy = searchParams.get("sortBy") || "recent";
  const category = searchParams.get("category") || "all";

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredPosts = [...MOCK_POSTS];

  // Filter by category if not 'all'
  if (category !== "all") {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase() === category.toLowerCase())
    );
  }

  // Sort posts based on sortBy parameter
  switch (sortBy) {
    case "recent":
      filteredPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case "solved":
      filteredPosts = filteredPosts.filter((post) => post.status === "solved");
      break;
    case "most-discussed":
      filteredPosts.sort((a, b) => b.commentCount - a.commentCount);
      break;
    default:
      filteredPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  }

  // Paginate results
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // For demo purposes, we'll return hasMore as false when we've shown all posts
  const hasMore = endIndex < filteredPosts.length;

  return NextResponse.json({
    posts: paginatedPosts,
    hasMore,
    total: filteredPosts.length,
  });
}
